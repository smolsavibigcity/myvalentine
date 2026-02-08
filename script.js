// --- LEVEL 1: SIMPLIFIED PUNE MAP ---
// 1. Center map and set a much higher zoom level (16 instead of 15)
const map = L.map('map').setView([18.539, 73.881], 16); 

// Sleek dark tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// 2. Add a BIG "Goal Zone" so he knows where to go
const targetCircle = L.circle([18.53755, 73.87965], {
    color: 'gold',
    fillColor: '#ffd700',
    fillOpacity: 0.3,
    radius: 80 // Big visible circle
}).addTo(map).bindPopup("<b>SOUP DESTINATION</b>").openPopup();

const usIcon = L.divIcon({
    className: 'couple-marker',
    html: '<img src="us.jpg" style="width:60px;height:60px;border-radius:50%; border: 3px solid gold;">',
    iconSize: [60, 60]
});

// 3. The Start: Sujata Apartment
const marker = L.marker([18.54014, 73.88345], {icon: usIcon, draggable: true}).addTo(map);

// 4. Easy-mode check
marker.on('dragend', function() {
    const distance = marker.getLatLng().distanceTo(targetCircle.getLatLng());
    
    // If he gets within 150 meters (very generous!), he wins
    if (distance < 150) {
        nextLevel(2);
    }
});
