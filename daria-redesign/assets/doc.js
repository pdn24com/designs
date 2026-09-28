/* Shared doc helpers: navigation + static phone galleries rendered from prototype states. */
(function(){
const PAGES = [
  ['index.html','Summary'],['diagnosis.html','Diagnosis'],['concepts.html','Concepts'],
  ['design.html','Final design'],['prototype.html','Prototype'],['handoff.html','Handoff'],['validation.html','Validation']];
window.DKdoc = {
  nav(){
    const here = (location.pathname.split('/').pop()||'index.html');
    const el = document.getElementById('topnav'); if (!el) return;
    el.innerHTML = `<div class="wrap"><a class="brand" href="index.html"><i></i>Daria redesign</a>${PAGES.map(([h,l])=>`<a class="l" href="${h}" ${h===here?'aria-current="page"':''}>${l}</a>`).join('')}</div>`;
  },
  /* items: [{st:{overrides}, prep:(st)=>void, html:'<raw phone html>', cap:'Title', txt:'caption', ev:'evidence'}] */
  gallery(id, items, scale=0.62){
    const host = document.getElementById(id); if (!host) return;
    host.classList.add('gallery');
    host.innerHTML = items.map(it=>{
      let ph = it.html;
      let w = 390, h = 844;
      if (!ph){ const st = DK.App.init(Object.assign({}, it.st||{})); it.prep && it.prep(st); ph = DK.App.phone(st); w = st.land?st.h:st.w; h = st.land?st.w:st.h; }
      else { w = it.w||390; h = it.h||844; }
      const s = it.scale || scale;
      return `<figure class="shot" style="margin:0"><div class="fr" style="width:${w*s}px;height:${h*s}px"><div style="position:absolute;top:0;left:0;transform:scale(${s});transform-origin:0 0">${ph}</div></div><figcaption><b>${it.cap||''}</b>${it.txt||''}${it.ev?`<span class="ev">${it.ev}</span>`:''}</figcaption></figure>`;
    }).join('');
    host.querySelectorAll('.phone').forEach(p=>{ p.setAttribute('inert',''); p.setAttribute('aria-hidden','true'); });
  }
};
document.addEventListener('DOMContentLoaded', ()=>DKdoc.nav());
})();
