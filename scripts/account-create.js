#!/usr/bin/env node

'use strict';

var Reseller = require('../lib/reseller');

var api = new Reseller({
    partner_id: process.env.MOLLIE_PARTNER_ID,
    profile_key: process.env.MOLLIE_PROFILE_KEY,
    app_secret: process.env.MOLLIE_APP_SECRET
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
