'use strict';

var Wolperting = require('class-wolperting'),
    API = require('api');

module.exports = Wolperting.create({

    partner_id: String,

    profile_key: String,

    app_secret: String,

    accountClaim: function(params, done) {
        this._post('account-claim', params, done);
    },

    accountCreate: function(params, done) {
        this._post('account-create', params, done);
    },

    accountEdit: function(params, done) {
        this._post('account-edit', params, done);
    },

    accountValid: function(params, done) {
        this._post('account-valid', params, done);
    },

    availablePaymentMethods: function(params, done) {
        this._post('available-payment-methods', params, done);
    },

    bankaccountEdit: function(params, done) {
        this._post('bankaccount-edit', params, done);
    },

    bankaccounts: function(params, done) {
        this._post('bankaccounts', params, done);
    },

    profileCreate: function(params, done) {
        this._post('profile-create', params, done);
    },

    profiles: function(params, done) {
        this._post('profiles', params, done);
    },

    _post: function(action, params, done) {
        var api = new API({
            action: action,
            partner_id: this.partner_id,
            profile_key: this.profile_key,
            app_secret: this.app_secret
        });

        api.post(params, done);
    }
});
