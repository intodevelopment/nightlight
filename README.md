# Nightlight README

Nightlight is an extension for VS Code. It automatically switches between a dark and light theme based on the position of the sun or on your own terms.

## Features

### Switch theme based on the position of the sun
When it's getting dark, you might want to protect your eyes and switch automatically to a darker theme. Yet, when the sun comes up, a lighter theme is more easy on the eyes. Nightlight automatically switches when the sun rises or sets. 

### Switch theme at your preferred times
Don't like the sunrise and sunset times? Leave them empty (null) and provide a manual day and night time. 

### Manually switch
By using CMD+SHIFT+P / CTRL+SHIFT+P you can manually switch between day and night theme.

## Extension Settings

Nightlight can be configured by setting the following settings:

* `nightlight.nightTheme`: The theme to be displayed when it's night
* `nightlight.dayTheme`: The theme to be displayed when it's day
* `nightlight.dayTimeStart`: The time (format HH:mm) at which day time starts (if no GPS coordinates are configured)
* `nightlight.dayTimeEnd`: The time (format HH:mm) at which day time ends (if no GPS coordinates are configured) 
* `nightlight.gpsLong`: The GPS longitude coordinate. This is used to determine the sunrise and sunset locally on your device.
* `nightlight.gpsLat`: The GPS latitude coordinate. This is used to determine the sunrise and sunset locally on your device.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of Nightlight

## Thanks

* Thanks to the creators of the [SunCalc library](https://github.com/mourner/suncalc)