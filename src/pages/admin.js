import { button, chip, icon, pageHeading, sectionHeading, statCard } from "../components.js";

export function renderAdmin() {
  return `
    ${pageHeading("Platform overview.", "A staging area for SweetAir records and future moderation tools.", "settings", "yellow")}
    <div class="notice warm" style="margin-bottom:16px"><p>These are sample records for the POC. Administrative changes, CSV imports, identity review, and moderation do not affect a live service.</p></div>
    <div class="stat-grid">${statCard("Demo accounts", "126", "user")}${statCard("Locations", "18", "pin")}${statCard("Pending reviews", "4", "bell")}</div>
    ${sectionHeading("Staging records", "Common object types for a future admin console")}
    <div class="three-column">
      <article class="surface-card"><div class="icon-bubble peach">${icon("user", 22)}</div><h2 style="margin-top:15px">People & performers</h2><p class="muted-copy">Role, profile, bands, and verification state.</p><div class="form-actions" style="margin-top:16px">${chip("Demo CRUD")}</div></article>
      <article class="surface-card"><div class="icon-bubble blue">${icon("pin", 22)}</div><h2 style="margin-top:15px">Places & schedules</h2><p class="muted-copy">Public locations, venue listings, and slot records.</p><div class="form-actions" style="margin-top:16px">${chip("Demo CRUD")}</div></article>
      <article class="surface-card"><div class="icon-bubble green">${icon("calendar", 22)}</div><h2 style="margin-top:15px">Requests & activity</h2><p class="muted-copy">Booking decisions and event-based audit history.</p><div class="form-actions" style="margin-top:16px">${chip("Demo CRUD")}</div></article>
    </div>
    ${sectionHeading("Bulk data import", "CSV import interface placeholder")}
    <section class="surface-card">
      <label class="field">Choose a CSV file<input type="file" accept=".csv,text/csv" data-admin-csv /></label>
      <p class="field-hint">The selected file is not uploaded or parsed. Connect this interface to a permission-checked import endpoint before use.</p>
      <div class="form-actions" style="margin-top:14px">${button("Review data", "admin-import", { iconName: "arrow", tone: "quiet", size: "small" })}</div>
    </section>
  `;
}
