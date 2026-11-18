import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

const variant = new URLSearchParams(location.search).get('offer') === 'times';
if (variant) document.querySelector('#offer').textContent = 'See dental visit times';
const services = ['Dental check-up', 'Cleaning', 'Consultation'];
const slots = [
  { day: 'Tuesday', time: '9:30 AM' },
  { day: 'Wednesday', time: '11:00 AM' },
  { day: 'Friday', time: '2:30 PM' },
];

class PatientBooking {
  step = 1;
  service = services[0];
  slot = slots[0];
  services = services;
  slots = slots;
  cta = variant ? 'See appointment times' : 'Choose a visit time';

  restart() {
    this.service = services[0];
    this.slot = slots[0];
    this.go(1);
  }

  go(step) {
    this.step = step;
    requestAnimationFrame(() => document.querySelector('#step-title')?.focus());
  }
}

Component({
  selector: 'patient-booking',
  template: `
    <section class="card" aria-labelledby="step-title">
      @if (step < 4) {
        <p class="progress">Step {{step}} of 3</p>
      }
      @switch (step) {
        @case (1) {
          <h2 id="step-title" tabindex="-1">What are you booking?</h2>
          <label>Visit type
            <select [value]="service" (change)="service = $any($event.target).value">
              @for (option of services; track option) { <option [value]="option" [selected]="option === service">{{option}}</option> }
            </select>
          </label>
          <button type="button" (click)="go(2)">{{cta}}</button>
        }
        @case (2) {
          <h2 id="step-title" tabindex="-1">Pick a sample time</h2>
          <fieldset class="slot-grid">
            <legend>Appointment time</legend>
            @for (option of slots; track option.day) {
              <label class="slot">
                <input type="radio" name="appointment-time" [checked]="option === slot" (change)="slot = option">
                <span><strong>{{option.day}}</strong><span>{{option.time}}</span></span>
              </label>
            }
          </fieldset>
          <div class="actions">
            <button type="button" (click)="go(3)">Review request</button>
            <button class="secondary" type="button" (click)="go(1)">Back</button>
          </div>
        }
        @case (3) {
          <h2 id="step-title" tabindex="-1">Review your request</h2>
          <dl><dt>Visit</dt><dd>{{service}}</dd><dt>Time</dt><dd>{{slot.day}}, {{slot.time}}</dd></dl>
          <p class="note">This prototype uses sample slots and sends nothing to a clinic.</p>
          <div class="actions">
            <button type="button" (click)="go(4)">Submit sample request</button>
            <button class="secondary" type="button" (click)="go(2)">Back</button>
          </div>
        }
        @case (4) {
          <h2 id="step-title" tabindex="-1">Sample request complete</h2>
          <p class="note">You selected {{service}} for {{slot.day}}, {{slot.time}}. No real appointment was booked.</p>
          <button class="secondary" type="button" (click)="restart()">Start again</button>
        }
      }
    </section>
  `,
})(PatientBooking);

const host = document.createElement('patient-booking');
document.querySelector('#booking').append(host);
bootstrapApplication(PatientBooking);
