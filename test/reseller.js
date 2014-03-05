'use strict';

var Mollie = require('../index.js'),
    CONST = Mollie.CONST,
    Reseller = Mollie.Reseller,
    async = require('async'),
    assert = require('assert'),
    util = require('util'),
    nock = require('nock');


function camelize(str) {
    var words = str.match(/(\w+)/g);

    for (var i = 1; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join('');
}


/*jshint multistr:true */
var XML = '\
<?xml version="1.0"?>\n\
<response>\
  <success>true</success>\
  <resultcode>10</resultcode>\
  <resultmessage>%s</resultmessage>\
</response>';

suite('lib/reseller', function() {
    test('Reseller implements all api methods', function(done) {
        var reseller = new Reseller({
            partner_id: Math.random().toString(36),
            profile_key: Math.random().toString(36),
            app_secret: Math.random().toString(36)
        });

        async.each(CONST.API_METHODS, function(pathPart, next) {
            var method = camelize(pathPart),
                path = util.format('/%s/%s/%s', CONST.API_PATH, CONST.API_VERSION, pathPart),
                scope = nock(CONST.API_URL)
                    .filteringRequestBody(/.+/, '*')
                    .post(path, '*')
                    .reply(200, function(url) {
                        return util.format(XML, url);
                    });


            reseller[method]({}, function(err, data) {
                var expect = {
                    response: {
                        success: true,
                        resultcode: 10,
                        resultmessage: path
                    }
                };

                assert.equal(err, null);
                assert.deepEqual(data, expect);

                scope.done();
                next();
            });
        }, done);
    });
});
