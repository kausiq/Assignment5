// ---------- Data ----------
const services = [
	{ id: 'nat', bn: 'জাতীয় জরুরি সেবা', en: 'National Emergency Number', number: '999', category: 'All', icon: '🚨' },
	{ id: 'pol', bn: 'পুলিশ', en: 'Police Helpline Number', number: '999', category: 'Police', icon: '👮' },
	{ id: 'fire', bn: 'ফায়ার সার্ভিস', en: 'Fire Service Number', number: '999', category: 'Fire', icon: '🚒' },
	{ id: 'amb', bn: 'অ্যাম্বুলেন্স', en: 'Ambulance Service', number: '1994-999999', category: 'Health', icon: '🚑' },
	{ id: 'wcn', bn: 'নারী ও শিশু হেল্পলাইন', en: 'Women & Child Helpline', number: '109', category: 'Help', icon: '👩‍👧' },
	{ id: 'anti', bn: 'দুর্নীতি দমন হেল্পলাইন', en: 'Anti-Corruption Helpline', number: '106', category: 'Govt.', icon: '🛡️' },
	{ id: 'elec', bn: 'বিদ্যুৎ হেল্পলাইন', en: 'Electricity Helpline', number: '16216', category: 'Electricity', icon: '💡' },
	{ id: 'brac', bn: 'ব্র্যাক হেল্পলাইন', en: 'Brac Helpline', number: '16445', category: 'NGO', icon: '🏥' },
	{ id: 'rail', bn: 'বাংলাদেশ রেলওয়ে হেল্পলাইন', en: 'Bangladesh Railway Helpline', number: '163', category: 'Travel', icon: '🚆' },
];

// ---------- State ----------
let likes = 0;
let coins = 100;
let copies = 0;

const els = {
	cardsGrid: document.getElementById('cardsGrid'),
	cardTpl: document.getElementById('cardTemplate'),
	likesCount: document.getElementById('likesCount'),
	coinCount: document.getElementById('coinCount'),
	copyCount: document.getElementById('copyCount'),
	historyList: document.getElementById('historyList'),
	historyEmpty: document.getElementById('historyEmpty'),
	clearHistoryBtn: document.getElementById('clearHistoryBtn'),
};

function updateCounters() {
	els.likesCount.textContent = likes;
	els.coinCount.textContent = coins;
	els.copyCount.textContent = copies;
}

function addHistory({ name, number }) {
	if (els.historyEmpty) els.historyEmpty.remove();
	const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

	const row = document.createElement('div');
	row.className = 'px-4 py-3 flex items-start gap-3';
	row.innerHTML = `
		<div class="mt-1">
			<svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5l-5.2-1.3a1 1 0 00-1 .26l-2.2 2.2a16 16 0 01-7.2-7.2l2.2-2.2a1 1 0 00.26-1L7.5 3a1 1 0 00-1.2-.74L2.3 3.02A1 1 0 001.5 4c0 10.22 8.28 18.5 18.5 18.5a1 1 0 00.98-.8l.76-4a1 1 0 00-.74-1.2z"/></svg>
		</div>
		<div class="flex-1">
			<div class="text-sm font-medium text-slate-800">${name}</div>
			<div class="text-xs text-slate-500">${number}</div>
		</div>
		<div class="text-xs text-slate-400">${time}</div>
	`;
	els.historyList.prepend(row);
}

function makeCard(svc) {
	const node = els.cardTpl.content.firstElementChild.cloneNode(true);
	// Card info
	node.querySelector('.service-en').textContent = svc.en;
	node.querySelector('.service-bn').textContent = svc.bn;
	node.querySelector('.number').textContent = svc.number;
	node.querySelector('.category').textContent = svc.category;
	// Icon image
	const iconImg = node.querySelector('.service-icon');
	if (iconImg) {
		// If you have image URLs, use svc.icon as src, else fallback to emoji as data URI
		if (svc.icon.startsWith('http')) {
			iconImg.src = svc.icon;
			iconImg.alt = svc.en;
		} else {
			// Render emoji as SVG data URI for crisp display
			const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-size='28'>${svc.icon}</text></svg>`;
			iconImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
			iconImg.alt = svc.en;
		}
	}

	// Like
	node.querySelector('.like-btn').addEventListener('click', () => {
		likes += 1;
		updateCounters();
	});

	// Copy
	node.querySelector('.copy-btn').addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(svc.number);
			copies += 1;
			updateCounters();
			alert(`Copied ${svc.en} number: ${svc.number}`);
		} catch (err) {
			alert('Copy failed. Your browser may block clipboard access.');
		}
	});

	// Call
	node.querySelector('.call-btn').addEventListener('click', () => {
		if (coins < 20) {
			alert('Not enough coins to place a call. You need at least 20 coins.');
			return;
		}
		coins -= 20;
		updateCounters();
		alert(`Calling ${svc.en} ( ${svc.number} )...`);
		addHistory({ name: svc.en, number: svc.number });
	});

	return node;
}

// Render all cards
services.forEach(svc => {
	els.cardsGrid.appendChild(makeCard(svc));
});

// Clear history
els.clearHistoryBtn.addEventListener('click', () => {
	els.historyList.innerHTML = '<div class="p-4 text-sm text-slate-500" id="historyEmpty">No calls yet.</div>';
});

// Initial counters
updateCounters();
