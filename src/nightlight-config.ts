import * as vscode from 'vscode';
import { DateUtil } from './util/date.util';

export class NightlightConfig {

  public nightTheme: string = "Default Dark+";
  public nightIconTheme: string = "vs-minimal";
  public dayTheme: string = "Default Light+";
  public dayIconTheme: string = "vs-minimal";
  public dayTimeStart: Date = new Date("1970-01-01 10:00");
  public dayTimeEnd: Date = new Date("1970-01-01 21:00");
  public gpsLong: number | null = null;
  public gpsLat: number | null = null;
  public overrideUntil: Date | null = null;

  public static load() {
    let config = new NightlightConfig();
    config.nightTheme = vscode.workspace.getConfiguration('nightlight').get('nightTheme') || config.nightTheme;
    config.nightIconTheme = vscode.workspace.getConfiguration('nightlight').get('nightIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || config.nightIconTheme;
    config.dayTheme = vscode.workspace.getConfiguration('nightlight').get('dayTheme') || config.dayTheme;
    config.dayIconTheme = vscode.workspace.getConfiguration('nightlight').get('dayIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || config.dayIconTheme;
    let configDayTimeStart = DateUtil.parseTime(<string> vscode.workspace.getConfiguration('nightlight').get('dayTimeStart'));
    config.dayTimeStart = configDayTimeStart !== null ? configDayTimeStart : config.dayTimeStart;
    let configDayTimeEnd = DateUtil.parseTime(<string> vscode.workspace.getConfiguration('nightlight').get('dayTimeEnd'));
    config.dayTimeEnd = configDayTimeEnd !== null ? configDayTimeEnd : config.dayTimeEnd;
    config.gpsLong = vscode.workspace.getConfiguration('nightlight').get('gpsLong') || config.gpsLong;
    config.gpsLat = vscode.workspace.getConfiguration('nightlight').get('gpsLat') || config.gpsLat;
    config.overrideUntil = new Date(vscode.workspace.getConfiguration('nightlight').get('overrideUntil') as string) || config.overrideUntil;
    return config;
  }

  public save(){
    vscode.workspace.getConfiguration('nightlight').update('overrideUntil', this.overrideUntil, vscode.ConfigurationTarget.Global);
  }
  
}