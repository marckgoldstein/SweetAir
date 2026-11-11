import { roles } from "../data.js";
import { avatar, button, chip, icon, pageHeading, sectionHeading, escapeHtml } from "../components.js";

export function renderAccount({ user, role }) {
  const selectedRole = roles.find((item) => item.id === role) || roles[0];
  return `
    ${pageHeading("Your SweetAir profile.", "A little home for your account and preferences.", "user", "peach")}
    <section class="surface-card">
      <div class="profile-line">${avatar("🎶")}<div class="profile-copy"><h2>${escapeHtml(user?.name || "SweetAir guest")}</h2><p>${escapeHtml(user?.email || "Exploring without an account")}</p></div>${chip(selectedRole.label, "selected")}</div>
      <div class="detail-row" style="margin-top:18px">${icon("music", 16)}${escapeHtml(selectedRole.description)}</div>
      <div class="form-actions"><button class="btn btn-small btn-yellow" data-action="open-auth">${user ? "Switch demo account" : "Create a profile"}</button>${user ? '<button class="btn btn-small btn-quiet" data-action="sign-out">Sign out</button>' : ""}</div>
    </section>
    <section class="surface-card">
      <h2>Profile photo</h2>
      <p class="muted-copy">Choose an image to preview the object-storage interface.</p>
      ${user?.photoUrl ? `<img class="profile-photo" src="${escapeHtml(user.photoUrl)}" alt="Profile preview" />` : ""}
      <label class="field" style="margin-top:14px">Choose an image<input type="file" accept="image/*" data-profile-photo /></label>
      <p class="field-hint">The preview is kept in memory and will not persist after refresh.</p>
    </section>
    ${sectionHeading("Demo settings")}
    <section class="surface-card">
      <div class="card-heading"><div><h3>Notifications</h3><p class="muted-copy">Performance reminders and nearby music</p></div>${chip("Preview only")}</div>
      <div class="card-heading" style="margin-top:18px"><div><h3>Location access</h3><p class="muted-copy">Nearby results use demo places, not your GPS.</p></div>${chip("Off", "live")}</div>
    </section>
    <div class="notice warm" style="margin-top:16px"><p>OAuth, two-factor authentication, real push/email notifications, and location verification are intentionally not part of this demo.</p></div>
  `;
}
