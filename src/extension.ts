// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "openai-dev" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let helloWorld = vscode.commands.registerCommand('openai-dev.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code 3');
	});

	let time = vscode.commands.registerCommand('openai-dev.time', () => {
		const timeToShow = new Date().toLocaleTimeString();
		vscode.window.showInformationMessage('The time is: ' + timeToShow);
	});

	vscode.languages.registerHoverProvider(
		'javascript',
		new (class implements vscode.HoverProvider {
			provideHover(
				_document: vscode.TextDocument,
				_position: vscode.Position,
				_token: vscode.CancellationToken
			): vscode.ProviderResult<vscode.Hover> {
				const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
				const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);

				// To enable command URIs in Markdown content, you must set the `isTrusted` flag.
				// When creating trusted Markdown string, make sure to properly sanitize all the
				// input content so that only expected command URIs can be executed
				contents.isTrusted = true;

				return new vscode.Hover(contents);
			}
		})()
	);

	context.subscriptions.push(helloWorld);
	context.subscriptions.push(time);
}

// This method is called when your extension is deactivated
export function deactivate() { }
