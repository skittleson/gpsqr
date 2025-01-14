// Get references to DOM elements
const generateQRBtn = document.getElementById('generateQR');
const qrContainer = document.getElementById('qrcode');
const locationInfo = document.getElementById('locationInfo');
const timestamp = document.getElementById('timestamp');

// Generate QR code on button click

// generateQRBtn.addEventListener('click',
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const gpsData = `Latitude: ${latitude}, Longitude: ${longitude}`;
        const timeNow = new Date().toLocaleString();

        // Display GPS data and timestamp
        locationInfo.textContent = `Coordinates: ${gpsData}`;
        timestamp.textContent = `Timestamp: ${timeNow}`;

        // Generate QR code
        qrContainer.innerText = '';
        new QRCode(qrContainer, `${gpsData}, Time: ${timeNow}`);
      },
      (error) => {
        locationInfo.textContent = `Error: ${error.message}`;
        timestamp.textContent = '';
      }
    );
  } else {
    locationInfo.textContent = 'Geolocation is not supported by your browser.';
    timestamp.textContent = '';
  }
};
