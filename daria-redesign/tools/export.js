/* Renders PNG exports of key prototype states and concept mockups.
   Usage: NODE_PATH=$(npm root -g) node tools/export.js   (needs playwright + chromium) */
const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'exports');
const fs = require('fs'); fs.mkdirSync(OUT, {recursive:true});

const STATES = [
  ['dock-01-library-songs', st=>{}],
  ['dock-02-library-playlists', st=>{ st.stack=[{id:'library',lens:'playlists'}]; }],
  ['dock-03-library-albums', st=>{ st.stack=[{id:'library',lens:'albums'}]; }],
  ['dock-04-folders-hidden', st=>{ st.stack=[{id:'library',lens:'folders'}]; st.hidden.add('QuickShare'); }],
  ['dock-05-why-hidden', st=>{ st.hidden.add('QuickShare'); st.sheet={type:'why'}; }],
  ['dock-06-search', st=>{ st.stack.push({id:'search'}); st.search.q='Mahasti'; st.kb=true; }],
  ['dock-07-search-hidden-hint', st=>{ st.hidden.add('QuickShare'); st.stack.push({id:'search'}); st.search.q='Benevis'; st.kb=true; }],
  ['dock-08-song-menu', st=>{ st.sheet={type:'song',song:'ghoroub',ctx:'lib'}; }],
  ['dock-09-now-playing-cover', st=>{ st.np={face:'cover'}; st.pb.playing=true; st.pb.pos=97; }],
  ['dock-10-now-playing-queue', st=>{ st.np={face:'queue'}; }],
  ['dock-11-now-playing-lyrics-synced', st=>{ st.pb.idx=st.pb.q.findIndex(o=>o.id==='nightletters'); st.pb.pos=24; st.np={face:'lyrics'}; }],
  ['dock-12-now-playing-lyrics-none', st=>{ st.np={face:'lyrics'}; }],
  ['dock-13-timer-off', st=>{ st.np={face:'cover'}; st.sheet={type:'timer'}; }],
  ['dock-14-timer-running', st=>{ st.np={face:'cover'}; st.tm.mode='dur'; st.tm.end=st.clock+1798000; st.tm.total=1800; st.sheet={type:'timer'}; }],
  ['dock-15-timer-change-invalid', st=>{ st.np={face:'cover'}; st.tm.mode='dur'; st.tm.end=st.clock+1722000; st.tm.total=1800; st.tm.draft={pick:null}; st.tm.custom='181'; st.tm.err='bad'; st.sheet={type:'timer'}; }],
  ['dock-16-timer-end-of-song', st=>{ st.np={face:'cover'}; st.tm.mode='eos'; st.tm.targetOcc=st.pb.q[st.pb.idx].occ; st.tm.targetId='benevis'; st.sheet={type:'timer'}; }],
  ['dock-17-timer-paused-notice', st=>{ st.np={face:'cover'}; st.notice='timerDone'; st.tm.firedAt=st.clock-600000; }],
  ['dock-18-add-to-playlist', st=>{ st.np={face:'cover'}; st.sheet={type:'addpl'}; }],
  ['dock-19-playlist-hidden-footer', st=>{ st.stack=[{id:'library',lens:'playlists'},{id:'playlist',key:'custom'}]; st.hidden.add('QuickShare'); }],
  ['dock-20-add-songs-picker', st=>{ st.stack=[{id:'library',lens:'playlists'},{id:'playlist',key:'custom'},{id:'picker',key:'custom',q:''}]; st.pick=new Set(['ghoroub','forever']); }],
  ['dock-21-song-info', st=>{ st.stack.push({id:'info',key:'benevis'}); }],
  ['dock-22-editor-changes', st=>{ st.stack.push({id:'info',key:'benevis'}); DK.App.ACT.edit(st,'benevis'); st.ed.v.a='Mahasti'; st.ed.v.y='۱۴۰۱'; st.ed.v.tr='3/x'; st.ed.cover='remove'; }],
  ['dock-23-editor-write-failed', st=>{ st.stack.push({id:'info',key:'benevis'}); DK.App.ACT.edit(st,'benevis'); st.ed.v.a='Mahasti'; st.ed.status='writeFail'; }],
  ['dock-24-share-chooser-simulated', st=>{ st.stack.push({id:'info',key:'benevis'}); st.sys={type:'share',id:'benevis'}; }],
  ['dock-25-settings', st=>{ st.stack.push({id:'settings'}); }],
  ['dock-26-settings-folders', st=>{ st.stack.push({id:'settings-folders'}); st.hidden.add('QuickShare'); }],
  ['dock-27-settings-min-length', st=>{ st.stack.push({id:'settings-duration',review:true}); }],
  ['dock-28-first-run-gate', st=>{ st.perm='first'; st.pb.session=false; }],
  ['dock-29-blocked-gate', st=>{ st.perm='blocked'; st.pb.session=false; }],
  ['dock-30-refresh-failed', st=>{ st.refreshFailed=true; }],
  ['dock-31-missing-file', st=>{ st.missing.add('kaftare'); st.pb.idx=st.pb.q.findIndex(o=>o.id==='kaftare'); st.pb.err='missing'; st.pb.playing=false; st.np={face:'cover'}; }],
  ['dock-32-dark-library', st=>{ st.theme='dark'; }],
  ['dock-33-dark-now-playing', st=>{ st.theme='dark'; st.np={face:'cover'}; }],
  ['dock-34-fa-rtl-library', st=>{ st.lang='fa'; }],
  ['dock-35-fa-rtl-queue', st=>{ st.lang='fa'; st.np={face:'queue'}; }],
  ['dock-36-fa-dark-settings', st=>{ st.lang='fa'; st.theme='dark'; st.stack.push({id:'settings-duration'}); }],
  ['dock-37-small-320', st=>{ st.w=320; st.h=640; }],
  ['dock-38-large-text-320', st=>{ st.w=320; st.h=640; st.scale=1.6; }],
  ['dock-39-large-text-player', st=>{ st.w=320; st.h=640; st.scale=1.6; st.np={face:'cover'}; }],
  ['dock-40-landscape-player', st=>{ st.land=true; st.np={face:'cover'}; }],
];
const CONCEPTS = [
  ['rooms-01-listen','C1','listen'],['rooms-02-library','C1','library'],['rooms-03-search','C1','search'],['rooms-04-now-playing','C1','np'],['rooms-05-queue-sheet','C1','np','queue'],['rooms-06-settings','C1','settings'],['rooms-07-folders','C1','folders'],
  ['stage-01-home','C3','home'],['stage-02-browse','C3','browse'],['stage-03-lyrics','C3','lyrics'],['stage-04-timer','C3','timer'],['stage-05-settings','C3','settings'],['stage-06-hidden','C3','hidden'],
];
(async()=>{
  const b = await chromium.launch();
  const p = await b.newPage({viewport:{width:1000,height:1000}, deviceScaleFactor:2});
  await p.goto('file://'+path.join(ROOT,'prototype.html')); await p.waitForTimeout(800);
  await p.addScriptTag({path: path.join(ROOT,'assets/concepts.js')});
  await p.evaluate(()=>{ const s=document.createElement('div'); s.id='export-stage'; s.style.cssText='position:fixed;left:0;top:0;z-index:999;background:#fff;padding:20px'; document.body.appendChild(s); });
  for (const [name, prep] of STATES){
    await p.evaluate(({name, fn})=>{ const st=DK.App.init(); (new Function('st','DK', 'return ('+fn+')(st)'))(st, DK); document.getElementById('export-stage').innerHTML = DK.App.phone(st); }, {name, fn: prep.toString()});
    await p.waitForTimeout(150);
    await p.locator('#export-stage .phone').screenshot({path: path.join(OUT, name+'.png')});
    console.log('exported', name);
  }
  for (const [name, c, fn, arg] of CONCEPTS){
    await p.evaluate(({c,fn,arg})=>{ const o={theme:'light'}; document.getElementById('export-stage').innerHTML = DK.phone(DK[c][fn](o,arg), o); }, {c,fn,arg});
    await p.waitForTimeout(150);
    await p.locator('#export-stage .phone').screenshot({path: path.join(OUT, name+'.png')});
    console.log('exported', name);
  }
  await b.close();
})();
