# currency-converter

A single-page currency converter web app with live exchange rates and local weather information.

## Features

- Real-time currency conversion using exchangerate.host
- Dropdown input selection for source and target currencies
- Live conversion result with exchange rate details
- Light/dark theme toggle with localStorage persistence
- Local weather display using Open-Meteo and geolocation
- Responsive layout for mobile, tablet, and desktop

## Usage

1. Open `index.html` in your browser.
2. Enter the amount you want to convert.
3. Select the source currency and the target currency.
4. Click **Convert** to see the live result.
5. Allow location access to display your current weather.

## Project files

- `index.html` — markup and application structure
- `styles.css` — project styles and responsive theme support
- `script.js` — API fetch functions, conversion logic, weather display, and theme toggle

## APIs used

- Exchange rates: [https://api.exchangerate.host](https://api.exchangerate.host)
- Weather data: [https://api.open-meteo.com](https://api.open-meteo.com)
- Reverse geocoding: [https://geocode.maps.co](https://geocode.maps.co)

## Deployment

Deploy this as a static website on GitHub Pages or any static hosting provider. Ensure `index.html`, `styles.css`, and `script.js` remain in the same folder.

## Notes

- If the browser blocks geolocation or access is denied, weather defaults to London.
- Conversion results are fetched live on demand, so they reflect current rates.

---

## Wireframes

Responsive layout across all screen sizes based on Bootstrap 5 grid system.

### Mobile Layout (< 576px)

```
┌─────────────────────────────────┐
│  ☰ LOGO                         │ <- Fixed Navbar
├─────────────────────────────────┤
│                                 │
│        HEADER SECTION           │
│                                 │
│  ┌─────────────────────────┐   │
│  │  FORM INPUTS            │   │
│  │  - Email Input          │   │
│  │  - Password Input       │   │
│  │  - Address Inputs       │   │
│  │  - City / State / Zip   │   │
│  │  - Checkbox             │   │
│  │  - Sign In Button       │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│                                 │
│   LIVE CHARTS SECTION           │
│                                 │
│  ┌─────────────────────────┐   │
│  │    Sales Overview       │   │
│  │   [Dropdown: Mar 2023]  │   │
│  │                         │   │
│  │    [Chart Renders]      │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│                                 │
│      ABOUT US SECTION           │
│                                 │
│  ┌─────────────────────────┐   │
│  │   About Image           │   │
│  │   (Full Width)          │   │
│  └─────────────────────────┘   │
│                                 │
│  Who Are We? (Heading)          │
│  ─────────────────────────      │
│  About description paragraph    │
│  Longer descriptive text...     │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚙ Versatile Brand       │   │
│  │                         │   │
│  │ Description text...     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔥 Digital Agency       │   │
│  │                         │   │
│  │ Description text...     │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│                                 │
│  COUNTRY WISE CURRENCY          │
│  (Heading)                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│      FOOTER SECTION             │
│                                 │
│  ┌─────────────────────────┐   │
│  │   LOGO                  │   │
│  ├─────────────────────────┤   │
│  │  About  FAQ  Sitemap    │   │
│  ├─────────────────────────┤   │
│  │  © 2026 Currency Conv.  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  📱 f 𝕏 Social Links   │   │
│  │                         │   │
│  │ Instagram Facebook X    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Tablet Layout (576px - 992px)

```
┌────────────────────────────────────────────────┐
│  ☰ LOGO                                        │ <- Fixed Navbar
├────────────────────────────────────────────────┤
│                                                │
│             HEADER SECTION                     │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │           FORM INPUTS                    │ │
│  │  ┌──────────┐  ┌──────────┐              │ │
│  │  │  Email   │  │ Password │              │ │
│  │  └──────────┘  └──────────┘              │ │
│  │  ┌──────────────────────────────────┐   │ │
│  │  │         Address                  │   │ │
│  │  └──────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────┐   │ │
│  │  │      Address 2                   │   │ │
│  │  └──────────────────────────────────┘   │ │
│  │  ┌─────────┐ ┌──────┐  ┌────┐           │ │
│  │  │  City   │ │State │  │Zip │           │ │
│  │  └─────────┘ └──────┘  └────┘           │ │
│  │  [✓] Check me out      [Sign in Btn]    │ │
│  └──────────────────────────────────────────┘ │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│          LIVE CHARTS SECTION                   │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │         Sales Overview                   │ │
│  │  [Dropdown: Mar 2023]                    │ │
│  │                                          │ │
│  │          [Chart Renders Here]            │ │
│  │                                          │ │
│  └──────────────────────────────────────────┘ │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│           ABOUT US SECTION                     │
│                                                │
│  ┌──────────────────┐  ┌───────────────────┐ │
│  │  About Image     │  │ Who Are We?       │ │
│  │  (Left Column)   │  │ ───────────────   │ │
│  │                  │  │ Description...    │ │
│  │                  │  │                   │ │
│  │                  │  │ ⚙ Versatile Brand │ │
│  │                  │  │ 🔥 Digital Agency │ │
│  │                  │  │                   │ │
│  │                  │  │                   │ │
│  └──────────────────┘  └───────────────────┘ │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│     COUNTRY WISE CURRENCY SECTION              │
│     (Heading)                                  │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│            FOOTER SECTION                      │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │  LOGO          |    About FAQ Sitemap    │ │
│  │                |    © 2026 Currency Conv │ │
│  │                |                         │ │
│  │                |    📱 f 𝕏 Social Links  │ │
│  └──────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

### Desktop Layout (992px - 1200px)

```
┌──────────────────────────────────────────────────────────┐
│  LOGO  Home  About  Language Change  Weather  Mode      │ <- Fixed Navbar
├──────────────────────────────────────────────────────────┤
│                                                          │
│                   HEADER SECTION                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │                   FORM INPUTS                      │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │ │
│  │  │  Email   │ │ Password │ │ Address          │  │ │
│  │  └──────────┘ └──────────┘ └──────────────────┘  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │         Address 2                          │  │ │
│  │  └────────────────────────────────────────────┘  │ │
│  │  ┌─────────┐ ┌──────────┐ ┌────┐               │ │
│  │  │  City   │ │  State   │ │Zip │               │ │
│  │  └─────────┘ └──────────┘ └────┘               │ │
│  │  [✓] Check    [Sign in Button]                 │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│             LIVE CHARTS SECTION                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │      Sales Overview     [Dropdown: Mar 2023] │   │
│  │                                              │   │
│  │           [Chart Renders Here]               │   │
│  │                                              │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│              ABOUT US SECTION                        │
│                                                      │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │ Who Are We?              │ │
│  │  About Image     │  │ ─────────────────        │ │
│  │                  │  │ Description paragraph... │ │
│  │  (50% width)     │  │                          │ │
│  │                  │  │ Longer text content...   │ │
│  │                  │  │                          │ │
│  │                  │  │ ┌─────────────────────┐  │ │
│  │                  │  │ │ ⚙ Versatile Brand   │  │ │
│  │                  │  │ │                     │  │ │
│  │                  │  │ │ Description text... │  │ │
│  │                  │  │ └─────────────────────┘  │ │
│  │                  │  │                          │ │
│  │                  │  │ ┌─────────────────────┐  │ │
│  │                  │  │ │ 🔥 Digital Agency   │  │ │
│  │                  │  │ │                     │  │ │
│  │                  │  │ │ Description text... │  │ │
│  │                  │  │ └─────────────────────┘  │ │
│  │                  │  │                          │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│          COUNTRY WISE CURRENCY SECTION               │
│          (Heading)                                   │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│               FOOTER SECTION                         │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  LOGO                              About       │ │
│  │                                    FAQ         │ │
│  │                                    Sitemap     │ │
│  │                                    © 2026      │ │
│  │                                    Currency    │ │
│  │                 📱 f 𝕏                Conv.     │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Large Desktop Layout (1200px+)

```
┌────────────────────────────────────────────────────────────────┐
│  LOGO  Home  About  Language Change  Weather  Mode (RightAlign)│ <- Fixed Navbar
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                    HEADER SECTION                              │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                      FORM INPUTS                         │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────────────┐ │ │
│  │  │  Email   │ │ Password │ │        Address           │ │ │
│  │  └──────────┘ └──────────┘ └──────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │              Address 2                               │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────┐ ┌──────────┐ ┌────┐                        │ │
│  │  │  City   │ │  State   │ │Zip │   [Sign in Button]    │ │
│  │  └─────────┘ └──────────┘ └────┘                        │ │
│  │  [✓] Check me out                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                LIVE CHARTS SECTION                             │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │     Sales Overview          [Dropdown: Mar 2023]         │ │
│  │                                                          │ │
│  │              [Chart Renders Here Full Width]             │ │
│  │                                                          │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                 ABOUT US SECTION                               │
│                                                                │
│  ┌────────────────────┐  ┌──────────────────────────────────┐ │
│  │                    │  │   Who Are We?                    │ │
│  │  About Image       │  │   ─────────────                  │ │
│  │                    │  │   Description paragraph text...  │ │
│  │  (Left 50%)        │  │                                  │ │
│  │                    │  │   Longer descriptive content...  │ │
│  │                    │  │                                  │ │
│  │                    │  │   ┌────────────┐  ┌────────────┐ │ │
│  │                    │  │   │ ⚙ Versatile│  │ 🔥 Digital │ │ │
│  │                    │  │   │   Brand    │  │   Agency   │ │ │
│  │                    │  │   │            │  │            │ │ │
│  │                    │  │   │ Description│  │ Description│ │ │
│  │                    │  │   │ text...    │  │ text...    │ │ │
│  │                    │  │   └────────────┘  └────────────┘ │ │
│  │                    │  │ (Right 50%)                      │ │
│  └────────────────────┘  └──────────────────────────────────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│           COUNTRY WISE CURRENCY SECTION                        │
│           (Heading)                                            │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                  FOOTER SECTION                                │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  LOGO (Left)           Contact Links    Social Icons      │ │
│  │                        About             📱 f 𝕏          │ │
│  │                        FAQ                                │ │
│  │                        Sitemap                            │ │
│  │                        © 2026 Currency Converter          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Breakpoints Used

- **Mobile (XS):** < 576px
- **Tablet (SM/MD):** 576px - 991px
- **Desktop (LG):** 992px - 1199px
- **Large Desktop (XL):** 1200px - 1399px
- **Extra Large (XXL):** ≥ 1400px

### Key Responsive Features

| Component | Mobile | Tablet | Desktop | XL/XXL |
|-----------|--------|--------|---------|--------|
| Navbar | Collapsed (☰) | Collapsed | Expanded | Expanded |
| Header Form | 1 Column | 2 Columns | 2 Columns | 2-3 Columns |
| About Section | Image Full Width | Image Left 40% | Image Left 40% | Image Left 50% |
| Features | 1 Column | 1 Column | 2 Columns | 2 Columns |
| Footer | Stacked Vertical | Stacked | 2 Columns | Flex Row |
| Spacing | Reduced (2rem) | Medium (3rem) | Large (4rem) | Extra (4rem+) |
