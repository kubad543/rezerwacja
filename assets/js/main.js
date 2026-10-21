// ══════════════════════════════════════════
// UNOSZĄCE SIĘ SERDUSZKA
// ══════════════════════════════════════════
const heartsLayer = document.getElementById('hearts-layer');
const HEART_CHARS = ['♥', '♡', '♥', '❤'];

function spawnHeart() {
  const el = document.createElement('span');
  el.classList.add('float-heart');
  el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  el.setAttribute('aria-hidden', 'true');

  const size = (Math.random() * 14 + 9).toFixed(1);
  const dur  = (Math.random() * 9 + 9).toFixed(1);
  const del  = (Math.random() * 4).toFixed(1);
  const left = (Math.random() * 96 + 2).toFixed(1);
  const op   = (Math.random() * 0.2 + 0.06).toFixed(2);

  el.style.cssText = `left:${left}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:${del}s;color:rgba(190,24,93,${op});`;
  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), (+dur + +del + 1) * 1000);
}

const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!noMotion) {
  for (let i = 0; i < 14; i++) spawnHeart();
  setInterval(spawnHeart, 1400);
}

// Zapisz stan początkowy — bez tego pierwszy popstate nie ma skąd wrócić
history.replaceState({ step: 'greeting' }, '', location.pathname + location.search);

// ══════════════════════════════════════════
// PRZEJŚCIE TAK → KROK 1.5 → KROK 2
// ══════════════════════════════════════════
const stepGreeting = document.getElementById('step-greeting');
const stepReaction = document.getElementById('step-reaction');
const stepBooking  = document.getElementById('step-booking');
const btnTak       = document.getElementById('btn-tak');
const btnDalej     = document.getElementById('btn-dalej');

const _HP = 'M12 20.703c-.392 0-.775-.14-1.073-.406C5.23 15.128 1 11.11 1 6.5 1 3.467 3.467 1 6.5 1c1.61 0 3.147.69 4.222 1.894L12 4.283l1.278-1.389A5.597 5.597 0 0 1 17.5 1C20.533 1 23 3.467 23 6.5c0 4.61-4.23 8.628-9.927 13.797A1.605 1.605 0 0 1 12 20.703z';
const _HC = ['#f43f5e','#be185d','#fda4af','#fb7185','#e11d48','#fce7f3'];

function burstParticles(cx, cy, heartCount) {
  // serduszka
  for (let i = 0; i < heartCount; i++) {
    const angle = (i / heartCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
    const dist  = 90  + Math.random() * 220;
    const size  = 10  + Math.random() * 26;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const rot   = (Math.random() - 0.5) * 720;
    const dur   = 700 + Math.random() * 650;
    const col   = _HC[Math.floor(Math.random() * _HC.length)];
    const el    = document.createElement('div');
    el.innerHTML = `<svg width="${size}" height="${Math.round(size*.875)}" viewBox="0 0 24 21" fill="${col}"><path d="${_HP}"/></svg>`;
    el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;pointer-events:none;z-index:900;margin-left:-${size/2}px;margin-top:-${Math.round(size*.875/2)}px;`;
    document.body.appendChild(el);
    el.animate([
      { transform: 'translate(0,0) scale(0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${tx*.35}px,${ty*.35}px) scale(1.5) rotate(${rot*.25}deg)`, opacity: 1, offset: .25 },
      { transform: `translate(${tx}px,${ty}px) scale(.4) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }).onfinish = () => el.remove();
  }
  // iskry (kółka)
  for (let i = 0; i < 16; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = 35  + Math.random() * 140;
    const size  = 4   + Math.random() * 9;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const col   = _HC[Math.floor(Math.random() * _HC.length)];
    const dur   = 380 + Math.random() * 420;
    const el    = document.createElement('div');
    el.style.cssText = `position:fixed;left:${cx-size/2}px;top:${cy-size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:${col};pointer-events:none;z-index:900;`;
    document.body.appendChild(el);
    el.animate([
      { transform: 'scale(0)', opacity: 1 },
      { transform: `translate(${tx}px,${ty}px) scale(1)`, opacity: 1, offset: .4 },
      { transform: `translate(${tx*1.35}px,${ty*1.35}px) scale(0)`, opacity: 0 }
    ], { duration: dur, easing: 'ease-out', fill: 'forwards' }).onfinish = () => el.remove();
  }
}

btnTak.addEventListener('click', () => {
  if (btnTak.dataset.animating) return;
  btnTak.dataset.animating = 'true';

  const rect = btnTak.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  // 1. Przycisk: pump → znikanie
  btnTak.animate([
    { transform: 'scale(1)',    boxShadow: '0 8px 28px rgba(190,24,93,.35)' },
    { transform: 'scale(1.18)', boxShadow: '0 18px 54px rgba(190,24,93,.75)', offset: .2 },
    { transform: 'scale(.88)',  opacity: .7, offset: .55 },
    { transform: 'scale(0)',    opacity: 0 }
  ], { duration: 500, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });

  // 2. Eksplozja serc + iskier z przycisku
  burstParticles(cx, cy, 24);

  // 3. Karta powitalna: odlatuje w górę
  stepGreeting.querySelector('.greeting-card').animate([
    { transform: 'scale(1) translateY(0)',       opacity: 1 },
    { transform: 'scale(1.1) translateY(-20px)', opacity: 0, offset: .8 },
    { transform: 'scale(1.14) translateY(-28px)', opacity: 0 }
  ], { duration: 540, easing: 'ease-in', fill: 'forwards' });

  // 4. Okrągła nakładka rozrasta się z pozycji kliknięcia
  const ov = document.createElement('div');
  ov.style.cssText = `position:fixed;inset:0;z-index:800;pointer-events:none;` +
    `background:radial-gradient(circle at ${cx}px ${cy}px,#fce7f3 0%,#fda4af 15%,#f43f5e 42%,#be185d 70%,#9d174d 100%);`;
  document.body.appendChild(ov);

  const expandAnim = ov.animate([
    { clipPath: `circle(0% at ${cx}px ${cy}px)` },
    { clipPath: `circle(165% at ${cx}px ${cy}px)` }
  ], { duration: 700, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });

  expandAnim.onfinish = () => {
    // 5. Pokaż krok reakcji (nakładka zakrywa podmianę)
    stepGreeting.classList.remove('active');
    stepGreeting.setAttribute('aria-hidden', 'true');

    const reactionCard = stepReaction.querySelector('.reaction-card');
    reactionCard.style.animation = 'none';
    stepReaction.classList.add('active');
    stepReaction.removeAttribute('aria-hidden');
    history.pushState({ step: 'reaction' }, '', '#reaction');

    // 6. Nakładka znika
    ov.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 540, easing: 'ease-out', fill: 'forwards'
    }).onfinish = () => ov.remove();

    // 7. Reaction card: sprężysty wlot z dołu
    requestAnimationFrame(() => {
      reactionCard.style.animation = '';
      reactionCard.animate([
        { transform: 'scale(.6) translateY(80px)',   opacity: 0 },
        { transform: 'scale(1.05) translateY(-7px)', opacity: 1, offset: .78 },
        { transform: 'scale(1) translateY(0)',        opacity: 1 }
      ], { duration: 800, delay: 90, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
    });

    // 8. Eksplozja serc ze środka ekranu
    setTimeout(() => burstParticles(window.innerWidth / 2, window.innerHeight / 2, 16), 100);

    // 9. Ciągłe iskierki na karcie reakcji
    startReactionSparkles();

    // Focus
    const title = document.getElementById('reaction-title');
    title.setAttribute('tabindex', '-1');
    setTimeout(() => title.focus(), 950);
  };
});

// ══════════════════════════════════════════
// COFANIE — przycisk wstecz przeglądarki
// ══════════════════════════════════════════

// Reaction → Greeting
function goBackToGreeting() {
  stopReactionSparkles();

  btnTak.getAnimations().forEach(a => a.cancel());
  btnTak.style.transform = '';
  btnTak.style.opacity   = '';
  btnTak.style.boxShadow = '';
  delete btnTak.dataset.animating;

  const greetingCard = stepGreeting.querySelector('.greeting-card');
  greetingCard.getAnimations().forEach(a => a.cancel());
  greetingCard.style.transform = '';
  greetingCard.style.opacity   = '';

  const reactionCard = stepReaction.querySelector('.reaction-card');
  reactionCard.getAnimations().forEach(a => a.cancel());

  reactionCard.animate([
    { transform: 'scale(1) translateY(0)',      opacity: 1 },
    { transform: 'scale(.92) translateY(28px)', opacity: 0 }
  ], { duration: 280, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
    stepReaction.classList.remove('active');
    stepReaction.setAttribute('aria-hidden', 'true');

    reactionCard.getAnimations().forEach(a => a.cancel());
    reactionCard.style.transform = '';
    reactionCard.style.opacity   = '';
    reactionCard.style.animation = '';

    stepGreeting.classList.add('active');
    stepGreeting.removeAttribute('aria-hidden');

    greetingCard.animate([
      { transform: 'scale(.94) translateY(24px)', opacity: 0 },
      { transform: 'scale(1) translateY(0)',       opacity: 1 }
    ], { duration: 440, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });

    const title = document.getElementById('greeting-title');
    title.setAttribute('tabindex', '-1');
    setTimeout(() => title.focus(), 450);
  };
}

// Booking → Reaction
function goBackToReaction() {
  btnDalej.getAnimations().forEach(a => a.cancel());
  btnDalej.style.transform = '';
  btnDalej.style.opacity   = '';
  delete btnDalej.dataset.animating;

  const bookingCard = stepBooking.querySelector('.booking-card');
  bookingCard.getAnimations().forEach(a => a.cancel());

  bookingCard.animate([
    { transform: 'scale(1) translateY(0)',      opacity: 1 },
    { transform: 'scale(.92) translateY(28px)', opacity: 0 }
  ], { duration: 280, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
    stepBooking.classList.remove('active');
    stepBooking.setAttribute('aria-hidden', 'true');

    bookingCard.getAnimations().forEach(a => a.cancel());
    bookingCard.style.animation = '';

    const reactionCard = stepReaction.querySelector('.reaction-card');
    reactionCard.getAnimations().forEach(a => a.cancel());
    reactionCard.style.transform = '';
    reactionCard.style.opacity   = '';
    reactionCard.style.animation = '';

    stepReaction.classList.add('active');
    stepReaction.removeAttribute('aria-hidden');

    reactionCard.animate([
      { transform: 'scale(.94) translateY(24px)', opacity: 0 },
      { transform: 'scale(1) translateY(0)',       opacity: 1 }
    ], { duration: 440, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });

    startReactionSparkles();

    const title = document.getElementById('reaction-title');
    title.setAttribute('tabindex', '-1');
    setTimeout(() => title.focus(), 450);
  };
}

window.addEventListener('popstate', (e) => {
  if (e.state?.step === 'greeting') goBackToGreeting();
  else if (e.state?.step === 'reaction') goBackToReaction();
});

// ══════════════════════════════════════════
// UCIEKAJĄCY PRZYCISK NIE
// ══════════════════════════════════════════
const btnNie = document.getElementById('btn-nie');

let offsetX = 0;
let offsetY = 0;
let natCX = null, natCY = null, natHW = null, natHH = null;
let springRAF = null;
let isFleeing = false;

const NIE_LABELS = ['Nie, dziękuję', 'Ej, nie...', 'Serio, nie!', 'Na pewno?', 'Okej, nie :('];
let fleeCount = 0;
let lastFleeTime = 0;

window.addEventListener('load', () => {
  setTimeout(() => {
    const r = btnNie.getBoundingClientRect();
    natCX = r.left + r.width  / 2;
    natCY = r.top  + r.height / 2;
    natHW = r.width  / 2;
    natHH = r.height / 2;
  }, 150);
});

function clampOffset() {
  if (natCX === null) return;
  const pad = 16;
  const W = window.innerWidth;
  const H = window.innerHeight;

  const minX = -(natCX - natHW - pad);
  const maxX = W - pad - (natCX + natHW);
  const minY = -(natCY - natHH - pad);
  const maxY = H - pad - (natCY + natHH);

  offsetX = Math.max(minX, Math.min(maxX, offsetX));
  offsetY = Math.max(minY, Math.min(maxY, offsetY));
}

function applyTransform() {
  btnNie.style.transform = `translate(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px)`;
}

function startSpringBack() {
  if (springRAF) cancelAnimationFrame(springRAF);
  function tick() {
    offsetX *= 0.87;
    offsetY *= 0.87;
    applyTransform();
    if (Math.abs(offsetX) > 0.4 || Math.abs(offsetY) > 0.4) {
      springRAF = requestAnimationFrame(tick);
    } else {
      offsetX = 0; offsetY = 0;
      btnNie.style.transform = '';
      springRAF = null;
    }
  }
  springRAF = requestAnimationFrame(tick);
}

// Desktop: śledzenie kursora
document.addEventListener('mousemove', (e) => {
  if (natCX === null) return;

  const cx = natCX + offsetX;
  const cy = natCY + offsetY;

  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const THRESHOLD = 130;

  if (dist < THRESHOLD) {
    if (springRAF) { cancelAnimationFrame(springRAF); springRAF = null; }

    const now = Date.now();
    if (!isFleeing) {
      isFleeing = true;
      if (now - lastFleeTime > 600) {
        fleeCount = Math.min(fleeCount + 1, NIE_LABELS.length - 1);
        lastFleeTime = now;
        btnNie.querySelector('.nie-label').textContent = NIE_LABELS[fleeCount];
      }
    }

    const normalised = (THRESHOLD - dist) / THRESHOLD;
    const force = Math.pow(normalised, 1.4) * 140;
    const angle = Math.atan2(dy, dx);

    offsetX -= Math.cos(angle) * force * 0.45;
    offsetY -= Math.sin(angle) * force * 0.45;

    clampOffset();
    applyTransform();
    btnNie.classList.add('fleeing');
  } else {
    if (isFleeing) {
      isFleeing = false;
      btnNie.classList.remove('fleeing');
      startSpringBack();
    }
  }
});

// Mobile: na dotyk — teleportacja w losowe miejsce
btnNie.addEventListener('touchstart', (e) => {
  e.preventDefault();

  if (natCX === null) return;

  const pad = 24;
  const W = window.innerWidth;
  const H = window.innerHeight;

  const minX = -(natCX - natHW - pad);
  const maxX = W - pad - (natCX + natHW);
  const minY = -(natCY - natHH - pad);
  const maxY = H - pad - (natCY + natHH);

  const candidates = [
    [minX, minY], [maxX, minY],
    [minX, maxY], [maxX, maxY],
    [minX + (maxX - minX) * 0.5, minY],
    [minX + (maxX - minX) * 0.5, maxY],
  ];

  let best = candidates[0];
  let bestDist = 0;
  candidates.forEach(([cx, cy]) => {
    const d = Math.sqrt((cx - offsetX) ** 2 + (cy - offsetY) ** 2);
    if (d > bestDist) { bestDist = d; best = [cx, cy]; }
  });

  offsetX = best[0];
  offsetY = best[1];

  btnNie.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
  btnNie.classList.add('fleeing');
  applyTransform();

  fleeCount = Math.min(fleeCount + 1, NIE_LABELS.length - 1);
  btnNie.querySelector('.nie-label').textContent = NIE_LABELS[fleeCount];

  setTimeout(() => {
    btnNie.style.transition = '';
  }, 350);
}, { passive: false });

// Przycisk NIE nic nie robi po kliknięciu (na wypadek gdyby trafił)
btnNie.addEventListener('click', (e) => {
  e.preventDefault();
});

// ══════════════════════════════════════════
// ISKIERKI NA KARCIE REAKCJI
// ══════════════════════════════════════════
const sparklesLayer = document.getElementById('reaction-sparkles');
let sparklesInterval = null;

function spawnReactionSparkle() {
  if (!sparklesLayer) return;
  const el = document.createElement('span');
  const size = 5 + Math.random() * 9;
  const colors = ['#fda4af','#f43f5e','#be185d','#fce7f3','#fb7185','#fff'];
  const col = colors[Math.floor(Math.random() * colors.length)];
  Object.assign(el.style, {
    position: 'absolute',
    width:  size + 'px',
    height: size + 'px',
    left:   (5 + Math.random() * 90) + '%',
    top:    (5 + Math.random() * 90) + '%',
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    background: col,
    pointerEvents: 'none',
    transform: 'scale(0) rotate(0deg)'
  });
  sparklesLayer.appendChild(el);
  const rot = (Math.random() - 0.5) * 360;
  el.animate([
    { opacity: 0, transform: `scale(0) rotate(0deg)` },
    { opacity: 1, transform: `scale(1) rotate(${rot * 0.5}deg)`, offset: 0.35 },
    { opacity: 0, transform: `scale(0.3) rotate(${rot}deg)` }
  ], { duration: 800 + Math.random() * 600, easing: 'ease-out', fill: 'forwards' })
    .onfinish = () => el.remove();
}

function startReactionSparkles() {
  if (noMotion) return;
  stopReactionSparkles();
  spawnReactionSparkle();
  spawnReactionSparkle();
  sparklesInterval = setInterval(() => {
    spawnReactionSparkle();
    if (Math.random() > 0.6) spawnReactionSparkle();
  }, 280);
}

function stopReactionSparkles() {
  if (sparklesInterval) {
    clearInterval(sparklesInterval);
    sparklesInterval = null;
  }
}

// ══════════════════════════════════════════
// PRZEJŚCIE DALEJ → KROK 2
// ══════════════════════════════════════════
btnDalej.addEventListener('click', () => {
  if (btnDalej.dataset.animating) return;
  btnDalej.dataset.animating = 'true';
  stopReactionSparkles();

  const rect = btnDalej.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;

  // Przycisk: pump → znikanie
  btnDalej.animate([
    { transform: 'scale(1)',    boxShadow: '0 8px 28px rgba(190,24,93,.35)' },
    { transform: 'scale(1.16)', boxShadow: '0 18px 54px rgba(190,24,93,.75)', offset: .2 },
    { transform: 'scale(.88)',  opacity: .7, offset: .55 },
    { transform: 'scale(0)',    opacity: 0 }
  ], { duration: 440, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });

  // Mała eksplozja z przycisku
  burstParticles(cx, cy, 14);

  // Karta reakcji: odlatuje w górę
  stepReaction.querySelector('.reaction-card').animate([
    { transform: 'scale(1) translateY(0)',        opacity: 1 },
    { transform: 'scale(1.06) translateY(-22px)', opacity: 0, offset: .8 },
    { transform: 'scale(1.1) translateY(-30px)',  opacity: 0 }
  ], { duration: 480, easing: 'ease-in', fill: 'forwards' });

  setTimeout(() => {
    stepReaction.classList.remove('active');
    stepReaction.setAttribute('aria-hidden', 'true');

    const bookingCard = stepBooking.querySelector('.booking-card');
    bookingCard.style.animation = 'none';
    resetBookingForm();
    stepBooking.classList.add('active');
    stepBooking.removeAttribute('aria-hidden');
    history.pushState({ step: 'booking' }, '', '#booking');

    requestAnimationFrame(() => {
      bookingCard.style.animation = '';
      bookingCard.animate([
        { transform: 'scale(.6) translateY(80px)',   opacity: 0 },
        { transform: 'scale(1.05) translateY(-7px)', opacity: 1, offset: .78 },
        { transform: 'scale(1) translateY(0)',        opacity: 1 }
      ], { duration: 800, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
    });

    const title = document.getElementById('booking-title');
    title.setAttribute('tabindex', '-1');
    setTimeout(() => title.focus(), 850);
  }, 420);
});

// ══════════════════════════════════════════
// KALENDARZ I FORMULARZ REZERWACJI
// ══════════════════════════════════════════
const ALLOWED_MONTH = 11;
const ALLOWED_DAY   = 4;
let calYear, calMonth;
let selectedDate = null;
const FORM_STEPS = 4;
const FORM_PANES = FORM_STEPS + 1;
const TICKET_MICRO_TEXT = 'AMORE ♥ RESERVATION CONFIRMED ♥ REZERWACJA POTWIERDZONA ♥ ADMIT TWO ♥ ';
const BARCODE_BAR_UNIT = 2;

function makeReservationNumber(date) {
  const pad = n => String(n).padStart(2, '0');
  const stamp = `${pad(date.getDate())}${pad(date.getMonth() + 1)}${String(date.getFullYear()).slice(2)}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AMR-${stamp}-${suffix}`;
}

function renderBarcode(svg, code) {
  let x = 0;
  let bars = '';
  for (const ch of code) {
    const bits = ch.charCodeAt(0).toString(2).padStart(8, '0');
    for (const bit of bits) {
      const w = (bit === '1' ? 2 : 1) * BARCODE_BAR_UNIT;
      bars += `<rect x="${x}" y="0" width="${w}" height="46"/>`;
      x += w + BARCODE_BAR_UNIT;
    }
    x += BARCODE_BAR_UNIT * 2;
  }
  svg.setAttribute('viewBox', `0 0 ${x} 46`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = bars;
}

const TICKET_BASE_WIDTH = 340;
const TICKET_ZOOM_MAX = 1.6;
const COPY_FEEDBACK_MS = 2000;

function openTicketZoom() {
  const ticket = document.getElementById('ticket');
  const clone = ticket.cloneNode(true);
  clone.removeAttribute('id');
  clone.removeAttribute('role');
  clone.removeAttribute('tabindex');
  clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

  const overlay = document.createElement('div');
  overlay.className = 'ticket-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Powiększony bilet');

  const hint = document.createElement('p');
  hint.className = 'ticket-overlay-hint';
  hint.textContent = 'Zrób zrzut ekranu i wyślij partnerowi';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'ticket-overlay-close';
  close.textContent = 'Zamknij';
  overlay.append(clone, hint, close);
  document.body.appendChild(overlay);

  const room = Math.min(
    window.innerWidth * 0.92 / TICKET_BASE_WIDTH,
    (window.innerHeight - 140) / clone.offsetHeight,
    TICKET_ZOOM_MAX
  );
  clone.style.transform = `scale(${room})`;
  clone.style.marginBlock = `${(clone.offsetHeight * (room - 1)) / 2}px`;

  const closeZoom = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    ticket.focus();
  };
  const onKey = e => { if (e.key === 'Escape') closeZoom(); };
  overlay.addEventListener('click', closeZoom);
  document.addEventListener('keydown', onKey);
  close.focus();

  if (!noMotion) {
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    clone.animate([
      { transform: 'scale(0.8)', opacity: 0 },
      { transform: `scale(${room})`, opacity: 1 }
    ], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
  }
}

function copyTicketText() {
  const text = [
    '💌 Rezerwacja randki — proszę o potwierdzenie',
    `Numer: ${document.getElementById('ticket-number').textContent}`,
    `Data: ${document.getElementById('ticket-date').textContent}`,
    `Miasto: ${selectedPlace}`,
    `Strój: ${selectedOutfit}`,
    'Odpisz „TAK”, aby potwierdzić ♥'
  ].join('\n');
  const btn = document.getElementById('btn-ticket-copy');
  const label = btn.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Skopiowano ✓';
  }).catch(() => {
    btn.textContent = 'Nie udało się skopiować';
  }).finally(() => {
    setTimeout(() => { btn.textContent = label; }, COPY_FEEDBACK_MS);
  });
}

function showTicket() {
  const dateText = selectedDate.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const number = makeReservationNumber(new Date());
  document.getElementById('ticket-number').textContent = number;
  document.getElementById('ticket-date').textContent = dateText;
  document.getElementById('ticket-place').textContent = selectedPlace;
  document.getElementById('ticket-outfit').textContent = selectedOutfit;
  renderBarcode(document.getElementById('ticket-barcode'), number);
  document.querySelectorAll('[data-micro]').forEach(el => {
    el.textContent = TICKET_MICRO_TEXT.repeat(8);
  });
  goToFormPane(5, 'forward');

  if (noMotion) return;
  document.getElementById('ticket').animate([
    { opacity: 0, transform: 'translateY(-40px) rotate(-3deg)' },
    { opacity: 1, transform: 'translateY(0) rotate(0deg)' }
  ], { duration: 650, delay: 200, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
  document.querySelector('.ticket-stamp').animate([
    { opacity: 0, transform: 'rotate(-12deg) scale(2.4)' },
    { opacity: 1, transform: 'rotate(-12deg) scale(1)' }
  ], { duration: 380, delay: 900, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
}
let selectedOutfit = null;
let selectedPlace = null;
let currentFormPane = 1;

function selectCard(card) {
  card.parentElement.querySelectorAll('.outfit-card')
    .forEach(c => c.setAttribute('aria-checked', String(c === card)));
}

function renderCalendar() {
  const label  = document.getElementById('cal-month-label');
  const grid   = document.getElementById('cal-days');
  const prevBtn = document.getElementById('cal-prev');

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const firstOfMonth = new Date(calYear, calMonth, 1);
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrev   = new Date(calYear, calMonth, 0).getDate();

  // Poniedziałek = 0
  let startDow = firstOfMonth.getDay() - 1;
  if (startDow < 0) startDow = 6;

  label.textContent = firstOfMonth.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
  prevBtn.disabled  = (calYear === now.getFullYear() && calMonth === now.getMonth());

  grid.innerHTML = '';

  // Dni poprzedniego miesiąca (szary wypełniacz)
  for (let i = startDow - 1; i >= 0; i--) {
    grid.appendChild(makeDay(daysInPrev - i, ['cal-day--other-month'], true));
  }

  // Dni bieżącego miesiąca
  for (let d = 1; d <= daysInMonth; d++) {
    const date   = new Date(calYear, calMonth, d);
    const isPast = date < now;
    const isTod  = date.toDateString() === now.toDateString();
    const isSel  = selectedDate && date.toDateString() === selectedDate.toDateString();
    const isAllowed = calMonth === ALLOWED_MONTH && d === ALLOWED_DAY && (!isPast || isTod);

    const cls = [];
    if (isPast && !isTod) cls.push('cal-day--past');
    if (isTod)  cls.push('cal-day--today');
    if (isSel)  cls.push('cal-day--selected');
    if (!isAllowed) cls.push('cal-day--locked');

    const btn = makeDay(d, cls, !isAllowed);
    btn.setAttribute('aria-label', date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }));
    if (isSel) btn.setAttribute('aria-pressed', 'true');
    if (isAllowed) btn.addEventListener('click', () => onDayClick(date, btn));
    grid.appendChild(btn);
  }

  // Dopełnienie następnego miesiąca
  const total = Math.ceil((startDow + daysInMonth) / 7) * 7;
  for (let i = 1; i <= total - startDow - daysInMonth; i++) {
    grid.appendChild(makeDay(i, ['cal-day--other-month'], true));
  }
}

function makeDay(num, classes, disabled) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = num;
  btn.classList.add('cal-day', ...classes);
  if (disabled) btn.disabled = true;
  return btn;
}

function onDayClick(date, btn) {
  selectedDate = date;
  document.querySelectorAll('.cal-day--selected').forEach(el => {
    el.classList.remove('cal-day--selected');
    el.removeAttribute('aria-pressed');
  });
  btn.classList.add('cal-day--selected');
  btn.setAttribute('aria-pressed', 'true');
  document.getElementById('btn-fp1-next').disabled = false;

  if (!noMotion) {
    btn.animate([
      { transform: 'scale(1.35)' },
      { transform: 'scale(1.1)'  }
    ], { duration: 320, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' });
  }
}

function updateFormProgress(toStep) {
  for (let i = 1; i <= FORM_STEPS; i++) {
    const step = document.getElementById(`fp-${i}`);
    const num  = step.querySelector('.fp-num');
    const line = document.getElementById(`fp-line-${i}`);

    step.classList.remove('fp-active', 'fp-done');
    if (line) line.classList.remove('fp-line-done');

    if (i < toStep) {
      step.classList.add('fp-done');
      num.textContent = '✓';
      if (line) line.classList.add('fp-line-done');
      if (!noMotion && i === toStep - 1) {
        step.querySelector('.fp-dot').animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' }
        ], { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      }
    } else {
      num.textContent = i;
      if (i === toStep) step.classList.add('fp-active');
    }
  }
}

function goToFormPane(toIndex, direction) {
  const fromPane = document.getElementById(`fpane-${currentFormPane}`);
  const toPane   = document.getElementById(`fpane-${toIndex}`);
  const out = direction === 'forward' ? -32 : 32;
  const inn = direction === 'forward' ?  32 : -32;

  fromPane.animate([
    { opacity: 1, transform: 'translateX(0)' },
    { opacity: 0, transform: `translateX(${out}px)` }
  ], { duration: 220, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
    fromPane.hidden = true;
    fromPane.getAnimations().forEach(a => a.cancel());
    fromPane.style.opacity   = '';
    fromPane.style.transform = '';
  };

  toPane.hidden = false;
  toPane.animate([
    { opacity: 0, transform: `translateX(${inn}px)` },
    { opacity: 1, transform: 'translateX(0)' }
  ], { duration: 300, delay: 55, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });

  updateFormProgress(toIndex);
  currentFormPane = toIndex;
}

function resetBookingForm() {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();
  selectedDate = null;
  selectedOutfit = null;
  selectedPlace = null;
  document.querySelectorAll('.outfit-card').forEach(c => c.setAttribute('aria-checked', 'false'));
  document.getElementById('btn-fp2-next').disabled = true;
  document.getElementById('btn-fp3-next').disabled = true;

  for (let i = 1; i <= FORM_PANES; i++) {
    const pane = document.getElementById(`fpane-${i}`);
    if (!pane) continue;
    pane.getAnimations().forEach(a => a.cancel());
    pane.style.opacity   = '';
    pane.style.transform = '';
    pane.hidden = (i !== 1);
  }

  const nextBtn = document.getElementById('btn-fp1-next');
  if (nextBtn) nextBtn.disabled = true;

  currentFormPane = 1;
  updateFormProgress(1);
  renderCalendar();
}

// ── Inicjalizacja (event listenery) ──
(function initBookingForm() {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();

  document.getElementById('cal-prev').addEventListener('click', () => {
    const n = new Date();
    if (calYear === n.getFullYear() && calMonth === n.getMonth()) return;
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });

  document.getElementById('btn-fp1-next').addEventListener('click', () => {
    if (!selectedDate) return;
    goToFormPane(2, 'forward');
  });

  document.getElementById('btn-fp2-back').addEventListener('click', () => {
    goToFormPane(1, 'back');
  });

  document.querySelectorAll('#fpane-2 .outfit-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedOutfit = card.dataset.outfit;
      selectCard(card);
      document.getElementById('btn-fp2-next').disabled = false;
    });
  });

  document.getElementById('btn-fp2-next').addEventListener('click', () => {
    if (!selectedOutfit) return;
    goToFormPane(3, 'forward');
  });

  document.querySelectorAll('#fpane-3 .outfit-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedPlace = card.dataset.place;
      selectCard(card);
      document.getElementById('btn-fp3-next').disabled = false;
    });
  });

  document.getElementById('btn-fp3-back').addEventListener('click', () => {
    goToFormPane(2, 'back');
  });

  document.getElementById('btn-fp3-next').addEventListener('click', () => {
    if (!selectedPlace) return;
    document.getElementById('summary-date').textContent =
      selectedDate.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('summary-outfit').textContent = selectedOutfit;
    document.getElementById('summary-place').textContent = selectedPlace;
    goToFormPane(4, 'forward');
  });

  document.getElementById('btn-fp4-back').addEventListener('click', () => {
    goToFormPane(3, 'back');
  });

  const ticketEl = document.getElementById('ticket');
  ticketEl.addEventListener('click', openTicketZoom);
  ticketEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTicketZoom(); }
  });
  document.getElementById('btn-ticket-zoom').addEventListener('click', openTicketZoom);
  document.getElementById('btn-ticket-copy').addEventListener('click', copyTicketText);

  document.getElementById('btn-confirm').addEventListener('click', () => {
    // TODO: wysyłka przez Formspree
    showTicket();
  });
}());
