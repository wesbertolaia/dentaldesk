import{a as c,c as r,e as s,f as n}from"./chunk-NW2DZAGW.js";var i="dentaldesk-requests-v1",l="dentaldesk-last-request-v1",{t:o,template:h,url:b}=window.siteLocale,p=new URLSearchParams(location.search).get("offer")==="times";p&&(document.querySelector("#offer").textContent="See dental visit times");var d=["Dental check-up","Cleaning","Consultation"],u=["Tuesday, 9:30 AM","Wednesday, 11:00 AM","Friday, 2:30 PM"],a=class{t=o;step=1;service=d[0];slot=u[0];services=d;get slots(){let t=new Set(s(i,[]).filter(e=>e.status==="Confirmed in demo").map(e=>e.slot));return u.filter(e=>!t.has(e))}selectTime(){this.slots.includes(this.slot)||(this.slot=this.slots[0]||""),this.go(2)}request=s(i,[]).find(t=>t.id===s(l,null));notice="";clinicUrl=b("./");cta=p?"See appointment times":"Choose a visit time";submit(){let t=s(i,[]);if(!this.slots.includes(this.slot)){this.notice="That time is no longer available. Please choose another.",this.selectTime();return}let e={id:crypto.randomUUID(),service:this.service,slot:this.slot,patient:"Alex Morgan",status:"Pending clinic review"};if(!n(i,[e,...t])){this.notice="Changes could not be saved in this browser.";return}n(l,e.id),this.request=e,this.notice="",this.go(5)}track(){this.request=s(i,[]).find(t=>t.id===s(l,null)),this.request&&(this.service=this.request.service,this.slot=this.request.slot,this.go(5))}cancelRequest(){let t=s(i,[]).map(e=>e.id===this.request.id&&e.status==="Pending clinic review"?{...e,status:"Cancelled in demo"}:e);if(!n(i,t)){this.notice="Changes could not be saved in this browser.";return}this.track()}statusMessage(){return o({"Pending clinic review":"The demo clinic still needs to approve this time. Check back here for its decision.","Confirmed in demo":"The demo clinic confirmed this time. The details below are your sample booking.","Declined in demo":"This request was declined. Choose another time to send a new request.","Cancelled in demo":"You cancelled this request. You can choose a new time whenever you\u2019re ready."}[this.request.status]||"Check the status of your sample request.")}confirmation(){return o("You selected {service} for {slot}. No real appointment was booked.").replace("{service}",o(this.service)).replace("{slot}",o(this.slot))}go(t){this.step=t,requestAnimationFrame(()=>document.querySelector("#step-title")?.focus())}};c({selector:"patient-booking",template:h(`
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
          <button type="button" (click)="selectTime()">{{t(cta)}}</button>
          @if (request) { <button class="secondary" type="button" (click)="track()">Track last request</button> }
        }
        @case (2) {
          <h2 id="step-title" tabindex="-1">Choose an available time</h2>
          @if (!slots.length) { <p class="note">No times are available right now.</p> }
          <label>Appointment time
            <select [value]="slot" (change)="slot = $any($event.target).value">
              @for (option of slots; track option) { <option [value]="option" [selected]="option === slot">{{t(option)}}</option> }
            </select>
          </label>
          <div class="actions">
            <button type="button" [disabled]="!slot" (click)="go(3)">Continue to patient details</button>
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
          <p class="status-next">{{statusMessage()}}</p>
          <dl><dt>Reference</dt><dd>{{request.id.slice(0, 8).toUpperCase()}}</dd><dt>Visit</dt><dd>{{t(service)}}</dd><dt>Time</dt><dd>{{t(slot)}}</dd></dl>
          <p class="note">This booking is a simulation.</p>
          @if (request.status === 'Declined in demo' || request.status === 'Cancelled in demo') {
            <button type="button" (click)="selectTime()">Choose another time</button>
          }
          @if (request.status === 'Pending clinic review') {
            <button type="button" class="secondary" (click)="cancelRequest()">Cancel sample request</button>
          }
          <div class="actions"><button type="button" (click)="track()">Refresh status</button><a [href]="clinicUrl">Clinic workspace</a></div>
          <button class="secondary" type="button" (click)="go(1)">Start again</button>
        }
      }
      <p class="note" role="status">{{t(notice)}}</p>
    </section>
  `)})(a);var m=document.createElement("patient-booking");document.querySelector("#booking").append(m);r(a);
