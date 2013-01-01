var util = require("util");
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

WebKitWindow.prototype.maximize = function(b) {
  return this.setMaximized(b || true);
};

WebKitWindow.prototype.minimize = function(b) {
  return this.setMinimized(b || true);
};

WebKitWindow.prototype.fullscreen = function(b) {
  return this.setFullscreen(b || true);
};

WebKitWindow.prototype.resizable = function() {
  if (arguments.length) {
    return this.setResizable.apply(this, arguments);
  } else {
    return this.getResizable();
  }
};

WebKitWindow.prototype.title = function() {
  if (arguments.length) {
    return this.setTitle.apply(this, arguments);
  } else {
    return this.getTitle();
  }
};

WebKitWindow.prototype.url = function() {
  if (arguments.length) {
    return this.setUrl.apply(this, arguments);
  } else {
    return this.getUrl();
  }
};

WebKitWindow.prototype.html = function() {
  if (arguments.length) {
    return this.setHtml.apply(this, arguments);
  } else {
    return this.getHtml();
  }
};

module.exports = WebKitWindow;

