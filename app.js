import{a as u,b as m,d as h,e as r,f as p,g as o}from"./chunk-NW2DZAGW.js";var{t:f,date:y,template:g}=window.siteLocale,v="dentaldesk-v1",c="dentaldesk-requests-v1",C=["Scheduled","Confirmed","Completed","Cancelled"],q={patients:[{id:"p1",name:"Emma Miller"},{id:"p2",name:"Oliver Davis"},{id:"p3",name:"Grace Wilson"}],appointments:[{id:"a1",patient:"p1",date:o(),time:"09:00",service:"Cleaning",status:"Confirmed"},{id:"a2",patient:"p2",date:o(),time:"11:30",service:"Consultation",status:"Scheduled"},{id:"a3",patient:"p3",date:o(),time:"14:00",service:"Follow-up",status:"Confirmed"}]},l=class{t=f;displayDate=y;data=r(v,q);filter="";date=o();statuses=C;notice="";requests=r(c,[]);resolveRequest(t,a){let i=r(c,[]),s=i.find(e=>e.id===t&&e.status==="Pending clinic review");if(!s){this.requests=i;return}if(a==="Confirmed in demo"&&i.some(e=>e.id!==t&&e.slot===s.slot&&e.status==="Confirmed in demo")){this.notice="That sample time is already confirmed for another request.";return}let n=i.map(e=>e.id===t&&e.status==="Pending clinic review"?{...e,status:a}:e);if(!p(c,n)){this.notice="Changes could not be saved in this browser.";return}this.requests=n,this.notice="Request status updated."}get todayAppointments(){return this.data.appointments.filter(t=>t.date===this.date&&t.status!=="Cancelled")}get confirmedToday(){return this.todayAppointments.filter(t=>t.status==="Confirmed").length}get appointments(){return this.data.appointments.filter(t=>!this.filter||t.date===this.filter).sort((t,a)=>(t.date+t.time).localeCompare(a.date+a.time))}patientName(t){return this.data.patients.find(a=>a.id===t)?.name??f("Patient unavailable")}persist(t,a){return p(v,t)?(this.data=t,this.notice=a,!0):(this.notice="Changes could not be saved in this browser.",!1)}addPatient(t){t.preventDefault();let a=t.currentTarget,i=new FormData(a).get("name").trim();if(!i){this.notice="Enter a patient name.";return}let s=[...this.data.patients,{id:crypto.randomUUID(),name:i}];this.persist({...this.data,patients:s},"Patient registered.")&&a.reset()}book(t){t.preventDefault();let a=t.currentTarget,i=Object.fromEntries(new FormData(a));if(this.data.appointments.some(e=>e.date===i.date&&e.time===i.time&&e.status!=="Cancelled")){this.notice="This appointment slot is already booked.";return}let n=[...this.data.appointments,{...i,id:crypto.randomUUID(),status:"Scheduled"}];this.persist({...this.data,appointments:n},"Appointment scheduled.")&&(this.filter=i.date,a.reset())}updateStatus(t,a){let i=this.data.appointments.find(e=>e.id===t),s=a.value;if(i.status==="Cancelled"&&s!=="Cancelled"&&this.data.appointments.some(e=>e.id!==t&&e.date===i.date&&e.time===i.time&&e.status!=="Cancelled")){a.value=i.status,this.notice="This appointment slot has been booked again.";return}let n=this.data.appointments.map(e=>e.id===t?{...e,status:s}:e);this.persist({...this.data,appointments:n},"Appointment status updated.")||(a.value=i.status)}};u({selector:"dental-desk",template:g(`
    <dl class="metrics" aria-label="Practice overview">
      <div><dt>Today\u2019s visits</dt><dd>{{todayAppointments.length}}</dd></div>
      <div><dt>Confirmed today</dt><dd>{{confirmedToday}}</dd></div>
      <div><dt>Patients</dt><dd>{{data.patients.length}}</dd></div>
    </dl>
    <p class="notice" role="status">{{t(notice)}}</p>
    <section class="panel request-inbox">
      <h2>Patient requests</h2>
      @for (item of requests; track item.id) {
        <article class="request-row">
          <div><strong>{{item.patient || "Alex Morgan"}}</strong><div>{{t(item.service)}} \xB7 {{t(item.slot)}}</div></div>
          <span class="request-status">{{t(item.status)}}</span>
          @if (item.status === 'Pending clinic review') {
            <div class="request-actions">
              <button type="button" (click)="resolveRequest(item.id, 'Confirmed in demo')">Confirm request</button>
              <button class="secondary" type="button" (click)="resolveRequest(item.id, 'Declined in demo')">Decline request</button>
            </div>
          }
        </article>
      } @empty { <p>No sample patient requests yet.</p> }
    </section>
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
  `)})(l);async function b(d){let t=await h();if(!d.isConnected){t.destroy();return}let a=document.createElement("dental-desk");d.append(a);let i=m(l,{environmentInjector:t.injector,hostElement:a});t.attachView(i.hostView),i.changeDetectorRef.detectChanges();let s=new MutationObserver(()=>{d.isConnected||(s.disconnect(),t.destroy())});s.observe(document.querySelector("#demo"),{childList:!0})}b(document.querySelector(".demo-app"));
