import { demoRequests, demoSlots } from "../data.js";

const REQUESTS_KEY = "sweetair.demo.requests";
const SLOTS_KEY = "sweetair.demo.slots";

function readList(storage, key, initial) {
  const saved = storage.getItem(key);
  return saved ? JSON.parse(saved) : initial.map((item) => ({ ...item }));
}

export function createDemoBookingService(storage = window.localStorage) {
  return {
    getRequests() {
      return readList(storage, REQUESTS_KEY, demoRequests);
    },
    getSlots() {
      return readList(storage, SLOTS_KEY, demoSlots);
    },
    updateRequest(id, status) {
      const requests = this.getRequests();
      const request = requests.find((item) => item.id === id);
      if (!request) {
        throw new Error(`Booking request "${id}" was not found.`);
      }
      request.status = status;
      storage.setItem(REQUESTS_KEY, JSON.stringify(requests));
      if (status === "Approved") {
        const slots = this.getSlots();
        slots.unshift({
          id: `slot-${crypto.randomUUID()}`,
          performer: request.performer,
          time: request.slot,
          location: request.location,
          status: "Booked",
        });
        storage.setItem(SLOTS_KEY, JSON.stringify(slots));
      }
      return request;
    },
    createSlot(slot) {
      const slots = this.getSlots();
      const created = { ...slot, id: `slot-${crypto.randomUUID()}`, status: "Available" };
      slots.unshift(created);
      storage.setItem(SLOTS_KEY, JSON.stringify(slots));
      return created;
    },
    requestSlot({ location, time }) {
      const requests = this.getRequests();
      const created = {
        id: `req-${crypto.randomUUID()}`,
        performer: "The Alley Cats",
        slot: time,
        location,
        status: "Pending",
      };
      requests.unshift(created);
      storage.setItem(REQUESTS_KEY, JSON.stringify(requests));
      return created;
    },
  };
}
