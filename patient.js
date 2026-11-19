import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { read, save } from './storage.js';

const requestsKey = 'dentaldesk-requests-v1';
const lastKey = 'dentaldesk-last-request-v1';
const { t, template, url } = window.siteLocale;
const variant = new URLSearchParams(location.search).get('offer') === 'times';
if (variant) document.querySelector('#offer').textContent = 'See dental visit times';
const services = ['Dental check-up', 'Cleaning', 'Consultation'];
const slots = ['Tuesday, 9:30 AM', 'Wednesday, 11:00 AM', 'Friday, 2:30 PM'];

class PatientBooking {
  t = t;
  step = 1;
  service = services[0];
  slot = slots[0];
  services = services;
  slots = slots;
  request = read(requestsKey, []).find(item => item.id === read(lastKey, null));
  notice = '';
  clinicUrl = url('./');
  cta = variant ? 'See appointment times' : 'Choose a visit time';

  submit() {
    const latest = read(requestsKey, []);
    const request = { id: crypto.randomUUID(), service: this.service, slot: this.slot, patient: 'Alex Morgan', status: 'Pending clinic review' };
    if (!save(requestsKey, [request, ...latest])) {
      this.notice = 'Changes could not be saved in this browser.';
      return;
    }
    save(lastKey, request.id);
    this.request = request;
    this.notice = '';
    this.go(5);
  }

  track() {
    this.request = read(requestsKey, []).find(item => item.id === read(lastKey, null));
    if (this.request) {
      this.service = this.request.service;
      this.slot = this.request.slot;
      this.go(5);
    }
  }

  confirmation() {
    return t('You selected {service} for {slot}. No real appointment was booked.')
      .replace('{service}', t(this.service)).replace('{slot}', t(this.slot));
  }

  go(step) {
    this.step = step;
    requestAnimationFrame(() => document.querySelector('#step-title')?.focus());
  }
}

Component({
  selector: 'patient-booking',
  template: template(`
    <section class="card" aria-labelledby="step-title">
      @if (step < 5) {
        <p class="progress">{{t('Step {step} of 4').replace('{step}', step)}}</p>
      }
      @switch (step) {
        @case (1) {
          <h2 id="step-title" tabindex="-1">What are you booking?</h2>
          <label>Visit type
            <select [value]="service" (change)="service = $any($event.target).value">
              @for (option of services; track option) { <option [value]="option" [selected]="option === service">{{t(option)}}</option> }
            </select>
          </label>
          <button type="button" (click)="go(2)">{{t(cta)}}</button>
          @if (request) { <button class="secondary" type="button" (click)="track()">Track last request</button> }
        }
        @case (2) {
          <h2 id="step-title" tabindex="-1">Pick a sample time</h2>
          <label>Appointment time
            <select [value]="slot" (change)="slot = $any($event.target).value">
              @for (option of slots; track option) { <option [value]="option" [selected]="option === slot">{{t(option)}}</option> }
            </select>
          </label>
          <div class="actions">
            <button type="button" (click)="go(3)">Continue to patient details</button>
            <button class="secondary" type="button" (click)="go(1)">Back</button>
          </div>
        }
        @case (3) {
          <h2 id="step-title" tabindex="-1">Choose a patient profile</h2>
          <p class="note">Use the fictional patient below. No personal details are needed.</p>
          <form (submit)="$event.preventDefault(); go(4)">
            <label class="patient-profile"><input type="checkbox" required> Use Alex Morgan’s sample profile</label>
            <div class="actions">
              <button type="submit">Review request</button>
              <button class="secondary" type="button" (click)="go(2)">Back</button>
            </div>
          </form>
        }
        @case (4) {
          <h2 id="step-title" tabindex="-1">Review your request</h2>
          <dl><dt>Patient</dt><dd>Alex Morgan</dd><dt>Visit</dt><dd>{{t(service)}}</dd><dt>Time</dt><dd>{{t(slot)}}</dd></dl>
          <p class="note">This saves a sample request to the demo clinic workspace. The time is not reserved.</p>
          <div class="actions">
            <button type="button" (click)="submit()">Submit sample request</button>
            <button class="secondary" type="button" (click)="go(3)">Back</button>
          </div>
        }
        @case (5) {
          <h2 id="step-title" tabindex="-1">Request status</h2>
          <p class="request-status">{{t(request.status)}}</p>
          <p class="note">{{confirmation()}}</p>
          <div class="actions"><button type="button" (click)="track()">Refresh status</button><a [href]="clinicUrl">Clinic workspace</a></div>
          <button class="secondary" type="button" (click)="go(1)">Start again</button>
        }
      }
      <p class="note" role="status">{{t(notice)}}</p>
    </section>
  `),
})(PatientBooking);

const host = document.createElement('patient-booking');
document.querySelector('#booking').append(host);
bootstrapApplication(PatientBooking);
