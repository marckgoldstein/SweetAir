import { locations } from "../data.js";
import { escapeHtml } from "../components.js";

export function mountOpenStreetMap(container) {
  const fallback = container.querySelector(".map-fallback");
  const status = container.querySelector(".map-status");
  const mapElement = container.querySelector(".map-canvas");

  if (!window.L) {
    mapElement.hidden = true;
    fallback.hidden = false;
    status.textContent = "Interactive map is unavailable. Use the location list below.";
    return () => {};
  }

  const map = window.L.map(mapElement, { scrollWheelZoom: false, zoomControl: false }).setView([39.9471, -75.16], 14);
  window.L.control.zoom({ position: "topright" }).addTo(map);
  const tileLayer = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
  }).addTo(map);
  tileLayer.on("load", () => {
    fallback.hidden = true;
    status.hidden = true;
  });
  tileLayer.on("tileerror", () => {
    status.hidden = false;
    status.textContent = "Some map tiles could not load. The location list is still available.";
  });

  locations.forEach((location, index) => {
    const markerIcon = window.L.divIcon({
      className: "",
      html: `<div class="map-marker ${index === 0 ? "live" : index === 2 ? "venue" : ""}"><span>${escapeHtml(location.emoji)}</span></div>`,
      iconSize: [43, 43],
      iconAnchor: [21, 40],
    });
    const marker = window.L.marker([location.lat, location.lng], { icon: markerIcon }).addTo(map);
    marker.bindPopup(`<strong>${escapeHtml(location.name)}</strong><br>${escapeHtml(location.type)} · ${escapeHtml(location.pay)}<br><button class="text-button" data-action="view-location" data-value="${escapeHtml(location.id)}">View place</button>`);
  });
  window.setTimeout(() => map.invalidateSize(), 0);

  return () => map.remove();
}
