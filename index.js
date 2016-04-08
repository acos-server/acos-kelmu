var fs = require('fs');
var htmlencode = require('htmlencode').htmlEncode;

var Kelmu = function() {};

Kelmu.initialize = function(req, params, handlers, cb) {

  if (req.query.useKelmu || req.query.kelmuUrl) {
    params.headContent = '<link href="/static/kelmu/kelmu.css" rel="stylesheet">\n' +
      '<script src="/static/kelmu/jquery.min.js" type="text/javascript"></script>\n' +
      '<script src="/static/kelmu/kelmu.js" type="text/javascript"></script>\n' +
      params.headContent;

    params.bodyContent = params.bodyContent.replace(/<div .*?class=".*?kelmu.*?"/, function(match) {
      return match + ' data-kelmu-id="' + htmlencode(params.name) + (req.query.kelmuUrl ? '" data-kelmu-definition="' + htmlencode(req.query.kelmuUrl) + '"' : '"');
    });
  }
  cb();
};

Kelmu.register = function(handlers, app, conf) {
  handlers.libraries.kelmu = Kelmu;
};

Kelmu.namespace = 'kelmu';
Kelmu.packageType = 'library';

Kelmu.meta = {
  'name': 'kelmu',
  'shortDescription': 'Kelmu annotation library.',
  'description': '',
  'author': 'Teemu Sirkiä',
  'license': 'MIT',
  'version': '0.0.1',
  'url': ''
};

module.exports = Kelmu;
