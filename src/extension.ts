// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";

let convertString = (str: string): string => {
  return str
    .trim()
    .replace(/[\s-]+/g, "_")
    .replace(/[^A-Za-z0-9_]/g, "")
    .toUpperCase();
};

export async function angularI18n() {
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No text editor is active.");
    return;
  }

  let input = await vscode.window.showInputBox();
  let selection = editor.selection;
  let text = editor.document.getText(selection);
  let formated = convertString(text);

  let prefix = "";
  if (input) {
    let pref = convertString(input);
    if (pref) {
      prefix = convertString(input) + ".";
    }
  }

  return `${prefix}${formated}`;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "unbywyd-helpers" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let command1 = vscode.commands.registerCommand(
    "unbywyd-helpers.uppercaseWithUnderscores",
    () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No text editor is active.");
        return;
      }
      let selection = editor.selection;
      let text = editor.document.getText(selection);
      let formated = convertString(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, formated);
      });
    }
  );
  context.subscriptions.push(command1);

  let command2 = vscode.commands.registerCommand(
    "unbywyd-helpers.angularTranslateHashStringPipe",
    async () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No text editor is active.");
        return;
      }
      let formated = await angularI18n();
      let selection = editor.selection;
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, `{{'${formated}'|translate}}`);
      });
    }
  );

  context.subscriptions.push(command2);

  let command3 = vscode.commands.registerCommand(
    "unbywyd-helpers.angularTranslateStringPipe",
    async () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No text editor is active.");
        return;
      }
      let formated = await angularI18n();
      let selection = editor.selection;

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, `('${formated}'|translate)`);
      });
    }
  );

  context.subscriptions.push(command3);
}

// This method is called when your extension is deactivated
export function deactivate() {}
