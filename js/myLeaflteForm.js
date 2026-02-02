var map = L.map('map').setView([47.071335, 15.433044], 12);

var baseMaps = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Get form elements
const findCoordsBtn = document.getElementById('findCoordinatesBtn');
const latInputPin = document.getElementById('latitude');
const lngInputPin = document.getElementById('longitude');

// Popup for coordinates
let popupCoord = L.popup();
let coordinatePickerActive = false;

// Function to handle map clicks
function onMapClick(e) {
  if (!coordinatePickerActive) return; // Only work if checkbox is checked
  
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  
  // Update form fields
  latInputPin.value = lat;
  lngInputPin.value = lng;
  
  // Show popup with formatted coordinates
  popupCoord
    .setLatLng(e.latlng)
    .setContent(`
      <strong>These are your coordinates:</strong><br>
      • Latitude: ${lat}<br>
      • Longitude: ${lng}
    `)
    .openOn(map);
}

// Toggle map on/off
findCoordsBtn.addEventListener('click', function() {
  const mapDiv = document.getElementById('map');
  if (!coordinatePickerActive) {
    coordinatePickerActive = true;
    mapDiv.style.display = 'block';
    map.invalidateSize(); // Ensure map renders correctly
    map.getContainer().style.cursor = 'crosshair';
    findCoordsBtn.textContent = 'Hide map';
    findCoordsBtn.classList.remove('btn-secondary');
    findCoordsBtn.classList.add('btn-warning');
    // Show instruction popup
    L.popup()
      .setLatLng(map.getCenter())
      .setContent('Click anywhere on the map to set coordinates')
      .openOn(map);
  } else {
    coordinatePickerActive = false;
    mapDiv.style.display = 'none';
    map.getContainer().style.cursor = '';
    map.closePopup();
    findCoordsBtn.textContent = 'Find coordinates on map';
    findCoordsBtn.classList.remove('btn-warning');
    findCoordsBtn.classList.add('btn-secondary');
  }
});

// Attach click handler to map
map.on('click', onMapClick);