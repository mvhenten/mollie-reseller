# mollie-reseller

Unofficial implementation of the mollie-reseller API for node. This library is
a straight forward port of some of the example php scripts supplied by Mollie.

All available methods are supported, you should, however, always check the results for
any validation errors reported by Mollie, as this module does not check for required
parameters.

You must sign up as a [re-seller](https://www.mollie.nl/betaaldiensten/ideal/reseller/) in
order to access the full documentation. Currently this documentation is not disclosed
publicly.

## About

Mollie is a Payment Service Provider from the Netherlands. They allow you to create
new customers trough their re-seller API as part of your platform integration.

The following API methods are supported:

* account-claim
* account-create
* account-edit
* account-valid
* available-payment-methods
* bankaccount-edit
* bankaccounts
* profile-create
* profiles

## Example

The folowing is an example of how to create a new Mollie account for your customer.
You will need to sign up for a mollie account and the reseller program in order to
retrieve the correct credentials.

```javascript
    var Reseller = require('../lib/reseller');

    var api = new Reseller({
        partner_id: '<MOLLIE_PARTNER_ID>',
        profile_key: '<MOLLIE_PROFILE_KEY>',
        app_secret: '<MOLLIE_APP_SECRET>'
    });

    api.accountCreate({
        username: 'my_customer',
        name: 'John Doe',
        email: 'john+doe@example.com',
        address: 'Damstraat 1',
        zipcode: '1011AB',
        city: 'Amsterdam',
        country: '1',
        testmode: true,
    }, function(err, result) {
        console.log(result);
        process.exit();
    });
````

## Disclaimer

1. I am in no way affilated with Mollie, except that I have joined their reseller API ;-)
2. This module does not implement the actual payment backend - there are [others](https://www.npmjs.org/search?q=mollie)
