// --- Demo hospital dataset (expand freely) ---
// Fields: id, name, type, state, district, address, phone, coords {lat,lng}, hours, availableGroups[], website(optional), is24x7
const HOSPITALS = [
    { id: 1, name: "Govt. General Hospital Blood Bank", type: "Government", state: "Andhra Pradesh", district: "Srikakulam", address: "RIMS Campus, Balaga, Srikakulam", phone: "08942-222222", coords: { lat: 18.2969, lng: 83.8961 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-"], website: "https://ap.gov.in", is24x7: true },
    { id: 2, name: "KIMS ICON Hospital Blood Bank", type: "Private", state: "Andhra Pradesh", district: "Visakhapatnam", address: "Sheela Nagar, Vizag", phone: "0891-1234567", coords: { lat: 17.7000, lng: 83.2167 }, hours: "24x7", availableGroups: ["A+", "O+", "B-", "AB+", "A-"], website: "https://kimsvizag.com", is24x7: true },
    { id: 3, name: "NIMS Blood Bank", type: "Government", state: "Telangana", district: "Hyderabad", address: "Panjagutta, Hyderabad", phone: "040-23489000", coords: { lat: 17.4275, lng: 78.4483 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-", "AB-"], website: "https://nims.edu.in", is24x7: true },
    { id: 4, name: "Osmania General Hospital Blood Bank", type: "Government", state: "Telangana", district: "Hyderabad", address: "Afzal Gunj, Hyderabad", phone: "040-23538846", coords: { lat: 17.3713, lng: 78.4804 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "A-", "B-", "O-", "AB+"], is24x7: true },
    { id: 5, name: "Apollo Hospitals Blood Bank", type: "Private", state: "Telangana", district: "Hyderabad", address: "Jubilee Hills, Hyderabad", phone: "040-23607777", coords: { lat: 17.4279, lng: 78.4128 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "AB-", "O-"], website: "https://apollohospitals.com", is24x7: true },
    { id: 6, name: "KEM Hospital Blood Bank", type: "Government", state: "Maharashtra", district: "Mumbai", address: "Parel, Mumbai", phone: "022-24136000", coords: { lat: 19.002, lng: 72.842 }, hours: "24x7", availableGroups: ["O+", "A+", "B+", "AB+", "O-"], is24x7: true },
    { id: 7, name: "Tata Memorial Hospital Blood Bank", type: "Government", state: "Maharashtra", district: "Mumbai", address: "Parel, Mumbai", phone: "022-24177000", coords: { lat: 18.998, lng: 72.844 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-", "A-"], is24x7: true },
    { id: 8, name: "Fortis Hospital Blood Bank", type: "Private", state: "Karnataka", district: "Bengaluru Urban", address: "Bannerghatta Rd, Bengaluru", phone: "080-66214444", coords: { lat: 12.9108, lng: 77.6033 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-", "B-"], website: "https://fortishealthcare.com", is24x7: true },
    { id: 9, name: "AIIMS Blood Bank", type: "Government", state: "Delhi", district: "New Delhi", address: "Ansari Nagar, New Delhi", phone: "011-26588500", coords: { lat: 28.5672, lng: 77.2100 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "A-", "O-", "AB-"], website: "https://aiims.edu", is24x7: true },
    { id: 10, name: "Safdarjung Hospital Blood Bank", type: "Government", state: "Delhi", district: "New Delhi", address: "Ring Rd, New Delhi", phone: "011-26707000", coords: { lat: 28.5679, lng: 77.2090 }, hours: "24x7", availableGroups: ["O+", "A+", "B+", "AB+", "O-"], is24x7: true },
    { id: 11, name: "Madras Medical College Blood Bank", type: "Government", state: "Tamil Nadu", district: "Chennai", address: "Park Town, Chennai", phone: "044-25305000", coords: { lat: 13.0827, lng: 80.2757 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-", "AB-"], is24x7: true },
    { id: 12, name: "Apollo Hospitals Blood Bank", type: "Private", state: "Tamil Nadu", district: "Chennai", address: "Greams Rd, Chennai", phone: "044-28293333", coords: { lat: 13.061, lng: 80.264 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "A-", "O-"], website: "https://apollohospitals.com", is24x7: true },
    { id: 13, name: "Ruby Hall Clinic Blood Bank", type: "Private", state: "Maharashtra", district: "Pune", address: "Sassoon Rd, Pune", phone: "020-26123391", coords: { lat: 18.5308, lng: 73.8795 }, hours: "24x7", availableGroups: ["A+", "B+", "O+", "AB+", "O-"], is24x7: true },
    { id: 14, name: "Victoria Hospital Blood Bank", type: "Government", state: "Karnataka", district: "Bengaluru Urban", address: "KR Rd, Bengaluru", phone: "080-26701150", coords: { lat: 12.9597, lng: 77.5727 }, hours: "24x7", availableGroups: ["O+", "A+", "B+", "AB+", "O-", "AB-"], is24x7: true },
    { id: 15, name: "Gandhi Hospital Blood Bank", type: "Government", state: "Telangana", district: "Hyderabad", address: "Musheerabad, Hyderabad", phone: "040-27505566", coords: { lat: 17.423, lng: 78.501 }, hours: "24x7", availableGroups: ["A+", "O+", "B+", "AB+", "O-"], is24x7: true }
];

// Build State -> District mapping from dataset
const geoMap = HOSPITALS.reduce((acc, h) => { (acc[h.state] ||= new Set()).add(h.district); return acc; }, {});

// Persist filters between visits
const store = {
    load() {
        try { return JSON.parse(localStorage.getItem('bc_filters') || '{}'); } catch { return {}; }
    },
    save(obj) { localStorage.setItem('bc_filters', JSON.stringify(obj)); }
};

const els = {
    bloodGroup: document.getElementById('bloodGroup'),
    state: document.getElementById('stateSelect'),
    district: document.getElementById('districtSelect'),
    typeTabs: document.querySelectorAll('.segmented button'),
    searchBtn: document.getElementById('searchBtn'),
    resetBtn: document.getElementById('resetBtn'),
    list: document.getElementById('list'),
    empty: document.getElementById('emptyState'),
    meta: document.getElementById('metaBar'),
    countBadge: document.getElementById('countBadge'),
    sortBadge: document.getElementById('sortBadge'),
    gpsBadge: document.getElementById('gpsBadge'),
    useLocation: document.getElementById('useLocation'),
    sortRel: document.getElementById('sortRelevance'),
    sortNear: document.getElementById('sortNearest'),
    exportBtn: document.getElementById('exportBtn')
};

let filter = { group: "", state: "", district: "", type: "all" };
let userLoc = null; // {lat,lng}
let lastResults = [];

function initSelectors() {
    // State options
    const states = Object.keys(geoMap).sort();
    els.state.innerHTML = `<option value="">All States</option>` + states.map(s => `<option>${s}</option>`).join('');
    // District options start empty
    els.district.innerHTML = `<option value="">All Districts</option>`;
}

function restoreFilters() {
    const saved = store.load();
    Object.assign(filter, saved);
    els.bloodGroup.value = filter.group || "";
    els.state.value = filter.state || "";
    updateDistricts(filter.state, filter.district);
    els.typeTabs.forEach(b => {
        const on = (b.dataset.type === (filter.type || 'all'));
        b.classList.toggle('active', on); b.setAttribute('aria-selected', on);
    });
}

function updateDistricts(state, preselect = "") {
    if (!state) { els.district.innerHTML = `<option value="">All Districts</option>`; return; }
    const dists = Array.from(geoMap[state] || []).sort();
    els.district.innerHTML = `<option value="">All Districts</option>` + dists.map(d => `<option ${d === preselect ? 'selected' : ''}>${d}</option>`).join('');
}

function km(a, b) { // haversine
    const R = 6371, toRad = x => x * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function formatGroups(arr) { return arr.join(', '); }

function render(results) {
    lastResults = results.slice();
    els.meta.hidden = false;
    els.countBadge.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
    els.list.innerHTML = '';
    if (results.length === 0) { els.empty.style.display = 'block'; return; } else { els.empty.style.display = 'none'; }

    const frag = document.createDocumentFragment();
    results.forEach((h, i) => {
        const card = document.createElement('article');
        card.className = 'card fade-in';
        card.style.animationDelay = `${i * 30}ms`;
        const distance = (userLoc && h.coords) ? `${km(userLoc, h.coords).toFixed(1)} km` : null;
        card.innerHTML = `
          <div class="row" style="justify-content:space-between; align-items:flex-start">
            <div>
              <div class="title">${h.name}</div>
              <div class="sub">${h.address || ''}</div>
            </div>
            <span class="badge ${h.type === 'Government' ? '' : 'warn'}">${h.type}</span>
          </div>
          <div class="chips">
            <span class="badge ${h.is24x7 ? 'success' : ''}">🕒 ${h.is24x7 ? '24×7' : (h.hours || 'Hours vary')}</span>
            <span class="badge">🩸 ${formatGroups(h.availableGroups)}</span>
            ${distance ? `<span class="badge">📍 ${distance}</span>` : ''}
          </div>
          <div class="actions">
            ${h.phone ? `<a href="tel:${h.phone.replace(/[^0-9+]/g, '')}" aria-label="Call ${h.name}">📞 Call</a>` : ''}
            ${h.coords ? `<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + (h.address || ''))}" aria-label="Directions to ${h.name}">🗺️ Directions</a>` : ''}
            ${h.website ? `<a target="_blank" rel="noopener" href="${h.website}" aria-label="Website of ${h.name}">🌐 Website</a>` : ''}
            <button class="btn-ghost" onclick='navigator.clipboard.writeText("${(h.phone || '').replace(/"/g, '')}")'>Copy Phone</button>
          </div>`;
        frag.appendChild(card);
    });
    els.list.appendChild(frag);
}

function doSearch() {
    const { group, state, district, type } = filter;
    let res = HOSPITALS.filter(h => {
        const okGroup = !group || (h.availableGroups || []).includes(group);
        const okState = !state || h.state === state;
        const okDist = !district || h.district === district;
        const okType = (type === 'all') || h.type === type;
        return okGroup && okState && okDist && okType;
    });

    // Basic relevance: prioritize exact blood group + 24x7 + same district/state
    res.sort((a, b) => {
        let s = 0;
        const score = (h) => (
            (group && h.availableGroups.includes(group) ? 5 : 0) +
            (h.is24x7 ? 2 : 0) +
            (state && h.state === state ? 1 : 0) +
            (district && h.district === district ? 1 : 0)
        );
        s = score(b) - score(a);
        return s;
    });

    els.sortBadge.textContent = 'Sorted by relevance';
    render(res);
    store.save(filter);
}

function sortNearest() {
    if (!userLoc) { alert('Please enable location first (Use My Location).'); return; }
    const res = lastResults.slice().sort((a, b) => {
        const da = a.coords ? km(userLoc, a.coords) : 99999;
        const db = b.coords ? km(userLoc, b.coords) : 99999;
        return da - db;
    });
    els.sortBadge.textContent = 'Sorted by nearest';
    render(res);
}

function exportCSV() {
    if (!lastResults.length) { alert('No results to export.'); return; }
    const cols = ['Name', 'Type', 'State', 'District', 'Address', 'Phone', '24x7', 'AvailableGroups'];
    const rows = lastResults.map(h => [
        h.name, h.type, h.state, h.district, h.address || '', h.phone || '', h.is24x7 ? 'Yes' : 'No', (h.availableGroups || []).join(' ')
    ]);
    const csv = [cols.join(','), ...rows.map(r => r.map(x => `"${String(x).replaceAll('"', '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bloodconnect_results.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
}

// Event wiring
els.typeTabs.forEach(b => b.addEventListener('click', () => {
    els.typeTabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    b.classList.add('active'); b.setAttribute('aria-selected', 'true');
    filter.type = b.dataset.type;
}));

els.state.addEventListener('change', e => { filter.state = e.target.value; updateDistricts(filter.state); filter.district = ''; });
els.district.addEventListener('change', e => { filter.district = e.target.value; });
els.bloodGroup.addEventListener('change', e => { filter.group = e.target.value; });

els.searchBtn.addEventListener('click', doSearch);
els.resetBtn.addEventListener('click', () => { filter = { group: '', state: '', district: '', type: 'all' }; restoreFilters(); doSearch(); });
els.sortRel.addEventListener('click', doSearch);
els.sortNear.addEventListener('click', sortNearest);
els.exportBtn.addEventListener('click', exportCSV);

els.useLocation.addEventListener('click', () => {
    if (!('geolocation' in navigator)) { alert('Geolocation not supported on this device.'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
        userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        els.gpsBadge.hidden = false;
        // Re-sort by nearest immediately if we already searched
        if (lastResults.length) { sortNearest(); }
    }, err => {
        alert('Location access denied. You can still search by State/District.');
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
});

// Init on load
initSelectors();
restoreFilters();
doSearch(); // initial
