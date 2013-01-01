var util = require("util");
var EventEmitter = require('events').EventEmitter;
var WebKitWindow = require('./WebKitWindow');

var Pane = function Pane(opt) {
  this.window = new WebKitWindow();
  this.window.initialize();
  if (opt) {
    var js = opt.js;
    var html = opt.html;
    var baseUrl = opt.baseUrl;
    var url = opt.url;
    if (url) {
      this.window.url(url);
    } else if (html) {
      if (baseUrl) {
        this.window.html(html, baseUrl);
      } else {
        this.window.html(html);
      }
    }
    if (js) {
      this.window.execute(js);
    }
  }
  return this.window;
};

util.inherits(Pane, EventEmitter);

module.exports = Pane;

