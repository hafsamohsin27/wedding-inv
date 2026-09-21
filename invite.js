/* =========================================================================
   Mohsin & Hafsa — "Zarnigar"
   ========================================================================= */
/* ---------- how tall is the screen, really? ----------
   On a phone the browser's own bar covers part of the window and calc(var(--vh) * 100) does not
   know it, which is why buttons ended up behind the pager. visualViewport does
   know, so the whole layout is driven from what it reports. */
(function trackViewport() {
  const root = document.documentElement;
  const set = () => {
    const vv = window.visualViewport;
    root.style.setProperty("--appH", Math.round(vv ? vv.height : innerHeight) + "px");
    const h = Math.round(vv ? vv.height : innerHeight);
    root.style.setProperty("--appW", Math.round(vv ? vv.width : innerWidth) + "px");
    root.classList.toggle("is-short", h < 730);
    root.classList.toggle("is-tiny",  h < 620);
  };
  set();
  addEventListener("resize", set);
  addEventListener("orientationchange", () => setTimeout(set, 260));
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", set);
    visualViewport.addEventListener("scroll", set);
  }
  // the address bar slides away a moment after load, so look again
  [320, 900, 2000].forEach(t => setTimeout(set, t));
})();

const CFG = window.INVITE || {};
const COUNTDOWN_TO = CFG.countdown || "2026-11-26T16:00:00+05:00";
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

const EVENTS = [
  { key:"mehndi", ur:"مہندی", en:"Mehendi",
    date:"26 November 2026", dow:"Thursday", time:"4:00 PM",
    venue:"Bride's Residence", card:"mehndi-card.jpg", cw:1060, ch:1484,
    q:"31.5217113, 74.2590803", zoom:18, accent:"#9FD08A" },
  { key:"baraat", ur:"برات", en:"Baraat",
    date:"27 November 2026", dow:"Friday", time:"6:00 PM",
    venue:"VICEROY By Mughal-E-Azam", card:"baraat-card.jpg", cw:1060, ch:1484,
    q:"31.4415346, 74.1980143", zoom:17, accent:"#EEA9AE" },
  { key:"walima", ur:"ولیمہ", en:"Walima",
    date:"28 November 2026", dow:"Saturday", time:"4:00 PM",
    venue:"Suffa Developers Farm House", card:"walima-card.jpg", cw:1071, ch:1469,
    q:"31.469506, 74.5227005", zoom:16, accent:"#B6CDEC" },
];

if (CFG.keep) {
  const wanted = CFG.keep;
  const kept = EVENTS.filter(e => wanted.includes(e.key));
  EVENTS.length = 0;
  kept.forEach(e => EVENTS.push(e));
}

/* ---------- split the names into letters so they can arrive one by one ---------- */
document.querySelectorAll("[data-split]").forEach(el => {
  let n = 0;
  el.innerHTML = el.textContent.trim().split(/\s+/).map(word =>
    `<span class="wd">` + [...word].map(c =>
      `<span class="ch${c === "&" ? " amp" : ""}" style="--n:${n++}">${c}</span>`).join("") + `</span>`
  ).join(" ");
});

/* ---------- build the event pages ---------- */
const stage = document.getElementById("stage");
const closeScene = document.querySelector(".scene-close");

EVENTS.forEach((e, i) => {
  const s = document.createElement("section");
  s.className = "scene scene-event";
  s.dataset.scene = String(i + 2);
  s.dataset.name = e.key;
  s.dataset.q = e.q; s.dataset.zoom = e.zoom; s.dataset.venue = e.venue;
  s.setAttribute("aria-label", e.en);
  s.style.setProperty("--accent", e.accent);
  s.innerHTML = `
    <div class="ev-bg" style="background-image:url('bg-${e.key}.jpg')"></div>
    <div class="ev-tint"></div>
    <div class="ev-scrim"></div>
    <div class="filigree" aria-hidden="true">
      <svg class="tl" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1">
        <path d="M2 40 C2 18 18 2 40 2" opacity=".9"/><path d="M10 46 C10 26 26 10 46 10" opacity=".55"/>
        <path d="M40 2 C58 2 66 12 66 22 C66 30 60 34 55 34 C50 34 46 30 46 25" opacity=".8"/>
        <path d="M2 40 C2 58 12 66 22 66 C30 66 34 60 34 55 C34 50 30 46 25 46" opacity=".8"/>
        <circle cx="52" cy="22" r="2.4" fill="currentColor" stroke="none"/><circle cx="22" cy="52" r="2.4" fill="currentColor" stroke="none"/></svg>
      <svg class="tr" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1">
        <path d="M2 40 C2 18 18 2 40 2" opacity=".9"/><path d="M10 46 C10 26 26 10 46 10" opacity=".55"/>
        <path d="M40 2 C58 2 66 12 66 22 C66 30 60 34 55 34 C50 34 46 30 46 25" opacity=".8"/>
        <path d="M2 40 C2 58 12 66 22 66 C30 66 34 60 34 55 C34 50 30 46 25 46" opacity=".8"/>
        <circle cx="52" cy="22" r="2.4" fill="currentColor" stroke="none"/><circle cx="22" cy="52" r="2.4" fill="currentColor" stroke="none"/></svg>
      <svg class="bl" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1">
        <path d="M2 40 C2 18 18 2 40 2" opacity=".9"/><path d="M10 46 C10 26 26 10 46 10" opacity=".55"/>
        <path d="M40 2 C58 2 66 12 66 22 C66 30 60 34 55 34 C50 34 46 30 46 25" opacity=".8"/>
        <path d="M2 40 C2 58 12 66 22 66 C30 66 34 60 34 55 C34 50 30 46 25 46" opacity=".8"/>
        <circle cx="52" cy="22" r="2.4" fill="currentColor" stroke="none"/><circle cx="22" cy="52" r="2.4" fill="currentColor" stroke="none"/></svg>
      <svg class="br" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1">
        <path d="M2 40 C2 18 18 2 40 2" opacity=".9"/><path d="M10 46 C10 26 26 10 46 10" opacity=".55"/>
        <path d="M40 2 C58 2 66 12 66 22 C66 30 60 34 55 34 C50 34 46 30 46 25" opacity=".8"/>
        <path d="M2 40 C2 58 12 66 22 66 C30 66 34 60 34 55 C34 50 30 46 25 46" opacity=".8"/>
        <circle cx="52" cy="22" r="2.4" fill="currentColor" stroke="none"/><circle cx="22" cy="52" r="2.4" fill="currentColor" stroke="none"/></svg>
    </div>
    <div class="scene-inner">
      <p class="ev-en foil rv" style="--i:0">${e.en}</p>
      <p class="ev-ur rv" style="--i:1">${e.ur}</p>
      <div class="gap-s"></div>
      <div class="draw"></div>
      <div class="gap-m"></div>

      <div class="tiltbox rv" style="--i:2;--cw:${e.cw};--ch:${e.ch}">
        <div class="frame" style="--cw:${e.cw};--ch:${e.ch}" data-tilt data-card="${e.card}">
          <div class="ring"></div>
          <img src="${e.card}" alt="${e.en} invitation card" />
          <div class="gloss"></div><div class="edge"></div>
        </div>
      </div>

      <div class="gap-m"></div>
      <p class="band rv" style="--i:3"><b>${e.dow}</b><s>&#10022;</s><b>${e.date}</b><s>&#10022;</s><b>${e.time}</b></p>
      <div class="gap-s"></div>
      <p class="venue rv" style="--i:4"><small>Venue</small>${e.venue}</p>
      <div class="gap-m"></div>
      <div class="pills rv" style="--i:5">
        <button class="pill" data-map>Location</button>
        <button class="pill solid" data-card="${e.card}"><span>View card</span></button>
      </div>
    </div>`;
  stage.insertBefore(s, closeScene);
});

/* every map is created and fetched while the loading screen is still up,
   so opening "Location" later never waits for the network */
const sheetMaps = document.getElementById("sheetMaps");
sheetMaps.innerHTML = EVENTS.map(e =>
  `<div class="mapwrap" data-for="${e.key}"><iframe class="map" title="${e.en} location"
     referrerpolicy="no-referrer-when-downgrade"
     src="https://maps.google.com/maps?q=${encodeURIComponent(e.q)}&z=${e.zoom}&hl=en&output=embed"></iframe></div>`
).join("");

closeScene.dataset.scene = String(EVENTS.length + 2);
const scenes = Array.from(document.querySelectorAll(".scene"));
const LAST = scenes.length;

/* ---------- rail ---------- */
const rail = document.getElementById("rail");
rail.innerHTML =
  `<button class="arw" data-step="-1" aria-label="Previous">&#8249;</button>` +
  EVENTS.map((e, i) => `<button data-go="${i + 2}">${e.en}</button>`).join("") +
  `<button data-go="${LAST}" aria-label="Closing">&#10022;</button>` +
  `<button class="arw" data-step="1" aria-label="Next">&#8250;</button>`;

/* ---------- gold dust ---------- */
function moteSprite(dpr) {
  const S = Math.round(28 * dpr), c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,241,206,1)");
  g.addColorStop(.32, "rgba(228,193,115,.55)");
  g.addColorStop(1, "rgba(228,193,115,0)");
  x.fillStyle = g; x.fillRect(0, 0, S, S);
  return c;
}

(function dust() {
  if (REDUCED) return;
  const cv = document.getElementById("dust");
  const ctx = cv.getContext("2d");
  let w, h, motes = [], dpr = Math.min(devicePixelRatio || 1, 2);
  const sprite = moteSprite(dpr);
  const make = () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.5 + .35,
    vy: -(Math.random() * .16 + .04),
    vx: (Math.random() - .5) * .12,
    a: Math.random() * .5 + .12,
    tw: Math.random() * Math.PI * 2,
    ts: Math.random() * .02 + .006,
  });
  const size = () => {
    w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    const n = Math.round(Math.min(26, innerWidth / 18));
    motes = Array.from({ length: n }, make).map(m => ({ ...m, r: m.r * dpr, vy: m.vy * dpr, vx: m.vx * dpr }));
  };
  size(); addEventListener("resize", size);
  // 30fps is plenty for drifting dust and halves the work on a phone
  let last = 0;
  (function frame(now) {
    requestAnimationFrame(frame);
    if (now - last < 33) return;
    last = now;
    ctx.clearRect(0, 0, w, h);
    for (const m of motes) {
      m.x += m.vx; m.y += m.vy; m.tw += m.ts;
      if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
      if (m.x < -10) m.x = w + 10; if (m.x > w + 10) m.x = -10;
      ctx.globalAlpha = m.a * (.6 + .4 * Math.sin(m.tw));
      const d = m.r * 9;
      ctx.drawImage(sprite, m.x - d / 2, m.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame;
  })(0);
})();

/* ---------- loader ---------- */
(function preload() {
  const el = document.getElementById("loader");
  const fill = document.getElementById("ldFill"), pct = document.getElementById("ldPct");
  const art = ["env-body.png","env-flap.png","env-flap-lining.png",
               "seal.png","dawat-nama.png","grain.png"]
    .concat(EVENTS.map(e => e.card))
    .concat(EVENTS.map(e => `bg-${e.key}.jpg`));
  const frames = Array.from(document.querySelectorAll("#sheetMaps iframe"));
  const total = art.length + 1 + frames.length;
  let done = 0, finished = false;
  const show = () => { const p = Math.min(100, Math.round(done / total * 100));
    fill.style.width = p + "%"; pct.textContent = p + "%"; };
  const reveal = () => { if (finished) return; finished = true;
    fill.style.width = "100%"; pct.textContent = "100%";
    // lay out and draw every page once, behind the loading screen, so that
    // nothing has to be worked out for the first time later on
    const warm = () => {
      const all = Array.from(document.querySelectorAll(".scene"));
      all.forEach(s => { if (!s.classList.contains("is-active")) {
        s.style.visibility = "visible"; s.style.opacity = "0"; } });
      all.forEach(s => void s.offsetHeight);                  // force the layout now
      requestAnimationFrame(() => requestAnimationFrame(() => {
        all.forEach(s => { s.style.visibility = ""; s.style.opacity = ""; });
      }));
    };
    warm();
    setTimeout(() => {
      el.classList.add("is-done"); document.body.classList.remove("is-loading");
      setTimeout(() => { el.style.display = "none"; }, 900);   // nothing of it may linger
    }, 520); };
  const step = () => { done++; show(); if (done >= total) reveal(); };
  art.forEach(src => {
    const i = new Image();
    const done = () => { if (i.decode) i.decode().then(step).catch(step); else step(); };
    i.onload = done; i.onerror = step; i.src = src;
  });
  let f = false; const fd = () => { if (!f) { f = true; step(); } };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fd).catch(fd);
  setTimeout(fd, 4000);
  frames.forEach(fr => {
    let c = false; const m = () => { if (!c) { c = true; step(); } };
    fr.addEventListener("load", m, { once:true });
    fr.addEventListener("error", m, { once:true });
    setTimeout(m, 7000);                       // Google gets its own ceiling
  });
  setTimeout(reveal, 14000);
})();

/* ---------- if the phone is struggling, quietly take the decoration off ----------
   Two seconds of frames are timed once the page is up. If more than a third of
   them are late, the extras (dust, grain, the travelling sheens, the foil shimmer)
   are switched off and only the design itself remains. Nothing else changes. */
(function adaptToDevice() {
  const root = document.documentElement;
  if (REDUCED) { root.classList.add("lite"); return; }
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 &&
      navigator.deviceMemory && navigator.deviceMemory <= 3) { root.classList.add("lite"); return; }

  const sample = () => {
    if (root.classList.contains("lite")) return;
    let frames = 0, late = 0, last = 0;
    const watch = now => {
      if (root.classList.contains("lite")) return;
      if (last) { const d = now - last; if (d > 34) late++; frames++; }
      last = now;
      if (frames < 150) requestAnimationFrame(watch);
      else if (late / frames > 0.3) root.classList.add("lite");
    };
    requestAnimationFrame(watch);
  };
  window.__checkPace = sample;            // measured again on the first event page
  const watch = () => sample();
  // start watching once the loading screen is out of the way
  const begin = () => sample();
  if (document.body.classList.contains("is-loading")) {
    const mo = new MutationObserver(() => {
      if (!document.body.classList.contains("is-loading")) { mo.disconnect(); setTimeout(begin, 500); }
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  } else begin();
})();

/* ---------- countdown ----------
   Each unit is two fixed layers that swap places. Nothing is added to or
   removed from the page, so a digit can only move when its value changes. */
(function countdown() {
  const at = new Date(COUNTDOWN_TO).getTime();
  const pad = n => (n < 10 ? "0" : "") + n;

  const rolls = {};
  document.querySelectorAll(".roll[data-u]").forEach(el => {
    el.dataset.v = el.children[0].textContent;
    el.children[1].textContent = el.children[0].textContent;
    el.children[1].classList.add("down");
    el._i = 0;
    rolls[el.dataset.u] = el;
  });

  const set = (el, v) => {
    if (!el || el.dataset.v === v) return;       // unchanged digits never animate
    el.dataset.v = v;
    const cur = el.children[el._i];
    const nxt = el.children[1 - el._i];
    nxt.textContent = v;
    nxt.classList.remove("up");
    nxt.classList.add("down");                    // parked below, no transition
    void nxt.offsetWidth;                         // let that position settle
    nxt.classList.remove("down");                 // now it rises into place
    cur.classList.add("up");                      // and the old one leaves upward
    el._i = 1 - el._i;
    clearTimeout(el._t);
    el._t = setTimeout(() => {                    // park the spent layer, ready for next time
      cur.classList.remove("up");
      cur.classList.add("down");
    }, 540);
  };

  const tick = () => {
    let t = Math.max(0, Math.round((at - Date.now()) / 1000));
    const d = Math.floor(t / 86400); t -= d * 86400;
    const h = Math.floor(t / 3600);  t -= h * 3600;
    const m = Math.floor(t / 60);
    const s = t - m * 60;
    set(rolls.d, String(d).length > 2 ? String(d) : pad(d));
    set(rolls.h, pad(h));
    set(rolls.m, pad(m));
    set(rolls.s, pad(s));
  };

  tick();
  // a quarter-second heartbeat keeps the seconds honest even after the phone sleeps
  setInterval(tick, 250);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
})();

/* ---------- the card that tilts under the finger ---------- */
function wireTilt(root) {
  root.querySelectorAll("[data-tilt]").forEach(card => {
    const gloss = card.querySelector(".gloss");
    const settle = () => card.classList.add("settled");
    card.addEventListener("transitionend", e => { if (e.propertyName === "transform") settle(); });
    let raf = 0;
    const move = (px, py) => {
      const r = card.getBoundingClientRect();
      const x = (px - r.left) / r.width, y = (py - r.top) / r.height;
      cancelAnimationFrame(raf);
      if (!card.classList.contains("settled")) return;
      raf = requestAnimationFrame(() => {
        card.style.transform =
          `rotateY(${(x - .5) * 17}deg) rotateX(${(.5 - y) * 15}deg) translateZ(14px)`;
        gloss.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        gloss.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
    };
    const rest = () => {
      cancelAnimationFrame(raf);
      card.style.transform = "";
      gloss.style.setProperty("--gx", "50%"); gloss.style.setProperty("--gy", "32%");
    };
    card.addEventListener("pointermove", e => move(e.clientX, e.clientY));
    card.addEventListener("pointerleave", rest);
    card.addEventListener("touchmove", e => {
      if (e.touches.length === 1) move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive:true });
    card.addEventListener("touchend", rest, { passive:true });
  });
}
wireTilt(document);

/* every phone that allows it gets a gentle tilt from the gyroscope too */
if (!REDUCED && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function") {
  addEventListener("deviceorientation", e => {
    const card = document.querySelector(".scene.is-active [data-tilt]");
    if (!card || card.matches(":hover")) return;
    const y = Math.max(-12, Math.min(12, (e.gamma || 0) * .55));
    const x = Math.max(-10, Math.min(10, ((e.beta || 0) - 42) * .32));
    card.style.transform = `rotateY(${y}deg) rotateX(${-x}deg) translateZ(10px)`;
    const g = card.querySelector(".gloss");
    if (g) { g.style.setProperty("--gx", (50 + y * 2.4) + "%"); g.style.setProperty("--gy", (34 - x * 2) + "%"); }
  });
}

/* ---------- paging, with a proper hand-off between scenes ---------- */
let current = 1, locked = false, queued = null, closeTimer = 0;
const env = document.getElementById("env");
const envWrap = document.getElementById("envWrap");

function goTo(n) {
  const t = Math.min(Math.max(n, 1), LAST);
  if (t === current) { queued = null; return; }
  if (locked) { queued = t; return; }      // remember it instead of dropping it
  if (current === 1 && t !== 1 && !env.classList.contains("is-open")) return;
  locked = true;
  setTimeout(() => {
    locked = false;
    if (queued !== null) { const q = queued; queued = null; goTo(q); }
  }, 420);

  if (navigator.vibrate) { try { navigator.vibrate(7); } catch (err) {} }

  const from = scenes[current - 1], to = scenes[t - 1];
  if (from) {
    from.classList.add("is-leaving");
    from.classList.remove("is-active");
    setTimeout(() => from.classList.remove("is-leaving"), 820);
    from.setAttribute("aria-hidden", "true");
  }
  to.classList.remove("is-leaving");
  // one frame of nothing, so the arrival animation always replays
  requestAnimationFrame(() => requestAnimationFrame(() => to.classList.add("is-active")));
  to.setAttribute("aria-hidden", "false");

  current = t;
  document.body.dataset.page = to.dataset.name || "open";
  rail.querySelectorAll("[data-go]").forEach(b =>
    b.setAttribute("aria-current", b.dataset.go === String(t) ? "true" : "false"));
  rail.querySelector('[data-step="-1"]').disabled = t === 1;
  rail.querySelector('[data-step="1"]').disabled = t === LAST;

  const frame = to.querySelector("[data-tilt]");
  if (frame) setTimeout(() => { if (to.classList.contains("is-active")) frame.classList.add("settled"); }, 1400);

  if (t === 1) shut();
  if (t === LAST) playClosing(); else stopClosing();
  if (t === 2 && !goTo._paced) { goTo._paced = true;
    setTimeout(() => { if (window.__checkPace) window.__checkPace(); }, 1200); }
}

/* ---------- opening the envelope ---------- */
function burst() {
  if (REDUCED) return;
  const r = env.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height * .71;
  const cv = document.getElementById("dust");
  const ctx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const sprite = moteSprite(dpr);
  const bits = Array.from({ length: 34 }, () => {
    const a = Math.random() * Math.PI * 2, sp = Math.random() * 3.4 + .7;
    return { x: cx * dpr, y: cy * dpr, vx: Math.cos(a) * sp * dpr, vy: Math.sin(a) * sp * dpr - 1.2 * dpr,
             r: (Math.random() * 1.8 + .6) * dpr, life: 1 };
  });
  (function step() {
    let alive = false;
    for (const b of bits) {
      if (b.life <= 0) continue;
      alive = true;
      b.x += b.vx; b.y += b.vy; b.vy += .055 * dpr; b.vx *= .985; b.life -= .014;
      ctx.globalAlpha = Math.max(0, b.life);
      const d = b.r * 8;
      ctx.drawImage(sprite, b.x - d / 2, b.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
    if (alive) requestAnimationFrame(step);
  })();
}

function openEnvelope() {
  if (env.classList.contains("is-open") || envWrap.classList.contains("is-open")) return;
  env.classList.remove("no-anim");
  envWrap.classList.add("is-open");
  env.setAttribute("aria-label", "Invitation opened");
  if (navigator.vibrate) { try { navigator.vibrate([12, 40, 18]); } catch (err) {} }

  // everything else on the page steps back, and the envelope moves to the middle
  const scene = env.closest(".scene");
  const r = envWrap.getBoundingClientRect();
  envWrap.style.setProperty("--lift", Math.round(innerHeight / 2 - (r.top + r.height / 2)) + "px");
  scene.classList.add("is-opening");
  document.body.classList.add("is-opening");

  // only once it is alone does it open
  setTimeout(() => { env.classList.add("is-open"); burst(); }, 620);
  // the card is fully out at +2.1s; it then stays up long enough to be read
  setTimeout(() => {
    goTo(2);
    scene.classList.remove("is-opening");
    document.body.classList.remove("is-opening");
  }, REDUCED ? 900 : 4250);
}
function shut() {
  const scene = env.closest(".scene");
  scene.classList.remove("is-opening");
  document.body.classList.remove("is-opening");
  envWrap.style.removeProperty("--lift");
  env.classList.add("no-anim");
  env.classList.remove("is-open"); envWrap.classList.remove("is-open");
  env.setAttribute("aria-label", "Open the invitation");
  void env.offsetWidth;
  requestAnimationFrame(() => env.classList.remove("no-anim"));
}
env.addEventListener("click", openEnvelope);
env.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
});

/* ---------- closing sequence ---------- */
function playClosing() {
  clearTimeout(closeTimer);
  const wrap = closeScene.querySelector(".env-wrap");
  closeScene.classList.remove("is-sealing");
  wrap.classList.add("no-move");
  void closeScene.offsetWidth;

  // where it rests, and how far that is from the middle of the screen
  const r = wrap.getBoundingClientRect();
  wrap.style.setProperty("--lift", Math.round(innerHeight / 2 - (r.top + r.height / 2)) + "px");
  closeScene.classList.add("is-sealing");          // jumps to the middle, no glide
  void wrap.offsetWidth;
  wrap.classList.remove("no-move");                // from here on it may travel

  // the gold rule is held flat by hand too, so it can only arrive with the words
  const rule = closeScene.querySelector(".draw");
  if (rule) { rule.style.transition = "none"; rule.style.transform = "scaleX(0)"; void rule.offsetWidth; }

  // the flap shuts and the wax lands, then it rises to its place and the words arrive
  closeTimer = setTimeout(() => {
    closeScene.classList.remove("is-sealing");
    if (rule) { rule.style.transition = ""; rule.style.transform = ""; }
  }, 3500);
}
function stopClosing() {
  clearTimeout(closeTimer);
  const wrap = closeScene.querySelector(".env-wrap");
  const rule = closeScene.querySelector(".draw");
  wrap.classList.add("no-move");
  closeScene.classList.remove("is-sealing");
  wrap.style.removeProperty("--lift");
  if (rule) { rule.style.transition = ""; rule.style.transform = ""; }
}

/* ---------- map sheet & lightbox ---------- */
const sheet = document.getElementById("sheet"), sheetTitle = document.getElementById("sheetTitle");
const lb = document.getElementById("lb"), lbImg = document.getElementById("lbImg");

document.addEventListener("click", e => {
  const m = e.target.closest("[data-map]");
  if (m) {
    const sc = m.closest(".scene");
    sheetTitle.textContent = sc.dataset.venue;
    sheetMaps.querySelectorAll(".mapwrap").forEach(w =>
      w.classList.toggle("is-on", w.dataset.for === sc.dataset.name));
    sheet.classList.add("is-on");
    return;
  }
  if (e.target.closest("#sheetX") || e.target === sheet) sheet.classList.remove("is-on");

  const c = e.target.closest("[data-card]");
  if (c) { lbImg.src = c.dataset.card; lb.classList.add("is-on"); return; }
  if (e.target.closest("#lbX") || e.target === lb) lb.classList.remove("is-on");
});

/* ---------- input ---------- */
rail.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.go) goTo(Number(b.dataset.go));
  if (b.dataset.step) goTo(current + Number(b.dataset.step));
});
document.addEventListener("keydown", e => {
  if (lb.classList.contains("is-on") || sheet.classList.contains("is-on")) {
    if (e.key === "Escape") { lb.classList.remove("is-on"); sheet.classList.remove("is-on"); }
    return;
  }
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});
let x0 = 0, y0 = 0, tracking = false;
document.addEventListener("touchstart", e => {
  if (e.touches.length !== 1) return;
  if (lb.classList.contains("is-on") || sheet.classList.contains("is-on")) return;
  if (e.target.closest("[data-tilt]")) return;          // the card owns its own gestures
  x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; tracking = true;
}, { passive:true });
document.addEventListener("touchend", e => {
  if (!tracking) return; tracking = false;
  const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
  if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) goTo(current + (dx < 0 ? 1 : -1));
}, { passive:true });

const restart = document.getElementById("restart");
if (restart) restart.addEventListener("click", () => { shut(); goTo(1); });

scenes.forEach((s, i) => s.setAttribute("aria-hidden", i === 0 ? "false" : "true"));
document.body.dataset.page = "open";
rail.querySelector('[data-step="-1"]').disabled = true;


/* ---------- the music plays only when someone asks for it ---------- */
(function music() {
  const snd = document.getElementById("snd");
  const btn = document.getElementById("mbtn");
  if (!snd || !btn) return;
  snd.loop = true;
  const paint = on => {
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  };
  btn.addEventListener("click", () => {
    if (snd.paused) {
      if (!snd.dataset.armed) { snd.dataset.armed = "1"; snd.load(); }
      const p = snd.play();
      if (p && p.then) p.then(() => paint(true)).catch(() => paint(false));
      else paint(true);
    } else {
      snd.pause(); paint(false);
    }
  });
  snd.addEventListener("play",  () => paint(true));
  snd.addEventListener("pause", () => paint(false));
  snd.addEventListener("ended", () => paint(false));
})();
