# Elder Scrolls APP
This app is a prototype for retrieving elder scroll cards in an infinite scrolling fashion.
### Urls
(CDN and Main are fastest)
#### Main : https://elderscrollfinder.com/
#### CDN : https://d19y9qfqz2fe67.cloudfront.net
#### S3 : http://elderscrollfinder.com.s3-website-us-east-1.amazonaws.com

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
- Passed W3 validation
- Score of 95 on google speed insights, primarily due to the remote images being included: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Felderscrollfinder.com%2F

## Improvements

- You can use sophisticated validation RegEx and libraries, but I am going for the POC version of this security, due to being unaware of what the backend checks.
- Testing went on for too long, and many areas for improvement / expansion and general clean up / commenting
    - I'm happy with 100% statement coverage across the major components, and 84.62% branch coverage (there are 2 unusual cases to check for)
    - Testing even the simplest things while approaching 'Exhaustive' testing can take a **very** long time
    - Testing needs to be DRY, have beforeEach hooks, separate TestData folder, etc
- Could have improved error messaging and handling (fade effects, better information for UX, box closing)
    - Error box is quite ugly, but I didn't spend much time on it because it was a late addition add on
    - Error boxes should be stacked when multiple issues occur
    - Could've also implemented retries in API calls
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