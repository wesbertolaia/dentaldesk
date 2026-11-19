import{a as l,c as r,e,f as a}from"./chunk-NW2DZAGW.js";var s="dentaldesk-requests-v1",c="dentaldesk-last-request-v1",{t:o,template:b,url:h}=window.siteLocale,d=new URLSearchParams(location.search).get("offer")==="times";d&&(document.querySelector("#offer").textContent="See dental visit times");var p=["Dental check-up","Cleaning","Consultation"],u=["Tuesday, 9:30 AM","Wednesday, 11:00 AM","Friday, 2:30 PM"],i=class{t=o;step=1;service=p[0];slot=u[0];services=p;slots=u;request=e(s,[]).find(t=>t.id===e(c,null));notice="";clinicUrl=h("./");cta=d?"See appointment times":"Choose a visit time";submit(){let t=e(s,[]),n={id:crypto.randomUUID(),service:this.service,slot:this.slot,patient:"Alex Morgan",status:"Pending clinic review"};if(!a(s,[n,...t])){this.notice="Changes could not be saved in this browser.";return}a(c,n.id),this.request=n,this.notice="",this.go(5)}track(){this.request=e(s,[]).find(t=>t.id===e(c,null)),this.request&&(this.service=this.request.service,this.slot=this.request.slot,this.go(5))}confirmation(){return o("You selected {service} for {slot}. No real appointment was booked.").replace("{service}",o(this.service)).replace("{slot}",o(this.slot))}go(t){this.step=t,requestAnimationFrame(()=>document.querySelector("#step-title")?.focus())}};l({selector:"patient-booking",template:b(`
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
            <label class="patient-profile"><input type="checkbox" required> Use Alex Morgan\u2019s sample profile</label>
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
  `)})(i);var v=document.createElement("patient-booking");document.querySelector("#booking").append(v);r(i);
