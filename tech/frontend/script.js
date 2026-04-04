// ============================================================
//  GreenTech Pro — Frontend Script (Connected to Backend)
// ============================================================

const API = 'https://tic-2k26-greentech-innovator.onrender.com';

// ---- AUTH STATE ----
let currentUser = null;

function getToken() { return localStorage.getItem('gt_token'); }
function setToken(t) { localStorage.setItem('gt_token', t); }
function clearToken() { localStorage.removeItem('gt_token'); localStorage.removeItem('gt_user'); }

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() };
}

// ---- UPDATE NAV FOR AUTH STATE ----
function updateNavAuth(user) {
  currentUser = user;
  const right = document.querySelector('.nav-right');
  if (user) {
    right.innerHTML = `
      <span style="font-size:0.85rem;color:var(--text-mid);font-weight:500">👤 ${user.name.split(' ')[0]}</span>
      <button class="btn-outline" onclick="logout()">Sign Out</button>`;
  } else {
    right.innerHTML = `
      <button class="btn-outline" onclick="openModal('login')">Sign In</button>
      <button class="btn-primary" onclick="openModal('register')">Join Free</button>`;
  }
}

function logout() {
  clearToken();
  currentUser = null;
  updateNavAuth(null);
  showToast('Signed out. See you soon! 🌿');
}

// ---- CHECK SESSION ON LOAD ----
async function checkSession() {
  const token = getToken();
  if (!token) return;
  try {
    const res = await fetch(API + '/auth/me', { headers: authHeaders() });
    if (res.ok) {
      const user = await res.json();
      updateNavAuth(user);
    } else {
      clearToken();
    }
  } catch (e) {
    // backend offline — silent fail
  }
}

// ============================================================
//  AUTH — LOGIN
// ============================================================
async function login() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn      = document.getElementById('login-btn');

  if (!email || !password) { showToast('Please fill in all fields'); return; }

  btn.textContent = 'Signing in...';
  btn.disabled = true;

  try {
    const res  = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { showToast('❌ ' + data.msg); return; }

    setToken(data.token);
    updateNavAuth(data.user);
    closeModal();
    showToast('Welcome back, ' + data.user.name.split(' ')[0] + '! 🌾');
  } catch (e) {
    showToast('❌ Cannot connect to server. Is the backend running?');
  } finally {
    btn.textContent = 'Sign In';
    btn.disabled = false;
  }
}

// ============================================================
//  AUTH — REGISTER
// ============================================================
async function register() {
  const firstName = document.getElementById('reg-firstname').value.trim();
  const lastName  = document.getElementById('reg-lastname').value.trim();
  const email     = document.getElementById('reg-email').value.trim();
  const phone     = document.getElementById('reg-phone').value.trim();
  const roleEl    = document.getElementById('reg-role');
  const password  = document.getElementById('reg-password').value;
  const btn       = document.getElementById('reg-btn');

  if (!firstName || !email || !password) { showToast('Please fill in all required fields'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters'); return; }

  const roleMap = { 'Tourist / Traveller': 'tourist', 'Farmer / Host': 'farmer', 'Student / Researcher': 'student' };
  const role = roleMap[roleEl.value] || 'tourist';

  btn.textContent = 'Creating account...';
  btn.disabled = true;

  try {
    const res  = await fetch(API + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: firstName + ' ' + lastName, email, password, phone, role })
    });
    const data = await res.json();
    if (!res.ok) { showToast('❌ ' + data.msg); return; }

    setToken(data.token);
    updateNavAuth(data.user);
    closeModal();
    showToast('Welcome to GreenTech, ' + firstName + '! 🌿');
  } catch (e) {
    showToast('❌ Cannot connect to server. Is the backend running?');
  } finally {
    btn.textContent = 'Create Account';
    btn.disabled = false;
  }
}

// ============================================================
//  FARMS — FETCH FROM DATABASE
// ============================================================
let allFarms = [];

async function loadFarms() {
  const grid = document.getElementById('farm-grid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-light)">Loading farms...</div>';

  try {
    // Seed demo farms first (safe — only seeds if DB is empty)
    await fetch(API + '/farms/seed', { method: 'POST' }).catch(() => {});

    const res  = await fetch(API + '/farms');
    const data = await res.json();
    allFarms = Array.isArray(data) ? data : [];
    renderFarms(allFarms);
  } catch (e) {
    // Backend offline — use local fallback
    allFarms = localFarms;
    renderFarms(localFarms);
  }
}

function renderFarms(list) {
  const grid = document.getElementById('farm-grid');
  if (!list.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-light)">No farms found.</div>';
    return;
  }
  grid.innerHTML = list.map(f => `
    <div class="farm-card fade-up" onclick="openBookingFor('${f.name}', ${f.price || 0})">
      <div class="farm-img" style="background:var(--mist);font-size:4rem;display:flex;align-items:center;justify-content:center">
        ${f.emoji || '🌾'}
        ${f.featured ? '<div class="farm-badge featured">✦ Featured</div>' : '<div class="farm-badge">Verified</div>'}
        <button class="farm-fav" onclick="event.stopPropagation();this.textContent=this.textContent==='❤️'?'🤍':'❤️'">🤍</button>
      </div>
      <div class="farm-body">
        <div class="farm-loc">📍 ${f.location || ''}</div>
        <div class="farm-name">${f.name}</div>
        <div class="tags">${(f.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="farm-desc">${f.description || ''}</div>
        <div class="farm-meta">
          <div class="farm-price">₹${(f.price || 0).toLocaleString('en-IN')} <span>/ night</span></div>
          <div class="farm-rating">★ ${f.rating || '4.8'}</div>
        </div>
      </div>
    </div>`).join('');
}

function openBookingFor(farmName, price) {
  // Pre-fill booking form and switch to booking page
  const sel = document.querySelector('#page-booking .form-select');
  if (sel) {
    // try to select matching option, else first
    const opt = Array.from(sel.options).find(o => o.text.includes(farmName));
    if (opt) sel.value = opt.value;
  }
  updateBookingSummary(farmName, price);
  showPage('booking');
}

function updateBookingSummary(name, price) {
  const nameEl = document.querySelector('.summary-name');
  if (nameEl) nameEl.textContent = name;
  // update price display — simplified
}

// ============================================================
//  SUBMIT FARM (farmer listing)
// ============================================================
async function submitFarm() {
  if (!getToken()) { showToast('Please sign in first to list your farm'); openModal('login'); return; }

  const name     = document.getElementById('farm-name').value.trim();
  const state    = document.getElementById('farm-state').value;
  const district = document.getElementById('farm-district').value.trim();
  const area     = document.getElementById('farm-area').value;
  const crops    = document.getElementById('farm-crops').value.trim();
  const price    = document.getElementById('farm-price').value;
  const btn      = document.getElementById('farm-submit-btn');

  if (!name || !district || !price) { showToast('Please fill in all required fields'); return; }

  btn.textContent = 'Submitting...';
  btn.disabled = true;

  try {
    const res = await fetch(API + '/farms', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ name, location: district + ', ' + state, state, area, crops, price: Number(price) })
    });
    const data = await res.json();
    if (!res.ok) { showToast('❌ ' + data.msg); return; }

    closeModal();
    showToast('Farm submitted for verification! We\'ll contact you within 48 hours. 🌾');
  } catch (e) {
    showToast('❌ Cannot connect to server.');
  } finally {
    btn.textContent = 'Submit for Verification';
    btn.disabled = false;
  }
}

// ============================================================
//  BOOKING — CONFIRM & PAY via Razorpay
// ============================================================
let bookingAmount = 6750; // default; updated dynamically

async function confirmBooking() {
  if (!getToken()) {
    showToast('Please sign in to complete your booking');
    openModal('login');
    return;
  }

  const firstName = document.querySelector('#page-booking input[placeholder="Arjun"]')?.value.trim();
  const email     = document.querySelector('#page-booking input[type="email"]')?.value.trim();
  const btn       = document.querySelector('.btn-book');

  if (!firstName || !email) { showToast('Please fill in guest details'); return; }

  btn.textContent = 'Creating order...';
  btn.disabled = true;

  try {
    // 1. Create Razorpay order
    const orderRes  = await fetch(API + '/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: bookingAmount })
    });
    const order = await orderRes.json();
    if (!orderRes.ok) { showToast('❌ Payment setup failed: ' + order.msg); return; }

    // 2. Open Razorpay checkout
    const options = {
      key:       order.key,
      amount:    order.amount,
      currency:  'INR',
      order_id:  order.id,
      name:      'GreenTech Agritourism',
      description: 'Farm Stay Booking',
      prefill:   { name: firstName, email: email },
      theme:     { color: '#3d6b45' },
      handler: async function(response) {
        // 3. Verify payment
        const verifyRes = await fetch(API + '/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id:    response.razorpay_order_id,
            razorpay_payment_id:  response.razorpay_payment_id,
            razorpay_signature:   response.razorpay_signature
          })
        });
        const verify = await verifyRes.json();
        if (!verify.success) { showToast('❌ Payment verification failed'); return; }

        // 4. Save booking to DB
        const farmName = document.querySelector('#page-booking .form-select')?.value || 'Sunrise Organic Farm';
        await fetch(API + '/bookings', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            farmName,
            checkIn:   document.querySelector('#page-booking input[type="date"]')?.value,
            checkOut:  document.querySelectorAll('#page-booking input[type="date"]')[1]?.value,
            firstName, email,
            amount:    bookingAmount,
            paymentId: response.razorpay_payment_id,
            orderId:   response.razorpay_order_id
          })
        });

        showToast('🎉 Booking confirmed! Check your email for details.');
      }
    };

    if (typeof Razorpay === 'undefined') {
      // Razorpay script not loaded (test mode)
      showToast('🎉 Booking confirmed! (Test mode — Razorpay not loaded)');
      return;
    }
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (e) {
    showToast('❌ Booking failed. Please try again.');
    console.error(e);
  } finally {
    btn.textContent = 'Confirm & Pay ₹' + bookingAmount.toLocaleString('en-IN');
    btn.disabled = false;
  }
}

// ============================================================
//  AI RECOMMENDATION — via backend proxy (key stays safe)
// ============================================================
async function runAI() {
  const prompt = document.getElementById('ai-prompt').value.trim();
  if (!prompt) { showToast('Please describe your dream farm experience first!'); return; }

  const result = document.getElementById('ai-result');
  result.style.display = 'block';
  result.textContent = '✦ Finding your perfect farm experience...';

  try {
    const res  = await fetch(API + '/ai/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    result.textContent = data.result || 'No recommendations found.';
  } catch (e) {
    // Fallback if backend offline
    result.textContent = '🌾 Here are some perfect picks:\n\n✦ Sunrise Organic Farm, Nashik — Award-winning wheat & mango farm. ₹2,500/night\n\n✦ Tribal Heritage Stay, Bastar — Gondi tribal experience with forest walks. ₹1,800/night\n\n✦ Spice Trail Homestay, Kerala — Cardamom forests + Ayurveda retreat. ₹3,100/night';
  }
}

// ============================================================
//  LOCAL FALLBACK DATA (used when backend is offline)
// ============================================================
const localFarms = [
  {name:'Sunrise Organic Farm',location:'Nashik, Maharashtra',description:'100% organic produce across 12 acres. Harvest wheat, tend cows, and sleep under the Deccan stars.',price:2500,tags:['Organic','Family','Harvest'],emoji:'🌾',rating:4.9,featured:true},
  {name:'Tribal Heritage Stay',location:'Bastar, Chhattisgarh',description:'Immerse in Gondi tribal culture — traditional art, forest food, and ancient craft traditions.',price:1800,tags:['Tribal','Cultural','Art'],emoji:'🎨',rating:4.8,featured:true},
  {name:'Golden Wheat Fields',location:'Amritsar, Punjab',description:'Wake to golden fields, join the harvest, and enjoy authentic Punjabi home cooking.',price:2200,tags:['Harvest','Adventure','Family'],emoji:'🌻',rating:4.7},
  {name:'Spice Trail Homestay',location:'Wayanad, Kerala',description:'Walk through cardamom forests, learn spice processing, and rejuvenate with Ayurvedic practices.',price:3100,tags:['Spice','Wellness','Nature'],emoji:'🌿',rating:5.0},
  {name:'Bamboo Valley Retreat',location:'Majuli, Assam',description:"Stay on the world's largest river island. Weave bamboo, fish with locals.",price:1600,tags:['Adventure','Cultural','River'],emoji:'🎋',rating:4.6},
  {name:'Desert Rose Farm',location:'Pushkar, Rajasthan',description:'Desert sunrise camel rides, rose harvest, and traditional Rajasthani meals on chulhas.',price:2800,tags:['Desert','Camel','Festival'],emoji:'🌹',rating:4.8}
];

const products = [
  {name:'Wild Forest Honey',farmer:'Priya Farms, Assam',price:'₹480',emoji:'🍯'},
  {name:'Bastar Tribal Art Print',farmer:'Gondi Collective, CG',price:'₹1,200',emoji:'🎨'},
  {name:'Organic Turmeric Powder',farmer:'Kerala Spice Farm',price:'₹320',emoji:'🌿'},
  {name:'Hand-woven Bamboo Basket',farmer:'Majuli Crafts, Assam',price:'₹750',emoji:'🧺'},
  {name:'Cold-Pressed Mustard Oil',farmer:'Punjab Organics',price:'₹390',emoji:'🫙'},
  {name:'Terracotta Chai Set',farmer:'Rajasthan Potter Co.',price:'₹950',emoji:'☕'},
  {name:'Dried Mango Slices',farmer:'Devgad Farms, MH',price:'₹280',emoji:'🥭'},
  {name:'Pahadi Pink Salt',farmer:'Uttarakhand Naturals',price:'₹220',emoji:'🧂'}
];

const festivals = [
  {name:'Wheat Harvest Festival',loc:'Amritsar, Punjab',date:'Apr 12–14, 2026',emoji:'🌾'},
  {name:'Bastar Dussehra',loc:'Jagdalpur, CG',date:'Oct 3–13, 2026',emoji:'🎭'},
  {name:'Mango Blossom Mela',loc:'Devgad, MH',date:'Mar 1–5, 2026',emoji:'🥭'},
  {name:'Onam Harvest Feast',loc:'Kerala',date:'Sep 5–15, 2026',emoji:'🌺'}
];

const adopts = [
  {icon:'🌱',title:'Seed a Season',desc:'Sponsor one farming season and receive fresh produce, handwritten updates from your farmer family, and a certificate of adoption.',price:'₹2,500/season'},
  {icon:'🐄',title:'Adopt a Cow',desc:'Support a dairy farmer\'s livelihood. Receive monthly ghee and paneer deliveries and virtual cow-cam access.',price:'₹1,200/month'},
  {icon:'🌳',title:'Plant a Tree Grove',desc:'Fund 10 native trees on a tribal farm. Track growth via photos and help restore biodiversity in forest-edge communities.',price:'₹5,000 once'}
];

const reviews = [
  {name:'Neha Joshi',loc:'Mumbai',text:'The Bastar tribal stay changed my perspective completely. The family taught me to make Warli art and I left with so much warmth. Highly recommend!',rating:5,date:'Mar 2026'},
  {name:'Arjun Mehta',loc:'Bangalore',text:'Sunrise Organic Farm was breathtaking. My kids harvested wheat for the first time. The food was incredible and the family so welcoming!',rating:5,date:'Feb 2026'},
  {name:'Priti Sinha',loc:'Delhi',text:'Spice Trail Homestay in Kerala exceeded all expectations. The cardamom plantation walk was magical. Will definitely return.',rating:5,date:'Jan 2026'}
];

const experiences = [
  {name:'Farm Harvest Activity',price:'₹800',icon:'🌾'},
  {name:'Village Cultural Tour',price:'₹500',icon:'🏘️'},
  {name:'Traditional Cooking Class',price:'₹600',icon:'🍛'},
  {name:'Nature Trek & Bird Walk',price:'₹400',icon:'🦅'},
  {name:'Tribal Art Workshop',price:'₹700',icon:'🎨'}
];

const courses = [
  {icon:'🏠',title:'Hospitality for Farmers',meta:'12 lessons · 4.5 hrs · Beginner',progress:100,status:'Completed'},
  {icon:'💰',title:'Smart Pricing Strategies',meta:'8 lessons · 3 hrs · Intermediate',progress:75,status:'In Progress'},
  {icon:'📸',title:'Farm Photography for Listings',meta:'6 lessons · 2 hrs · Beginner',progress:40,status:'In Progress'},
  {icon:'🛡️',title:'Guest Safety & Emergency Response',meta:'10 lessons · 4 hrs · Essential',progress:0,status:'Start'},
  {icon:'📱',title:'Digital Tools for Farmers',meta:'14 lessons · 5 hrs · Beginner',progress:0,status:'Start'},
  {icon:'🌿',title:'Organic Certification Guide',meta:'9 lessons · 3.5 hrs · Advanced',progress:0,status:'Start'},
  {icon:'🗣️',title:'English for Agritourism',meta:'20 lessons · 8 hrs · Beginner',progress:0,status:'Start'},
  {icon:'📊',title:'Financial Management for Farms',meta:'11 lessons · 4 hrs · Intermediate',progress:0,status:'Start'}
];

const forumPosts = [
  {title:'How I increased bookings by 60% using better photos',tags:['Photography','Tips'],author:'Ramesh K.',time:'2h ago',replies:14,likes:38},
  {title:'Anyone tried seasonal pricing for mango harvest season?',tags:['Pricing','Seasonal'],author:'Priya S.',time:'5h ago',replies:7,likes:22},
  {title:'Guide to handling international tourists — cultural tips',tags:['Hospitality','International'],author:'Anwar M.',time:'1d ago',replies:21,likes:55},
  {title:'Government subsidy scheme for agritourism farms 2026',tags:['Government','Finance'],author:'Kavita R.',time:'2d ago',replies:9,likes:31},
  {title:"My experience with 'Adopt a Farm' program — 6 months in",tags:['Success Story'],author:'Lakshmi D.',time:'3d ago',replies:16,likes:47}
];

const chatContacts = [
  {name:'Rajesh Singh',role:'Sunrise Organic Farm, Nashik',avatar:'RS',active:true},
  {name:'Priya Nair',role:'Spice Trail Homestay, Kerala',avatar:'PN',active:false},
  {name:'Mohammed Anwar',role:'Tribal Heritage Stay, Bastar',avatar:'MA',active:false},
  {name:'Kavita Rao',role:'Tourist · Hyderabad',avatar:'KR',active:false}
];

const chatMessages = [
  {from:'recv',text:'Namaste! Thank you for your interest in our farm. We would love to host you!',time:'10:30 AM'},
  {from:'sent',text:'Hi Rajesh ji! I saw your farm listing. Can we bring 2 children aged 8 and 11?',time:'10:32 AM'},
  {from:'recv',text:'Absolutely! Children are very welcome here. We have special activities for them — feeding calves, collecting eggs, and a nature trail.',time:'10:35 AM'},
  {from:'sent',text:'That sounds wonderful! Do you also offer vegetarian meals? We are a vegetarian family.',time:'10:37 AM'},
  {from:'recv',text:'Yes, all our meals are pure vegetarian. We use only organic produce grown right here on the farm. 🌿',time:'10:39 AM'}
];

const upiOptions = [
  {icon:'📱',name:'UPI / GPay'},
  {icon:'💳',name:'PhonePe'},
  {icon:'🏦',name:'Paytm'},
  {icon:'🔐',name:'Net Banking'},
  {icon:'💰',name:'Card'}
];

const achievements = [
  {icon:'⭐',title:'Superhost',desc:'Maintained 4.8+ rating for 3 months',earned:true},
  {icon:'🌱',title:'Eco Warrior',desc:'Certified organic farm practices',earned:true},
  {icon:'🎓',title:'Trained Pro',desc:'Completed 5 training courses',earned:true},
  {icon:'💰',title:'₹1 Lakh Club',desc:'Earned ₹1L+ from agritourism',earned:true},
  {icon:'📸',title:'Photo Master',desc:'Professional listing photos',earned:false},
  {icon:'🗣️',title:'Storyteller',desc:'Published 3 farm stories',earned:false}
];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const earningsData = [8,12,9,15,18,14,21,19,24,16,20,18];
const visitorData  = [22,35,28,48,55,42];

// ---- RENDER FUNCTIONS ----
function renderMarketplace(){
  const grid = document.getElementById('market-grid');
  grid.innerHTML = products.map(p=>`
    <div class="product-card">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-farmer">by ${p.farmer}</div>
        <div class="product-footer">
          <div class="product-price">${p.price}</div>
          <button class="btn-cart" onclick="addToCart('${p.name}', '${p.price}')">Add to Cart</button>
        </div>
      </div>
    </div>`).join('');
}

let cartCount = 0;

function addToCart(name, price) {
  cartCount++;

  // Update cart count
  document.getElementById('cart-btn').textContent = '🛒 Cart (' + cartCount + ')';

  // Show message
  showToast(name + ' added to cart! 🛒');
}

function renderFestivals(){
  const grid = document.getElementById('festival-grid');
  grid.innerHTML = festivals.map(f=>`
    <div class="festival-card">
      <div class="festival-emoji">${f.emoji}</div>
      <div class="festival-date">${f.date}</div>
      <div class="festival-name">${f.name}</div>
      <div class="festival-loc">📍 ${f.loc}</div>
    </div>`).join('');
}

function renderAdopt(){
  const grid = document.getElementById('adopt-grid');
  grid.innerHTML = adopts.map(a=>`
    <div class="adopt-card">
      <div class="adopt-icon">${a.icon}</div>
      <div class="adopt-body">
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <strong style="color:var(--forest);font-family:'Space Mono',monospace;font-size:0.88rem">${a.price}</strong>
          <button class="btn-cart" onclick="adoptFarm('${a.title}')">Adopt Now</button>
        </div>
      </div>
    </div>`).join('');
}

function adoptFarm(title) {
  if (!getToken()) { showToast('Please sign in to adopt a farm'); openModal('login'); return; }
  showToast('Adoption request submitted for ' + title + '! 🌱');
}

function renderReviews(){
  const grid = document.getElementById('reviews-grid');
  grid.innerHTML = reviews.map(r=>`
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-avatar">${r.name.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="review-date">📍 ${r.loc} · ${r.date}</div>
        </div>
        <div class="review-stars" style="margin-left:auto">${'★'.repeat(r.rating)}</div>
      </div>
      <div class="review-text">"${r.text}"</div>
    </div>`).join('');
}

function renderBookingExperiences(){
  const wrap = document.getElementById('exp-options');
  wrap.innerHTML = experiences.map(e=>`
    <label style="display:flex;align-items:center;gap:0.75rem;padding:0.65rem 0.85rem;border:1.5px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;font-size:0.88rem;transition:border-color 0.2s" onmouseover="this.style.borderColor='var(--sage)'" onmouseout="this.style.borderColor='var(--border)'">
      <input type="checkbox" style="accent-color:var(--sage)"/>
      <span style="font-size:1.2rem">${e.icon}</span>
      <span style="flex:1;font-weight:500">${e.name}</span>
      <span style="color:var(--sage);font-weight:700;font-family:'Space Mono',monospace;font-size:0.82rem">${e.price}</span>
    </label>`).join('');
}

function renderUPIOptions(){
  const wrap = document.getElementById('upi-opts');
  wrap.innerHTML = upiOptions.map((u,i)=>`
    <div class="upi-option ${i===0?'selected':''}" onclick="selectUPI(this)">
      <span class="upi-icon">${u.icon}</span>${u.name}
    </div>`).join('');
}

function renderCourses(){
  const list = document.getElementById('courses-list');
  list.innerHTML = courses.map(c=>`
    <div class="course-card">
      <div class="course-icon">${c.icon}</div>
      <div class="course-body">
        <div class="course-title">${c.title}</div>
        <div class="course-meta">${c.meta}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${c.progress}%"></div></div>
        <div class="course-actions">
          <span style="font-size:0.75rem;color:var(--text-light)">${c.progress}% complete</span>
          <button class="btn-cart" onclick="showToast('Opening course: ${c.title.replace(/'/g,"'")}')">
            ${c.status==='Completed'?'Review':'Start'}
          </button>
        </div>
      </div>
    </div>`).join('');
}

function renderForum(){
  const list = document.getElementById('forum-list');
  list.innerHTML = forumPosts.map(p=>`
    <div class="forum-post">
      <div>${p.tags.map(t=>`<span class="forum-tag">${t}</span>`).join('')}</div>
      <div class="forum-post-title" onclick="showToast('Opening post...')">${p.title}</div>
      <div class="forum-meta">
        <span>👤 ${p.author}</span>
        <span>💬 ${p.replies} replies</span>
        <span>❤️ ${p.likes}</span>
        <span>🕐 ${p.time}</span>
      </div>
    </div>`).join('');

  const lb = document.getElementById('leaderboard');
  const lbData = [{name:'Ramesh K.',pts:284,badge:'🥇'},{name:'Priya N.',pts:219,badge:'🥈'},{name:'Anwar M.',pts:188,badge:'🥉'},{name:'Kavita R.',pts:152,badge:'⭐'},{name:'Sunita D.',pts:98,badge:'⭐'}];
  lb.innerHTML = lbData.map(u=>`
    <div style="display:flex;align-items:center;gap:0.65rem;font-size:0.85rem">
      <span style="font-size:1rem">${u.badge}</span>
      <span style="flex:1;font-weight:500">${u.name}</span>
      <span style="color:var(--sage);font-weight:700;font-family:'Space Mono',monospace;font-size:0.78rem">${u.pts}pts</span>
    </div>`).join('');

  const kb = document.getElementById('kb-links');
  const kbLinks = ['Tourist Safety Guidelines','Pricing Best Practices','Photography Tips','Government Schemes 2026','Organic Certification Steps'];
  kb.innerHTML = kbLinks.map(l=>`
    <a href="#" style="font-size:0.82rem;color:var(--sage);text-decoration:none;font-weight:500;display:flex;align-items:center;gap:0.4rem" onclick="showToast('Opening: ${l}');return false">📄 ${l}</a>`).join('');
}

function renderDashboard(){
  const chart = document.getElementById('earnings-chart');
  const max = Math.max(...earningsData);
  chart.innerHTML = earningsData.map((v,i)=>`
    <div class="bar-col">
      <div class="bar" style="height:${Math.round((v/max)*100)}%" title="₹${v}K"></div>
      <div class="bar-label">${months[i]}</div>
    </div>`).join('');

  const tbody = document.getElementById('bookings-table');
  const bookings = [
    {guest:'Arjun Mehta',date:'Apr 10',nights:3,amt:'₹8,250',status:'confirmed'},
    {guest:'Neha Joshi',date:'Apr 6',nights:2,amt:'₹5,500',status:'confirmed'},
    {guest:'Rohan Patel',date:'Mar 28',nights:4,amt:'₹11,000',status:'completed'},
    {guest:'Kavita Rao',date:'Mar 22',nights:2,amt:'₹5,500',status:'completed'},
    {guest:'Sanjay Singh',date:'Apr 15',nights:3,amt:'₹8,250',status:'pending'}
  ];
  tbody.innerHTML = bookings.map(b=>`
    <tr>
      <td>${b.guest}</td><td>${b.date}</td><td>${b.nights}</td>
      <td style="font-family:'Space Mono',monospace">${b.amt}</td>
      <td><span class="status-badge status-${b.status}">${b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span></td>
    </tr>`).join('');
}

function renderChat(){
  const contacts = document.getElementById('chat-contacts');
  contacts.innerHTML = chatContacts.map(c=>`
    <div class="chat-item ${c.active?'active':''}" onclick="selectContact(this,'${c.name}','${c.role}','${c.avatar}')">
      <div class="chat-item-avatar">${c.avatar}</div>
      <div class="chat-item-body">
        <div class="chat-item-name">${c.name}</div>
        <div class="chat-item-preview">${c.active?'Absolutely! Children are very welcome...':'Hey, I am interested in...'}</div>
      </div>
      <div class="chat-item-time">${c.active?'10:39 AM':'Yesterday'}</div>
    </div>`).join('');

  const msgs = document.getElementById('chat-messages');
  msgs.innerHTML = chatMessages.map(m=>`
    <div class="msg ${m.from}">
      <div class="msg-bubble">${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>`).join('');
  msgs.scrollTop = msgs.scrollHeight;
}

function renderAchievements(){
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = achievements.map(a=>`
    <div style="background:#fff;border-radius:var(--radius-md);padding:1.2rem;text-align:center;box-shadow:0 2px 10px var(--shadow);${a.earned?'':'opacity:0.45;filter:grayscale(1)'}">
      <div style="font-size:2.2rem;margin-bottom:0.5rem">${a.icon}</div>
      <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.25rem;color:var(--forest)">${a.title}</div>
      <div style="font-size:0.76rem;color:var(--text-light)">${a.desc}</div>
      ${a.earned?'<div style="margin-top:0.6rem;font-size:0.72rem;color:var(--moss);font-weight:700">✓ Earned</div>':'<div style="margin-top:0.6rem;font-size:0.72rem;color:var(--text-light)">Locked</div>'}
    </div>`).join('');
}

function renderAnalytics(){
  const chart = document.getElementById('visitor-chart');
  const max = Math.max(...visitorData);
  chart.innerHTML = visitorData.map((v,i)=>`
    <div class="bar-col">
      <div class="bar" style="height:${Math.round((v/max)*100)}%" title="${v} visitors"></div>
      <div class="bar-label">${months[i]}</div>
    </div>`).join('');

  const sources = document.getElementById('traffic-sources');
  const srcData = [{name:'GreenTech Discover',pct:54},{name:'Direct Search',pct:22},{name:'Social Media',pct:14},{name:'Referrals',pct:10}];
  sources.innerHTML = srcData.map(s=>`
    <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.85rem">
      <span style="width:120px;color:var(--text-mid)">${s.name}</span>
      <div style="flex:1;background:var(--mist);border-radius:50px;height:8px;overflow:hidden"><div style="width:${s.pct}%;background:var(--sage);height:100%;border-radius:50px"></div></div>
      <span style="font-weight:700;color:var(--forest);width:35px;text-align:right">${s.pct}%</span>
    </div>`).join('');

  const income = document.getElementById('income-sources');
  const incomeData = [{src:'Farm Homestay',amt:'₹11,200',pct:61},{src:'Experience Packages',amt:'₹4,800',pct:26},{src:'Marketplace Sales',amt:'₹2,400',pct:13}];
  income.innerHTML = incomeData.map(s=>`
    <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.85rem">
      <span style="width:150px;color:var(--text-mid)">${s.src}</span>
      <div style="flex:1;background:var(--mist);border-radius:50px;height:8px;overflow:hidden"><div style="width:${s.pct}%;background:var(--moss);height:100%;border-radius:50px"></div></div>
      <span style="font-weight:700;color:var(--forest);font-family:'Space Mono',monospace;font-size:0.8rem">${s.amt}</span>
    </div>`).join('');
}

// ---- INTERACTIONS ----
function showPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  const links = document.querySelectorAll('.nav-link');
  const map = {home:0,marketplace:1,booking:2,training:3,community:4,dashboard:5,chat:6};
  if(map[page]!==undefined) links[map[page]].classList.add('active');
  window.scrollTo(0,0);
}

function openModal(type){
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  document.getElementById('modal-'+type).style.display='block';
}

function closeModal(e){
  if(!e||e.target.id==='modal-overlay'){
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  }
}

function switchModal(type){
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  document.getElementById('modal-'+type).style.display='block';
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

function handleSearch(){
  showToast('Finding perfect farm stays for you... 🔍');
  loadFarms();
  setTimeout(()=>showPage('home'),400);
}

function filterFarms(el, cat){
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  if(cat==='all'){ renderFarms(allFarms); return; }
  const filtered = allFarms.filter(f=>(f.tags||[]).some(t=>t.toLowerCase().includes(cat)));
  renderFarms(filtered.length ? filtered : allFarms);
  showToast('Showing ' + (cat==='all'?'all farms':cat+' farms') + ' 🌾');
}

function selectUPI(el){
  document.querySelectorAll('.upi-option').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}

function switchDash(el,section){
  document.querySelectorAll('.sidebar-nav-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  ['dash-overview','dash-achievements','dash-analytics','dash-profile','dash-earnings'].forEach(id=>{
    const el2 = document.getElementById(id);
    if(el2) el2.style.display='none';
  });
  const show = {overview:'dash-overview',achievements:'dash-achievements',analytics:'dash-analytics',profile:'dash-profile',earnings:'dash-earnings',bookings:'dash-overview',listings:'dash-overview'};
  if(show[section]) document.getElementById(show[section]).style.display='block';
  if(section==='analytics') renderAnalytics();
  if(section==='achievements') renderAchievements();
}

function selectContact(el,name,role,avatar){
  document.querySelectorAll('.chat-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('chat-active-name').textContent=name;
  document.getElementById('chat-active-role').textContent=role;
  document.getElementById('chat-active-avatar').textContent=avatar;
}

function sendMsg(){
  const input = document.getElementById('chat-input');
  const text  = input.value.trim();
  if(!text) return;
  const msgs = document.getElementById('chat-messages');
  const now  = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  msgs.innerHTML += `<div class="msg sent"><div class="msg-bubble">${text}</div><div class="msg-time">${now}</div></div>`;
  input.value='';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(()=>{
    const replies = ['That sounds wonderful! Let me check the availability for you.','Of course! We are happy to accommodate your request.','Thank you for reaching out. We look forward to hosting you! 🌿','Please let me know if you have any other questions.'];
    const reply = replies[Math.floor(Math.random()*replies.length)];
    msgs.innerHTML += `<div class="msg recv"><div class="msg-bubble">${reply}</div><div class="msg-time">${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div></div>`;
    msgs.scrollTop = msgs.scrollHeight;
  },1200);
}

function saveProfile(){
  if(!getToken()){ showToast('Please sign in first'); return; }
  showToast('Profile updated successfully! ✅');
}

// ---- INIT ----
(async () => {
  await checkSession();
  await loadFarms();   // fetch from DB (with fallback)
  renderMarketplace();
  renderFestivals();
  renderAdopt();
  renderReviews();
  renderBookingExperiences();
  renderUPIOptions();
  renderCourses();
  renderForum();
  renderDashboard();
  renderChat();
})();
