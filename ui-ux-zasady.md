# UI/UX Pro Max — Zasady Projektowania

Źródło: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill  
System zawiera 50+ stylów, 161 palet kolorów, 57 par czcionek, 99 wytycznych UX.

---

## Priorytety reguł (od krytycznych do niskich)

| Priorytet | Kategoria | Impact |
|-----------|-----------|--------|
| 1 | Dostępność | CRITICAL |
| 2 | Dotyk i interakcje | CRITICAL |
| 3 | Wydajność | HIGH |
| 4 | Dobór stylu | HIGH |
| 5 | Layout i responsywność | HIGH |
| 6 | Typografia i kolor | MEDIUM |
| 7 | Animacje | MEDIUM |
| 8 | Formularze i feedback | MEDIUM |
| 9 | Nawigacja | HIGH |
| 10 | Wykresy i dane | LOW |

---

## 1. Dostępność (CRITICAL)

- Kontrast min. **4.5:1** dla tekstu normalnego, 3:1 dla dużego tekstu
- Widoczne focus ringi na elementach interaktywnych (2–4px)
- Alt text dla wszystkich znaczących obrazów
- `aria-label` dla przycisków z samymi ikonami
- Kolejność tabulacji zgodna z układem wizualnym
- Każde pole formularza ma `<label>` z atrybutem `for`
- Linki "skip to main content" dla nawigacji klawiaturą
- Hierarchia nagłówków h1→h6 bez pomijania poziomów
- Informacja nie tylko przez kolor — uzupełniaj ikonami/tekstem
- Obsługa `prefers-reduced-motion` — redukuj/wyłączaj animacje

---

## 2. Dotyk i interakcje (CRITICAL)

- Min. **44×44px** (Apple) lub **48×48dp** (Material) dla elementów dotykalnych
- Odstępy między elementami dotykowymi min. **8px**
- Nigdy nie polegaj wyłącznie na `hover`; używaj `click/tap`
- Przyciski wyłączone podczas operacji async + spinner
- Komunikat błędu bezpośrednio przy polu, nie tylko na górze
- `cursor-pointer` na wszystkich klikalnych elementach webowych
- `touch-action: manipulation` — eliminuje 300ms delay
- Feedback wizualny w ciągu **100ms** od tapnięcia
- Unikaj gestów wymagających precyzji pikselowej

---

## 3. Wydajność (HIGH)

- Obrazy w formacie **WebP/AVIF** z `srcset/sizes`
- `loading="lazy"` dla obrazów poniżej foldu
- Deklaruj `width/height` lub `aspect-ratio` (zapobiega CLS)
- `font-display: swap` — unikaj FOIT
- Wirtualizacja list powyżej **50 elementów**
- Code splitting per route/feature (React Suspense / Next.js dynamic)
- Skeleton screens dla operacji > 1 sekundy
- Debounce/throttle dla scroll, resize, input
- Praca na main thread < **16ms** na klatkę (60fps)

---

## 4. Dobór stylu (HIGH)

- Dopasuj styl do typu produktu (glassmorphism, flat, clay, minimalism…)
- Jeden spójny styl na całej aplikacji — bez miksowania
- Ikony wyłącznie SVG (Heroicons, Lucide) — **nigdy emoji jako ikony**
- Cienie, blur i border-radius zgodne z wybranym stylem
- Jeden primary CTA na ekran; secondary akcje wizualnie podrzędne
- Blur tylko dla sygnalizowania tła modalu — nie jako dekoracja

---

## 5. Layout i responsywność (HIGH)

- `<meta name="viewport" content="width=device-width, initial-scale=1">` — **nigdy nie wyłączaj zoom**
- Podejście **mobile-first** — skaluj w górę do tablet/desktop
- Breakpointy: 375 / 768 / 1024 / 1440px
- Minimalny rozmiar tekstu na mobilnym: **16px** (uniknij auto-zoom iOS)
- Długość linii: 35–60 znaków mobile, 60–75 znaków desktop
- Brak poziomego scrolla na mobile
- System odstępów **4pt/8dp** (Material Design)
- Max-width kontenerów: `max-w-6xl` / `max-w-7xl`
- Z-index scale: 0 / 10 / 20 / 40 / 100 / 1000
- `min-h-dvh` zamiast `100vh` na mobile

---

## 6. Typografia i kolor (MEDIUM)

- Line-height **1.5–1.75** dla body
- Skala typograficzna: 12 / 14 / 16 / 18 / 24 / 32
- Wagi: nagłówki 600–700, body 400, etykiety 500
- Semantyczne tokeny kolorów: `primary`, `secondary`, `error`, `surface`, `on-surface`
- Dark mode: rozmyte, jaśniejsze warianty tonalne — NIE inwersja kolorów
- Kontrast: min. 4.5:1 (AA), idealnie 7:1 (AAA)
- Kolory funkcjonalne (error red, success green) zawsze z ikoną/tekstem
- Liczby w tabelach: czcionki tabelaryczne/monospaced
- Duże białe przestrzenie dla grupowania powiązanych elementów

---

## 7. Animacje (MEDIUM)

- Micro-interakcje: **150–300ms**; kompleksowe przejścia max **400ms**
- Animuj wyłącznie `transform` i `opacity` — NIE width/height/top/left
- Easing: `ease-out` dla wchodzących, `ease-in` dla wychodzących
- Spring physics zamiast linear dla naturalnego feel
- Wyjście animowane **60–70%** czasu wejścia
- Stagger list: **30–50ms** na element
- Max **1–2 animowane elementy** na widok
- Każda animacja wyraża związek przyczynowo-skutkowy — nie jest dekoracją
- Shared element transitions dla ciągłości przestrzennej
- Animacje muszą być przerywalne przez użytkownika
- UI pozostaje interaktywne podczas animacji
- Scale feedback przy tapnięciu: **0.95–1.05**
- Respektuj `prefers-reduced-motion`

---

## 8. Formularze i feedback (MEDIUM)

- Widoczny label dla każdego pola (nie tylko placeholder)
- Błędy bezpośrednio pod polem, nie tylko na górze
- Walidacja `onBlur` — nie `onKeyStroke`
- Pole hasła: toggle show/hide
- Typy semantyczne: `email`, `tel`, `number` (właściwa klawiatura mobile)
- Required fields: oznacznik wizualny (gwiazdka)
- Toast: auto-dismiss po **3–5 sekundach**
- Potwierdzenie przed destruktywną akcją
- Multi-step: wskaźnik postępu + nawigacja wstecz
- Autofill: `autocomplete` / `textContentType`
- Toasty: `aria-live="polite"`, nie kradną focusu
- Błędy muszą zawierać: przyczynę + sposób naprawy
- Min. wysokość inputa na mobile: **44px**

---

## 9. Nawigacja (HIGH)

- Bottom nav max **5 pozycji** z ikonami i etykietami
- Back navigation: przewidywalne, zachowuje scroll/stan
- Wszystkie kluczowe ekrany dostępne przez deep link/URL
- Aktualny ekran wizualnie wyróżniony w nawigacji
- Modale: wyraźne zamknięcie (X lub swipe-down)
- Nawigacja konsekwentna na wszystkich stronach
- Nie miksuj Tab + Sidebar + Bottom Nav na tym samym poziomie
- Po przejściu strony: focus przeniesiony na main content
- Destruktywne akcje (usuń konto) wizualnie i przestrzennie oddzielone

---

## 10. Wzorce stylów UI

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 16px;
```

### Neumorphism / Soft UI
```css
background: #e0e5ec;
border-radius: 16px;
box-shadow: 8px 8px 16px #b8bec7, -8px -8px 16px #ffffff;
```

### Flat / Minimalist
- Zero gradientów, zero cieni
- Czyste kolory, duże białe przestrzenie
- Typografia jako główny element designu

### Clay / 3D Soft
```css
border-radius: 24px;
box-shadow: 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);
```

---

## Checklist przed dostarczeniem UI

### Wizualna jakość
- [ ] Brak emoji jako ikon (SVG zamiast)
- [ ] Wszystkie ikony z jednej rodziny i stylu
- [ ] Stan pressed nie przesuwa layoutu
- [ ] Semantyczne tokeny kolorów (brak hardcoded hex)

### Interakcje
- [ ] Wszystkie elementy tapowalne dają feedback (ripple/opacity)
- [ ] Touch targets ≥ 44×44pt
- [ ] Micro-interakcje 150–300ms z native easing
- [ ] Stany disabled: jasne wizualnie i semantycznie

### Light/Dark Mode
- [ ] Tekst primary ≥ 4.5:1 w obu trybach
- [ ] Tekst secondary ≥ 3:1 w obu trybach
- [ ] Dividers widoczne w obu trybach
- [ ] Scrim modalny 40–60% czarny

### Layout
- [ ] Safe areas respektowane
- [ ] Scroll content nie zakryty przez fixed bary
- [ ] Sprawdzone na 375px i orientacji landscape
- [ ] Rytm odstępów 4/8dp zachowany

### Dostępność
- [ ] Wszystkie obrazy/ikony mają accessibility labels
- [ ] Pola formularzy z labelami i komunikatami błędów
- [ ] Kolor nie jest jedynym wskaźnikiem
- [ ] Reduced motion i dynamic text size obsługiwane
