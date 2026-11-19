import{a as l,b as p,d as c}from"./chunk-2DIHERO6.js";function m(n,t){try{let e=localStorage.getItem(n);return e===null?t:JSON.parse(e)}catch{return t}}function u(n,t){try{return localStorage.setItem(n,JSON.stringify(t)),!0}catch{return!1}}function o(){let n=new Date;return[n.getFullYear(),n.getMonth()+1,n.getDate()].map(t=>String(t).padStart(2,"0")).join("-")}var{t:h,date:b,template:y}=window.siteLocale,f="dentaldesk-v1",g=["Scheduled","Confirmed","Completed","Cancelled"],C={patients:[{id:"p1",name:"Emma Miller"},{id:"p2",name:"Oliver Davis"},{id:"p3",name:"Grace Wilson"}],appointments:[{id:"a1",patient:"p1",date:o(),time:"09:00",service:"Cleaning",status:"Confirmed"},{id:"a2",patient:"p2",date:o(),time:"11:30",service:"Consultation",status:"Scheduled"},{id:"a3",patient:"p3",date:o(),time:"14:00",service:"Follow-up",status:"Confirmed"}]},d=class{t=h;displayDate=b;data=m(f,C);filter="";date=o();statuses=g;notice="";get todayAppointments(){return this.data.appointments.filter(t=>t.date===this.date&&t.status!=="Cancelled")}get confirmedToday(){return this.todayAppointments.filter(t=>t.status==="Confirmed").length}get appointments(){return this.data.appointments.filter(t=>!this.filter||t.date===this.filter).sort((t,e)=>(t.date+t.time).localeCompare(e.date+e.time))}patientName(t){return this.data.patients.find(e=>e.id===t)?.name??h("Patient unavailable")}persist(t,e){return u(f,t)?(this.data=t,this.notice=e,!0):(this.notice="Changes could not be saved in this browser.",!1)}addPatient(t){t.preventDefault();let e=t.currentTarget,a=new FormData(e).get("name").trim();if(!a){this.notice="Enter a patient name.";return}let s=[...this.data.patients,{id:crypto.randomUUID(),name:a}];this.persist({...this.data,patients:s},"Patient registered.")&&e.reset()}book(t){t.preventDefault();let e=t.currentTarget,a=Object.fromEntries(new FormData(e));if(this.data.appointments.some(i=>i.date===a.date&&i.time===a.time&&i.status!=="Cancelled")){this.notice="This appointment slot is already booked.";return}let r=[...this.data.appointments,{...a,id:crypto.randomUUID(),status:"Scheduled"}];this.persist({...this.data,appointments:r},"Appointment scheduled.")&&(this.filter=a.date,e.reset())}updateStatus(t,e){let a=this.data.appointments.find(i=>i.id===t),s=e.value;if(a.status==="Cancelled"&&s!=="Cancelled"&&this.data.appointments.some(i=>i.id!==t&&i.date===a.date&&i.time===a.time&&i.status!=="Cancelled")){e.value=a.status,this.notice="This appointment slot has been booked again.";return}let r=this.data.appointments.map(i=>i.id===t?{...i,status:s}:i);this.persist({...this.data,appointments:r},"Appointment status updated.")||(e.value=a.status)}};l({selector:"dental-desk",template:y(`
    <dl class="metrics" aria-label="Practice overview">
      <div><dt>Today\u2019s visits</dt><dd>{{todayAppointments.length}}</dd></div>
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
  `)})(d);async function v(n){let t=await c();if(!n.isConnected){t.destroy();return}let e=document.createElement("dental-desk");n.append(e);let a=p(d,{environmentInjector:t.injector,hostElement:e});t.attachView(a.hostView),a.changeDetectorRef.detectChanges();let s=new MutationObserver(()=>{n.isConnected||(s.disconnect(),t.destroy())});s.observe(document.querySelector("#demo"),{childList:!0})}v(document.querySelector(".demo-app"));
