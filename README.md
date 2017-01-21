# Credit Card Validator
This project is a pure JavaScript implementation that offers credit card validation support. It is written modular such that one could bundle only the components that are required. So for instance the smallest footprint in its minimized form could be 1K. No external JS|PHP framework or module bundler is required at all.

The JavaScript implementation is splitted in few tiny modules (which can be bundled together). It answers the following questions:
- if the credit card and/or CCV are syntactically valid (they match the issuer numbering pattern)
- if the card expiry date is valid (basically it parses the string and compares it against the current date)
- gives the credit card issuer name (American Express, Visa, MasterCard, Discover, DinersClub, JCB and Maestro only)

Furthermore the library contains some extended functionalities that aids in:
- check the validity of a postal code length given the country code
- check if a given country has Braintree Payment Gateway support (given the [Braintree](https://www.braintreepayments.com/) module one could easily create similar modules for [Stripe](https://stripe.com/se), [PayPal](https://www.paypal.com/), etc)

# What this repo includes

- `src` directory contains the source code of the library (a tiny monolithic module)
- `src/deps` directory contains other dependent JS modules that, with the exception of `Utils` and `Constants`, could be just discarded and still get a credit card validator library (without extended functionality)
- `dist` directory contains a unminified and a minified bundle of the library (together with the bundle builder script)
- `demo` directory contains a demo application (index.html,bundle.min.js,app.css,cc-badge.png)

# Online Sandbox
http://sandbox.mynixworld.info/ccv-validator
