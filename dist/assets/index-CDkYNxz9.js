(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const v="/api";async function g(e,o={}){const t=await fetch(`${v}${e}`,{headers:{"Content-Type":"application/json",...o.headers||{}},...o}),s=t.headers.get("content-type")?.includes("application/json")?await t.json():null;if(!t.ok)throw new Error(s?.error||"Request failed");return s}function w(e,o){return g("/auth/login",{method:"POST",body:JSON.stringify({email:e,password:o})})}function P(e){return g("/rides",{method:"POST",body:JSON.stringify(e)})}function h(e){return g(`/rides/${e}`)}function S(e){return g(`/users/${e}/rides`)}function L(e){return g(`/users/${e}/accessibility`)}function R(e,o){return g(`/users/${e}/accessibility`,{method:"PUT",body:JSON.stringify({accessibility:o})})}const f="ecopool_user";function p(){const e=localStorage.getItem(f);if(!e)return null;try{return JSON.parse(e)}catch{return localStorage.removeItem(f),null}}function A(e){localStorage.setItem(f,JSON.stringify(e))}function D(){localStorage.removeItem(f)}const x=document.getElementById("root");function r(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function a(e,o){document.title=e,x.innerHTML=o}function H(){const e=window.location.hash.replace(/^#/,"")||"/",o=e.match(/^\/track\/([a-zA-Z0-9]+)$/),t=e.match(/^\/ride\/([a-zA-Z0-9]+)$/);return o?{name:"track",id:o[1]}:t?{name:"ride",id:t[1]}:e==="/"?{name:"home"}:e==="/history"?{name:"history"}:e==="/accessibility"?{name:"accessibility"}:e==="/login"?{name:"login"}:{name:"notFound"}}function T(){const e=p();return`
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="#/" class="brand">EcoPool EV</a>
        <nav class="nav-links">
          <a href="#/">Book Ride</a>
          <a href="#/history">My Rides</a>
          <a href="#/accessibility">Accessibility</a>
          ${e?`<button id="logout-btn" class="btn secondary">Logout (${r(e.name)})</button>`:'<a href="#/login" class="btn secondary">Login</a>'}
        </nav>
      </div>
    </header>
  `}function c(e,o){return`
    ${T()}
    <main class="container page">
      ${o}
    </main>
    <footer class="footer">© 2026 EcoPool EV. Sustainable and accessible mobility.</footer>
  `}function l(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",()=>{D(),b()})}function y(e){return`<p class="error">${r(e)}</p>`}function E(e){return`<p class="info">${r(e)}</p>`}async function F(){a("EcoPool EV - Home",c("Home",`
    <section class="card hero">
      <h1>Book your eco-friendly ride</h1>
      <p>AI-optimized routes with accessibility-first options.</p>
    </section>

    <section class="card">
      <h2>Book a Ride</h2>
      <form id="book-form" class="form-grid">
        <label>Origin<input name="origin" required /></label>
        <label>Destination<input name="destination" required /></label>
        <label>Date<input name="date" type="date" required /></label>
        <label>Time<input name="time" type="time" required /></label>

        <fieldset class="full">
          <legend>Accessibility</legend>
          <label><input type="checkbox" name="wheelchair" /> Wheelchair ramp</label>
          <label><input type="checkbox" name="assistance" /> Driver assistance</label>
          <label><input type="checkbox" name="serviceAnimal" /> Service animal</label>
        </fieldset>

        <button type="submit" class="btn primary full">Book Now</button>
        <p id="book-msg" class="info full"></p>
      </form>
    </section>
  `)),l();const o=document.getElementById("book-form"),t=document.getElementById("book-msg");o.addEventListener("submit",async i=>{i.preventDefault();const s=p();if(!s){window.location.hash="#/login";return}const n=new FormData(o);t.textContent="Booking ride...";try{const m=await P({userId:s.id,origin:n.get("origin"),destination:n.get("destination"),date:n.get("date"),time:n.get("time"),accessibility:{wheelchair:n.get("wheelchair")==="on",assistance:n.get("assistance")==="on",serviceAnimal:n.get("serviceAnimal")==="on"}});window.location.hash=`#/track/${m.ride._id}`}catch(m){t.textContent=m.message||"Booking failed.",t.className="error full"}})}async function N(){a("EcoPool EV - Login",c("Login",`
    <section class="card auth-card">
      <h1>Login</h1>
      <form id="login-form" class="stack">
        <label>Email<input name="email" type="email" required /></label>
        <label>Password<input name="password" type="password" required /></label>
        <button type="submit" class="btn primary">Sign In</button>
        <p id="login-msg" class="info"></p>
      </form>
    </section>
  `)),l();const o=document.getElementById("login-form"),t=document.getElementById("login-msg");o.addEventListener("submit",async i=>{i.preventDefault();const s=new FormData(o);t.textContent="Signing in...";try{const n=await w(s.get("email"),s.get("password"));A(n.user),window.location.hash="#/"}catch(n){t.textContent=n.message||"Login failed.",t.className="error"}})}async function V(){const e=p();if(!e){a("EcoPool EV - History",c("History",`<section class="card">${E("Please login to see ride history.")}</section>`)),l();return}a("EcoPool EV - History",c("History",'<section class="card">Loading ride history...</section>')),l();try{const o=await S(e.id),t=o.rides||[],i=t.length===0?'<p class="info">No rides found yet.</p>':t.map(n=>`
                <article class="ride-row">
                  <div>
                    <h3>${r(n.origin)} → ${r(n.destination)}</h3>
                    <p>${r(n.date)} ${r(n.time)} | ${r(n.status)}</p>
                  </div>
                  <div class="ride-actions">
                    <span>$${Number(n.fare||0).toFixed(2)}</span>
                    <a class="btn ghost" href="#/ride/${n._id}">Details</a>
                    <a class="btn secondary" href="#/track/${n._id}">Track</a>
                  </div>
                </article>
              `).join(""),s=`
      <section class="card">
        <h1>My Rides</h1>
        <p>Total CO2 saved: ${Number(o.totalCo2Saved||0).toFixed(1)} kg</p>
        <div class="rides-list">${i}</div>
      </section>
    `;a("EcoPool EV - History",c("History",s)),l()}catch(o){a("EcoPool EV - History",c("History",`<section class="card">${y(o.message||"Failed to fetch history.")}</section>`)),l()}}function u(e,o,t){const[i,s]=o;return typeof e?.[i]?.[s]=="boolean"?e[i][s]:t}async function I(){const e=p();if(!e){a("EcoPool EV - Accessibility",c("Accessibility",`<section class="card">${E("Please login to manage preferences.")}</section>`)),l();return}a("EcoPool EV - Accessibility",c("Accessibility",'<section class="card">Loading preferences...</section>')),l();try{const t=(await L(e.id)).accessibility||{},i=`
      <section class="card">
        <h1>Accessibility Preferences</h1>
        <form id="prefs-form" class="stack">
          <fieldset>
            <legend>Mobility</legend>
            <label><input type="checkbox" name="mobility.wheelchairRamp" ${u(t,["mobility","wheelchairRamp"],!1)?"checked":""} /> Wheelchair ramp</label>
            <label><input type="checkbox" name="mobility.lowFloor" ${u(t,["mobility","lowFloor"],!1)?"checked":""} /> Low floor entry</label>
            <label><input type="checkbox" name="mobility.extraLegroom" ${u(t,["mobility","extraLegroom"],!1)?"checked":""} /> Extra legroom</label>
            <label><input type="checkbox" name="mobility.storageSpace" ${u(t,["mobility","storageSpace"],!1)?"checked":""} /> Storage space</label>
          </fieldset>

          <fieldset>
            <legend>Assistance</legend>
            <label><input type="checkbox" name="assistance.driverHelp" ${u(t,["assistance","driverHelp"],!1)?"checked":""} /> Driver help</label>
            <label><input type="checkbox" name="assistance.doorToDoor" ${u(t,["assistance","doorToDoor"],!1)?"checked":""} /> Door to door</label>
            <label><input type="checkbox" name="assistance.luggageHelp" ${u(t,["assistance","luggageHelp"],!1)?"checked":""} /> Luggage help</label>
          </fieldset>

          <fieldset>
            <legend>Sensory</legend>
            <label><input type="checkbox" name="sensory.quietRide" ${u(t,["sensory","quietRide"],!1)?"checked":""} /> Quiet ride</label>
            <label><input type="checkbox" name="sensory.minimalScents" ${u(t,["sensory","minimalScents"],!1)?"checked":""} /> Minimal scents</label>
            <label><input type="checkbox" name="sensory.screenReader" ${u(t,["sensory","screenReader"],!1)?"checked":""} /> Screen reader compatibility</label>
          </fieldset>

          <button type="submit" class="btn primary">Save Preferences</button>
          <p id="prefs-msg" class="info"></p>
        </form>
      </section>
    `;a("EcoPool EV - Accessibility",c("Accessibility",i)),l();const s=document.getElementById("prefs-form"),n=document.getElementById("prefs-msg");s.addEventListener("submit",async m=>{m.preventDefault();const d=new FormData(s),$={mobility:{wheelchairRamp:d.get("mobility.wheelchairRamp")==="on",lowFloor:d.get("mobility.lowFloor")==="on",extraLegroom:d.get("mobility.extraLegroom")==="on",storageSpace:d.get("mobility.storageSpace")==="on"},assistance:{driverHelp:d.get("assistance.driverHelp")==="on",doorToDoor:d.get("assistance.doorToDoor")==="on",luggageHelp:d.get("assistance.luggageHelp")==="on"},sensory:{quietRide:d.get("sensory.quietRide")==="on",minimalScents:d.get("sensory.minimalScents")==="on",screenReader:d.get("sensory.screenReader")==="on"}};n.textContent="Saving...";try{await R(e.id,$),n.textContent="Preferences saved successfully."}catch(k){n.textContent=k.message||"Save failed.",n.className="error"}})}catch(o){a("EcoPool EV - Accessibility",c("Accessibility",`<section class="card">${y(o.message||"Failed to load preferences.")}</section>`)),l()}}async function O(e){a("EcoPool EV - Tracking",c("Tracking",'<section class="card">Loading tracking...</section>')),l();try{const t=(await h(e)).ride,i=`
      <section class="card">
        <h1>Live Tracking</h1>
        <p><strong>Status:</strong> ${r(t.status)}</p>
        <p><strong>Route:</strong> ${r(t.origin)} → ${r(t.destination)}</p>
        <p><strong>ETA:</strong> ${Number(t.etaMinutes||0)} minutes</p>
        <p><strong>Distance:</strong> ${Number(t.distanceKm||0).toFixed(1)} km</p>
        <p><strong>Driver:</strong> ${r(t.driver?.name||"Assigned soon")}</p>
        <p><strong>Vehicle:</strong> ${r(t.driver?.vehicle||"EV")}</p>
        <a class="btn secondary" href="#/ride/${t._id}">Open Ride Details</a>
      </section>
    `;a("EcoPool EV - Tracking",c("Tracking",i)),l()}catch(o){a("EcoPool EV - Tracking",c("Tracking",`<section class="card">${y(o.message||"Failed to load tracking.")}</section>`)),l()}}async function B(e){a("EcoPool EV - Ride Details",c("Ride Details",'<section class="card">Loading details...</section>')),l();try{const t=(await h(e)).ride,i=`
      <section class="card">
        <h1>Ride Details</h1>
        <p><strong>From:</strong> ${r(t.origin)}</p>
        <p><strong>To:</strong> ${r(t.destination)}</p>
        <p><strong>Date:</strong> ${r(t.date)}</p>
        <p><strong>Time:</strong> ${r(t.time)}</p>
        <p><strong>Fare:</strong> $${Number(t.fare||0).toFixed(2)}</p>
        <p><strong>CO2 Saved:</strong> ${Number(t.co2SavedKg||0).toFixed(1)} kg</p>
        <a class="btn secondary" href="#/track/${t._id}">Back to Live Tracking</a>
      </section>
    `;a("EcoPool EV - Ride Details",c("Ride Details",i)),l()}catch(o){a("EcoPool EV - Ride Details",c("Ride Details",`<section class="card">${y(o.message||"Failed to load details.")}</section>`)),l()}}function C(){a("EcoPool EV - Not Found",c("Not Found",'<section class="card"><h1>Page not found</h1><a href="#/" class="btn secondary">Go Home</a></section>')),l()}async function b(){const e=H();return e.name==="home"?F():e.name==="login"?N():e.name==="history"?V():e.name==="accessibility"?I():e.name==="track"?O(e.id):e.name==="ride"?B(e.id):C()}window.addEventListener("hashchange",b);window.addEventListener("DOMContentLoaded",b);
