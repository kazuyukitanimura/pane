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
    var height = opt.height;
    var width = opt.width;
    var resizable = opt.resizable;
    var title = opt.title;
    var fullscreen = opt.fullscreen;
    var maximized = opt.maximized;
    var minimized = opt.minimized;
    if (height && width) {
      this.window.resize(height, width);
    }
    if (maximized) {
      this.window.maximize(maximized);
    }
    if (minimized) {
      this.window.minimize(minimized);
    }
    if (fullscreen) {
      this.window.fullscreen(fullscreen);
    }
    if (resizable) {
      this.window.setResizable(resizable);
    }
    if (title) {
      this.window.title(title);
    }
    if (url) {
      this.window.url(url);
    }
    if (html && baseUrl) {
      this.window.html(html, baseUrl);
    }
    if (html && !baseUrl) {
      this.window.html(html);
    }
    if (js) {
      this.window.execute(js);
    }
  }
  return this.window;
};

util.inherits(Pane, EventEmitter);

module.exports = Pane;

