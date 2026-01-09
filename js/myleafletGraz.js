// Initialize the map centered on the Mediterranean area with zoom level 5
var map = L.map('map').setView([47.0767, 15.4214], 12);

// Add OpenStreetMap tile layer as the map's base layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define all selectable locations with their names and coordinates
const allLocationsGraz  = [
  { "name": "Herrengasse", "coords": [47.0707, 15.4387], img: "img/Sexarbeit.png", desc:"This graffiti is in...", media: { type: "youtube", src: "2VVjtN94cLg" } },
  { "name": "Sackstraße", "coords": [47.0733, 15.4375] },
  { "name": "Sporgasse", "coords": [47.0721, 15.4403] },
  { "name": "Griesplatz", "coords": [47.0667, 15.4320] },
  { "name": "Jakominiplatz", "coords": [47.0676, 15.4422] },
  { "name": "Annenstraße", "coords": [47.0714, 15.4292] }
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
  const filteredLocations = allLocationsGraz.filter(loc => selectedNames.includes(loc.name));
  // Add a marker for each selected location and store it in activeMarkers
  filteredLocations.forEach(loc => {

    
    const marker = L.marker(loc.coords)
      .addTo(map)
      .bindPopup(`
  <div style="text-align:center;">
    <b>${loc.name}</b><br>
        <button onclick="openMediaModal('youtube', '${loc.media}', '${loc.desc}')">▶ Watch Video</button>
    <img src="${loc.img}" 
         style="width:150px; border-radius:8px; cursor:pointer;" 
         onclick="openMediaModal('image', '${loc.name}', '${loc.img}', '${loc.desc}')">
  </div>
`);
    activeMarkers.push(marker);
  });
}

// Initial marker load based on current checkbox state
updateMarkers();

// Add event listeners to all checkboxes to update markers when changed
document.querySelectorAll('#controls input[type=checkbox]').forEach(checkbox => {
  checkbox.addEventListener('change', updateMarkers);
});

// Function to open the image modal with the clicked image
function openMediaModal(type, src, text) {
  const content = document.getElementById("modalContent");
  const modalText = document.getElementById("modalText");

  if (type === "image") {
    content.innerHTML = `<img src="${src}" style="max-width:100%; max-height:100%; border-radius:10px;" />`;
  } else if (type === "youtube") {
    content.innerHTML = `<iframe width="560" height="315" 
                          src="https://www.youtube.com/embed/${src}" 
                          frameborder="0" allowfullscreen></iframe>`;
  } else if (type === "audio") {
    content.innerHTML = `<audio controls style="width:100%;">
                           <source src="${src}" type="audio/mpeg">
                           Your browser does not support the audio element.
                         </audio>`;
  }

  modalText.innerHTML = text;
  document.getElementById("mediaModal").style.display = "flex";
}
// Function to close image modal specifically
function closeMediaModal() {
  document.getElementById("mediaModal").style.display = "none";
  document.getElementById("modalContent").innerHTML = ""; // clear previous media
}

