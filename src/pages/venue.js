import { button, chip, icon, pageHeading, sectionHeading, statCard, escapeHtml } from "../components.js";

export function renderVenue({ requests, slots }) {
  const requestsHtml = requests.map((request) => `
    <article class="slot-card">
      <div class="card-heading"><div><h3>${escapeHtml(request.performer)}</h3><p class="muted-copy">${escapeHtml(request.slot)}</p></div>${chip(request.status, request.status === "Pending" ? "live" : request.status === "Approved" ? "success" : "")}</div>
      <div class="detail-row">${icon("venue", 16)}${escapeHtml(request.location)}</div>
      ${request.status === "Pending" ? `<div class="form-actions"><button class="btn btn-small btn-primary" data-action="booking-decision" data-value="${request.id}|Approved">Approve request</button><button class="btn btn-small btn-quiet" data-action="booking-decision" data-value="${request.id}|Declined">Decline</button></div>` : ""}
    </article>
  `).join("");
  const slotsHtml = slots.map((slot) => `
    <article class="activity-row"><div class="card-heading"><div><h3>${escapeHtml(slot.time)}</h3><p class="muted-copy">${escapeHtml(slot.performer)}</p></div>${chip(slot.status, slot.status === "Available" ? "success" : "")}</div></article>
  `).join("");

  return `
    ${pageHeading("Welcome to Leftie's.", "Make room for good music and keep your performance calendar in tune.", "venue", "green")}
    <div class="stat-grid">${statCard("Open slots", String(slots.filter((slot) => slot.status === "Available").length), "calendar")}${statCard("Requests to review", String(requests.filter((request) => request.status === "Pending").length), "bell")}${statCard("Upcoming acts", String(slots.filter((slot) => slot.status === "Booked").length), "music")}</div>
    <section class="surface-card">
      <div class="card-heading"><div class="location-title"><div class="venue-art">🍻</div><div class="location-copy"><h2>Leftie's Brewery</h2><p>South Street · Private venue</p></div></div><button class="btn btn-small btn-yellow" data-action="edit-profile">Manage profile</button></div>
      <div class="chip-row" style="margin-top:14px">${chip("Request based")}${chip("Sound system")}${chip("Wi-Fi")}${chip("$20 / hour")}</div>
      <div class="detail-row">${icon("pin", 16)}Venue policies and accommodations can be added to your public profile.</div>
    </section>
    ${sectionHeading("Requests to review", "Accept or decline a performer’s proposed time")}
    <div class="slot-list">${requestsHtml || '<div class="empty-state">You’re all caught up. New requests will show here.</div>'}</div>
    ${sectionHeading("Performance slots")}
    <div class="slot-list">${slotsHtml}</div>
    ${sectionHeading("Add a performance slot", "Set a date, time, and optional pay rate")}
    <section class="surface-card">
      <form class="form-grid" data-form="create-slot">
        <label class="field">Date<input name="date" type="date" required /></label>
        <div class="form-grid two">
          <label class="field">Start time<input name="start" type="time" value="17:00" required /></label>
          <label class="field">End time<input name="end" type="time" value="18:00" required /></label>
        </div>
        <label class="field">Hourly pay (optional)<input name="pay" type="number" min="0" placeholder="20" /></label>
        <div class="notice warm"><p>Saving updates this browser’s demo schedule only. Booking notifications and payouts are not connected.</p></div>
        <div class="form-actions">${button("Add open slot", "save-slot", { iconName: "plus", tone: "primary", type: "submit" })}</div>
      </form>
    </section>
  `;
}
