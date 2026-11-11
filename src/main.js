import { roles, locations } from "./data.js";
import { button, icon, escapeHtml } from "./components.js";
import { createDemoAuthService } from "./services/auth.js";
import { createDemoObjectStorage } from "./services/object-storage.js";
import { createDemoBookingService } from "./services/bookings.js";
import { mountOpenStreetMap } from "./services/map.js";
import { renderWelcome } from "./pages/welcome.js";
import { renderAuth } from "./pages/auth.js";
import { renderArtist, renderDiscover, renderFollowing } from "./pages/discover.js";
import { renderPerformer } from "./pages/performer.js";
import { renderVenue } from "./pages/venue.js";
import { renderMunicipality } from "./pages/municipality.js";
import { renderAdmin } from "./pages/admin.js";
import { renderAccount } from "./pages/account.js";
import { renderTip } from "./pages/tip.js";

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const auth = createDemoAuthService();
const objectStorage = createDemoObjectStorage();
const bookings = createDemoBookingService();
let user = auth.getSession();
let toastTimer;
let mapCleanup = () => {};

const state = {
  role: user?.role || null,
  view: user ? "home" : "welcome",
  authMode: "signin",
  filters: { search: "", liveOnly: false, nearby: false, jazz: false },
  followed: [],
  followedLocations: [],
  checkedIn: false,
  requests: bookings.getRequests(),
  slots: bookings.getSlots(),
  publicPlaces: [],
  tipArtistId: "alley-cats",
  tipAmount: 2,
};

const roleHome = {
  audience: "discover",
  performer: "home",
  venue: "venue",
  municipality: "city",
  admin: "admin",
};

const navItems = {
  audience: [
    { id: "discover", label: "Discover", icon: "map" },
    { id: "following", label: "Following", icon: "heart" },
    { id: "account", label: "Profile", icon: "user" },
  ],
  performer: [
    { id: "home", label: "My sets", icon: "home" },
    { id: "discover", label: "Find a spot", icon: "map" },
    { id: "account", label: "Profile", icon: "user" },
  ],
  venue: [
    { id: "venue", label: "Overview", icon: "home" },
    { id: "slots", label: "Slots", icon: "calendar" },
    { id: "account", label: "Profile", icon: "user" },
  ],
  municipality: [
    { id: "city", label: "Places", icon: "map" },
    { id: "reports", label: "Reports", icon: "calendar" },
    { id: "account", label: "Profile", icon: "user" },
  ],
  admin: [
    { id: "admin", label: "Overview", icon: "home" },
    { id: "records", label: "Records", icon: "calendar" },
    { id: "account", label: "Profile", icon: "user" },
  ],
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

function getRoleName(roleId) {
  return roles.find((role) => role.id === roleId)?.shortLabel || "Choose a role";
}

function renderHeader() {
  const options = roles.map((role) => `<option value="${role.id}" ${state.role === role.id ? "selected" : ""}>${escapeHtml(role.shortLabel)}</option>`).join("");
  return `
    <header class="topbar">
      <a class="wordmark" href="#" data-action="back-welcome"><span class="brand-mark">${icon("music", 21)}</span>SweetAir</a>
      <div class="topbar-actions">
        <label class="sr-only" for="role-select">Choose your SweetAir role</label>
        <select id="role-select" class="role-picker" data-role-select aria-label="Choose your SweetAir role">
          ${state.role ? options : `<option value="" selected>Role</option>${options}`}
        </select>
        ${user ? button("Sign out", "sign-out", { tone: "quiet", size: "small" }) : button("Sign in", "open-auth", { tone: "quiet", size: "small" })}
      </div>
    </header>
  `;
}

function renderCurrentPage() {
  switch (state.view) {
    case "welcome": return renderWelcome();
    case "auth": return renderAuth({ role: state.role, mode: state.authMode });
    case "discover": return renderDiscover({ filters: state.filters, followed: state.followed });
    case "following": return renderFollowing({ followed: state.followed, followedLocations: state.followedLocations });
    case "artist": return renderArtist({ artistId: state.artistId, followed: state.followed });
    case "home": return renderPerformer({ checkedIn: state.checkedIn, slots: state.slots, userName: user?.name });
    case "venue":
    case "slots": return renderVenue({ requests: state.requests, slots: state.slots });
    case "city":
    case "reports": return renderMunicipality({ publicPlaces: state.publicPlaces });
    case "admin":
    case "records": return renderAdmin();
    case "account": return renderAccount({ user, role: state.role });
    case "tip": return renderTip({ artistId: state.tipArtistId, amount: state.tipAmount });
    default: return renderWelcome();
  }
}

function renderNav() {
  if (!state.role || state.view === "welcome" || state.view === "auth") return "";
  const items = navItems[state.role] || [];
  return `<nav class="bottom-nav" aria-label="${escapeHtml(getRoleName(state.role))} navigation"><div class="bottom-nav-inner">${items.map((item) => `
    <button class="nav-item ${state.view === item.id || (state.view === "home" && item.id === "home") ? "active" : ""}" data-action="navigate" data-value="${item.id}">
      ${icon(item.icon, 20)}<span>${escapeHtml(item.label)}</span>
    </button>`).join("")}</div></nav>`;
}

function render() {
  const cleanupMap = mapCleanup;
  mapCleanup = () => {};
  cleanupMap();
  app.innerHTML = `<div class="app-shell">${renderHeader()}<main class="main-content">${renderCurrentPage()}</main></div>${renderNav()}`;
  if (state.view === "discover") {
    const mapContainer = app.querySelector(".map-wrap");
    if (mapContainer) mapCleanup = mountOpenStreetMap(mapContainer);
  }
}

function setRole(role) {
  if (!roleHome[role]) return;
  state.role = role;
  if (user) {
    const { photoUrl, ...sessionUser } = user;
    user = { ...sessionUser, role, ...(photoUrl ? { photoUrl } : {}) };
    localStorage.setItem("sweetair.demo.session", JSON.stringify({ ...sessionUser, role }));
  }
  state.view = roleHome[role];
  render();
}

function navigate(view) {
  if (view === "home" && state.role !== "performer") {
    state.view = roleHome[state.role] || "welcome";
  } else {
    state.view = view;
  }
  render();
}

app.addEventListener("click", async (event) => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;
  if (actionElement instanceof HTMLAnchorElement) event.preventDefault();
  const { action, value = "" } = actionElement.dataset;

  switch (action) {
    case "choose-role":
      state.role = value;
      state.authMode = "signup";
      state.view = "auth";
      render();
      showToast(`${getRoleName(value)} selected.`);
      break;
    case "guest-explore":
      state.role = "audience";
      navigate("discover");
      break;
    case "open-auth":
      state.authMode = "signin";
      navigate("auth");
      break;
    case "toggle-auth":
      state.authMode = state.authMode === "signup" ? "signin" : "signup";
      render();
      break;
    case "back-welcome":
      state.view = "welcome";
      render();
      break;
    case "navigate":
      navigate(value);
      break;
    case "toggle-follow":
      state.followed = state.followed.includes(value) ? state.followed.filter((id) => id !== value) : [...state.followed, value];
      render();
      showToast(state.followed.includes(value) ? "Added to your listening list." : "Removed from your listening list.");
      break;
    case "toggle-location-follow":
      state.followedLocations = state.followedLocations.includes(value) ? state.followedLocations.filter((id) => id !== value) : [...state.followedLocations, value];
      render();
      showToast("Place follows are saved for this demo session.");
      break;
    case "toggle-live-filter":
      state.filters.liveOnly = !state.filters.liveOnly;
      render();
      break;
    case "toggle-nearby":
      state.filters.nearby = !state.filters.nearby;
      render();
      showToast("Nearby uses demo map pins; GPS is not requested.");
      break;
    case "toggle-jazz":
      state.filters.jazz = !state.filters.jazz;
      render();
      break;
    case "tip-artist":
      state.tipArtistId = value;
      state.tipAmount = 2;
      navigate("tip");
      break;
    case "choose-tip-amount":
      state.tipAmount = Number(value);
      render();
      break;
    case "confirm-tip": {
      const customAmount = Number(app.querySelector("[data-tip-custom]")?.value);
      if (Number.isFinite(customAmount) && customAmount > 0) state.tipAmount = customAmount;
      showToast(`Tip preview for $${state.tipAmount}. No payment was made.`);
      state.view = "discover";
      render();
      break;
    }
    case "open-performer":
      state.artistId = value;
      navigate("artist");
      break;
    case "share-profile":
      showToast("Profile sharing link is a demo placeholder.");
      break;
    case "view-location": {
      const location = locations.find((place) => place.id === value);
      if (location) showToast(`${location.name} · ${location.status}`);
      break;
    }
    case "book-slot": {
      const location = locations.find((place) => place.id === value);
      if (!location) {
        showToast("That demo place could not be found.");
        break;
      }
      if (location.status === "Permit required") {
        showToast("This demo location requires a permit; permit workflows are not connected.");
        break;
      }
      bookings.requestSlot({ location: location.name, time: "Saturday · 5:30–6:30 PM" });
      state.requests = bookings.getRequests();
      showToast("Demo booking request sent to the venue.");
      render();
      break;
    }
    case "booking-decision": {
      const [requestId, decision] = value.split("|");
      try {
        bookings.updateRequest(requestId, decision);
        state.requests = bookings.getRequests();
        state.slots = bookings.getSlots();
        showToast(`Request ${decision.toLowerCase()} in this demo.`);
      } catch (error) {
        showToast(error.message);
      }
      render();
      break;
    }
    case "demo-checkin":
      state.checkedIn = !state.checkedIn;
      render();
      showToast(state.checkedIn ? "Demo check-in active. No location was verified." : "Demo check-in ended.");
      break;
    case "edit-profile":
      showToast("Profile editing is a future backend-connected screen.");
      break;
    case "save-slot":
      break;
    case "save-location":
      break;
    case "admin-import":
      showToast("CSV import is a placeholder; no file was uploaded.");
      break;
    case "sign-out":
      await auth.signOut();
      user = null;
      state.role = null;
      state.view = "welcome";
      render();
      showToast("You’ve signed out of the demo.");
      break;
    default:
      break;
  }
});

app.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  try {
    if (form.dataset.form === "auth") {
      user = form.dataset.mode === "signup" ? await auth.signUp(data) : await auth.signIn(data);
      state.role = user.role;
      state.view = roleHome[state.role];
      render();
      showToast(`Welcome, ${user.name}.`);
    } else if (form.dataset.form === "create-slot") {
      const date = new Date(`${data.date}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
      bookings.createSlot({
        performer: "Open spot",
        time: `${date} · ${data.start}–${data.end}${data.pay ? ` · $${data.pay}/hr` : ""}`,
        location: "Leftie's Brewery",
      });
      state.slots = bookings.getSlots();
      render();
      showToast("Open slot added to the demo schedule.");
    } else if (form.dataset.form === "create-location") {
      state.publicPlaces.unshift({
        id: crypto.randomUUID(),
        name: data.name,
        address: data.address,
        type: "Public place",
        status: data.status,
        pay: data.pay ? `$${data.pay} / hour` : "Rate to be set",
        emoji: "📍",
      });
      render();
      showToast("Public place added to this browser’s demo list.");
    }
  } catch (error) {
    showToast(`Could not complete the action: ${error.message}`);
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches("[data-role-select]") && event.target.value) {
    setRole(event.target.value);
    showToast(`Switched to ${getRoleName(event.target.value)} view.`);
  }
  if (event.target.matches("[data-admin-csv]") && event.target.files?.[0]) {
    showToast(`Selected ${event.target.files[0].name}; it was not uploaded.`);
  }
  if (event.target.matches("[data-profile-photo]") && event.target.files?.[0]) {
    objectStorage.upload(event.target.files[0], { folder: "profiles" }).then(async (object) => {
      const photoUrl = await objectStorage.getPublicUrl(object.key);
      user = { ...(user || {}), photoUrl };
      render();
      showToast("Profile image preview saved in memory.");
    }).catch((error) => {
      showToast(`Could not preview image: ${error.message}`);
    });
  }
});

app.addEventListener("input", (event) => {
  if (event.target.matches("[data-search]")) {
    state.filters.search = event.target.value;
    const query = state.filters.search.trim().toLowerCase();
    app.querySelectorAll(".performer-card[data-search-text]").forEach((card) => {
      const matchesText = card.dataset.searchText.includes(query);
      const matchesLive = !state.filters.liveOnly || card.dataset.live === "true";
      const matchesJazz = !state.filters.jazz || card.dataset.jazz === "true";
      card.hidden = !(matchesText && matchesLive && matchesJazz);
    });
    const performerCards = [...app.querySelectorAll(".performer-card[data-search-text]")];
    const locationCards = [...app.querySelectorAll(".location-card[data-search-text]")];
    locationCards.forEach((card) => {
      const matchesText = card.dataset.searchText.includes(query);
      const matchesJazz = !state.filters.jazz || card.dataset.jazz === "true";
      card.hidden = !(matchesText && matchesJazz);
    });
    const emptyPerformers = app.querySelector("[data-empty-performers]");
    const emptyLocations = app.querySelector("[data-empty-locations]");
    if (emptyPerformers) emptyPerformers.hidden = performerCards.some((card) => !card.hidden);
    if (emptyLocations) emptyLocations.hidden = locationCards.some((card) => !card.hidden);
  }
});

render();
