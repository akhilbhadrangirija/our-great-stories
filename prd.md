# Product Requirements Document: OurGreatStory (Awwwards Edition)

**Version:** 1.1 (High-Fidelity Update)
**Status:** Draft
**Date:** 2026-01-13

## 1. Executive Summary
**OurGreatStory** is a "Lifecycle Gifting Platform" that merges high-utility event management with **immersive, cinematic web experiences**.
By leveraging "Awwwards-tier" motion design and AI-generated artistry, we differentiate ourselves from static competitors (Evite, Paperless Post) by offering invitations that feel like **interactive digital journeys**.

## 2. Mission
**Statement:** "Turning Invitations into Cinematic Experiences."
**Core Principles:**
* **Motion is Meaning:** Animations guide the user's eye and tell a story; they are never just decoration.
* **Fluidity First:** The site must feel like a continuous stream, not a series of jerky page loads.
* **Performance Art:** High-end visuals must not compromise the "Instant Load" feel (60fps target).

## 3. Target Users
*(Unchanged from v1.0)*

## 4. MVP Scope

### ✅ In Scope (Phase 1 & 2)
**Core Experience**
* **Gateway Landing Page:** Split Screen with "Liquid" WebGL transitions or parallax hover effects.
* **Smooth Scrolling:** Global implementation of momentum scrolling (Lenis) to give the site "weight."
* **Page Transitions:** Seamless morphing between the Dashboard and the Invite Preview.

**"Moments" (Date Invites)**
* **Kinetic Typography:** Text that moves, scales, or unmasks based on scroll velocity.
* **Micro-interactions:** Magnetic buttons (buttons that pull towards the cursor) and custom cursors.

**"Weddings" (Premium)**
* **Scroll-Triggered Reveals:** Image masking animations as the user scrolls down the "Our Story" timeline.
* **Parallax Hero:** The AI-generated background moves at a different speed than the foreground text.

### ❌ Out of Scope (Phase 1)
* Full 3D Environments (Three.js/R3F world navigation) - *Reserved for v2 to ensure MVP launch speed.*
* VR/AR Viewers.

## 5. User Stories (Motion Focused)
* "As a **user**, I want the landing page to feel 'alive' with subtle background movement, so I immediately know this is a premium product."
* "As a **recipient**, I want the wedding timeline to 'paint' itself onto the screen as I scroll, creating an emotional narrative build-up."
* "As a **user**, I want page transitions to be instant and fluid (no white flashes), so the app feels native."

## 6. Core Architecture & Patterns

### High-Level Architecture
*(Unchanged, but adds a "Motion Layer")*

### The "Motion System"
* **Orchestrator:** A central `MotionProvider` context to handle page exit/enter states.
* **Scroll Sync:** All scroll-based animations must hook into the `Lenis` instance for perfect synchronization.

## 7. Tools/Features

### Immersive Motion Engine
* **Momentum Scroll (Lenis):** Replaces default browser scrolling with a smoothed, weighted physics simulation.
* **Text Reveals:** "Staggered Character" animations for headlines (letters rise up one by one).
* **Image Masks:** Images scale down or reveal from a clip-path when they enter the viewport.

### Interactive "Moments" Engines
* **The Runaway Button:** Physics-based repulsion effect.
* **Magnetic UI:** Buttons and interactables stick slightly to the mouse cursor before snapping back.

## 8. Technology Stack (Updated)

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 15.x | Core application. |
| **Styling** | Tailwind CSS | 3.x | Layout & Typography. |
| **Motion** | **Framer Motion** | Latest | Layout transitions & React state animations. |
| **Sequencing** | **GSAP** (Optional) | 3.x | Complex timelines (if Framer Motion hits limits). |
| **Scrolling** | **Lenis** | Latest | **CRITICAL:** The "Awwwards" smooth scroll feel. |
| **3D/Shaders** | **React Three Fiber** | (Drei) | *Optional:* Simple WebGL background distortions. |
| **Database** | PostgreSQL | (Neon) | Data layer. |
| **AI** | Google AI SDK | Gemini | Image generation. |

## 9. Security & Configuration
*(Unchanged)*

## 10. API Specification
*(Unchanged)*

## 11. Success Criteria
* **Performance:** Consistently hits **60 FPS** on standard devices (no jank).
* **Lighthouse:** "Best Practices" and "Accessibility" scores > 90 (Performance might hover around 75-85 due to heavy JS, which is acceptable for Awwwards-style sites if the *perceived* speed is high).
* **Vibe Check:** The "Scroll Feel" must be described as "buttery" or "heavy" by beta testers.

## 12. Implementation Phases

### Phase 1: Foundation & "The Feel" (Days 1-14)
* **Goal:** Nail the physics and motion before adding content.
* **Deliverables:**
    * ✅ Next.js + Lenis setup (Smooth Scroll).
    * ✅ Reusable `Reveal` component (for text/images).
    * ✅ "Gateway" Landing Page with Split Screen & Hover distortions.
    * ✅ 3 "Moments" Templates.

### Phase 2: The "Wedding" Engine (Days 15-25)
* **Goal:** Connect the premium visuals to real data.
* **Deliverables:**
    * ✅ "Our Story" Timeline with scroll-triggered line drawing animations.
    * ✅ AI Image Generation pipeline.
    * ✅ RSVP Form with "morphing" steps (smooth height adjustment).

### Phase 3: Polish & Launch (Days 26-30)
* **Goal:** Optimization and "Juice."
* **Deliverables:**
    * ✅ Preloader (to hide asset loading).
    * ✅ Custom Cursor implementation (desktop only).
    * ✅ Mobile performance tuning (disable heavy effects on low-power mode).

## 13. Risks & Mitigations (Updated)
* **Risk:** High motion load causes lag on older Android devices.
    * *Mitigation:* Implement a `useReducedMotion` hook. If the device is slow or user prefers reduced motion, disable Lenis and complex shaders.
* **Risk:** "Style over Substance" (Users get confused by the UI).
    * *Mitigation:* Keep navigation standard (fixed headers/menus) even if the content is experimental.