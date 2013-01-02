var util = require("util");
var EventEmitter = require('events').EventEmitter;
var WebKitWindow = require('./WebKitWindow');

var Pane = function Pane(opt) {
  var that = new WebKitWindow();
  //this.window.initialize();
  (function fn() {
    that.processEvents();
    return process.nextTick(fn);
  })();
  if (opt) {
    var url = opt.url;
    if (url) {
      that.setUrl.call(that, url);
    }
  }
  return that;
};

util.inherits(Pane, EventEmitter);

module.exports = Pane;

