import { roles } from "../data.js";
import { button, icon, pageHeading } from "../components.js";

export function renderWelcome() {
  const cards = roles.map((role) => `
    <button class="role-card" data-action="choose-role" data-value="${role.id}">
      <span class="icon-bubble ${role.color}">${icon(role.icon, 22)}</span>
      <h2>${role.label}</h2>
      <p>${role.description}</p>
    </button>
  `).join("");

  return `
    ${pageHeading("Make the city a little louder.", "Find a nearby performance, book a place to play, or give local music room to grow.", "music", "peach")}
    <section class="hero-card">
      <div class="hero-copy">
        <h2>Take in the sweet air.</h2>
        <p>SweetAir brings neighborhood performers and the places that welcome them together. Pick a way in and start exploring.</p>
        ${button("Explore performances", "guest-explore", { tone: "primary", iconName: "arrow" })}
      </div>
    </section>
    <div class="section-heading"><div><h2>How would you like to join in?</h2><p>Choose your starting point. You can switch roles later.</p></div></div>
    <div class="role-grid">${cards}</div>
    <div class="section-heading">
      <div><p>Already have a demo profile?</p></div>
      ${button("Sign in", "open-auth", { tone: "quiet", size: "small" })}
    </div>
  `;
}
