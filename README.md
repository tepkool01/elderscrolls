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

## Running the unit tests
1. Navigate to the front-end folder `cd front-end`
2. Run `npm run test:unit`

---

# Considerations
- Could have used Nuxt for better SEO, improved layout, etc, but trying to keep everything ***simple***
- Could have used slots, but decided to lay out everything in a single Card component
- Could have broken API into modules, but there is only one central call
- Chose promises against async/await
- Chose to put constants at top of the file rather than placing in a config file
- Didn't need to use the state/store, but could've taken advantage of it for the 'nextLink'
- Loading bar in the case of multiple API calls would need to be refactored to have the concept of a loader state