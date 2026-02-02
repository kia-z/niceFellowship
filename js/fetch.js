// Fetch existing data from Google Sheet
async function fetchExistingData() {
  try {
    console.log("Fetching data from Google Sheet...");
    
    const response = await fetch("https://script.google.com/macros/s/AKfycbwxZhGLqz4gpbLnhz53FCLJzy4K6rhwsuX8QsfY9jsRBb7-dHLq642Ps3mG_woLvC2x1w/exec", {
      method: "GET",
          });

    const data = await response.json();
    console.log("Data fetched successfully:", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Display fetched data in a table
function displayFetchedData(data) {
  const container = document.getElementById("data_container");
  
  if (!container) {
    console.warn("data_container element not found");
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  // Create table
  let html = '<table class="table table-striped table-hover">';
  html += '<thead class="table-dark"><tr>';
  
  // Create headers from first row
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    html += `<th>${header}</th>`;
  });
  html += '</tr></thead><tbody>';

  // Add data rows
  data.forEach(row => {
    html += '<tr>';
    headers.forEach(header => {
      html += `<td>${row[header] || ''}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// Load data on page load
document.addEventListener("DOMContentLoaded", async function() {
  const data = await fetchExistingData();
  displayFetchedData(data);
});
