import { locations } from "../data.js";
import { avatar, button, chip, icon, pageHeading, sectionHeading, statCard, escapeHtml } from "../components.js";

export function renderPerformer({ checkedIn, slots, userName }) {
  const bookingCards = slots.map((slot) => `
    <article class="slot-card">
      <div class="card-heading"><div><h3>${escapeHtml(slot.location)}</h3><p class="muted-copy">${escapeHtml(slot.time)}</p></div>${chip(slot.status, slot.status === "Booked" ? "success" : "")}</div>
      <div class="detail-row">${icon("music", 16)}${escapeHtml(slot.performer)}</div>
      ${slot.status === "Booked" ? `<button class="btn btn-small ${checkedIn ? "btn-quiet" : "btn-primary"}" data-action="demo-checkin">${checkedIn ? "Demo check-in active" : "Try demo check-in"}</button>` : ""}
    </article>
  `).join("");
  const savedPlaces = locations.slice(0, 2);

  return `
    ${pageHeading(`Good to have you, ${userName || "BongoJohn"}.`, "Your next set is coming up. Make the most of the time between songs.", "music", "peach")}
    ${checkedIn ? '<div class="notice" style="margin-bottom:16px"><p>Demo check-in active. Real GPS and geofence verification are not enabled.</p></div>' : ""}
    <div class="stat-grid">${statCard("Demo tips", "$28.00", "wallet")}${statCard("Upcoming sets", String(slots.filter((slot) => slot.status === "Booked").length), "calendar")}${statCard("Followers", "126", "heart")}</div>
    <section class="surface-card">
      <div class="card-heading"><div class="profile-line">${avatar("🎷")}<div class="profile-copy"><h2>The Alley Cats</h2><p>Jazz trio · Philadelphia</p></div></div><button class="btn btn-small btn-yellow" data-action="edit-profile">Edit profile</button></div>
      <p class="muted-copy">A little swing, a little sunshine. Catch us around the neighborhood.</p>
      <div class="chip-row">${chip("Jazz")}${chip("Ensemble")}${chip("Acoustic")}</div>
      <div class="detail-row">${icon("share", 16)}Band invite and profile links are ready to connect.</div>
    </section>
    ${sectionHeading("Your performances", "Bookings and demo check-in status", button("Find a place", "navigate", { iconName: "search", tone: "quiet", size: "small", value: "discover" }))}
    <div class="slot-list">${bookingCards || '<div class="empty-state">No booked performances yet. Find a place to play.</div>'}</div>
    ${sectionHeading("Open places", "Places accepting performer requests")}
    <div class="location-list">${savedPlaces.map((location) => `
      <article class="location-card"><div class="card-heading"><div class="location-title"><div class="venue-art">${escapeHtml(location.emoji)}</div><div class="location-copy"><h3>${escapeHtml(location.name)}</h3><p>${escapeHtml(location.status)} · ${escapeHtml(location.pay)}</p></div></div>${chip("View slots")}</div><div class="form-actions" style="margin-top:13px"><button class="btn btn-small btn-primary" data-action="book-slot" data-value="${location.id}">Request a slot</button><button class="btn btn-small btn-quiet" data-action="toggle-location-follow" data-value="${location.id}">Follow place</button></div></article>
    `).join("")}</div>
    <div class="notice warm" style="margin-top:16px"><p>Demo balances are sample data. Payments, bank details, tax forms, and payout splitting are intentionally not connected.</p></div>
  `;
}
