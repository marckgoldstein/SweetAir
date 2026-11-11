import { performers } from "../data.js";
import { avatar, button, chip, icon, pageHeading, escapeHtml } from "../components.js";

export function renderTip({ artistId, amount }) {
  const artist = performers.find((performer) => performer.id === artistId) || performers[0];
  return `
    ${pageHeading("Send a little love.", "A quick tip helps local performers keep the music going.", "heart", "peach")}
    <section class="surface-card" style="max-width:560px;margin:0 auto">
      <div class="profile-line">${avatar(artist.emoji)}<div class="profile-copy"><h2>${escapeHtml(artist.name)}</h2><p>Playing at ${escapeHtml(artist.place)}</p></div>${chip("Live now", "live")}</div>
      <div class="section-heading"><div><h2>Choose an amount</h2><p>Payment is a preview only</p></div></div>
      <div class="amount-options">
        ${[2, 5, 10].map((value) => `<button class="amount-option ${amount === value ? "selected" : ""}" data-action="choose-tip-amount" data-value="${value}">$${value}</button>`).join("")}
      </div>
      <label class="field" style="margin-top:14px">Custom amount<input type="number" min="1" step="1" data-tip-custom placeholder="Enter an amount" /></label>
      <div class="notice warm" style="margin:16px 0"><p>No charge will be made. A payment processor and real transactions are explicitly out of scope for this prototype.</p></div>
      ${button(`Preview $${amount} tip`, "confirm-tip", { tone: "primary", block: true })}
      <button class="text-button" data-action="navigate" data-value="discover" style="margin-top:12px">${icon("back", 15)} Back to discovery</button>
    </section>
  `;
}
