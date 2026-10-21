# UI Styling — Komponenty, Tailwind, Wzorce

Oparte na: ui-styling SKILL.md (claudekit) + ui-ux-pro-max-skill  
Stack: HTML/CSS + Tailwind (CDN) | opcjonalnie shadcn/ui dla React

---

## Palety kolorów dla stron usługowych / wellness / beauty

### Elegancki Lawendowy (Spa, Beauty)
```css
:root {
  --primary: #7c3aed;      /* indigo-600 */
  --primary-light: #ede9fe; /* violet-100 */
  --accent: #f59e0b;        /* amber-500 — ciepły akcent */
  --surface: #fafafa;
  --text: #1f2937;
  --text-muted: #6b7280;
}
```

### Nowoczesny Granat (Profesjonalny, Medical)
```css
:root {
  --primary: #1e40af;
  --primary-light: #dbeafe;
  --accent: #10b981;
  --surface: #f8fafc;
  --text: #0f172a;
  --text-muted: #64748b;
}
```

### Ciepły Beż (Wellness, Naturalne)
```css
:root {
  --primary: #92400e;
  --primary-light: #fef3c7;
  --accent: #84cc16;
  --surface: #fffbeb;
  --text: #1c1917;
  --text-muted: #78716c;
}
```

### Ciemny (Dark Mode / Premium)
```css
:root {
  --primary: #818cf8;
  --primary-light: #1e1b4b;
  --surface: #0f0f0f;
  --surface-card: #1a1a1a;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}
```

---

## Komponenty UI — gotowe wzorce CSS

### Karta Usługi

```html
<div class="service-card">
  <div class="service-icon">💆</div>
  <h3>Masaż relaksacyjny</h3>
  <p>60 min • od 150 zł</p>
  <button class="btn-primary btn-sm">Zarezerwuj</button>
</div>
```

```css
.service-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  padding: 28px;
  transition: all 0.25s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.10);
  border-color: var(--primary-light);
}

.service-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
}
```

### Input / Pole formularza

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  color: var(--text);
  background: white;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-error {
  font-size: 0.8rem;
  color: #ef4444;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

### Select / Dropdown

```css
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  cursor: pointer;
}
```

### Date Picker Wrapper

```css
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.date-cell {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
}

.date-cell:hover { background: var(--primary-light); color: var(--primary); }
.date-cell.selected { background: var(--primary); color: white; font-weight: 600; }
.date-cell.today { border: 1.5px solid var(--primary); color: var(--primary); }
.date-cell.disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
```

### Time Slot Buttons

```css
.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.time-slot {
  padding: 10px 4px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
}

.time-slot:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }
.time-slot.selected { background: var(--primary); color: white; border-color: var(--primary); }
.time-slot.unavailable { opacity: 0.35; cursor: not-allowed; text-decoration: line-through; }
```

---

## Nawigacja

### Sticky Navbar

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
```

### Progress Steps (multi-step form)

```html
<div class="steps-container">
  <div class="step active">
    <div class="step-circle">1</div>
    <span class="step-label">Usługa</span>
  </div>
  <div class="step-line"></div>
  <div class="step">
    <div class="step-circle">2</div>
    <span class="step-label">Termin</span>
  </div>
  <div class="step-line"></div>
  <div class="step">
    <div class="step-circle">3</div>
    <span class="step-label">Dane</span>
  </div>
</div>
```

```css
.steps-container {
  display: flex;
  align-items: center;
  gap: 0;
  justify-content: center;
  margin-bottom: 40px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s;
}

.step.active .step-circle, .step.completed .step-circle {
  background: var(--primary);
  color: white;
}

.step-label { font-size: 0.75rem; color: #9ca3af; }
.step.active .step-label { color: var(--primary); font-weight: 600; }

.step-line {
  flex: 1;
  height: 2px;
  background: #e5e7eb;
  margin: 0 8px;
  margin-bottom: 22px;
  transition: background 0.3s;
}
```

---

## Sekcje strony

### Sekcja "Jak to działa" (Steps)

```html
<section class="py-20 bg-gray-50">
  <div class="max-w-5xl mx-auto px-6">
    <h2 class="text-center text-3xl font-bold mb-16">Jak działa rezerwacja?</h2>
    <div class="grid md:grid-cols-3 gap-10">
      <div class="step-item text-center">
        <div class="step-number">01</div>
        <h3>Wybierz usługę</h3>
        <p>Przeglądaj nasze zabiegi i wybierz ten, który Cię interesuje.</p>
      </div>
      <!-- ... -->
    </div>
  </div>
</section>
```

```css
.step-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-light);
  line-height: 1;
  margin-bottom: 12px;
}
```

### Testimonials

```css
.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  border: 1px solid #f0f0f0;
  position: relative;
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 80px;
  color: var(--primary-light);
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

## Tailwind Utility Classes — najczęściej używane

### Layout

```
container mx-auto px-4 sm:px-6 lg:px-8
max-w-xl max-w-2xl max-w-4xl max-w-6xl max-w-7xl
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
flex items-center justify-between gap-4
flex-col sm:flex-row
min-h-screen min-h-dvh
```

### Spacing

```
p-4 p-6 p-8 p-10 p-12
px-6 py-16 py-20 py-24
gap-4 gap-6 gap-8
space-y-4 space-y-6
mb-4 mb-6 mb-8 mb-12 mb-16
```

### Typography

```
text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl
font-normal font-medium font-semibold font-bold font-black
tracking-tight tracking-tighter
leading-tight leading-snug leading-relaxed
text-gray-900 text-gray-600 text-gray-400
```

### Visual

```
rounded-lg rounded-xl rounded-2xl rounded-3xl rounded-full
shadow-sm shadow shadow-md shadow-lg shadow-xl shadow-2xl
border border-gray-100 border-gray-200
bg-white bg-gray-50 bg-gray-100
opacity-0 opacity-50 opacity-100
transition-all duration-200 duration-300 ease-out
```

### Interactive

```
cursor-pointer
hover:scale-105 hover:shadow-lg hover:-translate-y-1
active:scale-95
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
disabled:opacity-50 disabled:cursor-not-allowed
```

---

## Zmienne CSS — token system

```css
:root {
  /* Colors */
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --color-primary-light: #ede9fe;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-surface: #ffffff;
  --color-surface-subtle: #f9fafb;
  --color-error: #ef4444;
  --color-success: #10b981;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* Border radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.10);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.12);

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;
}
```

---

## Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #0f0f0f;
    --color-surface-subtle: #1a1a1a;
    --color-text: #f8fafc;
    --color-text-muted: #94a3b8;
    --color-border: rgba(255, 255, 255, 0.08);
  }
}
```

---

## Mikro-animacje CSS (bez Framer Motion — dla vanilla JS)

```css
/* Hover lift */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.5s ease forwards; }

/* Stagger dzieci */
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 100ms; }
.stagger-children > *:nth-child(3) { animation-delay: 200ms; }
.stagger-children > *:nth-child(4) { animation-delay: 300ms; }

/* Pulse dot */
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}
.pulse-dot { animation: pulse-dot 1.5s infinite; }

/* Shake (walidacja błędu) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.shake { animation: shake 0.4s ease; }

/* Spin (loader) */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 20px; height: 20px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* Success checkmark */
@keyframes checkmark {
  from { stroke-dashoffset: 100; }
  to   { stroke-dashoffset: 0; }
}
```

---

## Google Fonts — import

```html
<!-- Para 1: Inter (nowoczesna, czytelna) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Para 2: Playfair Display + DM Sans (elegancja) -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Para 3: Plus Jakarta Sans (przyjazna, nowoczesna) -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Para 4: Poppins (wellness, friendly) -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Ikony SVG — biblioteki (bez instalacji)

```html
<!-- Heroicons (inline SVG) — przykłady -->

<!-- Calendar -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>

<!-- Clock -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<!-- Check Circle -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

---

## Zasady jakości kodu CSS

1. Używaj **CSS Custom Properties** zamiast hardcoded wartości
2. Skaluj spacing wg systemu **4pt** (4, 8, 12, 16, 24, 32, 48, 64)
3. **Mobile first** — pisz style bazowe dla mobile, media queries dla większych
4. Animuj tylko `transform` i `opacity` — nigdy `width/height/margin`
5. Unikaj `!important` — rozwiązuj specificity poprawnie
6. Jeden spójny border-radius w całym projekcie (np. 12px dla kart, 8px dla inputów)
7. Kolory tylko przez zmienne — nigdy raw hex w komponentach
8. Każdy interaktywny element: `:hover`, `:focus`, `:active` i `:disabled`
