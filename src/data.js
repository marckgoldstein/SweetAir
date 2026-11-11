export const performers = [
  {
    id: "alley-cats",
    name: "The Alley Cats",
    genre: ["Jazz", "Ensemble", "Acoustic"],
    place: "Washington Square Park",
    time: "Playing now · until 6:00 PM",
    live: true,
    emoji: "🎷",
    tags: ["BongoJohn", "Jazz", "Latin"],
  },
  {
    id: "marigold",
    name: "Marigold Strings",
    genre: ["Folk", "Acoustic"],
    place: "Rittenhouse Square",
    time: "Today · 6:30–7:30 PM",
    live: false,
    emoji: "🎻",
    tags: ["Folk", "Strings"],
  },
  {
    id: "loosey-goosey",
    name: "Loosey Goosey",
    genre: ["Classical", "Viola", "Bach"],
    place: "Clark Park",
    time: "Tomorrow · 10:00 AM–1:00 PM",
    live: false,
    emoji: "🎼",
    tags: ["Classical", "Viola"],
  },
];

export const locations = [
  {
    id: "washington-square",
    name: "Washington Square Park",
    address: "6th & Walnut St",
    type: "Public place",
    status: "Open approval",
    pay: "$15 / hour",
    lat: 39.9471,
    lng: -75.1515,
    emoji: "🌳",
    tags: ["Jazz", "Acoustic"],
  },
  {
    id: "rittenhouse",
    name: "Rittenhouse Square",
    address: "18th & Walnut St",
    type: "Public place",
    status: "Permit required",
    pay: "Permit needed",
    lat: 39.9496,
    lng: -75.1714,
    emoji: "🌼",
    tags: ["Folk", "Acoustic"],
  },
  {
    id: "lefties",
    name: "Leftie's Brewery",
    address: "South Street",
    type: "Private venue",
    status: "Request based",
    pay: "$20 / hour",
    lat: 39.9413,
    lng: -75.1571,
    emoji: "🍻",
    tags: ["Jazz", "Ensemble"],
  },
];

export const roles = [
  { id: "audience", label: "Music lover", shortLabel: "Audience", description: "Find a performance, follow artists, and send a tip.", icon: "sparkles", color: "yellow" },
  { id: "performer", label: "Performer", shortLabel: "Performer", description: "Find a spot, book a slot, and grow your audience.", icon: "music", color: "peach" },
  { id: "venue", label: "Venue manager", shortLabel: "Venue", description: "Open up your space and review booking requests.", icon: "venue", color: "green" },
  { id: "municipality", label: "City partner", shortLabel: "City partner", description: "Set up public places and local performance rules.", icon: "city", color: "blue" },
  { id: "admin", label: "Platform admin", shortLabel: "Admin", description: "Review demo records and platform activity.", icon: "settings", color: "yellow" },
];

export const demoRequests = [
  { id: "req-1", performer: "Marigold Strings", slot: "Sunday · 6:00–7:00 PM", location: "Leftie's Brewery", status: "Pending" },
];

export const demoSlots = [
  { id: "slot-1", performer: "The Alley Cats", time: "Saturday · 5:30–6:30 PM", location: "Leftie's Brewery", status: "Booked" },
  { id: "slot-2", performer: "Open spot", time: "Sunday · 2:00–4:00 PM", location: "Leftie's Brewery", status: "Available" },
];
