
var Utils = (function() {
    return {
        extend : function() {
            var arg;
            var prop;
            var result = {};

            for (arg in arguments) {
                if (arguments.hasOwnProperty(arg) && "object" === typeof arguments[arg]) {
                    for (prop in arguments[arg]) {
                        if (arguments[arg].hasOwnProperty(prop)) {
                            result[prop] = arguments[arg][prop];
                        }
                    }
                }
            }
            return result;
        },
        strrev : function(s) {
            return s.split('').reverse().join('');
        }
    }
})();


//http://www.countrycallingcodes.com/iso-country-codes/asia-codes.php
var Asia = (function() {
    return {
//        "AF" : "Afghanistan",
//        "AM" : "Armenia",
//        "AZ" : "Azerbaijan",
//        "BH" : "Bahrain",
//        "BD" : "Bangladesh",
//        "BT" : "Bhutan",
//        "BN" : "Brunei",
//        "KH" : "Cambodia",
//        "CN" : "China",
//        "CX" : "Christmas Island",
//        "CC" : "Cocos Islands",
//        "IO" : "Diego Garcia",
//        "GE" : "Georgia",
        
        "HK" : "Hong Kong",
        
//        "IN" : "India",
//        "ID" : "Indonesia",
//        "IR" : "Iran",
//        "IQ" : "Iraq",
//        "IL" : "Israel",
//        "JP" : "Japan",
//        "JO" : "Jordan",
//        "KZ" : "Kazakhstan",
//        "KW" : "Kuwait",
//        "KG" : "Kyrgyzstan",
//        "LA" : "Laos",
//        "LB" : "Lebanon",
//        "MO" : "Macau",
        
        "MY" : "Malaysia",
        
//        "MV" : "Maldives",
//        "MN" : "Mongolia",
//        "MM" : "Myanmar",
//        "NP" : "Nepal",
//        "KP" : "North Korea",
//        "OM" : "Oman",
//        "PK" : "Pakistan",
//        "PS" : "Palestine",
//        "PH" : "Philippines",
//        "QA" : "Qatar",
//        "SA" : "Saudi Arabia",
        
        "SG" : "Singapore"
        
//        "KR" : "South Korea",
//        "LK" : "Sri Lanka",
//        "SY" : "Syria",
//        "TW" : "Taiwan",
//        "TJ" : "Tajikistan",
//        "TH" : "Thailand",
//        "TR" : "Turkey",
//        "TM" : "Turkmenistan",
//        "AE" : "United Arab Emirates",
//        "UZ" : "Uzbekistan",
//        "VN" : "Vietnam",
//        "YE" : "Yemen"
    };
})();


//http://www.countrycallingcodes.com/iso-country-codes/europe-codes.php
var Europe = (function() {
    return {
        "AL" : "Albania",
        "AD" : "Andorra",
        "AT" : "Austria",
        "BY" : "Belarus",
        "BE" : "Belgium",
        "BA" : "Bosnia and Herzegovina",
        "BG" : "Bulgaria",
        "HR" : "Croatia",
        "CY" : "Cyprus",
        "CZ" : "Czech Republic",
        "DK" : "Denmark",
        "EE" : "Estonia",
        "FO" : "Faroe Islands",
        "FI" : "Finland",
        "FR" : "France",
        "DE" : "Germany",
        "GI" : "Gibraltar",
        "GR" : "Greece",
        "HU" : "Hungary",
        "IS" : "Iceland",
        "IE" : "Ireland",
        "IM" : "Isle of Man",
        "IT" : "Italy",
        "RS" : "Yugoslavia",
        "LV" : "Latvia",
        "LI" : "Liechtenstein",
        "LT" : "Lithuania",
        "LU" : "Luxembourg",
        "MK" : "Macedonia",
        "MT" : "Malta",
        "MD" : "Moldova",
        "MC" : "Monaco",
        "ME" : "Montenegro",
        "NL" : "Netherlands",
        "NO" : "Norway",
        "PL" : "Poland",
        "PT" : "Portugal",
        "RO" : "Romania",
        "RU" : "Russia",
        "SM" : "San Marino",
        "SK" : "Slovakia",
        "SI" : "Slovenia",
        "ES" : "Spain",
        "SE" : "Sweden",
        "CH" : "Switzerland",
        "UA" : "Ukraine",
        "GB" : "United Kingdom",
        "VA" : "Vatican city"
    }
})();

//http://www.countrycallingcodes.com/iso-country-codes/australia-codes.php
var Pacific = (function() {
    return {
        "NZ" : "New Zealand"
//        "AS" : "American Samoa",
//        "CK" : "Cook Islands",
//        "TL" : "East Timor",
//        "FM" : "Federated States of Micronesia",
//        "FJ" : "Fiji Islands",
//        "PF" : "French Polynesia",
//        "GU" : "Guam",
//        "KI" : "Kiribati",
//        "MP" : "Saipan",
//        "MH" : "Marshall Islands",
//        "UM" : "Wake Island",
//        "NR" : "Nauru",
//        "NC" : "New Caledonia",
//        "NU" : "Niue",
//        "NF" : "Norfolk Island",
//        "PW" : "Palau",
//        "PG" : "Papua New Guinea",
//        "WS" : "Samoa",
//        "SB" : "Solomon Islands",
//        "TK" : "Tokelau",
//        "TO" : "Tonga",
//        "TV" : "Tuvalu",
//        "VU" : "Vanuatu",
//        "WF" : "Wallis and Futuna Islands"
    };
})();

var USA = (function() {
    return {
        "US" : "United States of America"
    }
})();
var Canada = (function() {
    return {
        "CA" : "Canada"
    }
})();
var Australia = (function() {
    return {
        "AU" : "Australia"
    };
})();

var World = (function(modules) {
    return modules.utils
            .extend(modules.usa, modules.canada, modules.asia, modules.pacific, modules.europe, modules.australia);
})({
    utils : Utils,
    usa : USA,
    canada : Canada,
    asia : Asia,
    pacific : Pacific,
    europe : Europe,
    australia : Australia
});


var Constants = (function() {
    return {
        MIN_CARD_NUMBER_LENGTH : 12,
        MAX_CARD_NUMBER_LENGTH : 19,
        brands : {
            "unknown" : "Unknown",
            "jcb" : "JCB",
            "amex" : "American Express",
            "visa" : "Visa",
            "mastercard" : "Mastercard",
            "dinersclub" : "Diner's Club",
            "maestro" : "Maestro",
            "discover" : "Discover",
            "unionpay" : "UnionPay"
        },
        patterns : {
            "jcb" : "(^(352)[8-9](\\d{11}$|\\d{12}$))|(^(35)[3-8](\\d{12}$|\\d{13}$))",
            "amex" : "(^3[47])((\\d{11}$)|(\\d{13}$))",
            "visa" : "(^4\\d{12}$)|(^4[0-8]\\d{14}$)|(^(49)[^013]\\d{13}$)|(^(49030)[0-1]\\d{10}$)|(^(49033)[0-4]\\d{10}$)|(^(49110)[^12]\\d{10}$)|(^(49117)[0-3]\\d{10}$)|(^(49118)[^0-2]\\d{10}$)|(^(493)[^6]\\d{12}$)",
            "mastercard" : "^5[1-5]\\d{14}$",
            "dinersclub" : "(^(30)[0-5]\\d{11}$)|(^(36)\\d{12}$)|(^(38[0-8])\\d{11}$)",
            "maestro" : "(^(5[0678])\\d{11,18}$)|(^(6[^0357])\\d{11,18}$)|(^(601)[^1]\\d{9,16}$)|(^(6011)\\d{9,11}$)|(^(6011)\\d{13,16}$)|(^(65)\\d{11,13}$)|(^(65)\\d{15,18}$)|(^(633)[^34](\\d{9,16}$))|(^(6333)[0-4](\\d{8,10}$))|(^(6333)[0-4](\\d{12}$))|(^(6333)[0-4](\\d{15}$))|(^(6333)[5-9](\\d{8,10}$))|(^(6333)[5-9](\\d{12}$))|(^(6333)[5-9](\\d{15}$))|(^(6334)[0-4](\\d{8,10}$))|(^(6334)[0-4](\\d{12}$))|(^(6334)[0-4](\\d{15}$))|(^(67)[^(59)](\\d{9,16}$))|(^(6759)](\\d{9,11}$))|(^(6759)](\\d{13}$))|(^(6759)](\\d{16}$))|(^(67)[^(67)](\\d{9,16}$))|(^(6767)](\\d{9,11}$))|(^(6767)](\\d{13}$))|(^(6767)](\\d{16}$))",
            "discover" : "(^(6011)\\d{12}$)|(^(65)\\d{14}$)",
            "unionpay" : ".?"
        },
        ccv_length : {
            "amex" : 15,
            "visa" : 13 | 16,
            "mastercard" : 16,
            "discover" : 16,
            "dinersclub" : 14,
            "jcb" : 16,
            "maestro" : 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19,
            "unionpay" : 0
        }
    }
})();

// valid postal codes length by country
// http://www.upu.int/uploads/tx_sbdownloader/manualAddressingKnowledgeCentreGeneralIssuesEn.pdf
var PostalCodesLength = (function() {
    return {
        consts : {
            MIN_POSTAL_CODE_LENGTH : 3,
            MAX_POSTAL_CODE_LENGTH : 10
        },
        codes : {
            "AF" : [ "Afghanistan", 4 ],
            "GL" : [ "Greenland", 4 ],
            "NO" : [ "Norway", 4 ],
            "DZ" : [ "Algeria", 5 ],
            "GP" : [ "Guadeloupe", 5 ],
            "OM" : [ "Oman", 3 ],
            "AD" : [ "Andorra", 5 ],
            "GT" : [ "Guatemala", 5 ],
            "PK" : [ "Pakistan", 5 ],
            "AR" : [ "Argentina", 5 ],
            "GN" : [ "Guinea", 3 ],
            "PG" : [ "Papua New Guinea", 3 ],
            "AM" : [ "Armenia", 4 ],
            "GW" : [ "Guinea-Bissau", 4 ],
            "PY" : [ "Paraguay", 4 ],
            "HT" : [ "Haiti", 4 ],
            "PE" : [ "Peru", 5 ],
            "AU" : [ "Australia", 4 ],
            "HN" : [ "Honduras", 6 ],
            "PH" : [ "Philippines", 4 ],
            "AT" : [ "Austria", 4 ],
            "HU" : [ "Hungary", 4 ],
            "PN" : [ "Pitcairn", 8 ],
            "AZ" : [ "Azerbaijan", 7 ],
            "IS" : [ "Iceland", 3 ],
            "PL" : [ "Poland", 6 ],
            "BH" : [ "Bahrain", 4 ],
            "IN" : [ "India", 6 ],
            "PT" : [ "Portugal", 8 ],
            "ID" : [ "Indonesia", 5 ],
            "RO" : [ "Romania", 6 ],
            "BD" : [ "Bangladesh", 4 ],
            "IR" : [ "Iran", 6 ],
            "RU" : [ "Russia", 6 ],
            "BB" : [ "Barbados", 7 ],
            "IQ" : [ "Iraq", 5 ],
            "RE" : [ "Reunion", 5 ],
            "BY" : [ "Belarus", 6 ],
            "IL" : [ "Israel", 5 ],
            "GS" : [ "South Georgia/Sandwich Islands", 8 ],
            "BE" : [ "Belgium", 4 ],
            "IT" : [ "Italy", 5 ],
            "BL" : [ "Saint Barthélemy", 5 ],
            "BM" : [ "Bermuda", 5 ],
            "JP" : [ "Japan", 8 ],
            "SH" : [ "Saint Helena", 8 ],
            "BT" : [ "Bhutan", 5 ],
            "JO" : [ "Jordan", 5 ],
            "MF" : [ "Saint Martin (French part)", 5 ],
            "BA" : [ "Bosnia and Herzegovina", 5 ],
            "KZ" : [ "Kazakhstan", 6 ],
            "PM" : [ "Saint Pierre and Miquelon", 5 ],
            "KE" : [ "Kenya", 5 ],
            "WS" : [ "Samoa", 6 ],
            "BR" : [ "Brazil", 9 ],
            "KR" : [ "South Korea", 5 ],
            "SM" : [ "San Marino", 5 ],
            "SA" : [ "Saudi Arabia", 5 ],
            "BN" : [ "Brunei", 6 ],
            "KW" : [ "Kuwait", 5 ],
            "SN" : [ "Senegal", 5 ],
            "BG" : [ "Bulgaria", 4 ],
            "KG" : [ "Kyrgyzstan", 6 ],
            "RS" : [ "Serbia", 6 ],
            "CV" : [ "Cape Verde", 4 ],
            "LA" : [ "Laos", 5 ],
            "KH" : [ "Cambodia", 5 ],
            "LV" : [ "Latvia", 7 ],
            "SG" : [ "Singapore", 6 ],
            "CA" : [ "Canada", 7 ],
            "LB" : [ "Lebanon", 9 ],
            "SK" : [ "Slovakia", 6 ],
            "KY" : [ "Cayman Islands", 8 ],
            "SI" : [ "Slovenia", 4 ],
            "CL" : [ "Chile", 7 ],
            "LS" : [ "Lesotho", 3 ],
            "ZA" : [ "South Africa", 4 ],
            "CN" : [ "China", 6 ],
            "LI" : [ "Liechtenstein", 4 ],
            "ES" : [ "Spain", 5 ],
            "CX" : [ "Christmas Island", 4 ],
            "LT" : [ "Lithuania", 5 ],
            "LK" : [ "Sri Lanka", 5 ],
            "LU" : [ "Luxembourg", 6 ],
            "MK" : [ "Macedonia", 4 ],
            "SD" : [ "Sudan", 5 ],
            "CR" : [ "Costa Rica", 5 ],
            "MG" : [ "Madagascar", 3 ],
            "SJ" : [ "Svalbard and Jan Mayen", 4 ],
            "HR" : [ "Croatia", 5 ],
            "MY" : [ "Malaysia", 5 ],
            "SZ" : [ "Swaziland", 4 ],
            "CU" : [ "Cuba", 5 ],
            "MV" : [ "Maldives", 5 ],
            "SE" : [ "Sweden", 6 ],
            "CY" : [ "Cyprus", 4 ],
            "MT" : [ "Malta", 8 ],
            "CH" : [ "Switzerland", 4 ],
            "CZ" : [ "Czech Republic", 6 ],
            "TW" : [ "Taiwan", 5 ],
            "DK" : [ "Denmark", 4 ],
            "TJ" : [ "Tajikistan", 6 ],
            "MQ" : [ "Martinique", 5 ],
            "TZ" : [ "Tanzania", 5 ],
            "DO" : [ "Dominican Republic", 5 ],
            "YT" : [ "Mayotte", 5 ],
            "TH" : [ "Thailand", 5 ],
            "EC" : [ "Ecuador", 6 ],
            "MX" : [ "Mexico", 5 ],
            "TT" : [ "Trinidad and Tobago", 6 ],
            "EG" : [ "Egypt", 5 ],
            "MD" : [ "Moldova", 4 ],
            "SV" : [ "El Salvador", 4 ],
            "MC" : [ "Monaco", 5 ],
            "TN" : [ "Tunisia", 4 ],
            "EE" : [ "Estonia", 5 ],
            "MN" : [ "Mongolia", 5 ],
            "TR" : [ "Turkey", 5 ],
            "ET" : [ "Ethiopia", 4 ],
            "ME" : [ "Montenegro", 5 ],
            "TM" : [ "Turkmenistan", 6 ],
            "FK" : [ "Falkland Islands", 8 ],
            "MS" : [ "Montserrat", 7 ],
            "FO" : [ "Faroe Islands", 3 ],
            "MA" : [ "Morocco", 5 ],
            "US" : [ "United States (US)", 5 ],
            "FI" : [ "Finland", 5 ],
            "FR" : [ "France", 5 ],
            "MZ" : [ "Mozambique", 4 ],
            "UA" : [ "Ukraine", 5 ],
            "GF" : [ "French Guiana", 5 ],
            "NP" : [ "Nepal", 5 ],
            "UY" : [ "Uruguay", 5 ],
            "PF" : [ "French Polynesia", 5 ],
            "NL" : [ "Netherlands", 7 ],
            "UZ" : [ "Uzbekistan", 6 ],
            "GE" : [ "Georgia", 4 ],
            "VA" : [ "Vatican", 5 ],
            "DE" : [ "Germany", 5 ],
            "NC" : [ "New Caledonia", 5 ],
            "VE" : [ "Venezuela", 6 ],
            "GI" : [ "Gibraltar", 8 ],
            "NZ" : [ "New Zealand", 4 ],
            "GB" : [ "United Kingdom (UK)", 8 ],
            "NI" : [ "Nicaragua", 5 ],
            "VN" : [ "Vietnam", 6 ],
            "NE" : [ "Niger", 4 ],
            "VG" : [ "British Virgin Islands", 6 ],
            "NG" : [ "Nigeria", 6 ],
            "WF" : [ "Wallis and Futuna", 5 ],
            "GR" : [ "Greece", 6 ],
            "NF" : [ "Norfolk Island", 4 ],
            "AX" : [ "Åland Islands", 5 ]
        }
    };
})();

var Braintree = (function(modules) {
    return {
        support : {
            "amex" : modules.world,
            "visa" : modules.world,
            "mastercard" : modules.world,
            "discover" : modules.utils.extend(modules.usa, modules.europe),
            "dinersclub" : modules.utils.extend(modules.usa, modules.europe, modules.australia),
            "jcb" : modules.utils.extend(modules.usa, modules.europe),
            "maestro" : modules.utils.extend(modules.usa, modules.europe),
            "unionpay" : modules.europe
        },
        has_support : function(issuer, country) {
            return Braintree.support[issuer].hasOwnProperty(country);
        }
    };
})({
    utils : Utils,
    world : World,
    usa : USA,
    europe : Europe,
    australia : Australia
});

/**
 * Generic class for credit card validation
 * 
 * @class CC_Validator
 * @since 0.1
 * @version 0.1
 * @author Eugen Mihailescu <eugenmihailescux@gmail.com>
 * 
 */

var CC_Validator = (function(modules, undefined) {
    /**
     * Returns an array of credit card patterns
     * 
     * @param boolean
     *            guess When true then return the pattern that allows guessing, otherwise the exact pattern
     * @return array of strings
     * 
     * @see http://www.computersolving.com/computer-tips-tricks/what-your-credit-card-numbers-mean/
     */
    function _get_patterns(guess) {
        guess = undefined === guess ? false : guess;

        // We expect the following patterns:
        // https://web.archive.org/web/20150722011618/http://www.barclaycard.co.uk/business/files/Ranges_and_Rules_September_2014.pdf

        patterns = modules.constants.patterns;

        // mangle the patterns such that they match shorter strings than they normally do
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
     * @param string
     *            $issuer
     * @return int Returns the length or false on error
     */
    function _get_cclen_by_issuer(issuer) {
        return modules.constants.ccv_length[issuer] || false;
    }

    /**
     * Sanitize the card number/expiry/ccv of any invalid characters
     * 
     * @param string
     *            $str The input string
     * @return string Returns the sanitized input string
     */
    function _sanitize(str) {
        return !str.length ? str : str.replace('/[\\D]/', '');
    }

    /**
     * Calculates the Luhn's checksum for a number
     * 
     * @param string
     *            $number The card number
     * @param bool
     *            $has_checkdigit True if the cc includes the checkdigit( last char), false otherwise
     * @return number Returns the Luhn's checksum
     * @see http://en.wikipedia.org/wiki/Luhn_algorithm
     */
    function _luhn_checksum(number, has_checkdigit) {
        has_checkdigit = undefined === has_checkdigit ? true : has_checkdigit;
        compute_check_digit = function(checksum) {
            return 9 * checksum % 10;
        };
        var checksum = 0;
        var digits = modules.utils.strrev(number).substring(has_checkdigit).split('');

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
        return checksum + (has_checkdigit ? parseInt(number.substr(-1)) : compute_check_digit(checksum));
    }

    return {
        /**
         * Returns an identifier for a valid card issuer, false otherwise. When guess = true it tries to guess the issuer even
         * if the card number has not the legal/expected length.
         * 
         * @oaram string number The card number
         * @params boolean guess guess When true then return the pattern that allows guessing, otherwise the exact pattern
         * @return boolean|string
         * 
         */
        is_valid_issuer : function(number, guess) {
            guess = undefined === guess ? false : guess;

            var patterns = _get_patterns(guess), cclen = number.length;

            for ( var issuer in patterns)
                if (patterns.hasOwnProperty(issuer)) {
                    var r = new RegExp(patterns[issuer]);
                    if (true === r.test(number) && (guess || cclen == (cclen & _get_cclen_by_issuer(issuer))))
                        return issuer;
                }

            return false;
        },

        /**
         * Checks the card number against its check digit
         * 
         * @param string
         *            number The card number (12-19 digits)
         * @return boolean Returns true if the card number is valid, false otherwise
         * @see http://en.wikipedia.org/wiki/Luhn_algorithm
         */
        is_valid_number : function(number) {
            if (number.length < modules.constants.MIN_CARD_NUMBER_LENGTH
                    || number.length > modules.constants.MAX_CARD_NUMBER_LENGTH)
                return false;

            cclen = number.length;
            if (false !== (issuer = CC_Validator.is_valid_issuer(number))) {
                has_check_digit = cclen == (_get_cclen_by_issuer(issuer) & cclen);
                return 0 == _luhn_checksum(number, has_check_digit) % 10;
            }

            return false;
        },

        /**
         * Checks if the expiry date has valid MMYY format (the separator is sanitized)
         * 
         * @param string
         *            expiry The card expiry date without the date separator symbol(eg. MMYY or MMYYYY)
         * @return boolean Return true if a valid date format, false otherwise
         */
        is_valid_expiry : function(expiry) {
            var today = new Date(), yyyy = today.getFullYear(), c_time, mm_len;

            mm_len = 4 == expiry.length ? 2 : 4;

            result = (mm = parseInt(expiry.substr(0, 2))) < 13 && mm > 0;

            if (result && (yy = parseInt(expiry.substr(mm_len))) >= (yyyy % (2 == mm_len ? 1000 : 1))) {
                c_time = 3600 * 24 * (365 * (2000 + yy - 1970) + 30 * (mm + 1));
                return c_time * 1000 >= today;
            }
            return false;
        },

        /**
         * Checks if the CCV/CVC/CID is a valid card verification number.
         * 
         * It must be 4 digits for AMEX and 3 digits for other card types
         * 
         * @param string
         *            number The card number
         * @param string
         *            ccv The CCV number to validate
         * @return boolean Returns true if valid , false otherwise
         */
        is_valid_ccv : function(number, ccv) {
            var len;
            if (false !== (issuer = CC_Validator.is_valid_issuer(number)))
                switch (issuer) {
                case "amex":
                    len = 4;
                    break;
                default:
                    len = 3;
                    break;
                }
            return ccv.length === len && !ccv.match('/[\\D]/');
        },

        /**
         * Check whether the postal_code has a valid length for the given country. If the country is not found then at least
         * checks if the length is within the min-max range for postal codes.
         * 
         * @return Returns true if the length of the postal code is valid, false otherwise
         */
        is_valid_postalcode : function(postal_code, country) {
            return modules.postal.codes.hasOwnProperty(country) ? postal_code.length == modules.postal.codes[country][1]
                    : postal_code.length >= modules.postal.consts.MIN_POSTAL_CODE_LENGTH
                            && postal_code.length <= modules.postal.consts.MAX_POSTAL_CODE_LENGTH;
        },

        /**
         * Returns the card issuer name if known, false otherwise
         * 
         * @param int|array
         *            $issuer The issuer ID. If not specified then it will be auto-detected from cc. If array then will return
         *            an array of issuers names.
         * @return boolean|string|array
         */
        get_card_issuer : function(issuer) {
            return modules.constants.brands.hasOwnProperty(issuer) ? modules.constants.brands[issuer] : false
        },

        /**
         * Set a custom set of patterns to be used for testing card number
         * 
         * @param Object
         *            pattern An Object where key is the card issuer and value is the correspondent pattern
         */
        set_cards_pattern : function(pattern) {
            var code;
            for (code in pattern) {
                if (pattern.hasOwnProperty(code)) {
                    modules.constants.patterns[code] = pattern[code];
                }
            }
        }
    }
})({
    constants : Constants,
    postal : PostalCodesLength,
    utils : Utils,
    cc : CC_Validator
});
