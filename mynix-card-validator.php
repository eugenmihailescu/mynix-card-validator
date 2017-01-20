<?php

/**
 * Generic class for credit card validation
 * @class CC_Validator
 * @since 0.1
 * @version 0.1
 * @author Eugen Mihailescu
 *
 */
class CC_Validator
{
    // card constants
    const AMEX = 0;

    const VISA = 1;

    const MASTER = 2;

    const DISCOVER = 3;

    const DINERS = 4;

    const JCB = 5;

    const MAESTRO = 6;

    const MIN_POSTAL_CODE_LENGTH = 3;

    const MAX_POSTAL_CODE_LENGTH = 10;
    
    // valid postal codes length by country
    // http://www.upu.int/uploads/tx_sbdownloader/manualAddressingKnowledgeCentreGeneralIssuesEn.pdf
    const country_postal_code_lengths = [
        "AF" => [
            "Afghanistan",
            4
        ],
        "GL" => [
            "Greenland",
            4
        ],
        "NO" => [
            "Norway",
            4
        ],
        "DZ" => [
            "Algeria",
            5
        ],
        "GP" => [
            "Guadeloupe",
            5
        ],
        "OM" => [
            "Oman",
            3
        ],
        "AD" => [
            "Andorra",
            5
        ],
        "GT" => [
            "Guatemala",
            5
        ],
        "PK" => [
            "Pakistan",
            5
        ],
        "AR" => [
            "Argentina",
            5
        ],
        "GN" => [
            "Guinea",
            3
        ],
        "PG" => [
            "Papua New Guinea",
            3
        ],
        "AM" => [
            "Armenia",
            4
        ],
        "GW" => [
            "Guinea-Bissau",
            4
        ],
        "PY" => [
            "Paraguay",
            4
        ],
        "HT" => [
            "Haiti",
            4
        ],
        "PE" => [
            "Peru",
            5
        ],
        "AU" => [
            "Australia",
            4
        ],
        "HN" => [
            "Honduras",
            6
        ],
        "PH" => [
            "Philippines",
            4
        ],
        "AT" => [
            "Austria",
            4
        ],
        "HU" => [
            "Hungary",
            4
        ],
        "PN" => [
            "Pitcairn",
            8
        ],
        "AZ" => [
            "Azerbaijan",
            7
        ],
        "IS" => [
            "Iceland",
            3
        ],
        "PL" => [
            "Poland",
            6
        ],
        "BH" => [
            "Bahrain",
            4
        ],
        "IN" => [
            "India",
            6
        ],
        "PT" => [
            "Portugal",
            8
        ],
        "ID" => [
            "Indonesia",
            5
        ],
        "RO" => [
            "Romania",
            6
        ],
        "BD" => [
            "Bangladesh",
            4
        ],
        "IR" => [
            "Iran",
            6
        ],
        "RU" => [
            "Russia",
            6
        ],
        "BB" => [
            "Barbados",
            7
        ],
        "IQ" => [
            "Iraq",
            5
        ],
        "RE" => [
            "Reunion",
            5
        ],
        "BY" => [
            "Belarus",
            6
        ],
        "IL" => [
            "Israel",
            5
        ],
        "GS" => [
            "South Georgia/Sandwich Islands",
            8
        ],
        "BE" => [
            "Belgium",
            4
        ],
        "IT" => [
            "Italy",
            5
        ],
        "BL" => [
            "Saint Barthélemy",
            5
        ],
        "BM" => [
            "Bermuda",
            5
        ],
        "JP" => [
            "Japan",
            8
        ],
        "SH" => [
            "Saint Helena",
            8
        ],
        "BT" => [
            "Bhutan",
            5
        ],
        "JO" => [
            "Jordan",
            5
        ],
        "MF" => [
            "Saint Martin (French part)",
            5
        ],
        "BA" => [
            "Bosnia and Herzegovina",
            5
        ],
        "KZ" => [
            "Kazakhstan",
            6
        ],
        "PM" => [
            "Saint Pierre and Miquelon",
            5
        ],
        "KE" => [
            "Kenya",
            5
        ],
        "WS" => [
            "Samoa",
            6
        ],
        "BR" => [
            "Brazil",
            9
        ],
        "KR" => [
            "South Korea",
            5
        ],
        "SM" => [
            "San Marino",
            5
        ],
        "SA" => [
            "Saudi Arabia",
            5
        ],
        "BN" => [
            "Brunei",
            6
        ],
        "KW" => [
            "Kuwait",
            5
        ],
        "SN" => [
            "Senegal",
            5
        ],
        "BG" => [
            "Bulgaria",
            4
        ],
        "KG" => [
            "Kyrgyzstan",
            6
        ],
        "RS" => [
            "Serbia",
            6
        ],
        "CV" => [
            "Cape Verde",
            4
        ],
        "LA" => [
            "Laos",
            5
        ],
        "KH" => [
            "Cambodia",
            5
        ],
        "LV" => [
            "Latvia",
            7
        ],
        "SG" => [
            "Singapore",
            6
        ],
        "CA" => [
            "Canada",
            7
        ],
        "LB" => [
            "Lebanon",
            9
        ],
        "SK" => [
            "Slovakia",
            6
        ],
        "KY" => [
            "Cayman Islands",
            8
        ],
        "SI" => [
            "Slovenia",
            4
        ],
        "CL" => [
            "Chile",
            7
        ],
        "LS" => [
            "Lesotho",
            3
        ],
        "ZA" => [
            "South Africa",
            4
        ],
        "CN" => [
            "China",
            6
        ],
        "LI" => [
            "Liechtenstein",
            4
        ],
        "ES" => [
            "Spain",
            5
        ],
        "CX" => [
            "Christmas Island",
            4
        ],
        "LT" => [
            "Lithuania",
            5
        ],
        "LK" => [
            "Sri Lanka",
            5
        ],
        "LU" => [
            "Luxembourg",
            6
        ],
        "MK" => [
            "Macedonia",
            4
        ],
        "SD" => [
            "Sudan",
            5
        ],
        "CR" => [
            "Costa Rica",
            5
        ],
        "MG" => [
            "Madagascar",
            3
        ],
        "SJ" => [
            "Svalbard and Jan Mayen",
            4
        ],
        "HR" => [
            "Croatia",
            5
        ],
        "MY" => [
            "Malaysia",
            5
        ],
        "SZ" => [
            "Swaziland",
            4
        ],
        "CU" => [
            "Cuba",
            5
        ],
        "MV" => [
            "Maldives",
            5
        ],
        "SE" => [
            "Sweden",
            6
        ],
        "CY" => [
            "Cyprus",
            4
        ],
        "MT" => [
            "Malta",
            8
        ],
        "CH" => [
            "Switzerland",
            4
        ],
        "CZ" => [
            "Czech Republic",
            6
        ],
        "TW" => [
            "Taiwan",
            5
        ],
        "DK" => [
            "Denmark",
            4
        ],
        "TJ" => [
            "Tajikistan",
            6
        ],
        "MQ" => [
            "Martinique",
            5
        ],
        "TZ" => [
            "Tanzania",
            5
        ],
        "DO" => [
            "Dominican Republic",
            5
        ],
        "YT" => [
            "Mayotte",
            5
        ],
        "TH" => [
            "Thailand",
            5
        ],
        "EC" => [
            "Ecuador",
            6
        ],
        "MX" => [
            "Mexico",
            5
        ],
        "TT" => [
            "Trinidad and Tobago",
            6
        ],
        "EG" => [
            "Egypt",
            5
        ],
        "MD" => [
            "Moldova",
            4
        ],
        "SV" => [
            "El Salvador",
            4
        ],
        "MC" => [
            "Monaco",
            5
        ],
        "TN" => [
            "Tunisia",
            4
        ],
        "EE" => [
            "Estonia",
            5
        ],
        "MN" => [
            "Mongolia",
            5
        ],
        "TR" => [
            "Turkey",
            5
        ],
        "ET" => [
            "Ethiopia",
            4
        ],
        "ME" => [
            "Montenegro",
            5
        ],
        "TM" => [
            "Turkmenistan",
            6
        ],
        "FK" => [
            "Falkland Islands",
            8
        ],
        "MS" => [
            "Montserrat",
            7
        ],
        "FO" => [
            "Faroe Islands",
            3
        ],
        "MA" => [
            "Morocco",
            5
        ],
        "US" => [
            "United States (US)",
            5
        ],
        "FI" => [
            "Finland",
            5
        ],
        "FR" => [
            "France",
            5
        ],
        "MZ" => [
            "Mozambique",
            4
        ],
        "UA" => [
            "Ukraine",
            5
        ],
        "GF" => [
            "French Guiana",
            5
        ],
        "NP" => [
            "Nepal",
            5
        ],
        "UY" => [
            "Uruguay",
            5
        ],
        "PF" => [
            "French Polynesia",
            5
        ],
        "NL" => [
            "Netherlands",
            7
        ],
        "UZ" => [
            "Uzbekistan",
            6
        ],
        "GE" => [
            "Georgia",
            4
        ],
        "VA" => [
            "Vatican",
            5
        ],
        "DE" => [
            "Germany",
            5
        ],
        "NC" => [
            "New Caledonia",
            5
        ],
        "VE" => [
            "Venezuela",
            6
        ],
        "GI" => [
            "Gibraltar",
            8
        ],
        "NZ" => [
            "New Zealand",
            4
        ],
        "GB" => [
            "United Kingdom (UK)",
            8
        ],
        "NI" => [
            "Nicaragua",
            5
        ],
        "VN" => [
            "Vietnam",
            6
        ],
        "NE" => [
            "Niger",
            4
        ],
        "VG" => [
            "British Virgin Islands",
            6
        ],
        "NG" => [
            "Nigeria",
            6
        ],
        "WF" => [
            "Wallis and Futuna",
            5
        ],
        "GR" => [
            "Greece",
            6
        ],
        "NF" => [
            "Norfolk Island",
            4
        ],
        "AX" => [
            "Åland Islands",
            5
        ]
    ];
    
    //
    private $cc;

    private $expiry;

    private $ccv;

    private $cards_pattern = false;

    function __construct($cc_number, $cc_expiry = null, $ccv = null)
    {
        $this->cc = $this->_sanitize($cc_number);
        $this->expiry = $this->_sanitize($cc_expiry);
        $this->ccv = $ccv;
    }

    /**
     * Returns the card number length by issuer
     *
     * @param int $issuer            
     * @return int Returns the length
     */
    private function _get_cclen_by_issuer($issuer)
    {
        switch ($issuer) {
            case self::AMEX:
                return 15;
            case self::VISA:
                return 13 | 16;
            case self::MASTER:
                return 16;
            case self::DISCOVER:
                return 16;
            case self::DINERS:
                return 14;
            case self::JCB:
                return 16;
            case self::MAESTRO:
                return 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
            default:
                return 0;
        }
    }

    /**
     * Returns an identifier for a valid card issuer, false otherwise
     *
     * @return boolean|int
     * @see http://www.computersolving.com/computer-tips-tricks/what-your-credit-card-numbers-mean/
     */
    public function is_valid_issuer()
    {
        // We expect the following patterns:
        // @see http://www.barclaycard.co.uk/business/files/Ranges_and_Rules_September_2014.pdf
        $patterns = array(
            self::JCB => '(^(352)[8-9](\d{11}$|\d{12}$))|(^(35)[3-8](\d{12}$|\d{13}$))',
            self::AMEX => '(^3[47])((\d{11}$)|(\d{13}$))',
            self::VISA => '(^4\d{12}$)|(^4[0-8]\d{14}$)|(^(49)[^013]\d{13}$)|(^(49030)[0-1]\d{10}$)|(^(49033)[0-4]\d{10}$)|(^(49110)[^12]\d{10}$)|(^(49117)[0-3]\d{10}$)|(^(49118)[^0-2]\d{10}$)|(^(493)[^6]\d{12}$)',
            self::MASTER => '^5[1-5]\d{14}$',
            self::DINERS => '(^(30)[0-5]\d{11}$)|(^(36)\d{12}$)|(^(38[0-8])\d{11}$)',
            self::MAESTRO => '(^(5[0678])\d{11,18}$)|(^(6[^0357])\d{11,18}$)|(^(601)[^1]\d{9,16}$)|(^(6011)\d{9,11}$)|(^(6011)\d{13,16}$)|(^(65)\d{11,13}$)|(^(65)\d{15,18}$)|(^(633)[^34](\d{9,16}$))|(^(6333)[0-4](\d{8,10}$))|(^(6333)[0-4](\d{12}$))|(^(6333)[0-4](\d{15}$))|(^(6333)[5-9](\d{8,10}$))|(^(6333)[5-9](\d{12}$))|(^(6333)[5-9](\d{15}$))|(^(6334)[0-4](\d{8,10}$))|(^(6334)[0-4](\d{12}$))|(^(6334)[0-4](\d{15}$))|(^(67)[^(59)](\d{9,16}$))|(^(6759)](\d{9,11}$))|(^(6759)](\d{13}$))|(^(6759)](\d{16}$))|(^(67)[^(67)](\d{9,16}$))|(^(6767)](\d{9,11}$))|(^(6767)](\d{13}$))|(^(6767)](\d{16}$))',
            self::DISCOVER => '(^(6011)\d{12}$)|(^(65)\d{14}$)'
        );
        $cclen = strlen($this->cc);
        foreach ($patterns as $issuer => $pattern)
            if (preg_match("/^$pattern/", $this->cc) && $cclen == ($cclen & $this->_get_cclen_by_issuer($issuer)))
                return $issuer;
        
        return false;
    }

    /**
     * Sanitize the card number/expiry/ccv of any invalid characters
     *
     * @param string $str
     *            The input string
     * @return string Returns the sanitized input string
     */
    private function _sanitize($str)
    {
        return empty($str) ? $str : preg_replace('/[\D]/', '', $str);
    }

    /**
     * Calculates the Luhn's checksum for a number
     *
     * @param int $number
     *            A number
     * @param bool $has_checkdigit
     *            True if the cc includes the checkdigit( last char), false otherwise
     * @return number Returns the Luhn's checksum
     * @see http://en.wikipedia.org/wiki/Luhn_algorithm
     */
    private function _luhn_checksum($has_checkdigit = true)
    {
        $compute_check_digit = function ($checksum) {
            return 9 * $checksum % 10;
        };
        $checksum = 0;
        // skip the first digit (the ckeck digit after reversion)
        foreach (str_split(substr(strrev($this->cc), $has_checkdigit)) as $index => $digit) {
            if (0 == $index % 2)
                $checksum += ($product = 2 * $digit) > 9 ? $product - 9 : $product;
            else
                $checksum += $digit;
        }
        return $checksum + ($has_checkdigit ? substr($this->cc, - 1) : $compute_check_digit($checksum)); // add the check digit to the checksum
    }

    /**
     * Checks the card number against its check digit
     *
     * @param string $card_number
     *            (12-19 digits)
     * @return boolean Returns true if the card number is valid, false otherwise
     * @see http://en.wikipedia.org/wiki/Luhn_algorithm
     */
    public function is_valid_number()
    {
        if (strlen($this->cc) < 12 || strlen($this->cc) > 19)
            return false;
        
        $cclen = strlen($this->cc);
        if (false !== ($issuer = $this->is_valid_issuer())) {
            $has_check_digit = $cclen == ($this->_get_cclen_by_issuer($issuer) & $cclen);
            return 0 == $this->_luhn_checksum($has_check_digit) % 10;
        }
        return false;
    }

    /**
     * Checks if the expiry date has valid MMYY format (the separator is sanitized)
     *
     * @return boolean Return true if a valid date format, false otherwise
     */
    public function is_valid_expiry()
    {
        $result = 4 == strlen($this->expiry) && ($mm = intval(substr($this->expiry, 0, 2))) < 13 && $mm > 0;
        if (($yy = intval(substr($this->expiry, 2))) >= date('y')) {
            $time = 3600 * 24 * (365 * (2000 + $yy - 1970) + 30 * ($mm + 1));
            return $time >= time();
        }
        return false;
    }

    /**
     * Checks if the CCV/CVC/CID/whatever is valid number
     *
     * @return boolean Returns true if valid , false otherwise
     */
    public function is_valid_ccv()
    {
        return strlen($this->ccv) > 2 && strlen($this->ccv) < 5 && ! preg_match('/[\D]/', $this->ccv);
    }

    /**
     * Returns the card issuer name if known, false otherwise
     *
     * @param int|array $issuer
     *            The issuer ID. If not specified then it will be auto-detected from cc. If array then will return an array of issuers names.
     * @return boolean|string|array
     */
    public function get_card_issuer($issuer = false)
    {
        $issuers = array(
            self::JCB => 'JCB',
            self::AMEX => 'American Express',
            self::VISA => 'Visa',
            self::MASTER => 'Mastercard',
            self::DINERS => 'Diner\'s Club',
            self::MAESTRO => 'Maestro',
            self::DISCOVER => 'Discover'
        );
        
        if (false !== $issuer || false !== ($issuer = $this->is_valid_issuer())) {
            return is_array($issuer) ? array_intersect_key($issuers, array_flip($issuer)) : $issuers[$issuer];
        }
        return false;
    }

    /**
     * Check whether the postal_code has a valid length for the given country.
     * If the country is not found then at least
     * checks if the length is within the min-max range for postal codes.
     *
     * @return Returns true if the length of the postal code is valid, false otherwise
     */
    function is_valid_postalcode($postal_code, $country)
    {
        $len = strlen($postal_code);
        
        return array_key_exists($country, country_postal_code_lengths) ? $len == country_postal_code_lengths[$country][1] : $len >= MIN_POSTAL_CODE_LENGTH && $len <= MAX_POSTAL_CODE_LENGTH;
    }

    /**
     * Get the list of countries and their max length postal codes
     *
     * @return Returns an object where keys are country code and value an tupple with country name and country's max postal
     *         length
     */
    function get_country_postal_code_lengths()
    {
        return country_postal_code_lengths;
    }

    /**
     * Get the card issuer code (eg.
     * visa, mastercard)
     *
     * @return Returns a string representing the card code on success, "unknown" string otherwise
     */
    function get_card_issuer_code()
    {
        $id = is_valid_issuer($cc, true);
        $code = "unknown";
        if (false === $id) {
            return $code;
        }
        
        switch ($id) {
            case AMEX:
                $code = "amex";
                break;
            case VISA:
                $code = "visa";
                break;
            case MASTER:
                $code = "mastercard";
                break;
            case DISCOVER:
                $code = "discover";
                break;
            case DINERS:
                $code = "dinersclub";
                break;
            case JCB:
                $code = "jcb";
                break;
            case MAESTRO:
                $code = "maestro";
                break;
        }
        
        return $code;
    }

    /**
     * Set a custom set of patterns to be used for testing card number
     *
     * @param $pattern Object
     *            pattern An Object where key is the card issuer and value is the correspondent pattern
     */
    function set_cards_pattern($pattern)
    {
        if (! empty($pattern)) {
            $this->cards_pattern = $pattern;
        }
    }
}
?>