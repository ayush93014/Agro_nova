// Simple SPA navigation for steps
const steps = ['login', 'soil', 'crops', 'tasks', 'market'];
function nextStep(nextId) {
	steps.forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.remove('active');
	});
	const nextEl = document.getElementById(nextId);
	if (nextEl) nextEl.classList.add('active');

	// Highlight active tab
	const navLinks = document.querySelectorAll('nav a');
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + nextId) {
			link.classList.add('active');
		}
	});
}

// Login/Registration
const loginForm = document.getElementById('loginForm');
if (loginForm) {
	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();
		nextStep('soil');
	});
}

// Task Upload
const taskUploadForm = document.getElementById('taskUploadForm');
let points = 0;
let level = 1;
let gifts = [];
if (taskUploadForm) {
	taskUploadForm.addEventListener('submit', function(e) {
		e.preventDefault();
		points += 10;
		if (points % 50 === 0) {
			level++;
			gifts.push('Gift ' + level);
		}
		document.getElementById('pointsDisplay').textContent = `Points: ${points} | Level: ${level} | Gifts: ${gifts.join(', ') || 'None'}`;
		alert('Task picture uploaded! Notification sent to authorities.');
	});
}

// Market Listing
const marketForm = document.getElementById('marketForm');
const marketList = document.getElementById('marketList');
if (marketForm && marketList) {
	marketForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const crop = document.getElementById('cropType').value;
		const qty = document.getElementById('quantity').value;
		const entry = document.createElement('div');
		entry.textContent = `${crop} - ${qty} kg listed for bulk buying.`;
		marketList.appendChild(entry);
		alert('Crop listed for bulk buying!');
	});
}
