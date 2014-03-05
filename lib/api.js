'use strict';

var Wolperting = require('class-wolperting'),
    _ = require('lodash'),
    request = require('request'),
    xml2json = require('xml2json'),
    Url = require('url'),
    sign = require('./signature');

var API_URL = 'https://mollie.nl/api/reseller';

var API = Wolperting.create({

    api_version: {
        $isa: String,
        value: 'v1'
    },

    partner_id: String,

    profile_key: String,

    app_secret: String,

    testmode: {
        $isa: Boolean,
        value: true
    },

    action: {
        $isa: function ResellerMethod(value) {
            var methods = [
                'account-claim',
                'account-create',
                'account-edit',
                'account-valid',
                'available-payment-methods',
                'bankaccount-edit',
                'bankaccounts',
                'profile-create',
                'profiles',
            ];

            return methods.indexOf(value) !== -1;
        }
    },

    get timestamp() {
        return Math.round(Date.now() / 1000);
    },

    get endpoint() {
        return [API_URL, this.api_version, this.action].join('/');
    },

    get params() {
        return {
            partner_id: this.partner_id,
            profile_key: this.profile_key,
            timestamp: this.timestamp
        };
    },

    getSignedParams: function(params) {
        var url = Url.parse(this.endpoint),
            query = _.extend(this.params, params);

        url.query = query;

        query.signature = sign(url.format(), this.app_secret, {
            algo: 'sha1',
            digest: 'hex',
            path: true,
        });

        return query;
    },

    post: function(params, done) {
        request.post({
            headers: {
                Accept: 'application/json'
            },
            strictSSL: true,
            url: this.endpoint,
            form: this.getSignedParams(params),
        }, function(err, req, body) {
            if (err) return done(err);
            done(null, JSON.parse(xml2json.toJson(body)));
        });
    }
});

module.exports = API;
