# Credit Card Validator
This project contains a pure JavaScript|PHP class that aids in credit card validation.

Both, the JavaScript and PHP class respectively, consists of a singleton that encapsulates the whole business logic needed to determine:
- if the credit card and/or CCV are syntactically valid (they match the issuer numbering pattern)
- if the card expiry date is valid (basically it is compared against the current date)
- the credit card issuer name (American Express, Visa, MasterCard, Discover, DinersClub, JCB and Maestro only)

# How to use it

Below is a snippet of JavaScript|PHP code. First init the library by sending the credit card number, expiry date and CCV respectively. Later you can call 5 different helper functions described as following:
- is_valid_number : returns true if the credit card number is syntactically valid (respects one of the known credit card numbering pattern)
- `is_valid_expiry` : returns true if the expiry date (which should be DD/MM format) is a valid date
- `is_valid_ccv` : returns true if the CCV is syntactically valid (depends on the credit card number, ie. card issuer)
- `is_valid_issuer` : returns an integer representing the issuer ID, false if no valid/known credit card
- `get_car_issuer(issuer_id)` : returns the credit card issuer name (eg. American Express, Visa, Maestro)

### JavaScript
```javascript
    // JavaScript sample usage (make sure you include the .js source file)
    var valid_number, valid_expiry, valid_ccv, issuer_name, api = Mynix.CC_Validator;
    api.init('4111111111111111', '05/16', '123');
    valid_number = api.is_valid_number();
    valid_expiry = api.is_valid_expiry();
    valid_ccv = api.is_valid_ccv();
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
