# DentalDesk

A dental practice scheduling demo. Built with Angular.

Register sample patients, book appointments, filter the schedule by date, and update visit status. Booking validation prevents duplicate appointments in the same time slot.

The demo uses fictional records and stores changes in the browser.

![DentalDesk appointment schedule and patient registration forms](docs/preview.png)

## Browse the code

- [Angular application](./dentaldesk.js)
- [Browser storage and date utilities](./storage.js)

## Run the demo locally

Use Node.js 24.

```sh
npm ci
npm run build
npm start
```

Open http://localhost:4173.
