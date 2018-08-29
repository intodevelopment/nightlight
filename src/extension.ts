'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Nightlight } from './nightlight';
import { NightlightConfig } from './nightlight-config';

var nightlight: Nightlight | null = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    
    initialize();

    // Register commands
    let enableNightThemeCmd = vscode.commands.registerCommand('nightlight.enableNightTheme', () => {
        if(nightlight !== null){
            nightlight.enableNightTheme();
        }
    });
    context.subscriptions.push(enableNightThemeCmd);

    let enableDayThemeCmd = vscode.commands.registerCommand('nightlight.enableDayTheme', () => {
        if(nightlight !== null){
            nightlight.enableDayTheme();
        }
    });
    context.subscriptions.push(enableDayThemeCmd);

    // Register on config change
    let configChanged = vscode.workspace.onDidChangeConfiguration((e) => {
        let affected = e.affectsConfiguration("nightlight");
        if(affected){
            initialize();
        }
    });
    context.subscriptions.push(configChanged);
}

function initialize(){
    if(nightlight !== null){
        nightlight.stop();
    }
    let config = NightlightConfig.load();
    nightlight = new Nightlight(config);
    nightlight.start();
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (nightlight !== null) {
        nightlight.stop();
    }
}