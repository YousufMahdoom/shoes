/**
 * MOD SHOES - Shop Page Controller (shop.js)
 * Multi-criteria filtering, price slider, search, sorting and URL synchronization.
 */

class ShopController {
    constructor() {
        this.allProducts = [...PRODUCTS];
        this.filteredProducts = [...PRODUCTS];
        
        // Filter states
        this.activeCategory = 'All';
        this.maxPrice = 35000;
        this.currentPriceFilter = 35000;
        this.searchQuery = '';
        this.activeSort = 'featured';
        this.activeBadge = 'All';
        this.selectedSizes = [];

        this.init();
    }

    init() {
        this.readUrlParams();
        this.initPriceRangeSlider();
        this.bindEvents();
        this.applyFilters();
    }

    readUrlParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('category')) {
            this.activeCategory = params.get('category');
            document.querySelectorAll('.filter-category-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-category').toLowerCase() === this.activeCategory.toLowerCase());
            });
        }
        if (params.has('search')) {
            this.searchQuery = params.get('search');
            const searchInput = document.getElementById('shopSearchInput');
            if (searchInput) searchInput.value = this.searchQuery;
        }
        if (params.has('badge')) {
            this.activeBadge = params.get('badge');
            document.querySelectorAll('.filter-badge-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-badge').toUpperCase() === this.activeBadge.toUpperCase());
            });
        }
        if (params.has('sort')) {
            this.activeSort = params.get('sort');
            const sortSelect = document.getElementById('shopSortSelect');
            if (sortSelect) sortSelect.value = this.activeSort;
        }
    }

    initPriceRangeSlider() {
        const slider = document.getElementById('priceRangeSlider');
        const display = document.getElementById('priceRangeValue');
        if (!slider) return;

        // Find max price in dataset
        const highestPrice = Math.max(...this.allProducts.map(p => p.price));
        this.maxPrice = Math.ceil(highestPrice / 1000) * 1000;
        this.currentPriceFilter = this.maxPrice;

        slider.max = this.maxPrice;
        slider.value = this.maxPrice;
        if (display) display.textContent = formatPrice(this.maxPrice);

        slider.addEventListener('input', (e) => {
            this.currentPriceFilter = parseInt(e.target.value, 10);
            if (display) display.textContent = formatPrice(this.currentPriceFilter);
            this.applyFilters();
        });
    }

    bindEvents() {
        // Category Pills / Buttons
        document.querySelectorAll('.filter-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeCategory = btn.getAttribute('data-category');
                this.updateUrlParam('category', this.activeCategory === 'All' ? null : this.activeCategory);
                this.applyFilters();
            });
        });

        // Search Input in Shop
        const searchInput = document.getElementById('shopSearchInput');
        if (searchInput) {
            let timeout = null;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.searchQuery = e.target.value.trim().toLowerCase();
                    this.updateUrlParam('search', this.searchQuery.length ? this.searchQuery : null);
                    this.applyFilters();
                }, 250);
            });
        }

        // Sort Dropdown
        const sortSelect = document.getElementById('shopSortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.activeSort = e.target.value;
                this.updateUrlParam('sort', this.activeSort);
                this.applyFilters();
            });
        }

        // Badge / Status Pills (Sale, New, All)
        document.querySelectorAll('.filter-badge-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-badge-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeBadge = btn.getAttribute('data-badge');
                this.applyFilters();
            });
        });

        // Size checkboxes
        document.querySelectorAll('.filter-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const size = btn.getAttribute('data-size');
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    this.selectedSizes = this.selectedSizes.filter(s => s !== size);
                } else {
                    btn.classList.add('active');
                    this.selectedSizes.push(size);
                }
                this.applyFilters();
            });
        });

        // Reset all filters button
        const resetBtn = document.getElementById('resetFiltersBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetFilters());
        }

        // Mobile Filter Toggle Drawer
        const openFilterBtn = document.getElementById('mobileFilterToggleBtn');
        const filterSidebar = document.getElementById('shopFilterSidebar');
        const closeFilterBtn = document.getElementById('closeFilterSidebar');

        if (openFilterBtn && filterSidebar) {
            openFilterBtn.addEventListener('click', () => {
                filterSidebar.classList.add('open');
                document.body.classList.add('drawer-open');
            });
        }

        if (closeFilterBtn && filterSidebar) {
            closeFilterBtn.addEventListener('click', () => {
                filterSidebar.classList.remove('open');
                document.body.classList.remove('drawer-open');
            });
        }

        // Grid layout columns switcher (3-col vs 4-col)
        document.querySelectorAll('.grid-layout-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.grid-layout-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cols = btn.getAttribute('data-cols');
                const grid = document.getElementById('shopProductGrid');
                if (grid) {
                    grid.classList.remove('grid-cols-2', 'grid-cols-3', 'grid-cols-4');
                    grid.classList.add(`grid-cols-${cols}`);
                }
            });
        });
    }

    updateUrlParam(key, value) {
        const url = new URL(window.location);
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
        window.history.replaceState({}, '', url);
    }

    applyFilters() {
        let results = [...this.allProducts];

        // 1. Category Filter
        if (this.activeCategory !== 'All') {
            results = results.filter(p => p.category.toLowerCase() === this.activeCategory.toLowerCase());
        }

        // 2. Price Range Filter
        results = results.filter(p => p.price <= this.currentPriceFilter);

        // 3. Search Query Filter
        if (this.searchQuery) {
            results = results.filter(p => 
                p.name.toLowerCase().includes(this.searchQuery) ||
                p.subtitle.toLowerCase().includes(this.searchQuery) ||
                p.category.toLowerCase().includes(this.searchQuery) ||
                p.description.toLowerCase().includes(this.searchQuery)
            );
        }

        // 4. Badge Filter (Sale, New, etc.)
        if (this.activeBadge === 'SALE') {
            results = results.filter(p => p.badge === 'SALE' || p.originalPrice);
        } else if (this.activeBadge === 'NEW') {
            results = results.filter(p => p.isNew || p.badge === 'NEW');
        }

        // 5. Size Filter
        if (this.selectedSizes.length > 0) {
            results = results.filter(p => 
                this.selectedSizes.some(size => p.sizes.includes(size))
            );
        }

        // 6. Sorting
        switch (this.activeSort) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'featured':
            default:
                results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
                break;
        }

        this.filteredProducts = results;
        this.renderProducts();
        this.renderActiveFilterChips();
    }

    renderProducts() {
        const grid = document.getElementById('shopProductGrid');
        const countEl = document.getElementById('productResultsCount');
        const emptyState = document.getElementById('shopEmptyState');

        if (!grid) return;

        if (countEl) {
            countEl.innerHTML = `Showing <strong>${this.filteredProducts.length}</strong> of <strong>${this.allProducts.length}</strong> products`;
        }

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        grid.innerHTML = this.filteredProducts.map(p => renderProductCard(p)).join('');

        // Trigger Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Sync wishlist heart states
        if (window.modCart) {
            window.modCart.updateWishlistIcons();
        }
    }

    renderActiveFilterChips() {
        const container = document.getElementById('activeFilterChips');
        if (!container) return;

        let chips = [];

        if (this.activeCategory !== 'All') {
            chips.push({ label: `Category: ${this.activeCategory}`, removeFn: () => this.resetCategory() });
        }
        if (this.currentPriceFilter < this.maxPrice) {
            chips.push({ label: `Under ${formatPrice(this.currentPriceFilter)}`, removeFn: () => this.resetPrice() });
        }
        if (this.searchQuery) {
            chips.push({ label: `"${this.searchQuery}"`, removeFn: () => this.resetSearch() });
        }
        if (this.activeBadge !== 'All') {
            chips.push({ label: `Tag: ${this.activeBadge}`, removeFn: () => this.resetBadge() });
        }
        this.selectedSizes.forEach(size => {
            chips.push({ label: `Size: ${size}`, removeFn: () => this.removeSize(size) });
        });

        if (chips.length === 0) {
            container.innerHTML = '';
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        container.innerHTML = `
            <div class="active-chips-list">
                ${chips.map((chip, idx) => `
                    <span class="filter-chip">
                        ${chip.label}
                        <button type="button" class="chip-remove-btn" data-chip-idx="${idx}" aria-label="Remove filter">&times;</button>
                    </span>
                `).join('')}
                <button type="button" class="btn-clear-all-filters" id="chipClearAllBtn">Clear All</button>
            </div>
        `;

        // Bind chip remove events
        chips.forEach((chip, idx) => {
            const btn = container.querySelector(`[data-chip-idx="${idx}"]`);
            if (btn) btn.addEventListener('click', chip.removeFn);
        });

        const clearAllBtn = document.getElementById('chipClearAllBtn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.resetFilters());
        }
    }

    resetCategory() {
        this.activeCategory = 'All';
        document.querySelectorAll('.filter-category-btn').forEach(b => {
            if (b.getAttribute('data-category') === 'All') b.classList.add('active');
            else b.classList.remove('active');
        });
        this.updateUrlParam('category', null);
        this.applyFilters();
    }

    resetPrice() {
        const slider = document.getElementById('priceRangeSlider');
        const display = document.getElementById('priceRangeValue');
        this.currentPriceFilter = this.maxPrice;
        if (slider) slider.value = this.maxPrice;
        if (display) display.textContent = formatPrice(this.maxPrice);
        this.applyFilters();
    }

    resetSearch() {
        this.searchQuery = '';
        const searchInput = document.getElementById('shopSearchInput');
        if (searchInput) searchInput.value = '';
        this.updateUrlParam('search', null);
        this.applyFilters();
    }

    resetBadge() {
        this.activeBadge = 'All';
        document.querySelectorAll('.filter-badge-btn').forEach(b => {
            if (b.getAttribute('data-badge') === 'All') b.classList.add('active');
            else b.classList.remove('active');
        });
        this.applyFilters();
    }

    removeSize(size) {
        this.selectedSizes = this.selectedSizes.filter(s => s !== size);
        document.querySelectorAll(`.filter-size-btn[data-size="${size}"]`).forEach(b => b.classList.remove('active'));
        this.applyFilters();
    }

    resetFilters() {
        this.activeCategory = 'All';
        this.searchQuery = '';
        this.activeBadge = 'All';
        this.selectedSizes = [];
        this.currentPriceFilter = this.maxPrice;
        this.activeSort = 'featured';

        // Reset UI inputs
        const searchInput = document.getElementById('shopSearchInput');
        if (searchInput) searchInput.value = '';

        const slider = document.getElementById('priceRangeSlider');
        const display = document.getElementById('priceRangeValue');
        if (slider) slider.value = this.maxPrice;
        if (display) display.textContent = formatPrice(this.maxPrice);

        const sortSelect = document.getElementById('shopSortSelect');
        if (sortSelect) sortSelect.value = 'featured';

        document.querySelectorAll('.filter-category-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-category') === 'All');
        });

        document.querySelectorAll('.filter-badge-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-badge') === 'All');
        });

        document.querySelectorAll('.filter-size-btn').forEach(b => b.classList.remove('active'));

        // Clear URL params
        window.history.replaceState({}, '', window.location.pathname);

        this.applyFilters();
        showToast('All filters have been reset.', 'info');
    }
}

// Auto-instantiate if on shop page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('shopProductGrid')) {
        window.modShop = new ShopController();
    }
});
