// Product Data
const products = [
    {
        id: 1,
        name: "Nova Watch Series X",
        category: "wearables",
        price: 399.99,
        image: "product_1_watch.png",
        description: "The most advanced Nova Watch yet, featuring a circular holographic display and ultra-fast bio-sensors."
    },
    {
        id: 2,
        name: "SonicPods Pro 2",
        category: "audio",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
        description: "Immersive sound, active noise cancellation, and a world-first glowing battery indicator case."
    },
    {
        id: 3,
        name: "NovaBook Ultra",
        category: "tech",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
        description: "The world's slimmest powerhouse laptop. Bezel-less display and neon-integrated keyboard."
    },
    {
        id: 4,
        name: "Orbit Speaker V3",
        category: "audio",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800",
        description: "360-degree spatial audio with gravity-defying bass and synced light shows."
    },
    {
        id: 5,
        name: "Vision Glass Air",
        category: "wearables",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
        description: "Minimalist AR glasses that blend perfectly with your style, delivering data right to your eyes."
    },
    {
        id: 6,
        name: "HyperCharge Pad",
        category: "tech",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800",
        description: "Simultaneous wireless charging for all your Nova devices with cryogenic cooling."
    },
    {
        id: 7,
        name: "NovaTab Air",
        category: "tech",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
        description: "Ultra-slim tablet with a paper-thin holographic display and infinite battery life."
    },
    {
        id: 8,
        name: "AeroPods Studio",
        category: "audio",
        price: 549.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        description: "Professional-grade studio headphones with carbon-fiber architecture and spatial awareness."
    },
    {
        id: 9,
        name: "NovaRing Zen",
        category: "wearables",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=80&w=800",
        description: "A minimalist titanium smart ring that tracks your wellness and neural stress in real-time."
    },
    {
        id: 10,
        name: "CyberKey Pro",
        category: "tech",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        description: "A mechanical keyboard with transparent switches, liquid-cooled RGB, and rapid fire response."
    },
    {
        id: 11,
        name: "NovaLens VR",
        category: "tech",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800",
        description: "The most immersive VR headset ever created, featuring 16K retinal resolution and haptic neural feedback."
    }
];

// App State
let cart = [];
let wishlist = [];
let activeTheme = localStorage.getItem('theme') || 'dark';

// DOM Elements initialized after DOMContentLoaded
let productGrid, cartBtn, wishlistBtn, themeToggle, cartSidebar, wishlistSidebar, overlay, closeButtons, cartCount, wishlistCount, cartTotal, cartItemsContainer, filterBtns, mobileMenuBtn;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements
    productGrid = document.getElementById('product-grid');
    cartBtn = document.getElementById('cart-btn');
    wishlistBtn = document.getElementById('wishlist-btn');
    themeToggle = document.getElementById('theme-toggle');
    cartSidebar = document.getElementById('cart-sidebar');
    wishlistSidebar = document.getElementById('wishlist-sidebar');
    overlay = document.getElementById('overlay');
    closeButtons = document.querySelectorAll('.close-sidebar');
    cartCount = document.querySelector('#cart-btn .badge');
    wishlistCount = document.querySelector('#wishlist-btn .badge');
    cartTotal = document.getElementById('cart-total');
    cartItemsContainer = document.getElementById('cart-items');
    filterBtns = document.querySelectorAll('.filter-btn');
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    // Set initial theme
    setTheme(activeTheme);

    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const enterBtn = document.getElementById('enter-btn');
    const loaderText = document.querySelector('.loader-text');

    setTimeout(() => {
        if (loaderText) loaderText.textContent = "READY FOR DISCOVERY";
        if (enterBtn) enterBtn.classList.add('show');
    }, 3000);

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            if (preloader) preloader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);

            // Reveal Hero Section
            const hero = document.querySelector('.hero');
            if (hero) hero.classList.add('revealed');

            // Initial load
            renderProducts(products);
            updateCartUI();
            updateWishlistUI();
        });
    }

    // Attach general listeners
    attachGlobalListeners();
});

// Theme Logic
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    activeTheme = theme;
}

// Global Listeners
function attachGlobalListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }

    if (cartBtn) cartBtn.addEventListener('click', () => openSidebar(cartSidebar));
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => openSidebar(wishlistSidebar));
    if (overlay) overlay.addEventListener('click', closeAllSidebars);
    if (closeButtons) closeButtons.forEach(btn => btn.addEventListener('click', closeAllSidebars));

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.classList.toggle('active');
        });
    }

    // Filter Logic
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                const filteredProducts = filter === 'all'
                    ? products
                    : products.filter(p => p.category === filter);
                renderProducts(filteredProducts);
            });
        });
    }
}

// Render Products
function renderProducts(productsToRender) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    productsToRender.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Premium+Ready';">
                <div class="card-actions">
                    <button class="card-btn wishlist-toggle" data-id="${product.id}">
                        <i data-lucide="heart" class="${wishlist.includes(product.id) ? 'fill-accent' : ''}"></i>
                    </button>
                    <button class="card-btn view-detail" data-id="${product.id}">
                        <i data-lucide="eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-bottom">
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart-small" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
        initTilt(card);
    });
    lucide.createIcons();
    attachCardListeners();
}

function initTilt(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

// Sidebar Logic
function openSidebar(sidebar) {
    if (!sidebar) return;
    sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllSidebars() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (wishlistSidebar) wishlistSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('active');
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openSidebar(cartSidebar);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    if (!cartCount || !cartTotal || !cartItemsContainer) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.textContent = count;
    cartTotal.textContent = `$${total.toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-state">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: contain;">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i data-lucide="trash-2" size="18"></i>
                </button>
            </div>
        `).join('');
        lucide.createIcons();
    }
}

// Wishlist Logic
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    updateWishlistUI();
    const activeBtn = document.querySelector('.filter-btn.active');
    const filter = activeBtn ? activeBtn.dataset.filter : 'all';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    renderProducts(filteredProducts);
}

function updateWishlistUI() {
    if (!wishlistCount) return;
    wishlistCount.textContent = wishlist.length;
    const container = document.getElementById('wishlist-items');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '<div class="empty-state">Your wishlist is empty</div>';
    } else {
        const wishlistItems = products.filter(p => wishlist.includes(p.id));
        container.innerHTML = wishlistItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: contain;">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
                <button class="remove-item" onclick="toggleWishlist(${item.id})">
                    <i data-lucide="trash-2" size="18"></i>
                </button>
            </div>
        `).join('');
        lucide.createIcons();
    }
}

// Global scope expose
window.removeFromCart = removeFromCart;
window.toggleWishlist = toggleWishlist;
window.addToCart = addToCart;

// Card Listeners
function attachCardListeners() {
    document.querySelectorAll('.add-to-cart-small').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
            btn.textContent = 'Added!';
            btn.style.background = 'var(--accent)';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
            }, 1000);
        });
    });

    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id);
        });
    });

    document.querySelectorAll('.view-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) showProductModal(product);
        });
    });
}

function showProductModal(product) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    const body = modal.querySelector('.modal-body');
    if (!body) return;

    body.innerHTML = `
        <div class="modal-grid">
            <div class="modal-img-container">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Premium+Ready';">
            </div>
            <div class="modal-info">
                <span class="product-category">${product.category}</span>
                <h2>${product.name}</h2>
                <p class="modal-price">$${product.price}</p>
                <p class="modal-desc">${product.description}</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-secondary" onclick="toggleWishlist(${product.id})">
                        <i data-lucide="heart" class="${wishlist.includes(product.id) ? 'fill-accent' : ''}"></i> Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    lucide.createIcons();
}

// Close Modal
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        const modal = document.getElementById('product-modal');
        if (modal) modal.classList.remove('active');
        if (!cartSidebar.classList.contains('active') && !wishlistSidebar.classList.contains('active')) {
            if (overlay) overlay.classList.remove('active');
        }
    });
}
