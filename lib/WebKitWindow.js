var EventEmitter = require('events').EventEmitter;
var WebKitWindow = require('../build/Release/WebKitWindow').WebKitWindow;

var _ref = EventEmitter.prototype;
for (var key in _ref) {
  WebKitWindow.prototype[key] = _ref[key];
}

WebKitWindow.prototype.initialize = function() {
  var _this = this;
  var fn = function() {
    _this.processEvents();
    return process.nextTick(fn);
  };
  return fn();
};

module.exports = WebKitWindow;

