import { locations } from "../data.js";
import { button, chip, icon, pageHeading, sectionHeading, statCard, escapeHtml } from "../components.js";

export function renderMunicipality({ publicPlaces }) {
  const places = [...publicPlaces, ...locations.filter((location) => location.type === "Public place")];
  const cards = places.map((place) => `
    <article class="location-card">
      <div class="card-heading"><div class="location-title"><div class="venue-art">${escapeHtml(place.emoji || "📍")}</div><div class="location-copy"><h3>${escapeHtml(place.name)}</h3><p>${escapeHtml(place.address || "Philadelphia")}</p></div></div>${chip(place.status || "Public place", "success")}</div>
      <div class="detail-row">${icon("wallet", 16)}${escapeHtml(place.pay || "$15 / hour demo rate")}</div>
      <div class="chip-row">${chip("Public place")}${chip("Performance rules")}</div>
    </article>
  `).join("");

  return `
    ${pageHeading("Make space for local sound.", "Set up welcoming public places and keep local performance information organized.", "city", "blue")}
    <div class="stat-grid">${statCard("Public places", String(places.length), "pin")}${statCard("Active demo permits", "8", "check")}${statCard("Performances this month", "42", "music")}</div>
    <div class="notice warm" style="margin-bottom:16px"><p>Municipal approval, permit verification, grant funding, and public-payout workflows are not connected in this demo.</p></div>
    ${sectionHeading("Public places", "Location profiles and the performance rules attached to them")}
    <div class="location-list">${cards}</div>
    ${sectionHeading("Create a public place", "Add a location to the local demo list")}
    <section class="surface-card">
      <form class="form-grid" data-form="create-location">
        <label class="field">Place name<input name="name" required placeholder="e.g. Neighborhood plaza" /></label>
        <label class="field">Address or cross streets<input name="address" required placeholder="Street, neighborhood, city" /></label>
        <div class="form-grid two">
          <label class="field">Approval style<select name="status"><option>Open approval</option><option>Permit required</option><option>Request based</option></select></label>
          <label class="field">Demo hourly rate<input name="pay" type="number" min="0" placeholder="15" /></label>
        </div>
        <label class="field">Venue rules or notes<textarea name="rules" placeholder="Hours, permit notes, sound requirements"></textarea></label>
        <div class="form-actions">${button("Add place", "save-location", { iconName: "plus", tone: "primary", type: "submit" })}</div>
      </form>
    </section>
  `;
}
