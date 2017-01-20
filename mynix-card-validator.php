<?php

/**
 * Generic class for credit card validation
 * @class CC_Validator
 * @since 0.1
 * @version 0.1
 * @author Eugen Mihailescu
 *
 */
class CC_Validator {
	// card constants
	const AMEX = 0;
	const VISA = 1;
	const MASTER = 2;
	const DISCOVER = 3;
	const DINERS = 4;
	const JCB = 5;
	const MAESTRO = 6;
	
	//
	private $cc;

	private $expiry;

	private $ccv;

	function __construct($cc_number, $cc_expiry = null, $ccv = null) {
		$this->cc = $this->_sanitize ( $cc_number );
		$this->expiry = $this->_sanitize ( $cc_expiry );
		$this->ccv = $ccv;
	}

	/**
	 * Returns the card number length by issuer
	 *
	 * @param int $issuer        	
	 * @return int Returns the length
	 */
	private function _get_cclen_by_issuer($issuer) {
		switch ($issuer) {
			case self::AMEX :
				return 15;
			case self::VISA :
				return 13 | 16;
			case self::MASTER :
				return 16;
			case self::DISCOVER :
				return 16;
			case self::DINERS :
				return 14;
			case self::JCB :
				return 16;
			case self::MAESTRO :
				return 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
			default :
				return 0;
		}
	}

	/**
	 * Returns an identifier for a valid card issuer, false otherwise
	 *
	 * @return boolean|int
	 * @see http://www.computersolving.com/computer-tips-tricks/what-your-credit-card-numbers-mean/
	 */
	public function is_valid_issuer() {
		// We expect the following patterns:
		// @see http://www.barclaycard.co.uk/business/files/Ranges_and_Rules_September_2014.pdf
		$patterns = array (
				self::JCB => '(^(352)[8-9](\d{11}$|\d{12}$))|(^(35)[3-8](\d{12}$|\d{13}$))',
				self::AMEX => '(^3[47])((\d{11}$)|(\d{13}$))',
				self::VISA => '(^4\d{12}$)|(^4[0-8]\d{14}$)|(^(49)[^013]\d{13}$)|(^(49030)[0-1]\d{10}$)|(^(49033)[0-4]\d{10}$)|(^(49110)[^12]\d{10}$)|(^(49117)[0-3]\d{10}$)|(^(49118)[^0-2]\d{10}$)|(^(493)[^6]\d{12}$)',
				self::MASTER => '^5[1-5]\d{14}$',
				self::DINERS => '(^(30)[0-5]\d{11}$)|(^(36)\d{12}$)|(^(38[0-8])\d{11}$)',
				self::MAESTRO => '(^(5[0678])\d{11,18}$)|(^(6[^0357])\d{11,18}$)|(^(601)[^1]\d{9,16}$)|(^(6011)\d{9,11}$)|(^(6011)\d{13,16}$)|(^(65)\d{11,13}$)|(^(65)\d{15,18}$)|(^(633)[^34](\d{9,16}$))|(^(6333)[0-4](\d{8,10}$))|(^(6333)[0-4](\d{12}$))|(^(6333)[0-4](\d{15}$))|(^(6333)[5-9](\d{8,10}$))|(^(6333)[5-9](\d{12}$))|(^(6333)[5-9](\d{15}$))|(^(6334)[0-4](\d{8,10}$))|(^(6334)[0-4](\d{12}$))|(^(6334)[0-4](\d{15}$))|(^(67)[^(59)](\d{9,16}$))|(^(6759)](\d{9,11}$))|(^(6759)](\d{13}$))|(^(6759)](\d{16}$))|(^(67)[^(67)](\d{9,16}$))|(^(6767)](\d{9,11}$))|(^(6767)](\d{13}$))|(^(6767)](\d{16}$))',
				self::DISCOVER => '(^(6011)\d{12}$)|(^(65)\d{14}$)' 
		);
		$cclen = strlen ( $this->cc );
		foreach ( $patterns as $issuer => $pattern )
			if (preg_match ( "/^$pattern/", $this->cc ) && $cclen == ($cclen & $this->_get_cclen_by_issuer ( $issuer )))
				return $issuer;
		
		return false;
	}

	/**
	 * Sanitize the card number/expiry/ccv of any invalid characters
	 *
	 * @param string $str
	 *        	The input string
	 * @return string Returns the sanitized input string
	 */
	private function _sanitize($str) {
		return empty ( $str ) ? $str : preg_replace ( '/[\D]/', '', $str );
	}

	/**
	 * Calculates the Luhn's checksum for a number
	 *
	 * @param int $number
	 *        	A number
	 * @param bool $has_checkdigit
	 *        	True if the cc includes the checkdigit( last char), false otherwise
	 * @return number Returns the Luhn's checksum
	 * @see http://en.wikipedia.org/wiki/Luhn_algorithm
	 */
	private function _luhn_checksum($has_checkdigit = true) {
		$compute_check_digit = function ($checksum) {
			return 9 * $checksum % 10;
		};
		$checksum = 0;
		// skip the first digit (the ckeck digit after reversion)
		foreach ( str_split ( substr ( strrev ( $this->cc ), $has_checkdigit ) ) as $index => $digit ) {
			if (0 == $index % 2)
				$checksum += ($product = 2 * $digit) > 9 ? $product - 9 : $product;
			else
				$checksum += $digit;
		}
		return $checksum + ($has_checkdigit ? substr ( $this->cc, - 1 ) : $compute_check_digit ( $checksum )); // add the check digit to the checksum
	}

	/**
	 * Checks the card number against its check digit
	 *
	 * @param string $card_number
	 *        	(12-19 digits)
	 * @return boolean Returns true if the card number is valid, false otherwise
	 * @see http://en.wikipedia.org/wiki/Luhn_algorithm
	 */
	public function is_valid_number() {
		if (strlen ( $this->cc ) < 12 || strlen ( $this->cc ) > 19)
			return false;
		
		$cclen = strlen ( $this->cc );
		if (false !== ($issuer = $this->is_valid_issuer ())) {
			$has_check_digit = $cclen == ($this->_get_cclen_by_issuer ( $issuer ) & $cclen);
			return 0 == $this->_luhn_checksum ( $has_check_digit ) % 10;
		}
		return false;
	}

	/**
	 * Checks if the expiry date has valid MMYY format (the separator is sanitized)
	 *
	 * @return boolean Return true if a valid date format, false otherwise
	 */
	public function is_valid_expiry() {
		$result = 4 == strlen ( $this->expiry ) && ($mm = intval ( substr ( $this->expiry, 0, 2 ) )) < 13 && $mm > 0;
		if (($yy = intval ( substr ( $this->expiry, 2 ) )) >= date ( 'y' )) {
			$time = 3600 * 24 * (365 * (2000 + $yy - 1970) + 30 * ($mm + 1));
			return $time >= time ();
		}
		return false;
	}

	/**
	 * Checks if the CCV/CVC/CID/whatever is valid number
	 *
	 * @return boolean Returns true if valid , false otherwise
	 */
	public function is_valid_ccv() {
		return strlen ( $this->ccv ) > 2 && strlen ( $this->ccv ) < 5 && ! preg_match ( '/[\D]/', $this->ccv );
	}

	/**
	 * Returns the card issuer name if known, false otherwise
	 *
	 * @param int|array $issuer
	 *        	The issuer ID. If not specified then it will be auto-detected from cc. If array then will return an array of issuers names.
	 * @return boolean|string|array
	 */
	public function get_card_issuer($issuer = false) {
		$issuers = array (
				self::JCB => 'JCB',
				self::AMEX => 'American Express',
				self::VISA => 'Visa',
				self::MASTER => 'Mastercard',
				self::DINERS => 'Diner\'s Club',
				self::MAESTRO => 'Maestro',
				self::DISCOVER => 'Discover' 
		);
		
		if (false !== $issuer || false !== ($issuer = $this->is_valid_issuer ())) {
			return is_array ( $issuer ) ? array_intersect_key ( $issuers, array_flip ( $issuer ) ) : $issuers [$issuer];
		}
		return false;
	}
}
?>