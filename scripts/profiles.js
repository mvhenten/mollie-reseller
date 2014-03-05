#!/usr/bin/env node

'use strict';

var Reseller = require('../lib/reseller');

var api = new Reseller({
    partner_id: process.env.MOLLIE_PARTNER_ID,
    profile_key: process.env.MOLLIE_PROFILE_KEY,
    app_secret: process.env.MOLLIE_APP_SECRET
});

api.profiles({
    username: '<real username>',
    password: '<real password>',
}, function(err, result) {
    console.log(result);
    process.exit();
});
