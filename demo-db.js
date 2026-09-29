/* Demo-mode stand-in for Firebase (used when config.js has demo: true).
   Stores everything in this browser's localStorage, so index.html and
   staff.html on the same device/site share data. Not for real use: orders
   do not sync between different phones. */
const KEY = "bar_demo_db";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } };
const write = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch(e){} };
const keys = (p) => String(p).split("/").filter(Boolean);
const getAt = (p) => { let o = read(); for(const k of keys(p)){ if(o == null || typeof o !== "object") return null; o = o[k]; } return o === undefined ? null : o; };
function setAt(p, v){
  const root = read(), ks = keys(p);
  if(!ks.length){ write(v || {}); return; }
  let o = root;
  for(let i = 0; i < ks.length - 1; i++){ if(o[ks[i]] == null || typeof o[ks[i]] !== "object") o[ks[i]] = {}; o = o[ks[i]]; }
  if(v === null || v === undefined) delete o[ks[ks.length-1]]; else o[ks[ks.length-1]] = JSON.parse(JSON.stringify(v));
  write(root);
}
export const initializeApp = () => ({});
export const getDatabase = () => ({});
export const getAuth = () => ({});
export const ref = (db, p) => ({ p });
export const get = async (r) => { const v = getAt(r.p); return { exists: () => v !== null, val: () => v === null ? null : JSON.parse(JSON.stringify(v)) }; };
export const set = async (r, v) => setAt(r.p, v);
export const update = async (r, v) => { const cur = getAt(r.p); setAt(r.p, Object.assign(cur && !Array.isArray(cur) && typeof cur === "object" ? cur : {}, v)); };
export const remove = async (r) => setAt(r.p, null);
export const onAuthStateChanged = (a, cb) => setTimeout(() => cb({ uid: "demo" }), 0);
export const signInAnonymously = async () => ({});

// Small reset badge so a demo can be wiped between viewings.
document.addEventListener("DOMContentLoaded", () => {
  const b = document.createElement("button");
  b.textContent = "Demo mode · reset";
  b.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:200;font:11px system-ui;padding:5px 9px;border-radius:999px;border:1px solid #DDE1E6;background:#fff;color:#667085;opacity:.85";
  b.onclick = () => { if(confirm("Clear all demo orders and reset the menu?")){ localStorage.removeItem(KEY); localStorage.clear(); location.reload(); } };
  document.body.appendChild(b);
});
