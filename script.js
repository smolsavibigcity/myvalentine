window.onload = function() {
    const sujataApartment = [18.54014, 73.88345];
    const suonmoi = [18.53755, 73.87965];
    const map = L.map('map').setView(sujataApartment, 16);
    
    // Matcha-style map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

    // Goal zone
    L.circle(suonmoi, { color: '#9fb8ad', fillColor: '#9fb8ad', fillOpacity: 0.3, radius: 200 }).addTo(map);

    // Couple Marker (Requires us.jpg to be uploaded)
    const usIcon = L.divIcon({
        className: 'couple-marker',
        html: '<img src="us.jpg" style="width:60px;height:60px;border-radius:50%;border:4px solid white;">',
        iconSize: [60, 60]
    });

    const marker = L.marker(sujataApartment, { icon: usIcon, draggable: true }).addTo(map);

    marker.on('dragend', function() {
        if (marker.getLatLng().distanceTo(L.latLng(suonmoi)) < 300) {
            alert("Congratulations! 🍓 Level 2 Unlocked.");
            nextLevel(2);
        }
    });
};

function nextLevel(lvl) {
    document.querySelectorAll('.game-level').forEach(el => el.classList.add('hidden'));
    document.getElementById('level-' + lvl).classList.remove('hidden');
    if (lvl === 2) startChess();
}

// THIS SECTION FIXES THE PIECES
function startChess() {
    Chessboard('board', {
        draggable: true,
        // This specific URL is the key to making pieces appear:
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
        position: '4k1/5ppp/8/8/8/8/8/4R1K1', 
        onDrop: function(source, target) {
            if (target.includes('8')) {
                alert("Checkmate! 🍵 Proceeding to the final dataset.");
                nextLevel(3);
            }
        }
    });
}
