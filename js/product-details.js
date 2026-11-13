/**
 * MOD SHOES - Product Details Controller (product-details.js)
 * Multi-angle image gallery, size/color selectors, accordions and related product recommendations.
 */

class ProductDetailsController {
    constructor() {
        this.product = null;
        this.selectedSize = null;
        this.selectedColor = null;
        this.quantity = 1;

        this.init();
    }

    init() {
        this.loadProductData();
        if (!this.product) return;

        this.renderProductPage();
        this.bindEvents();
        this.renderRelatedProducts();
    }

    loadProductData() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id') || 'mod-01';
        this.product = getProductById(productId);

        if (!this.product) {
            this.product = PRODUCTS[0];
        }

        this.selectedSize = this.product.sizes[2] || this.product.sizes[0];
        this.selectedColor = this.product.colors[0].name;

        // Update document title
        document.title = `${this.product.name} | MOD SHOES Official`;
    }

    renderProductPage() {
        // Breadcrumbs
        const breadcrumbCat = document.getElementById('breadcrumbCategory');
        const breadcrumbName = document.getElementById('breadcrumbProductName');
        if (breadcrumbCat) {
            breadcrumbCat.textContent = this.product.category;
            breadcrumbCat.setAttribute('href', `shop.html?category=${encodeURIComponent(this.product.category)}`);
        }
        if (breadcrumbName) {
            breadcrumbName.textContent = this.product.name;
        }

        // Product Titles & Meta
        const titleEl = document.getElementById('pdTitle');
        const subtitleEl = document.getElementById('pdSubtitle');
        const badgeEl = document.getElementById('pdBadge');
        const ratingValEl = document.getElementById('pdRatingVal');
        const reviewCountEl = document.getElementById('pdReviewCount');
        const priceEl = document.getElementById('pdPrice');
        const origPriceEl = document.getElementById('pdOriginalPrice');
        const descEl = document.getElementById('pdDescription');
        const highlightsEl = document.getElementById('pdHighlights');

        if (titleEl) titleEl.textContent = this.product.name;
        if (subtitleEl) subtitleEl.textContent = this.product.subtitle;
        
        if (badgeEl) {
            if (this.product.badge) {
                badgeEl.textContent = this.product.badge;
                badgeEl.className = `product-badge badge-${this.product.badge.toLowerCase()}`;
                badgeEl.style.display = 'inline-block';
            } else {
                badgeEl.style.display = 'none';
            }
        }

        if (ratingValEl) ratingValEl.textContent = this.product.rating;
        if (reviewCountEl) reviewCountEl.textContent = `(${this.product.reviewsCount} customer reviews)`;
        if (priceEl) priceEl.textContent = formatPrice(this.product.price);
        
        if (origPriceEl) {
            if (this.product.originalPrice) {
                origPriceEl.textContent = formatPrice(this.product.originalPrice);
                origPriceEl.style.display = 'inline-block';
            } else {
                origPriceEl.style.display = 'none';
            }
        }

        if (descEl) descEl.textContent = this.product.description;

        if (highlightsEl && this.product.highlights) {
            highlightsEl.innerHTML = this.product.highlights.map(h => `
                <li><i data-lucide="check" class="highlight-check"></i> ${h}</li>
            `).join('');
        }

        // Gallery Main & Thumbnails
        const mainImg = document.getElementById('pdMainImage');
        const thumbContainer = document.getElementById('pdThumbnailStrip');

        if (mainImg) {
            mainImg.src = this.product.image;
            mainImg.alt = this.product.name;
        }

        if (thumbContainer && this.product.gallery) {
            thumbContainer.innerHTML = this.product.gallery.map((imgUrl, idx) => `
                <button type="button" class="pd-thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-img-url="${imgUrl}" aria-label="View photo ${idx + 1}">
                    <img src="${imgUrl}" alt="${this.product.name} angle ${idx + 1}" loading="lazy" />
                </button>
            `).join('');
        }

        // Color Swatches
        const colorLabel = document.getElementById('pdSelectedColorName');
        const swatchesContainer = document.getElementById('pdColorSwatches');

        if (colorLabel) colorLabel.textContent = this.selectedColor;
        if (swatchesContainer && this.product.colors) {
            swatchesContainer.innerHTML = this.product.colors.map((c, idx) => `
                <button type="button" 
                        class="swatch-btn ${idx === 0 ? 'selected' : ''}" 
                        data-color="${c.name}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name}"
                        aria-label="${c.name}">
                </button>
            `).join('');
        }

        // Size Selector Pills
        const sizeLabel = document.getElementById('pdSelectedSizeName');
        const sizeContainer = document.getElementById('pdSizePills');

        if (sizeLabel) sizeLabel.textContent = this.selectedSize;
        if (sizeContainer && this.product.sizes) {
            sizeContainer.innerHTML = this.product.sizes.map((s, idx) => `
                <button type="button" 
                        class="size-pill-btn ${s === this.selectedSize ? 'selected' : ''}" 
                        data-size="${s}">
                    ${s}
                </button>
            `).join('');
        }

        // Product Specs Table
        const specsContainer = document.getElementById('pdSpecsTable');
        if (specsContainer && this.product.specs) {
            specsContainer.innerHTML = Object.entries(this.product.specs).map(([key, val]) => `
                <div class="spec-row">
                    <span class="spec-label">${key}</span>
                    <span class="spec-value">${val}</span>
                </div>
            `).join('');
        }

        // Wishlist button state
        const wishBtn = document.getElementById('pdWishlistBtn');
        if (wishBtn) {
            wishBtn.setAttribute('data-product-id', this.product.id);
            if (window.modCart && window.modCart.isWishlisted(this.product.id)) {
                wishBtn.classList.add('is-active');
            }
        }
    }

    bindEvents() {
        // Thumbnail Click Swaps
        const mainImg = document.getElementById('pdMainImage');
        const thumbBtns = document.querySelectorAll('.pd-thumb-btn');

        thumbBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                thumbBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const newSrc = btn.getAttribute('data-img-url');
                if (mainImg && newSrc) {
                    if (window.gsap) {
                        gsap.to(mainImg, {
                            opacity: 0.3,
                            scale: 0.98,
                            duration: 0.2,
                            onComplete: () => {
                                mainImg.src = newSrc;
                                gsap.to(mainImg, { opacity: 1, scale: 1, duration: 0.3 });
                            }
                        });
                    } else {
                        mainImg.src = newSrc;
                    }
                }
            });
        });

        // Color Swatches Selection
        document.querySelectorAll('#pdColorSwatches .swatch-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#pdColorSwatches .swatch-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedColor = btn.getAttribute('data-color');
                const label = document.getElementById('pdSelectedColorName');
                if (label) label.textContent = this.selectedColor;
            });
        });

        // Size Selection
        document.querySelectorAll('#pdSizePills .size-pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#pdSizePills .size-pill-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedSize = btn.getAttribute('data-size');
                const label = document.getElementById('pdSelectedSizeName');
                if (label) label.textContent = this.selectedSize;
            });
        });

        // Quantity Stepper
        const minusBtn = document.getElementById('pdQtyMinus');
        const plusBtn = document.getElementById('pdQtyPlus');
        const valEl = document.getElementById('pdQtyVal');

        if (minusBtn && plusBtn && valEl) {
            minusBtn.addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    valEl.textContent = this.quantity;
                }
            });
            plusBtn.addEventListener('click', () => {
                this.quantity++;
                valEl.textContent = this.quantity;
            });
        }

        // Add to Bag Button
        const addBtn = document.getElementById('pdAddToCartBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (window.modCart) {
                    window.modCart.addItem(this.product.id, this.selectedSize, this.selectedColor, this.quantity);
                }
            });
        }

        // Buy Now Button (Adds to cart & opens checkout immediately)
        const buyNowBtn = document.getElementById('pdBuyNowBtn');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                if (window.modCart) {
                    window.modCart.addItem(this.product.id, this.selectedSize, this.selectedColor, this.quantity);
                    window.modCart.openCheckoutModal();
                }
            });
        }

        // Wishlist Toggle
        const wishBtn = document.getElementById('pdWishlistBtn');
        if (wishBtn) {
            wishBtn.addEventListener('click', () => {
                if (window.modCart) {
                    window.modCart.toggleWishlist(this.product.id);
                    wishBtn.classList.toggle('is-active', window.modCart.isWishlisted(this.product.id));
                }
            });
        }

        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion-item');
                const isOpen = item.classList.contains('open');

                // Close other accordions in this group
                const parent = header.closest('.accordion-group');
                if (parent) {
                    parent.querySelectorAll('.accordion-item').forEach(it => it.classList.remove('open'));
                }

                if (!isOpen) {
                    item.classList.add('open');
                }

                setTimeout(() => {
                    if (window.modAnimations) window.modAnimations.refreshScroll();
                }, 350);
            });
        });

        // Size Guide Modal Open/Close
        const openGuideBtn = document.getElementById('openSizeGuideModal');
        const guideModal = document.getElementById('sizeGuideModal');
        const closeGuideBtn = document.getElementById('closeSizeGuideModal');

        if (openGuideBtn && guideModal) {
            openGuideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                guideModal.classList.add('open');
                document.body.classList.add('modal-open');
            });
        }

        if (closeGuideBtn && guideModal) {
            closeGuideBtn.addEventListener('click', () => {
                guideModal.classList.remove('open');
                document.body.classList.remove('modal-open');
            });
        }

        if (guideModal) {
            guideModal.addEventListener('click', (e) => {
                if (e.target === guideModal) {
                    guideModal.classList.remove('open');
                    document.body.classList.remove('modal-open');
                }
            });
        }
    }

    renderRelatedProducts() {
        const grid = document.getElementById('relatedProductsGrid');
        if (!grid) return;

        const related = getRelatedProducts(this.product.id, this.product.category, 4);
        grid.innerHTML = related.map(p => renderProductCard(p)).join('');

        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.modCart) {
            window.modCart.updateWishlistIcons();
        }

        if (window.modAnimations) {
            window.modAnimations.refreshScroll();
        }
    }
}

// Auto-instantiate if on product details page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pdMainImage')) {
        window.modProductDetails = new ProductDetailsController();
    }
});

