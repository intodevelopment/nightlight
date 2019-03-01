# Nightlight

Nightlight is an extension for VS Code. It automatically switches between a dark and light theme based on the position of the sun or on your own terms.

## Features

### Switch theme based on the position of the sun
When it's getting dark, you might want to protect your eyes and switch automatically to a darker theme. Yet, when the sun comes up, a lighter theme is more easy on the eyes. Nightlight automatically switches when the sun rises or sets. 

### Switch theme at your preferred times
Don't like the sunrise and sunset times? Leave them empty (null) and provide a manual day and night time. 

### Toggle with a shortcut
Use the keyboard shortcut CTRL+ALT+N to switch between day and night theme. And if you prefer a different shortcut, you can of course change it through settings.

## Extension Settings

Nightlight can be configured by setting the following settings:

* `nightlight.nightTheme`: The theme to be displayed when it's night
* `nightlight.dayTheme`: The theme to be displayed when it's day
* `nightlight.dayTimeStart`: The time (format HH:mm) at which day time starts (if no GPS coordinates are configured)
* `nightlight.dayTimeEnd`: The time (format HH:mm) at which day time ends (if no GPS coordinates are configured) 
* `nightlight.gpsLong`: The GPS longitude coordinate. This is used to determine the sunrise and sunset locally on your device.
* `nightlight.gpsLat`: The GPS latitude coordinate. This is used to determine the sunrise and sunset locally on your device.

## Release Notes

## 1.2.0

* Bug fix: when the time to switch themes was missed because your computer was in standby mode, it would only switch themes when a new window was opened.

## 1.1.0

* New feature: toggle between day and night theme using keyboard shortcut ctrl+alt+n (or of course set your own through settings).
* Bug fix: when the user had switched to the day/night theme manually, opening a new window would set it back.

### 1.0.0

Initial release of Nightlight

## Thanks

* Thanks to the creators of the [SunCalc library](https://github.com/mourner/suncalc)
