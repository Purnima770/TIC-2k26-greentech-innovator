const farms = [
  {name:"Sunrise Organic Farm",loc:"Nashik, Maharashtra",desc:"100% organic produce across 12 acres. Harvest wheat, tend cows, and sleep under the Deccan stars.",price:"₹2,500",rating:"4.9",tags:["Organic","Family","Harvest"],image:'https://familyfarms.in/images/farm_house_image/DOC1668165399712.4.jpg',featured:true},
  {name:"Tribal Heritage Stay",loc:"Bastar, Chhattisgarh",desc:"Immerse in Gondi tribal culture — traditional art, forest food, and ancient craft traditions.",price:"₹1,800",rating:"4.8",tags:["Tribal","Cultural","Art"],image:'https://curlytales.com/wp-content/uploads/2024/02/Bastar-Tribal-Homestay-1280x720.jpg',featured:true},
  {name:"Golden Wheat Fields",loc:"Amritsar, Punjab",desc:"Wake to golden fields, join the harvest, and enjoy authentic Punjabi home cooking with local families.",price:"₹2,200",rating:"4.7",tags:["Harvest","Adventure","Family"],image:'https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTMyYWI1NTIwLTJkMzItMTFmMS04ZWE5LTk5MGI3ZjZhOWEzOS5qcGc='},
  {name:"Spice Trail Homestay",loc:"Wayanad, Kerala",desc:"Walk through cardamom forests, learn spice processing, and rejuvenate with Ayurvedic practices.",price:"₹3,100",rating:"5.0",tags:["Spice","Wellness","Nature"],image:'https://media-cdn.tripadvisor.com/media/photo-s/17/86/64/d2/dsc-0378-largejpg.jpg'},
  {name:"Bamboo Valley Retreat",loc:"Majuli, Assam",desc:"Stay on the world's largest river island. Weave bamboo, fish with locals, and witness Sattriya dance.",price:"₹1,600",rating:"4.6",tags:["Adventure","Cultural","River"],image:'https://i0.wp.com/kaziranganationalparkassam.in/wp-content/uploads/2018/08/img_20180422_105726_hdr.jpg?ssl=1'},
  {name:"Desert Rose Farm",loc:"Pushkar, Rajasthan",desc:"Desert sunrise camel rides, rose harvest, and traditional Rajasthani meals cooked on chulhas.",price:"₹2,800",rating:"4.8",tags:["Desert","Camel","Festival"],image:'https://www.hlimg.com/images/things2do/738X538/rose-farm_1560419313-3196e.jpg?w=400&dpr=2.6'}
];

const products = [
  {name:"Wild Forest Honey",farmer:"Priya Farms, Assam",price:"₹480",emoji:"🍯",cat:"Honey & Dairy"},
  {name:"Bastar Tribal Art Print",farmer:"Gondi Collective, CG",price:"₹1,200",emoji:"🎨",cat:"Tribal Art"},
  {name:"Organic Turmeric Powder",farmer:"Kerala Spice Farm",price:"₹320",emoji:"🌿",cat:"Spices & Herbs"},
  {name:"Hand-woven Bamboo Basket",farmer:"Majuli Crafts, Assam",price:"₹750",emoji:"🧺",cat:"Handicrafts"},
  {name:"Cold-Pressed Mustard Oil",farmer:"Punjab Organics",price:"₹390",emoji:"🫙",cat:"Organic Food"},
  {name:"Terracotta Chai Set",farmer:"Rajasthan Potter Co.",price:"₹950",emoji:"☕",cat:"Handicrafts"},
  {name:"Dried Mango Slices",farmer:"Devgad Farms, MH",price:"₹280",emoji:"🥭",cat:"Organic Food"},
  {name:"Pahadi Pink Salt",farmer:"Uttarakhand Naturals",price:"₹220",emoji:"🧂",cat:"Spices & Herbs"}
];

const festivals = [
  {name:"Wheat Harvest Festival",loc:"Amritsar, Punjab",date:"Apr 12–14, 2025",emoji:"🌾"},
  {name:"Bastar Dussehra",loc:"Jagdalpur, CG",date:"Oct 3–13, 2025",emoji:"🎭"},
  {name:"Mango Blossom Mela",loc:"Devgad, MH",date:"Mar 1–5, 2025",emoji:"🥭"},
  {name:"Onam Harvest Feast",loc:"Kerala",date:"Sep 5–15, 2025",emoji:"🌺"}
];

const adopts = [
  {icon:"🌱",title:"Seed a Season",desc:"Sponsor one farming season and receive fresh produce, handwritten updates from your farmer family, and a certificate of adoption.",price:"₹2,500/season"},
  {icon:"🐄",title:"Adopt a Cow",desc:"Support a dairy farmer's livelihood. Receive monthly ghee and paneer deliveries and virtual cow-cam access.",price:"₹1,200/month"},
  {icon:"🌳",title:"Plant a Tree Grove",desc:"Fund 10 native trees on a tribal farm. Track growth via photos and help restore biodiversity in forest-edge communities.",price:"₹5,000 once"}
];

const reviews = [
  {name:"Neha Joshi",loc:"Mumbai",text:"The Bastar tribal stay changed my perspective completely. The family taught me to make Warli art and I left with so much warmth. Highly recommend!",rating:5,date:"Mar 2025"},
  {name:"Arjun Mehta",loc:"Bangalore",text:"Sunrise Organic Farm was breathtaking. My kids harvested wheat for the first time. The food was incredible and the family so welcoming!",rating:5,date:"Feb 2025"},
  {name:"Priti Sinha",loc:"Delhi",text:"Spice Trail Homestay in Kerala exceeded all expectations. The cardamom plantation walk was magical. Will definitely return.",rating:5,date:"Jan 2025"}
];

const experiences = [
  {name:"Farm Harvest Activity",price:"₹800",icon:"🌾"},
  {name:"Village Cultural Tour",price:"₹500",icon:"🏘️"},
  {name:"Traditional Cooking Class",price:"₹600",icon:"🍛"},
  {name:"Nature Trek & Bird Walk",price:"₹400",icon:"🦅"},
  {name:"Tribal Art Workshop",price:"₹700",icon:"🎨"}
];

const courses = [
  {icon:"🏠",title:"Hospitality for Farmers",meta:"12 lessons · 4.5 hrs · Beginner",progress:100,status:"Completed"},
  {icon:"💰",title:"Smart Pricing Strategies",meta:"8 lessons · 3 hrs · Intermediate",progress:75,status:"In Progress"},
  {icon:"📸",title:"Farm Photography for Listings",meta:"6 lessons · 2 hrs · Beginner",progress:40,status:"In Progress"},
  {icon:"🛡️",title:"Guest Safety & Emergency Response",meta:"10 lessons · 4 hrs · Essential",progress:0,status:"Start"},
  {icon:"📱",title:"Digital Tools for Farmers",meta:"14 lessons · 5 hrs · Beginner",progress:0,status:"Start"},
  {icon:"🌿",title:"Organic Certification Guide",meta:"9 lessons · 3.5 hrs · Advanced",progress:0,status:"Start"},
  {icon:"🗣️",title:"English for Agritourism",meta:"20 lessons · 8 hrs · Beginner",progress:0,status:"Start"},
  {icon:"📊",title:"Financial Management for Farms",meta:"11 lessons · 4 hrs · Intermediate",progress:0,status:"Start"}
];

const forumPosts = [
  {title:"How I increased bookings by 60% using better photos",tags:["Photography","Tips"],author:"Ramesh K.",time:"2h ago",replies:14,likes:38},
  {title:"Anyone tried seasonal pricing for mango harvest season?",tags:["Pricing","Seasonal"],author:"Priya S.",time:"5h ago",replies:7,likes:22},
  {title:"Guide to handling international tourists — cultural tips",tags:["Hospitality","International"],author:"Anwar M.",time:"1d ago",replies:21,likes:55},
  {title:"Government subsidy scheme for agritourism farms 2025",tags:["Government","Finance"],author:"Kavita R.",time:"2d ago",replies:9,likes:31},
  {title:"My experience with 'Adopt a Farm' program — 6 months in",tags:["Success Story"],author:"Lakshmi D.",time:"3d ago",replies:16,likes:47}
];

const chatContacts = [
  {name:"Rajesh Singh",role:"Sunrise Organic Farm, Nashik",avatar:"RS",active:true},
  {name:"Priya Nair",role:"Spice Trail Homestay, Kerala",avatar:"PN",active:false},
  {name:"Mohammed Anwar",role:"Tribal Heritage Stay, Bastar",avatar:"MA",active:false},
  {name:"Kavita Rao",role:"Tourist · Hyderabad",avatar:"KR",active:false}
];

const chatMessages = [
  {from:"recv",text:"Namaste! Thank you for your interest in our farm. We would love to host you!",time:"10:30 AM"},
  {from:"sent",text:"Hi Rajesh ji! I saw your farm listing. Can we bring 2 children aged 8 and 11?",time:"10:32 AM"},
  {from:"recv",text:"Absolutely! Children are very welcome here. We have special activities for them — feeding calves, collecting eggs, and a nature trail.",time:"10:35 AM"},
  {from:"sent",text:"That sounds wonderful! Do you also offer vegetarian meals? We are a vegetarian family.",time:"10:37 AM"},
  {from:"recv",text:"Yes, all our meals are pure vegetarian. We use only organic produce grown right here on the farm. 🌿",time:"10:39 AM"}
];

const upiOptions = [
  {icon:"📱",name:"UPI / GPay"},
  {icon:"💳",name:"PhonePe"},
  {icon:"🏦",name:"Paytm"},
  {icon:"🔐",name:"Net Banking"},
  {icon:"💰",name:"Card"}
];

const achievements = [
  {icon:"⭐",title:"Superhost",desc:"Maintained 4.8+ rating for 3 months",earned:true},
  {icon:"🌱",title:"Eco Warrior",desc:"Certified organic farm practices",earned:true},
  {icon:"🎓",title:"Trained Pro",desc:"Completed 5 training courses",earned:true},
  {icon:"💰",title:"₹1 Lakh Club",desc:"Earned ₹1L+ from agritourism",earned:true},
  {icon:"📸",title:"Photo Master",desc:"Professional listing photos",earned:false},
  {icon:"🗣️",title:"Storyteller",desc:"Published 3 farm stories",earned:false}
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const earningsData = [8,12,9,15,18,14,21,19,24,16,20,18];
const visitorData = [22,35,28,48,55,42];

// ---- RENDER FUNCTIONS ----
function renderFarms(){
  const grid = document.getElementById('farm-grid');
  grid.innerHTML = farms.map(f=>`
    <div class="farm-card fade-up" onclick="showPage('booking')">
      <div class="farm-img" style="background:var(--mist);font-size:4rem;display:flex;align-items:center;justify-content:center">
        <div class="farm-img">
  <img src="${f.image || 'default.jpg'}" 
       style="width:100%;height:100%;object-fit:cover;">
</div>

        ${f.featured?'<div class="farm-badge featured">✦ Featured</div>':'<div class="farm-badge">Verified</div>'}
        <button class="farm-fav" onclick="event.stopPropagation();this.textContent=this.textContent==='❤️'?'🤍':'❤️'">🤍</button>
      </div>
      <div class="farm-body">
        <div class="farm-loc">📍 ${f.loc}</div>
        <div class="farm-name">${f.name}</div>
        <div class="tags">${f.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="farm-desc">${f.desc}</div>
        <div class="farm-meta">
          <div class="farm-price">${f.price} <span>/ night</span></div>
          <div class="farm-rating">★ ${f.rating}</div>
        </div>
      </div>
    </div>`).join('');
}

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
          <button class="btn-cart" onclick="showToast('Added to cart! 🛒')">Add to Cart</button>
        </div>
      </div>
    </div>`).join('');
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
          <button class="btn-cart" onclick="showToast('Adoption request submitted! 🌱')">Adopt Now</button>
        </div>
      </div>
    </div>`).join('');
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
  const lbData = [{name:"Ramesh K.",pts:284,badge:"🥇"},{name:"Priya N.",pts:219,badge:"🥈"},{name:"Anwar M.",pts:188,badge:"🥉"},{name:"Kavita R.",pts:152,badge:"⭐"},{name:"Sunita D.",pts:98,badge:"⭐"}];
  lb.innerHTML = lbData.map(u=>`
    <div style="display:flex;align-items:center;gap:0.65rem;font-size:0.85rem">
      <span style="font-size:1rem">${u.badge}</span>
      <span style="flex:1;font-weight:500">${u.name}</span>
      <span style="color:var(--sage);font-weight:700;font-family:'Space Mono',monospace;font-size:0.78rem">${u.pts}pts</span>
    </div>`).join('');

  const kb = document.getElementById('kb-links');
  const kbLinks = ["Tourist Safety Guidelines","Pricing Best Practices","Photography Tips","Government Schemes 2025","Organic Certification Steps"];
  kb.innerHTML = kbLinks.map(l=>`
    <a href="#" style="font-size:0.82rem;color:var(--sage);text-decoration:none;font-weight:500;display:flex;align-items:center;gap:0.4rem" onclick="showToast('Opening: ${l}');return false">📄 ${l}</a>`).join('');
}

function renderDashboard(){
  // Earnings chart
  const chart = document.getElementById('earnings-chart');
  const max = Math.max(...earningsData);
  chart.innerHTML = earningsData.map((v,i)=>`
    <div class="bar-col">
      <div class="bar" style="height:${Math.round((v/max)*100)}%" title="₹${v}K"></div>
      <div class="bar-label">${months[i]}</div>
    </div>`).join('');

  // Bookings table
  const tbody = document.getElementById('bookings-table');
  const bookings = [
    {guest:"Arjun Mehta",date:"Apr 10",nights:3,amt:"₹8,250",status:"confirmed"},
    {guest:"Neha Joshi",date:"Apr 6",nights:2,amt:"₹5,500",status:"confirmed"},
    {guest:"Rohan Patel",date:"Mar 28",nights:4,amt:"₹11,000",status:"completed"},
    {guest:"Kavita Rao",date:"Mar 22",nights:2,amt:"₹5,500",status:"completed"},
    {guest:"Sanjay Singh",date:"Apr 15",nights:3,amt:"₹8,250",status:"pending"}
  ];
  tbody.innerHTML = bookings.map(b=>`
    <tr>
      <td>${b.guest}</td><td>${b.date}</td><td>${b.nights}</td><td style="font-family:'Space Mono',monospace">${b.amt}</td>
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
  const srcData = [{name:"GreenTech Discover",pct:54},{name:"Direct Search",pct:22},{name:"Social Media",pct:14},{name:"Referrals",pct:10}];
  sources.innerHTML = srcData.map(s=>`
    <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.85rem">
      <span style="width:120px;color:var(--text-mid)">${s.name}</span>
      <div style="flex:1;background:var(--mist);border-radius:50px;height:8px;overflow:hidden"><div style="width:${s.pct}%;background:var(--sage);height:100%;border-radius:50px"></div></div>
      <span style="font-weight:700;color:var(--forest);width:35px;text-align:right">${s.pct}%</span>
    </div>`).join('');

  const income = document.getElementById('income-sources');
  const incomeData = [{src:"Farm Homestay",amt:"₹11,200",pct:61},{src:"Experience Packages",amt:"₹4,800",pct:26},{src:"Marketplace Sales",amt:"₹2,400",pct:13}];
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
  setTimeout(()=>showPage('home'),500);
}

function filterFarms(el,cat){
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  showToast(`Filtered: ${cat==='all'?'All farms':cat} 🌾`);
}

function selectUPI(el){
  document.querySelectorAll('.upi-option').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}

function confirmBooking(){
  showToast('🎉 Booking confirmed! Confirmation sent to your email.');
}

function switchDash(el,section){
  document.querySelectorAll('.sidebar-nav-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('dash-overview').style.display='none';
  document.getElementById('dash-achievements').style.display='none';
  document.getElementById('dash-analytics').style.display='none';
  document.getElementById('dash-profile').style.display='none';
  document.getElementById('dash-earnings').style.display='none';
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
  const text = input.value.trim();
  if(!text) return;
  const msgs = document.getElementById('chat-messages');
  const now = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  msgs.innerHTML += `<div class="msg sent"><div class="msg-bubble">${text}</div><div class="msg-time">${now}</div></div>`;
  input.value='';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(()=>{
    const replies = ["That sounds wonderful! Let me check the availability for you.","Of course! We are happy to accommodate your request.","Thank you for reaching out. We look forward to hosting you! 🌿","Please let me know if you have any other questions."];
    const reply = replies[Math.floor(Math.random()*replies.length)];
    msgs.innerHTML += `<div class="msg recv"><div class="msg-bubble">${reply}</div><div class="msg-time">${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div></div>`;
    msgs.scrollTop = msgs.scrollHeight;
  },1200);
}

// ---- AI RECOMMENDATION ----
async function runAI(){
  const prompt = document.getElementById('ai-prompt').value.trim();
  if(!prompt){showToast('Please describe your dream farm experience first!');return;}
  const result = document.getElementById('ai-result');
  result.style.display='block';
  result.textContent='✦ Finding your perfect farm experience...';
  try{
    const resp = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:`You are an expert agritourism planner for Green Tech Innovator, India's leading rural tourism platform. 
Given a tourist's travel request, recommend 2-3 specific farms from rural India with real-sounding details. 
Include farm name, location, best season, unique activities, and estimated cost per night.
Keep response friendly, enthusiastic, and under 200 words. Use relevant emojis.`,
        messages:[{role:'user',content:prompt}]
      })
    });
    const data = await resp.json();
    const text = data.content?.map(b=>b.text||'').join('') || 'Unable to generate recommendations right now. Please try again!';
    result.textContent = text;
  }catch(e){
    result.textContent = '🌾 Here are some perfect picks based on your preferences:\n\n✦ Sunrise Organic Farm, Nashik — Award-winning wheat & mango farm. Harvest activities + Ayurvedic meals. ₹2,500/night\n\n✦ Tribal Heritage Stay, Bastar — Gondi tribal experience with forest walks & traditional art. ₹1,800/night\n\n✦ Spice Trail Homestay, Kerala — Cardamom forests + Ayurveda retreat. Perfect for families. ₹3,100/night';
  }
}

// ---- INIT ----
renderFarms();
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