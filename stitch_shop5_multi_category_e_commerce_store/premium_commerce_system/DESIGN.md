---
name: Premium Commerce System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#464555'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system focuses on a **Modern Corporate** aesthetic tailored for high-end lifestyle retail. It balances the utility required for a multi-category store (perfumes, watches, apparel) with a premium editorial feel. The target audience values efficiency, quality, and a sophisticated shopping experience. 

The visual language utilizes significant whitespace to allow high-quality product photography to breathe. It avoids unnecessary decorative elements, relying instead on precise alignment, generous scale, and a disciplined color application to evoke a sense of trust and luxury.

## Colors
This design system employs a high-contrast palette to drive conversion and reinforce brand authority.
- **Primary (Deep Indigo):** Reserved for primary actions, progress indicators, and active states. It provides a modern, tech-forward energy to the luxury context.
- **Secondary (Charcoal Gray):** Used for typography, iconography, and grounding elements. This ensures high legibility and a "premium" weighted feel.
- **Neutral (Off-White/Gray):** Used for background surfaces and subtle containment to reduce eye strain and separate content modules.
- **Success/Warning:** Standard semantic colors are muted to maintain the sophisticated tone, used only when functional feedback is required.

## Typography
The system uses **Inter** exclusively to maintain a clean, systematic appearance across all platforms. 
- **Headlines:** Use tighter letter-spacing and bold weights to create a strong visual anchor for product names and section titles.
- **Body Text:** Set with generous line height (1.6) to ensure descriptions remain readable and airy.
- **Labels:** Small caps or medium weights are used for metadata, categories, and utility links to distinguish them from narrative body text.

## Layout & Spacing
The design system utilizes a **Fixed Grid** for desktop and a **Fluid Grid** for mobile devices.
- **Desktop:** A 12-column grid with a maximum width of 1280px. Gutters are fixed at 24px to ensure consistency in product galleries.
- **Mobile:** A 4-column fluid grid with 16px side margins. 
- **Vertical Rhythm:** Spacing follows a 4px baseline, with most components utilizing `md` (24px) for internal padding and `lg` (48px) for section breathing room.
- **Reflow:** On mobile, product grids transition from 3 or 4 columns to a 2-column "card" layout to maintain image detail.

## Elevation & Depth
Depth is created through **Tonal Layers** supplemented by **Ambient Shadows**. 
- **Level 0 (Background):** Pure white (#FFFFFF) or Neutral-50 (#F9FAFB).
- **Level 1 (Cards/Surface):** White surface with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)).
- **Level 2 (Modals/Popovers):** Elevated with a more pronounced shadow (0px 10px 30px rgba(0,0,0,0.1)) to draw focus.
- **Interactive States:** Buttons and cards should subtly lift (increased shadow spread) or deepen in color on hover to provide tactile feedback.

## Shapes
A **Rounded** shape language is applied to soften the "Corporate" feel and make the e-commerce experience more approachable and modern. 
- **Buttons & Inputs:** Use a 0.5rem (8px) radius as the base.
- **Product Cards:** Use a 1rem (16px) radius for the outer container to create a distinct, high-end "object" feel. 
- **Chips/Badges:** Use a full pill shape (100px) to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary CTA buttons use the Deep Indigo background with white text. High-emphasis buttons should be 48px or 56px in height for easy tapping on mobile. Secondary buttons use a Charcoal outline.
- **Input Fields:** Use a light gray border (#E5E7EB) that shifts to Deep Indigo on focus. Labels sit above the field in `label-sm` style.
- **Product Cards:** Images should have a 1:1 or 4:5 aspect ratio. The title uses `headline-sm` and price uses `headline-sm` with a medium weight. 
- **Chips:** Used for sizes (S, M, L) or color swatches. Selected states use a 2px Charcoal border.
- **Navigation:** A clean top-bar on desktop with a centered logo and right-aligned icons (Search, Bag, Profile). Mobile utilizes a "Sticky Bottom Bar" for the primary shopping actions or a clean "Hamburger" for category browsing.
- **Cart Drawer:** A slide-in right panel (Desktop) or full-screen overlay (Mobile) to maintain the user's context in the shop while managing items.