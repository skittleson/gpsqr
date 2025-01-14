const generateQRBtn = document.getElementById('generateQR');
const qrContainer = document.getElementById('qrcode');
const locationInfo = document.getElementById('locationInfo');
const timestamp = document.getElementById('timestamp');

window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const truncatedLat = parseFloat(latitude.toFixed(8));
                const truncatedLong = parseFloat(longitude.toFixed(8));

                // use RFC 3339 for timestamp data
                const timeNow = new Date().toISOString();

                // RFC 5870 geo uri
                const gpsData = `geo:${truncatedLat},${truncatedLong}?ts=${timeNow}`;

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
