#ifndef WEBKITWINDOW_H_
#define WEBKITWINDOW_H_

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <assert.h>

#include <QApplication>
#include <QtGui>
#include <QtWebKit>

#include "node_defs.h"

class HookedPage;

using namespace v8;
using namespace node;

class WebKitWindow : public ObjectWrap {
  public:
    static void Initialize(Handle<Object> target);

    /* FUNCTIONS */
    static Handle<Value> ProcessEvents(const Arguments &args);
    static Handle<Value> Screenshot(const Arguments &args);
    static Handle<Value> SetUrl(const Arguments &args);

    /* MISC */
    void PageLoaded(bool success);
    void ConsoleMessage(const QString &message, int line, const QString &source);
    bool Emit(const char *event, int argc, Handle<Value> argv[]);

  private:
    WebKitWindow();
    ~WebKitWindow();
    static Persistent<FunctionTemplate> s_ct;
    static Handle<Value> New(const Arguments &args);
    QApplication *app_;
    HookedPage *page_;
};

#endif  // WEBKITWINDOW_H_
