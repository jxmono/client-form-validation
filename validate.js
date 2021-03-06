var Bind = require('github/jxmono/bind');
var Events = require('github/jxmono/events');

function init (config) {

    var self = this;
    // prepare module
    self.config = config;
    self.config.form = config.form || {};

    // listen to external events
    Events.call(self, config);

    self.on('validate', validate);

    self.emit('ready');
}

function validate ($form, callback) {

    var self = this;
    var field = "";

    $form.find("input, textarea, select").each(function (i) {
    	if (this.checkValidity && !this.checkValidity()) {
            field = this;
            return false;
        }
    }).promise().done(function () { callback(field); });
}

module.exports = init;