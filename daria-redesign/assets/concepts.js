/* Static mockup renderers for the two alternative concepts.
   C1 "Rooms": three destinations (Listen · Library · Search) with a mini player above the bar.
   C3 "Stage": player-first; the library is a sheet that slides over a persistent stage.
   Same content, device size and tasks as the Dock prototype. Static HTML only. */
(function(){
const K = window.DK, ic = K.ic, esc = K.esc;
const dark = o => o.theme==='dark';
const cov = (s,cls,o,extra={}) => K.cover(s,cls,Object.assign({dark:dark(o)},extra));
const S = K.byId;
const row = (o,s,opt={}) => `<div class="row ${opt.cur?'cur':''}">${cov(s,'',o,{playing:opt.cur?true:null})}<span class="tx"><span class="t1">${esc(s.t)}</span><span class="t2">${esc(s.a||'Unknown artist')}</span></span><span class="du">${K.time(s.d)}</span><button class="ib" aria-label="More">${ic('ellipsis-vertical')}</button></div>`;
const LIB = ['ghoroub','cheghadr','forever','fortunate','gimme','gisooye','heyhey','benevis'].map(i=>S[i]);
const mini = (o,s,extra='') => `<div class="mini">${cov(s,'',o)}<div class="tx"><div class="t1">${esc(s.t)}</div><div class="t2">${extra}${esc(s.a)}</div></div><button class="pp" aria-label="Play">${ic('play','fill')}</button><button class="ib" aria-label="Next">${ic('skip-forward','fill')}</button><div class="prog"><i style="width:2%"></i></div></div>`;

/* ---------- C1 Rooms ---------- */
const navbar = (o,cur) => `<div style="display:flex;justify-content:space-around;padding:6px 6px 4px;border-top:1px solid var(--line);background:var(--dock-solid)">${[['listen','Listen','headphones'],['library','Library','library'],['search','Search','search']].map(([k,l,i])=>`<button style="display:flex;flex-direction:column;align-items:center;gap:2px;min-width:72px;padding:4px 10px;border-radius:14px;font-size:12px;font-weight:${k===cur?700:500};color:${k===cur?'var(--accent-ink)':'var(--ink2)'}"><span style="padding:3px 16px;border-radius:14px;background:${k===cur?'var(--accent-soft)':'transparent'}">${ic(i==='headphones'?'audio-lines':i,'s')}</span>${l}</button>`).join('')}</div>`;
const roomsDock = (o,cur,s) => `<div class="dock" style="padding:8px 10px 0;gap:6px">${mini(o,s||S.benevis)}${navbar(o,cur)}</div>`;
function roomsListen(o){
  const rp = ['benevis','gisooye','nightletters','geryeh'].map(i=>S[i]);
  return `<div class="ab" style="padding-inline-start:16px"><div class="t" style="font-size:24px">Good evening<small>Your music, on this phone</small></div><button class="ib" aria-label="Settings">${ic('settings')}</button></div>
  <div class="scroll">
   <div style="margin:4px 16px 14px;padding:14px;border-radius:20px;background:var(--accent);color:var(--on-accent);display:flex;gap:14px;align-items:center">${cov(S.benevis,'m',o)}<div style="flex:1;min-width:0"><div style="font-size:12px;opacity:.8">Continue listening</div><div style="font-weight:700;font-size:17px">Benevis</div><div style="font-size:13px;opacity:.85">Mahasti · 0:01 of 3:58</div></div><button class="btn" style="background:var(--on-accent);color:var(--accent)">${ic('play','s fill')}Resume</button></div>
   <div class="sec-h">Recently played<span class="sp"></span><button>All</button></div>
   <div style="display:flex;gap:12px;overflow-x:auto;padding:0 16px 8px;scrollbar-width:none">${rp.map(s=>`<div style="width:124px;flex:none">${cov(s,'l',o)}<div style="font-weight:600;font-size:13.5px;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.t)}</div><div style="font-size:12px;color:var(--ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.a)}</div></div>`).join('')}</div>
   <div class="sec-h">Shortcuts</div>
   <div class="smart">${K.smart.map(m=>`<button><span class="ic">${ic(m.icon,'s')}</span><span><b>${m.name}</b><small>${m.n||3} songs</small></span></button>`).join('')}</div>
   <div class="sec-h">Recently added</div>
   ${['ghoroub','cheghadr','forever'].map(i=>row(o,S[i])).join('')}
   <div style="height:170px"></div></div>${roomsDock(o,'listen')}`;
}
function roomsLibrary(o, lens='songs'){
  return `<div class="ab" style="padding-inline-start:16px"><div class="t" style="font-size:24px">Library</div><button class="ib" aria-label="Sort">${ic('arrow-up-down')}</button></div>
  <div class="lens" role="tablist">${['songs','albums','artists','folders','playlists'].map(l=>`<button aria-selected="${l===lens}">${l[0].toUpperCase()+l.slice(1)}</button>`).join('')}</div>
  <div class="meta-row"><span class="c">825 songs · Recently added</span><button class="ib" aria-label="Shuffle">${ic('shuffle')}</button></div>
  <div class="scroll">${LIB.map(s=>row(o,s,{cur:s.id==='benevis'})).join('')}<div style="height:170px"></div></div>${roomsDock(o,'library')}`;
}
function roomsSearch(o){
  return `<div class="ab" style="padding-inline-start:16px"><div class="t" style="font-size:24px">Search</div></div>
  <div style="padding:0 16px 8px"><div class="find act">${ic('search','s')}<span style="color:var(--ink)">Mahasti</span><span style="flex:1"></span>${ic('x','s')}</div></div>
  <div class="lens">${['All','Songs','Albums','Artists','Playlists'].map((l,i)=>`<button aria-selected="${i===0}">${l}</button>`).join('')}</div>
  <div class="scroll"><div class="sec-h">Songs</div>${row(o,S.benevis,{cur:true})}<div class="sec-h">Artists</div><div class="row">${cov({t:'Mahasti'},'round',o)}<span class="tx"><span class="t1">Mahasti - GahMusic.com</span><span class="t2">6 songs</span></span>${ic('chevron-right')}</div>
  <div style="height:250px;margin:12px -0 0;background:var(--s3);display:grid;place-items:center;color:var(--ink3);font-size:12px">Keyboard</div></div>${roomsDock(o,'search')}`;
}
function roomsNP(o, sheet){
  const s=S.benevis;
  return `<div class="np" style="--tint:#6B4A2F"><div class="ab"><button class="ib" aria-label="Close">${ic('chevron-down')}</button><div class="t">Playing from<b>Songs · Recently added</b></div><button class="ib" aria-label="More">${ic('ellipsis-vertical')}</button></div>
   <div class="np-face"><div class="np-art">${cov(s,'',o)}</div></div>
   <div class="np-title"><div class="tx"><h3>${esc(s.t)}</h3><p>${esc(s.a)}</p></div><button class="ib" style="color:var(--danger)" aria-label="Favourite">${ic('heart','fill')}</button></div>
   <div class="tl"><div class="wave">${Array.from({length:56}).map((_,i)=>`<i style="height:${30+((i*37)%60)}%"></i>`).join('')}<span class="knob" style="left:1%"></span></div><div class="times"><span>0:01</span><span>3:58</span></div></div>
   <div class="transport"><button class="ib" aria-label="Shuffle">${ic('shuffle')}</button><button class="ib" aria-label="Previous">${ic('skip-back','l fill')}</button><button class="big" aria-label="Play">${ic('play','l fill')}</button><button class="ib" aria-label="Next">${ic('skip-forward','l fill')}</button><button class="ib" aria-label="Repeat">${ic('repeat')}</button></div>
   <div class="np-actions"><button class="act">${ic('list-music','s')}Queue</button><button class="act">${ic('scroll-text','s')}Lyrics <span class="tag-fut" style="font-size:8px">soon</span></button><button class="act">${ic('moon','s')}Sleep timer</button><button class="act">${ic('list-plus','s')}Playlist</button></div>
   ${sheet==='queue'?`<div class="scrim"></div><div class="sheet" style="max-height:62%"><div class="grab"></div><div class="sh"><div class="tx"><h4>Up next</h4><p>82 of 825 · Songs</p></div><button class="ib" aria-label="Close">${ic('x')}</button></div><div class="body">${['gisooye','geryeh','pizza','romania','medad'].map(i=>`<div class="row" style="padding-inline-start:12px">${cov(S[i],'',o)}<span class="tx"><span class="t1">${esc(S[i].t)}</span><span class="t2">${esc(S[i].a||'Unknown artist')}</span></span><span class="drag">${ic('grip-vertical')}</span></div>`).join('')}</div></div>`:''}
  </div>`;
}
function roomsSettings(o){
  return `<div class="ab"><button class="ib" aria-label="Back">${ic('arrow-left')}</button><div class="t">Settings</div></div>
  <div class="scroll"><div class="sec-h">Library</div><div class="set"><button class="it">${ic('folder')}<span class="tx"><b>Folders</b><small>All folders shown</small></span>${ic('chevron-right','s')}</button><button class="it">${ic('timer')}<span class="tx"><b>Minimum song length</b><small>30 seconds</small></span>${ic('chevron-right','s')}</button><button class="it">${ic('refresh-cw')}<span class="tx"><b>Refresh library</b><small>Updates automatically</small></span></button></div>
  <div class="sec-h">Appearance</div><div class="set" style="padding:12px 0"><div class="seg"><button aria-pressed="true">${ic('smartphone','s')}System</button><button>${ic('sun','s')}Light</button><button>${ic('moon','s')}Dark</button></div></div>
  <div class="sec-h">Listen page</div><div class="set"><div class="it">${ic('history')}<span class="tx"><b>Show listening history</b><small>Recently played and most played</small></span><span class="sw on"></span></div></div>
  <div style="height:170px"></div></div>${roomsDock(o,'listen')}`;
}
function roomsFolderHide(o){
  return `<div class="ab"><button class="ib" aria-label="Back">${ic('arrow-left')}</button><div class="t">Folders</div></div>
  <p class="explain">Hidden folders disappear from browsing and search. Files stay on your phone. Playlists and the current queue keep their songs.</p>
  <div class="set">${K.folders.map((f,i)=>`<button class="it" role="switch" aria-checked="${i!==3}">${ic(i!==3?'folder':'eye-off')}<span class="tx"><b>${esc(f.name)}</b><small>${esc(f.path)}</small><small>${f.n} songs</small></span><span class="sw ${i!==3?'on':''}"></span></button>`).join('')}</div>
  <div class="snack" style="--snack-b:150px"><span class="tx">“Quick Share” hidden · 718 songs</span><button>Undo</button></div>
  <div style="flex:1"></div>${roomsDock(o,'library')}`;
}

/* ---------- C3 Stage ---------- */
function stageTop(o, s, compact){
  const tint = '#6B4A2F';
  const wave = `<div class="tl" style="padding:0"><div class="wave" style="height:26px">${Array.from({length:44}).map((_,i)=>`<i style="height:${30+((i*37)%60)}%"></i>`).join('')}<span class="knob" style="left:1%"></span></div></div>`;
  if (compact) return `<div style="--tint:${tint};background:linear-gradient(180deg,color-mix(in srgb,var(--tint) 30%,var(--bg)),color-mix(in srgb,var(--tint) 12%,var(--bg)));padding:8px 12px 10px;display:flex;gap:10px;align-items:center;flex:none">${cov(s,'m',o)}<div style="flex:1;min-width:0"><div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.t)}</div><div style="font-size:12.5px;color:var(--ink2)">${esc(s.a)}</div>${wave}</div><button class="transport big" style="width:52px;height:52px;padding:0;display:grid;place-items:center;background:var(--tint);color:var(--bg);border-radius:26px" aria-label="Play">${ic('play','fill')}</button></div>`;
  return `<div style="--tint:${tint};background:linear-gradient(180deg,color-mix(in srgb,var(--tint) 32%,var(--bg)),color-mix(in srgb,var(--tint) 10%,var(--bg)));padding:0 16px 8px;flex:none">
   <div class="ab" style="padding-inline:0"><div class="wm">${ic('music','l')}<span class="n">Daria</span></div><button class="ib" aria-label="Sleep timer">${ic('moon')}</button><button class="ib" aria-label="Settings">${ic('settings')}</button></div>
   <div style="display:flex;gap:14px;align-items:center">${cov(s,'xl',o)}<div style="flex:1;min-width:0"><div style="font-size:12px;color:var(--ink2)">Playing from Songs</div><div style="font-weight:800;font-size:21px;line-height:1.2">${esc(s.t)}</div><div style="color:var(--ink2)">${esc(s.a)}</div><div style="display:flex;gap:4px;margin-top:6px"><button class="ib" style="width:40px;height:40px;color:var(--danger)" aria-label="Favourite">${ic('heart','fill')}</button><button class="ib" style="width:40px;height:40px" aria-label="Lyrics">${ic('scroll-text')}</button><button class="ib" style="width:40px;height:40px" aria-label="Add to playlist">${ic('list-plus')}</button></div></div></div>
   <div style="margin-top:6px">${wave}<div class="times" style="display:flex;justify-content:space-between;font-size:12px;color:var(--ink2)"><span>0:01</span><span>3:58</span></div></div>
   <div class="transport" style="padding:2px 0 0"><button class="ib" aria-label="Shuffle">${ic('shuffle')}</button><button class="ib" aria-label="Previous">${ic('skip-back','l fill')}</button><button class="big" style="width:64px;height:64px" aria-label="Play">${ic('play','l fill')}</button><button class="ib" aria-label="Next">${ic('skip-forward','l fill')}</button><button class="ib" aria-label="Repeat">${ic('repeat')}</button></div>
  </div>`;
}
const strip = o => `<div style="flex:none;padding:8px 0 4px"><div class="sec-h" style="padding-top:4px">Up next · 743<span class="sp"></span><button>Edit</button></div><div style="display:flex;gap:10px;overflow-x:auto;padding:0 16px 6px;scrollbar-width:none">${['gisooye','geryeh','pizza','romania','medad','pichak'].map(i=>`<div style="width:78px;flex:none">${cov(S[i],'l',o)}<div style="font-size:11.5px;font-weight:600;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(S[i].t)}</div></div>`).join('')}</div></div>`;
function stageHome(o){
  return `${stageTop(o,S.benevis,false)}${strip(o)}
  <div style="flex:1;min-height:0;display:flex;flex-direction:column;background:var(--surface);border-radius:22px 22px 0 0;box-shadow:0 -6px 24px rgba(0,0,0,.08)">
   <div class="grab" style="width:36px;height:4px;border-radius:2px;background:var(--ink3);opacity:.5;margin:10px auto 2px"></div>
   <div style="display:flex;gap:8px;align-items:center;padding:6px 12px 4px"><div class="find" style="height:40px;flex:1;font-size:13.5px">${ic('search','s')}Search library</div></div>
   <div class="lens">${['Songs','Playlists','Albums','Artists','Folders'].map((l,i)=>`<button aria-selected="${i===0}">${l}</button>`).join('')}</div>
   <div class="scroll">${LIB.slice(0,4).map(s=>row(o,s)).join('')}</div>
  </div>`;
}
function stageBrowse(o){
  return `${stageTop(o,S.benevis,true)}
  <div style="flex:1;min-height:0;display:flex;flex-direction:column;background:var(--surface);border-radius:22px 22px 0 0;box-shadow:0 -6px 24px rgba(0,0,0,.08)">
   <div class="grab" style="width:36px;height:4px;border-radius:2px;background:var(--ink3);opacity:.5;margin:10px auto 2px"></div>
   <div style="display:flex;gap:8px;align-items:center;padding:6px 12px 4px"><div class="find" style="height:40px;flex:1;font-size:13.5px">${ic('search','s')}Search library</div><button class="ib" style="width:40px;height:40px" aria-label="Sort">${ic('arrow-up-down')}</button></div>
   <div class="lens">${['Songs','Playlists','Albums','Artists','Folders'].map((l,i)=>`<button aria-selected="${i===0}">${l}</button>`).join('')}</div>
   <div class="meta-row"><span class="c">825 songs · Recently added</span><button class="pill">${ic('shuffle','xs')}Shuffle all</button></div>
   <div class="scroll">${LIB.map(s=>row(o,s,{cur:s.id==='benevis'})).join('')}</div>
  </div>`;
}
function stageLyrics(o){
  const ly = K.lyrics.nightletters;
  return `${stageTop(o,S.nightletters,false).replace('#6B4A2F','#23395B')}
  <div style="flex:1;min-height:0;display:flex;flex-direction:column;background:var(--surface);border-radius:22px 22px 0 0">
   <div class="faces" style="margin:10px 16px 0"><button aria-selected="true">${ic('scroll-text','s')}Lyrics <span class="tag-fut" style="font-size:8px">future</span></button><button>${ic('list-music','s')}Up next</button><button>${ic('library','s')}Library</button></div>
   <div class="lyr">${ly.lines.slice(1,9).map((l,i)=>`<p class="${i===1?'now':''}">${esc(l[1])}</p>`).join('')}</div></div>`;
}
function stageTimer(o){
  return `${stageTop(o,S.benevis,true)}
  <div style="flex:1;min-height:0;background:var(--surface);border-radius:22px 22px 0 0"><div class="lens" style="padding-top:12px">${['Songs','Playlists','Albums','Artists','Folders'].map((l,i)=>`<button aria-selected="${i===0}">${l}</button>`).join('')}</div>${LIB.slice(0,3).map(s=>row(o,s)).join('')}</div>
  <div class="scrim"></div><div class="sheet"><div class="grab"></div><div class="sh"><span style="color:var(--accent)">${ic('moon','l')}</span><div class="tx"><h4>Sleep timer</h4><p>Time keeps counting during pauses and calls. The last 5 seconds fade out.</p></div></div><div class="body">
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 16px 10px">${[15,30,45,60].map(m=>`<button class="btn o" style="flex-direction:column;gap:0;min-height:64px;border-radius:18px"><b style="font-size:20px">${m}</b><small style="color:var(--ink3);font-weight:500">min</small></button>`).join('')}</div>
   <div style="padding:0 16px 10px"><button class="btn o" style="width:100%;justify-content:flex-start;min-height:60px;border-radius:18px">${ic('music','s')}<span style="text-align:start"><b>End of this song</b><small style="display:block;font-weight:500;color:var(--ink3)">Pause when it ends</small></span></button></div>
   <div style="display:flex;gap:8px;padding:0 16px 12px;align-items:flex-end"><div class="fld" style="flex:1;margin:0"><label>Custom minutes</label><div class="in"><input value="20"></div><div class="hint">A whole number from 1 to 180</div></div><button class="btn o" style="margin-bottom:22px">Start</button></div></div></div>`;
}
function stageSettings(o){
  return `${stageTop(o,S.benevis,true)}
  <div style="flex:1;min-height:0;display:flex;flex-direction:column;background:var(--surface);border-radius:22px 22px 0 0">
   <div class="ab"><button class="ib" aria-label="Back">${ic('arrow-left')}</button><div class="t">Settings</div></div>
   <div class="scroll"><div class="sec-h">Library</div><div class="set"><button class="it">${ic('folder')}<span class="tx"><b>Folders</b><small>1 hidden · 718 songs</small></span>${ic('chevron-right','s')}</button><button class="it">${ic('timer')}<span class="tx"><b>Minimum song length</b><small>30 seconds · hides 9</small></span>${ic('chevron-right','s')}</button></div>
   <div class="sec-h">Appearance</div><div class="set" style="padding:12px 0"><div class="seg"><button aria-pressed="true">${ic('smartphone','s')}System</button><button>${ic('sun','s')}Light</button><button>${ic('moon','s')}Dark</button></div></div>
   <div class="sec-h">Stage</div><div class="set"><div class="it">${ic('disc-3')}<span class="tx"><b>Keep the player expanded on launch</b><small>Off: opens with the library sheet raised</small></span><span class="sw"></span></div></div></div></div>`;
}
function stageHidden(o){
  return `${stageTop(o,S.benevis,true)}
  <div style="flex:1;min-height:0;display:flex;flex-direction:column;background:var(--surface);border-radius:22px 22px 0 0">
   <div class="grab" style="width:36px;height:4px;border-radius:2px;background:var(--ink3);opacity:.5;margin:10px auto 2px"></div>
   <div class="lens">${['Songs','Playlists','Albums','Artists','Folders'].map((l,i)=>`<button aria-selected="${i===4}">${l}</button>`).join('')}</div>
   <div class="meta-row"><span class="c">3 folders</span><button class="pill warn">${ic('eye-off','xs')}718 hidden</button></div>
   <div class="scroll">${K.folders.slice(0,3).map(f=>`<div class="row"><span class="cv" style="display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-ink)">${ic('folder')}</span><span class="tx"><span class="t1">${esc(f.name)}</span><span class="t2">${f.n} songs · ${K.time(f.dur)}</span></span><button class="ib">${ic('ellipsis-vertical')}</button></div>`).join('')}
   <div class="sec-h">${ic('eye-off','xs')}Hidden from library</div><div class="row dim"><span class="cv" style="display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-ink)">${ic('eye-off')}</span><span class="tx"><span class="t1">Quick Share</span><span class="t2">718 songs</span></span><button class="btn x">Show</button></div></div></div>
  <div class="snack" style="--snack-b:24px"><span class="tx">“Quick Share” hidden · 718 songs</span><button>Undo</button></div>`;
}

K.C1 = {listen:roomsListen, library:roomsLibrary, search:roomsSearch, np:roomsNP, settings:roomsSettings, folders:roomsFolderHide};
K.C3 = {home:stageHome, browse:stageBrowse, lyrics:stageLyrics, timer:stageTimer, settings:stageSettings, hidden:stageHidden};
})();
