# MOD SHOES — Premium Footwear E-Commerce Experience

> **"FIND YOUR OWN STRIDE."**  
> An award-winning, high-fashion footwear e-commerce frontend demonstration website designed for modern sneakerheads and luxury footwear connoisseurs.

![MOD SHOES Hero Preview](https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85)

---

## 💎 Project Overview

**MOD SHOES** is a luxury fashion-forward footwear brand experience combining contemporary Milanese & Tokyo runway design language with aerospace-grade athletic ergonomics.

This project is a **100% frontend-only web application** developed with semantic HTML5, modern CSS3, and vanilla modern JavaScript (ES6+), optimized for instant static deployment via **GitHub Pages** without requiring any backend, database, or server dependencies.

---

## ✨ Key Features & Architecture

### 1. International Fashion Editorial Aesthetics
- **Color Palette**: Deep Obsidian Black (`#0E0E0E`), Warm Champagne Beige (`#C8B69A`), Off-White (`#F6F5F0`), Dark Grey (`#292929`), and Light Slate (`#E8E7E3`).
- **Typography**: Editorial display headings using `Syne`, body text using `Plus Jakarta Sans`, and technical monospaced metadata using `Space Grotesk`.
- **Custom Interactive Desktop Cursor**: Trailing physics ring with intelligent scaling over interactive buttons, swatches, and product cards.
- **Page Preloader & Curtain Reveal**: Smooth numeric counter with brand logo reveal.

### 2. Full-Screen Campaign Hero
- **3D Floating Shoe Stage**: Interactive mouse parallax rotation and tilt.
- **Dynamic Floating Tech Badges**: Highlighting PEBA cushioning and 320g featherweight chassis.
- **Micro-Interactions**: Ambient glowing backlight, animated marquee track, and mouse scroll indicator.

### 3. Complete E-Commerce Shopping Experience (`shop.html`)
- **Multi-Criteria Filtering**: Filter by Category (Sneakers, Sports Shoes, Casual Shoes, Formal Shoes, Sandals, Running Shoes), Price Range Slider, and Shoe Size (UK 6 – UK 11).
- **Sort Engine**: Sort by Featured, New Arrivals, Price (Low to High), Price (High to Low), and Customer Rating.
- **Instant Search**: Real-time filtering by model name, category, or materials.
- **Layout Switcher**: Switch dynamically between 4-column and 3-column catalog grids.
- **Active Filter Chips**: Individual tag removals and a "Clear All" reset mechanism.

### 4. Interactive Product Details Experience (`product-details.html`)
- **Multi-Angle Gallery**: High-definition main photography with smooth thumbnail perspective switcher.
- **Dynamic Size & Color Selectors**: Live stock labels, color swatches with hex precision, and quantity stepper.
- **Interactive Modals**: Integrated international sizing conversion guide (UK / EU / US / CM).
- **Technical Accordions**: Collapsible technical specifications, Italian craftsmanship breakdown, island-wide express delivery schedule, and shoe care advice.
- **"You Might Also Like" Engine**: Dynamic related silhouettes based on category DNA.

### 5. Persistent Shopping Cart & Wishlist Drawer (`js/cart.js`)
- **LocalStorage Persistence**: Bag contents and wishlist favorites persist across all page reloads and browser sessions.
- **Free Island-Wide Delivery Progress Bar**: Dynamic calculation towards the Rs. 25,000 free shipping threshold.
- **Promo Code Engine**: Test with `MOD10` (10% discount) or `FIRSTDROP` (Rs. 2,000 discount).
- **Quick View Modal**: Inspect any shoe, change size/color, and add to bag without leaving the current view.
- **3-Step Demo Checkout Simulation**:
  1. Shipping Address & Contact Information (with Sri Lankan city presets)
  2. Payment Method Selector (Credit Card, Koko / Mintpay 3x installments, Cash on Delivery)
  3. Order Confirmation Celebration with unique generated order ID (e.g. `MOD-89412`) and full celebratory confetti particles!

### 6. Editorial Brand Story & Flagship Pages (`about.html`, `contact.html`)
- **Brand Story**: Design philosophy, material credentials, and lookbook gallery.
- **Contact & Flagship**: Colombo 07 flagship store coordinates, opening hours, direct WhatsApp concierge, interactive FAQ accordion, and interactive inquiry form with validation.

---

## 🛠 Technology Stack

- **HTML5**: Semantic markup, accessible attributes (`aria-*`), and structured data.
- **CSS3**: Custom CSS variables, modern Grid & Flexbox, hardware-accelerated animations, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: Clean modular architecture (`products.js`, `cart.js`, `animations.js`, `shop.js`, `product-details.js`, `main.js`).
- **CDN Libraries**:
  - [GSAP 3.12](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/): Scroll-based reveals and magnetic micro-interactions.
  - [Lenis](https://lenis.darkroom.engineering/): Ultra-smooth momentum scrolling.
  - [Swiper 11](https://swiperjs.com/): Touch-enabled carousel for editorial collections.
  - [Lucide Icons](https://lucide.dev/): Crisp, modern vector interface iconography.
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti): Order confirmation celebration.

---

## 📁 Project Directory Structure

```
modshoe/
├── index.html                 # Homepage with Hero, Categories, Drops & Editorial
├── shop.html                  # Full product catalog with filters, search & sorting
├── product-details.html       # Dynamic product page with multi-angle gallery & sizing
├── about.html                 # Brand story, philosophy & craftsmanship atelier
├── contact.html               # Colombo flagship info, inquiry form & FAQ accordion
│
├── css/
│   ├── style.css              # Master stylesheet, design tokens & UI components
│   ├── animations.css         # Keyframes, custom cursor & preloader curtain
│   └── responsive.css         # Breakpoint rules for desktop, tablet & mobile
│
├── js/
│   ├── products.js            # 16-item footwear database with pricing, specs & gallery
│   ├── cart.js                # State management for cart, wishlist & demo checkout
│   ├── animations.js          # GSAP ScrollTrigger, Lenis smooth scroll & cursor
│   ├── shop.js                # Shop filtering, price slider & URL sync
│   ├── product-details.js     # Image gallery, size selector & accordions
│   └── main.js                # Shared sticky nav, search modal & notifications
│
├── assets/
│   └── images/
│       └── products/
│           └── placeholder.svg # Fallback vector silhouette
│
└── README.md                  # Comprehensive documentation & deployment guide
```

---

## 🚀 GitHub Pages Deployment Instructions

This website uses strictly **relative asset paths** and has **zero server-side dependencies**, making it 100% turnkey for GitHub Pages deployment.

### Step-by-Step Instructions:

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete MOD SHOES premium footwear e-commerce website"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name the repository `mod-shoes` (or any preferred name).
   - Keep it **Public**.

3. **Link and Push to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/mod-shoes.git
   git branch -M main
   git push -u origin main
   ```

4. **Activate GitHub Pages**:
   - Open your repository on GitHub.
   - Click on the **Settings** tab.
   - In the left sidebar, navigate to **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and directory `/ (root)`.
   - Click **Save**.

5. **Access Your Live Store**:
   - Wait 60–90 seconds for GitHub Actions to complete the deployment.
   - Your site will be live at:
     ```
     https://<YOUR-USERNAME>.github.io/mod-shoes/
     ```

---

## 💡 Client Presentation Demonstration Tips

When presenting this website to potential footwear retailers or business clients:
1. **Showcase the Cart Drawer**: Add items with different sizes, test the quantity stepper, and apply promo code `MOD10` to showcase dynamic order calculation.
2. **Demonstrate the Demo Checkout**: Progress through the 3-step checkout with simulated Sri Lankan delivery details and trigger the celebratory confetti screen.
3. **Show Mobile Responsiveness**: Open Chrome DevTools (`F12`), toggle device mode, and demonstrate the hamburger drawer, touch-friendly product cards, and slide-out filter drawer.
4. **Highlight the URL Synchronization**: Filter by "Sneakers" on the shop page, copy the URL (`shop.html?category=Sneakers`), and demonstrate that direct links preserve the customer's filter state.

---

## 📄 License & Credits

- Designed and engineered for **MOD SHOES**.
- Photography sourced from curated editorial footwear creators via Unsplash.
- Built for international footwear brand presentation and portfolio demonstration.

