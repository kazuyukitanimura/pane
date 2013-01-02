var EventEmitter = require('events').EventEmitter;
var WebKitWindow = require('../build/Release/WebKitWindow').WebKitWindow;

var _ref = EventEmitter.prototype;
for (var key in _ref) {
  WebKitWindow.prototype[key] = _ref[key];
}

var Pane = function Pane(opt) {
  var that = new WebKitWindow();
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

module.exports = Pane;

