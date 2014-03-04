#!/usr/bin/env node

'use strict';

var API = require('../lib/api');

var api = new API({
    partner_id: process.env.MOLLIE_PARTNER_ID,
    profile_key: process.env.MOLLIE_PROFILE_KEY,
    app_secret: process.env.MOLLIE_APP_SECRET,
    action: 'account-create'
});

api.post({
    username: 'my_customer',

    name: 'John Doe',

    email: 'info@ischen.nl',

    address: 'Damstraat 1',

    zipcode: '1011AB',

    city: 'Amsterdam',

    country: '1'

}, function(err, result) {
    console.log(result);

    process.exit();
});
