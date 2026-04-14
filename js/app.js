// CinemaSync App Logic

// Elements
const timeWidget = document.getElementById('current-time');

// Update Current Time every minute
function updateTime() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    timeWidget.innerText = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime();

// Update Movie Progress
// Real implementation would calculate based on actual timestamps.
// We'll simulate slow progression.
let prog1 = 45;
let prog2 = 10;
const pBar1 = document.getElementById('progress-1');
const pBar2 = document.getElementById('progress-2');
const status1 = document.getElementById('status-1');
const status2 = document.getElementById('status-2');

setInterval(() => {
    if(prog1 < 100) {
        prog1 += 0.05;
        pBar1.style.width = `${prog1}%`;
        const minsLeft = Math.max(0, Math.floor((100 - prog1) * 1.5));
        const hrsLeft = Math.floor(minsLeft / 60);
        const rmins = minsLeft % 60;
        status1.innerText = `Running - ${hrsLeft > 0 ? hrsLeft + 'h ' : ''}${rmins}m remaining`;
    }
    
    if(prog2 < 100) {
        prog2 += 0.04;
        pBar2.style.width = `${prog2}%`;
        const minsLeft = Math.max(0, Math.floor((100 - prog2) * 1.8));
        const hrsLeft = Math.floor(minsLeft / 60);
        const rmins = minsLeft % 60;
        status2.innerText = `Running - ${hrsLeft > 0 ? hrsLeft + 'h ' : ''}${rmins}m remaining`;
    }
}, 5000); // update every 5 sec for subtle progress


// Fluctuate Wait Times dynamically
const facilities = [
    { id: 'food', wait: 2, min: 1, max: 15 },
    { id: 'washroom', wait: 8, min: 0, max: 12 },
    { id: 'popcorn', wait: 5, min: 2, max: 20 },
    { id: 'boxoffice', wait: 0, min: 0, max: 5 }
];

function updateFacilitiesColor(facility, value) {
    const dot = document.getElementById(`${facility.id}-dot`);
    // Clear existing pulse classes
    dot.classList.remove('pulse-green', 'pulse-yellow', 'pulse-red');
    
    // Determine status class based on wait time context
    let statusClass = 'pulse-green';
    if (value > (facility.max * 0.6)) {
        statusClass = 'pulse-red';
    } else if (value > (facility.max * 0.3)) {
        statusClass = 'pulse-yellow';
    }
    
    dot.classList.add(statusClass);
}

setInterval(() => {
    // Randomly select one facility to fluctuate
    const target = facilities[Math.floor(Math.random() * facilities.length)];
    
    // Fluctuate up or down by 1-2 minutes
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    
    target.wait = Math.max(target.min, Math.min(target.max, target.wait + change));
    
    const waitEl = document.getElementById(`${target.id}-wait`);
    if(waitEl) {
        waitEl.innerText = `${target.wait} min`;
    }
    
    updateFacilitiesColor(target, target.wait);
}, 3500); // Every 3.5 seconds update a wait time

// Initial calculation for colors
facilities.forEach(f => {
    updateFacilitiesColor(f, f.wait);
});
