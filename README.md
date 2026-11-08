<div align="center">

  <img src="assets/serenlink_logo_white.png" alt="SerenLink Solutions" width="460" />

  <br/>
  <h3>Enterprise Network Solutions for Sri Lanka 🌐🇱🇰</h3>
  <p>High-Performance Fiber Optics, Enterprise Wi-Fi 6/7, Data Centers, Structured Cabling & Security Infrastructure.</p>

  <p>
    <a href="https://d-navanith.github.io/serenlink-solutions/"><img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00e5ff?style=for-the-badge&logo=github" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/IIS%20Ready-0078D7?style=for-the-badge&logo=windows&logoColor=white" alt="IIS Ready" />
  </p>

</div>

---

## 🎬 Visual Tour & Website Previews

### 1. Cinematic Animated Splash Screen
> A futuristic, smooth 5.4-second opening sequence featuring central seed particle blooms, electric cyan network light trails, elliptical pulse rings, and converging data particles revealing the unified SerenLink brandmark.

<div align="center">
  <img src="docs/images/splash_screen.png" alt="SerenLink Cinematic Splash Screen" width="95%" />
</div>

<br/>

### 2. Homepage & Interactive Visualizer
> High-converting enterprise landing page featuring dynamic metrics, network hardware visualization, interactive project scopes, and fast quote dispatch.

<div align="center">
  <img src="docs/images/homepage_hero.png" alt="SerenLink Solutions Homepage Hero" width="95%" />
</div>

<br/>

### 3. Enterprise Networking Services
> Complete scope of enterprise network engineering: High-speed Fiber Optic Backbones, Wi-Fi 6/7 Deployments, Managed Switching & Routing, and Cat6A/Cat7 Structured Cabling.

<div align="center">
  <img src="docs/images/services_page.png" alt="SerenLink Enterprise Services" width="95%" />
</div>

<br/>

### 4. Tailored Industry Solutions
> Engineered turnkey networking solutions specifically tailored for Sri Lanka's leading economic sectors: Luxury Resorts & Hotels, Garment & Manufacturing FTZ Factories, Multi-Campus Universities, and Commercial Headquarters.

<div align="center">
  <img src="docs/images/solutions_page.png" alt="SerenLink Tailored Industry Solutions" width="95%" />
</div>

<br/>

### 5. Fast Site Survey & Engineering Dispatch
> Interactive client consultation and inquiry portal allowing IT managers and business owners to request instant site audits and engineer dispatch across Colombo, Katunayake FTZ, Kandy, Galle, and islandwide.

<div align="center">
  <img src="docs/images/contact_page.png" alt="SerenLink Contact and Site Survey Portal" width="95%" />
</div>

---

## ✨ Highlights & Architecture

* **Zero Bloat / 100% Vanilla Tech**: Built purely with HTML5, CSS3, and modern JavaScript without relying on heavy third-party animation libraries or runtimes.
* **Hardware GPU Accelerated**: Smooth 60 FPS transitions and SVG path animations powered by CSS `transform` and `opacity`.
* **Smart Splash Screen Engine**:
  * Auto-dismisses smoothly after the intro plays.
  * Interactive Skip button (`Skip ✕`), click-anywhere to dismiss, and `Escape` key handler.
  * Hard 6.8s fail-safe timer guarantees page content is never blocked.
  * Respects system accessibility (`prefers-reduced-motion`).
* **TKWIT Enterprise Navigation**: Two-column responsive mega menu with service category deep-links, tech specs, and quick contact triggers.
* **Onramp-Style Scrolling Reveals**: Progressive viewport-driven entrance animations across all content blocks.
* **Cross-Platform Compatibility**: Fully responsive across mobile, tablet, and widescreen desktop viewports.

---

## 📂 Project Structure

```plaintext
network_solution/
├── assets/                  # High-resolution logos, badges, and hardware diagrams
│   ├── serenlink_logo_white.png
│   ├── serenlink_symbol.png
│   └── partners/            # Certified brand partner assets (Ruijie, UniFi, Hikvision, etc.)
├── docs/
│   └── images/              # Documentation showcase screenshots
│       ├── splash_screen.png
│       ├── homepage_hero.png
│       ├── services_page.png
│       ├── solutions_page.png
│       └── contact_page.png
├── about.html               # Company vision, SLT/Dialog peering standards, credentials
├── contact.html             # Site survey request & fast dispatch form
├── index.html               # Main homepage & interactive quote builder
├── industries.html          # Specialized vertical offerings across Sri Lanka
├── services.html            # Detailed technical service specifications
├── solutions.html           # Turnkey sector-specific network blueprints
├── script.js                # Core UI interactivity, calculators, and navigation
├── splash.css               # Isolated cinematic splash screen animations
├── splash.js                # Splash timeline controller and accessibility fail-safes
├── style.css                # Enterprise design system, variables, and responsive layout
├── web.config               # Production IIS / MonsterASP configuration (MIME types, routing)
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Local Development
To run the website locally on port 8080:

```bash
# Using Python's built-in web server:
python -m http.server 8080

# Or execute the included batch script on Windows:
run_website.bat
```
Then navigate to `http://localhost:8080` in your web browser.

---

## 🌐 Deployment Options

### 1. GitHub Pages
1. Push to your GitHub repository `main` branch.
2. Navigate to **Settings** → **Pages**.
3. Select **Deploy from a branch** → Branch: **`main`** / Folder: **`/ (root)`**.
4. The site is live at: `https://<username>.github.io/<repository-name>/`.

### 2. MonsterASP.net / Windows IIS
1. The included `web.config` is pre-configured with default document routing (`index.html`) and proper MIME maps for SVG, WOFF2 fonts, and WebP images.
2. Upload the project files directly to your `site/wwwroot` folder via File Manager or FTP.

---

## 📄 License & Credits
© 2026 SerenLink Solutions. All rights reserved.  
*Network Solutions for Sri Lanka.*
