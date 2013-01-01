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

WebKitWindow.prototype.resize = WebKitWindow.prototype.setSize;

WebKitWindow.prototype.title = function() {
  return this.setTitle.apply(this, arguments);
};

WebKitWindow.prototype.url = function() {
  return this.setUrl.apply(this, arguments);
};

WebKitWindow.prototype.html = function() {
  return this.setHtml.apply(this, arguments);
};

module.exports = WebKitWindow;

