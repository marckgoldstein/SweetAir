import { locations, performers } from "../data.js";
import { avatar, chip, icon, pageHeading, sectionHeading, escapeHtml } from "../components.js";

export function renderDiscover({ filters, followed }) {
  const search = filters.search.trim().toLowerCase();
  const visiblePerformers = performers.filter((performer) => {
    const matchesText = !search || [performer.name, performer.place, ...performer.tags].some((value) => value.toLowerCase().includes(search));
    const matchesLive = !filters.liveOnly || performer.live;
    const matchesJazz = !filters.jazz || performer.tags.some((tag) => tag.toLowerCase() === "jazz");
    return matchesText && matchesLive && matchesJazz;
  });
  const visibleLocations = locations.filter((location) => {
    const matchesText = !search || [location.name, location.address, ...location.tags].some((value) => value.toLowerCase().includes(search));
    const matchesJazz = !filters.jazz || location.tags.some((tag) => tag.toLowerCase() === "jazz");
    return matchesText && matchesJazz;
  });
  const performersHtml = visiblePerformers.map((performer) => {
    const isFollowed = followed.includes(performer.id);
    return `
      <article class="performer-card" data-search-text="${escapeHtml([performer.name, performer.place, ...performer.tags].join(" ").toLowerCase())}" data-live="${performer.live}" data-jazz="${performer.tags.some((tag) => tag.toLowerCase() === "jazz")}">
        <div class="card-heading">
          <div class="profile-line">${avatar(performer.emoji)}<div class="profile-copy">
            <h3>${escapeHtml(performer.name)}</h3>
            <p>${escapeHtml(performer.place)}</p>
          </div></div>
          ${performer.live ? '<span class="chip live"><span class="status-dot"></span>Live</span>' : ""}
        </div>
        <div class="chip-row">${performer.tags.map((tag) => chip(tag)).join("")}</div>
        <div class="detail-row">${icon("clock", 16)}${escapeHtml(performer.time)}</div>
        <div class="form-actions">
          <button class="btn btn-small ${isFollowed ? "btn-quiet" : "btn-yellow"}" data-action="toggle-follow" data-value="${performer.id}">${isFollowed ? "Following" : "Follow"}</button>
          ${performer.live ? `<button class="btn btn-small btn-primary" data-action="tip-artist" data-value="${performer.id}">Send a tip</button>` : ""}
          <button class="btn btn-small btn-quiet" data-action="open-performer" data-value="${performer.id}">View artist</button>
        </div>
      </article>
    `;
  }).join("");

  const locationHtml = visibleLocations.map((location) => `
    <article class="location-card" data-search-text="${escapeHtml([location.name, location.address, ...location.tags].join(" ").toLowerCase())}" data-jazz="${location.tags.some((tag) => tag.toLowerCase() === "jazz")}">
      <div class="card-heading">
        <div class="location-title"><div class="venue-art">${escapeHtml(location.emoji)}</div><div class="location-copy">
          <h3>${escapeHtml(location.name)}</h3>
          <p>${escapeHtml(location.address)} · ${escapeHtml(location.type)}</p>
        </div></div>
        ${chip(location.status, location.status === "Open approval" ? "success" : "")}
      </div>
      <div class="detail-row">${icon("wallet", 16)}${escapeHtml(location.pay)}</div>
      <div class="chip-row">${location.tags.map((tag) => chip(tag)).join("")}</div>
      <div class="form-actions">
        <button class="btn btn-small btn-quiet" data-action="toggle-location-follow" data-value="${location.id}">Follow place</button>
        <button class="btn btn-small btn-primary" data-action="book-slot" data-value="${location.id}">Request a slot</button>
      </div>
    </article>
  `).join("");

  return `
    ${pageHeading("Find your next favorite.", "Live music, open spots, and welcoming places around Philadelphia.", "map", "blue")}
    <div class="map-controls">
      <label class="field" style="flex:1;min-width:190px"><span class="sr-only">Search artists and places</span><input class="search-input" data-search placeholder="Search artists, places, or genres" value="${escapeHtml(filters.search)}" /></label>
      <button class="chip ${filters.liveOnly ? "selected" : ""}" data-action="toggle-live-filter">Live now</button>
      <button class="chip ${filters.nearby ? "selected" : ""}" data-action="toggle-nearby">Near me</button>
      <button class="chip ${filters.jazz ? "selected" : ""}" data-action="toggle-jazz">Jazz</button>
    </div>
    <section class="surface-card">
      <div class="card-heading"><div><h2>Music around you</h2><p class="muted-copy">A neighborhood view of live artists and places to play.</p></div><span class="chip">Philadelphia</span></div>
      <div class="map-wrap" style="margin-top:16px">
        <div class="map-fallback" aria-hidden="true">
          <div class="fallback-road"></div><div class="fallback-road second"></div><div class="fallback-park"></div><div class="fallback-label">Washington Square</div>
          <div class="fallback-pin one"><span>🎷</span></div><div class="fallback-pin two"><span>🎻</span></div><div class="fallback-pin three"><span>🍻</span></div>
        </div>
        <div class="map-canvas" role="application" aria-label="Map of nearby performances and venues"></div>
        <div class="map-status" aria-live="polite">Map tiles load from OpenStreetMap.</div>
      </div>
      <div class="chip-row" style="margin-top:13px">${chip("● Live performance", "live")}${chip("Public place", "success")}${chip("Private venue", "selected")}</div>
    </section>
    ${sectionHeading("Performers", "Find someone to follow or tip")}
    <div class="performer-list">${performersHtml}<div class="empty-state" data-empty-performers ${visiblePerformers.length ? "hidden" : ""}>No performers match those filters yet.</div></div>
    ${sectionHeading("Places to play", "Public squares and private venues")}
    <div class="location-list">${locationHtml}<div class="empty-state" data-empty-locations ${visibleLocations.length ? "hidden" : ""}>No places match those filters yet.</div></div>
  `;
}

export function renderArtist({ artistId, followed }) {
  const performer = performers.find((item) => item.id === artistId) || performers[0];
  const isFollowed = followed.includes(performer.id);
  return `
    ${pageHeading(performer.name, `A local ${performer.genre.join(" · ").toLowerCase()} act.`, "music", "peach")}
    <section class="surface-card">
      <div class="profile-line">${avatar(performer.emoji)}<div class="profile-copy"><h2>${escapeHtml(performer.name)}</h2><p>Philadelphia · ${performer.live ? "Playing now" : "Next set coming up"}</p></div>${performer.live ? chip("Live now", "live") : ""}</div>
      <p class="muted-copy" style="margin:18px 0">A neighborhood favorite bringing a little rhythm to the city. Follow along to catch upcoming performances.</p>
      <div class="chip-row">${performer.tags.map((tag) => chip(tag)).join("")}</div>
      <div class="detail-row">${icon("pin", 16)}${escapeHtml(performer.place)}</div>
      <div class="detail-row">${icon("clock", 16)}${escapeHtml(performer.time)}</div>
      <div class="form-actions"><button class="btn btn-primary" data-action="toggle-follow" data-value="${performer.id}">${isFollowed ? "Following" : "Follow artist"}</button>${performer.live ? `<button class="btn btn-peach" data-action="tip-artist" data-value="${performer.id}">Send a tip</button>` : ""}<button class="btn btn-quiet" data-action="share-profile">Share profile</button></div>
    </section>
    ${sectionHeading("Upcoming performances")}
    <article class="slot-card"><div class="card-heading"><div><h3>${escapeHtml(performer.place)}</h3><p class="muted-copy">${escapeHtml(performer.time)}</p></div>${performer.live ? chip("Live", "live") : chip("Upcoming", "success")}</div></article>
    <button class="text-button" data-action="navigate" data-value="discover" style="margin-top:16px">${icon("back", 15)} Back to discovery</button>
  `;
}

export function renderFollowing({ followed, followedLocations }) {
  const people = performers.filter((performer) => followed.includes(performer.id));
  const places = locations.filter((location) => followedLocations.includes(location.id));
  return `
    ${pageHeading("Your little listening list.", "Artists and places you’re keeping an ear out for.", "heart", "peach")}
    ${sectionHeading("Artists you follow")}
    <div class="performer-list">${people.length ? people.map((performer) => `
      <article class="performer-card"><div class="profile-line">${avatar(performer.emoji)}<div class="profile-copy"><h3>${escapeHtml(performer.name)}</h3><p>${escapeHtml(performer.place)} · ${escapeHtml(performer.time)}</p></div></div><div class="form-actions" style="margin-top:14px"><button class="btn btn-small btn-quiet" data-action="open-performer" data-value="${performer.id}">View artist</button><button class="text-button" data-action="toggle-follow" data-value="${performer.id}">Unfollow</button></div></article>
    `).join("") : '<div class="empty-state">No artists followed yet. Discover a performer and tap Follow.</div>'}</div>
    ${sectionHeading("Places you follow")}
    <div class="location-list">${places.length ? places.map((location) => `<article class="location-card"><div class="location-title"><div class="venue-art">${escapeHtml(location.emoji)}</div><div class="location-copy"><h3>${escapeHtml(location.name)}</h3><p>${escapeHtml(location.address)}</p></div></div></article>`).join("") : '<div class="empty-state">Follow a favorite park or venue to keep its schedule close.</div>'}</div>
  `;
}
