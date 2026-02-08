// --- CONFIGURATION ---
const startPos = [18.54014, 73.88345]; // Sujata Apartment
const soupPos = [18.53755, 73.87965];  // Suonmoi
const successRadius = 500; // Very generous 500 meters

// --- INITIALIZE MAP ---
const map = L.map('map').setView(startPos, 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add the Gold Circle so it's visible
const targetCircle = L.circle(soupPos, {
    color: 'gold',
    fillColor: '#ffd700',
    fillOpacity: 0.4,
    radius: successRadius
}).addTo(map);

// Custom Marker (Your Photo)
const usIcon = L.divIcon({
    className: 'couple-marker',
    html: '<img src="us.jpg" style="width:60px;height:60px;border-radius:50%;border:3px solid gold;">',
    iconSize: [60, 60]
});

const marker = L.marker(startPos, {icon: usIcon, draggable: true}).addTo(map);

// --- THE MOVE LOGIC ---
marker.on('dragend', function() {
    const distance = marker.getLatLng().distanceTo(L.latLng(soupPos));
    
    console.log("Distance remaining: " + Math.round(distance) + " meters");

    if (distance <= successRadius) {
        // 1. Give instant feedback
        alert("Congratulations! Goal Reached. Moving to the next quest...");
        
        // 2. Change the screen
        nextLevel(2);
    } else {
        // Tell the user they need to get closer
        marker.bindPopup("Still " + Math.round(distance) + "m away! Keep going toward Suonmoi!").openPopup();
    }
});

// --- LEVEL NAVIGATION SYSTEM ---
function nextLevel(lvl) {
    // Hide ALL levels
    const levels = document.getElementsByClassName('game-level');
    for (let i = 0; i < levels.length; i++) {
        levels[i].style.display = 'none';
    }
    
    // Show the SPECIFIC level
    const nextLvl = document.getElementById('level-' + lvl);
    if (nextLvl) {
        nextLvl.style.display = 'block';
        nextLvl.classList.remove('hidden');
        
        // If it's the chess level, start the board
        if (lvl === 2) {
            setTimeout(startChess, 500); 
        }
    }
}

// --- CHESS LOGIC (Simplified) ---
function startChess() {
    console.log("Chess Level Started");
    var board = Chessboard('board', {
        draggable: true,
        position: '4R1k1/5ppp/8/8/8/8/8/6K1',
        onDrop: function(source, target) {
            // If they move the Rook to the back rank
            if (target.includes('8')) {
                alert("Checkmate! Level 2 Complete.");
                nextLevel(3);
            }
        }
    });
}
