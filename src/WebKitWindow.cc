#include "WebKitWindow.h"
#include "HookedPage.h"

using namespace v8;
using namespace node;

Persistent<FunctionTemplate> WebKitWindow::s_ct;

WebKitWindow::WebKitWindow() {
  //Create UI components
  int argc = 1;
  char **argv = NULL;

  app_ = new QApplication(argc, argv);
  app_->processEvents();
  app_->setOrganizationName("Fractal");
  app_->setApplicationName("Pane");
  window_ = new QMainWindow(0);
  view_ = new QWebView(window_);
  page_ = new HookedPage(this, view_);
  view_->setPage(page_);
  window_->setCentralWidget(view_);

  view_->settings()->setAttribute(QWebSettings::OfflineStorageDatabaseEnabled, true);
  view_->settings()->setOfflineStoragePath(QDesktopServices::storageLocation(QDesktopServices::DataLocation));

  view_->settings()->setAttribute(QWebSettings::OfflineWebApplicationCacheEnabled, true);
  view_->settings()->setOfflineWebApplicationCachePath(QDesktopServices::storageLocation(QDesktopServices::DataLocation));

  view_->settings()->setAttribute(QWebSettings::LocalStorageEnabled, true);
  view_->settings()->setLocalStoragePath(QDesktopServices::storageLocation(QDesktopServices::DataLocation));

  view_->settings()->setAttribute(QWebSettings::PluginsEnabled, false);
  view_->settings()->setAttribute(QWebSettings::LocalContentCanAccessRemoteUrls, true);
}

WebKitWindow::~WebKitWindow() {
  delete app_;
}

void WebKitWindow::Initialize(Handle<Object> target) {
  HandleScope scope;

  Local<FunctionTemplate> t = FunctionTemplate::New(New);

  s_ct = Persistent<FunctionTemplate>::New(t);
  s_ct->InstanceTemplate()->SetInternalFieldCount(1);
  s_ct->SetClassName(NODE_SYMBOL("WebKitWindow"));

  NODE_SET_PROTOTYPE_METHOD(s_ct, "processEvents", ProcessEvents);
  NODE_SET_PROTOTYPE_METHOD(s_ct, "screenshot", Screenshot);
  NODE_SET_PROTOTYPE_METHOD(s_ct, "setUrl", SetUrl);
  NODE_SET_PROTOTYPE_METHOD(s_ct, "setHtml", SetHtml);
  NODE_SET_PROTOTYPE_METHOD(s_ct, "execute", ExecuteScript);

  target->Set(NODE_SYMBOL("WebKitWindow"), t->GetFunction());
}

Handle<Value> WebKitWindow::New (const Arguments &args) {
  HandleScope scope;
  if (!args.IsConstructCall()) {
    return ThrowException(Exception::TypeError(NODE_SYMBOL("Use the new operator to create instances of this object.")));
  }

  WebKitWindow *window = new WebKitWindow();
  window->Wrap(args.This());
  //window->app_->processEvents();
  return scope.Close(args.This());
}

/* FUNCTIONS */
Handle<Value> WebKitWindow::ProcessEvents(const Arguments &args) {
  HandleScope scope;
  WebKitWindow *window = ObjectWrap::Unwrap<WebKitWindow>(args.This());
  assert(window);
  assert(window->app_);
  if (window->app_->hasPendingEvents()) {
    window->app_->processEvents();
  }
  return scope.Close(args.This());
}

Handle<Value> WebKitWindow::Screenshot(const Arguments &args) {
  HandleScope scope;
  WebKitWindow *window = ObjectWrap::Unwrap<WebKitWindow>(args.This());
  assert(window);
  assert(window->view_);
  ARG_CHECK_STRING(0, title);
  String::Utf8Value title(args[0]->ToString());
  window->page_->screenshot(QString(*title));
  return scope.Close(args.This());
}
Handle<Value> WebKitWindow::SetUrl(const Arguments &args) {
  HandleScope scope;
  WebKitWindow *window = ObjectWrap::Unwrap<WebKitWindow>(args.This());
  assert(window);
  assert(window->view_);
  ARG_CHECK_STRING(0, url);
  String::Utf8Value url(args[0]->ToString());
  window->view_->setUrl(QUrl(*url));
  return scope.Close(args.This());
}
Handle<Value> WebKitWindow::SetHtml(const Arguments &args) {
  HandleScope scope;
  WebKitWindow *window = ObjectWrap::Unwrap<WebKitWindow>(args.This());
  assert(window);
  assert(window->view_);
  ARG_CHECK_STRING(0, html);
  ARG_CHECK_OPTIONAL_STRING(1, baseUrl);
  String::Utf8Value html(args[0]->ToString());
  if (args.Length() > 1) {
    String::Utf8Value baseUrl(args[1]->ToString());
    window->view_->setHtml(QString(*html), QUrl(*baseUrl));
  } else {
    window->view_->setHtml(QString(*html), QUrl("file:///"));
  }
  return scope.Close(args.This());
}
Handle<Value> WebKitWindow::ExecuteScript(const Arguments &args) {
  HandleScope scope;
  WebKitWindow *window = ObjectWrap::Unwrap<WebKitWindow>(args.This());
  assert(window);
  assert(window->view_);
  ARG_CHECK_STRING(0, script);
  String::Utf8Value script(args[0]->ToString());
  QString out = window->view_->page()->mainFrame()->evaluateJavaScript(*script).toString();
  return scope.Close(NODE_SYMBOL(out.toAscii()));
}

/* Events */
void WebKitWindow::PageLoaded(bool success) {
  HandleScope scope;
  Handle<Value> args[1];
  args[0] = Boolean::New(success);
  Emit("loaded", 1, args);
}
void WebKitWindow::ConsoleMessage(const QString &message, int line, const QString &source) {
  HandleScope scope;
  Handle<Value> args[3];
  args[0] = NODE_SYMBOL(message.toAscii());
  args[1] = NODE_CONSTANT(line);
  args[2] = NODE_SYMBOL(source.toAscii());
  Emit("console", 3, args);
}

/* MISC */
bool WebKitWindow::Emit(const char *event, int argCount, Handle<Value> emitArgs[]) {
  HandleScope scope;

  //Format arguments to pass to v8::Function
  int nArgCount = argCount + 1;
  Handle<Value> *nEmitArgs = new Handle<Value>[nArgCount];

  //Integrity checks
  if (nEmitArgs == NULL) {
    return false;
  }

  if (this->handle_.IsEmpty()) {
    return false;
  }

  //nEmitArgs = ['coolEvent', other args...]
  nEmitArgs[0] = String::New(event);
  if (emitArgs != NULL) {
    for (int i = 0; i < argCount; i++) {
       nEmitArgs[i + 1] = emitArgs[i];
    }
  }

  //Emit event
  Local<Value> emit_v = this->handle_->Get(NODE_SYMBOL("emit"));
  if (!emit_v->IsFunction()) {
    return false;
  }
  Local<Function> emitf = Local<Function>::Cast(emit_v);

  TryCatch try_catch;
  emitf->Call(this->handle_, nArgCount, nEmitArgs);

  //Cleanup
  delete [] nEmitArgs;

  if (try_catch.HasCaught()) {
    FatalException(try_catch);
  }
  return true;
}

extern "C" {
  static void init (Handle<Object> target) {
    HandleScope scope;
    WebKitWindow::Initialize(target);
  }
  NODE_MODULE(WebKitWindow, init);
}
