// --- LEVEL 1: PUNE SEAFOOD MAP ---
// 1. Center the map near Bund Garden
const map = L.map('map').setView([18.5401, 73.8834], 15);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

const usIcon = L.divIcon({
    className: 'couple-marker',
    html: '<img src="us.jpg" style="width:50px;height:50px;border-radius:50%">',
    iconSize: [50, 50]
});

// 2. The Destination: Suonmoi (Latitude, Longitude)
const soupLocation = L.latLng(18.53755, 73.87965); 

// 3. The Start: Sujata Apartment (Latitude, Longitude)
const marker = L.marker([18.54014, 73.88345], {icon: usIcon, draggable: true}).addTo(map);

marker.on('dragend', function() {
    // If he gets us within ~150 meters of the restaurant
    if (marker.getLatLng().distanceTo(soupLocation) < 150) {
        nextLevel(2); // This unlocks the Chess level!
    }
});
