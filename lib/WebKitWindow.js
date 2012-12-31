var EventEmitter, WebKitWindow, key, val, _ref, __slice = [].slice;

EventEmitter = require('events').EventEmitter;

WebKitWindow = require('../build/Release/WebKitWindow').WebKitWindow;

_ref = EventEmitter.prototype;
for (key in _ref) {
  val = _ref[key];
  WebKitWindow.prototype[key] = val;
}

WebKitWindow.prototype.initialize = function() {
  var fn, _this = this;
  fn = function() {
    _this.processEvents();
    return process.nextTick(fn);
  };
  return fn();
};

WebKitWindow.prototype.resize = WebKitWindow.prototype.setSize;

WebKitWindow.prototype.maximize = function(b) {
  if (b == null) {
    b = true;
  }
  return this.setMaximized(b);
};

WebKitWindow.prototype.minimize = function(b) {
  if (b == null) {
    b = true;
  }
  return this.setMinimized(b);
};

WebKitWindow.prototype.fullscreen = function(b) {
  if (b == null) {
    b = true;
  }
  return this.setFullscreen(b);
};

WebKitWindow.prototype.resizable = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (args.length > 0) {
    return this.setResizable.apply(this, args);
  } else {
    return this.getResizable();
  }
};

WebKitWindow.prototype.title = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (args.length > 0) {
    return this.setTitle.apply(this, args);
  } else {
    return this.getTitle();
  }
};

WebKitWindow.prototype.url = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (args.length > 0) {
    return this.setUrl.apply(this, args);
  } else {
    return this.getUrl();
  }
};

WebKitWindow.prototype.html = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (args.length > 0) {
    return this.setHtml.apply(this, args);
  } else {
    return this.getHtml();
  }
};

module.exports = WebKitWindow;

