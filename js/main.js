/**
 * MOD SHOES - Global Controller (main.js)
 * Shared navigation, search modal, announcement ticker, newsletter and product card generators.
 */

// Helper to generate consistent product card markup
function renderProductCard(product) {
    const isWish = window.modCart ? window.modCart.isWishlisted(product.id) : false;
    const badgeHtml = product.badge 
        ? `<span class="card-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` 
        : '';
    const discountPriceHtml = product.originalPrice 
        ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` 
        : '';

    return `
        <article class="product-card reveal-stagger-child" data-product-id="${product.id}" data-category="${product.category}">
            <div class="card-media-wrapper">
                <a href="product-details.html?id=${product.id}" class="card-image-link" aria-label="${product.name}">
                    <img class="primary-img" src="${product.image}" alt="${product.name}" loading="lazy" />
                    <img class="secondary-img" src="${product.hoverImage || product.image}" alt="${product.name} alternate angle" loading="lazy" />
                </a>

                <div class="card-badges-top">
                    ${badgeHtml}
                </div>

                <div class="card-floating-actions">
                    <button type="button" 
                            class="card-action-btn favorite-toggle-btn ${isWish ? 'is-active' : ''}" 
                            data-product-id="${product.id}" 
                            onclick="window.modCart.toggleWishlist('${product.id}')"
                            aria-label="Save to Wishlist"
                            title="Save to Wishlist">
                        <i data-lucide="heart"></i>
                    </button>
                    <button type="button" 
                            class="card-action-btn quick-view-btn" 
                            onclick="window.modCart.openQuickView('${product.id}')"
                            aria-label="Quick View"
                            title="Quick View">
                        <i data-lucide="eye"></i>
                    </button>
                </div>

                <button type="button" 
                        class="card-quick-add-btn" 
                        onclick="window.modCart.addItem('${product.id}', 'UK 8', null, 1)">
                    <i data-lucide="shopping-bag"></i> Quick Add (UK 8)
                </button>
            </div>

            <div class="card-content">
                <div class="card-category-row">
                    <span class="card-category">${product.category}</span>
                    <div class="card-rating">
                        <i data-lucide="star" class="star-icon"></i>
                        <span>${product.rating}</span>
                    </div>
                </div>

                <h3 class="card-title">
                    <a href="product-details.html?id=${product.id}">${product.name}</a>
                </h3>

                <div class="card-price-row">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${discountPriceHtml}
                </div>
            </div>
        </article>
    `;
}

// Global App Initialization
class ShoesApp {
    constructor() {
        this.init();
    }

    init() {
        this.initImageFallbacks();
        this.initStickyNavbar();
        this.initMobileMenu();
        this.initSearchModal();
        this.initAnnouncementTicker();
        this.initNewsletterForms();
        this.highlightActiveNavLink();
        this.initFooterYear();
        
        // Re-render Lucide icons on start
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Global image error fallback handler to prevent any broken image links
    initImageFallbacks() {
        document.addEventListener('error', (e) => {
            if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
                if (!e.target.dataset.hasFallback) {
                    e.target.dataset.hasFallback = 'true';
                    e.target.src = 'assets/images/products/placeholder.svg';
                }
            }
        }, true);
    }

    // Sticky Navbar Glassmorphism on scroll
    initStickyNavbar() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const checkScroll = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    // Mobile Hamburger Navigation
    initMobileMenu() {
        const toggleBtn = document.getElementById('mobileMenuToggleBtn');
        const menuDrawer = document.getElementById('mobileNavDrawer');
        const closeBtn = document.getElementById('closeMobileNav');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (!toggleBtn || !menuDrawer) return;

        const openMenu = () => {
            menuDrawer.classList.add('open');
            document.body.classList.add('drawer-open');
            if (window.gsap) {
                gsap.from('.mobile-nav-item', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        };

        const closeMenu = () => {
            menuDrawer.classList.remove('open');
            document.body.classList.remove('drawer-open');
        };

        toggleBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        links.forEach(l => l.addEventListener('click', closeMenu));
    }

    // Search Overlay & Instant Filter
    initSearchModal() {
        const openBtn = document.getElementById('navSearchBtn');
        const closeBtn = document.getElementById('closeSearchModal');
        const modal = document.getElementById('searchModal');
        const searchInput = document.getElementById('siteSearchInput');
        const resultsContainer = document.getElementById('searchResultsList');
        const emptyState = document.getElementById('searchEmptyState');

        if (!openBtn || !modal) return;

        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.modCart.openSearchModal();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                window.modCart.closeSearchModal();
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.modCart.closeAllDrawers();
            }
        });

        // Live search filtering
        if (searchInput && resultsContainer) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    if (emptyState) emptyState.style.display = 'none';
                    return;
                }

                const matches = PRODUCTS.filter(p => 
                    p.name.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );

                if (matches.length === 0) {
                    resultsContainer.innerHTML = '';
                    if (emptyState) {
                        emptyState.style.display = 'block';
                        emptyState.innerHTML = `<p>No footwear found matching <strong>"${e.target.value}"</strong>.</p>`;
                    }
                    return;
                }

                if (emptyState) emptyState.style.display = 'none';

                resultsContainer.innerHTML = matches.slice(0, 6).map(p => `
                    <a href="product-details.html?id=${p.id}" class="search-result-row">
                        <img src="${p.image}" alt="${p.name}" class="search-thumb" />
                        <div class="search-info">
                            <span class="search-cat">${p.category}</span>
                            <span class="search-title">${p.name}</span>
                        </div>
                        <span class="search-price">${formatPrice(p.price)}</span>
                    </a>
                `).join('');
            });
        }
    }

    // Announcement Bar Rotating Messages
    initAnnouncementTicker() {
        const messages = [
            "STEP INTO SOMETHING DIFFERENT – DISCOVER THE LATEST COLLECTION",
            "FREE ISLAND-WIDE DELIVERY ON ALL ORDERS OVER RS. 25,000",
            "USE CODE 'MOD10' FOR AN EXTRA 10% OFF YOUR FIRST ORDER",
            "COLOMBO FLAGSHIP STORE OPEN DAILY 10AM – 8PM"
        ];

        const tickerEl = document.getElementById('announcementText');
        if (!tickerEl) return;

        let currentIndex = 0;
        setInterval(() => {
            if (window.gsap) {
                gsap.to(tickerEl, {
                    y: -15,
                    opacity: 0,
                    duration: 0.35,
                    onComplete: () => {
                        currentIndex = (currentIndex + 1) % messages.length;
                        tickerEl.textContent = messages[currentIndex];
                        gsap.fromTo(tickerEl, 
                            { y: 15, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.35 }
                        );
                    }
                });
            } else {
                currentIndex = (currentIndex + 1) % messages.length;
                tickerEl.textContent = messages[currentIndex];
            }
        }, 5000);
    }

    // Newsletter Subscriptions
    initNewsletterForms() {
        const forms = document.querySelectorAll('.newsletter-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('input[type="email"]');
                if (!input) return;

                const email = input.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    showToast('Please enter a valid email address.', 'warning');
                    input.focus();
                    return;
                }

                // Demo success state
                input.value = '';
                showToast('Welcome to the MOD inner circle! Check your inbox for your 10% code.', 'success');
            });
        });
    }

    // Active Navigation Link
    highlightActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Footer copyright year
    initFooterYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
}

// Instantiate on document ready
document.addEventListener('DOMContentLoaded', () => {
    window.modApp = new ShoesApp();
});
