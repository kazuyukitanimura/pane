var util = require("util");
var EventEmitter = require('events').EventEmitter;
var WebKitWindow = require('./WebKitWindow');

var Pane = function Pane(opt) {
  this.window = new WebKitWindow();
  this.window.initialize();
  if (opt) {
    var url = opt.url;
    if (url) {
      this.window.url(url);
    }
  }
  return this.window;
};

util.inherits(Pane, EventEmitter);

module.exports = Pane;

