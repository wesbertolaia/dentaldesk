import{a as o,c as s}from"./chunk-2DIHERO6.js";var{t,template:l}=window.siteLocale,a=new URLSearchParams(location.search).get("offer")==="times";a&&(document.querySelector("#offer").textContent="See dental visit times");var i=["Dental check-up","Cleaning","Consultation"],n=["Tuesday, 9:30 AM","Wednesday, 11:00 AM","Friday, 2:30 PM"],e=class{t=t;step=1;service=i[0];slot=n[0];services=i;slots=n;cta=a?"See appointment times":"Choose a visit time";confirmation(){return t("You selected {service} for {slot}. No real appointment was booked.").replace("{service}",t(this.service)).replace("{slot}",t(this.slot))}go(c){this.step=c,requestAnimationFrame(()=>document.querySelector("#step-title")?.focus())}};o({selector:"patient-booking",template:l(`
    <section class="card" aria-labelledby="step-title">
      @if (step < 4) {
        <p class="progress">{{t('Step {step} of 3').replace('{step}', step)}}</p>
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
        }
        @case (2) {
          <h2 id="step-title" tabindex="-1">Pick a sample time</h2>
          <label>Appointment time
            <select [value]="slot" (change)="slot = $any($event.target).value">
              @for (option of slots; track option) { <option [value]="option" [selected]="option === slot">{{t(option)}}</option> }
            </select>
          </label>
          <div class="actions">
            <button type="button" (click)="go(3)">Review request</button>
            <button class="secondary" type="button" (click)="go(1)">Back</button>
          </div>
        }
        @case (3) {
          <h2 id="step-title" tabindex="-1">Review your request</h2>
          <dl><dt>Visit</dt><dd>{{t(service)}}</dd><dt>Time</dt><dd>{{t(slot)}}</dd></dl>
          <p class="note">This prototype uses sample slots and sends nothing to a clinic.</p>
          <div class="actions">
            <button type="button" (click)="go(4)">Submit sample request</button>
            <button class="secondary" type="button" (click)="go(2)">Back</button>
          </div>
        }
        @case (4) {
          <h2 id="step-title" tabindex="-1">Sample request complete</h2>
          <p class="note">{{confirmation()}}</p>
          <button class="secondary" type="button" (click)="go(1)">Start again</button>
        }
      }
    </section>
  `)})(e);var p=document.createElement("patient-booking");document.querySelector("#booking").append(p);s(e);
