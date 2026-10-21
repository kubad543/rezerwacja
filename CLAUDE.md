# CLAUDE.md — Strona rezerwacji randki (Amore)

## Cel projektu

Romantyczna strona rezerwacji wizyt wysyłana jako ZIP do odbiorcy — otwiera `index.html` w przeglądarce i ma gotową aplikację. Zero serwera, zero kosztów. Wysyłka formularza przez Formspree.

**Aktualny etap:** szablon z kartą powitalną (krok 1) i placeholderem rezerwacji (krok 2). Formularz jeszcze nie zaimplementowany.

---

## Architektura

```
rezerwacja/
├── index.html              ← tylko HTML, punkt wejścia dla użytkownika
├── assets/
│   ├── css/style.css       ← cały CSS (tokeny, komponenty, animacje, RWD)
│   └── js/main.js          ← cały JS (hamburger, serduszka, wow transition, btn-nie, history API)
└── (pliki .md — dokumentacja)
```

- **Bez frameworka, bez bundlera** — czyste HTML/CSS/Vanilla JS
- **Animacje:** Web Animations API (WAAPI) zamiast bibliotek
- **Fonty:** Playfair Display (nagłówki) + DM Sans (body) z Google Fonts
- **Formularze (TODO):** Formspree do wysyłki na email
- **Użytkownik końcowy:** pobiera cały folder, klika `index.html` — działa bez serwera

Nie dodawaj npm, nie dodawaj frameworków. Ścieżki do assets muszą być relatywne (`assets/css/...`) żeby działały z `file://`.

---

## Aktualny design system (tokeny z `assets/css/style.css`)

```css
--primary:       #be185d   /* różana czerwień */
--primary-hover: #9d174d
--primary-light: #fce7f3
--accent:        #f43f5e
--accent-soft:   #fda4af
--text:          #1c1917
--text-muted:    #78716c
--border:        #e7e5e4
--surface:       #fffbf7
--font-heading:  'Playfair Display'
--font-body:     'DM Sans'
```

Styl: **glassmorphism** + gradient-mesh tło z blobami. Karty: `backdrop-filter: blur`, `border-radius: 28px`, subtelny różany cień.

---

## Pliki z inspiracją i zasadami — czytaj przed implementacją

| Plik | Co zawiera | Kiedy sięgać |
|------|-----------|--------------|
| `ui-ux-zasady.md` | 10 kategorii zasad UX: dostępność, dotyk, wydajność, animacje, formularze | Przed każdą nową funkcją — sprawdź checklistę na końcu |
| `framer-motion-animacje.md` | Wzorce animacji z timing/easing, stagger, spring physics, AnimatePresence | Przy projektowaniu animacji — adaptuj wzorce na WAAPI |
| `hero-wzorce.md` | 3 typy hero, efekty tła (blobs, gradient mesh, grid), typografia, floating cards, social proof | Przy rozbudowie sekcji hero / nowych sekcji lądowania |
| `ui-styling-komponenty.md` | Palety kolorów (beauty/wellness), karty usług, inputy, time sloty, progress steps, testimonials | Przy budowie formularza rezerwacji i nowych sekcji |
| `plan-strona-rezerwacji.md` | Cel projektu, przepływ właściciel→odbiorca | Przy wątpliwościach o zakresie |

---

## Konwencje kodowania

- CSS w `assets/css/style.css`, sekcje oddzielone komentarzem `/* ══ NAZWA ══ */`
- JS w `assets/js/main.js`, sekcje oddzielone `// ══ NAZWA ══`
- `index.html` zawiera tylko HTML — zero inline `<style>` i `<script>`
- Zmienne CSS dla wszystkich kolorów — żadnych hardcoded hex poza `:root`
- Animacje: tylko `transform` i `opacity` (nigdy width/height/margin)
- Dostępność: `aria-label` na ikonach, `aria-hidden` na dekoracji, `prefers-reduced-motion` obsłużone
- Touch targets: min `44×44px`, `touch-action: manipulation` na przyciskach
- Kontrast: min 4.5:1 dla tekstu

---

## Przepływ UX (zaimplementowany)

```
Krok 1 — Powitanie (step-greeting)
  └─ [TAK] → wow transition (eksplozja serc + okrągła nakładka) → Krok 2
  └─ [NIE] → uciekający przycisk (desktop: cursor tracking, mobile: teleportacja)

Krok 2 — Rezerwacja (step-booking)
  └─ placeholder — 3 kroki "Wkrótce"
  └─ [Wstecz w przeglądarce] → goBackToGreeting() — booking card odpada w dół,
     greeting card wskakuje z dołu, przycisk TAK w pełni przywrócony
  └─ TODO: formularz z Formspree
```

**History API:** `history.replaceState` na starcie, `history.pushState({ step:'booking' })` po zamianie kart,
`popstate` wywołuje `goBackToGreeting()`. Po cofnięciu można znowu kliknąć TAK — animacja wow odpali od nowa.
Kluczowe: po `cancel()` na WAAPI trzeba jawnie czyścić inline style (`style.transform`, `style.opacity`) bo `fill:forwards` może przeżyć `cancel()` w niektórych przeglądarkach.

---

## TODO (kolejne kroki)

1. **Formularz rezerwacji** — wybór rodzaju randki (select/karty), calendar date picker, time slots, pola kontaktowe (imię, email/tel), submit przez Formspree
2. **Sekcja "Jak to działa"** — 3 kroki z ikonami SVG (patrz `ui-styling-komponenty.md` → "Sekcja Jak to działa")
3. **Social proof** — avatary + gwiazdki + liczba rezerwacji (patrz `hero-wzorce.md` → "Social Proof")
4. **Potwierdzenie sukcesu** — krok 3 po wysyłce formularza z animowanym checkmarkiem

---

## Wzorce „magicznych" animacji — stosuj zawsze

Projekt ma wyglądać jak nowoczesny, premium produkt. Każdy nowy komponent powinien mieć co najmniej jeden z poniższych efektów. Implementacja: CSS + WAAPI (bez bibliotek).

### 1. Shimmer / Shiny — połysk przesuwający się po elemencie
```css
/* nakładka na karcie lub przycisku */
.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
  background-size: 200% 100%;
  animation: shimmer 2.4s infinite;
}
@keyframes shimmer { from { background-position: 200% center } to { background-position: -200% center } }
```

### 2. Border Beam — świetlna wiązka biegnąca po obramowaniu karty
```css
.card { position: relative; overflow: hidden; }
.card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(from var(--angle, 0deg), transparent 70%, var(--primary) 85%, transparent 100%);
  animation: border-spin 3s linear infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 2px;
}
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes border-spin { to { --angle: 360deg; } }
```

### 3. Sparkles — iskierki/błyski wokół ważnych elementów
```js
function spawnSparkle(parent) {
  const el = document.createElement('span');
  el.className = 'sparkle';
  const size = 6 + Math.random() * 10;
  Object.assign(el.style, {
    width: size + 'px', height: size + 'px',
    left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
    position: 'absolute', borderRadius: '50%',
    background: 'radial-gradient(circle, #fff 0%, var(--accent) 60%, transparent 100%)',
    pointerEvents: 'none'
  });
  parent.appendChild(el);
  el.animate([{ opacity: 0, transform: 'scale(0) rotate(0deg)' },
              { opacity: 1, transform: `scale(1) rotate(${Math.random()*180}deg)` },
              { opacity: 0, transform: 'scale(0.5) rotate(360deg)' }],
    { duration: 700 + Math.random()*400, easing: 'ease-out', fill: 'forwards' })
    .onfinish = () => el.remove();
}
```

### 4. Blur Fade — rozmycie + zanikanie przy wejściu w widok (IntersectionObserver)
```js
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.animate(
      [{ opacity: 0, filter: 'blur(12px)', transform: 'translateY(16px)' },
       { opacity: 1, filter: 'blur(0)',    transform: 'translateY(0)' }],
      { duration: 500, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
    );
    obs.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
```

### 5. Animated Gradient Text — tekst z animowanym gradientem
```css
.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--accent), var(--primary));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s linear infinite;
}
@keyframes gradient-flow { to { background-position: 200% center; } }
```

### 6. Stagger — wejście listy elementów jeden po drugim
```js
document.querySelectorAll('.stagger-item').forEach((el, i) => {
  el.animate(
    [{ opacity: 0, transform: 'translateY(20px)' },
     { opacity: 1, transform: 'translateY(0)' }],
    { duration: 400, delay: i * 80, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
  );
});
```

### Zasady stosowania efektów
- Każdy przycisk CTA → shimmer lub shiny
- Każda nowa sekcja wchodząca do widoku → blur-fade (IntersectionObserver)
- Nagłówki / kluczowe frazy → gradient-text
- Hover na kartach usług / time slotach → delikatny border-beam lub glow (`box-shadow` transition)
- Nie nakładaj więcej niż 2 efektów na jeden element jednocześnie
- Zawsze obsłuż `prefers-reduced-motion`: `@media (prefers-reduced-motion: reduce) { animation: none !important; }`

---

## Obrazy i zasoby

- Pliki statyczne → folder `assets/images/` lub `assets/gifs/`
- Format: WebP (zdjęcia), WebP animowany lub MP4 autoplay (zamiast GIF)
- Zawsze `width` + `height` na `<img>` (zapobiega CLS)
- `loading="lazy"` dla elementów poniżej foldu
