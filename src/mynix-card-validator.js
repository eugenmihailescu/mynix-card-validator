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
