# Interview Scheduler

Welcome to my Interview Scheduler! Mike Law, LHL Student

Interview Scheduler is a simple, yet powerful calendar for booking, editing and canceling interviews.

Within the app, you can create a new appointment based on interviewer specific availablity. Once an appointment has been created, you can delete or edit them at any point. Office hours are between 12pm-5pm, and no new appointments after 4pm.

Test coverage by Storybook, Jest and Cypress

## Setup

Install dependencies with `npm install`.

This repository requires a specific version of react-test-renderer, below;

`npm install react@^16.9.0`
`npm install --save-dev react-test-renderer@^16.9.0`

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- React
- Axios
- Classnames
- Normalize CSS

# Screenshots

## Home

!["Home"](https://github.com/Law86/scheduler/blob/master/doc/screen1.png)

## New/Edit Appointment

!["New Appointment"](https://github.com/Law86/scheduler/blob/master/doc/screen2%20-%20new%20appt.png)

## Appointment Hover

!["Appointment Hover"](https://github.com/Law86/scheduler/blob/master/doc/screen%203%20-%20hover%20over%20edit%20delete.png)

## Side Nav / Spots Available

!["Side Nav feat. Spots"](https://github.com/Law86/scheduler/blob/master/doc/Spots%20remaining.png)
