import * as vscode from 'vscode';
import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('huggingchatView', new HuggingChatViewProvider()),
  );
}

class HuggingChatViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getHtmlForWebview();

    vscode.commands.registerCommand('huggingchat.refresh', (text: string) => {
      webviewView.webview.postMessage({ command: 'refresh' });
    });
  }

  private getHtmlForWebview(): string {
    const filePath = vscode.Uri.file(path.join(__dirname, 'sidebar.html'));
    // console.log(filePath)
    return fs.readFileSync(filePath.fsPath, 'utf8');;
  }
}