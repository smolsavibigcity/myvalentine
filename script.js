window.onload = function() {
    // 1. Coordinates
    const sujataApartment = [18.5401, 73.8834];
    const suonmoi = [18.5375, 73.8796];

    // 2. Initialize Map with a delay to ensure the 'map' div is ready
    const map = L.map('map').setView(sujataApartment, 16);

    // 3. Matcha-themed Map Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

    // 4. Goal Zone
    const goal = L.circle(suonmoi, {
        color: '#9fb8ad',
        fillColor: '#9fb8ad',
        fillOpacity: 0.4,
        radius: 200
    }).addTo(map);

    // 5. Couple Marker (us.jpg)
    const usIcon = L.divIcon({
        className: 'couple-marker',
        html: '<img src="us.jpg" style="width:60px;height:60px;border-radius:50%;border:4px solid white;box-shadow:0 4px 10px rgba(0,0,0,0.2);">',
        iconSize: [60, 60]
    });

    const marker = L.marker(sujataApartment, { icon: usIcon, draggable: true }).addTo(map);

    // 6. Success Logic
    marker.on('dragend', function() {
        const dist = marker.getLatLng().distanceTo(L.latLng(suonmoi));
        if (dist < 300) {
            alert("Yay! Destination reached. 🍓 Next quest starting...");
            nextLevel(2);
        }
    });

    // Make sure map knows its size
    setTimeout(() => { map.invalidateSize(); }, 500);
};

function nextLevel(lvl) {
    document.querySelectorAll('.game-level').forEach(el => el.classList.add('hidden'));
    const next = document.getElementById('level-' + lvl);
    if (next) {
        next.classList.remove('hidden');
        if (lvl === 2) startChess();
    }
}

function startChess() {
    var board = Chessboard('board', {
        draggable: true,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
        position: '4R1k1/5ppp/8/8/8/8/8/6K1',
        onDrop: function(source, target) {
            if (target.includes('8')) {
                nextLevel(3);
            }
        }
    });
}
