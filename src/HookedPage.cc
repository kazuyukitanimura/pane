#include "HookedPage.h"
#include "WebKitWindow.h"

HookedPage::HookedPage(WebKitWindow *window, QObject *parent) : QWebPage(parent) {
  window_ = window;
  connect(this, SIGNAL(loadStarted()), this, SLOT(loadStarted()));
  connect(this, SIGNAL(loadFinished(bool)), this, SLOT(loadFinished(bool)));
}

void HookedPage::loadStarted() {
}

void HookedPage::loadFinished(bool ok) {
  window_->PageLoaded(ok);
}

void HookedPage::javaScriptConsoleMessage(const QString &message, int line, const QString &sourceID) {
  QFileInfo fi(sourceID);
  window_->ConsoleMessage(message, line, fi.fileName());
}

QByteArray HookedPage::screenshot(const QString &keyWord) {
  QStringList keyWords = keyWord.split(QRegExp("\\s+"));
  // 985 is the default width used by Apple
  markWords(985);
  return highlightRect(keyWords, 985);
}

#include "HookedPage.moc"
