import { roles } from "../data.js";
import { button, icon, escapeHtml } from "../components.js";

export function renderAuth({ role, mode }) {
  const selectedRole = roles.find((item) => item.id === role) || roles[0];
  const options = roles.map((item) => `<option value="${item.id}" ${item.id === selectedRole.id ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("");

  return `
    <div class="auth-layout">
      <section class="surface-card">
        <div class="auth-mark">${icon("music", 28)}</div>
        <h1>${mode === "signup" ? "Join the neighborhood." : "Welcome back."}</h1>
        <p class="muted-copy">${mode === "signup" ? "Create a demo profile and choose how you'll use SweetAir." : "Sign in to pick up where the music left off."}</p>
        <div class="notice warm" style="margin:18px 0"><p>This is a local demo sign-in. It does not verify identities or send account data to a server.</p></div>
        <form class="form-grid" data-form="auth" data-mode="${mode}">
          ${mode === "signup" ? '<label class="field">Your name<input name="name" autocomplete="name" required placeholder="e.g. Alex Rivera" /></label>' : ""}
          <label class="field">Email address<input name="email" type="email" autocomplete="email" required placeholder="you@example.com" /></label>
          <label class="field">I’m joining as
            <select name="role">${options}</select>
          </label>
          <p class="field-hint">The demo stores only a role and display name in this browser.</p>
          ${button(mode === "signup" ? "Create demo profile" : "Continue", "submit-auth", { tone: "primary", block: true, type: "submit" })}
        </form>
        <div class="section-heading">
          <button class="text-button" data-action="toggle-auth">${mode === "signup" ? "I already have a profile" : "Create a demo profile"}</button>
          <button class="text-button" data-action="back-welcome">Back</button>
        </div>
      </section>
    </div>
  `;
}
