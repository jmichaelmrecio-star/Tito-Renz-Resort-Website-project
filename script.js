// --- Password Toggle Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = button.getAttribute("data-target");
      const input = document.getElementById(targetId);

      if (input) {
        if (input.type === "password") {
          input.type = "text";
          button.textContent = "👁️‍🗨️";
        } else {
          input.type = "password";
          button.textContent = "👁️";
        }
      }
    });
  });
});

// --- Global Service Data (UPDATED with Villa/Charm/Venue structure) ---
const resortServices = [
  // === VILLA ROOMS ===
  {
    id: "villa_room_1",
    name: "Villa #1",
    type: "villa",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable villa room perfect for small families or groups. Good for 4 pax.",
    image: "images/Villa_room.jpg",
    gallery: [
      "images/Villa_room.jpg",
      "images/Villa_room_bathroom.jpg",
      "images/Villa_room_sala.jpg",
      "images/Villa_room_sala_pic_2.jpg",
      "images/Villa_room_other_angle.jpg",
      "images/Villas.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 3000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Living area with Sofa bed",
      "Mini Refrigerator",
      "Flat screen television",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "villa_room_2",
    name: "Villa #2",
    type: "villa",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable villa room perfect for small families or groups. Good for 4 pax.",
    image: "images/Villa_room.jpg",
    gallery: [
      "images/Villa_room.jpg",
      "images/Villa_room_bathroom.jpg",
      "images/Villa_room_sala.jpg",
      "images/Villa_room_sala_pic_2.jpg",
      "images/Villa_room_other_angle.jpg",
      "images/Villas.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 3000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Living area with Sofa bed",
      "Mini Refrigerator",
      "Flat screen television",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "villa_room_3",
    name: "Villa #3",
    type: "villa",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable villa room perfect for small families or groups. Good for 4 pax.",
    image: "images/Villa_room.jpg",
    gallery: [
      "images/Villa_room.jpg",
      "images/Villa_room_bathroom.jpg",
      "images/Villa_room_sala.jpg",
      "images/Villa_room_sala_pic_2.jpg",
      "images/Villa_room_other_angle.jpg",
      "images/Villas.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 3000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Living area with Sofa bed",
      "Mini Refrigerator",
      "Flat screen television",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "villa_room_4",
    name: "Villa #4",
    type: "villa",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable villa room perfect for small families or groups. Good for 4 pax.",
    image: "images/Villa_room.jpg",
    gallery: [
      "images/Villa_room.jpg",
      "images/Villa_room_bathroom.jpg",
      "images/Villa_room_sala.jpg",
      "images/Villa_room_sala_pic_2.jpg",
      "images/Villa_room_other_angle.jpg",
      "images/Villas.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 4000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 6000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Living area with Sofa bed",
      "Mini Refrigerator",
      "Flat screen television",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },

  // === CHARM ROOMS ===
  {
    id: "charm_room_1",
    name: "Charm #1",
    type: "charm",
    category: "accommodation",
    max_guests: 8,
    description:
      "Spacious and charming room perfect for larger groups or families. Good for 8 pax.",
    image: "images/Charm_room_1.jpg",
    gallery: [
      "images/Charm_room_1.jpg",
      "images/Charm_room_bathroom.jpg",
      "images/Charm_room_newroom.jpg",
      "images/Charm_room_newroom_other_angle.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 3000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 6000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Free access to swimming pool (if available)",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "charm_room_2",
    name: "Charm #2",
    type: "charm",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable charm room perfect for small families or groups. Good for 4 pax.",
    image: "images/Charm_room_2.jpg",
    gallery: [
      "images/Charm_room_2.jpg",
      "images/Charm_room_bathroom.jpg",
      "images/Charm_room_newroom.jpg",
      "images/Charm_room_newroom_other_angle.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 2000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Free access to swimming pool (if available)",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "charm_room_3",
    name: "Charm #3",
    type: "charm",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable charm room perfect for small families or groups. Good for 4 pax.",
    image: "images/Charm_room_3.jpg",
    gallery: [
      "images/Charm_room_3.jpg",
      "images/Charm_room_bathroom.jpg",
      "images/Charm_room_newroom.jpg",
      "images/Charm_room_newroom_other_angle.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 2000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Free access to swimming pool (if available)",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "charm_room_4",
    name: "Charm #4",
    type: "charm",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable charm room perfect for small families or groups. Good for 4 pax.",
    image: "images/Charm_room_4.jpg",
    gallery: [
      "images/Charm_room_4.jpg",
      "images/Charm_room_bathroom.jpg",
      "images/Charm_room_newroom.jpg",
      "images/Charm_room_newroom_other_angle.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 2000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Free access to swimming pool (if available)",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },
  {
    id: "charm_room_5",
    name: "Charm #5",
    type: "charm",
    category: "accommodation",
    max_guests: 4,
    description:
      "Comfortable charm room perfect for small families or groups. Good for 4 pax.",
    image: "images/Charm_room_5.jpg",
    gallery: [
      "images/Charm_room_5.jpg",
      "images/Charm_room_bathroom.jpg",
      "images/Charm_room_newroom.jpg",
      "images/Charm_room_newroom_other_angle.jpg",
    ],
    durations: [
      {
        id: "duration_12h",
        label: "12 Hours",
        hours: 12,
        price: 2000.0,
      },
      {
        id: "duration_22h",
        label: "22 Hours",
        hours: 22,
        price: 4000.0,
      },
    ],
    defaultDuration: "duration_12h",
    inclusions: [
      "Hot and cold shower",
      "Fully air-conditioned",
      "Free access to swimming pool (if available)",
      "Instagrammable view",
      "Griller",
      "Free use of parking space",
      "Kiddie Pool",
      "CCTV Cameras",
      "No corkage fee",
    ],
    notes:
      "Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.",
    extensionRate: { day: 200, night: 250 },
  },

  // === VENUES ===
  {
    id: "2nd_floor_resto_hall",
    name: "2nd Floor Resto Hall",
    type: "venue",
    category: "event_space",
    max_guests: 80,
    description:
      "Fully air-conditioned event hall perfect for celebrations, meetings, and gatherings. Maximum capacity 80 pax.",
    image: "images/2nd_Floor_Resto_Hall.jpg",
    gallery: [
      "images/2nd_Floor_Resto_Hall.jpg",
      "images/2nd_Floor_Resto_Hall_below_it.jpg",
      "images/2nd_Floor_Resto_Hall_below_it_2.jpg",
    ],
    durations: [
      {
        id: "duration_3h",
        label: "3 Hours",
        hours: 3,
        price: 10000.0,
      },
      {
        id: "duration_5h",
        label: "5 Hours",
        hours: 5,
        price: 12000.0,
      },
    ],
    defaultDuration: "duration_3h",
    inclusions: [
      "Fully air-conditioned venue",
      "Tables and chairs",
      "Sound system",
      "Free use of parking space",
    ],
    extensionRate: null,
  },
  {
    id: "cloverleaf_hall",
    name: "Cloverleaf Hall",
    type: "venue",
    category: "event_space",
    max_guests: 150,
    description:
      "Spacious air-conditioned hall ideal for large events, weddings, and corporate functions. Maximum capacity 150 pax (depending on event setup).",
    image: "images/Cloverleaf_Hall.jpg",
    gallery: [
      "images/Cloverleaf_Hall.jpg",
      "images/Cloverleaf_Hall_ceiling.jpg",
      "images/Cloverleaf_Hall_ceiling_2.jpg",
    ],
    durations: [
      {
        id: "duration_3h",
        label: "3 Hours",
        hours: 3,
        price: 12000.0,
      },
      {
        id: "duration_5h",
        label: "5 Hours",
        hours: 5,
        price: 18000.0,
      },
    ],
    defaultDuration: "duration_3h",
    inclusions: [
      "Fully air-conditioned venue",
      "Tables and chairs",
      "Sound system",
      "Free use of parking space",
    ],
    extensionRate: null,
  },
  {
    id: "private_pool_area",
    name: "Private Pool Area",
    type: "venue",
    category: "water_facility",
    max_guests: 70,
    description:
      "Exclusive pool area rental perfect for private parties, team building, and celebrations.",
    image: "images/Pool_Area.jpg",
    gallery: [
      "images/Pool_Area.jpg",
      "images/Pool_Area_other_View.jpg",
      "images/Pool_Area_other_View_2.jpg",
      "images/Pool_Area_other_View_3.jpg",
    ],
    timeSlots: [
      {
        id: "slot_day_30_40",
        label: "Day (7am - 5pm) - 30 to 40 pax",
        timeRange: "day",
        guestRange: { min: 30, max: 40 },
        price: 12000.0,
      },
      {
        id: "slot_day_50_70",
        label: "Day (7am - 5pm) - 50 to 70 pax",
        timeRange: "day",
        guestRange: { min: 50, max: 70 },
        price: 15000.0,
      },
      {
        id: "slot_night_30_40",
        label: "Night (7pm - 5am) - 30 to 40 pax",
        timeRange: "night",
        guestRange: { min: 30, max: 40 },
        price: 15000.0,
      },
      {
        id: "slot_night_50_70",
        label: "Night (7pm - 5am) - 50 to 70 pax",
        timeRange: "night",
        guestRange: { min: 50, max: 70 },
        price: 18000.0,
      },
    ],
    defaultDuration: null,
    inclusions: [
      "Exclusive pool access",
      "Pool pavilion",
      "Tables and chairs",
      "Free use of parking space",
    ],
    extensionRate: null,
  },
];
// --- END Global Service Data ---

// --- Amenities Page Logic ---
function getAmenityType(service) {
  // Use the explicit type property instead of parsing IDs
  if (service.type === "villa") return "villa";
  if (service.type === "charm") return "charm";
  if (service.type === "venue") return "venue";
  return service.type || "other";
}

function renderAmenitiesGrid() {
  const grid = document.getElementById("amenities-grid");
  if (!grid) return;

  // Get filter values
  const typeFilter =
    document.getElementById("amenity-type-filter")?.value || "all";
  const capFilter = parseInt(
    document.getElementById("amenity-capacity-filter")?.value || "0",
    10
  );

  // Debug: log the filter values to check what's being selected
  console.log("Type Filter:", typeFilter, "Cap Filter:", capFilter);

  // Get active services from API cache or fallback
  let filtered = getActiveServices();

  if (typeFilter !== "all") {
    filtered = filtered.filter((s) => {
      const type = getAmenityType(s);
      console.log(
        `Service: ${s.name}, Type: ${type}, Filter: ${typeFilter}, Match: ${
          type === typeFilter
        }`
      );
      return type === typeFilter;
    });
  }
  if (capFilter > 0) {
    // Special case: "6+ guests" uses >= instead of <=
    if (capFilter === 6) {
      filtered = filtered.filter((s) => s.max_guests >= capFilter);
    } else {
      filtered = filtered.filter((s) => s.max_guests <= capFilter);
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No amenities match your filter.</p>";
    return;
  }

  grid.innerHTML = filtered
    .map((service) => {
      const startingPrice = getStartingPrice(service);
      return `
        <div class="amenity-card">
            <img src="${service.image}" alt="${service.name}">
            <div class="card-body">
                <h3>${service.name}</h3>
                <div class="amenity-desc">${service.description}</div>
                <div class="amenity-meta">Starts at ₱${startingPrice.toFixed(
                  2
                )} &bull; Max Guests: ${service.max_guests}</div>
                <div class="amenity-actions">
                    <button class="button-secondary" onclick="openAmenityGallery('${
                      service.id
                    }')">More Photos</button>
                    <a class="button-primary" href="services-list.html?serviceId=${
                      service.id
                    }">Book Now</a>
                </div>
            </div>
        </div>
    `;
    })
    .join("");
}

function openAmenityGallery(serviceId) {
  const services = getActiveServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service) return;

  // Try to find existing modal elements. If they're not present on the page
  // (e.g., index.html), create the modal dynamically so the 'More Photos'
  // button still works.
  let modal = document.getElementById("amenity-gallery-modal");
  let gallery = document.getElementById("gallery-images");
  let caption = document.getElementById("gallery-caption");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "amenity-gallery-modal";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.position = "fixed";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.7)";
    modal.style.zIndex = "2000";
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="closeAmenityGallery()">&times;</span>
                <div id="gallery-images"></div>
                <div id="gallery-caption" style="margin-top:1rem;font-weight:bold;color:#222;"></div>
            </div>
        `;
    document.body.appendChild(modal);
    gallery = document.getElementById("gallery-images");
    caption = document.getElementById("gallery-caption");
  }

  // For demo, use the main image only. If you have a gallery array, use it here.
  const images =
    service.gallery &&
    Array.isArray(service.gallery) &&
    service.gallery.length > 0
      ? service.gallery
      : [service.image];

  // Show images larger for better examination (no inline styles, use CSS)
  gallery.innerHTML = images
    .map((img) => `<img src="${img}" alt="${service.name}">`)
    .join("");
  caption.textContent = service.name + " - " + service.description;
  modal.style.display = "flex";

  // Add click handler for closing modal when clicking outside the content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeAmenityGallery();
    }
  });
}

function closeAmenityGallery() {
  const modal = document.getElementById("amenity-gallery-modal");
  if (modal) modal.style.display = "none";
}

// Wire up amenities page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("amenities-grid")) {
    renderAmenitiesGrid();
    document
      .getElementById("amenity-type-filter")
      .addEventListener("change", renderAmenitiesGrid);
    document
      .getElementById("amenity-capacity-filter")
      .addEventListener("change", renderAmenitiesGrid);
    document
      .getElementById("close-amenity-gallery")
      .addEventListener("click", closeAmenityGallery);
    document
      .getElementById("amenity-gallery-modal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeAmenityGallery();
      });
  }
});
// --- END Amenities Page Logic ---

// --- Global Menu Data (DFD 13.0) ---
const resortMenu = [
  {
    name: "Adobo Flakes",
    price: 350.0,
    description:
      "Crispy pork flakes seasoned with traditional adobo sauce, served with garlic rice and fried egg.",
    image: "images/adobo.jpg",
  },
  {
    name: "Bulalo Soup",
    price: 480.0,
    description:
      "Rich and hearty beef marrow stew slow-cooked with corn, cabbage, and beans. A Filipino classic.",
    image: "images/bulalo.jpg",
  },
  {
    name: "Classic Burger",
    price: 280.0,
    description:
      "A juicy 1/3 lb beef patty with lettuce, tomato, and our special sauce on a toasted bun.",
    image: "images/burger.jpg",
  },
  // ... continue this pattern for all dishes
];
// --- END Menu Data ---

// --- Global Data Store Simulation (Replaces Database/API Fallback) ---
let reservations =
  JSON.parse(localStorage.getItem("qreserve_reservations")) || [];

// --- NEW DATA STORE: Promotions and Discounts ---
let promotions = JSON.parse(localStorage.getItem("qreserve_promotions")) || [];

// --- Debounce Utility Function ---
// Ensures a function runs only once after a delay, ignoring rapid repeated calls.
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// --- END Debounce Utility Function ---

// --- Duration-Based Price Calculation Functions ---
/**
 * Calculate price for a service based on duration or time slot
 * @param {string} serviceId - The service ID
 * @param {string} durationId - The duration/timeslot ID selected
 * @param {number} guestCount - Number of guests (used for pool area guest ranges)
 * @returns {number|null} - The calculated price or null if invalid
 */
function calculatePriceByDuration(serviceId, durationId, guestCount = 1) {
  const services = getActiveServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;

  // For services with timeSlots (like Private Pool Area)
  if (service.timeSlots && service.timeSlots.length > 0) {
    const slot = service.timeSlots.find((ts) => ts.id === durationId);
    if (!slot) return null;

    // Validate guest count is within the slot's range
    if (slot.guestRange) {
      if (
        guestCount < slot.guestRange.min ||
        guestCount > slot.guestRange.max
      ) {
        return null; // Guest count out of range for this slot
      }
    }
    return slot.price;
  }

  // For services with durations (rooms and halls)
  if (service.durations && service.durations.length > 0) {
    const duration = service.durations.find((d) => d.id === durationId);
    if (!duration) return null;
    return duration.price;
  }

  return null;
}

/**
 * Get the starting price for a service (lowest available price)
 * @param {object} service - The service object
 * @returns {number} - The starting price
 */
function getStartingPrice(service) {
  if (!service) return 0;

  // For services with timeSlots
  if (service.timeSlots && service.timeSlots.length > 0) {
    const prices = service.timeSlots.map((ts) => ts.price);
    return Math.min(...prices);
  }

  // For services with durations
  if (service.durations && service.durations.length > 0) {
    const prices = service.durations.map((d) => d.price);
    return Math.min(...prices);
  }

  // Fallback to legacy price property if it exists
  return service.price || 0;
}

/**
 * Get the default duration/timeslot ID for a service
 * @param {object} service - The service object
 * @returns {string|null} - The default duration/timeslot ID
 */
function getDefaultDurationId(service) {
  if (!service) return null;

  // For services with timeSlots, return first slot
  if (service.timeSlots && service.timeSlots.length > 0) {
    return service.timeSlots[0].id;
  }

  // For services with durations, use defaultDuration or first
  if (service.durations && service.durations.length > 0) {
    return service.defaultDuration || service.durations[0].id;
  }

  return null;
}

/**
 * Get the duration label for display
 * @param {string} serviceId - The service ID
 * @param {string} durationId - The duration/timeslot ID
 * @returns {string} - The duration label
 */
function getDurationLabel(serviceId, durationId) {
  const services = getActiveServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service) return "";

  // Check timeSlots first
  if (service.timeSlots) {
    const slot = service.timeSlots.find((ts) => ts.id === durationId);
    if (slot) return slot.label;
  }

  // Check durations
  if (service.durations) {
    const duration = service.durations.find((d) => d.id === durationId);
    if (duration) return duration.label;
  }

  return "";
}
// --- END Duration-Based Price Calculation Functions ---

function renderAmenities(services) {
  const container = document.getElementById("amenities-grid");
  if (!container) return;
  container.innerHTML = "";

  services.forEach((service) => {
    const startingPrice = getStartingPrice(service);

    const card = document.createElement("div");
    card.className = "amenity-card";

    card.innerHTML = `
            <img src="${service.image}" alt="${
      service.name
    }" style="width:100%;height:auto;border-radius:8px;object-fit:cover;">
            <div class="card-body">
                <h3>${service.name}</h3>
                <div class="amenity-desc">${service.description}</div>
                <div class="amenity-meta">Starts at ₱${startingPrice.toFixed(
                  2
                )} &bull; Max Guests: ${service.max_guests}</div>
                <div class="amenity-actions">
                    <button class="button-secondary" onclick="openAmenityGallery('${
                      service.id
                    }')">More Photos</button>
                    <a class="button-primary" href="services-list.html?serviceId=${
                      service.id
                    }">Book Now</a>
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

function handleFilterChange() {
  const typeFilter = document.getElementById("amenity-type-filter");
  const capacityFilter = document.getElementById("amenity-capacity-filter");

  if (!typeFilter) return;

  const selectedType = typeFilter.value;
  const selectedCapacity = capacityFilter ? parseInt(capacityFilter.value) : 0;

  const services = getActiveServices();
  let filteredServices = services;

  // Filter by type
  if (selectedType && selectedType !== "all") {
    filteredServices = filteredServices.filter(
      (service) => service.type === selectedType
    );
  }

  // Filter by capacity (show services that can accommodate UP TO the selected number)
  if (selectedCapacity > 0) {
    filteredServices = filteredServices.filter(
      (service) => service.max_guests >= selectedCapacity
    );
  }

  renderAmenities(filteredServices);
}

function openGalleryModal(serviceId) {
  const services = getActiveServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service || !service.gallery || service.gallery.length === 0) return;

  const modalContent = document.getElementById("modal-content");

  // Create a simple gallery view
  modalContent.innerHTML = `
        <h3 class="text-2xl font-bold mb-4">${service.name} Gallery</h3>
        <div class="grid grid-cols-2 gap-4">
            ${service.image
              .map(
                (imgSrc) =>
                  `<img src="${imgSrc}" alt="${service.name} photo" class="w-full h-auto rounded-lg shadow-md">`
              )
              .join("")}
        </div>
    `;

  document.getElementById("photo-modal").classList.remove("hidden");
}

// Function to save the current reservations array to the browser's local storage
// ** NOTE: This function is now OUTDATED and should be removed or refactored later. **
function saveReservations() {
  localStorage.setItem("qreserve_reservations", JSON.stringify(reservations));
  console.log("Reservations saved to local storage:", reservations);
}

function generateReservationId(primaryId) {
  if (primaryId) return primaryId;
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getReservationKey(reservation = {}) {
  return (
    reservation._id ||
    reservation.id ||
    reservation.reservationId ||
    reservation.qrCodeHash ||
    `${(reservation.email || "guest").toLowerCase()}-${
      reservation.check_in ||
      reservation.checkin_date ||
      reservation.createdAt ||
      Date.now()
    }`
  );
}

function mergeReservationLists(primary = [], secondary = []) {
  const mergedMap = new Map();
  secondary.forEach((res) => mergedMap.set(getReservationKey(res), res));
  primary.forEach((res) => mergedMap.set(getReservationKey(res), res));
  return Array.from(mergedMap.values());
}

function getLocalReservationsByEmail(email = "") {
  const normalizedEmail = email.toLowerCase();
  return (reservations || []).filter(
    (res) => (res.email || "").toLowerCase() === normalizedEmail
  );
}

function normalizeStatusValue(status) {
  if (!status) return "pending";
  const normalized = status.toString().toLowerCase().trim();
  if (["paid", "pay", "fully-paid", "confirmed"].includes(normalized)) {
    return "paid";
  }
  if (
    ["checked-in", "checkedin", "checked_in", "in-house"].includes(normalized)
  ) {
    return "checked-in";
  }
  if (["cancelled", "canceled", "void", "refunded"].includes(normalized)) {
    return "cancelled";
  }
  return "pending";
}

function getDisplayStatusText(status) {
  const normalized = normalizeStatusValue(status);
  return normalized.replace("-", " ").toUpperCase();
}

function getReservationStatus(reservation = {}) {
  return normalizeStatusValue(
    reservation.status || reservation.paymentStatus || reservation.statusText
  );
}

function updateLocalReservation(identifier, updates = {}) {
  if (!Array.isArray(reservations) || reservations.length === 0) {
    return false;
  }

  const identifiers = [];
  if (typeof identifier === "string" || typeof identifier === "number") {
    identifiers.push(identifier.toString().toLowerCase());
  } else if (identifier && typeof identifier === "object") {
    Object.values(identifier).forEach((value) => {
      if (value) {
        identifiers.push(value.toString().toLowerCase());
      }
    });
  }

  if (identifiers.length === 0) {
    return false;
  }

  let updated = false;
  reservations = reservations.map((res) => {
    const candidateKeys = [
      res._id,
      res.id,
      res.reservationId,
      res.qrCodeHash,
      res.reservationHash,
    ]
      .filter(Boolean)
      .map((val) => val.toString().toLowerCase());

    if (identifiers.some((id) => candidateKeys.includes(id))) {
      updated = true;
      const nextStatus = updates.status
        ? normalizeStatusValue(updates.status)
        : getReservationStatus(res);

      return {
        ...res,
        ...updates,
        status: nextStatus,
        paymentStatus: updates.paymentStatus
          ? normalizeStatusValue(updates.paymentStatus)
          : nextStatus,
        updatedAt: new Date().toISOString(),
      };
    }
    return res;
  });

  if (updated) {
    saveReservations();
  }

  return updated;
}

function normalizeCurrencyValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatReservationId(idValue) {
  if (!idValue) return "N/A";
  const str = idValue.toString();
  return str.length > 8 ? `${str.substring(0, 8)}...` : str;
}

function formatReservationDate(dateValue) {
  if (!dateValue) return "N/A";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }
  return parsed.toLocaleDateString();
}

function getStatusClass(status) {
  const normalized = normalizeStatusValue(status);
  switch (normalized) {
    case "paid":
      return "status-confirmed";
    case "confirmed":
      return "status-confirmed";
    case "checked-in":
      return "status-checked-in";
    case "completed":
      return "status-completed";
    case "cancelled":
      return "status-cancelled";
    default:
      return "status-pending";
  }
}

function storeReservationLocally(serverResult = {}, reservationData = {}) {
  if (!Array.isArray(reservations)) {
    reservations = [];
  }

  const loggedUser = getLoggedInUser();
  const safeTotal = normalizeCurrencyValue(
    reservationData.finalTotal || reservationData.finalTotalInput
  );
  const statusValue = normalizeStatusValue(
    serverResult.status || serverResult.paymentStatus || reservationData.status
  );
  const normalizedRecord = {
    _id: generateReservationId(serverResult.reservationId || serverResult._id),
    serviceType:
      reservationData.serviceType ||
      reservationData.serviceTypeInput ||
      "Unknown Service",
    check_in:
      reservationData.checkin_date ||
      reservationData.check_in ||
      new Date().toISOString(),
    finalTotal: safeTotal,
    status: statusValue,
    paymentStatus: statusValue,
    qrCodeHash: serverResult.reservationHash || serverResult.qrCodeHash || null,
    full_name:
      reservationData.customer_name || loggedUser?.full_name || "Guest User",
    email: reservationData.customer_email || loggedUser?.email || "",
    gcashReferenceNumber:
      serverResult.gcashReferenceNumber ||
      reservationData.gcashReferenceNumber ||
      "",
    createdAt: new Date().toISOString(),
  };

  reservations.push(normalizedRecord);
  saveReservations();
  return normalizedRecord;
}

function populateUserReservationTable(listElement, data = []) {
  if (!listElement) return;
  listElement.innerHTML = "";

  [...data].reverse().forEach((res) => {
    const row = document.createElement("tr");
    const statusValue = getReservationStatus(res);
    const statusClass = getStatusClass(statusValue);

    // Use either qrCodeHash (frontend) or reservationHash (backend) to build QR link
    const qrHash = res.qrCodeHash || res.reservationHash;
    const qrDisplay = qrHash
      ? `<a href="confirmation.html?hash=${qrHash}" target="_blank">View QR Code</a>`
      : "Pending";

    row.innerHTML = `
            <td>${formatReservationId(res._id || res.id)}</td>
            <td>${res.serviceType || "N/A"}</td>
            <td>${formatReservationDate(res.check_in || res.checkin_date)}</td>
            <td>₱${normalizeCurrencyValue(res.finalTotal).toFixed(2)}</td>
            <td><span class="${statusClass}">${getDisplayStatusText(
      statusValue
    )}</span></td>
            <td>${qrDisplay}</td>
        `;

    listElement.appendChild(row);
  });
}

function renderLocalUserReservations(listElement, userEmail) {
  if (!listElement) return false;

  const email = (userEmail || "").toLowerCase();
  const localMatches = (reservations || []).filter(
    (res) => (res.email || "").toLowerCase() === email
  );

  if (localMatches.length === 0) {
    listElement.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">You have no reservations on record.</td></tr>';
    return false;
  }

  populateUserReservationTable(listElement, localMatches);
  return true;
}

function populateAdminReservationTable(listElement, data = []) {
  if (!listElement) return;
  listElement.innerHTML = "";

  data.forEach((res) => {
    const row = document.createElement("tr");
    if (!res.gcashReferenceNumber) {
      row.style.backgroundColor = "#fff5f5";
    }
    const statusValue = getReservationStatus(res);
    const statusClass = getStatusClass(statusValue);
    row.innerHTML = `
            <td>${formatReservationId(res._id || res.id)}</td>
            <td>${res.full_name || res.customer_name || "N/A"}</td>
            <td>${res.email || "N/A"}</td>
            <td>${res.serviceType || "N/A"}</td>
            <td>${formatReservationDate(res.check_in || res.checkin_date)}</td>
            <td>₱${normalizeCurrencyValue(res.finalTotal).toFixed(2)}</td>
            <td><span class="${statusClass}">${getDisplayStatusText(
      statusValue
    )}</span></td>
            <td>${res.gcashReferenceNumber || "MISSING"}</td>
            <td>
                <button 
                    class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                    onclick="markReservationAsPaid('${res._id || res.id}')"
                >Mark Paid</button>
                <button 
                    class="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-sm ml-1"
                    onclick="confirmReservation('${res._id || res.id}')"
                >Confirm</button>
                <button 
                    class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm ml-1"
                    onclick="cancelReservation('${res._id || res.id}')"
                >Cancel</button>
            </td>
        `;

    listElement.appendChild(row);
  });
}

function renderLocalAdminReservations(listElement) {
  if (!listElement) return false;

  const localData = Array.isArray(reservations) ? reservations : [];
  if (localData.length === 0) {
    listElement.innerHTML =
      '<tr><td colspan="9" style="text-align: center;">No reservations recorded yet.</td></tr>';
    return false;
  }

  populateAdminReservationTable(listElement, localData);
  return true;
}

// Function to save the current promotions array to Local Storage
function savePromotions() {
  localStorage.setItem("qreserve_promotions", JSON.stringify(promotions));
  console.log("Promotions saved to local storage:", promotions);
}

// Function to retrieve promotions
function getPromotions() {
  return promotions;
}

// --- Global Role Management Functions ---
// Function to get the current role from Local Storage (Default is 'public')
function getCurrentRole() {
  const user = getLoggedInUser();
  // CRITICAL FIX: Check if the user object exists AND if the role property exists
  // We trim and lowercase it defensively, but ensure it's not null/undefined first.
  if (user && user.role && typeof user.role === "string") {
    return user.role.toLowerCase().trim();
  }

  return "public"; // Default to public if not logged in or role is missing
}

// Function to set the user role
function setRole(role) {
  localStorage.setItem("qreserve_user_role", role);
}

// Function to handle logout
function logout() {
  // --- CRITICAL FIXES: Remove OLD keys and add the NEW key ---

  // 1. Remove the NEW master authentication object
  localStorage.removeItem("loggedInUser");

  // 2. Remove the OLD, now deprecated keys (just in case they were used elsewhere)
  localStorage.removeItem("qreserve_user_role");
  localStorage.removeItem("qreserve_logged_user_email");

  // --- Clear session storage for reservations (Keep this) ---
  sessionStorage.removeItem("selectedServiceId");
  sessionStorage.removeItem("selectedServiceName");
  sessionStorage.removeItem("selectedServicePrice");

  showToast("Logged out successfully!", "success");
  setTimeout(() => {
    window.location.href = "index.html"; // Redirect to home page
  }, 1000);
}

// --- NEW AUTHENTICATION FUNCTIONS (DFD 1.0) ---

// --- Authentication Handlers (Client-Side) ---

/**
 * Handles the registration form submission on the client side.
 * IMPORTANT: You must replace 'YOUR_ACTUAL_CUSTOMER_ROLE_ID_HERE'
 * with the correct ObjectId string from your MongoDB role_tbl.
 */
async function registerUser(event) {
  event.preventDefault();

  // ----------------------------------------------------------------------
  // *** CRITICAL: REPLACE THIS PLACEHOLDER WITH THE CUSTOMER ROLE ID ***
  // ----------------------------------------------------------------------
  const CUSTOMER_ROLE_ID = "6911d7b841d151b05bf687c7";
  // ----------------------------------------------------------------------

  // 1. Gather form data (Adjust IDs if your form fields differ)
  const firstName = document.getElementById("registerFirstName").value.trim();
  const middleName = document
    .getElementById("registerMiddleInitial")
    .value.trim();
  const lastName = document.getElementById("registerLastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phone = document.getElementById("registerContactNumber").value.trim();
  const password = document.getElementById("registerPassword").value;

  // 2. Construct the payload, INCLUDING the required Customer Role ID
  const payload = {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email,
    phone,
    password,
    // CRITICAL FIX: Inject the required Role ID for new customers
    role_id: CUSTOMER_ROLE_ID,
  };

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Success: Display message and redirect to login
      showToast(data.message, "success");
      // This redirection path should also be relative to match the login flow
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      // Handle server-side validation/errors (e.g., email already exists)
      showModal(
        "Registration Failed",
        `<p>${data.message || "An unknown error occurred."}</p>`,
        "error"
      );
    }
  } catch (error) {
    console.error("Network or client-side error during registration:", error);
    showModal(
      "Connection Error",
      "<p>Could not connect to the server. Please check your network and try again.</p>",
      "error"
    );
  }
}

// --- MODIFIED Function to handle the login process ---
async function loginUser(event) {
  event.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput ? emailInput.value : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    showModal(
      "Missing Information",
      "<p>Please enter both email and password to continue.</p>",
      "warning"
    );
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showModal("Login Failed", `<p>${data.message}</p>`, "error");
      return;
    }

    // --- SUCCESSFUL LOGIN ---

    // 1. Store the JWT Token (CRITICAL for API authentication)
    localStorage.setItem("token", data.token);

    // 2. Store the user object (for display/profile features)
    localStorage.setItem("loggedInUser", JSON.stringify(data.user));

    // 3. Store user email for incomplete reservation tracking
    localStorage.setItem("qreserve_logged_user_email", data.user.email);

    // 4. Redirect based on the URL sent from the server
    showToast(
      `Login successful! Redirecting to the ${
        data.user.role === "Customer" ? "home page" : "Admin Dashboard"
      }.`,
      "success"
    );
    setTimeout(() => {
      window.location.href = data.redirect;
    }, 1500);
  } catch (error) {
    console.error("Network or server connection error:", error);
    showModal(
      "Connection Error",
      "<p>An error occurred during login. Please check the server connection and try again.</p>",
      "error"
    );
  }
}

// --- END NEW AUTHENTICATION FUNCTIONS ---

// --- DFD 2.0 Manage Profile Functions ---

/**
 * Retrieves the logged-in user object from localStorage.
 * Returns null if the token or user data is missing.
 */
function getLoggedInUser() {
  const userString = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  if (!token || !userString) {
    return null;
  }
  try {
    return JSON.parse(userString);
  } catch (e) {
    console.error("Error parsing loggedInUser from localStorage:", e);
    return null;
  }
}

/**
 * Redirects user to login page if they are not authenticated.
 * @param {boolean} requireAdmin - If true, requires the user role to be Admin or Manager.
 */
function checkAuthAndRedirect(requireAdmin = false) {
  const user = getLoggedInUser();

  // Check if on a page that should require auth (like profile or admin)
  const requiresAuth =
    window.location.pathname.includes("profile.html") ||
    window.location.pathname.includes("admin-dashboard.html");

  if (!requiresAuth) return;

  if (!user) {
    showModal(
      "Authentication Required",
      "<p>You must be logged in to access this page. Redirecting to login...</p>",
      "warning"
    );
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  if (requireAdmin && user.role !== "Admin" && user.role !== "Manager") {
    showModal(
      "Access Denied",
      "<p>You do not have admin privileges to access this page. Redirecting...</p>",
      "error"
    );
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }
}

/**
 * Checks if the user is logged in. If so, it hides the guest contact form
 * and populates the hidden inputs with the user's registered data for submission.
 */
function checkLoginStatusForReservation() {
  const user = getLoggedInUser();
  const guestDetailsForm = document.getElementById("guestDetailsForm");

  // Check if we are on the reserve page and the guest form exists
  if (!guestDetailsForm) return;

  if (user) {
    // Show the guest form but pre-fill values from the logged-in user.
    guestDetailsForm.style.display = "block";

    // Prefill fields (use fallback keys if some properties are missing)
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const contactEl = document.getElementById("contact");
    const addressEl = document.getElementById("address");
    const notesEl = document.getElementById("notes");

    if (nameEl) {
      nameEl.value =
        user.full_name ||
        `${user.first_name || ""} ${user.last_name || ""}`.trim();
      nameEl.readOnly = true; // use readOnly so the value is still submitted
    }
    if (emailEl) {
      emailEl.value = user.email || "";
      emailEl.readOnly = true; // use readOnly so the value is still submitted
    }
    if (contactEl) {
      contactEl.value = user.phone || user.contact || "";
      contactEl.readOnly = false; // editable per request
    }
    if (addressEl) {
      addressEl.value = user.address || "";
      addressEl.readOnly = false; // editable per request
    }
    if (notesEl) {
      // leave notes empty — user can add reservation-specific notes
      notesEl.readOnly = false;
    }

    // Show a subtle inline note so the user knows values were prefilled
    let info = document.getElementById("guest-prefill-info");
    if (!info) {
      info = document.createElement("p");
      info.id = "guest-prefill-info";
      info.style.marginBottom = "0.5rem";
      info.style.fontSize = "0.95rem";
      info.style.color = "#155724";
      info.textContent =
        "Your account details are pre-filled. You may update your contact number or address.";
      guestDetailsForm.parentNode.insertBefore(info, guestDetailsForm);
    }
  } else {
    // Not logged in: ensure the form is visible and inputs are enabled
    guestDetailsForm.style.display = "block";
    const fields = ["name", "email", "contact", "address", "notes"];
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = false;
        el.readOnly = false;
      }
    });
    // Remove prefill info if exists
    const existingInfo = document.getElementById("guest-prefill-info");
    if (existingInfo) existingInfo.remove();
  }
}

/**
 * Renders the logged-in user's personal details on profile.html.
 */
function renderProfileDetails() {
  const user = getLoggedInUser();

  if (!user) {
    // ... (existing redirect logic to login.html)
    const display = document.getElementById("user-info-display");
    if (display) {
      display.innerHTML =
        '<p style="color: red;">Not logged in. Redirecting...</p>';
    }
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
    return;
  }

  // Display the user's details

  // 💡 FIX 1: Use the single 'full_name' property sent by the backend
  // This fixes the "undefined undefined" issue.
  const fullName = user.full_name || "N/A";
  document.getElementById("profile-name").textContent = fullName;

  document.getElementById("profile-email").textContent = user.email || "N/A";

  // 💡 FIX 2: Use the 'phone' property (as sent by the backend)
  document.getElementById("profile-contact").textContent = user.phone || "N/A";

  // 💡 FIX 3: Use the single 'role' property (e.g., "Admin", "Manager", "Customer")
  const rawRole = user.role;

  if (rawRole) {
    // Capitalize the first letter (e.g., 'customer' -> 'Customer')
    const formattedRole = rawRole.charAt(0).toUpperCase() + rawRole.slice(1);
    document.getElementById("profile-role").textContent = formattedRole;
  } else {
    // Fallback if role is missing
    document.getElementById("profile-role").textContent = "Role Not Found";
  }
}

/**
 * Renders the logged-in user's reservation history by fetching data from the API.
 * CRITICAL: Requires a GET endpoint (e.g., /api/reservations/user/:email) on the backend.
 */
async function renderUserReservations() {
  const user = getLoggedInUser();
  const list = document.getElementById("user-reservations-list");

  if (!list || !user) {
    return; // Exit if not on the profile page or if user is not logged in
  }

  // Display a loading message while waiting for the API call
  list.innerHTML =
    '<tr><td colspan="6" style="text-align: center;">Loading reservation history...</td></tr>';

  // CRITICAL: Construct the API URL using the logged-in user's email
  const userEmail = user.email;
  const apiUrl = `http://localhost:3000/api/reservations/user/${encodeURIComponent(
    userEmail
  )}`;

  try {
    const response = await fetch(apiUrl); // Fetch data from the new GET API

    if (!response.ok) {
      throw new Error(
        `Failed to fetch reservations: Server responded with status ${response.status}`
      );
    }

    const userReservations = await response.json(); // Get the JSON array
    const localMatches = getLocalReservationsByEmail(userEmail);
    const combinedReservations = mergeReservationLists(
      userReservations,
      localMatches
    );

    if (combinedReservations.length === 0) {
      list.innerHTML =
        '<tr><td colspan="6" style="text-align: center;">You have no reservations on record.</td></tr>';
      return;
    }

    populateUserReservationTable(list, combinedReservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    const rendered = renderLocalUserReservations(list, userEmail);
    if (!rendered) {
      list.innerHTML =
        '<tr><td colspan="6" style="color: red; text-align: center;">Error loading reservations. Please check your Node.js API console.</td></tr>';
    }
  }
}

// --- Profile Editing Handlers ---
function openProfileEditModal() {
  const user = getLoggedInUser();
  if (!user) {
    showModal(
      "Login Required",
      "<p>Please log in to edit your profile.</p>",
      "warning",
      {
        onClose: () => (window.location.href = "login.html"),
      }
    );
    return;
  }

  const modal = document.getElementById("profile-edit-modal");
  const firstNameInput = document.getElementById("edit-first-name");
  const middleNameInput = document.getElementById("edit-middle-name");
  const lastNameInput = document.getElementById("edit-last-name");
  const emailInput = document.getElementById("edit-email");
  const phoneInput = document.getElementById("edit-phone");

  // Populate fields from stored user (backend sends individual name fields)
  if (firstNameInput) firstNameInput.value = user.first_name || "";
  if (middleNameInput) middleNameInput.value = user.middle_name || "";
  if (lastNameInput) lastNameInput.value = user.last_name || "";
  if (emailInput) emailInput.value = user.email || "";
  if (phoneInput) phoneInput.value = user.phone || "";

  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeProfileEditModal() {
  const modal = document.getElementById("profile-edit-modal");
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
}

async function handleProfileEditSubmit(event) {
  event.preventDefault();
  const user = getLoggedInUser();
  const token = getAuthToken();

  if (!user || !token) {
    showModal(
      "Login Required",
      "<p>Please log in again to update your profile.</p>",
      "warning",
      {
        onClose: () => (window.location.href = "login.html"),
      }
    );
    return;
  }

  const firstName = document.getElementById("edit-first-name")?.value.trim();
  const middleName = document.getElementById("edit-middle-name")?.value.trim();
  const lastName = document.getElementById("edit-last-name")?.value.trim();
  const email = document.getElementById("edit-email")?.value.trim();
  const phone = document.getElementById("edit-phone")?.value.trim();

  if (!firstName || !lastName || !email || !phone) {
    showToast(
      "Please fill out all required fields (First Name, Last Name, Email, Contact).",
      "warning"
    );
    return;
  }

  // Construct full_name for backend processing
  const fullName = `${firstName} ${middleName || ""} ${lastName}`
    .replace(/\s+/g, " ")
    .trim();

  try {
    const response = await fetch("http://localhost:3000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update profile.");
    }

    // Merge response with existing user, keep role for display
    const mergedUser = {
      ...user,
      ...data.user,
      role: data.user.role || user.role,
    };

    localStorage.setItem("loggedInUser", JSON.stringify(mergedUser));
    localStorage.setItem("qreserve_logged_user_email", mergedUser.email);

    renderProfileDetails();
    renderUserReservations();
    closeProfileEditModal();
    showToast("Profile updated successfully.", "success");
  } catch (err) {
    console.error("Profile update failed:", err);
    showModal("Update Failed", `<p>${err.message}</p>`, "error");
  }
}
// --- END DFD 2.0 Manage Profile Functions ---

// Expose functions globally so HTML elements (like onclick) can use them
window.logout = logout;
window.setRole = setRole;
window.openProfileEditModal = openProfileEditModal;
window.closeProfileEditModal = closeProfileEditModal;

// --- DFD 15.0 Admin User Management Functions ---

/**
 * Saves the current 'users' array back to Local Storage.
 */
function saveUsers() {
  localStorage.setItem("qreserve_users", JSON.stringify(users));
  // Re-synchronize the global array just in case
  window.users = users;
}

// script.js - Updated function to fetch users from the API and render the table
// --- Global Variables for Account Management ---
let accountModalMode = "create"; // 'create' or 'edit'
let editingAccountId = null;
let allRoles = []; // Cache for role mappings

// --- Open Create Account Modal ---
function openCreateAccountModal() {
  accountModalMode = "create";
  editingAccountId = null;
  document.getElementById("accountModalTitle").textContent =
    "Create New Account";
  document.getElementById("accountForm").reset();
  document.getElementById("accountPassword").required = true;
  document.getElementById("passwordLabel").textContent = "(Min 6 characters):";
  document.getElementById("accountFormMessage").textContent = "";
  document.getElementById("accountModal").style.display = "block";
}

// --- Open Edit Account Modal (by ID) ---
function openEditAccountModalById(userId) {
  // Find user from cached users
  const user = cachedUsers.find((u) => u._id === userId);
  if (!user) {
    showModal(
      "User Not Found",
      "<p>The requested user could not be found. Please refresh the page and try again.</p>",
      "error"
    );
    return;
  }
  openEditAccountModal(userId, user);
}

// --- Open Edit Account Modal ---
function openEditAccountModal(userId, user) {
  accountModalMode = "edit";
  editingAccountId = userId;
  document.getElementById("accountModalTitle").textContent = "Edit Account";

  // Populate form with existing data
  document.getElementById("accountFirstName").value = user.first_name || "";
  document.getElementById("accountMiddleName").value = user.middle_name || "";
  document.getElementById("accountLastName").value = user.last_name || "";
  document.getElementById("accountEmail").value = user.email || "";
  document.getElementById("accountPhone").value = user.phone || "";
  document.getElementById("accountPassword").value = "";
  document.getElementById("accountPassword").required = false;
  document.getElementById("passwordLabel").textContent =
    "(Leave blank to keep current password):";

  // Set role dropdown
  const roleId = user.role_id;
  const role = allRoles.find((r) => r._id === roleId);
  if (role) {
    const roleValue = role.role_name.toLowerCase();
    document.getElementById("accountRole").value = roleValue;
  }

  document.getElementById("accountFormMessage").textContent = "";
  document.getElementById("accountModal").style.display = "block";
}

// --- Close Account Modal ---
function closeAccountModal() {
  document.getElementById("accountModal").style.display = "none";
  document.getElementById("accountForm").reset();
  accountModalMode = "create";
  editingAccountId = null;
}

// --- Submit Account Form ---
async function handleAccountFormSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById("accountFirstName").value.trim();
  const middleName = document.getElementById("accountMiddleName").value.trim();
  const lastName = document.getElementById("accountLastName").value.trim();
  const email = document.getElementById("accountEmail").value.trim();
  const phone = document.getElementById("accountPhone").value.trim();
  const password = document.getElementById("accountPassword").value;
  const roleValue = document.getElementById("accountRole").value;
  const messageEl = document.getElementById("accountFormMessage");

  // Validation
  if (!firstName || !lastName || !email || !phone || !roleValue) {
    messageEl.textContent = "Please fill in all required fields.";
    messageEl.style.color = "red";
    return;
  }

  if (accountModalMode === "create" && !password) {
    messageEl.textContent = "Password is required for new accounts.";
    messageEl.style.color = "red";
    return;
  }

  if (password && password.length < 6) {
    messageEl.textContent = "Password must be at least 6 characters.";
    messageEl.style.color = "red";
    return;
  }

  // Find role ID from role name
  const selectedRole = allRoles.find(
    (r) => r.role_name.toLowerCase() === roleValue
  );
  if (!selectedRole) {
    messageEl.textContent = "Invalid role selected.";
    messageEl.style.color = "red";
    return;
  }

  const payload = {
    first_name: firstName,
    middle_name: middleName || null,
    last_name: lastName,
    email,
    phone,
    role_id: selectedRole._id,
  };

  if (password) {
    payload.password = password;
  }

  try {
    let url, method;

    if (accountModalMode === "create") {
      url = "http://localhost:3000/api/auth/admin/accounts/create";
      method = "POST";
    } else {
      url = `http://localhost:3000/api/auth/admin/accounts/${editingAccountId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.message || "Operation failed.";
      messageEl.style.color = "red";
      return;
    }

    messageEl.textContent = data.message || "Account saved successfully!";
    messageEl.style.color = "green";

    // Refresh the user list
    setTimeout(() => {
      closeAccountModal();
      renderUsersList();
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    messageEl.textContent = "Network error. Please try again.";
    messageEl.style.color = "red";
  }
}

// --- Deactivate Account ---
async function deactivateAccount(userId) {
  showConfirm(
    "Deactivate Account",
    "<p>Are you sure you want to deactivate this account? The user will not be able to log in.</p><p>This action cannot be reversed without admin intervention.</p>",
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/admin/accounts/${userId}/deactivate`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          showModal(
            "Deactivation Failed",
            `<p>${data.message || "Failed to deactivate account."}</p>`,
            "error"
          );
          return;
        }

        showToast("Account deactivated successfully.", "success");
        renderUsersList();
      } catch (error) {
        console.error("Error:", error);
        showModal(
          "Network Error",
          "<p>A network error occurred. Please try again.</p>",
          "error"
        );
      }
    },
    { confirmText: "Deactivate", cancelText: "Cancel", type: "danger" }
  );
}

// --- Activate Account ---
async function activateAccount(userId) {
  showConfirm(
    "Activate Account",
    "<p>Are you sure you want to activate this account? The user will be able to log in again.</p>",
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/admin/accounts/${userId}/activate`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          showModal(
            "Activation Failed",
            `<p>${data.message || "Failed to activate account."}</p>`,
            "error"
          );
          return;
        }

        showToast("Account activated successfully.", "success");
        renderUsersList();
      } catch (error) {
        console.error("Error:", error);
        showModal(
          "Network Error",
          "<p>A network error occurred. Please try again.</p>",
          "error"
        );
      }
    },
    { confirmText: "Activate", cancelText: "Cancel", type: "info" }
  );
}

// --- Fetch All Roles ---
async function fetchRoles() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/roles");
    if (!response.ok) throw new Error("Failed to fetch roles");

    const data = await response.json();
    allRoles = data.roles || [];
    return allRoles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}

// --- Global cache for loaded users ---
let cachedUsers = [];

// --- Render User List (Updated) ---
async function renderUsersList() {
  const userTableBody = document.getElementById("users-table-body");
  if (!userTableBody) return;

  userTableBody.innerHTML =
    '<tr><td colspan="7" style="text-align: center;">Fetching users from API...</td></tr>';

  try {
    // Fetch roles if not already cached
    if (allRoles.length === 0) {
      await fetchRoles();
    }

    const response = await fetch("http://localhost:3000/api/users");

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}. Could not fetch user list.`
      );
    }

    const users = await response.json();

    // Cache users for Edit function
    cachedUsers = users;

    userTableBody.innerHTML = ""; // Clear the loading message

    users.forEach((user) => {
      const row = userTableBody.insertRow();

      // Find role name
      const role = allRoles.find((r) => r._id === user.role_id);
      const roleName = role ? role.role_name : "Unknown";
      const statusText = user.isActive ? "✓ Active" : "✗ Inactive";
      const statusColor = user.isActive ? "green" : "red";

      // Display User Data
      row.insertCell().textContent = user._id;
      row.insertCell().textContent = `${user.first_name} ${user.last_name}`;
      row.insertCell().textContent = user.email;
      row.insertCell().textContent = user.phone || "N/A";
      row.insertCell().textContent = roleName;

      // Status cell
      const statusCell = row.insertCell();
      statusCell.textContent = statusText;
      statusCell.style.color = statusColor;
      statusCell.style.fontWeight = "bold";

      // Actions cell
      const actionsCell = row.insertCell();
      actionsCell.innerHTML = `
                <button class="button-small button-secondary" onclick="openEditAccountModalById('${
                  user._id
                }')">✏️ Edit</button>
                ${
                  user.isActive
                    ? `<button class="button-small button-danger" onclick="deactivateAccount('${user._id}')">🔒 Deactivate</button>`
                    : `<button class="button-small button-success" onclick="activateAccount('${user._id}')">✓ Activate</button>`
                }
            `;
    });
  } catch (error) {
    console.error("Error loading user list:", error);
    userTableBody.innerHTML = `<tr><td colspan="7" style="color: red; text-align: center;">Error loading users: ${error.message}</td></tr>`;
  }
}

// script.js - Function to change a user's role via API
async function changeUserRole(userId, newRoleName) {
  showConfirm(
    "Change User Role",
    `<p>Are you sure you want to change this user's role to <strong>${newRoleName}</strong>?</p><p>This action is immediate and cannot be undone without manual intervention.</p>`,
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/role`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Future: Add Authorization header here
            },
            body: JSON.stringify({ newRoleName }),
          }
        );

        if (!response.ok) {
          // Read error message from server if available
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update user role.");
        }

        const result = await response.json();
        showToast(result.message, "success");

        // CRITICAL: Refresh the user list table to show the new role
        renderUsersList();
      } catch (error) {
        console.error("Failed to change role:", error);
        showModal("Role Change Failed", `<p>${error.message}</p>`, "error");
      }
    },
    { confirmText: "Change Role", cancelText: "Cancel", type: "warning" }
  );
}

// script.js - Function to delete a user via API
async function deleteUser(userId) {
  showConfirm(
    "Delete User",
    '<p style="color: red;"><strong>⚠️ WARNING: This action is permanent and cannot be undone.</strong></p><p>Are you sure you want to permanently delete this user and all their data?</p>',
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              // Future: Add Authorization header here
            },
          }
        );

        if (!response.ok) {
          // Attempt to read the error message from the server response
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete user.");
        }

        const result = await response.json();
        showToast(result.message, "success");

        // CRITICAL: Refresh the user list table to reflect the change
        renderUsersList();
      } catch (error) {
        console.error("Failed to delete user:", error);
        showModal("Deletion Failed", `<p>${error.message}</p>`, "error");
      }
    },
    { confirmText: "Permanently Delete", cancelText: "Cancel", type: "danger" }
  );
}

/**
 * Fetches all reservations with 'Paid' status and renders them on the Admin Dashboard.
 * NOTE: This requires a new backend API route /api/reservations/pending
 */
async function renderAdminReservations() {
  const list = document.getElementById("admin-reservation-list");

  // Important: We should also check the user role here to prevent public access.
  const userRole = getCurrentRole();
  if (userRole !== "admin" && userRole !== "manager") {
    if (list) {
      list.innerHTML =
        '<tr><td colspan="9" style="text-align: center; color: red;">ACCESS DENIED: Insufficient permissions.</td></tr>';
    }
    return;
  }

  if (!list) return;

  list.innerHTML =
    '<tr><td colspan="9" style="text-align: center;">Loading pending reservations...</td></tr>';

  // CRITICAL: New API endpoint to fetch all PENDING reservations
  const apiUrl = "http://localhost:3000/api/reservations/pending";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch admin reservations: Status ${response.status}`
      );
    }

    const apiReservations = await response.json();
    const localData = Array.isArray(reservations) ? reservations : [];
    const combinedReservations = mergeReservationLists(
      apiReservations,
      localData
    );

    if (combinedReservations.length === 0) {
      list.innerHTML =
        '<tr><td colspan="9" style="text-align: center;">No new paid reservations currently pending review.</td></tr>';
      return;
    }

    populateAdminReservationTable(list, combinedReservations);
  } catch (error) {
    console.error("Error fetching admin reservations:", error);
    const rendered = renderLocalAdminReservations(list);
    if (!rendered && list) {
      list.innerHTML =
        '<tr><td colspan="9" style="color: red; text-align: center;">Error: Could not connect to Admin API.</td></tr>';
    }
  }
}
// --- Admin Actions ---

// NOTE: We assume renderAdminReservations is defined elsewhere or will be defined next.

/**
 * Sends a request to the API to change a reservation status to 'Confirmed'.
 * @param {string} reservationId - The MongoDB _id of the reservation.
 */
async function confirmReservation(reservationId) {
  showConfirm(
    "Confirm Reservation",
    "<p>Mark this reservation as <strong>CONFIRMED</strong> (Ready for Check-in)?</p><p>The guest will be notified of this status change.</p>",
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/${reservationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "CONFIRMED" }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          showModal(
            "Confirmation Failed",
            `<p>${data.message || "Server error during confirmation."}</p>`,
            "error"
          );
          console.error("Confirmation server error:", data);
          return;
        }

        showToast(
          "Reservation marked as CONFIRMED. Ready for check-in.",
          "success"
        );

        updateLocalReservation(reservationId, {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        });

        // Refresh the list to reflect the change immediately
        if (typeof renderAdminReservations === "function")
          renderAdminReservations();
      } catch (error) {
        console.error("Network error during confirmation:", error);
        showModal(
          "Network Error",
          "<p>A network error occurred. Could not confirm reservation. Please try again.</p>",
          "error"
        );
      }
    },
    { confirmText: "Confirm", cancelText: "Cancel", type: "info" }
  );
}

// NEW: Function to manually mark a reservation as PAID (e.g., for cash payments)
async function markReservationAsPaid(reservationId) {
  showConfirm(
    "Mark as Paid",
    "<p>Mark this reservation as <strong>PAID</strong>?</p><p>Use this for cash or manual payments that have been verified.</p>",
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/${reservationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "PAID" }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          showModal(
            "Payment Mark Failed",
            `<p>${data.message || "Server error."}</p>`,
            "error"
          );
          console.error("Server error:", data);
          return;
        }

        showToast("Reservation marked as PAID.", "success");
        updateLocalReservation(reservationId, {
          status: "paid",
          paymentStatus: "paid",
        });

        if (typeof renderAdminReservations === "function")
          renderAdminReservations();
      } catch (error) {
        console.error("Network error:", error);
        showModal(
          "Network Error",
          "<p>A network error occurred. Could not mark as paid. Please try again.</p>",
          "error"
        );
      }
    },
    { confirmText: "Mark as Paid", cancelText: "Cancel", type: "info" }
  );
}

/**
 * Sends a request to the API to change a reservation status to 'Cancelled'.
 * @param {string} reservationId - The MongoDB _id of the reservation.
 */
async function cancelReservation(reservationId) {
  showConfirm(
    "Cancel Reservation",
    '<p style="color: red;"><strong>⚠ WARNING</strong></p><p>Are you sure you want to <strong>CANCEL</strong> this reservation?</p><p>This action will notify the guest and may trigger refund procedures.</p>',
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/${reservationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Cancelled" }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          showModal(
            "Cancellation Failed",
            `<p>${data.message || "Server error during cancellation."}</p>`,
            "error"
          );
          console.error("Cancellation server error:", data);
          return;
        }

        showToast(
          "Reservation cancelled successfully! It will be removed from the pending list shortly.",
          "success"
        );

        updateLocalReservation(reservationId, {
          status: "cancelled",
          paymentStatus: "cancelled",
        });

        // Refresh the list to remove the cancelled item immediately
        if (typeof renderAdminReservations === "function")
          renderAdminReservations();
      } catch (error) {
        console.error("Network error during cancellation:", error);
        showModal(
          "Network Error",
          "<p>A network error occurred. Could not cancel reservation. Please try again.</p>",
          "error"
        );
      }
    },
    { confirmText: "Cancel Reservation", cancelText: "Go Back", type: "danger" }
  );
}
function setMinDate() {
  // Format the date for the 'min' attribute
  const today = new Date();
  // For datetime-local, the min value should include time (though we only set date here for simplicity)
  const formattedDateTime = today.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

  // --- ID CORRECTION: Use 'checkin' and 'checkout' ---
  const checkInInput = document.getElementById("checkin");
  const checkOutInput = document.getElementById("checkout");

  if (checkInInput) {
    checkInInput.setAttribute("min", formattedDateTime);
  }
  if (checkOutInput) {
    checkOutInput.setAttribute("min", formattedDateTime);
  }

  // Add an event listener to enforce checkOutDate > checkInDate
  if (checkInInput && checkOutInput) {
    checkInInput.addEventListener("change", () => {
      if (checkInInput.value) {
        // Set the minimum value for checkout to the time AFTER check-in

        // Set the min attribute for checkout to the value of checkin
        checkOutInput.setAttribute("min", checkInInput.value);

        // If the currently selected checkout time is less than or equal to check-in, clear it.
        if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
          checkOutInput.value = "";
        }
      }
    });
  }
}

// Call this function when the DOM is loaded
document.addEventListener("DOMContentLoaded", setMinDate);

function toggleGuestDetailsForm() {
  // Check if the user is NOT logged in (or if the variable is not set/false)
  const guestForm = document.getElementById("guestDetailsForm");

  // NOTE: Replace 'window.isLoggedIn' with your actual method of checking login status
  if (guestForm) {
    if (window.isLoggedIn) {
      // Logged-in user: Hide the form and remove 'required' attributes
      guestForm.style.display = "none";
      guestForm
        .querySelectorAll("input, select")
        .forEach((el) => el.removeAttribute("required"));
    } else {
      // Guest user: Show the form and ensure 'required' attributes are set
      guestForm.style.display = "block";
      guestForm
        .querySelectorAll("input, select")
        .forEach((el) => el.setAttribute("required", ""));
    }
  }
}

document.addEventListener("DOMContentLoaded", toggleGuestDetailsForm);

// Expose these functions globally for HTML calls
window.renderUsersList = renderUsersList;
window.changeUserRole = changeUserRole;
window.deleteUser = deleteUser;

// --- Admin Blocked Dates Management ---

// Load available services for the checkboxes
async function loadServicesForBlocking() {
  try {
    const response = await fetch("/api/services"); // Update with your actual API endpoint

    if (!response.ok) {
      // Try to surface server response for easier debugging
      const txt = await response.text();
      throw new Error(
        `Failed to load services: ${response.status} ${
          response.statusText
        } - ${txt.slice(0, 200)}`
      );
    }

    const contentType = response.headers.get("content-type") || "";
    let services;
    if (contentType.includes("application/json")) {
      services = await response.json();
    } else {
      // Received HTML or other text — surface it in the error message
      const txt = await response.text();
      throw new Error(`Expected JSON but received: ${txt.slice(0, 200)}`);
    }

    // Clear existing checkboxes
    serviceCheckboxes.innerHTML = "";

    // Create checkboxes for each service - use frontend id for checkbox value
    (services || []).forEach((service) => {
      // Always use frontend id for checkbox value, not MongoDB _id
      const checkboxValue =
        service.id || service._id || service.idString || service.name;
      const displayName =
        service.name || service.id || service._id || "Unknown Service";

      const div = document.createElement("div");
      div.className = "form-check";
      div.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${checkboxValue}" id="service-${checkboxValue}">
                <label class="form-check-label" for="service-${checkboxValue}">
                    ${displayName}
                </label>
            `;
      serviceCheckboxes.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading services:", error);
    showModal(
      "Error",
      "<p>Failed to load services. Check server console and ensure /api/services is available.</p>",
      "error"
    );
  }
}

// Set up the block date form submission
function setupBlockDateForm() {
  blockDateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const startDate = blockStartDate.value;
    const endDate = blockEndDate.value;
    const reason = blockReason.value.trim();

    // NEW: Validate against past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDateObj = new Date(startDate);
    startDateObj.setHours(0, 0, 0, 0);

    if (startDateObj < today) {
      showModal(
        "Invalid Date",
        "<p>Cannot block dates in the past. Please select today or a future date.</p>",
        "warning"
      );
      return;
    }

    // Get selected service IDs (frontend IDs)
    const selectedServiceIds = Array.from(
      serviceCheckboxes.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);

    // Convert frontend IDs to MongoDB IDs for backend storage
    let mongoIds = [];
    if (selectedServiceIds.length > 0) {
      const services = getActiveServices();
      mongoIds = selectedServiceIds
        .map((frontendId) => {
          const service = services.find((s) => s.id === frontendId);
          return service?._id || frontendId; // Use MongoDB _id if available, fallback to frontend id
        })
        .filter((id) => id); // Remove undefined values
    }

    console.log("Block date request:", {
      startDate,
      endDate,
      reason,
      selectedServiceIds,
      mongoIds,
      appliesToAll: selectedServiceIds.length === 0,
    });

    try {
      const response = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`, // Implement this function to get the auth token
        },
        body: JSON.stringify({
          startDate,
          endDate,
          reason,
          serviceIds: mongoIds.length > 0 ? mongoIds : undefined,
          appliesToAll: mongoIds.length === 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to block date range");
      }

      // Reset form and refresh the list
      blockDateForm.reset();
      loadBlockedDates();
      showModal(
        "Success",
        "<p>Date range blocked successfully!</p>",
        "success"
      );
    } catch (error) {
      console.error("Error blocking date range:", error);
      showModal(
        "Error",
        `<p>${
          error.message || "Failed to block date range. Please try again."
        }</p>`,
        "error"
      );
    }
  });
}

// Load and display blocked dates
async function loadBlockedDates() {
  try {
    const response = await fetch("/api/blocked-dates", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load blocked dates");
    }

    const payload = await response.json();

    // Backend may return { success: true, blockedDates: [...] } or { data: [...] } or an array directly
    const blockedDates = payload.blockedDates || payload.data || payload;
    renderBlockedDates(blockedDates);
  } catch (error) {
    console.error("Error loading blocked dates:", error);
    showAlert("Failed to load blocked dates. Please try again.", "error");
  }
}

// Render blocked dates in the UI
function renderBlockedDates(blockedDates) {
  if (!blockedDatesList) return;

  // Debug logging
  console.log("Rendering blocked dates:", blockedDates);

  // Defensive handling: ensure we have an array
  if (!Array.isArray(blockedDates) || blockedDates.length === 0) {
    blockedDatesList.innerHTML =
      '<p style="color: #999; padding: 10px;">No blocked dates found.</p>';
    return;
  }

  // Helper function to safely format dates
  const safeFormatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      console.error("Date parsing error:", e, dateValue);
      return "Invalid Date";
    }
  };

  const html = `
        <div style="overflow-x: auto;">
            <table class="reservation-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="padding: 12px; background-color: #e9ecef; border: 1px solid #dee2e6;">Date Range</th>
                        <th style="padding: 12px; background-color: #e9ecef; border: 1px solid #dee2e6;">Reason</th>
                        <th style="padding: 12px; background-color: #e9ecef; border: 1px solid #dee2e6;">Applies To</th>
                        <th style="padding: 12px; background-color: #e9ecef; border: 1px solid #dee2e6;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${blockedDates
                      .map((block) => {
                        const start =
                          block.startDate || block.start || block.date;
                        const end = block.endDate || block.end;
                        const reason =
                          block.reason ||
                          block.reasonText ||
                          "No reason provided";
                        const appliesAll =
                          block.appliesToAll ||
                          block.appliesToAllServices ||
                          !block.serviceIds ||
                          block.serviceIds.length === 0;
                        const id = block._id || block.id || "";

                        // Get service names from IDs
                        let appliesTo = "All Services";
                        if (
                          !appliesAll &&
                          block.serviceIds &&
                          block.serviceIds.length > 0
                        ) {
                          const allServices = getActiveServices();
                          const serviceNames = block.serviceIds.map(
                            (serviceId) => {
                              // Try to find by MongoDB _id or frontend id
                              const service = allServices.find(
                                (s) => s._id === serviceId || s.id === serviceId
                              );
                              return service ? service.name : serviceId;
                            }
                          );
                          appliesTo = serviceNames.join(", ");
                        }

                        return `
                        <tr>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">${safeFormatDate(
                              start
                            )} to ${safeFormatDate(end)}</td>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(
                              reason
                            )}</td>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">${appliesTo}</td>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">
                                <button class="button-danger" style="padding: 8px 16px; cursor: pointer;" onclick="unblockDate('${id}')">
                                    Unblock
                                </button>
                            </td>
                        </tr>`;
                      })
                      .join("")}
                </tbody>
            </table>
        </div>
    `;

  blockedDatesList.innerHTML = html;
}

// Unblock a date range
async function unblockDate(blockId) {
  showConfirm(
    "Unblock Date Range",
    "Are you sure you want to unblock this date range?",
    async () => {
      try {
        const response = await fetch(`/api/blocked-dates/${blockId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to unblock date range");
        }

        // Refresh the list
        loadBlockedDates();
        showModal("Success", "Date range unblocked successfully!", "success");
      } catch (error) {
        console.error("Error unblocking date range:", error);
        showModal(
          "Error",
          error.message || "Failed to unblock date range. Please try again.",
          "error"
        );
      }
    },
    {
      confirmText: "OK",
      cancelText: "Cancel",
      type: "warning",
    }
  );
}

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper function to show alerts - NOW DEPRECATED, use showToast() or showModal() directly
// Kept for backwards compatibility - will be removed in future versions
function showAlert(message, type = "info") {
  // Map alert types to notification types
  const typeMap = {
    error: "error",
    success: "success",
    info: "info",
    warning: "warning",
  };
  showToast(message, typeMap[type] || "info");
}

// Helper function to get auth token (implement according to your auth system)
function getAuthToken() {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
}
// --- Dynamic Navigation Data and Renderer ---
const navLinks = {
  public: [
    { text: "Amenities", href: "amenities.html" },
    { text: "Reserve Now", href: "services-list.html" },
  ],
  customer: [
    { text: "Amenities", href: "amenities.html" },
    { text: "Reserve Now", href: "services-list.html" },
  ],
  admin: [
    { text: "Reserve Now", href: "services-list.html" },
    { text: "Admin Dashboard", href: "admin-dashboard.html" },
    { text: "Amenities", href: "amenities.html" },
  ],
};
window.changeUserRole = changeUserRole;

// Re-define the dropdown toggle function to be callable externally
function attachDropdownToggle() {
  const profileButton = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");

  if (profileButton && profileMenu) {
    profileButton.addEventListener("click", () => {
      profileMenu.classList.toggle("show-dropdown");
      const isExpanded =
        profileButton.getAttribute("aria-expanded") === "true" || false;
      profileButton.setAttribute("aria-expanded", !isExpanded);
    });
    window.addEventListener("click", (event) => {
      if (
        !event.target.matches("#profile-icon") &&
        !event.target.closest(".profile-dropdown")
      ) {
        if (profileMenu.classList.contains("show-dropdown")) {
          profileMenu.classList.remove("show-dropdown");
          profileButton.setAttribute("aria-expanded", "false");
        }
      }
    });
  }
}

// --- Updated renderNavigation() Function in script.js ---

function renderNavigation() {
  const navUl = document.querySelector("nav ul");
  if (!navUl) return;

  let roleFromStorage = getCurrentRole(); // The actual role stored in Local Storage
  let currentRoleToUse = roleFromStorage; // The role used to select links
  const currentPath = window.location.pathname;

  // --- 1. ROLE ENFORCEMENT LOGIC (The Fix) ---
  // If the user lands on an Admin page, enforce the Admin view,
  // overriding the potentially corrupted role from a different tab.
  if (
    currentPath.includes("admin-dashboard.html") ||
    currentPath.includes("user-management.html")
  ) {
    if (roleFromStorage !== "public") {
      currentRoleToUse = "admin"; // FORCE Admin links if any user is logged in
    }
  }
  // --- 2. REDIRECT LOGIC (Prevent logged-in user from hitting login/register) ---
  else if (
    (currentPath.includes("login.html") ||
      currentPath.includes("register.html")) &&
    roleFromStorage !== "public"
  ) {
    // If a logged-in user hits login/register, redirect them home
    window.location.href = "index.html";
    return;
  }
  // -------------------------------------------------------------------------

  // ... (Keep existing REDIRECT LOGIC for login/register pages)

  // --- NEW: Role Key Mapping for Manager Access ---
  // If the stored role is 'manager', map it to 'admin' to pull the correct links.
  let roleKey = currentRoleToUse;
  if (currentRoleToUse === "manager") {
    roleKey = "admin";
  }
  const links = navLinks[roleKey]; // Use the roleKey for link selection

  navUl.innerHTML = "";

  // 1. Add universal links (Home is always first)
  const homeLi = document.createElement("li");
  homeLi.innerHTML = `<a href="index.html">Home</a>`;
  navUl.appendChild(homeLi);

  // 2. Add role-specific links
  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
    navUl.appendChild(li);
  });

  // 3. Add Help/Guides (always visible)
  const helpLi = document.createElement("li");
  helpLi.innerHTML = `<a href="help.html">Help</a>`;
  navUl.appendChild(helpLi);

  // 4. Add Login/Profile based on status (Uses the actual stored role for status check)
  if (roleFromStorage !== "public") {
    // Logged-in: Show Profile Dropdown
    const profileLi = document.createElement("li");
    profileLi.classList.add("profile-dropdown");

    profileLi.innerHTML = `
            <button id="profile-icon" class="icon-button" aria-expanded="false" aria-controls="profile-menu">
                <span style="font-size: 1.5rem;">👤</span>
            </button>
            <div class="dropdown-content" id="profile-menu">
                <a href="profile.html">My Profile</a>
                <a href="#" onclick="logout(); return false;">Logout</a>
            </div>
        `;
    navUl.appendChild(profileLi);

    attachDropdownToggle();

    // Add Resume Reservation button if user has incomplete reservations
    if (typeof addResumeReservationNav === "function") {
      addResumeReservationNav();
    }
  } else {
    // Logged-out: Show Login and Register
    const loginLi = document.createElement("li");
    const registerLi = document.createElement("li");

    loginLi.innerHTML = `<a href="login.html">Login</a>`;
    registerLi.innerHTML = `<a href="register.html">Register</a>`;

    navUl.appendChild(loginLi);
    navUl.appendChild(registerLi);
  }
}

// --- NEW SERVICE SELECTION FUNCTIONS (For service-list.html) ---

let currentSelectedServiceId = null;

// Helper: normalize service type for filtering
function getServiceType(service = {}) {
  return service.type || "other";
}

// Filters the active services based on services-list filter controls
function filterServicesForList() {
  const typeSelect = document.getElementById("services-type-filter");
  const capSelect = document.getElementById("services-capacity-filter");
  const typeFilter = typeSelect?.value || "all";
  const capFilter = parseInt(capSelect?.value || "0", 10);

  let filtered = getActiveServices();

  if (typeFilter !== "all") {
    filtered = filtered.filter((s) => getServiceType(s) === typeFilter);
  }

  if (capFilter > 0) {
    // Special case: 6 means 6 or more
    if (capFilter === 6) {
      filtered = filtered.filter((s) => s.max_guests >= capFilter);
    } else {
      filtered = filtered.filter((s) => s.max_guests <= capFilter);
    }
  }

  return filtered;
}

/**
 * Updates the existing Booking Summary Sidebar on service-list.html
 * to reflect the selected service.
 * @param {object} service - The selected service object.
 */
function updateBookingSummaryDisplay(service) {
  const sidebar = document.getElementById("booking-summary-sidebar");
  const roomDisplay = document.getElementById("summary-room");
  const priceDisplay = document.getElementById("summary-price");
  const proceedButton = document.getElementById("sidebar-proceed-button");
  const inclusionsWrap = document.getElementById("summary-inclusions");
  const inclusionsList = document.getElementById("summary-inclusions-list");

  if (!sidebar || !roomDisplay || !priceDisplay || !proceedButton) return;

  // 1. Update the Selected Room Name
  roomDisplay.textContent = service.name;

  // 2. Update the Total Price - Show starting price (will update when duration selected)
  const startingPrice = getStartingPrice(service);
  priceDisplay.textContent = `P${startingPrice.toFixed(2)}`;

  // 3. Keep the Proceed Button disabled until a duration is selected in the modal
  proceedButton.classList.add("disabled");
  proceedButton.textContent = "Select Duration First";

  // 4. Show inclusions in the sidebar for quick scan
  if (inclusionsWrap && inclusionsList) {
    if (service.inclusions && service.inclusions.length > 0) {
      inclusionsList.innerHTML = service.inclusions
        .map((item) => `<li>${item}</li>`)
        .join("");
      inclusionsWrap.style.display = "block";
    } else {
      inclusionsWrap.style.display = "none";
      inclusionsList.innerHTML = "";
    }
  }

  // NOTE: Since the sidebar is sticky, we don't need to manually set display: block,
  // but the original logic can be modified to make it visible if it were initially hidden.
  // For now, we assume the sidebar is always visible, just with placeholder content.
}

/**
 * Renders the list of service cards onto the service-list.html page.
 */
function renderServiceCards(servicesOverride = null) {
  const container = document.getElementById("service-cards-container");
  if (!container) return; // Only run on service-list.html

  container.innerHTML = ""; // Clear existing content

  // Use active services from API cache, fallback to hardcoded
  const services = servicesOverride || getActiveServices();

  services.forEach((service) => {
    const card = document.createElement("div");
    card.classList.add("service-card");
    card.setAttribute("data-service-id", service.id);

    const startingPrice = getStartingPrice(service);

    card.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <div class="card-content">
                <p class="price">Starts at ₱${startingPrice.toFixed(2)}</p>
                <h3>${service.name}</h3>
                <p>Max Guests: ${service.max_guests}</p>
                <p>${service.description.substring(0, 70)}...</p>
            </div>
        `;

    // Attach the click event listener to show the modal
    card.addEventListener("click", () => {
      showServiceModal(service.id);
    });

    container.appendChild(card);
  });
}

/**
 * Shows the modal popup with service details.
 * @param {string} serviceId - The ID of the service to display.
 */
function showServiceModal(serviceId) {
  const services = getActiveServices();
  const service = services.find((s) => s.id === serviceId);
  const modal = document.getElementById("serviceModal");
  if (!service || !modal) return;

  currentSelectedServiceId = serviceId; // Save the ID globally

  // CRITICAL NEW STEP: Update the floating booking summary
  updateBookingSummaryDisplay(service);

  // Populate Modal Details
  document.getElementById("modal-name").textContent = service.name;
  document.getElementById("modal-max-guests").textContent = service.max_guests;
  document.getElementById("modal-description").textContent =
    service.description;

  // Populate duration/timeslot dropdown
  const durationSelect = document.getElementById("modal-duration-select");
  const priceDisplay = document.getElementById("modal-price");
  const proceedButton = document.getElementById("modal-proceed-button");
  const inclusionsDiv = document.getElementById("modal-inclusions");
  const inclusionsList = document.getElementById("modal-inclusions-list");

  if (durationSelect) {
    durationSelect.innerHTML =
      '<option value="">-- Select Duration/Time --</option>';

    // Add timeSlots if available (for venues like pool)
    if (service.timeSlots && service.timeSlots.length > 0) {
      service.timeSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot.id;
        option.textContent = `${slot.label} - ₱${slot.price.toFixed(2)}`;
        durationSelect.appendChild(option);
      });

      // Pre-select first timeslot for venues
      if (service.timeSlots.length > 0) {
        durationSelect.value = service.timeSlots[0].id;
        const defaultSlot = service.timeSlots[0];
        priceDisplay.textContent = `₱${defaultSlot.price.toFixed(2)}`;
        proceedButton.style.pointerEvents = "auto";
        proceedButton.style.opacity = "1";

        // Update sidebar price and enable button
        const sidebarPrice = document.getElementById("summary-price");
        const sidebarBtn = document.getElementById("sidebar-proceed-button");
        if (sidebarPrice) {
          sidebarPrice.textContent = `P${defaultSlot.price.toFixed(2)}`;
        }
        if (sidebarBtn) {
          sidebarBtn.classList.remove("disabled");
          sidebarBtn.textContent = "Continue Booking";
          sidebarBtn.onclick = () => {
            selectServiceAndRedirect(service, service.timeSlots[0].id);
            return false;
          };
        }

        // Show inclusions
        if (service.inclusions && service.inclusions.length > 0) {
          inclusionsList.innerHTML = service.inclusions
            .map((inc) => `<li>${inc}</li>`)
            .join("");
          inclusionsDiv.style.display = "block";
        }
      }
    }
    // Add durations if available (for rooms and halls)
    else if (service.durations && service.durations.length > 0) {
      service.durations.forEach((duration) => {
        const option = document.createElement("option");
        option.value = duration.id;
        option.textContent = `${duration.label} - ₱${duration.price.toFixed(
          2
        )}`;
        durationSelect.appendChild(option);
      });

      // Pre-select default duration if specified
      if (service.defaultDuration) {
        durationSelect.value = service.defaultDuration;
        const defaultDur = service.durations.find(
          (d) => d.id === service.defaultDuration
        );
        if (defaultDur) {
          priceDisplay.textContent = `₱${defaultDur.price.toFixed(2)}`;
          proceedButton.style.pointerEvents = "auto";
          proceedButton.style.opacity = "1";

          // Update sidebar price and enable button
          const sidebarPrice = document.getElementById("summary-price");
          const sidebarBtn = document.getElementById("sidebar-proceed-button");
          if (sidebarPrice) {
            sidebarPrice.textContent = `P${defaultDur.price.toFixed(2)}`;
          }
          if (sidebarBtn) {
            sidebarBtn.classList.remove("disabled");
            sidebarBtn.textContent = "Continue Booking";
            sidebarBtn.onclick = () => {
              selectServiceAndRedirect(service, service.defaultDuration);
              return false;
            };
          }

          // Show inclusions
          if (service.inclusions && service.inclusions.length > 0) {
            inclusionsList.innerHTML = service.inclusions
              .map((inc) => `<li>${inc}</li>`)
              .join("");
            inclusionsDiv.style.display = "block";
          }
        }
      }
    }

    // Handle duration selection change
    durationSelect.addEventListener("change", function () {
      const selectedDurationId = this.value;
      if (!selectedDurationId) {
        priceDisplay.textContent = "Select duration";
        proceedButton.style.pointerEvents = "none";
        proceedButton.style.opacity = "0.5";
        inclusionsDiv.style.display = "none";
        // Also disable sidebar button
        const sidebarBtn = document.getElementById("sidebar-proceed-button");
        if (sidebarBtn) {
          sidebarBtn.classList.add("disabled");
          sidebarBtn.textContent = "Select Duration First";
        }
        return;
      }

      // PHASE 2: Trigger debounced auto-save when duration changes
      triggerServiceSelectionAutoSave(service, selectedDurationId);

      // Get the price directly from the selected slot or duration
      let selectedPrice = null;

      if (service.timeSlots && service.timeSlots.length > 0) {
        const slot = service.timeSlots.find(
          (ts) => ts.id === selectedDurationId
        );
        if (slot) {
          selectedPrice = slot.price;
        }
      } else if (service.durations && service.durations.length > 0) {
        const duration = service.durations.find(
          (d) => d.id === selectedDurationId
        );
        if (duration) {
          selectedPrice = duration.price;
        }
      }

      if (selectedPrice !== null) {
        priceDisplay.textContent = `₱${selectedPrice.toFixed(2)}`;
        proceedButton.style.pointerEvents = "auto";
        proceedButton.style.opacity = "1";

        // Update sidebar price and enable button
        const sidebarPrice = document.getElementById("summary-price");
        const sidebarBtn = document.getElementById("sidebar-proceed-button");
        if (sidebarPrice) {
          sidebarPrice.textContent = `P${selectedPrice.toFixed(2)}`;
        }
        if (sidebarBtn) {
          sidebarBtn.classList.remove("disabled");
          sidebarBtn.textContent = "Continue Booking";
          sidebarBtn.onclick = () => {
            selectServiceAndRedirect(service, selectedDurationId);
            return false;
          };
        }

        // Show inclusions
        if (service.inclusions && service.inclusions.length > 0) {
          inclusionsList.innerHTML = service.inclusions
            .map((inc) => `<li>${inc}</li>`)
            .join("");
          inclusionsDiv.style.display = "block";
        }
      }
    });
  }

  // Set initial price display (will be overridden if default is selected above)
  if (
    !(service.timeSlots && service.timeSlots.length > 0) &&
    !(
      service.durations &&
      service.durations.length > 0 &&
      service.defaultDuration
    )
  ) {
    priceDisplay.textContent = "Select duration";
    proceedButton.style.pointerEvents = "none";
    proceedButton.style.opacity = "0.5";
  }

  // Update the "Proceed" button link
  proceedButton.onclick = () => {
    const selectedDurationId = durationSelect.value;
    if (!selectedDurationId) {
      showModal(
        "Missing Selection",
        "<p>Please select a duration or time slot before proceeding.</p>",
        "warning"
      );
      return false;
    }
    selectServiceAndRedirect(service, selectedDurationId);
    return false;
  };

  // Show Modal
  modal.style.display = "block";
}

/**
 * Saves the selected service to session storage and redirects to the reservation form.
 * @param {object} service - The selected service object.
 * @param {string} durationId - The selected duration or timeslot ID.
 */
function selectServiceAndRedirect(service, durationId) {
  // PHASE 4: Prevent re-selection if payment is in progress
  if (paymentSubmissionInProgress) {
    showModal(
      "Payment In Progress",
      "<p>Your payment is currently being processed. Please wait for the transaction to complete before selecting a new service.</p>",
      "warning"
    );
    console.warn(
      "Service re-selection prevented: payment submission in progress"
    );
    return;
  }

  // Calculate price directly from the service object passed in (don't rely on API cache)
  let price = null;

  // Check timeSlots first
  if (service.timeSlots && service.timeSlots.length > 0) {
    const slot = service.timeSlots.find((ts) => ts.id === durationId);
    if (slot) {
      price = slot.price;
    }
  }
  // Check durations
  else if (service.durations && service.durations.length > 0) {
    const duration = service.durations.find((d) => d.id === durationId);
    if (duration) {
      price = duration.price;
    }
  }

  // Fallback to calculatePriceByDuration if direct lookup failed
  if (price === null) {
    price = calculatePriceByDuration(service.id, durationId, 1);
  }

  const durationLabel = getDurationLabel(service.id, durationId);

  // CRITICAL FIX: Store to BOTH sessionStorage AND localStorage for persistence
  const serviceData = {
    selectedServiceId: service.id, // Frontend ID (e.g., "charm_2")
    selectedServiceName: service.name,
    selectedServicePrice: price || "0",
    selectedServiceMaxGuests: service.max_guests,
    selectedServiceType: service.type,
    selectedDuration: durationId,
    selectedDurationLabel: durationLabel,
    serviceInclusions: service.inclusions
      ? JSON.stringify(service.inclusions)
      : "[]",
  };

  // Save to BOTH storage types for redundancy and persistence
  Object.keys(serviceData).forEach((key) => {
    sessionStorage.setItem(key, serviceData[key]);
    localStorage.setItem(key, serviceData[key]); // Backup in localStorage
  });

  console.log("✅ Service data saved to storage:", serviceData);

  // Auto-save reservation progress for incomplete reservation tracking
  // Saves to 'services-list' because that's the current page
  if (typeof saveReservationProgress === "function") {
    saveReservationProgress("services-list", {
      selectedServiceId: service.id,
      selectedServiceName: service.name,
      selectedServicePrice: price || "0",
      selectedServiceMaxGuests: service.max_guests,
      selectedServiceType: service.type,
      selectedDuration: durationId,
      selectedDurationLabel: durationLabel,
      serviceInclusions: JSON.stringify(service.inclusions),
    });
    console.log("Services selection auto-saved");
  }

  // Require login before proceeding to reserve page
  const user = getLoggedInUser();
  if (!user) {
    showLoginConfirm(
      "Login Required",
      "<p>To complete your reservation, you'll need to log in or create an account.</p><p>You can still browse our amenities as a guest, or proceed to log in now.</p>",
      () => {
        // Login button clicked - redirect to login page
        window.location.href = "login.html?redirect=reserve.html";
      },
      {
        loginText: "Continue to Login",
        browseText: "Keep Browsing",
      }
    );
    return;
  }

  // Redirect to the reservation page
  window.location.href = "reserve.html";
}

// Close the modal when the close button or background is clicked (for service-list.html)
const modal = document.getElementById("serviceModal");
const closeButton = document.querySelector(".close-button");
const summaryContainer = document.getElementById("floating-booking-summary"); // Added for cleanup

if (modal && closeButton) {
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

function renderServiceSelectionSummary() {
  // Look up the service details and display them on reserve.html
  const serviceId = sessionStorage.getItem("selectedServiceId");
  const serviceName = sessionStorage.getItem("selectedServiceName");
  const servicePrice = sessionStorage.getItem("selectedServicePrice");
  const serviceType = sessionStorage.getItem("selectedServiceType");
  const maxGuests = sessionStorage.getItem("selectedServiceMaxGuests");
  const selectedDuration = sessionStorage.getItem("selectedDuration");
  const selectedDurationLabel = sessionStorage.getItem("selectedDurationLabel");

  // Check if the HTML elements exist before setting content
  const serviceDisplay = document.getElementById("selectedServiceDisplay");
  const basePriceDisplay = document.getElementById("basePriceDisplay");
  const basePriceInput = document.getElementById("basePriceInput");
  const durationSelector = document.getElementById("duration-selector");
  const durationDisplay = document.getElementById("duration-display");

  if (serviceDisplay) {
    serviceDisplay.textContent = serviceName || "(No Service Selected)";
  }

  // Populate duration selector
  if (durationSelector && serviceId) {
    // Get the service from active services (API cache or fallback)
    const services = getActiveServices();
    const service = services.find((s) => s.id === serviceId);

    if (service) {
      durationSelector.innerHTML = "";

      // Add timeSlots if available
      if (service.timeSlots && service.timeSlots.length > 0) {
        service.timeSlots.forEach((slot) => {
          const option = document.createElement("option");
          option.value = slot.id;
          option.textContent = `${slot.label} - ₱${slot.price.toFixed(2)}`;
          option.dataset.price = slot.price;
          durationSelector.appendChild(option);
        });
      }
      // Add durations if available
      else if (service.durations && service.durations.length > 0) {
        service.durations.forEach((duration) => {
          const option = document.createElement("option");
          option.value = duration.id;
          option.textContent = `${duration.label} - ₱${duration.price.toFixed(
            2
          )}`;
          option.dataset.price = duration.price;
          durationSelector.appendChild(option);
        });
      }
    } else {
      // Service not found - use session storage data as fallback
      console.warn("Service not found in cache, using sessionStorage data");
      const fallbackPrice = parseFloat(servicePrice || 0).toFixed(2);
      durationSelector.innerHTML = `<option value="${selectedDuration}" data-price="${fallbackPrice}">${
        selectedDurationLabel || "Selected Option"
      } - ₱${fallbackPrice}</option>`;
    }

    // Pre-select the duration from session storage
    if (selectedDuration) {
      durationSelector.value = selectedDuration;
    }

    // Handle duration change
    durationSelector.addEventListener("change", function () {
      const durationId = this.value;
      const selectedOption = this.options[this.selectedIndex];
      const price = parseFloat(selectedOption.dataset.price || 0);

      // Update price displays
      if (basePriceDisplay) basePriceDisplay.textContent = price.toFixed(2);
      if (basePriceInput) basePriceInput.value = price.toFixed(2);

      // Update duration display
      if (durationDisplay) {
        durationDisplay.textContent = `Selected: ${selectedOption.textContent}`;
      }

      // Update hidden inputs
      const selectedDurationInput = document.getElementById(
        "selectedDurationInput"
      );
      const selectedTimeSlotInput = document.getElementById(
        "selectedTimeSlotInput"
      );

      // Determine if it's a timeslot or duration
      if (
        service &&
        service.timeSlots &&
        service.timeSlots.find((ts) => ts.id === durationId)
      ) {
        if (selectedTimeSlotInput) selectedTimeSlotInput.value = durationId;
        if (selectedDurationInput) selectedDurationInput.value = "";
      } else {
        if (selectedDurationInput) selectedDurationInput.value = durationId;
        if (selectedTimeSlotInput) selectedTimeSlotInput.value = "";
      }

      // Recalculate final price with promo
      calculateFinalPrice(price);
    });

    // Trigger initial change to set prices
    if (selectedDuration) {
      durationSelector.dispatchEvent(new Event("change"));
    }
  }

  // Initialize price displays to the base price
  if (basePriceDisplay) {
    basePriceDisplay.textContent = parseFloat(servicePrice || 0).toFixed(2);
  }

  // Also initialize the final total to the base price
  const finalTotalDisplay = document.getElementById("finalTotalDisplay");
  if (finalTotalDisplay) {
    finalTotalDisplay.textContent = parseFloat(servicePrice || 0).toFixed(2);
  }
  // Set discount to 0.00 on load
  const discountDisplay = document.getElementById("discountDisplay");
  if (discountDisplay) {
    discountDisplay.textContent = "0.00";
  }

  // 1. Get references to the hidden inputs
  const serviceIdInput = document.getElementById("serviceIdInput");
  const serviceTypeInput = document.getElementById("serviceTypeInput");
  const finalTotalInput = document.getElementById("finalTotalInput");

  // 2. Set the values (must be done before calculateFinalPrice might overwrite finalTotal)
  if (serviceIdInput) serviceIdInput.value = serviceId || "";
  if (serviceTypeInput) serviceTypeInput.value = serviceType || "";

  // Use the raw float price for the basePrice hidden input
  const initialPriceFloat = parseFloat(servicePrice || 0);
  if (basePriceInput) basePriceInput.value = initialPriceFloat.toFixed(2);
  if (finalTotalInput) finalTotalInput.value = initialPriceFloat.toFixed(2);

  // Set duration hidden inputs
  const selectedDurationInput = document.getElementById(
    "selectedDurationInput"
  );
  const selectedTimeSlotInput = document.getElementById(
    "selectedTimeSlotInput"
  );
  if (selectedDurationInput && selectedDuration) {
    const service = resortServices.find((s) => s.id === serviceId);
    if (
      service &&
      service.timeSlots &&
      service.timeSlots.find((ts) => ts.id === selectedDuration)
    ) {
      selectedTimeSlotInput.value = selectedDuration;
    } else {
      selectedDurationInput.value = selectedDuration;
    }
  }

  // Call calculateFinalPrice to immediately set up the price fields
  if (servicePrice) {
    calculateFinalPrice(initialPriceFloat);
  }
}
// --- END NEW SERVICE SELECTION FUNCTIONS ---

// --- RESERVATION DATE AUTOMATION AND VALIDATION FUNCTIONS ---

/**
 * FEATURE 1: Auto-Calculate Checkout Date/Time Based on Duration
 */
function setupCheckoutAutoCalculation() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const durationSelector = document.getElementById("duration-selector");

  if (!checkinInput || !checkoutInput || !durationSelector) return;

  // Make checkout field readonly with visual indicator
  checkoutInput.readOnly = true;
  checkoutInput.style.backgroundColor = "#f5f5f5";
  checkoutInput.style.cursor = "not-allowed";
  checkoutInput.title =
    "Automatically calculated based on check-in time and duration";

  // Helper: format a Date into a datetime-local compatible string without timezone shift
  function formatLocalDateTime(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  function calculateCheckout() {
    const checkinValue = checkinInput.value;
    const selectedDuration = durationSelector.value;

    if (!checkinValue || !selectedDuration) return;

    const serviceId = sessionStorage.getItem("selectedServiceId");
    const services = getActiveServices();
    const service = services.find((s) => s.id === serviceId);

    if (!service) return;

    let checkinDate = new Date(checkinValue);
    let checkoutDate = new Date(checkinDate);

    // For services with timeSlots (like Private Pool Area)
    if (service.timeSlots && service.timeSlots.length > 0) {
      const slot = service.timeSlots.find((ts) => ts.id === selectedDuration);
      if (slot) {
        if (slot.timeRange === "day") {
          // Day slot: 7am - 5pm (same day)
          checkinDate.setHours(7, 0, 0, 0);
          checkoutDate = new Date(checkinDate);
          checkoutDate.setHours(17, 0, 0, 0);
        } else if (slot.timeRange === "night") {
          // Night slot: 7pm - 5am (next day)
          checkinDate.setHours(19, 0, 0, 0);
          checkoutDate = new Date(checkinDate);
          checkoutDate.setDate(checkoutDate.getDate() + 1);
          checkoutDate.setHours(5, 0, 0, 0);
        }
        // Update checkin input to reflect forced time (keep local time, no timezone shift)
        checkinInput.value = formatLocalDateTime(checkinDate);
      }
    }
    // For services with durations (rooms and halls)
    else if (service.durations && service.durations.length > 0) {
      const duration = service.durations.find((d) => d.id === selectedDuration);
      if (duration && duration.hours) {
        checkoutDate.setHours(checkoutDate.getHours() + duration.hours);
      }
    }

    // Keep local time when writing to datetime-local input to avoid UTC conversion
    checkoutInput.value = formatLocalDateTime(checkoutDate);
  }

  // Attach listeners
  checkinInput.addEventListener("change", calculateCheckout);
  durationSelector.addEventListener("change", calculateCheckout);

  // Calculate immediately if values exist
  if (checkinInput.value && durationSelector.value) {
    calculateCheckout();
  }
}

/**
 * FEATURE 2: Validate Against Blocked Dates and Existing Reservations
 */
async function setupDateValidation() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const form = document.getElementById("reservationForm");

  if (!checkinInput || !form) return;

  async function validateDates() {
    const serviceId = sessionStorage.getItem("selectedServiceId");
    const checkinValue = checkinInput.value;
    const checkoutValue = checkoutInput.value;

    if (!serviceId || !checkinValue || !checkoutValue) return true;

    const checkinDate = new Date(checkinValue);
    const checkoutDate = new Date(checkoutValue);

    try {
      // Fetch blocked dates
      const blockedResponse = await fetch(
        "http://localhost:3000/api/blocked-dates"
      );
      if (!blockedResponse.ok) throw new Error("Failed to fetch blocked dates");

      const blockedData = await blockedResponse.json();
      // Handle both array and object responses
      const blockedDates = Array.isArray(blockedData)
        ? blockedData
        : blockedData.blockedDates || [];

      // Check each blocked date range
      for (const block of blockedDates) {
        const blockStart = new Date(block.startDate);
        const blockEnd = new Date(block.endDate);

        // Check if service is affected (null/empty means all services)
        const isServiceBlocked =
          !block.serviceIds ||
          block.serviceIds.length === 0 ||
          block.serviceIds.includes(serviceId);

        if (isServiceBlocked) {
          // Check if dates overlap
          if (checkinDate <= blockEnd && checkoutDate >= blockStart) {
            const blockStartStr = blockStart.toLocaleDateString();
            const blockEndStr = blockEnd.toLocaleDateString();
            alert(
              `❌ This service is unavailable from ${blockStartStr} to ${blockEndStr}.\n\nReason: ${block.reason}\n\nPlease select different dates.`
            );
            checkinInput.value = "";
            checkoutInput.value = "";
            return false; // IMPORTANT: Return false to block submission
          }
        }
      }

      // Check existing reservations for conflicts
      const availabilityResponse = await fetch(
        "http://localhost:3000/api/reservations/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId,
            checkin_date: checkinValue,
            checkout_date: checkoutValue,
          }),
        }
      );

      if (!availabilityResponse.ok)
        throw new Error("Failed to check availability");

      const availabilityResult = await availabilityResponse.json();

      if (!availabilityResult.available) {
        alert(
          `❌ This service is already booked for the selected dates.\n\nPlease choose different dates or another service.`
        );
        checkinInput.value = "";
        checkoutInput.value = "";
        return false; // IMPORTANT: Return false to block submission
      }

      return true;
    } catch (error) {
      console.error("Error validating dates:", error);
      // Allow reservation if validation service is down (backend will validate)
      return true;
    }
  }

  // Validate on checkin change
  checkinInput.addEventListener("blur", validateDates);

  // Validate before form submission (use capture phase to run BEFORE other handlers)
  form.addEventListener(
    "submit",
    async function (e) {
      const isValid = await validateDates();
      if (!isValid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    },
    true
  ); // capture phase - runs first
}

/**
 * FEATURE 3: Highlight Unavailable Dates for the Selected Service
 */
async function highlightUnavailableDates() {
  const checkinInput = document.getElementById("checkin");
  const availabilitySection = document.getElementById(
    "availabilityCalendarSection"
  );
  const unavailableList = document.getElementById("unavailableDatesList");

  if (!checkinInput) return;

  const serviceId = sessionStorage.getItem("selectedServiceId");
  if (!serviceId) return;

  try {
    // Show the availability section
    if (availabilitySection) {
      availabilitySection.style.display = "block";
    }

    // Fetch blocked dates and reservations in parallel
    const [blockedResponse, reservationsResponse] = await Promise.all([
      fetch("http://localhost:3000/api/blocked-dates"),
      fetch(`http://localhost:3000/api/reservations/service/${serviceId}`),
    ]);

    if (!blockedResponse.ok || !reservationsResponse.ok) {
      throw new Error("Failed to fetch unavailable dates");
    }

    const blockedData = await blockedResponse.json();
    const reservationsData = await reservationsResponse.json();

    // Display the unavailable dates in the new calendar section
    if (unavailableList) {
      const blockedDates = Array.isArray(blockedData)
        ? blockedData
        : blockedData.blockedDates || [];
      const reservations = Array.isArray(reservationsData)
        ? reservationsData
        : reservationsData.reservations || [];

      // Debug logging
      console.log("Service ID:", serviceId);
      console.log("All blocked dates from API:", blockedDates);
      console.log("All reservations:", reservations);

      // Helper function to safely format dates
      const safeFormatDate = (dateValue) => {
        if (!dateValue) return "Invalid Date";
        try {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return "Invalid Date";
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (e) {
          console.error("Date parsing error:", e, dateValue);
          return "Invalid Date";
        }
      };

      let unavailableHTML = "";

      // Get the MongoDB _id for this service
      const services = getActiveServices();
      const currentService = services.find((s) => s.id === serviceId);
      const mongoId = currentService?._id;

      console.log("Current service:", currentService);
      console.log("MongoDB ID:", mongoId);
      console.log("Frontend ID:", serviceId);

      // Filter blocked dates for this service
      // Match either by MongoDB _id OR frontend id
      const relevantBlocks = blockedDates.filter((block) => {
        // If no serviceIds, applies to all services
        if (!block.serviceIds || block.serviceIds.length === 0) {
          console.log("Block applies to ALL services:", block);
          return true;
        }

        // Check if block applies to this service (by MongoDB _id or frontend id)
        const isRelevantById = mongoId && block.serviceIds.includes(mongoId);
        const isRelevantByFrontendId = block.serviceIds.includes(serviceId);
        const isRelevant = isRelevantById || isRelevantByFrontendId;

        console.log(
          "Block:",
          block,
          "ServiceIds:",
          block.serviceIds,
          "Matches MongoDB ID?",
          isRelevantById,
          "Matches Frontend ID?",
          isRelevantByFrontendId,
          "Is relevant?",
          isRelevant
        );
        return isRelevant;
      });

      console.log(
        "Filtered relevant blocks for service",
        serviceId,
        "(MongoDB:",
        mongoId,
        "):",
        relevantBlocks
      );

      // Add blocked dates
      if (relevantBlocks.length > 0) {
        unavailableHTML +=
          '<div style="margin-bottom: 15px;"><strong style="color: #dc3545;">\ud83d\udeab Blocked Dates:</strong><ul style="margin: 5px 0; padding-left: 20px;">';
        relevantBlocks.forEach((block) => {
          const start = safeFormatDate(
            block.startDate || block.start || block.date
          );
          const end = safeFormatDate(block.endDate || block.end);
          unavailableHTML += `<li style="margin: 5px 0;">${start} to ${end} - ${
            block.reason || "Unavailable"
          }</li>`;
        });
        unavailableHTML += "</ul></div>";
      }

      // Add existing reservations
      const confirmedReservations = reservations.filter((r) => {
        // Only include reservations with valid dates and not cancelled
        const hasValidDates =
          (r.check_in || r.checkin_date) && (r.check_out || r.checkout_date);
        return r.status !== "CANCELLED" && hasValidDates;
      });
      if (confirmedReservations.length > 0) {
        unavailableHTML +=
          '<div><strong style="color: #ffc107;">\ud83d\udcc5 Reserved Dates:</strong><ul style="margin: 5px 0; padding-left: 20px;">';
        confirmedReservations.forEach((res) => {
          const checkIn = safeFormatDate(res.check_in || res.checkin_date);
          const checkOut = safeFormatDate(res.check_out || res.checkout_date);
          unavailableHTML += `<li style="margin: 5px 0;">${checkIn} to ${checkOut}</li>`;
        });
        unavailableHTML += "</ul></div>";
      }

      if (!unavailableHTML) {
        unavailableHTML =
          '<p style="color: #28a745; font-weight: bold;">\u2705 All dates are currently available for this service!</p>';
      }

      unavailableList.innerHTML = unavailableHTML;
    }

    // Handle both array and object responses
    const blockedDates = Array.isArray(blockedData)
      ? blockedData
      : blockedData.blockedDates || [];
    const reservations = Array.isArray(reservationsData)
      ? reservationsData
      : reservationsData.reservations || [];

    // Build list of unavailable date ranges
    const unavailableRanges = [];

    // Get MongoDB ID for proper matching
    const services = getActiveServices();
    const currentService = services.find((s) => s.id === serviceId);
    const mongoId = currentService?._id;

    // Add blocked dates
    blockedDates.forEach((block) => {
      // Match by MongoDB _id OR frontend id
      const isServiceBlocked =
        !block.serviceIds ||
        block.serviceIds.length === 0 ||
        block.serviceIds.includes(serviceId) ||
        (mongoId && block.serviceIds.includes(mongoId));
      if (isServiceBlocked) {
        unavailableRanges.push({
          start: new Date(block.startDate),
          end: new Date(block.endDate),
          reason: `🔒 Blocked: ${block.reason}`,
        });
      }
    });

    // Add booked dates
    reservations.forEach((res) => {
      // Only add reservations with valid dates
      const hasValidDates = res.checkin_date && res.checkout_date;
      const isNotCancelled =
        res.status !== "cancelled" && res.status !== "rejected";

      if (isNotCancelled && hasValidDates) {
        const startDate = new Date(res.checkin_date);
        const endDate = new Date(res.checkout_date);

        // Verify dates are valid after parsing
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          unavailableRanges.push({
            start: startDate,
            end: endDate,
            reason: "📅 Already booked",
          });
        }
      }
    });

    // Set min date to today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    checkinInput.min = today.toISOString().slice(0, 16);
  } catch (error) {
    console.error("Error loading unavailable dates:", error);
    // Silently fail - don't block user experience
  }
}

/**
 * FEATURE 4: Edit Service Functionality
 */

/**
 * Load service data into the form for editing
 */
async function editService(serviceId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/services/${serviceId}`
    );
    if (!response.ok) throw new Error("Failed to load service");

    const service = await response.json();

    // Populate basic fields (skip file inputs - cannot programmatically set file values)
    const fields = {
      serviceIdInput: service.id,
      serviceNameInput: service.name,
      serviceTypeInput: service.type,
      serviceCategoryInput: service.category,
      serviceMaxGuestsInput: service.max_guests,
      serviceDescriptionInput: service.description,
      serviceInclusionsInput: service.inclusions
        ? service.inclusions.join(", ")
        : "",
      serviceNotesInput: service.notes || "",
    };

    for (const [id, value] of Object.entries(fields)) {
      const element = document.getElementById(id);
      if (element) {
        element.value = value;
        if (id === "serviceIdInput") element.readOnly = true;
      }
    }

    // Display current image paths (file inputs can't be set programmatically)
    const imageNameDisplay = document.getElementById("serviceImageName");
    const galleryCountDisplay = document.getElementById("serviceGalleryCount");
    if (imageNameDisplay)
      imageNameDisplay.textContent = service.image || "None";
    if (galleryCountDisplay)
      galleryCountDisplay.textContent = service.gallery
        ? service.gallery.length
        : 0;

    // Clear and populate durations/timeSlots
    const durationsContainer = document.getElementById("durationsContainer");
    if (durationsContainer) {
      durationsContainer.innerHTML = "";

      if (service.timeSlots && service.timeSlots.length > 0) {
        service.timeSlots.forEach((slot, index) => {
          addDurationRow();
          const rows = durationsContainer.querySelectorAll(".duration-row");
          const lastRow = rows[rows.length - 1];

          const checkbox = lastRow.querySelector(".timeslot-checkbox");
          if (checkbox) {
            checkbox.checked = true;
            toggleDurationType(checkbox);
          }

          const fields = {
            durationId: slot.id,
            slotLabel: slot.label,
            slotPrice: slot.price,
            timeRange: slot.timeRange,
            guestMin: slot.guestRange?.min || "",
            guestMax: slot.guestRange?.max || "",
          };

          for (const [fieldName, value] of Object.entries(fields)) {
            const input = lastRow.querySelector(`[name="${fieldName}"]`);
            if (input) input.value = value;
          }
        });
      } else if (service.durations && service.durations.length > 0) {
        service.durations.forEach((duration) => {
          addDurationRow();
          const rows = durationsContainer.querySelectorAll(".duration-row");
          const lastRow = rows[rows.length - 1];

          const fields = {
            durationId: duration.id,
            durationLabel: duration.label,
            durationHours: duration.hours,
            durationPrice: duration.price,
          };

          for (const [fieldName, value] of Object.entries(fields)) {
            const input = lastRow.querySelector(`[name="${fieldName}"]`);
            if (input) input.value = value;
          }
        });
      }
    }

    // Update submit button
    const submitBtn = document.querySelector(
      '#createServiceForm button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.textContent = "✏️ Update Service";
      submitBtn.dataset.mode = "edit";
      submitBtn.dataset.serviceId = serviceId;
    }

    // Scroll to form
    const formSection = document.getElementById("service-management");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        document
          .getElementById("createServiceForm")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  } catch (error) {
    console.error("Error loading service for edit:", error);
    alert("❌ Failed to load service data for editing.");
  }
}

/**
 * Cancel editing and reset form to create mode
 */
function cancelServiceEdit() {
  document.getElementById("serviceIdInput").readOnly = false;
  document.getElementById("serviceIdInput").value = "";
  document.getElementById("serviceNameInput").value = "";
  document.getElementById("durationsContainer").innerHTML = "";

  const submitBtn = document.querySelector(
    '#createServiceForm button[type="submit"]'
  );
  if (submitBtn) {
    submitBtn.textContent = "➕ Create Service";
    submitBtn.dataset.mode = "create";
    delete submitBtn.dataset.serviceId;
  }
}

/**
 * Update service via API
 */
async function updateService(serviceId, serviceData) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/services/${serviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update service");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

// --- END RESERVATION DATE AUTOMATION AND VALIDATION FUNCTIONS ---

// --- NEW PROMOTION CALCULATION FUNCTION ---

async function createPromoCode(event) {
  event.preventDefault(); // Stop the form from submitting traditionally

  // ✅ IDs MATCHING admin-dashboard.html
  const code = document.getElementById("newPromoCodeInput").value.trim();
  const discountPercentage = parseFloat(
    document.getElementById("discountPercentageInput").value
  );
  const expirationDate = document.getElementById("expirationDateInput").value;
  const minPurchaseAmount =
    parseFloat(document.getElementById("minPurchaseAmountInput").value) || 0;
  const usageLimit =
    parseInt(document.getElementById("usageLimitInput").value) || 50;
  const statusMessage = document.getElementById("createPromoCodeMessage");

  const promoData = {
    code,
    // Convert the input percentage (e.g., 15) to a decimal (0.15) for your Mongoose schema
    discountPercentage: discountPercentage / 100,
    expirationDate,
    minPurchaseAmount,
    usageLimit,
  };

  // Simple validation before sending to server
  if (!code || isNaN(discountPercentage) || !expirationDate) {
    showModal(
      "Missing Information",
      "<p>Please fill in all required fields:</p><ul><li>Promo Code</li><li>Discount Percentage</li><li>Expiration Date</li></ul>",
      "warning"
    );
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/promocodes/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promoData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Unknown server error.";
      if (statusMessage) {
        statusMessage.textContent = errorMessage;
        statusMessage.style.color = "red";
      } else {
        showModal("Creation Failed", `<p>${errorMessage}</p>`, "error");
      }
      return;
    }

    // Success
    const successMessage = `Promo code ${data.code.code} successfully created!`;
    if (statusMessage) {
      statusMessage.textContent = successMessage;
      statusMessage.style.color = "green";
    } else {
      showToast(successMessage, "success");
    }
    document.getElementById("createPromoCodeForm").reset(); // Reset form using the correct ID

    // Ensure this function exists in script.js to refresh the table
    if (typeof renderPromoCodeTable === "function") {
      renderPromoCodeTable();
    }
  } catch (error) {
    console.error(
      "Network or server connection error during promo code creation:",
      error
    );
    alert(
      "Network error. Could not connect to server. Check if your Node.js server is running."
    );
  }
}

// --- 2. FUNCTION TO FETCH AND RENDER PROMO CODES ---

/**
 * Fetches all promo codes from the API and renders them into the admin dashboard table.
 */
async function renderPromoCodeTable() {
  const tableBody = document.getElementById("promoCodeTableBody");
  if (!tableBody) return;

  tableBody.innerHTML =
    '<tr><td colspan="6" class="text-center">Loading promo codes...</td></tr>';

  try {
    const response = await fetch("http://localhost:3000/api/promocodes/all"); // Call the GET route
    if (!response.ok) {
      throw new Error("Server error fetching promo codes.");
    }

    const codes = await response.json();
    tableBody.innerHTML = ""; // Clear loading message

    if (codes.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="6" class="text-center">No promo codes found.</td></tr>';
      return;
    }

    codes.forEach((code) => {
      const now = new Date();
      const expiration = new Date(code.expirationDate);
      const isExpired = expiration < now;
      const isFullyUsed = code.timesUsed >= code.usageLimit;

      let statusText = "Active";
      let statusClass = "status-badge-active";

      if (isExpired) {
        statusText = "Expired";
        statusClass = "status-badge-inactive";
      } else if (isFullyUsed) {
        statusText = "Used Up";
        statusClass = "status-badge-inactive";
      }

      const row = tableBody.insertRow();
      row.innerHTML = `
                <td><strong>${code.code}</strong></td>
                <td>${(code.discountPercentage * 100).toFixed(0)}% OFF</td>
                <td>${expiration.toLocaleDateString()}</td>
                <td>₱${code.minPurchaseAmount.toFixed(2)}</td>
                <td>${code.timesUsed} / ${code.usageLimit}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>
                    <button class="button-small button-danger" onclick="deletePromoCode('${
                      code._id
                    }')">
                        Delete
                    </button>
                </td>
            `;
    });
  } catch (error) {
    console.error("Network Error during fetching codes:", error);
    tableBody.innerHTML =
      '<tr><td colspan="6" class="text-center text-danger">Network Error: Cannot load data. (Is Node.js running?)</td></tr>';
  }
}

async function deletePromoCode(codeId) {
  showConfirm(
    "Delete Promo Code",
    '<p style="color: red;"><strong>⚠ WARNING</strong></p><p>Are you sure you want to permanently delete this promo code?</p><p>This action cannot be undone.</p>',
    async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/promocodes/${codeId}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to delete promo code.");
        }

        showToast("Promo code deleted successfully.", "success");
        renderPromoCodeTable();
      } catch (error) {
        console.error("Error deleting promo code:", error);
        showModal("Deletion Failed", `<p>${error.message}</p>`, "error");
      }
    },
    { confirmText: "Permanently Delete", cancelText: "Cancel", type: "danger" }
  );
}

/**
 * Fetches a single promo code from the API and checks its validity.
 * @param {string} code - The promo code string to check.
 * @returns {object|null} The valid promo object or null if invalid/not found.
 */
async function getValidPromoCode(code) {
  if (!code || code.length < 3) {
    document.getElementById("promoCodeMessage").textContent = "";
    document.getElementById("promoCodeMessage").style.color = "inherit"; // Reset color too
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/promocodes/${encodeURIComponent(code)}`
    );

    if (!response.ok) {
      // This captures 404 Not Found or other server errors (e.g., code expired/used up)
      // The backend should send a helpful message via the JSON response.
      const errorData = await response.json();
      console.warn("Promo Code Check Failed:", errorData.message);
      // Update the UI message if available (assuming an ID of 'promoCodeMessage' exists on reserve.html)
      document.getElementById(
        "promoCodeMessage"
      ).textContent = `Invalid: ${errorData.message}`;
      document.getElementById("promoCodeMessage").style.color = "red";
      return null;
    }

    const promoCode = await response.json();

    // Success: Clear any error message and show success
    document.getElementById(
      "promoCodeMessage"
    ).textContent = `Code Applied! You receive ${(
      promoCode.discountPercentage * 100
    ).toFixed(0)}% OFF.`;
    document.getElementById("promoCodeMessage").style.color = "green";

    return promoCode;
  } catch (error) {
    console.error("Network error during promo code lookup:", error);
    document.getElementById("promoCodeMessage").textContent =
      "Network Error. Could not verify code.";
    document.getElementById("promoCodeMessage").style.color = "red";
    return null;
  }
}

// Function to update the final total based on applied promo code
async function calculateFinalPrice(basePrice) {
  const promoCodeInput = document.getElementById("promoCodeInput");
  const finalTotalDisplay = document.getElementById("finalTotalDisplay");
  const discountDisplay = document.getElementById("discountDisplay");
  const finalTotalInput = document.getElementById("finalTotalInput");
  const discountValueInput = document.getElementById("discountValueInput");
  const discountCodeInput = document.getElementById("discountCodeInput");

  let finalTotal = basePrice;
  let discountValue = 0;
  let appliedPromo = null;

  if (promoCodeInput && promoCodeInput.value) {
    // 1. Check the code's validity using the new API function
    const promoCodeObject = await getValidPromoCode(
      promoCodeInput.value.trim()
    );

    if (promoCodeObject) {
      // 2. Check Min Purchase Amount
      if (basePrice < promoCodeObject.minPurchaseAmount) {
        const required = promoCodeObject.minPurchaseAmount.toFixed(2);
        document.getElementById(
          "promoCodeMessage"
        ).textContent = `Invalid: Minimum purchase of ₱${required} required.`;
        document.getElementById("promoCodeMessage").style.color = "orange";
        // Code is valid but not applicable, treat as no discount
      } else {
        // 3. Apply the discount
        discountValue = basePrice * promoCodeObject.discountPercentage;
        finalTotal = basePrice - discountValue;
        appliedPromo = promoCodeObject; // Store the valid object
      }
    }
  } else {
    // If the promo input is empty, clear any message
    document.getElementById("promoCodeMessage").textContent = "";
    document.getElementById("promoCodeMessage").style.color = "inherit";
  }

  // 4. Update the UI
  if (discountDisplay) {
    discountDisplay.textContent = `- ₱${discountValue.toFixed(2)}`;
  }
  if (finalTotalDisplay) {
    finalTotalDisplay.textContent = `₱${finalTotal.toFixed(2)}`;
  }

  // Keep hidden form fields in sync with what we show the user so the backend validation matches.
  if (finalTotalInput) {
    finalTotalInput.value = finalTotal.toFixed(2);
  }
  if (discountValueInput) {
    discountValueInput.value = discountValue.toFixed(2);
  }
  if (discountCodeInput) {
    discountCodeInput.value = appliedPromo ? appliedPromo.code : "";
  }

  // 5. CRITICAL: Save the results to sessionStorage for use in submitReservation
  sessionStorage.setItem("finalTotal", finalTotal.toFixed(2));
  sessionStorage.setItem("discountValue", discountValue.toFixed(2));
  // Save the applied promo code (or null) to persist it for the API call
  sessionStorage.setItem(
    "appliedPromoCode",
    appliedPromo ? JSON.stringify(appliedPromo) : null
  );
}

// --- Function to Render Public-Facing Promotions List ---
async function renderPublicPromotions() {
  const container = document.getElementById("active-promotions-list");
  if (!container) return;

  container.innerHTML = "<p>Loading promotions...</p>";
  try {
    const response = await fetch("http://localhost:3000/api/promocodes/all");
    if (!response.ok) throw new Error("Failed to fetch promotions");

    const codes = await response.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const active = (codes || []).filter((code) => {
      const exp = new Date(
        code.expirationDate || code.expires || code.expireAt
      );
      const notExpired = !isNaN(exp.getTime()) ? exp >= today : true;
      const underLimit =
        typeof code.usageLimit === "number"
          ? (code.timesUsed || 0) < code.usageLimit
          : true;
      return notExpired && underLimit;
    });

    if (active.length === 0) {
      container.innerHTML =
        '<p class="no-promos">We currently do not have any active discount codes.</p>';
      return;
    }

    let html = '<div class="promo-grid">';
    active.forEach((promo) => {
      const pct =
        promo.discountPercentage != null
          ? (promo.discountPercentage * 100).toFixed(0)
          : promo.discount || "";
      const exp = new Date(
        promo.expirationDate || promo.expires || promo.expireAt
      ).toLocaleDateString();
      html += `
                <div class="promo-card">
                    <h3>${pct}% OFF!</h3>
                    <p>Use Code:</p>
                    <div class="promo-code-box">
                        <strong>${promo.code}</strong>
                    </div>
                    <p class="expiry-text">Expires: ${exp}</p>
                </div>
            `;
    });
    html += "</div>";
    container.innerHTML = html;
  } catch (error) {
    console.error("Error loading public promotions:", error);
    container.innerHTML = '<p class="error">Could not load promotions.</p>';
  }
}
// Public-facing blocked dates renderer (for index.html)
async function renderPublicBlockedDates() {
  const container = document.getElementById("public-blocked-dates");
  if (!container) return;

  try {
    // Backend exposes a public active list at /api/blocked-dates/active/list
    // Try that endpoint first, then fall back to the generic admin endpoint.
    let response = await fetch(
      "http://localhost:3000/api/blocked-dates/active/list"
    );
    if (!response.ok) {
      response = await fetch("/api/blocked-dates");
    }

    if (!response.ok) throw new Error("Failed to fetch blocked dates");

    const payload = await response.json();

    // Controller may return { success: true, blockedDates: [...] } or { data: [...] } or an array
    const list = payload.blockedDates || payload.data || payload;

    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML =
        '<p class="no-blocks">No blocked dates at the moment.</p>';
      return;
    }

    let html = '<div class="blocked-list">';
    list.forEach((block) => {
      const applies = block.appliesToAll
        ? "All Services"
        : block.serviceIds && block.serviceIds.length
        ? block.serviceIds.join(", ")
        : "Selected Services";
      html += `
                <div class="blocked-card">
                    <strong>${formatDate(block.startDate)} — ${formatDate(
        block.endDate
      )}</strong>
                    <p>${escapeHtml(block.reason || "No reason provided")}</p>
                    <p class="muted">Applies to: ${escapeHtml(applies)}</p>
                </div>
            `;
    });
    html += "</div>";
    container.innerHTML = html;
  } catch (error) {
    console.error("Error loading public blocked dates:", error);
    container.innerHTML = '<p class="error">Could not load blocked dates.</p>';
  }
}

// --- SERVICE MANAGEMENT FUNCTIONS (Admin CRUD) ---

/**
 * Fetch all services from the API and cache them globally.
 * Fetches from MongoDB database (includes both migrated and newly created services).
 * @returns {Promise<Array>} Array of service objects
 */
async function fetchServices() {
  try {
    const response = await fetch("http://localhost:3000/api/services");
    if (!response.ok) {
      console.warn("Failed to fetch services from API; using fallback.");
      return null;
    }
    const services = await response.json();
    // Cache the full list globally
    window.cachedServices = services || [];
    console.log(`✅ Fetched ${services.length} services from database`);
    return window.cachedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}

/**
 * Fetch ALL services including inactive ones (Admin only).
 * @returns {Promise<Array>} Array of all service objects
 */
async function fetchAllServicesAdmin() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/services/admin/all"
    );
    if (!response.ok) {
      console.warn("Failed to fetch all services from API.");
      return [];
    }
    const services = await response.json();
    console.log(
      `✅ Admin fetched ${services.length} services (including inactive)`
    );
    return services;
  } catch (error) {
    console.error("Error fetching all services:", error);
    return [];
  }
}

/**
 * Get services for public pages (filtered by isActive: true).
 * Falls back to hardcoded resortServices if cache is empty.
 * @returns {Array} Active services only
 */
function getActiveServices() {
  // First try cached services from MongoDB
  if (window.cachedServices && Array.isArray(window.cachedServices)) {
    const activeServices = window.cachedServices.filter(
      (s) => s.isActive !== false
    );
    if (activeServices.length > 0) {
      return activeServices;
    }
  }

  // Fallback to hardcoded services if cache is empty
  console.warn("Using hardcoded services as fallback");
  return resortServices.filter((s) => s.isActive !== false);
}

/**
 * Create a new service via API.
 * @param {Object} serviceData - Service object with all required fields
 * @returns {Promise<Object|null>} Created service or null on error
 */
async function createService(serviceData) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in as an admin to create services.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/api/services/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create service.");
    }

    // Refresh the cache
    await fetchServices();
    return data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

/**
 * Deactivate (soft delete) a service by setting isActive: false.
 * @param {string} serviceId - The MongoDB _id of the service
 * @returns {Promise<Object|null>} Updated service or null on error
 */
async function deactivateService(serviceId) {
  const token = localStorage.getItem("token");
  if (!token) {
    showModal(
      "Authentication Required",
      "<p>You must be logged in as an admin to deactivate services.</p>",
      "warning"
    );
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/services/${serviceId}/deactivate`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: false }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to deactivate service.");
    }

    // Refresh the cache
    await fetchServices();
    return data;
  } catch (error) {
    console.error("Error deactivating service:", error);
    throw error;
  }
}

/**
 * Render the services table in the admin dashboard.
 */
async function renderServiceTable() {
  const tableBody = document.getElementById("serviceTableBody");
  if (!tableBody) return;

  try {
    // Admin should see ALL services including inactive ones
    const services = await fetchAllServicesAdmin();

    if (services.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="7" class="text-center">No services found.</td></tr>';
      return;
    }

    tableBody.innerHTML = "";
    services.forEach((service) => {
      const statusBadge =
        service.isActive !== false
          ? '<span style="color: green; font-weight: bold;">✓ Active</span>'
          : '<span style="color: gray; font-weight: bold;">✗ Inactive</span>';

      const actionBtn =
        service.isActive !== false
          ? `<button class="button-secondary" onclick="editService('${service._id}')" style="margin-right: 5px;">✏️ Edit</button><button class="button-danger" onclick="deactivateServiceAndRefresh('${service._id}')">🗑️ Deactivate</button>`
          : `<button class="button-primary" onclick="activateServiceAndRefresh('${service._id}')" style="margin-right: 5px;">✅ Activate</button><button class="button-secondary" onclick="editService('${service._id}')">✏️ Edit</button>`;

      const row = tableBody.insertRow();
      row.innerHTML = `
                <td><small>${service.id || service._id}</small></td>
                <td><strong>${service.name}</strong></td>
                <td>${service.type}</td>
                <td>${service.category}</td>
                <td>${service.max_guests}</td>
                <td>${statusBadge}</td>
                <td>${actionBtn}</td>
            `;
    });
  } catch (error) {
    console.error("Error rendering service table:", error);
    tableBody.innerHTML =
      '<tr><td colspan="7" class="text-center text-danger">Error loading services.</td></tr>';
  }
}

/**
 * Deactivate a service and refresh the table and cache.
 */
async function deactivateServiceAndRefresh(serviceId) {
  showConfirm(
    "Deactivate Service",
    "<p>Are you sure you want to deactivate this service?</p><p>It will no longer appear in public listings, but can be reactivated later.</p>",
    async () => {
      try {
        await deactivateService(serviceId);
        showToast("Service deactivated successfully.", "success");
        renderServiceTable();
      } catch (error) {
        showModal("Deactivation Failed", `<p>${error.message}</p>`, "error");
      }
    },
    { confirmText: "Deactivate", cancelText: "Cancel", type: "danger" }
  );
}

/**
 * Activate a service and refresh the table.
 */
async function activateServiceAndRefresh(serviceId) {
  showConfirm(
    "Activate Service",
    "<p>Are you sure you want to activate this service?</p><p>It will appear in public listings again.</p>",
    async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        showModal(
          "Authentication Required",
          "<p>You must be logged in as an admin to activate services.</p>",
          "warning"
        );
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/services/${serviceId}/activate`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to activate service.");
        }

        showToast("Service activated successfully.", "success");
        renderServiceTable();
        await fetchServices(); // Refresh public cache
      } catch (error) {
        console.error("Error activating service:", error);
        showModal("Activation Failed", `<p>${error.message}</p>`, "error");
      }
    },
    { confirmText: "Activate", cancelText: "Cancel", type: "info" }
  );
}

/**
 * Handle the create service form submission.
 */
async function handleCreateServiceForm(event) {
  event.preventDefault();

  const id = document.getElementById("serviceIdInput").value.trim();
  const name = document.getElementById("serviceNameInput").value.trim();
  const type = document.getElementById("serviceTypeInput").value;
  const category = document.getElementById("serviceCategoryInput").value;
  const max_guests = parseInt(
    document.getElementById("serviceMaxGuestsInput").value,
    10
  );
  const description = document
    .getElementById("serviceDescriptionInput")
    .value.trim();

  // Handle file inputs for image and gallery
  const serviceImageInput = document.getElementById("serviceImageInput");
  const serviceGalleryInput = document.getElementById("serviceGalleryInput");

  // Check if main image is selected
  if (!serviceImageInput.files || serviceImageInput.files.length === 0) {
    showModal(
      "Missing Image",
      "<p>Please select a main image for this service.</p>",
      "warning"
    );
    return;
  }

  // Convert file names to image paths (format: images/filename.jpg)
  const image = "images/" + serviceImageInput.files[0].name;

  // Convert gallery files to image paths
  let gallery = [];
  if (
    serviceGalleryInput &&
    serviceGalleryInput.files &&
    serviceGalleryInput.files.length > 0
  ) {
    gallery = Array.from(serviceGalleryInput.files).map(
      (file) => "images/" + file.name
    );
  }

  const inclusionsStr = document
    .getElementById("serviceInclusionsInput")
    .value.trim();
  const notes = document.getElementById("serviceNotesInput").value.trim();

  if (!id || !name || !type || !category || !max_guests || !description) {
    showModal(
      "Missing Information",
      "<p>Please fill in all required fields before submitting.</p>",
      "warning"
    );
    return;
  }

  // Parse inclusions
  const inclusions = inclusionsStr
    ? inclusionsStr.split(",").map((i) => i.trim())
    : [];

  // Collect durations/timeSlots from the DOM
  const durationRows = document.querySelectorAll(".duration-row");
  const durations = [];
  const timeSlots = [];

  durationRows.forEach((row) => {
    const isTimeSlot = row.querySelector(".duration-is-timeslot").checked;
    const durationId = row.querySelector(".duration-id").value.trim();
    const durationLabel = row.querySelector(".duration-label").value.trim();
    const durationPrice = parseFloat(
      row.querySelector(".duration-price").value
    );

    if (!durationId || !durationLabel || isNaN(durationPrice)) {
      showModal(
        "Incomplete Fields",
        "<p>Please fill in all duration/timeslot fields.</p>",
        "warning"
      );
      return;
    }

    if (isTimeSlot) {
      // Time slot (for venues with guest ranges)
      const guestMin = parseInt(
        row.querySelector(".duration-guest-min").value,
        10
      );
      const guestMax = parseInt(
        row.querySelector(".duration-guest-max").value,
        10
      );
      const timeRange = row.querySelector(".duration-time-range").value;

      if (isNaN(guestMin) || isNaN(guestMax) || !timeRange) {
        showModal(
          "Incomplete Timeslot",
          "<p>Please fill in guest range and time range for all timeslots.</p>",
          "warning"
        );
        return;
      }

      timeSlots.push({
        id: durationId,
        label: durationLabel,
        timeRange,
        guestRange: { min: guestMin, max: guestMax },
        price: durationPrice,
      });
    } else {
      // Duration (for accommodations)
      const hours = parseInt(row.querySelector(".duration-hours").value, 10);

      if (isNaN(hours)) {
        showModal(
          "Incomplete Duration",
          "<p>Please fill in the number of hours for all durations.</p>",
          "warning"
        );
        return;
      }

      durations.push({
        id: durationId,
        label: durationLabel,
        hours,
        price: durationPrice,
      });
    }
  });

  if (durations.length === 0 && timeSlots.length === 0) {
    showModal(
      "Missing Duration",
      "<p>Please add at least one duration or timeslot for this service.</p>",
      "warning"
    );
    return;
  }

  // Build the service object
  const serviceData = {
    id,
    name,
    type,
    category,
    max_guests,
    description,
    image,
    gallery,
    inclusions,
    notes: notes || "",
    isActive: true,
  };

  if (durations.length > 0) {
    serviceData.durations = durations;
    serviceData.defaultDuration = durations[0].id;
  }

  if (timeSlots.length > 0) {
    serviceData.timeSlots = timeSlots;
  }

  try {
    // Check if we're in edit or create mode
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const mode = submitBtn?.dataset.mode || "create";
    const editServiceId = submitBtn?.dataset.serviceId;

    let result;

    if (mode === "edit" && editServiceId) {
      // UPDATE existing service
      result = await updateService(editServiceId, serviceData);
      const statusMessage = document.getElementById("createServiceMessage");
      if (statusMessage) {
        statusMessage.textContent = "✅ Service updated successfully!";
        statusMessage.style.color = "green";
      }
      renderServiceTable();
      cancelServiceEdit();
    } else {
      // CREATE new service
      result = await createService(serviceData);
      const statusMessage = document.getElementById("createServiceMessage");
      if (statusMessage) {
        statusMessage.textContent = "✅ Service created successfully!";
        statusMessage.style.color = "green";
      }
      document.getElementById("createServiceForm").reset();
      document.getElementById("durationsContainer").innerHTML = "";
    }

    await fetchServices();
    renderServiceTable();
  } catch (error) {
    const messageEl = document.getElementById("createServiceMessage");
    if (messageEl) {
      messageEl.textContent = `❌ ${error.message}`;
      messageEl.style.color = "red";
    } else {
      alert(`Error: ${error.message}`);
    }
  }
}

/**
 * Add a new duration/timeslot row to the form.
 */
function addDurationRow() {
  const container = document.getElementById("durationsContainer");
  const rowIndex = container.children.length;

  const row = document.createElement("div");
  row.className = "duration-row";
  row.style.cssText =
    "display: flex; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-radius: 4px; align-items: flex-start; flex-wrap: wrap;";

  row.innerHTML = `
        <div style="flex: 0 0 100%; display: flex; align-items: center; gap: 10px;">
            <label style="margin: 0;"><input type="checkbox" class="duration-is-timeslot" onchange="toggleDurationType(this)"> This is a Time Slot (for venues)</label>
            <button type="button" class="button-danger" onclick="this.parentElement.parentElement.remove()" style="flex: 0 0 auto; padding: 5px 10px;">Remove</button>
        </div>
        
        <div style="flex: 1 1 20%; min-width: 150px;">
            <label style="font-size: 0.9rem;">ID</label>
            <input type="text" class="duration-id" placeholder="e.g., duration_12h" required>
        </div>
        <div style="flex: 1 1 30%; min-width: 180px;">
            <label style="font-size: 0.9rem;">Label</label>
            <input type="text" class="duration-label" placeholder="e.g., 12 Hours" required>
        </div>
        <div style="flex: 1 1 20%; min-width: 120px; duration-type-duration">
            <label style="font-size: 0.9rem;">Hours</label>
            <input type="number" class="duration-hours" placeholder="12" min="1">
        </div>
        <div style="flex: 1 1 20%; min-width: 120px;">
            <label style="font-size: 0.9rem;">Price (₱)</label>
            <input type="number" class="duration-price" placeholder="3000" step="0.01" required>
        </div>
        
        <!-- Hidden fields for timeslots (shown when toggled) -->
        <div style="flex: 1 1 100%; border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px; display: none;" class="duration-timeslot-fields">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <div style="flex: 1 1 20%; min-width: 120px;">
                    <label style="font-size: 0.9rem;">Time Range</label>
                    <select class="duration-time-range">
                        <option value="">-- Select --</option>
                        <option value="day">Day</option>
                        <option value="night">Night</option>
                    </select>
                </div>
                <div style="flex: 1 1 20%; min-width: 120px;">
                    <label style="font-size: 0.9rem;">Min Guests</label>
                    <input type="number" class="duration-guest-min" placeholder="30" min="1">
                </div>
                <div style="flex: 1 1 20%; min-width: 120px;">
                    <label style="font-size: 0.9rem;">Max Guests</label>
                    <input type="number" class="duration-guest-max" placeholder="40" min="1">
                </div>
            </div>
        </div>
    `;

  container.appendChild(row);
}

/**
 * Toggle between duration and timeslot fields.
 */
function toggleDurationType(checkbox) {
  const row = checkbox.closest(".duration-row");
  const hoursField = row.querySelector("[duration-type-duration]");
  const timeSlotFields = row.querySelector(".duration-timeslot-fields");

  if (checkbox.checked) {
    // Show timeslot fields, hide hours
    hoursField.style.display = "none";
    timeSlotFields.style.display = "block";
    row.querySelector(".duration-hours").required = false;
    row.querySelector(".duration-time-range").required = true;
    row.querySelector(".duration-guest-min").required = true;
    row.querySelector(".duration-guest-max").required = true;
  } else {
    // Show hours, hide timeslot fields
    hoursField.style.display = "flex";
    timeSlotFields.style.display = "none";
    row.querySelector(".duration-hours").required = true;
    row.querySelector(".duration-time-range").required = false;
    row.querySelector(".duration-guest-min").required = false;
    row.querySelector(".duration-guest-max").required = false;
  }
}

// --- END SERVICE MANAGEMENT FUNCTIONS ---

// DOM initialization for admin widgets and public displays
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch services from API and cache them globally
  await fetchServices();

  // Admin block-date elements
  window.blockDateForm = document.getElementById("blockDateForm");
  window.blockStartDate = document.getElementById("blockStartDate");
  window.blockEndDate = document.getElementById("blockEndDate");
  window.blockReason = document.getElementById("blockReason");
  window.serviceCheckboxes = document.getElementById("serviceCheckboxes");
  window.blockedDatesList = document.getElementById("blockedDatesList");

  // Fetch services first to ensure MongoDB IDs are available for blocking
  fetchServices()
    .then(() => {
      if (serviceCheckboxes) loadServicesForBlocking();
      if (blockDateForm) setupBlockDateForm();
      if (blockedDatesList) loadBlockedDates();
    })
    .catch((err) => {
      console.warn("Failed to fetch services:", err);
      // Still try to load in case of network error
      if (serviceCheckboxes) loadServicesForBlocking();
      if (blockDateForm) setupBlockDateForm();
      if (blockedDatesList) loadBlockedDates();
    });

  // Promo code admin actions
  const promoCreateForm = document.getElementById("createPromoCodeForm");
  if (promoCreateForm)
    promoCreateForm.addEventListener("submit", createPromoCode);
  if (document.getElementById("promoCodeTableBody")) renderPromoCodeTable();

  // Service admin actions
  const serviceCreateForm = document.getElementById("createServiceForm");
  const addDurationBtn = document.getElementById("addDurationBtn");

  // Setup file input listeners for service image and gallery
  const serviceImageInput = document.getElementById("serviceImageInput");
  const serviceGalleryInput = document.getElementById("serviceGalleryInput");

  if (serviceImageInput) {
    serviceImageInput.addEventListener("change", function (e) {
      const files = e.target.files;
      const nameDisplay = document.getElementById("serviceImageName");
      if (files.length > 0) {
        nameDisplay.textContent = files[0].name;
      } else {
        nameDisplay.textContent = "None";
      }
    });
  }

  if (serviceGalleryInput) {
    serviceGalleryInput.addEventListener("change", function (e) {
      const files = e.target.files;
      const countDisplay = document.getElementById("serviceGalleryCount");
      countDisplay.textContent = files.length;
    });
  }

  if (serviceCreateForm)
    serviceCreateForm.addEventListener("submit", handleCreateServiceForm);
  if (addDurationBtn)
    addDurationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addDurationRow();
    });
  if (document.getElementById("serviceTableBody")) {
    fetchServices().then(() => renderServiceTable());
  }

  // Admin reservations
  if (document.getElementById("admin-reservation-list"))
    renderAdminReservations();

  // Public-facing sections on index.html
  if (document.getElementById("active-promotions-list"))
    renderPublicPromotions();
  if (document.getElementById("public-blocked-dates"))
    renderPublicBlockedDates();

  // If on the reservation page, prefill guest details when logged in
  if (document.getElementById("guestDetailsForm"))
    checkLoginStatusForReservation();

  // Navigation render
  renderNavigation();
});
// Ensure this runs when the promotions.html loa

async function reserveNow(event) {
  event.preventDefault(); // Stop default form submission

  // PHASE 5: Check if submission is already in progress (prevent double-click)
  if (reservationSubmissionInProgress) {
    console.warn(
      "Reservation submission already in progress, ignoring duplicate request"
    );
    showModal(
      "Submission In Progress",
      "<p>Your reservation is currently being submitted. Please wait...</p>",
      "warning"
    );
    return;
  }

  // Set submission lock
  reservationSubmissionInProgress = true;

  // Disable submit button to provide visual feedback
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
  }

  const numberOfGuests = document.getElementById("guests").value;
  const maxGuestsInput = document.getElementById("maxGuestsAllowed");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  // --- Validation 1: Max Guest Limit ---
  if (maxGuestsInput) {
    const maxGuests = parseInt(maxGuestsInput.value, 10);
    if (parseInt(numberOfGuests, 10) > maxGuests) {
      alert(
        `The selected service only allows a maximum of ${maxGuests} guests. Please adjust the number of guests.`
      );
      resetReserveSubmissionLock(); // PHASE 5: Reset lock on validation failure
      return; // Stop the submission
    }
  } else {
    // If maxGuestsAllowed input is missing, skip client-side validation but warn
    console.warn(
      "Missing 'maxGuestsAllowed' element for client-side validation."
    );
  }

  // --- Validation 2: Blocked Dates Validation (Before submission) ---
  const serviceId = sessionStorage.getItem("selectedServiceId");
  const checkinValue = checkinInput?.value;
  const checkoutValue = checkoutInput?.value;

  if (serviceId && checkinValue && checkoutValue) {
    try {
      const blockedResponse = await fetch(
        "http://localhost:3000/api/blocked-dates"
      );
      if (blockedResponse.ok) {
        const blockedData = await blockedResponse.json();
        const blockedDates = Array.isArray(blockedData)
          ? blockedData
          : blockedData.blockedDates || [];

        // Get MongoDB ID for proper matching
        const services = getActiveServices();
        const currentService = services.find((s) => s.id === serviceId);
        const mongoId = currentService?._id;

        const checkinDate = new Date(checkinValue);
        const checkoutDate = new Date(checkoutValue);
        checkinDate.setHours(0, 0, 0, 0);
        checkoutDate.setHours(23, 59, 59, 999);

        console.log("Validating reservation dates:", {
          serviceId,
          mongoId,
          checkin: checkinDate,
          checkout: checkoutDate,
        });

        // Check each blocked date range
        for (const block of blockedDates) {
          const blockStart = new Date(block.startDate);
          const blockEnd = new Date(block.endDate);
          blockStart.setHours(0, 0, 0, 0);
          blockEnd.setHours(23, 59, 59, 999);

          // Check if service is affected - match by MongoDB _id OR frontend id
          const isServiceBlocked =
            !block.serviceIds ||
            block.serviceIds.length === 0 ||
            block.serviceIds.includes(serviceId) ||
            (mongoId && block.serviceIds.includes(mongoId));

          console.log("Checking block:", {
            blockStart,
            blockEnd,
            reason: block.reason,
            serviceIds: block.serviceIds,
            isServiceBlocked,
          });

          if (isServiceBlocked) {
            // Check if dates overlap
            if (checkinDate <= blockEnd && checkoutDate >= blockStart) {
              const blockStartStr = blockStart.toLocaleDateString();
              const blockEndStr = blockEnd.toLocaleDateString();
              showModal(
                "Reservation Blocked",
                `<p style="color: #dc3545; font-weight: bold;">❌ This service is unavailable during your selected dates.</p>
                                <p><strong>Blocked Period:</strong> ${blockStartStr} to ${blockEndStr}</p>
                                <p><strong>Reason:</strong> ${block.reason}</p>
                                <p style="margin-top: 15px;">Please select different dates for your reservation.</p>`,
                "error"
              );
              console.log("RESERVATION BLOCKED - Date overlap detected");
              // PHASE 3: Do NOT clear incomplete - user might fix dates and resubmit
              resetReserveSubmissionLock(); // Re-enable submit button
              return; // BLOCK SUBMISSION
            }
          }
        }
      }
    } catch (error) {
      console.error("Error checking blocked dates before submission:", error);
      // Don't block submission if the check fails - let backend validation handle it
    }

    // --- Validation 3: Double Booking Prevention (CRITICAL) ---
    try {
      // Get MongoDB ID for proper matching
      const services = getActiveServices();
      const currentService = services.find((s) => s.id === serviceId);
      const mongoId = currentService?._id;

      // CRITICAL FIX: Use the correct endpoint with serviceId parameter
      const serviceIdForQuery = mongoId || serviceId;
      const reservationsResponse = await fetch(
        `http://localhost:3000/api/reservations/service/${serviceIdForQuery}`
      );
      if (reservationsResponse.ok) {
        const reservationsData = await reservationsResponse.json();
        const allReservations = Array.isArray(reservationsData)
          ? reservationsData
          : reservationsData.reservations || [];

        const checkinDate = new Date(checkinValue);
        const checkoutDate = new Date(checkoutValue);

        console.log("Checking for double bookings:", {
          serviceId,
          mongoId,
          checkin: checkinDate,
          checkout: checkoutDate,
          totalReservations: allReservations.length,
        });

        // Check each existing reservation
        for (const reservation of allReservations) {
          // Skip cancelled reservations
          if (
            reservation.status === "CANCELLED" ||
            reservation.status === "cancelled"
          ) {
            continue;
          }

          // Check if it's for the same service (match by MongoDB _id OR frontend id)
          const isSameService =
            reservation.serviceId === serviceId ||
            reservation.serviceId === mongoId ||
            (mongoId && reservation.serviceId === mongoId);

          if (!isSameService) {
            continue; // Different service, no conflict
          }

          // Parse existing reservation dates
          const existingCheckin = new Date(
            reservation.check_in || reservation.checkin_date
          );
          const existingCheckout = new Date(
            reservation.check_out || reservation.checkout_date
          );

          // Check for date overlap (any overlap is a conflict)
          // Overlap occurs if: new check-in < existing check-out AND new check-out > existing check-in
          const hasOverlap =
            checkinDate < existingCheckout && checkoutDate > existingCheckin;

          if (hasOverlap) {
            const existingCheckinStr = existingCheckin.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            const existingCheckoutStr = existingCheckout.toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            showModal(
              "Double Booking Detected",
              `<p style="color: #dc3545; font-weight: bold;">❌ This service is already booked during your selected time.</p>
                            <p><strong>Existing Reservation:</strong></p>
                            <ul style="list-style: none; padding-left: 0; margin: 10px 0;">
                                <li>📅 Check-in: ${existingCheckinStr}</li>
                                <li>📅 Check-out: ${existingCheckoutStr}</li>
                                <li>👤 Customer: ${
                                  reservation.full_name || "Reserved"
                                }</li>
                                <li>🔖 Status: ${
                                  reservation.status || "PENDING"
                                }</li>
                            </ul>
                            <p style="margin-top: 15px; font-weight: bold;">Please select different dates or choose another service.</p>`,
              "error"
            );

            console.log("DOUBLE BOOKING PREVENTED:", {
              attemptedCheckin: checkinDate,
              attemptedCheckout: checkoutDate,
              conflictingReservation: {
                id: reservation._id,
                checkin: existingCheckin,
                checkout: existingCheckout,
                customer: reservation.full_name,
                status: reservation.status,
              },
            });

            // PHASE 3: Do NOT clear incomplete - user might fix dates and resubmit
            resetReserveSubmissionLock(); // Re-enable submit button
            return; // BLOCK SUBMISSION
          }
        }

        console.log("✅ No double booking conflicts found");
      }
    } catch (error) {
      console.error("Error checking for double bookings:", error);
      // Don't block submission if the check fails - let backend validation handle it as last resort
    }
  }
  // --- End Validation ---

  // Collect all data (including guest details) from the form
  const formData = new FormData(event.target);
  const reservationData = Object.fromEntries(formData.entries());

  // --- CRITICAL FIX: RECOVER AND RE-INJECT FROM STORAGE AS A FAILSAFE ---
  // Try sessionStorage first, fallback to localStorage
  recoverServiceDataFromStorage(); // Ensure data is in sessionStorage

  const serviceTypeName = sessionStorage.getItem("selectedServiceName");
  const serviceIdValue = sessionStorage.getItem("selectedServiceId");

  // CRITICAL: Always use the custom frontend ID (e.g., "charm_room_4")
  // Backend will handle finding the service by this ID
  const finalServiceId = serviceIdValue;

  console.log("📋 Service ID for submission:", {
    serviceId: finalServiceId,
    serviceName: serviceTypeName,
  });

  if (serviceTypeName && finalServiceId) {
    reservationData.serviceType = serviceTypeName;
    reservationData.serviceId = finalServiceId; // Use frontend ID
  } else {
    // Critical alert if data is STILL missing, which means the initial selection failed.
    alert(
      "Error: Required service data is missing. Please re-select a service."
    );
    return; // Stop submission
  }

  // Add discount code and value from promo calculation
  const appliedPromoCode = sessionStorage.getItem("appliedPromoCode");
  const discountValue = sessionStorage.getItem("discountValue");
  const promoCodeInput = document.getElementById("promoCodeInput");

  if (appliedPromoCode && appliedPromoCode !== "null") {
    const promoObj = JSON.parse(appliedPromoCode);
    reservationData.discountCode = promoObj.code;
    reservationData.discountValue = parseFloat(discountValue || 0);
  } else if (promoCodeInput && promoCodeInput.value) {
    // User entered a code but it wasn't valid
    reservationData.discountCode = null;
    reservationData.discountValue = 0;
  }

  // Ensure duration/timeslot values are included
  if (!reservationData.selectedDuration && !reservationData.selectedTimeSlot) {
    alert(
      "Error: Duration or time slot not selected. Please refresh and try again."
    );
    return;
  }
  // --- END FAILSAFE ---

  // --- DUPLICATE PREVENTION CHECK ---
  // Check if we're resuming a reservation that was already submitted
  const isResuming = sessionStorage.getItem("resuming_reservation");
  const currentReservationId = sessionStorage.getItem("current_reservation_id");

  if (isResuming === "true" && currentReservationId) {
    // This is a resumed reservation that was already submitted to backend
    // Store form data in sessionStorage for payment page
    const guests = document.getElementById("guests")?.value || "";
    const checkinDate = document.getElementById("checkin")?.value || "";
    const checkoutDate = document.getElementById("checkout")?.value || "";
    const customerName = document.getElementById("name")?.value || "";
    const customerContact = document.getElementById("contact")?.value || "";
    const customerEmail = document.getElementById("email")?.value || "";
    const finalTotal = document.getElementById("finalTotalInput")?.value || "";

    sessionStorage.setItem("guests", guests);
    sessionStorage.setItem("checkinDate", checkinDate);
    sessionStorage.setItem("checkoutDate", checkoutDate);
    sessionStorage.setItem("customerName", customerName);
    sessionStorage.setItem("customerContact", customerContact);
    sessionStorage.setItem("customerEmail", customerEmail);
    sessionStorage.setItem("finalTotal", finalTotal);

    // Skip API call and redirect directly to payment page
    console.log("Resuming existing reservation:", currentReservationId);
    const paymentUrl = `payment.html?reservationId=${currentReservationId}&hash=${sessionStorage.getItem(
      "current_reservation_hash"
    )}`;
    window.location.href = paymentUrl;
    return;
  }
  // --- END DUPLICATE PREVENTION ---

  try {
    const response = await fetch(
      "http://localhost:3000/api/reservations/create-reservation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let message = errorText;
      try {
        const parsed = JSON.parse(errorText);
        message = parsed.message || JSON.stringify(parsed);
      } catch (e) {
        // not JSON
      }
      console.error("Reservation API returned error", response.status, message);
      alert("Reservation failed: " + message);
      resetReserveSubmissionLock(); // Re-enable submit button
      return;
    }

    const result = await response.json();

    if (result.success) {
      // --- CRITICAL FIX: Ensure the redirection happens without being blocked ---

      // 1. Give a subtle confirmation (alert can sometimes pause scripts)
      console.log("Server response received:", result); // Should show the JSON object

      // 1.a Store the reservation locally so dashboards/profile can reflect it immediately
      storeReservationLocally(result, reservationData);

      // 1.b Store reservation ID and hash for potential resume scenarios
      sessionStorage.setItem("current_reservation_id", result.reservationId);
      sessionStorage.setItem(
        "current_reservation_hash",
        result.reservationHash
      );

      // 1.c Store form data in BOTH sessionStorage AND localStorage for payment page to retrieve
      const paymentData = {
        customerName: reservationData.customer_name || "",
        finalTotal: reservationData.finalTotal || "0.00",
      };
      sessionStorage.setItem("customerName", paymentData.customerName);
      sessionStorage.setItem("finalTotal", paymentData.finalTotal);
      localStorage.setItem("customerName", paymentData.customerName);
      localStorage.setItem("finalTotal", paymentData.finalTotal);

      console.log("💾 Payment data saved to storage:", paymentData);

      // 2. Clear the form data and temp storage if needed (optional)
      // event.target.reset();

      // 2.a Reset submission lock for this flow
      resetReserveSubmissionLock();

      // 2.b Clear incomplete reservation tracker since this submission succeeded
      clearIncompleteReservation();

      // 3. Force the redirect with the required parameters
      const paymentUrl = `payment.html?reservationId=${result.reservationId}&hash=${result.reservationHash}`;
      console.log("Attempting final redirect to:", paymentUrl);

      // Use the variable that contains the full URL with parameters!
      window.location.href = paymentUrl;
      // Note: The script execution STOPS here because the browser navigates to a new page.
    } else {
      // Display server-side validation error
      alert("Reservation failed: " + result.message);
      resetReserveSubmissionLock(); // Re-enable submit button
    }
  } catch (error) {
    console.error("Frontend error during reservation:", error);
    alert("An unexpected error occurred. Please try again.");
    resetReserveSubmissionLock(); // Re-enable submit button
  }
}

// Ensure the form submission listener points to the reserveNow function

// --- END DFD 10.0 Reservation Submission Logic ---

// --- Payment Handlers ---

// --- Code to get URL parameters (add this to the top of your payment processing function) ---
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name); // Returns null if not found
}

// script.js (Replace the entire function)
/**
 * Finalizes the reservation by sending the unique hash and payment reference
 * to the server to update the PENDING record to PAID/CONFIRMED.
 */
// PHASE 5: Global submission lock for reserve form to prevent double-click duplicates
let reservationSubmissionInProgress = false;

// PHASE 4: Global submission lock for payment form to prevent double-click duplicates
let paymentSubmissionInProgress = false;

// CRITICAL: Data recovery function - restores from localStorage if sessionStorage is lost
function recoverServiceDataFromStorage() {
  const sessionKeys = [
    "selectedServiceId",
    "selectedServiceName",
    "selectedServicePrice",
    "selectedServiceMaxGuests",
    "selectedServiceType",
    "selectedDuration",
    "selectedDurationLabel",
    "serviceInclusions",
    "customerName",
    "finalTotal",
  ];

  let recovered = false;
  sessionKeys.forEach((key) => {
    if (!sessionStorage.getItem(key) && localStorage.getItem(key)) {
      sessionStorage.setItem(key, localStorage.getItem(key));
      recovered = true;
    }
  });

  if (recovered) {
    console.log(
      "✅ Service data recovered from localStorage to sessionStorage"
    );
  }

  return recovered;
}

// PHASE 5: Helper function to reset reserve submission lock
function resetReserveSubmissionLock() {
  reservationSubmissionInProgress = false;
  const submitBtn = document.querySelector(
    '#reservationForm button[type="submit"]'
  );
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Confirm & Submit Reservation";
  }
}

// PHASE 2: Debounced auto-save helper for services-list.html modal changes
let autoSaveServiceTimeout = null;
function triggerServiceSelectionAutoSave(service, durationId) {
  // Clear existing timeout to debounce rapid changes
  if (autoSaveServiceTimeout) {
    clearTimeout(autoSaveServiceTimeout);
  }

  // Debounce auto-save by 1000ms
  autoSaveServiceTimeout = setTimeout(() => {
    // Auto-save the selected service with current duration
    let price = null;

    if (service.timeSlots && service.timeSlots.length > 0) {
      const slot = service.timeSlots.find((ts) => ts.id === durationId);
      if (slot) price = slot.price;
    } else if (service.durations && service.durations.length > 0) {
      const duration = service.durations.find((d) => d.id === durationId);
      if (duration) price = duration.price;
    }

    if (price === null) {
      price = calculatePriceByDuration(service.id, durationId, 1);
    }

    const durationLabel = getDurationLabel(service.id, durationId);

    if (typeof saveReservationProgress === "function") {
      saveReservationProgress("services-list", {
        selectedServiceId: service.id,
        selectedServiceName: service.name,
        selectedServicePrice: price || "0",
        selectedServiceMaxGuests: service.max_guests,
        selectedServiceType: service.type,
        selectedDuration: durationId,
        selectedDurationLabel: durationLabel,
        serviceInclusions: JSON.stringify(service.inclusions),
        autoSavedAt: new Date().toISOString(),
      });
      console.log("Service selection auto-saved during modal interaction:", {
        serviceId: service.id,
        durationId,
      });
    }
  }, 1000);
}

async function processGCashPayment(event, reservationId, reservationHash) {
  event.preventDefault();

  // PHASE 1: Check if submission is already in progress (prevent double-click)
  if (paymentSubmissionInProgress) {
    console.warn(
      "Payment submission already in progress, ignoring duplicate request"
    );
    return;
  }

  // Get GCash Reference Number from the form input
  const gcashReferenceNumber = document
    .getElementById("gcashReferenceNumber")
    .value.trim();

  // CRITICAL: Ensure we have both values, checking sessionStorage as fallback
  let finalReservationId =
    reservationId ||
    sessionStorage.getItem("payment_reservation_id") ||
    sessionStorage.getItem("current_reservation_id");
  let finalReservationHash =
    reservationHash ||
    sessionStorage.getItem("payment_reservation_hash") ||
    sessionStorage.getItem("current_reservation_hash");

  // --- 1. VALIDATION CHECK BLOCK ---
  if (
    !finalReservationHash ||
    !finalReservationId ||
    !gcashReferenceNumber ||
    gcashReferenceNumber.length < 10
  ) {
    console.log("Validation failed!");
    console.log("  Reservation ID:", finalReservationId);
    console.log("  Reservation Hash:", finalReservationHash);
    console.log("  GCash Reference:", gcashReferenceNumber);
    console.log("  URL Search String:", window.location.search);
    console.log("  sessionStorage keys:", {
      payment_reservation_id: sessionStorage.getItem("payment_reservation_id"),
      current_reservation_id: sessionStorage.getItem("current_reservation_id"),
      payment_reservation_hash: sessionStorage.getItem(
        "payment_reservation_hash"
      ),
      current_reservation_hash: sessionStorage.getItem(
        "current_reservation_hash"
      ),
    });

    alert(
      "Missing critical payment data. Please ensure the GCash reference is entered and try again."
    );
    if (!finalReservationId) {
      window.location.href = "reserve.html";
    }
    return;
  }
  // --------------------------------------------------

  // PHASE 1: Set submission lock
  paymentSubmissionInProgress = true;

  // Disable submit button to provide visual feedback
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing Payment...";
  }

  // 2. Build the Final Payload
  const finalPayload = {
    reservationHash: finalReservationHash,
    gcashReferenceNumber: gcashReferenceNumber,
    paymentRef: gcashReferenceNumber,
  };

  console.log("Processing GCash payment with payload:", finalPayload);

  // 3. Send the data to the API to finalize the reservation
  try {
    const response = await fetch(
      "http://localhost:3000/api/reservations/finalize-reservation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      }
    );

    const data = await response.json();

    console.log("Payment finalization response:", data);
    console.log("Response status:", response.status, response.ok);

    if (!response.ok) {
      alert(
        `Payment Failed: ${
          data.message || "An error occurred during finalization."
        }`
      );
      console.error("Server error details:", data);

      // PHASE 1: Reset submission lock on failure
      paymentSubmissionInProgress = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Payment & Confirm Booking";
      }
      return;
    }

    updateLocalReservation(
      { id: finalReservationId, hash: finalReservationHash },
      {
        status: "paid",
        paymentStatus: "paid",
        gcashReferenceNumber,
        qrCodeHash: finalReservationHash || data.reservationHash || null,
      }
    );

    // PHASE 1: Clear incomplete reservation SYNCHRONOUSLY before redirect
    const userEmail = localStorage.getItem("qreserve_logged_user_email");
    if (userEmail && typeof clearIncompleteReservation === "function") {
      try {
        clearIncompleteReservation(userEmail);
        console.log("Incomplete reservation cleared after successful payment");
      } catch (cleanupError) {
        console.warn("Cleanup warning (non-critical):", cleanupError);
      }
    }

    // CRITICAL FIX: Clear reservation data from BOTH storages after successful payment
    const clearKeys = [
      "selectedServiceId",
      "selectedServiceName",
      "selectedServicePrice",
      "selectedServiceMaxGuests",
      "selectedServiceType",
      "selectedDuration",
      "selectedDurationLabel",
      "serviceInclusions",
      "customerName",
      "finalTotal",
      "current_reservation_id",
      "current_reservation_hash",
      "payment_reservation_id",
      "payment_reservation_hash",
    ];
    clearKeys.forEach((key) => {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    });
    console.log("✅ Reservation storage cleared after successful payment");

    // 4. Success! Redirect to the confirmation page
    showModal(
      "Payment Confirmed",
      "<p>✅ Your payment has been successfully processed!</p><p>Your reservation is now PAID. Redirecting to confirmation page...</p>",
      "success"
    );
    console.log("Redirecting to confirmation with hash:", data.reservationHash);

    // Redirect after a short delay to allow user to see modal
    setTimeout(() => {
      window.location.href = `confirmation.html?hash=${data.reservationHash}`;
    }, 2000);
  } catch (error) {
    console.error(
      "Network or server connection error during payment finalization:",
      error
    );
    showModal(
      "Payment Error",
      "<p>❌ A network error occurred while processing your payment.</p><p>Please try submitting the payment again.</p>",
      "error"
    );

    // PHASE 1: Reset submission lock on error
    paymentSubmissionInProgress = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Payment & Confirm Booking";
    }
  }
}

// script.js (Define this function globally)
// CLEANUP FIX: Renamed function parameter for consistency
async function fetchAndDisplaySummary(reservationId, reservationHash) {
  // CLEANUP FIX: If you use the public hash lookup route we made, you don't need the ID!
  // However, since this URL pattern suggests a custom route, we'll keep it for now.
  const url = `http://localhost:3000/api/reservations/details/${reservationId}/${reservationHash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Failed to fetch reservation:", data.message);
      return;
    }

    // 4. Update the HTML using the fetched data
    const reservation = data.reservation;

    // --- CRITICAL DEBUG STEP ---
    console.log("--- DEBUG: Full Reservation Object ---");
    console.log(reservation);
    console.log("-------------------------------------");
    // -----------------------------

    document.getElementById("serviceNameDisplay").textContent =
      reservation.serviceType || "N/A";
    document.getElementById("summaryCustomerName").textContent =
      reservation.full_name || "Guest User";

    const total = parseFloat(reservation.finalTotal || 0).toFixed(2);
    document.getElementById("paymentAmount").textContent = total;
  } catch (error) {
    console.error("Network error during summary fetch:", error);
  }
}

// --- END DFD 17.0 Payment Processing Functions ---

// --- DOMContentLoaded Listener for dynamic logic ---
document.addEventListener("DOMContentLoaded", () => {
  // Call functions that run on all pages
  renderNavigation();

  // Run authentication checks on pages that require them
  checkAuthAndRedirect(
    window.location.pathname.includes("admin-dashboard.html")
  );

  const typeFilterElement = document.getElementById("amenity-type-filter");
  const capacityFilterElement = document.getElementById(
    "amenity-capacity-filter"
  );
  if (typeFilterElement) {
    // Only run this logic on amenities.html
    typeFilterElement.addEventListener("change", handleFilterChange);
    if (capacityFilterElement)
      capacityFilterElement.addEventListener("change", handleFilterChange);
    fetchServices().then(() => renderAmenities(getActiveServices())); // Fetch from database then render
  }

  // Logic specific to service-list.html
  const serviceListContainer = document.getElementById(
    "service-cards-container"
  );
  if (serviceListContainer) {
    const typeFilterEl = document.getElementById("services-type-filter");
    const capFilterEl = document.getElementById("services-capacity-filter");

    const applyServiceFilters = () => {
      renderServiceCards(filterServicesForList());
    };

    fetchServices().then(() => {
      applyServiceFilters();
    });

    if (typeFilterEl)
      typeFilterEl.addEventListener("change", applyServiceFilters);
    if (capFilterEl)
      capFilterEl.addEventListener("change", applyServiceFilters);
  }

  // Logic specific to profile.html
  if (window.location.pathname.includes("profile.html")) {
    renderProfileDetails();
    renderUserReservations();

    const profileEditForm = document.getElementById("profile-edit-form");
    if (profileEditForm) {
      profileEditForm.addEventListener("submit", handleProfileEditSubmit);
    }

    const profileModal = document.getElementById("profile-edit-modal");
    if (profileModal) {
      profileModal.addEventListener("click", (e) => {
        if (e.target === profileModal) {
          closeProfileEditModal();
        }
      });
    }
  }

  // 3. Admin Dashboard only (CRITICAL)
  if (document.getElementById("users-table-body")) {
    // Checking for the element you just added
    renderUsersList(); // <--- Is this call present?
  }

  if (window.location.pathname.includes("admin-dashboard.html")) {
    console.log("Admin Dashboard detected. Starting data fetches...");

    //renderServiceCheckboxes();
    //fetchBlockedDatesList();

    // 1. Fetch PENDING RESERVATIONS (The one we're debugging)
    if (typeof renderAdminReservations === "function") {
      renderAdminReservations();
    }

    // 2. Fetch USER LIST (The one you saw running)
    if (typeof renderUsersList === "function") {
      renderUsersList();
    }

    // 3. Fetch PROMO CODES (The one you saw running)
    if (typeof renderPromoCodeTable === "function") {
      renderPromoCodeTable();
    }

    // 4. Account management setup
    fetchRoles(); // Load roles for the account modal

    // Attach listener to account form
    const accountForm = document.getElementById("accountForm");
    if (accountForm) {
      accountForm.addEventListener("submit", handleAccountFormSubmit);
    }
  }

  // Logic specific to promotions.html
  if (window.location.pathname.includes("promotions.html")) {
    renderPublicPromotions();
  }

  // Auth Forms
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
  }

  const createForm = document.getElementById("createPromoCodeForm");
  const promoCodesTab = document.getElementById("nav-promocodes-tab");

  if (createForm) {
    // 1. Listener for creating a new promo code (Working)
    createForm.addEventListener("submit", createPromoCode);
  }

  // 2. Initial Page Load (Recommended)
  // Call the render function right away to load the table content when the page opens.
  // This is necessary if the promo codes section is visible immediately.
  if (document.getElementById("promoCodeTableBody")) {
    renderPromoCodeTable();
  }

  // 3. Listener for the tab click (Fix: Use the correct function name)
  if (promoCodesTab) {
    // If the Admin Dashboard uses tabs, reload the data every time the tab is clicked.
    promoCodesTab.addEventListener("click", renderPromoCodeTable);
  }

  // --- Reservation Page Logic (reserve.html) ---
  if (window.location.pathname.includes("reserve.html")) {
    // Require login to proceed with reservation page
    const loggedUser = getLoggedInUser();
    if (!loggedUser) {
      showLoginConfirm(
        "Login Required",
        "<p>To complete your reservation, you'll need to log in or create an account.</p><p>Your service selection has been saved, so you can log in and continue right where you left off.</p>",
        () => {
          // Login button clicked - redirect to login page
          window.location.href = "login.html?redirect=reserve.html";
        },
        {
          loginText: "Continue to Login",
          browseText: "Browse Services",
        }
      );
      return;
    }

    // 1. CRITICAL: DEFINE THE BASE PRICE VARIABLE HERE!
    const finalBasePrice =
      parseFloat(sessionStorage.getItem("selectedServicePrice")) || 0;
    const finalServiceId = sessionStorage.getItem("selectedServiceId");
    const finalServiceName = sessionStorage.getItem("selectedServiceName");
    const maxGuestsValue = sessionStorage.getItem("selectedServiceMaxGuests");
    const maxGuestsInput = document.getElementById("maxGuestsAllowed");
    const form = document.getElementById("reservationForm"); // Get the form element

    // 2. CHECK FOR MISSING DATA (Check for service ID, not price)
    if (!finalServiceId) {
      showModal(
        "No Service Selected",
        "<p>Please select a service before making a reservation.</p>",
        "warning"
      );
      // Use a short delay before redirecting to allow the alert to be seen
      setTimeout(() => {
        window.location.href = "services-list.html";
      }, 50);
      return; // Stop execution if data is missing
    }

    // 3. DISPLAY SERVICE SUMMARY (Logic from the old block and the new function call)
    renderServiceSelectionSummary(); // This function should handle base price display

    if (maxGuestsInput && maxGuestsValue) {
      // This is the line that should set the hidden input's value
      maxGuestsInput.value = maxGuestsValue;
    }

    // 4. ATTACH LISTENERS (Including the debounce logic)
    if (form) {
      form.addEventListener("submit", reserveNow);
      // --- Debouncing and Promo Code Setup (The one we fixed earlier) ---

      // Create the debounced version
      const debouncedCalculatePrice = debounce(() => {
        calculateFinalPrice(finalBasePrice);
      }, 500); // Wait 0.5 seconds

      // Attach the debounced function to the input field
      document
        .getElementById("promoCodeInput")
        ?.addEventListener("input", debouncedCalculatePrice);

      // Initial price calculation on load (since renderServiceSelectionSummary might call it, too, this ensures it runs)
      calculateFinalPrice(finalBasePrice);

      // 5. SET UP RESERVATION DATE AUTOMATION AND VALIDATION
      setupCheckoutAutoCalculation();
      setupDateValidation();
      highlightUnavailableDates();
    }
  }

  // --- Payment Page Logic (payment.html) ---
  if (window.location.pathname.includes("payment.html")) {
    // FIX 1: Try to get from URL first, fallback to sessionStorage
    let reservationId =
      getUrlParameter("reservationId") || getUrlParameter("id");
    let reservationHash = getUrlParameter("hash");

    // FIX 2: Fallback to sessionStorage if not in URL
    if (!reservationId) {
      reservationId =
        sessionStorage.getItem("payment_reservation_id") ||
        sessionStorage.getItem("current_reservation_id");
    }
    if (!reservationHash) {
      reservationHash =
        sessionStorage.getItem("payment_reservation_hash") ||
        sessionStorage.getItem("current_reservation_hash");
    }

    if (!reservationId || !reservationHash) {
      console.error("IDs missing in URL.");
      // We log the value received from the URL to help debug:
      console.log("Debug: reservationId received:", reservationId);
      console.log("Debug: reservationHash received:", reservationHash);

      // IMPORTANT: Use a custom modal/message box instead of alert()
      alert("Missing reservation details. Returning to reservation page.");
      window.location.href = "reserve.html";
      return;
    }

    // Now both variables hold the correct value.
    console.log("SUCCESS! Reservation ID:", reservationId);

    // Now both variables are defined and passed correctly:
    fetchAndDisplaySummary(reservationId, reservationHash);

    // PHASE 1: Single consolidated listener for payment form submission
    const gcashForm = document.getElementById("gcashPaymentForm");
    if (gcashForm) {
      gcashForm.addEventListener("submit", (event) => {
        processGCashPayment(event, reservationId, reservationHash);
      });
    }
  }
});

// --- Modal Click-Outside Handler for Account Modal ---
window.onclick = function (event) {
  const accountModal = document.getElementById("accountModal");
  if (event.target === accountModal) {
    closeAccountModal();
  }
};

// Expose service management functions globally for HTML
window.deactivateServiceAndRefresh = deactivateServiceAndRefresh;
window.addDurationRow = addDurationRow;
window.toggleDurationType = toggleDurationType;
window.fetchServices = fetchServices;
window.getActiveServices = getActiveServices;
window.editService = editService;
window.cancelServiceEdit = cancelServiceEdit;
window.updateService = updateService;
window.setupCheckoutAutoCalculation = setupCheckoutAutoCalculation;
window.setupDateValidation = setupDateValidation;
window.highlightUnavailableDates = highlightUnavailableDates;

// --- Expose Account Management Functions Globally for HTML ---
window.openCreateAccountModal = openCreateAccountModal;
window.openEditAccountModal = openEditAccountModal;
window.openEditAccountModalById = openEditAccountModalById;
window.closeAccountModal = closeAccountModal;
window.handleAccountFormSubmit = handleAccountFormSubmit;
window.deactivateAccount = deactivateAccount;
window.activateAccount = activateAccount;
window.fetchRoles = fetchRoles;

// --- END DOMContentLoaded Listener ---

// --- Featured Amenities Carousel System ---
document.addEventListener("DOMContentLoaded", () => {
  // Section navigation (Rooms, Events Place, Pool Area)
  const sectionButtons = document.querySelectorAll(".amenities-section-btn");
  const carousels = document.querySelectorAll(".amenities-carousel");

  sectionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionName = button.getAttribute("data-section");

      // Remove active class from all buttons and carousels
      sectionButtons.forEach((btn) => btn.classList.remove("active"));
      carousels.forEach((carousel) => carousel.classList.remove("active"));

      // Add active class to clicked button and corresponding carousel
      button.classList.add("active");
      const activeCarousel = document.querySelector(
        `.amenities-carousel[data-section="${sectionName}"]`
      );
      if (activeCarousel) {
        activeCarousel.classList.add("active");

        // Reset carousel to first slide when switching sections
        const slides = activeCarousel.querySelectorAll(".carousel-slide");
        slides.forEach((slide) => slide.classList.remove("active"));
        if (slides.length > 0) {
          slides[0].classList.add("active");
        }
      }
    });
  });

  // Carousel navigation (prev/next buttons)
  const prevButtons = document.querySelectorAll(".carousel-nav-btn.prev");
  const nextButtons = document.querySelectorAll(".carousel-nav-btn.next");

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const carousel = button.closest(".amenities-carousel");
      if (carousel) {
        navigateCarousel(carousel, -1);
      }
    });
  });

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const carousel = button.closest(".amenities-carousel");
      if (carousel) {
        navigateCarousel(carousel, 1);
      }
    });
  });

  // Keyboard navigation (left/right arrow keys)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      const activeCarousel = document.querySelector(
        ".amenities-carousel.active"
      );
      if (activeCarousel) {
        navigateCarousel(activeCarousel, -1);
      }
    } else if (e.key === "ArrowRight") {
      const activeCarousel = document.querySelector(
        ".amenities-carousel.active"
      );
      if (activeCarousel) {
        navigateCarousel(activeCarousel, 1);
      }
    }
  });

  // Helper function to navigate carousel
  function navigateCarousel(carousel, direction) {
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    let currentIndex = Array.from(slides).findIndex((slide) =>
      slide.classList.contains("active")
    );

    // Calculate next index (with wrapping)
    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    // Update active slide
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentIndex].classList.add("active");
  }
});
