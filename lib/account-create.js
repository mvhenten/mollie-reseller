'use strict';

var Wolperting = require('class-wolperting'),
    API = require('api');

module.exports = Wolperting.extend( API, {

    username: String,

    name: String,

    email: String,

    address: String,

    zipcode: String,

    city: String,

    country: {
        $isa: function ValidCountry( value ){
            return [ 'NL', 'BE' ].indexOf( value) !== -1;
        },
        value: 'NL',
    }
});