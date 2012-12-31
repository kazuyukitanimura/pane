var EventEmitter, Pane, WebKitWindow, __hasProp = {}.hasOwnProperty,
__extends = function(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

EventEmitter = require('events').EventEmitter;

WebKitWindow = require('./WebKitWindow');

Pane = (function(_super) {

  __extends(Pane, _super);

  function Pane(opt) {
    var baseUrl, fullscreen, height, html, js, maximized, minimized, resizable, title, url, width;
    this.window = new WebKitWindow;
    this.window.initialize();
    if (opt != null) {
      js = opt.js,
      html = opt.html,
      baseUrl = opt.baseUrl,
      url = opt.url,
      height = opt.height,
      width = opt.width,
      resizable = opt.resizable,
      title = opt.title,
      fullscreen = opt.fullscreen,
      maximized = opt.maximized,
      minimized = opt.minimized;
      if ((height != null) && (width != null)) {
        this.window.resize(height, width);
      }
      if (maximized != null) {
        this.window.maximize(maximized);
      }
      if (minimized != null) {
        this.window.minimize(minimized);
      }
      if (fullscreen != null) {
        this.window.fullscreen(fullscreen);
      }
      if (resizable != null) {
        this.window.setResizable(resizable);
      }
      if (title != null) {
        this.window.title(title);
      }
      if (url != null) {
        this.window.url(url);
      }
      if ((html != null) && (baseUrl != null)) {
        this.window.html(html, baseUrl);
      }
      if ((html != null) && ! (baseUrl != null)) {
        this.window.html(html);
      }
      if (js != null) {
        this.window.execute(js);
      }
    }
    return this.window;
  }

  return Pane;

})(EventEmitter);

module.exports = Pane;

