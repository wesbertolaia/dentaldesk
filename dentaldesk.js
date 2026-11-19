import '@angular/compiler';
import { Component, createComponent } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { read, save, today } from './storage.js';

const { t, date: displayDate, template } = window.siteLocale;
const key = 'dentaldesk-v1';
const statuses = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled'];
const seed = {
  patients: [{ id: 'p1', name: 'Emma Miller' }, { id: 'p2', name: 'Oliver Davis' }, { id: 'p3', name: 'Grace Wilson' }],
  appointments: [
    { id: 'a1', patient: 'p1', date: today(), time: '09:00', service: 'Cleaning', status: 'Confirmed' },
    { id: 'a2', patient: 'p2', date: today(), time: '11:30', service: 'Consultation', status: 'Scheduled' },
    { id: 'a3', patient: 'p3', date: today(), time: '14:00', service: 'Follow-up', status: 'Confirmed' },
  ],
};

class DentalDesk {
  t = t;
  displayDate = displayDate;

  data = read(key, seed);
  filter = '';
  date = today();
  statuses = statuses;
  notice = '';

  get todayAppointments() {
    return this.data.appointments.filter((item) => item.date === this.date && item.status !== 'Cancelled');
  }

  get confirmedToday() {
    return this.todayAppointments.filter((item) => item.status === 'Confirmed').length;
  }

  get appointments() {
    return this.data.appointments.filter((item) => !this.filter || item.date === this.filter)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }

  patientName(id) {
    return this.data.patients.find((patient) => patient.id === id)?.name ?? t('Patient unavailable');
  }

  persist(data, message) {
    if (!save(key, data)) {
      this.notice = 'Changes could not be saved in this browser.';
      return false;
    }
    this.data = data;
    this.notice = message;
    return true;
  }

  addPatient(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get('name').trim();
    if (!name) {
      this.notice = 'Enter a patient name.';
      return;
    }
    const patients = [...this.data.patients, { id: crypto.randomUUID(), name }];
    if (this.persist({ ...this.data, patients }, 'Patient registered.')) form.reset();
  }

  book(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const entry = Object.fromEntries(new FormData(form));
    const conflict = this.data.appointments.some((item) =>
      item.date === entry.date && item.time === entry.time && item.status !== 'Cancelled');
    if (conflict) {
      this.notice = 'This appointment slot is already booked.';
      return;
    }
    const appointments = [...this.data.appointments, { ...entry, id: crypto.randomUUID(), status: 'Scheduled' }];
    if (this.persist({ ...this.data, appointments }, 'Appointment scheduled.')) {
      this.filter = entry.date;
      form.reset();
    }
  }

  updateStatus(id, select) {
    const previous = this.data.appointments.find((item) => item.id === id);
    const status = select.value;
    if (previous.status === 'Cancelled' && status !== 'Cancelled' &&
        this.data.appointments.some((item) => item.id !== id && item.date === previous.date &&
          item.time === previous.time && item.status !== 'Cancelled')) {
      select.value = previous.status;
      this.notice = 'This appointment slot has been booked again.';
      return;
    }
    const appointments = this.data.appointments.map((item) => item.id === id ? { ...item, status } : item);
    if (!this.persist({ ...this.data, appointments }, 'Appointment status updated.')) select.value = previous.status;
  }
}

Component({
  selector: 'dental-desk',
  template: template(`
    <dl class="metrics" aria-label="Practice overview">
      <div><dt>Today’s visits</dt><dd>{{todayAppointments.length}}</dd></div>
      <div><dt>Confirmed today</dt><dd>{{confirmedToday}}</dd></div>
      <div><dt>Patients</dt><dd>{{data.patients.length}}</dd></div>
    </dl>
    <p class="notice" role="status">{{t(notice)}}</p>
    <div class="desk-grid">
      <section class="panel" id="schedule">
        <h2>Appointments</h2>
    <div class="filters"><label>Filter by date <input type="date" [value]="filter" (input)="filter = $any($event.target).value"></label>
      <button type="button" class="secondary" (click)="filter = ''">Show all dates</button></div>
    <div class="table-wrap" tabindex="0" aria-label="Appointment schedule"><table>
      <thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Service</th><th>Status</th></tr></thead>
      <tbody>
        @for (item of appointments; track item.id) {
          <tr><td>{{displayDate(item.date)}}</td><td>{{item.time}}</td><td>{{patientName(item.patient)}}</td><td>{{t(item.service)}}</td>
            <td><select [attr.data-status]="item.status" [attr.aria-label]="t('Status for') + ' ' + patientName(item.patient)" [value]="item.status" (change)="updateStatus(item.id, $event.target)">
              @for (status of statuses; track status) {
                <option [value]="status" [selected]="item.status === status">{{t(status)}}</option>
              }
            </select></td></tr>
        } @empty { <tr><td colspan="5">No appointments for this date.</td></tr> }
      </tbody>
    </table></div></section>
      <div class="actions">
        <section class="panel" id="patients"><h2>Register a patient</h2>
    <form (submit)="addPatient($event)">
      <label>Full name <input name="name" required maxlength="80" placeholder="e.g. Amelia Brooks"></label>
      <button type="submit">Register patient</button>
    </form>
    </section><section class="panel" id="booking"><h2>Book an appointment</h2>
    <form (submit)="book($event)">
      <label>Patient <select aria-label="Patient" name="patient" required>
        @for (patient of data.patients; track patient.id) {
          <option [value]="patient.id">{{patient.name}}</option>
        }
      </select></label>
      <label>Service <select name="service"><option value="Cleaning">Cleaning</option><option value="Consultation">Consultation</option><option value="Follow-up">Follow-up</option><option value="Dental filling">Dental filling</option></select></label>
      <label>Date <input type="date" name="date" required [value]="date"></label>
      <label>Time <input type="time" name="time" required></label>
      <button type="submit">Book appointment</button>
    </form>
    </section>
      </div>
    </div>
  `),
})(DentalDesk);

export async function mount(container) {
  const app = await createApplication();
  if (!container.isConnected) {
    app.destroy();
    return;
  }
  const host = document.createElement('dental-desk');
  container.append(host);
  const component = createComponent(DentalDesk, { environmentInjector: app.injector, hostElement: host });
  app.attachView(component.hostView);
  component.changeDetectorRef.detectChanges();
  const observer = new MutationObserver(() => {
    if (!container.isConnected) {
      observer.disconnect();
      app.destroy();
    }
  });
  observer.observe(document.querySelector('#demo'), { childList: true });
}
