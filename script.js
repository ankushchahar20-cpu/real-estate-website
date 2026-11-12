/* ============================= CONSTANTS ============================= */
const CATS = [
  {id:'land', label:'Land'},
  {id:'house', label:'House'},
  {id:'flat', label:'Flats'},
  {id:'villa', label:'Villas'},
  {id:'shop', label:'Shop'},
  {id:'commercial', label:'Commercial'},
  {id:'island', label:'Island'},
  {id:'building', label:'Buildings'},
];
const FIRST_POST_FEE = 9;
const CONTACT_FEE = 9;
const SUB_FEE = 249;
const SUB_DAYS = 90;

/* small line icons (currentColor) */
const ICONS = {
  land:`<path d="M4 20l2-9 5-3 5 3 2 9"/><path d="M4 20h14"/><circle cx="11" cy="9" r="1.4"/>`,
  house:`<path d="M4 11l7-6 7 6"/><path d="M6 10v9h10v-9"/><path d="M10 19v-5h3v5"/>`,
  flat:`<rect x="6" y="4" width="11" height="16" rx="1"/><path d="M9 8h1M13 8h1M9 12h1M13 12h1M9 16h1M13 16h1"/>`,
  villa:`<path d="M3 15c2-4 4-4 5-1s3 3 4 0 3-3 4 0 3 3 5 1"/><path d="M6 15v5h11v-5"/><path d="M8 20v-4h3v4"/>`,
  shop:`<path d="M4 9l1-4h13l1 4"/><path d="M4 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"/><path d="M5 9v10h13V9"/><path d="M9 19v-5h5v5"/>`,
  commercial:`<rect x="7" y="3" width="6" height="17" rx="1"/><rect x="14" y="8" width="4" height="12" rx="1"/><path d="M9 6h1M11 6h1M9 9h1M11 9h1M9 12h1M11 12h1"/>`,
  island:`<path d="M4 19c3-8 6-8 8-13 2 5 5 5 8 13"/><path d="M2 19h20"/>`,
  building:`<rect x="4" y="10" width="4" height="10"/><rect x="10" y="5" width="4" height="15"/><rect x="16" y="13" width="4" height="7"/>`,
  search:`<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>`,
  pin:`<path d="M12 21s7-6.6 7-11.5A7 7 0 105 9.5C5 14.4 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/>`,
  sell:`<path d="M3 12l9-9 9 9"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>`,
  agent:`<circle cx="12" cy="8" r="3.4"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>`,
  list:`<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>`,
  lock:`<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>`,
  upload:`<path d="M12 16V4M8 8l4-4 4 4"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>`,
  check:`<path d="M4 12l5 5L20 6"/>`,
  arrowleft:`<path d="M19 12H5M11 18l-6-6 6-6"/>`,
  users:`<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="8" r="2.6"/><path d="M17 12.2c2.2.4 4 2.2 4 4.8"/>`,
  home2:`<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>`,
  badge:`<path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/>`,
  tag:`<path d="M20 12l-8 8-9-9V4h7z"/><circle cx="7.5" cy="7.5" r="1.2"/>`,
};
function icon(name,cls=''){return `<svg class="${cls}" viewBox="0 0 24 24">${ICONS[name]||''}</svg>`;}

/* ============================= ILLUSTRATED SCENES ============================= */
/* deterministic pseudo-random from a string seed */
function seedNum(str){ let h=0; for(let i=0;i<str.length;i++){ h=(h*31+str.charCodeAt(i))>>>0; } return h; }
const SKY_SETS = [
  {top:'#FCEBD0', bottom:'#F7C68B', sun:'#F2A63F'},   // dawn
  {top:'#BFE3EC', bottom:'#7FC3CE', sun:'#FCE38A'},   // day
  {top:'#F7B48C', bottom:'#E1592F', sun:'#FFE08A'},   // sunset
  {top:'#6E97AE', bottom:'#345E70', sun:'#F4D06F'},   // dusk
];
function scene(category, seedStr, variant=0){
  const s = seedNum(seedStr+':'+variant);
  const sky = SKY_SETS[s % SKY_SETS.length];
  const flip = (s>>3)%2===0 ? '' : 'transform="scale(-1,1) translate(-400,0)"';
  const bodies = {
    land: landScene, house: houseScene, flat: flatScene, villa: villaScene,
    shop: shopScene, commercial: commercialScene, island: islandScene, building: buildingScene,
  };
  const draw = bodies[category] || houseScene;
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky${s}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky.top}"/><stop offset="1" stop-color="${sky.bottom}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#sky${s})"/>
    <circle cx="${60+((s>>5)%280)}" cy="${40+((s>>2)%30)}" r="20" fill="${sky.sun}" opacity="0.9"/>
    <g ${flip}>${draw(s)}</g>
  </svg>`;
}
function birds(s){return `<path d="M${30+(s%40)} ${30+(s%20)}q5-6 10 0q5-6 10 0" stroke="#ffffffaa" stroke-width="1.6" fill="none"/>`;}
function landScene(s){
  return `${birds(s)}
  <rect x="0" y="170" width="400" height="80" fill="#BFDFA0"/>
  <path d="M60 190h280l-14 40H74z" fill="none" stroke="#5C7A4A" stroke-width="2" stroke-dasharray="6 6"/>
  <path d="M120 190v-38" stroke="#8A6A3A" stroke-width="4"/>
  <path d="M120 152l26 8-26 8z" fill="#E1592F"/>
  ${[0,1,2,3,4].map(i=>`<path d="M${80+i*55} 200q4-8 8 0" stroke="#5C7A4A" stroke-width="2" fill="none"/>`).join('')}
  `;
}
function houseScene(s){
  return `${birds(s)}
  <rect x="0" y="185" width="400" height="65" fill="#CFE3B8"/>
  <rect x="140" y="120" width="130" height="80" fill="#F4E8CB"/>
  <path d="M130 120l75-45 75 45z" fill="#C2461F"/>
  <rect x="185" y="150" width="24" height="50" fill="#0B4750"/>
  <rect x="225" y="140" width="26" height="26" fill="#7FC3CE" stroke="#0B4750" stroke-width="2"/>
  <path d="M60 200c10-30 20-30 26-10" stroke="#5C7A4A" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M320 210c8-26 18-26 24-6" stroke="#5C7A4A" stroke-width="6" fill="none" stroke-linecap="round"/>`;
}
function flatScene(s){
  const h1=90+(s%30), h2=70+((s>>2)%30);
  return `${birds(s)}
  <rect x="0" y="200" width="400" height="50" fill="#D8E7D2"/>
  <rect x="110" y="${250-h1}" width="90" height="${h1}" fill="#F4E8CB"/>
  <rect x="215" y="${250-h2}" width="80" height="${h2}" fill="#EAD9AE"/>
  ${Array.from({length:6}).map((_,r)=>Array.from({length:3}).map((__,c)=>`<rect x="${122+c*24}" y="${250-h1+16+r*18}" width="14" height="12" fill="#0B4750" opacity="${r*0.5%1+0.35}"/>`).join('')).join('')}
  ${Array.from({length:5}).map((_,r)=>Array.from({length:2}).map((__,c)=>`<rect x="${228+c*28}" y="${250-h2+14+r*15}" width="14" height="10" fill="#0B4750" opacity="0.4"/>`).join('')).join('')}
  `;
}
function villaScene(s){
  return `${birds(s)}
  <rect x="0" y="205" width="400" height="45" fill="#CFE3B8"/>
  <rect x="120" y="150" width="180" height="55" fill="#FBF3E1"/>
  <path d="M120 150h180" stroke="#C89B3C" stroke-width="6"/>
  <path d="M180 150v55M240 150v55" stroke="#C89B3C" stroke-width="4"/>
  <path d="M60 210h280v14H60z" fill="#7FC3CE"/>
  <path d="M20 235c30-2 60 0 80-4" stroke="#5C7A4A" stroke-width="4" fill="none"/>
  <path d="M340 130c0-16-2-26-10-36 12 4 20 20 16 40z" fill="#3E7A3E"/>
  <path d="M340 96v40" stroke="#7A5A2E" stroke-width="4"/>`;
}
function shopScene(s){
  return `${birds(s)}
  <rect x="0" y="205" width="400" height="45" fill="#E6D9B8"/>
  <rect x="100" y="130" width="200" height="80" fill="#F4E8CB"/>
  ${Array.from({length:8}).map((_,i)=>`<path d="M${100+i*25} 130l12 22h-12z" fill="${i%2?'#E1592F':'#F7F2E4'}"/>`).join('')}
  <rect x="120" y="160" width="60" height="50" fill="#0B4750"/>
  <rect x="200" y="165" width="80" height="45" fill="#7FC3CE" stroke="#0B4750" stroke-width="2"/>
  <rect x="130" y="152" width="140" height="10" fill="#C2461F"/>`;
}
function commercialScene(s){
  const h1=140+(s%40), h2=100+((s>>2)%50), h3=170+((s>>4)%30);
  return `${birds(s)}
  <rect x="0" y="220" width="400" height="30" fill="#D8E4E6"/>
  <rect x="90" y="${250-h1}" width="60" height="${h1}" fill="#3C6E78"/>
  <rect x="165" y="${250-h3}" width="70" height="${h3}" fill="#0B4750"/>
  <rect x="250" y="${250-h2}" width="55" height="${h2}" fill="#4FA3A8"/>
  ${Array.from({length:10}).map((_,r)=>`<rect x="96" y="${250-h1+10+r*12}" width="48" height="6" fill="#BFE3EC" opacity="0.6"/>`).join('')}
  ${Array.from({length:12}).map((_,r)=>`<rect x="171" y="${250-h3+10+r*12}" width="58" height="6" fill="#7FC3CE" opacity="0.55"/>`).join('')}
  ${Array.from({length:8}).map((_,r)=>`<rect x="256" y="${250-h2+10+r*11}" width="42" height="5" fill="#E9F4F2" opacity="0.6"/>`).join('')}`;
}
function islandScene(s){
  return `
  <rect x="0" y="170" width="400" height="80" fill="#2E8FA0"/>
  <path d="M0 170q40-10 80 0t80 0 80 0 80 0 80 0v6H0z" fill="#59B4C2"/>
  <ellipse cx="200" cy="196" rx="120" ry="20" fill="#F3E3B5"/>
  <path d="M170 196V150" stroke="#7A5A2E" stroke-width="5"/>
  <path d="M170 150c-16-8-26-4-34 6 14 4 26 0 34-6z" fill="#3E7A3E"/>
  <path d="M170 150c16-8 26-4 34 6-14 4-26 0-34-6z" fill="#3E7A3E"/>
  <path d="M170 148c-4-14 2-22 12-30-2 12-6 22-12 30z" fill="#3E7A3E"/>
  <path d="M170 148c4-14-2-22-12-30 2 12 6 22 12 30z" fill="#3E7A3E"/>
  <path d="M225 196V158" stroke="#7A5A2E" stroke-width="4"/>
  <path d="M225 158c-13-6-21-3-27 5 11 3 21 0 27-5z" fill="#4E9250"/>
  <path d="M225 158c13-6 21-3 27 5-11 3-21 0-27-5z" fill="#4E9250"/>
  ${birds(s)}`;
}
function buildingScene(s){
  const hs=[120,170,140,190,110].map((h,i)=>h+((s>>i)%25));
  return `${birds(s)}
  <rect x="0" y="222" width="400" height="28" fill="#D8E4E6"/>
  ${hs.map((h,i)=>`<rect x="${40+i*70}" y="${250-h}" width="55" height="${h}" fill="${['#0B4750','#3C6E78','#4FA3A8','#0B4750','#3C6E78'][i]}"/>`).join('')}
  ${hs.map((h,i)=>Array.from({length:Math.floor(h/16)}).map((_,r)=>`<rect x="${48+i*70}" y="${250-h+8+r*15}" width="40" height="7" fill="#BFE3EC" opacity="0.5"/>`).join('')).join('')}`;
}

/* ============================= STATE ============================= */
let claudeDB=null, claudeUser=null, myId=null, dbReady=false;
let properties=[];
let myStatus={firstPostUsed:false, subscriptionActive:false, subscriptionExpiry:0, unlockedContacts:[], agent:null};
let currentView='home', currentParams={};
let localOnly=false;
let activeTab='overview';
let activeGalleryIdx=0;

/* ---------- local fallback ---------- */
function localSeed(){ try{ const raw=localStorage.getItem('pe_props'); if(raw) return JSON.parse(raw); }catch(e){} return null; }
function localSave(list){ try{ localStorage.setItem('pe_props', JSON.stringify(list)); }catch(e){} }
function localStatus(){ try{ const r=localStorage.getItem('pe_status'); if(r) return JSON.parse(r); }catch(e){} return {firstPostUsed:false, subscriptionActive:false, subscriptionExpiry:0, unlockedContacts:[], agent:null}; }
function localSaveStatus(s){ try{ localStorage.setItem('pe_status', JSON.stringify(s)); }catch(e){} }

/* ============================= SAMPLE DATA ============================= */
function sampleProps(){
  const base=[
    ['island','Palm Jumeirah Signature Villa','AED 18,500,000','Palm Jumeirah, Dubai','5 min from Atlantis The Palm','A 6-bedroom beachfront villa with private pool and direct sea access on the Palm frond. Floor-to-ceiling glazing, a private beach jetty and staff quarters included.',6,7,12500],
    ['flat','Marina View 2BR Apartment','AED 2,150,000','Dubai Marina','Opposite Marina Mall','High-floor apartment with full marina and skyline views, 2 parking bays included. Recently renovated kitchen and access to a rooftop infinity pool.',2,2,1180],
    ['land','Freehold Plot — Al Furjan','AED 4,200,000','Al Furjan, Dubai','10 min from Ibn Battuta Mall','G+4 residential plot, clear title, ready for construction permits. Corner plot with dual road access, all utilities connected to the boundary.',0,0,6000],
    ['villa','Emirates Hills Contemporary Villa','AED 32,000,000','Emirates Hills','Beside Montgomerie Golf Course','7-bed villa on a golf-facing plot with private cinema and staff quarters. Smart-home automation throughout and a temperature-controlled wine room.',7,9,15800],
    ['shop','Retail Unit — Al Barsha Mall Road','AED 1,650,000','Al Barsha, Dubai','Facing Mall of the Emirates','Ground floor retail shell, high footfall corner unit. Double-height frontage suitable for flagship signage.',0,1,900],
    ['commercial','Grade-A Office Floor, Business Bay','AED 6,800,000','Business Bay, Dubai','Canal-facing, near Bay Avenue','Full floor fitted office, canal views, 12 covered parking bays. LEED Gold certified building with 24/7 concierge.',0,4,7200],
    ['house','Townhouse — Arabian Ranches 3','AED 3,450,000','Arabian Ranches 3','Near Rangers Valley','4-bed corner townhouse with private garden and community pool access. Close to the community\'s own retail plaza and schools.',4,4,2600],
    ['building','Boutique Residential Building — JVC','AED 21,000,000','Jumeirah Village Circle','2 min from Circle Mall','G+8 fully leased residential building, strong rental yield. Fully managed with an on-site facilities team.',0,32,18000],
  ];
  const now=Date.now();
  return base.map((b,i)=>({
    id:'seed_'+i, category:b[0], title:b[1], price:b[2], location:b[3], landmark:b[4],
    description:b[5], beds:b[6], baths:b[6]?b[6]-1||1:0, sizeSqft:b[8],
    photos:[], // illustrated, generated at render time
    sellerName:['Rashid Al Maktoum Realty','Amara Homes','Zenith Estates','Coastline Properties','Falcon Realty','Meridian Group','Palmwood Estates','Skyline Developers'][i],
    sellerPhone:'+971 5'+(0+i)+' 000 '+(1000+i*7), createdAt: now-i*86400000, ownerId:'seed', verified:i%3!==2
  }));
}

/* ============================= CAPABILITY INIT ============================= */
async function initCapabilities(){
  try{ claudeDB = await claude.use('db'); }catch(e){ claudeDB=null; }
  try{ claudeUser = await claude.use('user'); }catch(e){ claudeUser=null; }

  if(!claudeDB){
    localOnly=true;
    properties = localSeed();
    if(!properties || !properties.length){ properties = sampleProps(); localSave(properties); }
    myStatus = localStatus();
    dbReady=true;
    render();
    return;
  }

  try{ myId = await claudeUser?.id?.() ?? null; }catch(e){ myId=null; }

  try{
    claudeDB.collection('properties').onSnapshot(async (snap)=>{
      let docs = (snap && snap.docs) ? snap.docs.map(d=>({id:d.id, ...d.data})) : [];
      if(!docs.length){
        const seeds = sampleProps();
        for(const s of seeds){ try{ await claudeDB.doc('properties/'+s.id).set(s); }catch(e){} }
        docs = seeds;
      }
      properties = docs.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
      dbReady=true;
      render();
    });
  }catch(e){ properties = sampleProps(); dbReady=true; }

  if(myId){
    try{ const doc = await claudeDB.doc('data/users/'+myId+'/status').get(); if(doc && doc.data) myStatus = Object.assign(myStatus, doc.data); }
    catch(e){}
  }
  render();
}
async function saveStatus(){
  if(localOnly){ localSaveStatus(myStatus); return; }
  if(!claudeDB || !myId) return;
  try{ await claudeDB.doc('data/users/'+myId+'/status').set(myStatus); }
  catch(e){ toast("Couldn't save — you may need edit access to this artifact."); }
}
async function saveProperty(prop){
  if(localOnly){ properties.unshift(prop); localSave(properties); render(); return true; }
  if(!claudeDB){ toast('Marketplace storage is unavailable right now.'); return false; }
  try{ await claudeDB.doc('properties/'+prop.id).set(prop); return true; }
  catch(e){ toast("Couldn't publish — you may need edit access to this artifact."); return false; }
}

/* ============================= UI HELPERS ============================= */
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._tm); t._tm=setTimeout(()=>t.classList.remove('show'),2600);
}
function navigate(view, params={}){ currentView=view; currentParams=params; activeTab='overview'; activeGalleryIdx=0; window.scrollTo(0,0); render(); }
function catLabel(id){ return (CATS.find(c=>c.id===id)||{}).label || id; }

function openSheet(html){ document.getElementById('sheet').innerHTML = html; document.getElementById('sheet').classList.add('show'); document.getElementById('sheet-overlay').classList.add('show'); }
function closeSheet(){ document.getElementById('sheet').classList.remove('show'); document.getElementById('sheet-overlay').classList.remove('show'); }
document.getElementById('sheet-overlay').addEventListener('click', closeSheet);

function openModal(html){
  const root=document.getElementById('modal-root');
  root.innerHTML = `<div class="modal-wrap" id="modal-wrap">${html}</div>`;
  root.querySelector('#modal-wrap').addEventListener('click', (e)=>{ if(e.target.id==='modal-wrap') closeModal(); });
}
function closeModal(){ document.getElementById('modal-root').innerHTML=''; }

function payMock({amount,label,onSuccess}){
  openModal(`
    <div class="modal">
      <div class="pay-label">${label}</div>
      <div class="pay-amt">₹${amount}</div>
      <div id="pay-body">
        <button class="btn btn-primary" id="pay-now-btn">Pay ₹${amount} & continue</button>
        <div style="margin-top:10px;"><button class="btn btn-outline" onclick="closeModal()">Cancel</button></div>
      </div>
      <div class="demo-tag">Demo payment simulation — no real money is charged. A live version would connect to a licensed payment gateway.</div>
    </div>
  `);
  document.getElementById('pay-now-btn').addEventListener('click', ()=>{
    document.getElementById('pay-body').innerHTML = `<div class="spinner"></div><div style="font-size:12.5px;color:rgba(19,42,40,0.55);">Processing payment…</div>`;
    setTimeout(()=>{
      document.getElementById('pay-body').innerHTML = `<div style="color:var(--sea-deep);font-weight:800;font-size:14px;">✓ Payment successful</div>`;
      setTimeout(()=>{ closeModal(); onSuccess(); }, 500);
    }, 1100);
  });
}

/* ============================= NAV / MENU ============================= */
function buildNavDropdown(){
  document.getElementById('nav-cats').innerHTML = CATS.map(c=>`
    <a href="javascript:void(0)" onclick="navigate('category',{cat:'${c.id}'})">${icon(c.id)} ${c.label}</a>`).join('');
}
function openMainMenu(){
  openSheet(`
    <div class="handle"></div>
    <div class="item" onclick="closeSheet();navigate('agent')">
      <div class="ic">${icon('agent')}</div>
      <div><strong>Enrol as an agent / seller</strong><span>Register to list properties on Palm Estates</span></div>
    </div>
    <div class="item" onclick="closeSheet();navigate('post')">
      <div class="ic">${icon('sell')}</div>
      <div><strong>Post a property</strong><span>First listing ₹${FIRST_POST_FEE} · then ₹${SUB_FEE}/3 months</span></div>
    </div>
    <div class="item" onclick="closeSheet();navigate('mylistings')">
      <div class="ic">${icon('list')}</div>
      <div><strong>My listings & plan</strong><span>Manage what you've posted</span></div>
    </div>
    <div class="item" onclick="closeSheet();navigate('search')">
      <div class="ic">${icon('search')}</div>
      <div><strong>Explore all listings</strong><span>Browse every property on the marketplace</span></div>
    </div>
  `);
}

/* ============================= RENDER ============================= */
function render(){
  buildNavDropdown();
  const root=document.getElementById('view-root');
  if(currentView==='home') root.innerHTML=viewHome();
  else if(currentView==='category') root.innerHTML=viewCategory(currentParams.cat);
  else if(currentView==='search') root.innerHTML=viewSearch();
  else if(currentView==='detail') root.innerHTML=viewDetail(currentParams.id);
  else if(currentView==='post') root.innerHTML=viewPost();
  else if(currentView==='agent') root.innerHTML=viewAgent();
  else if(currentView==='mylistings') root.innerHTML=viewMyListings();
  else if(currentView==='subscribe') root.innerHTML=viewSubscribe();
  renderFooter();
}

function renderFooter(){
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-grid">
      <div>
        <h4 style="font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px;">${icon('home2')} Palm Estates</h4>
        <p>Dubai's marketplace for land, homes, shops and islands — verified sellers, direct buyer contact, no middlemen fees baked into the price.</p>
      </div>
      <div><h4>Browse</h4><ul>${CATS.slice(0,4).map(c=>`<li><a href="javascript:void(0)" onclick="navigate('category',{cat:'${c.id}'})">${c.label}</a></li>`).join('')}</ul></div>
      <div><h4>Sell</h4><ul>
        <li><a href="javascript:void(0)" onclick="navigate('agent')">Become an agent</a></li>
        <li><a href="javascript:void(0)" onclick="navigate('post')">Post a property</a></li>
        <li><a href="javascript:void(0)" onclick="navigate('subscribe')">Seller plans</a></li>
      </ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="javascript:void(0)" onclick="navigate('mylistings')">My listings</a></li>
        <li><a href="javascript:void(0)" onclick="navigate('search')">Explore all</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Palm Estates — demo marketplace concept.</span>
      <span>Payments shown are simulated for this prototype.</span>
    </div>
  `;
}

function viewHome(){
  const featured=properties.slice(0,6);
  return `
    <section class="hero">
      <div class="hero-scene">${scene('island','hero-bg',1)}</div>
      <div class="hero-fade"></div>
      <div class="hero-inner">
        <h1>Every Dubai address, in one marketplace.</h1>
        <p>Land, homes, shops, offices and private islands — browse verified listings and connect straight with the seller.</p>
        <div class="search-card">
          <select id="hero-cat">
            <option value="">All types</option>
            ${CATS.map(c=>`<option value="${c.id}">${c.label}</option>`).join('')}
          </select>
          <input id="hero-q" placeholder="Search location, project or landmark">
          <button class="btn btn-primary" onclick="heroSearch()">${icon('search')} Search</button>
        </div>
        <div class="chip-row">
          <div class="chip">${icon('badge')} Verified sellers</div>
          <div class="chip">${icon('lock')} ₹${CONTACT_FEE} contact unlock</div>
          <div class="chip">${icon('tag')} ₹${FIRST_POST_FEE} first listing</div>
        </div>
      </div>
    </section>

    <div class="stats-bar"><div class="stats-grid">
      <div class="stat"><div class="ic">${icon('home2')}</div><div><strong>${properties.length}+</strong><span>Live listings</span></div></div>
      <div class="stat"><div class="ic">${icon('users')}</div><div><strong>${new Set(properties.map(p=>p.sellerName)).size}+</strong><span>Verified sellers</span></div></div>
      <div class="stat"><div class="ic">${icon('list')}</div><div><strong>8</strong><span>Property types</span></div></div>
      <div class="stat"><div class="ic">${icon('lock')}</div><div><strong>₹${CONTACT_FEE}</strong><span>To unlock a contact</span></div></div>
    </div></div>

    <section class="block">
      <div class="block-head"><h2>Browse by type</h2></div>
      <div class="cats-grid">
        ${CATS.map(c=>{
          const count=properties.filter(p=>p.category===c.id).length;
          return `<div class="cat-card" onclick="navigate('category',{cat:'${c.id}'})">
            <div class="scene">${scene(c.id,'cat-'+c.id,0)}<div class="cat-icon-badge">${icon(c.id)}</div></div>
            <div class="cat-body"><strong>${c.label}</strong><span>${count} listing${count===1?'':'s'}</span></div>
          </div>`;
        }).join('')}
      </div>
    </section>

    <section class="block">
      <div class="block-head"><h2>Featured listings</h2><span class="see-all" onclick="navigate('search')">See all →</span></div>
      <div class="listing-grid">
        ${featured.map(p=>propCard(p)).join('') || emptyState('No listings yet','Be the first to post a property.')}
      </div>
    </section>
  `;
}
function heroSearch(){
  const cat=document.getElementById('hero-cat').value;
  const q=document.getElementById('hero-q').value;
  if(cat){ navigate('category',{cat}); } else { navigate('search',{q}); }
}

function photoOrScene(p, idx=0){
  if(p.photos && p.photos[idx]) return `<img src="${p.photos[idx]}">`;
  return scene(p.category, p.id, idx);
}
function propCard(p){
  return `
    <div class="pcard" onclick="navigate('detail',{id:'${p.id}'})">
      <div class="thumb">
        ${photoOrScene(p,0)}
        <div class="badge">${catLabel(p.category)}</div>
        ${p.verified!==false?`<div class="badge verified">${icon('check')} Verified</div>`:''}
      </div>
      <div class="body">
        <div class="price">${p.price}</div>
        <div class="title">${p.title}</div>
        <div class="loc">${icon('pin')} ${p.location}</div>
        <div class="agent-row">
          <div class="avatar-sm">${(p.sellerName||'S')[0]}</div>
          <span>${p.sellerName||'Private seller'}</span>
        </div>
      </div>
    </div>`;
}
function emptyState(title,sub){
  return `<div class="empty">${icon('search')}<strong>${title}</strong><div>${sub}</div></div>`;
}

function viewCategory(cat){
  const list=properties.filter(p=>p.category===cat);
  return `
    <section class="block" style="padding-top:34px;">
      <div class="block-head"><h2>${catLabel(cat)} in Dubai</h2><span class="see-all" onclick="navigate('post')">List one →</span></div>
      <div class="listing-grid">${list.map(p=>propCard(p)).join('') || emptyState('No '+catLabel(cat).toLowerCase()+' listed yet','Check back soon or post one yourself.')}</div>
    </section>
  `;
}

function viewSearch(){
  return `
    <section class="block" style="padding-top:34px;">
      <div class="block-head"><h2>Explore all listings</h2></div>
      <div style="margin-bottom:20px;max-width:420px;">
        <input id="search-input" placeholder="Search title or location…" oninput="filterSearch(this.value)"
          style="width:100%;padding:13px 15px;border-radius:12px;border:1.5px solid var(--line);font-size:14px;font-family:inherit;">
      </div>
      <div id="search-results" class="listing-grid">${properties.map(p=>propCard(p)).join('') || emptyState('No listings yet','Post the first property.')}</div>
    </section>
  `;
}
function filterSearch(q){
  q=q.trim().toLowerCase();
  const filtered=properties.filter(p=>!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
  document.getElementById('search-results').innerHTML = filtered.map(p=>propCard(p)).join('') || emptyState('No matches','Try a different location or keyword.');
}

function viewDetail(id){
  const p=properties.find(x=>x.id===id);
  if(!p) return `<div class="detail-wrap">${emptyState('Listing not found','It may have been removed.')}</div>`;
  const unlocked = (myStatus.unlockedContacts||[]).includes(p.id);
  const thumbCount = (p.photos && p.photos.length) || 3;
  return `
    <div class="detail-wrap">
      <div class="back-row"><button class="back-btn" onclick="navigate('home')">${icon('arrowleft')}</button></div>
      <div>
        <div class="gallery-main" id="gallery-main">${photoOrScene(p, activeGalleryIdx)}</div>
        <div class="gallery-thumbs">
          ${Array.from({length:thumbCount}).map((_,i)=>`<div class="th ${i===activeGalleryIdx?'active':''}" onclick="setGallery(${i})">${photoOrScene(p,i)}</div>`).join('')}
        </div>

        <div class="tabs">
          <button class="tab ${activeTab==='overview'?'active':''}" onclick="setTab('overview')">Overview</button>
          <button class="tab ${activeTab==='description'?'active':''}" onclick="setTab('description')">Description</button>
          <button class="tab ${activeTab==='location'?'active':''}" onclick="setTab('location')">Location</button>
        </div>
        <div class="tab-panel" id="tab-panel">${detailTabContent(p)}</div>
      </div>

      <div class="side-card">
        <div class="cat-pill">${catLabel(p.category)}</div>
        <div class="price">${p.price}</div>
        <h2>${p.title}</h2>
        <div class="loc">${icon('pin')} ${p.location}</div>
        ${unlocked ? `
          <div class="contact-revealed">
            <div class="avatar-lg">${(p.sellerName||'S')[0]}</div>
            <div><strong style="display:block;font-size:14.5px;">${p.sellerName||'Seller'}</strong><span style="font-size:12.5px;color:rgba(19,42,40,0.6);">${p.sellerPhone||'—'}</span></div>
          </div>
        ` : `
          <div class="contact-box">
            ${icon('lock','locked-icon')}
            <div style="font-size:13.5px;font-weight:700;">Dealer contact is locked</div>
            <div style="font-size:12px;color:rgba(19,42,40,0.55);margin:2px 0 14px;">Pay ₹${CONTACT_FEE} to unlock this seller's phone number</div>
            <button class="btn btn-primary" onclick="unlockContact('${p.id}')">Unlock contact — ₹${CONTACT_FEE}</button>
          </div>
        `}
      </div>
    </div>
  `;
}
function setGallery(i){ activeGalleryIdx=i; render(); }
function setTab(t){ activeTab=t; document.getElementById('tab-panel').innerHTML=detailTabContent(properties.find(x=>x.id===currentParams.id)); document.querySelectorAll('.tab').forEach(el=>el.classList.remove('active')); event.target.classList.add('active'); }
function detailTabContent(p){
  if(activeTab==='description') return `<h3>About this property</h3><p>${p.description||'No description provided.'}</p>`;
  if(activeTab==='location') return `<h3>Where it is</h3><div class="landmark-strip">${icon('pin')}<div><strong>Nearby landmark</strong><br>${p.landmark||'—'}</div></div><p style="margin-top:14px;">${p.location} — exact address is shared by the seller after you unlock their contact.</p>`;
  return `<h3>Property facts</h3>
    <div class="fact-grid">
      <div class="fact"><span>Bedrooms</span><strong>${p.beds ?? '—'}</strong></div>
      <div class="fact"><span>Bathrooms</span><strong>${p.baths ?? '—'}</strong></div>
      <div class="fact"><span>Size</span><strong>${p.sizeSqft?p.sizeSqft+' sqft':'—'}</strong></div>
      <div class="fact"><span>Type</span><strong>${catLabel(p.category)}</strong></div>
    </div>
    <div class="landmark-strip">${icon('pin')}<div><strong>Nearby landmark</strong><br>${p.landmark||'—'}</div></div>`;
}
function unlockContact(id){
  payMock({amount:CONTACT_FEE, label:'Unlock dealer contact', onSuccess: async ()=>{
    myStatus.unlockedContacts = myStatus.unlockedContacts||[];
    if(!myStatus.unlockedContacts.includes(id)) myStatus.unlockedContacts.push(id);
    await saveStatus(); toast('Contact unlocked'); render();
  }});
}

/* ---- Agent enrol ---- */
function viewAgent(){
  const a=myStatus.agent;
  const inner = a ? `
      <div class="landmark-strip">${icon('check')}<div><strong>You're enrolled as a seller</strong><br>${a.name} · ${a.phone}</div></div>
      <p style="font-size:13.5px;line-height:1.7;color:rgba(19,42,40,0.7);margin-top:14px;">You can now post properties. Your first listing costs ₹${FIRST_POST_FEE}; after that a ₹${SUB_FEE} / 3-month plan keeps your listings live.</p>
      <div class="btn-block-wrap"><button class="btn btn-primary" onclick="navigate('post')">${icon('sell')} Post a property</button></div>
  ` : `
      <p style="font-size:13.5px;line-height:1.7;color:rgba(19,42,40,0.7);margin-bottom:18px;">Register once as an agent or independent seller. It's free to enrol — you only pay when you publish a listing.</p>
      <div class="field"><label>Full name</label><input id="ag-name" placeholder="e.g. Rashid Khan"></div>
      <div class="field"><label>Phone number</label><input id="ag-phone" placeholder="+971 5X XXX XXXX"></div>
      <div class="field"><label>Agency name (optional)</label><input id="ag-agency" placeholder="e.g. Skyline Realty"></div>
      <div class="btn-block-wrap"><button class="btn btn-primary" onclick="submitAgent()">Enrol as seller</button></div>
  `;
  return `<div class="form-shell"><div class="form-card"><h3>Seller enrolment</h3>${inner}</div></div>`;
}
async function submitAgent(){
  const name=document.getElementById('ag-name').value.trim();
  const phone=document.getElementById('ag-phone').value.trim();
  const agency=document.getElementById('ag-agency').value.trim();
  if(!name||!phone){ toast('Please add your name and phone number'); return; }
  myStatus.agent={name,phone,agency,registeredAt:Date.now()};
  await saveStatus(); toast('Enrolled — you can now post properties'); navigate('post');
}

/* ---- Post property ---- */
let postPhotos=[];
function viewPost(){
  postPhotos=[];
  const needsFirstFee = !myStatus.firstPostUsed;
  const subActive = myStatus.subscriptionActive && myStatus.subscriptionExpiry > Date.now();
  let feeNote;
  if(needsFirstFee) feeNote = `Your first listing costs <strong>₹${FIRST_POST_FEE}</strong>.`;
  else if(subActive) feeNote = `Your seller plan is active until ${new Date(myStatus.subscriptionExpiry).toLocaleDateString()}. Posting is included.`;
  else feeNote = `Your free first post is used. A <strong>₹${SUB_FEE} / 3-month</strong> seller plan is needed to publish more listings.`;

  return `
    <div class="form-shell">
      <div class="fee-note">${icon('tag')}<div>${feeNote}</div></div>

      <div class="form-card">
        <h3>Basic details</h3>
        <div class="field"><label>Property type</label><select id="p-cat">${CATS.map(c=>`<option value="${c.id}">${c.label}</option>`).join('')}</select></div>
        <div class="field"><label>Listing title</label><input id="p-title" placeholder="e.g. Sea-view villa on Palm Jumeirah"></div>
        <div class="field-row">
          <div class="field"><label>Price</label><input id="p-price" placeholder="e.g. AED 5,200,000"></div>
          <div class="field"><label>Size (sqft)</label><input id="p-size" type="number" placeholder="e.g. 3200"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Bedrooms</label><input id="p-beds" type="number" placeholder="e.g. 4"></div>
          <div class="field"><label>Bathrooms</label><input id="p-baths" type="number" placeholder="e.g. 3"></div>
        </div>
      </div>

      <div class="form-card">
        <h3>Location</h3>
        <div class="field"><label>Location / area</label><input id="p-location" placeholder="e.g. Dubai Marina"></div>
        <div class="field"><label>Nearby landmark</label><input id="p-landmark" placeholder="e.g. 5 min from Marina Mall"></div>
        <div class="field"><label>Description</label><textarea id="p-desc" placeholder="Describe the property, condition, amenities…"></textarea></div>
      </div>

      <div class="form-card">
        <h3>Photos</h3>
        <div class="upload-row" id="upload-row">
          <label class="upload-slot"><input type="file" accept="image/*" style="display:none" onchange="addPhoto(this)">${icon('upload')}</label>
        </div>
      </div>

      <div class="form-card">
        <h3>Your contact</h3>
        <div class="field"><label>Phone (shown to buyers after they pay ₹${CONTACT_FEE})</label><input id="p-phone" placeholder="+971 5X XXX XXXX"></div>
        <div class="field"><label>Your name / agency</label><input id="p-seller" placeholder="e.g. Skyline Realty"></div>
      </div>

      <div class="btn-block-wrap">
        <button class="btn btn-primary" onclick="submitProperty()">
          ${needsFirstFee?`Publish & pay ₹${FIRST_POST_FEE}`:subActive?'Publish listing':`Subscribe ₹${SUB_FEE} & publish`}
        </button>
      </div>
    </div>
  `;
}
function addPhoto(input){
  const file=input.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=(e)=>{
    const img=new Image();
    img.onload=()=>{
      const canvas=document.createElement('canvas');
      const scale=Math.min(1, 640/img.width);
      canvas.width=img.width*scale; canvas.height=img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      const dataUrl=canvas.toDataURL('image/jpeg',0.6);
      postPhotos.push(dataUrl);
      const row=document.getElementById('upload-row');
      const slot=document.createElement('div');
      slot.className='upload-slot'; slot.innerHTML=`<img src="${dataUrl}">`;
      row.insertBefore(slot, row.lastElementChild);
      if(postPhotos.length>=4) row.lastElementChild.remove();
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}
function submitProperty(){
  const title=document.getElementById('p-title').value.trim();
  const price=document.getElementById('p-price').value.trim();
  const location=document.getElementById('p-location').value.trim();
  const phone=document.getElementById('p-phone').value.trim();
  if(!title||!price||!location||!phone){ toast('Please fill in title, price, location and phone'); return; }
  const draft={
    id:'prop_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),
    category:document.getElementById('p-cat').value,
    title, price, location,
    landmark:document.getElementById('p-landmark').value.trim(),
    description:document.getElementById('p-desc').value.trim(),
    beds:Number(document.getElementById('p-beds').value)||0,
    baths:Number(document.getElementById('p-baths').value)||0,
    sizeSqft:Number(document.getElementById('p-size').value)||0,
    photos:postPhotos.slice(),
    sellerName:document.getElementById('p-seller').value.trim()||'Private seller',
    sellerPhone:phone, verified:false,
    createdAt:Date.now(), ownerId:myId||'local'
  };
  const needsFirstFee = !myStatus.firstPostUsed;
  const subActive = myStatus.subscriptionActive && myStatus.subscriptionExpiry > Date.now();
  const publish=async ()=>{ const ok=await saveProperty(draft); if(ok){ toast('Listing published'); navigate('detail',{id:draft.id}); } };

  if(needsFirstFee){
    payMock({amount:FIRST_POST_FEE, label:'First listing fee', onSuccess: async ()=>{ myStatus.firstPostUsed=true; await saveStatus(); await publish(); }});
  } else if(subActive){
    publish();
  } else {
    payMock({amount:SUB_FEE, label:'Seller plan — 3 months', onSuccess: async ()=>{ myStatus.subscriptionActive=true; myStatus.subscriptionExpiry=Date.now()+SUB_DAYS*86400000; await saveStatus(); await publish(); }});
  }
}

/* ---- My listings ---- */
function viewMyListings(){
  const mine = properties.filter(p=>p.ownerId===(myId||'local'));
  const subActive = myStatus.subscriptionActive && myStatus.subscriptionExpiry > Date.now();
  return `
    <div class="form-shell">
      <div class="plan-card ${subActive?'active':''}">
        <div class="top"><strong>Seller plan</strong><span class="amt">${subActive?('Active · until '+new Date(myStatus.subscriptionExpiry).toLocaleDateString()):'Not active'}</span></div>
        <p>${myStatus.firstPostUsed? (subActive? 'You can publish unlimited listings while your plan is active.' : `Renew for ₹${SUB_FEE} to publish more listings.`) : `Your first listing is ₹${FIRST_POST_FEE}. No plan needed yet.`}</p>
        ${(!subActive)?`<div style="margin-top:10px;"><button class="btn btn-outline btn-sm" onclick="navigate('subscribe')">${myStatus.firstPostUsed?'Renew plan':'View plan'}</button></div>`:''}
      </div>
    </div>
    <section class="block" style="padding-top:6px;">
      <div class="block-head"><h2>Your listings</h2></div>
      <div class="listing-grid">${mine.map(p=>propCard(p)).join('') || emptyState('Nothing posted yet','Your published properties will appear here.')}</div>
    </section>
    <div class="form-shell" style="padding-top:0;"><div class="btn-block-wrap"><button class="btn btn-primary" onclick="navigate('post')">${icon('sell')} Post another property</button></div></div>
  `;
}

function viewSubscribe(){
  return `
    <div class="form-shell">
      <div class="form-card">
        <h3>Seller plan</h3>
        <div class="plan-card active">
          <div class="top"><strong>3-month seller plan</strong><span class="amt">₹${SUB_FEE}</span></div>
          <p>Unlimited property posts for 90 days, priority placement in category pages, and buyer-contact unlocks stay tracked to your account.</p>
        </div>
      </div>
      <div class="btn-block-wrap">
        <button class="btn btn-primary" onclick="startSubscribe()">Subscribe — ₹${SUB_FEE}</button>
      </div>
    </div>
  `;
}
function startSubscribe(){
  payMock({amount:SUB_FEE, label:'Seller plan — 3 months', onSuccess: async ()=>{
    myStatus.subscriptionActive=true; myStatus.subscriptionExpiry=Date.now()+SUB_DAYS*86400000;
    await saveStatus(); toast('Plan activated'); navigate('mylistings');
  }});
}

/* ============================= BOOT ============================= */
initCapabilities();
