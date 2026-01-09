// Initialize the map centered on the Mediterranean area with zoom level 5
var map = L.map('map').setView([48.1483, 11.5596], 5);

// Add OpenStreetMap tile layer as the map's base layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define all selectable locations with their names and coordinates
const allLocations  = [
  { name: "Zagreb, Croatia", coords: [45.8110, 15.9815] },
  { name: "Zadar, Croatia", coords: [44.1131, 15.2262] },
  { name: "Leipzig, Germany", coords: [51.3446, 12.3771] },
  { name: "Graz, Austria", coords: [47.0767, 15.4214] }
];

// Store currently active (displayed) markers from checkbox selection
let activeMarkers = [];

// Function to update markers based on checkbox selection
function updateMarkers() {
  // Remove all currently active markers from the map
  activeMarkers.forEach(marker => map.removeLayer(marker));
  activeMarkers = [];

  // Get all checked checkboxes under the #controls element
  const checkedBoxes = document.querySelectorAll('#controls input[type=checkbox]:checked');
  // Extract the names of selected locations
  const selectedNames = Array.from(checkedBoxes).map(cb => cb.value);

  // Filter locations to only those selected
  const filteredLocations = allLocations.filter(loc => selectedNames.includes(loc.name));
  // Add a marker for each selected location and store it in activeMarkers
  filteredLocations.forEach(loc => {
    const marker = L.marker(loc.coords)
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b>`);
    activeMarkers.push(marker);
  });
}

// Initial marker load based on current checkbox state
updateMarkers();

// Add event listeners to all checkboxes to update markers when changed
document.querySelectorAll('#controls input[type=checkbox]').forEach(checkbox => {
  checkbox.addEventListener('change', updateMarkers);
});