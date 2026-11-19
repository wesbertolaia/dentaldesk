import{a as u,b as m,d as h,e as r,f as p,g as o}from"./chunk-NW2DZAGW.js";var{t:v,date:g,template:y}=window.siteLocale,f="dentaldesk-v1",c="dentaldesk-requests-v1",q=["Scheduled","Confirmed","Completed","Cancelled"],C={patients:[{id:"p1",name:"Emma Miller"},{id:"p2",name:"Oliver Davis"},{id:"p3",name:"Grace Wilson"}],appointments:[{id:"a1",patient:"p1",date:o(),time:"09:00",service:"Cleaning",status:"Confirmed"},{id:"a2",patient:"p2",date:o(),time:"11:30",service:"Consultation",status:"Scheduled"},{id:"a3",patient:"p3",date:o(),time:"14:00",service:"Follow-up",status:"Confirmed"}]},l=class{t=v;displayDate=g;data=r(f,C);filter="";date=o();statuses=q;notice="";requests=r(c,[]);requestFilter="Pending clinic review";get filteredRequests(){return this.requests.filter(t=>!this.requestFilter||t.status===this.requestFilter)}get pendingRequests(){return this.requests.filter(t=>t.status==="Pending clinic review").length}resolveRequest(t,i){let a=r(c,[]),n=a.find(e=>e.id===t&&e.status==="Pending clinic review");if(!n){this.requests=a;return}if(i==="Confirmed in demo"&&a.some(e=>e.id!==t&&e.slot===n.slot&&e.status==="Confirmed in demo")){this.notice="That sample time is already confirmed for another request.";return}let s=a.map(e=>e.id===t&&e.status==="Pending clinic review"?{...e,status:i}:e);if(!p(c,s)){this.notice="Changes could not be saved in this browser.";return}this.requests=s,this.notice="Request status updated."}get todayAppointments(){return this.data.appointments.filter(t=>t.date===this.date&&t.status!=="Cancelled")}get confirmedToday(){return this.todayAppointments.filter(t=>t.status==="Confirmed").length}get appointments(){return this.data.appointments.filter(t=>!this.filter||t.date===this.filter).sort((t,i)=>(t.date+t.time).localeCompare(i.date+i.time))}patientName(t){return this.data.patients.find(i=>i.id===t)?.name??v("Patient unavailable")}persist(t,i){return p(f,t)?(this.data=t,this.notice=i,!0):(this.notice="Changes could not be saved in this browser.",!1)}addPatient(t){t.preventDefault();let i=t.currentTarget,a=new FormData(i).get("name").trim();if(!a){this.notice="Enter a patient name.";return}let n=[...this.data.patients,{id:crypto.randomUUID(),name:a}];this.persist({...this.data,patients:n},"Patient registered.")&&i.reset()}book(t){t.preventDefault();let i=t.currentTarget,a=Object.fromEntries(new FormData(i));if(this.data.appointments.some(e=>e.date===a.date&&e.time===a.time&&e.status!=="Cancelled")){this.notice="This appointment slot is already booked.";return}let s=[...this.data.appointments,{...a,id:crypto.randomUUID(),status:"Scheduled"}];this.persist({...this.data,appointments:s},"Appointment scheduled.")&&(this.filter=a.date,i.reset())}updateStatus(t,i){let a=this.data.appointments.find(e=>e.id===t),n=i.value;if(a.status==="Cancelled"&&n!=="Cancelled"&&this.data.appointments.some(e=>e.id!==t&&e.date===a.date&&e.time===a.time&&e.status!=="Cancelled")){i.value=a.status,this.notice="This appointment slot has been booked again.";return}let s=this.data.appointments.map(e=>e.id===t?{...e,status:n}:e);this.persist({...this.data,appointments:s},"Appointment status updated.")||(i.value=a.status)}};u({selector:"dental-desk",template:y(`
    <dl class="metrics" aria-label="Practice overview">
      <div><dt>Today\u2019s visits</dt><dd>{{todayAppointments.length}}</dd></div>
      <div><dt>Confirmed today</dt><dd>{{confirmedToday}}</dd></div>
      <div><dt>Patients</dt><dd>{{data.patients.length}}</dd></div>
    </dl>
    <p class="notice" role="status">{{t(notice)}}</p>
    <section class="panel request-inbox">
      <h2>Patient requests</h2>
      <div class="inbox-tools">
        <p>{{pendingRequests}} {{t('awaiting review')}}</p>
        <label>Request status
          <select [value]="requestFilter" (change)="requestFilter = $any($event.target).value">
            <option value="Pending clinic review" selected>Pending clinic review</option>
            <option value="">All requests</option>
            <option value="Confirmed in demo">Confirmed in demo</option>
            <option value="Declined in demo">Declined in demo</option>
            <option value="Cancelled in demo">Cancelled in demo</option>
          </select>
        </label>
      </div>
      @for (item of filteredRequests; track item.id) {
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
      } @empty { <p>No requests match this status.</p> }
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
  `)})(l);async function b(d){let t=await h();if(!d.isConnected){t.destroy();return}let i=document.createElement("dental-desk");d.append(i);let a=m(l,{environmentInjector:t.injector,hostElement:i});t.attachView(a.hostView),a.changeDetectorRef.detectChanges();let n=new MutationObserver(()=>{d.isConnected||(n.disconnect(),t.destroy())});n.observe(document.querySelector("#demo"),{childList:!0})}b(document.querySelector(".demo-app"));
