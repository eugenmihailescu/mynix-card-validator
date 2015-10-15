/**
 * Generic class for credit card validation
 * 
 * @class CC_Validator
 * @since 0.1
 * @version 0.1
 * @author Eugen Mihailescu <eugenmihailescux@gmail.com>
 * 
 */
var Mynix = {};
Mynix.CC_Validator = (function() {
	var UNDEF = 'undefined';

	// card constants
	var AMEX = 0;
	var VISA = 1;
	var MASTER = 2;
	var DISCOVER = 3;
	var DINERS = 4;
	var JCB = 5;
	var MAESTRO = 6;

	// private properties
	var cc;

	var expiry;

	var ccv;

	var strrev = function(s) {
		return s.split("").reverse().join("");
	};

	/**
	 * Source: http://phpjs.org/functions/
	 */
	var array_flip = function(array) {
		var key, tmp_ar = {};

		if (array && typeof array === 'object' && array.change_key_case) {
			return array.flip();
		}

		for (key in array) {
			if (!array.hasOwnProperty(key)) {
				continue;
			}
			tmp_ar[array[key]] = key;
		}

		return tmp_ar;
	};

	/**
	 * Source: http://phpjs.org/functions/
	 */
	var array_intersect_key = function(arr1) {
		var retArr = {}, argl = arguments.length, arglm1 = argl - 1, k1 = '', arr = {}, i = 0, k = '';

		arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < argl; i++) {
				arr = arguments[i];
				for (k in arr) {
					if (k === k1) {
						if (i === arglm1) {
							retArr[k1] = arr1[k1];
						}
						continue arrs;
					}
				}
				continue arr1keys;
			}
		}

		return retArr;
	};

	/**
	 * Initialize the class
	 * 
	 * @param int
	 *            cc_number The credit card number
	 * @param string
	 *            cc_expiry The credit card expiry date in the format MMYY
	 * @param int
	 *            ccv_number The credit card security/verification code
	 */
	var init = function(cc_number, cc_expiry, ccv_number) {
		cc = UNDEF == typeof cc_number ? null : cc_number;
		expiry = UNDEF == typeof cc_expiry ? null : cc_expiry;
		ccv = UNDEF == typeof ccv_number ? null : ccv_number;
	};

	/**
	 * Returns an array of credit card patterns
	 * 
	 * @param boolean
	 *            guess When true then return the pattern that allows guessing,
	 *            otherwise the exact pattern
	 * @return array of strings
	 * 
	 * @see http://www.computersolving.com/computer-tips-tricks/what-your-credit-card-numbers-mean/
	 */
	function _get_patterns(guess) {
		guess = UNDEF == typeof guess ? false : guess;

		// We expect the following patterns:
		// https://web.archive.org/web/20150722011618/http://www.barclaycard.co.uk/business/files/Ranges_and_Rules_September_2014.pdf

		var patterns = [];
		patterns[JCB] = '(^(352)[8-9](\\d{11}$|\\d{12}$))|(^(35)[3-8](\\d{12}$|\\d{13}$))';
		patterns[AMEX] = '(^3[47])((\\d{11}$)|(\\d{13}$))';
		patterns[VISA] = '(^4\\d{12}$)|(^4[0-8]\\d{14}$)|(^(49)[^013]\\d{13}$)|(^(49030)[0-1]\\d{10}$)|(^(49033)[0-4]\\d{10}$)|(^(49110)[^12]\\d{10}$)|(^(49117)[0-3]\\d{10}$)|(^(49118)[^0-2]\\d{10}$)|(^(493)[^6]\\d{12}$)';
		patterns[MASTER] = '^5[1-5]\\d{14}$';
		patterns[DINERS] = '(^(30)[0-5]\\d{11}$)|(^(36)\\d{12}$)|(^(38[0-8])\\d{11}$)';
		patterns[MAESTRO] = '(^(5[0678])\\d{11,18}$)|(^(6[^0357])\\d{11,18}$)|(^(601)[^1]\\d{9,16}$)|(^(6011)\\d{9,11}$)|(^(6011)\\d{13,16}$)|(^(65)\\d{11,13}$)|(^(65)\\d{15,18}$)|(^(633)[^34](\\d{9,16}$))|(^(6333)[0-4](\\d{8,10}$))|(^(6333)[0-4](\\d{12}$))|(^(6333)[0-4](\\d{15}$))|(^(6333)[5-9](\\d{8,10}$))|(^(6333)[5-9](\\d{12}$))|(^(6333)[5-9](\\d{15}$))|(^(6334)[0-4](\\d{8,10}$))|(^(6334)[0-4](\\d{12}$))|(^(6334)[0-4](\\d{15}$))|(^(67)[^(59)](\\d{9,16}$))|(^(6759)](\\d{9,11}$))|(^(6759)](\\d{13}$))|(^(6759)](\\d{16}$))|(^(67)[^(67)](\\d{9,16}$))|(^(6767)](\\d{9,11}$))|(^(6767)](\\d{13}$))|(^(6767)](\\d{16}$))';
		patterns[DISCOVER] = '(^(6011)\\d{12}$)|(^(65)\\d{14}$)';

		// mangle the patterns such that they match shorter strings than they
		// normally do
		if (guess) {
			for ( var issuer in patterns)
				if (patterns.hasOwnProperty(issuer)) {
					// set the lower limit (zero)
					patterns[issuer] = patterns[issuer].replace(/\{(\d+)\}/g, '{0,$1}');

					// replace the lower limit with zero
					patterns[issuer] = patterns[issuer].replace(/(\d+)(?=,(\d+)\})/g, '0');
				}
		}

		return patterns;
	}

	/**
	 * Returns the card number length by issuer
	 * 
	 * @param int
	 *            $issuer
	 * @return int Returns the length
	 */
	var _get_cclen_by_issuer = function(issuer) {
		switch (parseInt(issuer)) {
			case AMEX:
				return 15;
			case VISA:
				return 13 | 16;
			case MASTER:
				return 16;
			case DISCOVER:
				return 16;
			case DINERS:
				return 14;
			case JCB:
				return 16;
			case MAESTRO:
				return 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
			default:
				return 0;
		}
	};

	/**
	 * Returns an identifier for a valid card issuer, false otherwise. When
	 * guess = true it tries to guess the issuer even if the card number has not
	 * the legal/expected length
	 * 
	 * @params boolean guess guess When true then return the pattern that allows
	 *         guessing, otherwise the exact pattern
	 * @return boolean|int
	 * 
	 */
	var is_valid_issuer = function(guess) {
		guess = UNDEF == typeof guess ? false : guess;

		var patterns = _get_patterns(guess), cclen = cc.length;

		for ( var issuer in patterns)
			if (patterns.hasOwnProperty(issuer)) {
				var r = new RegExp(patterns[issuer]);
				if (null != cc.match(r) && (guess || cclen == (cclen & _get_cclen_by_issuer(issuer))))
					return parseInt(issuer);
			}

		return false;
	};

	/**
	 * Sanitize the card number/expiry/ccv of any invalid characters
	 * 
	 * @param string
	 *            $str The input string
	 * @return string Returns the sanitized input string
	 */
	var _sanitize = function(str) {
		return !str.length ? str : str.replace('/[\\D]/', '');
	};

	/**
	 * Calculates the Luhn's checksum for a number
	 * 
	 * @param int
	 *            $number A number
	 * @param bool
	 *            $has_checkdigit True if the cc includes the checkdigit( last
	 *            char), false otherwise
	 * @return number Returns the Luhn's checksum
	 * @see http://en.wikipedia.org/wiki/Luhn_algorithm
	 */
	var _luhn_checksum = function(has_checkdigit) {
		has_checkdigit = UNDEF == typeof has_checkdigit ? true : has_checkdigit;
		compute_check_digit = function(checksum) {
			return 9 * checksum % 10;
		};
		var checksum = 0;
		var digits = strrev(cc).substring(has_checkdigit).split('');

		// skip the first digit (the ckeck digit after reversion)
		for (var index = 0; index < digits.length; index += 1) {
			digit = parseInt(digits[index]);
			if (0 == index % 2) {
				checksum += (product = 2 * digit) > 9 ? product - 9 : product;
			} else {
				checksum += digit;
			}
		}

		// add the check digit to the checksum
		return checksum + (has_checkdigit ? parseInt(cc.substr(-1)) : compute_check_digit(checksum));
	};

	/**
	 * Checks the card number against its check digit
	 * 
	 * @param string
	 *            $card_number (12-19 digits)
	 * @return boolean Returns true if the card number is valid, false otherwise
	 * @see http://en.wikipedia.org/wiki/Luhn_algorithm
	 */
	var is_valid_number = function() {
		if (cc.length < 12 || cc.length > 19)
			return false;

		cclen = cc.length;
		if (false !== (issuer = is_valid_issuer())) {
			has_check_digit = cclen == (_get_cclen_by_issuer(issuer) & cclen);
			return 0 == _luhn_checksum(has_check_digit) % 10;
		}

		return false;
	};

	/**
	 * Checks if the expiry date has valid MMYY format (the separator is
	 * sanitized)
	 * 
	 * @return boolean Return true if a valid date format, false otherwise
	 */
	var is_valid_expiry = function() {
		var today = new Date(), yyyy = today.getFullYear(), c_time;

		result = 4 == expiry.length && (mm = parseInt(expiry.substr(0, 2))) < 13 && mm > 0;

		if (result && (yy = parseInt(expiry.substr(2))) >= (yyyy % 1000)) {
			c_time = 3600 * 24 * (365 * (2000 + yy - 1970) + 30 * (mm + 1));
			return c_time * 1000 >= today;
		}
		return false;
	};

	/**
	 * Checks if the CCV/CVC/CID/whatever is valid number.
	 * 
	 * It must be 4 digits for AMEX and 3 digits for other card types
	 * 
	 * @return boolean Returns true if valid , false otherwise
	 */
	var is_valid_ccv = function() {
		var len;
		if (false !== (issuer = is_valid_issuer()))
			switch (issuer) {
				case AMEX:
					len = 4;
					break;
				default:
					len = 3;
					break;
			}
		return ccv.length === len && !ccv.match('/[\\D]/');
	};

	/**
	 * Returns the card issuer name if known, false otherwise
	 * 
	 * @param int|array
	 *            $issuer The issuer ID. If not specified then it will be
	 *            auto-detected from cc. If array then will return an array of
	 *            issuers names.
	 * @return boolean|string|array
	 */
	var get_card_issuer = function(issuer) {
		issuer = UNDEF == typeof issuer ? false : parseInt(issuer);
		var issuers = [];
		issuers[JCB] = 'JCB';
		issuers[AMEX] = 'American Express';
		issuers[VISA] = 'Visa';
		issuers[MASTER] = 'Mastercard';
		issuers[DINERS] = 'Diner\'s Club';
		issuers[MAESTRO] = 'Maestro';
		issuers[DISCOVER] = 'Discover';

		if (false !== issuer || false !== (issuer = is_valid_issuer())) {
			return issuer instanceof Array ? array_intersect_key(issuers, array_flip(issuer)) : issuers[issuer];
		}
		return false;
	};

	// return the public properties
	return {
	// public functions
	init : init,
	get_card_issuer : get_card_issuer,
	is_valid_ccv : is_valid_ccv,
	is_valid_expiry : is_valid_expiry,
	is_valid_issuer : is_valid_issuer,
	is_valid_number : is_valid_number,
	// public constant
	AMEX : AMEX,
	VISA : VISA,
	MASTER : MASTER,
	DISCOVER : DISCOVER,
	DINERS : DINERS,
	JCB : JCB,
	MAESTRO : MAESTRO };
})();
