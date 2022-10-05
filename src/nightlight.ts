import * as vscode from 'vscode';
import { NightlightConfig } from './nightlight-config';
import { DateUtil } from './util/date.util';
var suncalc = require('suncalc');

export class Nightlight {

  private _timer: null | ReturnType<typeof setInterval> = null;

  constructor(private config: NightlightConfig) {
    if(!this.validateGpsCoordinates()){
      console.warn("No (valid) GPS coordinates configured. Falling back to manually set start and end time.");
    }
  }

  /**
   * Start the Nightlight 
   */
  public start() {
    if(this._timer !== null){
      this.stop();
    }
    this._timer = setInterval(() => {
      this.run();
    }, 60000);
    this.run();
  }

  /**
   * Stop the Nightlight
   */
  public stop() {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  /**
   * Run nightlight by checking for day time and adjusting the theme accordingly.
   */
  private run() {
    const userConfig = vscode.workspace.getConfiguration();
    const currentTheme = userConfig.get("workbench.colorTheme") as string;

    if (this.isDayTime()) {
      if (currentTheme !== this.config.dayTheme && !this.isOverrideSet()) {
        if (!this.config.quiet) {
          vscode.window.showInformationMessage("Hello! I'll turn on the lights for you.");
        }
        this.enableDayTheme();
      }
    }
    else {
      if (currentTheme !== this.config.nightTheme && !this.isOverrideSet()) {
        if (!this.config.quiet) {
          vscode.window.showInformationMessage("It's getting dark, I'm switching off the lights.");
        }
        this.enableNightTheme();
      }
    }
  }
  
  /**
   * Enable the configured day theme
   */
  public enableDayTheme(manual: boolean = false) {
    this.enableTheme(this.config.dayTheme);
    this.enableIconTheme(this.config.dayIconTheme);
    if(manual){
      this.setOverride();
    }
  }

  /**
   * Enable the configured night theme
   */
  public enableNightTheme(manual: boolean = false) {
    this.enableTheme(this.config.nightTheme);
    this.enableIconTheme(this.config.nightIconTheme);
    if(manual){
      this.setOverride();
    }
  }

  /**
   * Toggle between day/night theme
   */
  public toggleTheme(){
    const userConfig = vscode.workspace.getConfiguration();
    const currentTheme = userConfig.get("workbench.colorTheme");
    if(currentTheme === this.config.nightTheme){
      this.enableDayTheme(true);
    }
    else{
      this.enableNightTheme(true);
    }
  }

  /**
   * Enable a theme
   * @param theme The theme to enable
   */
  private enableTheme(theme: string){
    const userConfig = vscode.workspace.getConfiguration();
    userConfig.update("workbench.colorTheme", theme, vscode.ConfigurationTarget.Global);
  }

  /**
   * Enable an icon theme
   * @param iconTheme The icon theme to enable
   */
  private enableIconTheme(iconTheme: string){
    const userConfig = vscode.workspace.getConfiguration();
    userConfig.update("workbench.iconTheme", iconTheme, vscode.ConfigurationTarget.Global);
  }

  /**
   * Check if the current time falls in the range of day time. If the GPS coordinates are configured
   * correctly, those are used to determine sunrise/sunset. Otherwise it falls back to the manually 
   * configured day and night times. 
   * @returns {boolean} True if it is day time, otherwise false.
   */
  private isDayTime(): boolean {
    const now = new Date();
    let isDayTime = DateUtil.isWithinTimeRange(now, this.getNextDaylightTime(), this.getNextNightlightTime());
    return isDayTime;
  }

  /**
   * Get the Date on which it will be day again
   */
  private getNextDaylightTime(): Date {
    let date = new Date();
    if (this.validateGpsCoordinates()) {
      const sunTimes = suncalc.getTimes(new Date(), this.config.gpsLat, this.config.gpsLong);
      date = sunTimes.sunriseEnd;
    }
    else {
      date.setHours(this.config.dayTimeStart.getHours());
      date.setMinutes(this.config.dayTimeStart.getMinutes());
    }
    // Check if the date is in the future
    let now = new Date();
    if (date.getTime() <= now.getTime()) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  /**
   * Get the Date on which it will be night again
   */
  private getNextNightlightTime(): Date {
    let date = new Date();
    if (this.validateGpsCoordinates()) {
      const sunTimes = suncalc.getTimes(new Date(), this.config.gpsLat, this.config.gpsLong);
      date = sunTimes.sunset;
    }
    else {
      date.setHours(this.config.dayTimeEnd.getHours());
      date.setMinutes(this.config.dayTimeEnd.getMinutes());
    }
    // Check if the date is in the future
    let now = new Date();
    if (date.getTime() <= now.getTime()) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  /**
   * Validate the configured GPS coordinates
   * @returns {boolean} True if correctly configured, otherwise false
   */
  private validateGpsCoordinates(): boolean {
    return (this.config.gpsLong !== null && this.config.gpsLat !== null)
      && (this.config.gpsLong >= -180 && this.config.gpsLong <= 180)
      && (this.config.gpsLat >= -90 && this.config.gpsLat <= 90);
  }

  /**
   * Set the override flag
   */
  private setOverride() {
    if (this.getNextDaylightTime() > this.getNextNightlightTime()) {
      this.config.overrideUntil = this.getNextNightlightTime();
    }
    else {
      this.config.overrideUntil = this.getNextDaylightTime();
    }
    this.config.save();
  }

  /**
   * Check if the override flag is set and still active
   */
  private isOverrideSet(){
    return this.config.overrideUntil !== null && this.config.overrideUntil > new Date();
  }

}