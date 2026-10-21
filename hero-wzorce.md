# Hero Section — Wzorce i Najlepsze Praktyki

Oparte na 21st.dev/community/components/hero (284 komponenty) i zasadach UI/UX Pro Max.

---

## Anatomia profesjonalnego Hero

Każdy skuteczny hero ma te elementy (w kolejności):

1. **Badge / Tagline** — mały chip nad tytułem ("Nowość", "Beta", "Trusted by 10k+")
2. **Headline H1** — max 8 słów, propozycja wartości
3. **Subheadline / Description** — 1–2 zdania, konkret
4. **CTA primary + secondary** — jeden główny przycisk, jeden poboczny
5. **Social proof** — avatary klientów, gwiazdki, liczba użytkowników
6. **Visual** — ilustracja, screenshot produktu, wideo, gradient

---

## Typy Hero (wzorce z 21st.dev)

### 1. Centered Hero (Klasyczny)
Wszystko wyśrodkowane, tło z gradientem lub meshem.

```html
<section class="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
  <!-- Tło gradient mesh -->
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
  <!-- Blob decorations -->
  <div class="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-6">
    <!-- Badge -->
    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
      ✦ Rezerwacje online 24/7
    </span>
    
    <!-- Headline -->
    <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
      Zarezerwuj wizytę<br>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        w kilka sekund
      </span>
    </h1>
    
    <!-- Subheadline -->
    <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
      Wybierz usługę, datę i godzinę. Potwierdzenie przyjdzie od razu na maila.
    </p>
    
    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="btn-primary px-8 py-4 text-lg">Zarezerwuj teraz →</button>
      <button class="btn-ghost px-8 py-4 text-lg">Zobacz usługi</button>
    </div>
    
    <!-- Social proof -->
    <div class="flex items-center justify-center gap-3 mt-10">
      <div class="flex -space-x-2">
        <img class="w-8 h-8 rounded-full border-2 border-white" src="avatar1.jpg" alt="">
        <img class="w-8 h-8 rounded-full border-2 border-white" src="avatar2.jpg" alt="">
        <img class="w-8 h-8 rounded-full border-2 border-white" src="avatar3.jpg" alt="">
      </div>
      <div class="flex text-yellow-400 text-sm">★★★★★</div>
      <span class="text-gray-500 text-sm">Zaufało nam 500+ klientów</span>
    </div>
  </div>
</section>
```

### 2. Split Hero (Lewa kolumna tekst / Prawa wizualna)

```html
<section class="min-h-screen grid lg:grid-cols-2 items-center px-6 max-w-7xl mx-auto">
  <!-- Lewa: Treść -->
  <div class="py-20 pr-0 lg:pr-16">
    <span class="badge">Otwarte dziś 9:00–18:00</span>
    <h1 class="text-5xl font-bold mt-4 mb-6 leading-tight">
      Profesjonalne zabiegi<br>w Twoim mieście
    </h1>
    <p class="text-gray-500 text-lg mb-8">...</p>
    <div class="flex gap-4">
      <button class="btn-primary">Umów wizytę</button>
      <button class="btn-outline">Zadzwoń teraz</button>
    </div>
  </div>
  
  <!-- Prawa: Obraz / Karta -->
  <div class="relative hidden lg:block">
    <div class="rounded-3xl overflow-hidden shadow-2xl">
      <img src="salon.jpg" alt="Salon" class="w-full h-[600px] object-cover">
    </div>
    <!-- Floating card -->
    <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✓</div>
        <div>
          <p class="font-semibold text-sm">Wizyta potwierdzona!</p>
          <p class="text-xs text-gray-500">Dziś, 14:30</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 3. Minimal Hero (Tylko typografia)

```html
<section class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
  <h1 class="text-7xl md:text-9xl font-black tracking-tighter text-gray-900 mb-4">
    REZERWUJ
  </h1>
  <h2 class="text-3xl text-gray-400 font-light mb-12">Prosto. Szybko. Online.</h2>
  <button class="btn-primary text-xl px-12 py-5 rounded-full">
    Zacznij teraz
  </button>
</section>
```

---

## Efekty tła dla Hero

### Gradient Mesh (popularny w 2024–2025)

```css
.hero-bg {
  background-color: #ffffff;
  background-image:
    radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(167, 139, 250, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(245, 158, 11, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%);
}
```

### Animated Blob (CSS)

```css
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
```

```html
<div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
<div class="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
<div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
```

### Dark Hero z Noise Texture

```css
.hero-dark {
  background-color: #0a0a0a;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  background-size: 200px 200px;
}
```

### Grid / Dot Pattern

```css
.hero-grid {
  background-color: #ffffff;
  background-image:
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.hero-dots {
  background-color: #ffffff;
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## Typografia Hero — zasady

### Headline styles

```css
/* Ultra bold, tight tracking */
.hero-title {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Outline text */
.outline-text {
  -webkit-text-stroke: 2px currentColor;
  color: transparent;
}
```

### Zasady doboru czcionek

| Styl | Heading | Body |
|---|---|---|
| Modern/SaaS | Inter, Plus Jakarta Sans | Inter |
| Elegancki/Luxury | Playfair Display, Cormorant | DM Sans |
| Przyjazny/Wellness | Nunito, Poppins | Nunito |
| Bold/Impact | Space Grotesk, Syne | Inter |
| Minimalist | DM Mono, JetBrains Mono | DM Sans |

---

## CTA Button Styles

### Primary — Gradient

```css
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.45);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}
```

### Primary — Solid Black (Minimalist)

```css
.btn-black {
  background: #0a0a0a;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-black:hover { background: #1a1a1a; }
```

### Ghost / Outline

```css
.btn-ghost {
  background: transparent;
  color: #374151;
  padding: 14px 32px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-ghost:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}
```

---

## Social Proof dla Hero

### Avatary z oceną

```html
<div class="flex items-center gap-4 mt-8">
  <!-- Avatary -->
  <div class="flex -space-x-3">
    <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="client1.jpg" alt="Klientka Anna">
    <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="client2.jpg" alt="Klientka Maria">
    <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="client3.jpg" alt="Klientka Zofia">
    <div class="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
      +47
    </div>
  </div>
  
  <!-- Gwiazdki i text -->
  <div>
    <div class="flex text-yellow-400">★★★★★</div>
    <p class="text-sm text-gray-500">50+ zadowolonych klientek</p>
  </div>
</div>
```

### Badge z ikoną

```html
<div class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
  Dostępne wolne terminy w tym tygodniu
</div>
```

---

## Floating Cards / Wskaźniki

Elementy unoszące się nad głównym hero image — dodają głębi.

```html
<!-- Potwierdzona wizyta -->
<div class="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 min-w-[200px]">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
      ✓
    </div>
    <div>
      <p class="font-semibold text-sm text-gray-900">Wizyta potwierdzona</p>
      <p class="text-xs text-gray-400">Poniedziałek, 14:30</p>
    </div>
  </div>
</div>

<!-- Ocena -->
<div class="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100">
  <div class="flex text-yellow-400 mb-1">★★★★★</div>
  <p class="text-xs font-semibold text-gray-900">Bardzo profesjonalnie!</p>
  <p class="text-xs text-gray-400">— Anna K.</p>
</div>
```

---

## Responsywność Hero

```css
/* Mobile first */
.hero {
  min-height: 100dvh;       /* Dynamic viewport height na mobile */
  padding: 80px 24px 40px; /* padding top dla fixed navbar */
}

/* Tablet */
@media (min-width: 768px) {
  .hero { padding: 120px 40px 60px; }
  .hero-title { font-size: 3.5rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero { padding: 160px 80px 80px; }
  .hero-title { font-size: 5rem; }
}
```

---

## Checklist dla Hero

- [ ] H1 widoczny od razu bez scrollowania
- [ ] Jeden primary CTA — wyraźny, kontrastowy
- [ ] Tekst hero czytelny na tle (kontrast ≥ 4.5:1)
- [ ] Social proof widoczny w fold
- [ ] Responsywny na 375px (małe mobile)
- [ ] `min-h-dvh` zamiast `100vh`
- [ ] Alt text dla wszystkich zdjęć
- [ ] Animacja wejścia: stagger 150ms między elementami
- [ ] Animacja nie blokuje interakcji
- [ ] Przycisk CTA: feedback hover + active
