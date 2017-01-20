# Credit Card Validator
This project contains a pure JavaScript|PHP class that aids in credit card validation.

Both, the JavaScript and PHP class respectively, consists of a singleton that encapsulates the whole business logic needed to determine:
- if the credit card and/or CCV are syntactically valid (they match the issuer numbering pattern)
- if the card expiry date is valid (basically it is compared against the current date)
- the credit card issuer name (American Express, Visa, MasterCard, Discover, DinersClub, JCB and Maestro only)

# How to use it

Below is a snippet of JavaScript|PHP code. First init the library by sending the credit card number, expiry date and CCV respectively. Later you can call 5 different helper functions described as following:
- `is_valid_number` : returns true if the credit card number is syntactically valid (respects one of the known credit card numbering pattern)
- `is_valid_expiry` : returns true if the expiry date (which should be DD/MM format) is a valid date
- `is_valid_ccv` : returns true if the CCV is syntactically valid (depends on the credit card number, ie. card issuer)
- `is_valid_issuer` : returns an integer representing the issuer ID, false if no valid/known credit card
- `is_valid_postcode(postal_code, country)` : returns true if the postal_code length is valid for the given country code 
- `get_card_issuer(issuer_id)` : returns the card brand name (eg. American Express, Visa, Maestro)
- `get_card_issuer_code` : returns the card brand code (eg. visa, mastercard, amex,etc or `unknown` for invalid card numbers)
- `get_country_postal_code_lengths` : returns a list of all countries and their associate postal code lengths (eg. SE => {Sweden,6})
- `set_cards_pattern(pattern)` : allows you to set a custom set of patterns to be used for testing card numbers (eg: {1=>"regex-pattern-for-VISA"}, see `constants` below)

## Constants
The following constants may be used to refer a certain card identifier instead of using their raw integer identifier:
```javascript
    var AMEX = 0;
    var VISA = 1;
    var MASTER = 2;
    var DISCOVER = 3;
    var DINERS = 4;
    var JCB = 5;
    var MAESTRO = 6;
```

### JavaScript
```javascript
    // JavaScript sample usage (make sure you include the .js source file)
    var valid_number, valid_expiry, valid_ccv, valid_postal_code_len, issuer_name, api = Mynix.CC_Validator;
    api.init('4111111111111111', '05/16', '123');
    valid_number = api.is_valid_number();
    valid_expiry = api.is_valid_expiry();
    valid_ccv = api.is_valid_ccv();
    valid_postal_code_len= api.is_valid_postalcode('12345', 'SE');
    issuer_name = valid_number ? api.get_card_issuer(api.is_valid_issuer()) : '';
```
### PHP
```php
   // PHP sample usage (make sure you include the .php class file)
    $api=new CC_Validator('4111111111111111','05/16', '123');
    $valid_number = $api.is_valid_number();
    $valid_expiry = $api.is_valid_expiry();
    $valid_ccv = $api.is_valid_ccv();
    $issuer_name = $valid_number?$api.get_card_issuer($api.is_valid_issuer()):'';
```

# Online Sandbox
http://sandbox.mynixworld.info/ccv-validator
