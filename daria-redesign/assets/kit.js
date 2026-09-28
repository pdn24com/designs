/* Daria redesign kit: shared content, helpers and components for mockups and the prototype.
   Content provenance: titles, artists, durations, folder names and counts are copied from
   current-app captures 01, 06, 11-16, 29-30, 34, 36 (Hormoz, 28 Sep 2026). Persian-script
   tracks, "Night Letters", "Blue Hour", short clips and all lyrics are illustrative inventions.
   Cover images are generated placeholders, not the real artwork. */
(function(){
const K = window.DK = {};
const ICONS = window.DARIA_ICONS || {};

K.ic = (n, cls='') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||''}</svg>`;
K.esc = s => String(s==null?'':s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FA_D = '۰۱۲۳۴۵۶۷۸۹';
K.dg = (s, lang) => lang==='fa' ? String(s).replace(/[0-9]/g, d=>FA_D[d]) : String(s);
K.time = (sec, lang) => {
  if (sec==null) return lang==='fa' ? 'نامشخص' : '--:--';
  sec = Math.max(0, Math.round(sec));
  const h=Math.floor(sec/3600), m=Math.floor(sec%3600/60), s=sec%60;
  const out = h ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
  return K.dg(out, lang);
};
K.num = (n, lang) => K.dg(n.toLocaleString('en-US'), lang).replace(/,/g, lang==='fa'?'٬':',');

/* ---------- representative content ---------- */
const S = (id,t,a,al,d,f,art,extra={}) => Object.assign({id,t,a,al,d,f,art,fmt:'MP3',kb:Math.round((d||200)*24)},extra);
K.songs = [
  S('ghoroub','01_Ghoroub','Siavash Ghomayshi GahMusic.com','GahMusic.com',260,'audios',11,{fileTitle:true}),
  S('cheghadr','Cheghadr Mahi ~ UpMusic','Hamed Hirman ~ UpMusic','UpMusic',191,'audios',23),
  S('forever','Forever Young','Audra Mae & The Forest Rangers','Sons of Anarchy',193,'audios',null,{fmt:'FLAC'}),
  S('fortunate','Fortunate Son','Lyle Workman & Bob Thiele, Jr.','Sons of Anarchy',209,'audios',null),
  S('gimme','Gimme Shelter','Paul Brady & The Forest Rangers','Sons of Anarchy',292,'audios',null),
  S('gisooye','Gisooye Baran~ UpMusic','Alireza Ghorbani ~ UpMusic','UpMusic',213,'audios',37),
  S('heyhey','Hey Hey, My My','Battleme','Songs of Anarchy',169,'Download',null,{fmt:'M4A'}),
  S('benevis','Benevis','Mahasti - GahMusic.com','GahMusic.com',238,'QuickShare',5,{year:2022,kb:5950,file:'Mahasti - Benevis.mp3',tagv:'ID3v2.3',bitrate:'192 kbps',rate:'44.1 kHz',ch:'Stereo',mod:'Mar 15, 2026 3:57 PM',added:'Sep 11, 2026 9:57 PM',shareId:'1480'}),
  S('geryeh','01 - Geryeh Nakon','Ebi GahMusic.com','GahMusic.com',284,'QuickShare',41),
  S('pizza','01 Pizza',null,'Quick Share',237,'QuickShare',null,{fileTitle:true}),
  S('pizza1','01 Pizza (1)',null,'Quick Share',237,'QuickShare',null,{fileTitle:true,dup:true}),
  S('romania','02 Romania',null,'Quick Share',257,'QuickShare',null,{fileTitle:true}),
  S('medad','03 - Medad Rangy','Ebi GahMusic.com','GahMusic.com',308,'QuickShare',53),
  S('pichak','03 - Pichak','Ebi GahMusic.com','GahMusic.com',238,'QuickShare',61),
  S('selfcontrol','Self Control (ahaang.com)','Laura Branigan','( ahaang.com )',247,'Download',73),
  S('alizo','Radio Alizo 13','(Hayedeh)','(@DJ_ALizo)',2909,'QuickShare',83),
  S('kaftare','Kaftare Kacol Besar','moein','Goodmusics.ir',233,'QuickShare',97),
  S('zendegi','Zendegi Ba Tou','Moein','Goodmusics.ir',251,'QuickShare',97),
  S('diana','Diana-Hadad_01.Amaneh','Diana Hadad - نیک موزیک',null,262,'QuickShare',null,{fileTitle:true}),
  S('delsa','Delsa Music','remix shakila',null,198,'QuickShare',109),
  S('bakhtiari','[Bakhtiari Orkesti] ~[SevilMusic]','[Unknown Artist]',null,221,'QuickShare',131),
  /* illustrative additions (not in captures) */
  S('nightletters','Night Letters','Daria Sessions','Blue Hour',214,'DariaValidation',151,{lyr:'synced',fmt:'MP3',illus:true}),
  S('bluehour','Blue Hour','Daria Sessions','Blue Hour',203,'DariaValidation',163,{lyr:'plain',illus:true}),
  S('baran','باران آبی','گروه نیلوفر','شب‌های روشن',236,'DariaValidation',173,{fa:true,illus:true}),
  S('saat','ساعت طلایی','آریا','شب‌های روشن',187,'DariaValidation',181,{fa:true,illus:true}),
  S('ranandegi','رانندگی نیمه‌شب','ساحل نئون',null,224,'DariaValidation',null,{fa:true,illus:true}),
  S('tone','Validation tone 10s',null,null,10,'DariaValidation',null,{short:true,illus:true,fileTitle:true}),
  S('rec014','Recording 014',null,null,null,'DariaValidation',null,{fmt:'M4A',unknownDur:true,illus:true,fileTitle:true}),
];
K.byId = Object.fromEntries(K.songs.map(s=>[s.id,s]));
K.folders = [
  {key:'audios', name:'audios', path:'Internal storage · audios', n:12, dur:3002, albums:9, artists:11},
  {key:'DariaValidation', name:'DariaValidation', path:'Internal storage · DariaValidation', n:44, dur:11491, albums:14, artists:12, short:{0:0,15:3,30:9,60:21,120:40}, unknown:4},
  {key:'Download', name:'Download', path:'Internal storage · Download', n:51, dur:13903, albums:22, artists:31},
  {key:'QuickShare', name:'Quick Share', path:'Internal storage · Download/Quick Share', n:718, dur:228269, albums:233, artists:229},
];
K.fById = Object.fromEntries(K.folders.map(f=>[f.key,f]));
K.totals = {songs:825, albums:274, artists:279};
K.playlists0 = [
  {id:'custom', name:'Custom', n:35, items:['benevis','geryeh','medad','gisooye','cheghadr']},
  {id:'test5', name:'test5', n:5, items:['pizza','romania','forever','fortunate','gimme']},
];
K.smart = [
  {id:'fav', name:'Favourites', fa:'علاقه‌مندی‌ها', icon:'heart'},
  {id:'recentp', name:'Recently played', fa:'اخیراً پخش‌شده', icon:'history', n:90},
  {id:'most', name:'Most played', fa:'پرپخش‌ترین‌ها', icon:'trending-up', n:94},
  {id:'recenta', name:'Recently added', fa:'تازه‌ها', icon:'plus', n:100},
];
K.albums = [
  {id:'gah', t:'GahMusic.com', a:'Various (from tags)', n:61, art:5},
  {id:'ahaang', t:'( ahaang.com )', a:'Laura Branigan', n:1, art:73},
  {id:'alizo', t:'(@DJ_ALizo)', a:'(Hayedeh)', n:2, art:83},
  {id:'up', t:'UpMusic', a:'Hamed Hirman ~ UpMusic', n:4, art:23},
  {id:'soa', t:'Sons of Anarchy', a:'Various', n:3, art:null},
  {id:'blue', t:'Blue Hour', a:'Daria Sessions', n:2, art:151},
];
K.artists = [
  {id:'hayedeh', t:'(Hayedeh)', n:2},{id:'021g', t:'021G & Canis', n:2},{id:'021gs', t:'021G & Shayan Eshraghi', n:2},
  {id:'abbas', t:'[Abbas Ghaderi]', n:1},{id:'ahmad', t:'[Ahmad Azad]', n:1},{id:'amanollah', t:'[Amanollah Tajik]', n:1},
  {id:'ebi', t:'Ebi GahMusic.com', n:14},{id:'mahasti', t:'Mahasti - GahMusic.com', n:6},
];
/* illustrative lyrics written for this prototype */
K.lyrics = {
  nightletters:{kind:'synced', src:'Embedded synced lyrics (ID3 SYLT) · illustrative', lines:[
    [0,'♪'],[8,'Paper boats on a winter river'],[15,'نامه‌ای نوشتم برای شب'],[22,'Every street lamp keeps a secret'],
    [30,'و ماه، جواب نداد'],[38,'I folded the city in my pocket'],[46,'Carried it home through the rain'],
    [54,'نامه‌های شب، بی‌نشانی'],[62,'Written in light, read in the dark'],[70,'♪'],[86,'Paper boats on a winter river'],
    [94,'هنوز منتظرم'],[102,'Every street lamp keeps a secret'],[110,'Until the morning comes']]},
  bluehour:{kind:'plain', src:'Embedded lyrics text (ID3 USLT) · illustrative', lines:[
    'Blue hour on the balcony,','the kettle and the radio,','somebody else’s song again.','','ساعت آبی،','چای و رادیو،','باز آهنگ کسی دیگر.']},
};

/* ---------- generated covers ---------- */
const PAL = [['#2E4E9E','#F2B880'],['#8C3B2E','#F4D6A0'],['#1F5E57','#E9C46A'],['#4A2C6D','#E07A5F'],['#23395B','#8FC0A9'],['#6B4A2F','#E7C3A4'],['#394867','#F1DEC9'],['#0F4C5C','#E36414'],['#5B3758','#F9C6C9'],['#2F3E46','#CAD2C5']];
const cache = {};
K.artURI = seed => {
  if (cache[seed]) return cache[seed];
  const [a,b] = PAL[seed % PAL.length], st = Math.floor(seed/PAL.length) % 5;
  let g = `<rect width="100" height="100" fill="${a}"/>`;
  if (st===0) g += `<circle cx="64" cy="38" r="18" fill="${b}"/><path d="M0 70 L40 48 L100 78 V100 H0Z" fill="#000" opacity=".28"/><path d="M0 82 L60 60 L100 70 V100 H0Z" fill="#000" opacity=".3"/>`;
  if (st===1) g += `<g opacity=".85">${[0,1,2,3,4].map(i=>`<rect x="${-20+i*28}" y="-20" width="9" height="160" fill="${b}" transform="rotate(28 50 50)" opacity="${.35+i*.12}"/>`).join('')}</g>`;
  if (st===2) g += `${[42,32,22,12].map((r,i)=>`<circle cx="50" cy="50" r="${r}" fill="none" stroke="${b}" stroke-width="2.4" opacity="${.3+i*.2}"/>`).join('')}`;
  if (st===3) g += `<rect x="0" y="0" width="50" height="50" fill="${b}" opacity=".9"/><rect x="50" y="50" width="50" height="50" fill="${b}" opacity=".45"/><circle cx="50" cy="50" r="14" fill="${a}"/>`;
  if (st===4) g += `<path d="M0 100 C30 40 70 40 100 100Z" fill="${b}" opacity=".8"/><path d="M0 100 C30 60 70 60 100 100Z" fill="#000" opacity=".25"/><circle cx="30" cy="30" r="6" fill="${b}"/>`;
  return cache[seed] = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>${g.replace(/"/g,"'")}</svg>`)}")`;
};
/* Missing-art fallback: "Daria tile" — an eight-point star lattice, tinted per album, never initials */
K.tileURI = (key, dark) => {
  let h=0; for (const c of String(key)) h=(h*31+c.charCodeAt(0))>>>0;
  const hue = [222,200,160,28,280,340][h%6];
  const bg = dark ? `hsl(${hue} 28% 22%)` : `hsl(${hue} 40% 90%)`;
  const fg = dark ? `hsl(${hue} 35% 38%)` : `hsl(${hue} 38% 78%)`;
  const star = (x,y,r)=>{let p='';for(let i=0;i<16;i++){const ang=Math.PI*i/8, rr=i%2?r*.62:r;p+=`${i?'L':'M'}${(x+rr*Math.cos(ang)).toFixed(1)} ${(y+rr*Math.sin(ang)).toFixed(1)}`;}return p+'Z';};
  const note = dark ? `hsl(${hue} 40% 70%)` : `hsl(${hue} 45% 34%)`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='${bg}'/><path d='${star(0,0,22)}${star(100,0,22)}${star(0,100,22)}${star(100,100,22)}${star(50,50,22)}' fill='${fg}'/><path d='M46 60V40l12-3v18' fill='none' stroke='${note}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='42.5' cy='60' r='4' fill='${note}'/><circle cx='54.5' cy='55' r='4' fill='${note}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
K.cover = (item, cls='', o={}) => {
  const bg = item && item.art!=null ? K.artURI(item.art) : K.tileURI((item&&(item.al||item.t))||'x', o.dark);
  const eq = o.playing!=null ? `<span class="eq"><span class="eqb ${o.playing?'on':''}"><i></i><i></i><i></i></span></span>` : '';
  return `<span class="cv ${cls}" style="background-image:${bg.replace(/"/g,'&quot;')}" role="img" aria-label="${K.esc(o.label||'')}"${o.label?'':' aria-hidden="true"'}>${eq}</span>`;
};
K.bgAttr = uri => uri.replace(/"/g,'&quot;');
K.tintOf = item => item && item.art!=null ? PAL[item.art % PAL.length] : ['#46506B','#B6BED3'];

/* ---------- phone chrome ---------- */
K.statusBar = (time='9:41') => `<div class="sb" aria-hidden="true"><span>${time}</span><span class="r">${K.ic('smartphone','xs')}<span class="bat"></span></span></div>`;
K.gestureBar = () => `<div class="gb" aria-hidden="true"></div>`;
K.wordmark = () => `<div class="wm" aria-label="Daria Music"><span class="d">${K.ic('music','l')}</span><span class="n">Daria</span></div>`;
K.phone = (inner, o={}) => {
  const cls = ['phone', o.cls||'', o.scale>1.25?'big wrap':'', o.rm?'rm':''].join(' ');
  const st = `--fs:${o.scale||1};${o.w?`--pw:${o.w}px;`:''}${o.h?`--ph:${o.h}px;`:''}${o.tint?`--tint:${o.tint};`:''}`;
  return `<div class="${cls}" data-theme="${o.theme||'light'}" dir="${o.dir||'ltr'}" lang="${o.dir==='rtl'?'fa':'en'}" style="${st}">${K.statusBar(o.time)}<div class="screen">${inner}</div>${K.gestureBar()}</div>`;
};
})();
