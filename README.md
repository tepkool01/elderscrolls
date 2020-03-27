# Elder Scrolls APP
This app is a prototype for retrieving elder scroll cards in an infinite scrolling fashion.

## Prerequisites
- npm version 6.13.4 
- nodejs version 12.14.1
- if using IE browser, then at least version 10 to support push state

## Installation
1. Navigate to the front-end folder `cd front-end`
2. Run `npm install`

## Running the application
1. Navigate to the front-end folder `cd front-end`
2. Run `npm run serve`
3. Navigate to the URL (in your browser) presented in the console, typically `http://localhost:8080/`
    * hot reloads are enabled (allowing you to change code and visualize in real time)

## Running the unit tests
1. Navigate to the front-end folder `cd front-end`
2. Run `npm run test:unit`

---

# Considerations

A list of general notes during the creation of this app.

## Notes

- The loading bar at the top exists, but might be considered small to see. 
- Works well on iPhone X, Chrome, Firefox
    - Has some interesting behavior on IE 11 (see improvements)
- Tested on Mac and three different versions of windows

## Improvements

- IE is making all of the elements in one column, beyond scope of this project
- Could have used Nuxt for better SEO, improved layout, etc, but trying to keep everything ***simple***
    - Nuxt isn't required, but makes set-up easier
- Could have used slots, but decided to lay out everything in a single Card component
- Could have broken API into modules, but there is only one central call
- Chose promises against async/await (with some exceptions)
- Chose to put constants at top of the file rather than placing in a config file
- Could have modularized the state, but didn't have enough use-cases to structure it for scalability
- Loading bar in the case of multiple API calls would need to be refactored to have the concept of a loader state
- Thinking about aligning front-end **security** with API via validating input strings to contain characters allowed 
by name searches (alphanumeric | and , and spaces? and potentially other allowable characters for the white-list)