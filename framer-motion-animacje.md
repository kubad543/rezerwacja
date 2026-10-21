# Framer Motion (Motion for React) — Animacje

Biblioteka: `motion` (dawniej Framer Motion)  
Docs: https://motion.dev/docs/react-animation  
Instalacja: `npm install motion`

```javascript
import { motion, AnimatePresence } from "motion/react"
```

---

## Podstawowe API

### motion component
Każdy HTML/SVG tag ma odpowiednik `motion.*`:

```javascript
<motion.div />
<motion.button />
<motion.span />
<motion.svg />
<motion.circle />
```

### animate — zmiana stanu

```javascript
<motion.div animate={{ opacity: 1, x: 0 }} />
```

### initial — stan początkowy

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

### exit — animacja przy odmontowaniu (wymaga AnimatePresence)

```javascript
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

---

## Gesty (Gestures)

### Hover i Tap

```javascript
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
  whileTap={{ scale: 0.95 }}
/>
```

### Focus

```javascript
<motion.input whileFocus={{ scale: 1.02, borderColor: "#6366f1" }} />
```

### Drag

```javascript
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  whileDrag={{ scale: 1.1, opacity: 0.8 }}
/>
```

### Scroll — animacja przy wejściu w viewport

```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
/>
```

---

## Transitions — kontrola czasu

```javascript
<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.3,      // czas w sekundach
    ease: "easeOut",    // krzywa łagodzenia
    delay: 0.1,         // opóźnienie
  }}
/>
```

### Easing

```javascript
// Predefiniowane
ease: "linear" | "easeIn" | "easeOut" | "easeInOut"

// Spring (domyślny dla transform)
transition: { type: "spring", stiffness: 300, damping: 20 }

// Tween (domyślny dla opacity)
transition: { type: "tween", duration: 0.3 }

// Cubic bezier
ease: [0.22, 1, 0.36, 1]
```

### Zalecane wartości dla UI

| Zastosowanie | Czas | Easing |
|---|---|---|
| Micro-interakcje (hover, tap) | 150–200ms | `easeOut` |
| Wejście elementów | 250–350ms | `easeOut` |
| Wyjście elementów | 150–200ms | `easeIn` |
| Przejścia stron | 300–400ms | `[0.22, 1, 0.36, 1]` |
| Spring (bounce) | auto | `type: "spring"` |

---

## Variants — stany nazwane

```javascript
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: { scale: 1.02, y: -4 },
}

<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
/>
```

### Propagacja variants do dzieci

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,    // 100ms między dziećmi
      delayChildren: 0.2,      // opóźnienie przed pierwszym dzieckiem
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

---

## AnimatePresence — animowane odmontowanie

```javascript
import { AnimatePresence, motion } from "motion/react"

function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Treść modala
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Przejście między stronami / widokami

```javascript
<AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Keyframes — animacja przez wiele wartości

```javascript
<motion.div
  animate={{
    x: [0, 50, -50, 0],
    opacity: [1, 0.5, 0.5, 1],
  }}
  transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
/>
```

---

## Layout Animation — płynna zmiana rozmiaru/pozycji

```javascript
<motion.div layout>
  {/* Automatyczna animacja przy zmianie rozmiaru/pozycji w DOM */}
</motion.div>

// Shared element transition
<motion.img layoutId="hero-image" src={src} />
// Na innej stronie:
<motion.img layoutId="hero-image" src={src} />
```

---

## useAnimate — animacje imperatywne / sekwencje

```javascript
import { useAnimate, stagger } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()

  const handleClick = async () => {
    await animate("li", { opacity: 0 }, { duration: 0.2 })
    await animate("li", { x: 100 }, { duration: 0.3, delay: stagger(0.05) })
  }

  return (
    <ul ref={scope}>
      <li>Element 1</li>
      <li>Element 2</li>
    </ul>
  )
}
```

---

## useMotionValue i useTransform — wartości reaktywne

```javascript
import { useMotionValue, useTransform, motion } from "motion/react"

function ParallaxCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY }}
      drag
      dragElastic={0.1}
    />
  )
}
```

---

## SVG Animations

```javascript
// Rysowanie ścieżki
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1, ease: "easeInOut" }}
/>

// Ikona z animacją
<motion.circle
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200 }}
/>
```

---

## Wzorce dla Landing Page / Strona Rezerwacji

### Hero — wejście sekcji

```javascript
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

<motion.section variants={heroVariants} initial="hidden" animate="visible">
  <motion.h1 variants={heroItemVariants}>Zarezerwuj wizytę</motion.h1>
  <motion.p variants={heroItemVariants}>Opis usługi...</motion.p>
  <motion.button variants={heroItemVariants} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
    Rezerwuj teraz
  </motion.button>
</motion.section>
```

### Karty usług — staggered reveal

```javascript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

<motion.div
  className="grid grid-cols-3 gap-6"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
  {services.map((service) => (
    <motion.div
      key={service.id}
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      className="card"
    >
      {service.name}
    </motion.div>
  ))}
</motion.div>
```

### Formularz — animowane kroki

```javascript
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    {steps[currentStep]}
  </motion.div>
</AnimatePresence>
```

### Przycisk CTA

```javascript
<motion.button
  whileHover={{
    scale: 1.04,
    boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)"
  }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="btn-primary"
>
  Zarezerwuj teraz
</motion.button>
```

---

## Reduced Motion — dostępność

```javascript
import { useReducedMotion } from "motion/react"

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{
        opacity: 1,
        y: prefersReducedMotion ? 0 : [20, 0],  // brak ruchu jeśli preferowane
      }}
    />
  )
}
```

---

## Zasady animacji dla profesjonalnych stron

1. **Tylko `transform` i `opacity`** — animowanie width/height powoduje reflow i janky animacje
2. **Spring domyślnie** dla elementów interaktywnych (hover, tap) — bardziej naturalne
3. **Stagger 80–120ms** między kartami/listami — czytelne, nie przesadzone
4. **`once: true`** w `viewport` — element animuje się tylko raz przy wejściu
5. **Wejście slow, wyjście fast** — exit 60–70% czasu wejścia
6. **Nie animuj > 2 elementów** jednocześnie w tym samym widoku
7. **`layoutId`** dla shared element transitions między stronami/sekcjami
8. **`AnimatePresence`** zawsze tam, gdzie element może znikać z DOM
