'use strict';

var Wolperting = require('class-wolperting'),
    _ = require('lodash'),
    request = require('request'),
    xml2json = require('xml2json'),
    sign = require('./signature');

var CONST = require('./constant');

module.exports = Wolperting.create({

    partner_id: String,

    profile_key: String,

    app_secret: String,

    action: {
        $isa: function ResellerMethod(value) {
            return CONST.API_METHODS.indexOf(value) !== -1;
        }
    },

    get timestamp() {
        return Math.round(Date.now() / 1000);
    },

    get path() {
        return [CONST.API_PATH, CONST.API_VERSION, this.action].join('/');
    },

    get params() {
        return {
            partner_id: this.partner_id,
            profile_key: this.profile_key,
            timestamp: this.timestamp
        };
    },

    signedBody: function(params) {
        var query = _.extend(this.params, params);

        query.signature = sign(this.path, query, this.app_secret);

        return query;
    },

    post: function(params, done) {
        request.post({
            strictSSL: true,
            url: [CONST.API_URL, this.path].join('/'),
            form: this.signedBody(params),
        }, function(err, req, body) {
            if (err) return done(err);
            done(null, JSON.parse(xml2json.toJson(body)));
        });
    }
});
