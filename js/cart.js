/**
 * MOD SHOES - Cart, Wishlist & Checkout State Manager
 * Full local storage persistence, slide-out drawer, dynamic calculations and demo checkout.
 */

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.wishlist = this.loadWishlist();
        this.promoDiscount = 0;
        this.activePromoCode = '';
        this.freeShippingThreshold = 25000;
        this.shippingFee = 950;

        this.init();
    }

    loadCart() {
        try {
            const saved = localStorage.getItem('mod_shoes_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load cart from storage', e);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('mod_shoes_cart', JSON.stringify(this.cart));
            this.updateBadges();
            this.renderCartDrawer();
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    }

    loadWishlist() {
        try {
            const saved = localStorage.getItem('mod_shoes_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load wishlist', e);
            return [];
        }
    }

    saveWishlist() {
        try {
            localStorage.setItem('mod_shoes_wishlist', JSON.stringify(this.wishlist));
            this.updateBadges();
            this.updateWishlistIcons();
            this.renderWishlistDrawer();
        } catch (e) {
            console.error('Failed to save wishlist', e);
        }
    }

    init() {
        this.updateBadges();
        this.renderCartDrawer();
        this.renderWishlistDrawer();
        this.bindEvents();
    }

    bindEvents() {
        // Drawer backdrop clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.drawer-backdrop')) {
                this.closeAllDrawers();
            }
        });

        // Cart drawer close button
        const closeCartBtn = document.getElementById('closeCartDrawer');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => this.closeCart());
        }

        // Wishlist drawer close button
        const closeWishlistBtn = document.getElementById('closeWishlistDrawer');
        if (closeWishlistBtn) {
            closeWishlistBtn.addEventListener('click', () => this.closeWishlist());
        }

        // Cart toggle triggers
        document.querySelectorAll('.cart-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleCart();
            });
        });

        // Wishlist toggle triggers
        document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleWishlistDrawer();
            });
        });

        // Promo form submit
        const promoForm = document.getElementById('promoCodeForm');
        if (promoForm) {
            promoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.applyPromoCode();
            });
        }

        // Checkout button click
        const checkoutBtn = document.getElementById('cartCheckoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length === 0) {
                    showToast('Your shopping bag is empty!', 'warning');
                    return;
                }
                this.closeCart();
                this.openCheckoutModal();
            });
        }
    }

    addItem(productId, size = 'UK 8', colorName = null, quantity = 1) {
        const product = getProductById(productId);
        if (!product) return;

        const selectedColor = colorName || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');

        // Check if item with same ID, size and color exists
        const existingIndex = this.cart.findIndex(
            item => item.id === productId && item.size === size && item.color === selectedColor
        );

        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                subtitle: product.subtitle,
                category: product.category,
                price: product.price,
                image: product.image,
                size: size,
                color: selectedColor,
                quantity: quantity
            });
        }

        this.saveCart();
        showToast(`Added ${product.name} (${size}) to your bag`, 'success');
        this.openCart();
    }

    removeItem(index) {
        if (index >= 0 && index < this.cart.length) {
            const item = this.cart[index];
            this.cart.splice(index, 1);
            this.saveCart();
            showToast(`Removed ${item.name} from your bag`, 'info');
        }
    }

    updateQuantity(index, delta) {
        if (index >= 0 && index < this.cart.length) {
            this.cart[index].quantity += delta;
            if (this.cart[index].quantity <= 0) {
                this.removeItem(index);
            } else {
                this.saveCart();
            }
        }
    }

    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getDiscountAmount() {
        const subtotal = this.getSubtotal();
        if (this.promoDiscount > 0) {
            if (this.promoDiscount < 1) {
                return Math.round(subtotal * this.promoDiscount);
            } else {
                return Math.min(this.promoDiscount, subtotal);
            }
        }
        return 0;
    }

    getShippingCost() {
        const subtotal = this.getSubtotal();
        if (subtotal === 0 || subtotal >= this.freeShippingThreshold) {
            return 0;
        }
        return this.shippingFee;
    }

    getGrandTotal() {
        const subtotal = this.getSubtotal();
        if (subtotal === 0) return 0;
        const discount = this.getDiscountAmount();
        const shipping = this.getShippingCost();
        return Math.max(0, subtotal - discount + shipping);
    }

    getTotalItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    updateBadges() {
        const cartCount = this.getTotalItemCount();
        document.querySelectorAll('.cart-count-badge').forEach(badge => {
            badge.textContent = cartCount;
            badge.style.display = cartCount > 0 ? 'flex' : 'none';
        });

        const wishlistCount = this.wishlist.length;
        document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
            badge.textContent = wishlistCount;
            badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
        });
    }

    // Promo code handler
    applyPromoCode() {
        const input = document.getElementById('promoCodeInput');
        if (!input) return;
        const code = input.value.trim().toUpperCase();

        if (code === 'MOD10' || code === 'MODVIP10') {
            this.promoDiscount = 0.10; // 10% off
            this.activePromoCode = code;
            showToast('10% discount applied!', 'success');
        } else if (code === 'FIRSTDROP') {
            this.promoDiscount = 2000; // Rs. 2,000 off
            this.activePromoCode = code;
            showToast('Rs. 2,000 discount applied!', 'success');
        } else {
            showToast('Invalid promo code. Try "MOD10" or "FIRSTDROP"', 'error');
            return;
        }

        input.value = '';
        this.renderCartDrawer();
    }

    removePromoCode() {
        this.promoDiscount = 0;
        this.activePromoCode = '';
        showToast('Promo code removed', 'info');
        this.renderCartDrawer();
    }

    // Render Cart Drawer
    renderCartDrawer() {
        const container = document.getElementById('cartDrawerItems');
        const emptyState = document.getElementById('cartDrawerEmpty');
        const footer = document.getElementById('cartDrawerFooter');
        const subtotalEl = document.getElementById('cartSubtotalAmount');
        const shippingEl = document.getElementById('cartShippingAmount');
        const discountRow = document.getElementById('cartDiscountRow');
        const discountEl = document.getElementById('cartDiscountAmount');
        const totalEl = document.getElementById('cartTotalAmount');
        const shippingProgressText = document.getElementById('shippingProgressText');
        const shippingProgressBar = document.getElementById('shippingProgressBar');

        if (!container) return;

        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const shipping = this.getShippingCost();
        const total = this.getGrandTotal();

        // Update shipping progress bar
        if (shippingProgressText && shippingProgressBar) {
            if (subtotal >= this.freeShippingThreshold) {
                shippingProgressText.innerHTML = '<strong>🎉 Unlocked!</strong> You qualify for <strong>FREE Island-Wide Delivery</strong>';
                shippingProgressBar.style.width = '100%';
                shippingProgressBar.classList.add('bg-success');
            } else {
                const diff = this.freeShippingThreshold - subtotal;
                const percent = Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
                shippingProgressText.innerHTML = `Add <strong>${formatPrice(diff)}</strong> more to get <strong>FREE Island-Wide Delivery</strong>`;
                shippingProgressBar.style.width = `${percent}%`;
                shippingProgressBar.classList.remove('bg-success');
            }
        }

        if (this.cart.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.style.display = 'flex';
            if (footer) footer.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (footer) footer.style.display = 'block';

        let html = '';
        this.cart.forEach((item, index) => {
            html += `
                <div class="cart-drawer-item" data-index="${index}">
                    <div class="cart-item-thumb">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" />
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-header">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <button type="button" class="cart-item-remove-btn" onclick="window.modCart.removeItem(${index})" title="Remove item" aria-label="Remove item">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                        <div class="cart-item-meta">
                            <span class="meta-tag">Size: <strong>${item.size}</strong></span>
                            <span class="meta-separator">•</span>
                            <span class="meta-tag">Color: <strong>${item.color}</strong></span>
                        </div>
                        <div class="cart-item-footer">
                            <div class="quantity-stepper">
                                <button type="button" class="stepper-btn" onclick="window.modCart.updateQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
                                <span class="stepper-value">${item.quantity}</span>
                                <button type="button" class="stepper-btn" onclick="window.modCart.updateQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
                            </div>
                            <div class="cart-item-price">
                                ${formatPrice(item.price * item.quantity)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);

        if (discountRow && discountEl) {
            if (discount > 0) {
                discountRow.style.display = 'flex';
                discountEl.textContent = `- ${formatPrice(discount)} (${this.activePromoCode})`;
            } else {
                discountRow.style.display = 'none';
            }
        }

        if (totalEl) totalEl.textContent = formatPrice(total);

        // Reinitialize icons in newly created DOM
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Wishlist Toggle
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        const product = getProductById(productId);

        if (index > -1) {
            this.wishlist.splice(index, 1);
            showToast(`Removed ${product ? product.name : 'item'} from your wishlist`, 'info');
        } else {
            this.wishlist.push(productId);
            showToast(`Saved ${product ? product.name : 'item'} to your wishlist`, 'success');
        }

        this.saveWishlist();
    }

    isWishlisted(productId) {
        return this.wishlist.includes(productId);
    }

    updateWishlistIcons() {
        document.querySelectorAll('.favorite-toggle-btn').forEach(btn => {
            const id = btn.getAttribute('data-product-id');
            if (this.isWishlisted(id)) {
                btn.classList.add('is-active');
            } else {
                btn.classList.remove('is-active');
            }
        });
    }

    // Render Wishlist Drawer
    renderWishlistDrawer() {
        const container = document.getElementById('wishlistDrawerItems');
        const emptyState = document.getElementById('wishlistDrawerEmpty');

        if (!container) return;

        if (this.wishlist.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.style.display = 'flex';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        let html = '';
        this.wishlist.forEach(id => {
            const product = getProductById(id);
            if (!product) return;

            html += `
                <div class="wishlist-drawer-item">
                    <div class="wishlist-item-thumb">
                        <img src="${product.image}" alt="${product.name}" />
                    </div>
                    <div class="wishlist-item-info">
                        <h4>${product.name}</h4>
                        <div class="item-cat">${product.category}</div>
                        <div class="item-price">${formatPrice(product.price)}</div>
                        <div class="wishlist-item-actions">
                            <button type="button" class="btn btn-sm btn-accent" onclick="window.modCart.moveToCart('${product.id}')">
                                Add to Bag
                            </button>
                            <button type="button" class="btn-text-danger" onclick="window.modCart.toggleWishlist('${product.id}')">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    moveToCart(productId) {
        this.addItem(productId, 'UK 8', null, 1);
        this.toggleWishlist(productId);
        this.closeWishlist();
        this.openCart();
    }

    // Drawer controllers
    openCart() {
        const drawer = document.getElementById('cartDrawer');
        const backdrop = document.getElementById('drawerBackdrop');
        if (drawer) drawer.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        document.body.classList.add('drawer-open');
    }

    closeCart() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) drawer.classList.remove('open');
        this.checkBackdropState();
    }

    openWishlist() {
        const drawer = document.getElementById('wishlistDrawer');
        const backdrop = document.getElementById('drawerBackdrop');
        if (drawer) drawer.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        document.body.classList.add('drawer-open');
    }

    closeWishlist() {
        const drawer = document.getElementById('wishlistDrawer');
        if (drawer) drawer.classList.remove('open');
        this.checkBackdropState();
    }

    toggleCart() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer && drawer.classList.contains('open')) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    toggleWishlistDrawer() {
        const drawer = document.getElementById('wishlistDrawer');
        if (drawer && drawer.classList.contains('open')) {
            this.closeWishlist();
        } else {
            this.openWishlist();
        }
    }

    closeAllDrawers() {
        this.closeCart();
        this.closeWishlist();
        this.closeSearchModal();
        this.closeQuickView();
        this.closeCheckoutModal();
    }

    checkBackdropState() {
        const cartOpen = document.getElementById('cartDrawer')?.classList.contains('open');
        const wishlistOpen = document.getElementById('wishlistDrawer')?.classList.contains('open');
        const quickViewOpen = document.getElementById('quickViewModal')?.classList.contains('open');
        const checkoutOpen = document.getElementById('checkoutModal')?.classList.contains('open');

        if (!cartOpen && !wishlistOpen && !quickViewOpen && !checkoutOpen) {
            const backdrop = document.getElementById('drawerBackdrop');
            if (backdrop) backdrop.classList.remove('open');
            document.body.classList.remove('drawer-open');
        }
    }

    // Search modal helpers
    openSearchModal() {
        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.add('open');
            const input = document.getElementById('siteSearchInput');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
            document.body.classList.add('modal-open');
        }
    }

    closeSearchModal() {
        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    }

    // Quick View Modal
    openQuickView(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const modal = document.getElementById('quickViewModal');
        const content = document.getElementById('quickViewContent');
        if (!modal || !content) return;

        let colorsHtml = '';
        product.colors.forEach((c, idx) => {
            colorsHtml += `
                <button type="button" class="swatch-btn ${idx === 0 ? 'selected' : ''}" data-color="${c.name}" style="background-color: ${c.hex};" title="${c.name}" aria-label="${c.name}"></button>
            `;
        });

        let sizesHtml = '';
        product.sizes.forEach((s, idx) => {
            sizesHtml += `
                <button type="button" class="size-pill-btn ${idx === 2 ? 'selected' : ''}" data-size="${s}">${s}</button>
            `;
        });

        content.innerHTML = `
            <div class="qv-grid">
                <div class="qv-gallery">
                    <div class="qv-main-img-wrap">
                        <img id="qvMainImg" src="${product.image}" alt="${product.name}" />
                        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
                    </div>
                    <div class="qv-thumbs">
                        ${product.gallery.map((img, i) => `
                            <button type="button" class="qv-thumb-btn ${i === 0 ? 'active' : ''}" onclick="document.getElementById('qvMainImg').src='${img}'; document.querySelectorAll('.qv-thumb-btn').forEach(b => b.classList.remove('active')); this.classList.add('active');">
                                <img src="${img}" alt="Thumbnail ${i + 1}" />
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="qv-details">
                    <span class="qv-category">${product.category}</span>
                    <h2 class="qv-title">${product.name}</h2>
                    <div class="qv-rating">
                        <div class="stars">
                            ★★★★★
                        </div>
                        <span class="rating-val">${product.rating}</span>
                        <span class="rating-count">(${product.reviewsCount} reviews)</span>
                    </div>
                    <div class="qv-price-row">
                        <span class="qv-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="qv-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="qv-desc">${product.description}</p>
                    
                    <div class="qv-option-group">
                        <label class="option-label">Color: <strong id="qvSelectedColor">${product.colors[0].name}</strong></label>
                        <div class="qv-color-swatches" id="qvColorSwatches">
                            ${colorsHtml}
                        </div>
                    </div>

                    <div class="qv-option-group">
                        <div class="option-label-wrap">
                            <label class="option-label">Select Size: <strong id="qvSelectedSize">${product.sizes[2] || product.sizes[0]}</strong></label>
                            <a href="product-details.html?id=${product.id}#sizing" class="size-guide-link">Size Chart</a>
                        </div>
                        <div class="qv-size-pills" id="qvSizePills">
                            ${sizesHtml}
                        </div>
                    </div>

                    <div class="qv-actions-row">
                        <div class="quantity-stepper">
                            <button type="button" class="stepper-btn" id="qvQtyMinus">-</button>
                            <span class="stepper-value" id="qvQtyVal">1</span>
                            <button type="button" class="stepper-btn" id="qvQtyPlus">+</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-block" id="qvAddToCartBtn">
                            <i data-lucide="shopping-bag"></i> Add to Bag
                        </button>
                    </div>

                    <div class="qv-footer-links">
                        <a href="product-details.html?id=${product.id}" class="view-full-details-link">
                            View Full Product Specifications &amp; Editorial Details <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Bind interactive elements inside quick view
        let currentQty = 1;
        let selectedSize = product.sizes[2] || product.sizes[0];
        let selectedColor = product.colors[0].name;

        content.querySelectorAll('#qvColorSwatches .swatch-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                content.querySelectorAll('#qvColorSwatches .swatch-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedColor = btn.getAttribute('data-color');
                const label = content.querySelector('#qvSelectedColor');
                if (label) label.textContent = selectedColor;
            });
        });

        content.querySelectorAll('#qvSizePills .size-pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                content.querySelectorAll('#qvSizePills .size-pill-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.getAttribute('data-size');
                const label = content.querySelector('#qvSelectedSize');
                if (label) label.textContent = selectedSize;
            });
        });

        const minusBtn = content.querySelector('#qvQtyMinus');
        const plusBtn = content.querySelector('#qvQtyPlus');
        const qtyVal = content.querySelector('#qvQtyVal');

        if (minusBtn && plusBtn && qtyVal) {
            minusBtn.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    qtyVal.textContent = currentQty;
                }
            });
            plusBtn.addEventListener('click', () => {
                currentQty++;
                qtyVal.textContent = currentQty;
            });
        }

        const addBtn = content.querySelector('#qvAddToCartBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.addItem(product.id, selectedSize, selectedColor, currentQty);
                this.closeQuickView();
            });
        }

        modal.classList.add('open');
        const backdrop = document.getElementById('drawerBackdrop');
        if (backdrop) backdrop.classList.add('open');
        document.body.classList.add('drawer-open');

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    closeQuickView() {
        const modal = document.getElementById('quickViewModal');
        if (modal) modal.classList.remove('open');
        this.checkBackdropState();
    }

    // Demo Checkout Modal
    openCheckoutModal() {
        const modal = document.getElementById('checkoutModal');
        if (!modal) return;

        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const shipping = this.getShippingCost();
        const total = this.getGrandTotal();

        // Populate summary
        const checkoutItemsList = document.getElementById('checkoutItemsList');
        if (checkoutItemsList) {
            checkoutItemsList.innerHTML = this.cart.map(item => `
                <div class="checkout-summary-item">
                    <div class="chk-thumb">
                        <img src="${item.image}" alt="${item.name}" />
                        <span class="chk-badge">${item.quantity}</span>
                    </div>
                    <div class="chk-info">
                        <div class="chk-title">${item.name}</div>
                        <div class="chk-meta">${item.size} • ${item.color}</div>
                    </div>
                    <div class="chk-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
            `).join('');
        }

        const subEl = document.getElementById('chkSubtotal');
        const shipEl = document.getElementById('chkShipping');
        const discEl = document.getElementById('chkDiscount');
        const discRow = document.getElementById('chkDiscountRow');
        const totEl = document.getElementById('chkTotal');

        if (subEl) subEl.textContent = formatPrice(subtotal);
        if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
        if (discRow && discEl) {
            if (discount > 0) {
                discRow.style.display = 'flex';
                discEl.textContent = `- ${formatPrice(discount)}`;
            } else {
                discRow.style.display = 'none';
            }
        }
        if (totEl) totEl.textContent = formatPrice(total);

        // Reset to Step 1
        this.showCheckoutStep(1);

        modal.classList.add('open');
        const backdrop = document.getElementById('drawerBackdrop');
        if (backdrop) backdrop.classList.add('open');
        document.body.classList.add('drawer-open');
    }

    closeCheckoutModal() {
        const modal = document.getElementById('checkoutModal');
        if (modal) modal.classList.remove('open');
        this.checkBackdropState();
    }

    showCheckoutStep(stepNumber) {
        document.querySelectorAll('.checkout-step-panel').forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.step-progress-item').forEach((item, i) => {
            if (i + 1 <= stepNumber) item.classList.add('active');
            else item.classList.remove('active');
        });

        const target = document.getElementById(`checkoutStep${stepNumber}`);
        if (target) target.classList.add('active');
    }

    processOrder(formData) {
        // Generate random order number e.g. MOD-89201
        const orderNumber = 'MOD-' + Math.floor(10000 + Math.random() * 90000);
        const orderTotal = formatPrice(this.getGrandTotal());

        // Fill confirmation panel
        const orderNumEl = document.getElementById('confirmedOrderNumber');
        const orderEmailEl = document.getElementById('confirmedOrderEmail');
        const orderTotalEl = document.getElementById('confirmedOrderTotal');

        if (orderNumEl) orderNumEl.textContent = orderNumber;
        if (orderEmailEl) orderEmailEl.textContent = formData.get('email') || 'customer@modshoes.lk';
        if (orderTotalEl) orderTotalEl.textContent = orderTotal;

        // Clear cart
        this.cart = [];
        this.saveCart();

        // Switch to confirmation step
        this.showCheckoutStep(3);

        // Launch celebratory confetti if library loaded
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#C8B69A', '#111111', '#FFFFFF', '#FF334B']
            });
        }
    }
}

// Global Toast System
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-pill toast-${type}`;
    
    let iconName = 'check-circle-2';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'x-circle';
    if (type === 'info') iconName = 'info';

    toast.innerHTML = `
        <div class="toast-icon"><i data-lucide="${iconName}"></i></div>
        <div class="toast-message">${message}</div>
        <button type="button" class="toast-close-btn" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Enter animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    const removeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    };

    toast.querySelector('.toast-close-btn').addEventListener('click', removeToast);
    setTimeout(removeToast, 4000);
}

// Instantiate globally
window.modCart = new CartManager();
