# Credit Card Validator
This project contains a pure JavaScript|PHP class that aids in credit card validation. No external JS|PHP framework or module bundler is required at all.

The PHP implementation encloses the whole logic into a singlton class where JavaScript implementation is splitted in few tiny modules (which can be bundled together). Both offer the same functionalities and answer the following questions:
- if the credit card and/or CCV are syntactically valid (they match the issuer numbering pattern)
- if the card expiry date is valid (basically it is compared against the current date)
- the credit card issuer name (American Express, Visa, MasterCard, Discover, DinersClub, JCB and Maestro only)
- additionaly there is a new function that allows to check even the validity of postal code length given the country code

# Online Sandbox
http://sandbox.mynixworld.info/ccv-validator
