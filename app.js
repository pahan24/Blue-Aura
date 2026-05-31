/**
 * BLUE AURA - PREMIUM FASHION STORE CORE SPA ENGINE
 */

// Initialize Database & State
const DB = {
  products: [],
  orders: [],
  users: [],
  settings: {
    shippingBase: 350.00,
    promoCodes: {
      "SAVE10": 0.10,
      "BLUE50": 0.50,
      "FREESHIP": 1.00
    },
    googleClientId: "",
    whatsappNumber: "94771234567",
    facebookPixel: "FB-PIXEL-123456",
    googleAnalytics: "G-GA-987654",
    storeName: "Blue Aura Premium Store",
    announcementText: "✨ MID-SEASON SALE: UP TO 50% OFF | USE CODE: <strong>SAVE10</strong> FOR EXTRA 10% OFF ✨",
    homeSlides: [
      {
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop",
        subtitle: "New Season Collection",
        title: "Clean Luxury,<br>Modern Grace",
        link: "#new-in"
      },
      {
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
        subtitle: "Aura Essentials",
        title: "Timeless Comfort,<br>Minimal Design",
        link: "#unisex"
      },
      {
        img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop",
        subtitle: "Women's Collection",
        title: "Effortless Style,<br>Every Season",
        link: "#women"
      }
    ],
    flashSale: {
      enabled: true,
      title: "Limited Flash Sale",
      description: "Get up to <span>50% OFF</span> on selected outerwear. Ends in:",
      link: "#offers",
      linkText: "Shop Flash Sale",
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString()
    },
    offers: [
      { id: 1, title: "Extra 10% Off Sitewide", badge: "SAVE10", description: "Applies sitewide. No minimum required.", active: true },
      { id: 2, title: "Season Closing 50% Off", badge: "BLUE50", description: "Select styles only. Limited stock.", active: true },
      { id: 3, title: "Free Shipping Special", badge: "FREESHIP", description: "Free shipping on your entire order.", active: true }
    ]
  }
};

const STATE = {
  currentRoute: "home",
  routeParams: {},
  cart: [],
  wishlist: [],
  currentUser: null,
  recentlyViewed: [],
  sentEmails: [],
  activePromo: null,
  activeShippingMethod: "standard",
  selectedProductQty: 1,
  selectedColor: null,
  selectedSize: null,
  zoomScale: 1.5,
  isTestingLiveBackend: false,
  liveBackendUrl: "http://localhost:5000"
};

// Firebase configuration: replace with your Firebase Web App settings
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

let firebaseAuthInitialized = false;

function initFirebaseAuth() {
  if (!window.firebase || !window.firebase.initializeApp) {
    logToTerminal('[Firebase] Firebase SDK not loaded. Google login will fall back to prompt mode.');
    return;
  }

  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebaseAuthInitialized = true;
    logToTerminal('[Firebase] Firebase initialized successfully. Google authentication is ready.');
  } catch (err) {
    logToTerminal('[Firebase] Failed to initialize Firebase: ' + err.message);
  }
}

// Initial fashion products data
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Minimalist Soft Knit Hoodie",
    category: "Unisex",
    type: "Hoodies",
    price: 4950.00,
    oldPrice: 6500.00,
    description: "An elegant soft-knit hoodie tailored for absolute comfort. Designed with clean drop-shoulders, ribbed cuffs, and custom metal-tipped drawstrings. A perfect minimal luxury piece.",
    materialInfo: "85% Organic Cotton, 15% Recycled Polyester. French terry interior.",
    shippingInfo: "Ships within 1-2 business days. Flat rate or free shipping on orders over Rs. 10,000.",
    colors: ["Soft Blue", "Charcoal", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    inventory: 15,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 300.00,
    offers: "New In",
    salesCount: 88,
    uploadedAt: "2026-05-20T10:00:00Z"
  },
  {
    id: 2,
    title: "Premium Linen Button Shirt",
    category: "Men",
    type: "Shirts",
    price: 3800.00,
    oldPrice: 4200.00,
    description: "Tailored from light, breathable European flax linen. Feautures a contemporary camp collar, clean mother-of-pearl buttons, and a relaxed box-pleated silhouette.",
    materialInfo: "100% European Flax Linen. Pre-washed for premium softness.",
    shippingInfo: "Standard local courier shipping rates apply. Ships in 2 days.",
    colors: ["White", "Soft Blue", "Sage"],
    sizes: ["M", "L", "XL", "XXL"],
    inventory: 8,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 250.00,
    offers: "10% OFF",
    salesCount: 142,
    uploadedAt: "2026-05-22T08:30:00Z"
  },
  {
    id: 3,
    title: "Aura Fluid Silk Slip Dress",
    category: "Women",
    type: "Dresses",
    price: 7900.00,
    oldPrice: 9500.00,
    description: "A signature elegant bias-cut dress crafted from heavy mulberry silk. Flows effortlessly over the body. Features adjustable delicate cross-back straps and a cowled neckline.",
    materialInfo: "100% 19mm Mulberry Silk. Hand-wash or dry clean only.",
    shippingInfo: "Free shipping available on this luxury piece. Gift wrapping included.",
    colors: ["Navy", "Cream", "Emerald"],
    sizes: ["XS", "S", "M", "L"],
    inventory: 12,
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 400.00,
    offers: "Best Seller",
    salesCount: 210,
    uploadedAt: "2026-05-18T14:20:00Z"
  },
  {
    id: 4,
    title: "Aura Premium Oversized Tee",
    category: "Unisex",
    type: "T-shirts",
    price: 2450.00,
    oldPrice: 2450.00,
    description: "Constructed from ultra-heavyweight cotton. Offers a structural, boxy fit with dropped shoulders and a thick ribbed mock-neck collar. A staple of modern minimal streetwear.",
    materialInfo: "100% Heavy Combed Cotton, 260GSM.",
    shippingInfo: "Ships within 24 hours. Rs. 200 standard shipping fee.",
    colors: ["Black", "White", "Grey", "Soft Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inventory: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 200.00,
    offers: "",
    salesCount: 312,
    uploadedAt: "2026-05-23T06:00:00Z"
  },
  {
    id: 5,
    title: "Relaxed Straight-Leg Jeans",
    category: "Women",
    type: "Jeans",
    price: 5200.00,
    oldPrice: 6800.00,
    description: "Classic high-rise denim with a straight fit through the legs. Crafted from organic non-stretch denim that softens beautifully over time. Vintage wash finish.",
    materialInfo: "100% Organic Denim, 13oz cotton.",
    shippingInfo: "Standard shipping. Free returns inside Colombo.",
    colors: ["Charcoal", "Soft Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventory: 5,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 300.00,
    offers: "25% OFF",
    salesCount: 65,
    uploadedAt: "2026-05-15T11:15:00Z"
  },
  {
    id: 6,
    title: "Eco-Cotton Chino Pants",
    category: "Men",
    type: "Pants",
    price: 4600.00,
    oldPrice: 4600.00,
    description: "Versatile smart-casual chinos tailored in a slim taper. Made from a soft organic cotton twill blend with just a touch of elastane for comfortable stretch.",
    materialInfo: "98% Organic Cotton, 2% Elastane twill.",
    shippingInfo: "Standard shipping rates apply.",
    colors: ["Cream", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inventory: 20,
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 250.00,
    offers: "",
    salesCount: 104,
    uploadedAt: "2026-05-19T09:00:00Z"
  },
  {
    id: 7,
    title: "Minimalist Utility Windbreaker",
    category: "Men",
    type: "Jackets",
    price: 6400.00,
    oldPrice: 8500.00,
    description: "A lightweight water-repellent jacket featuring matte waterproof zippers, adjustable drawstrings, and multiple secure concealed pockets. Designed for minimalists on the go.",
    materialInfo: "100% Recycled Nylon with Durable Water Repellent (DWR) finish.",
    shippingInfo: "Standard shipping rates. Free on orders above Rs. 10,000.",
    colors: ["Black", "Grey"],
    sizes: ["M", "L", "XL", "XXL"],
    inventory: 11,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 350.00,
    offers: "Flash Sale",
    salesCount: 45,
    uploadedAt: "2026-05-21T15:40:00Z"
  },
  {
    id: 8,
    title: "Kids Eco Cotton Romper",
    category: "Kids",
    type: "Kids wear",
    price: 2900.00,
    oldPrice: 3500.00,
    description: "An incredibly soft, hypoallergenic organic cotton romper designed for delicate skin. Features snap buttons along the leg inseam for easy dressing and changing.",
    materialInfo: "100% Certified Organic Interlock Cotton.",
    shippingInfo: "Standard shipping rates apply.",
    colors: ["Cream", "Soft Blue"],
    sizes: ["XS", "S", "M"], // Represents baby sizes
    inventory: 24,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77ebe?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 200.00,
    offers: "New In",
    salesCount: 30,
    uploadedAt: "2026-05-23T04:30:00Z"
  },
  {
    id: 9,
    title: "Double-Breasted Wool Coat",
    category: "Women",
    type: "Jackets",
    price: 13500.00,
    oldPrice: 18000.00,
    description: "A timeless, heavy double-breasted structured overcoat crafted from a luxurious recycled wool blend. Fully lined with peak lapels, side welt pockets, and horn buttons.",
    materialInfo: "70% Recycled Wool, 30% Polyester. Lining: 100% Viscose.",
    shippingInfo: "Free express shipping. Packaged in custom garment box.",
    colors: ["Cream", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inventory: 4,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 500.00,
    offers: "Winter Premium",
    salesCount: 15,
    uploadedAt: "2026-05-10T12:00:00Z"
  },
  {
    id: 10,
    title: "Classic Pima Cotton Tee",
    category: "Men",
    type: "T-shirts",
    price: 1950.00,
    oldPrice: 2200.00,
    description: "Experience absolute luxury in our everyday classic t-shirt. Tailored from Peruvian Pima cotton, renowned for its long staple fibers that yield superior silkiness and resilience.",
    materialInfo: "100% Peruvian Pima Cotton. Rib-knit collar.",
    shippingInfo: "Standard shipping. Ships in 24 hours.",
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inventory: 50,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 200.00,
    offers: "Hot Deal",
    salesCount: 420,
    uploadedAt: "2026-05-14T08:00:00Z"
  },
  {
    id: 11,
    title: "Aura Tailored Trousers",
    category: "Women",
    type: "Pants",
    price: 5800.00,
    oldPrice: 5800.00,
    description: "High-waisted pleated trousers featuring structured wide legs, belt loops, and clean back welt pockets. Perfect for transitioning from office luxury to casual evening outfits.",
    materialInfo: "75% Polyester, 20% Rayon, 5% Spandex.",
    shippingInfo: "Standard shipping rates apply. Free returns.",
    colors: ["Cream", "Black", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventory: 14,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 250.00,
    offers: "",
    salesCount: 89,
    uploadedAt: "2026-05-17T11:40:00Z"
  },
  {
    id: 12,
    title: "Kids Denim dungaree Suit",
    category: "Kids",
    type: "Kids wear",
    price: 3600.00,
    oldPrice: 4500.00,
    description: "An adorable classic denim overall suit paired with a soft striped cotton long sleeve tee. Double stitched seams and adjustable button closures provide long-term durability.",
    materialInfo: "Dungaree: 100% Soft Denim Cotton. Shirt: 100% Cotton knit.",
    shippingInfo: "Standard shipping rates apply.",
    colors: ["Soft Blue"],
    sizes: ["S", "M", "L"],
    inventory: 7,
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop"
    ],
    shippingFee: 200.00,
    offers: "20% OFF",
    salesCount: 18,
    uploadedAt: "2026-05-23T01:10:00Z"
  }
];

// Helper: Format price
function formatPrice(num) {
  return "Rs. " + parseFloat(num).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Helper: Get real-time sky theme properties based on system hours
function getSkyTheme() {
  const hr = new Date().getHours();
  // Morning (5am - 9am)
  if (hr >= 5 && hr < 10) {
    return {
      class: "sky-morning",
      label: "Morning Sky",
      clouds: 3,
      stars: 0,
      celestial: "sun-glow"
    };
  }
  // Day (10am - 4pm)
  if (hr >= 10 && hr < 17) {
    return {
      class: "sky-day-sunny",
      label: "Clear Day Sky",
      clouds: 4,
      stars: 0,
      celestial: "sun-glow"
    };
  }
  // Sunset (5pm - 6pm)
  if (hr >= 17 && hr < 19) {
    return {
      class: "sky-sunset",
      label: "Evening Sunset",
      clouds: 2,
      stars: 0,
      celestial: "sun-glow"
    };
  }
  // Night (7pm - 4am)
  return {
    class: "sky-night",
    label: "Midnight Sky",
    clouds: 1,
    stars: 35,
    celestial: "moon-glow"
  };
}

// Check Backend Connection
async function checkLiveBackend() {
  try {
    const res = await fetch(`${STATE.liveBackendUrl}/api/health`, { method: 'GET' });
    if (res.ok) {
      STATE.isTestingLiveBackend = true;
      logToTerminal(`[API System] Connected to live backend at ${STATE.liveBackendUrl}`);
    } else {
      STATE.isTestingLiveBackend = false;
    }
  } catch (e) {
    STATE.isTestingLiveBackend = false;
  }
}

// Log message to Email simulator terminal
function logToTerminal(msg) {
  const time = new Date().toLocaleTimeString();
  const line = `[${time}] ${msg}`;
  if (!STATE.terminalLogs) {
    STATE.terminalLogs = [];
  }
  STATE.terminalLogs.push(line);
  
  const terminal = document.getElementById("email-sim-terminal-logs");
  if (terminal) {
    terminal.innerHTML += `\n${line}`;
    terminal.scrollTop = terminal.scrollHeight;
  }
  console.log(msg);
}

// Show Toast message
function showToast(message) {
  const container = document.getElementById("toast-messages-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "none";
    toast.offsetHeight; // trigger reflow
    toast.style.animation = "slide-up-toast 0.3s reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Initialize Application Data
function initDB() {
  // Load products
  const storedProducts = localStorage.getItem("blue_aura_products");
  if (!storedProducts) {
    localStorage.setItem("blue_aura_products", JSON.stringify(INITIAL_PRODUCTS));
    DB.products = [...INITIAL_PRODUCTS];
  } else {
    DB.products = JSON.parse(storedProducts);
  }

  // Load orders
  const storedOrders = localStorage.getItem("blue_aura_orders");
  if (!storedOrders) {
    localStorage.setItem("blue_aura_orders", JSON.stringify([]));
    DB.orders = [];
  } else {
    DB.orders = JSON.parse(storedOrders);
  }

  // Load settings
  const storedSettings = localStorage.getItem("blue_aura_settings");
  if (!storedSettings) {
    localStorage.setItem("blue_aura_settings", JSON.stringify(DB.settings));
  } else {
    DB.settings = JSON.parse(storedSettings);
  }

  // Load registered users
  const storedUsers = localStorage.getItem("blue_aura_registered_users");
  if (!storedUsers) {
    const defaultUsers = [
      { email: "jane.doe@gmail.com", firstName: "Jane", lastName: "Doe", dateJoined: "2026-05-12T10:00:00Z", provider: "google" },
      { email: "john.smith@gmail.com", firstName: "John", lastName: "Smith", dateJoined: "2026-05-18T14:30:00Z", provider: "email" }
    ];
    localStorage.setItem("blue_aura_registered_users", JSON.stringify(defaultUsers));
    DB.users = defaultUsers;
  } else {
    DB.users = JSON.parse(storedUsers);
  }

  // Load current user session
  const sessionUser = sessionStorage.getItem("blue_aura_user");
  if (sessionUser) {
    STATE.currentUser = JSON.parse(sessionUser);
  }

  // Load cart and wishlist from localStorage
  const storedCart = localStorage.getItem("blue_aura_cart");
  if (storedCart) STATE.cart = JSON.parse(storedCart);
  
  const storedWishlist = localStorage.getItem("blue_aura_wishlist");
  if (storedWishlist) STATE.wishlist = JSON.parse(storedWishlist);

  updateHeaderCounts();
  loadSimulatedEmails();
  checkLiveBackend();
}

// Sync Local DB back to LocalStorage
function saveProductsToLocalStorage() {
  localStorage.setItem("blue_aura_products", JSON.stringify(DB.products));
}
function saveOrdersToLocalStorage() {
  localStorage.setItem("blue_aura_orders", JSON.stringify(DB.orders));
}
function saveCartToLocalStorage() {
  localStorage.setItem("blue_aura_cart", JSON.stringify(STATE.cart));
  updateHeaderCounts();
}
function saveWishlistToLocalStorage() {
  localStorage.setItem("blue_aura_wishlist", JSON.stringify(STATE.wishlist));
  updateHeaderCounts();
}
function saveUsersToLocalStorage() {
  localStorage.setItem("blue_aura_registered_users", JSON.stringify(DB.users));
}

function updateHeaderCounts() {
  const cartCnt = document.getElementById("cart-count");
  const cartDrawCnt = document.getElementById("cart-drawer-count");
  const wishCnt = document.getElementById("wishlist-count");

  const totalQty = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCnt) cartCnt.innerText = totalQty;
  if (cartDrawCnt) cartDrawCnt.innerText = totalQty;
  if (wishCnt) wishCnt.innerText = STATE.wishlist.length;
}

// Dynamic Search Input Auto suggestion
const searchInput = document.getElementById("search-input-field");
const searchDropdown = document.getElementById("search-suggestions-dropdown");

if (searchInput && searchDropdown) {
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      searchDropdown.classList.remove("active");
      searchDropdown.innerHTML = "";
      return;
    }

    const matches = DB.products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      p.type.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div style="padding: 15px; font-size: 0.85rem; color: var(--grey-dark); text-align: center;">No matches found</div>`;
    } else {
      searchDropdown.innerHTML = matches.map(p => `
        <a href="#product/${p.id}" class="search-result-item">
          <img src="${p.images[0]}" class="search-result-img" alt="${p.title}">
          <div class="search-result-info">
            <div class="search-result-title">${p.title}</div>
            <div class="search-result-price">${formatPrice(p.price)}</div>
          </div>
        </a>
      `).join("");
    }
    searchDropdown.classList.add("active");
  });

  // Close dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove("active");
    }
  });
}

// Router Implementation
function router() {
  const hash = window.location.hash || "#home";
  const [route, param] = hash.slice(1).split("/");
  
  STATE.currentRoute = route;
  STATE.routeParams = { id: param };

  // Track page view logs
  logToTerminal(`[Analytics] Page View: ${route} ${param ? 'ID: ' + param : ''}`);
  
  // Highlight active nav item
  const menuLinks = document.querySelectorAll("#nav-menu-links .nav-item");
  menuLinks.forEach(item => {
    const link = item.querySelector("a");
    if (link && link.getAttribute("href") === `#${route}`) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Close mobile drawer if active
  const navMenu = document.getElementById("nav-menu-links");
  if (navMenu) navMenu.classList.remove("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "instant" });

  // Route Dispatcher
  switch(route) {
    case "home":
      renderHome();
      break;
    case "new-in":
      renderNewIn();
      break;
    case "women":
    case "men":
    case "unisex":
    case "kids":
      renderCategory(route);
      break;
    case "offers":
      renderOffers();
      break;
    case "contact":
      renderContact();
      break;
    case "about-us":
      renderAboutUs();
      break;
    case "account":
      renderAccount();
      break;
    case "wishlist":
      renderWishlist();
      break;
    case "cart":
      renderCartPage();
      break;
    case "checkout":
      renderCheckout();
      break;
    case "tracking":
      renderOrderTracking();
      break;
    case "privacy-policy":
      renderPrivacyPolicy();
      break;
    case "terms-conditions":
      renderTermsConditions();
      break;
    case "shipping-policy":
      renderShippingPolicy();
      break;
    case "returns-refunds":
      renderReturnsRefunds();
      break;
    case "product":
      renderProductDetail(param);
      break;
    case "admin":
      if (sessionStorage.getItem("admin_authenticated") !== "true") {
        window.location.hash = "admin-login";
      } else {
        renderAdminDashboard();
      }
      break;
    case "admin-login":
      renderAdminLogin();
      break;
    default:
      renderHome();
  }

  // Trigger smooth transition animation on route changes
  viewport.classList.remove("animate-fade-up");
  void viewport.offsetWidth; // Force DOM reflow
  viewport.classList.add("animate-fade-up");
}

// Main Viewport Container
const viewport = document.getElementById("app-viewport");

// ----------------------------------------
// ROUTE RENDERERS
// ----------------------------------------

// Page 1: Home View
function renderHome() {
  const slides = DB.settings.homeSlides || [
    {
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop",
      subtitle: "New Season Collection",
      title: "Clean Luxury,<br>Modern Grace",
      link: "#new-in"
    },
    {
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
      subtitle: "Aura Essentials",
      title: "Timeless Comfort,<br>Minimal Design",
      link: "#unisex"
    }
  ];

  const flash = DB.settings.flashSale || {};
  const activeOffers = (DB.settings.offers || []).filter(o => o.active);

  let html = `
    <!-- Hero: Full-Bleed Photo Slider -->
    <div class="hero-parallax" id="home-hero-slider">
      ${slides.map((s, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}">
          <img src="${s.img}" class="hero-slide-photo" alt="${s.subtitle}">
          <div class="hero-slide-overlay"></div>
          <div class="hero-slide-wrap">
            <div class="hero-slide-content">
              <span class="hero-subtitle">${s.subtitle}</span>
              <h1 class="hero-title">${s.title}</h1>
              <a href="${s.link}" class="btn btn-outline-white">Explore Collection</a>
            </div>
          </div>
        </div>
      `).join("")}

      <div class="slider-dots">
        ${slides.map((_, idx) => `
          <div class="slider-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}"></div>
        `).join("")}
      </div>
    </div>

    <!-- Featured Categories -->
    <section class="section-padding container">
      <h2 class="section-title">Shop by Category</h2>
      <p class="section-subtitle">Curated Minimal Collections</p>
      
      <div class="categories-grid">
        <div class="category-card" onclick="window.location.hash='women'">
          <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop" class="category-img" alt="Women collection">
          <div class="category-overlay">
            <h3 class="category-name">Women</h3>
            <span class="category-shop-now">Shop Now <i class="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </div>
        <div class="category-card" onclick="window.location.hash='men'">
          <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop" class="category-img" alt="Men collection">
          <div class="category-overlay">
            <h3 class="category-name">Men</h3>
            <span class="category-shop-now">Shop Now <i class="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </div>
        <div class="category-card" onclick="window.location.hash='unisex'">
          <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop" class="category-img" alt="Unisex collection">
          <div class="category-overlay">
            <h3 class="category-name">Unisex</h3>
            <span class="category-shop-now">Shop Now <i class="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </div>
        <div class="category-card" onclick="window.location.hash='kids'">
          <img src="https://images.unsplash.com/photo-1519689680058-324335c77ebe?q=80&w=600&auto=format&fit=crop" class="category-img" alt="Kids collection">
          <div class="category-overlay">
            <h3 class="category-name">Kids</h3>
            <span class="category-shop-now">Shop Now <i class="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals Slider Section -->
    <section class="section-padding bg-light" style="border-top:1px solid var(--grey-light); border-bottom:1px solid var(--grey-light);">
      <div class="container">
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-subtitle">Fresh updates to your wardrobe</p>
        
        <div class="products-grid">
          ${renderProductListMarkup(DB.products.slice(0, 4))}
        </div>
        <div style="text-align: center; margin-top: 45px;">
          <a href="#new-in" class="btn btn-primary">View All New In</a>
        </div>
      </div>
    </section>

    <!-- Flash Sale Banner -->
    <section class="flash-sale-banner">
      <div class="container flash-sale-content">
        <div class="flash-sale-text">
          <h2>Limited Flash Sale</h2>
          <p>Get up to <span>50% OFF</span> on selected outerwear. Ends in:</p>
        </div>
        
        <div class="countdown-timer" id="flashCountdown">
          <div class="countdown-item">
            <span class="countdown-num" id="cd-hours">03</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-num" id="cd-minutes">45</span>
            <span class="countdown-label">Mins</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-num" id="cd-seconds">12</span>
            <span class="countdown-label">Secs</span>
          </div>
        </div>
        <div>
          <a href="#offers" class="btn btn-accent">Shop Flash Sale</a>
        </div>
      </div>
    </section>

    <!-- Best Sellers Section -->
    <section class="section-padding container">
      <h2 class="section-title">Best Sellers</h2>
      <p class="section-subtitle">Most loved by our community</p>
      
      <div class="products-grid">
        ${renderProductListMarkup(DB.products.filter(p => p.salesCount > 100).slice(0, 4))}
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="section-padding bg-light" style="border-top: 1px solid var(--grey-light);">
      <div class="container">
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-subtitle">Testimonials of luxury comfort</p>
        
        <div class="reviews-slider">
          <div class="review-card">
            <div class="review-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="review-text">"Absolutely love the Linen Shirt! The texture is incredibly soft, and it stays cool even in high heat. Worth every rupee."</p>
            <h4 class="review-author">- Sameera K.</h4>
            <span class="review-date">May 12, 2026</span>
          </div>
          <div class="review-card">
            <div class="review-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="review-text">"The silk slip dress is gorgeous. Fits like a glove and flows beautifully. Blue Aura's service is top-notch."</p>
            <h4 class="review-author">- Dilani F.</h4>
            <span class="review-date">May 19, 2026</span>
          </div>
          <div class="review-card">
            <div class="review-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
            <p class="review-text">"Minimal, clean aesthetic. The heavy-weight hoodies have exactly the boxy silhouette I was looking for. Will buy again."</p>
            <h4 class="review-author">- Ranuka P.</h4>
            <span class="review-date">May 21, 2026</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Gallery -->
    <section class="section-padding container" style="padding-bottom: 0;">
      <h2 class="section-title">Follow Us @BlueAura</h2>
      <p class="section-subtitle">Share your luxury style on Instagram</p>
      
      <div class="insta-gallery">
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="insta-item">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop" class="insta-img" alt="Insta">
          <div class="insta-overlay"><i class="fa-brands fa-instagram"></i></div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section-padding newsletter-section">
      <div class="container newsletter-wrapper">
        <h2 class="newsletter-title">Join The Inner Circle</h2>
        <p class="newsletter-desc">Subscribe to receive exclusive access to capsule collections, private events, and a 10% discount on your first order.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('Thank you for subscribing! Check your email for code.');">
          <input type="email" class="newsletter-input" placeholder="Your Email Address" required>
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  `;
  viewport.innerHTML = html;

  // Initialize Home Hero Slider Logic
  initHeroSlider();
  // Countdown Timer Logic
  initFlashCountdown();
}

// ─── Hero Slider: Parallax Photo Slider Logic ───────────────────────────────
function initHeroSlider() {
  const slider = document.getElementById('home-hero-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.hero-slide');
  const dots   = slider.querySelectorAll('.slider-dot');
  const counter = document.getElementById('hero-counter');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let current = 0;
  let autoTimer = null;

  function updateCounter() {
    if (counter) counter.textContent = `${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
    updateCounter();
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(current + 1), 5500);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-idx')));
      startAuto();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', startAuto);

  // Touch swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { goToSlide(diff > 0 ? current + 1 : current - 1); startAuto(); }
  });

  updateCounter();
  startAuto();
}

// Compatibility shim (old code may call this)
function updateHero3DGarment(idx) {
  const box = document.getElementById("hero-3d-carousel-box");
  if (!box) return;

  // Select target products to cycle
  const targetIds = [1, 3, 2];
  const pId = targetIds[idx % targetIds.length];
  const p = DB.products.find(x => x.id === pId) || DB.products[0];
  if (!p) return;

  box.innerHTML = `
    <div class="garment-3d-card rotate-active" onclick="window.location.hash='product/${p.id}'">
      <img src="${p.images[0]}" class="garment-3d-img" alt="${p.title}">
      <div class="garment-3d-title">${p.title}</div>
      <div style="font-size:0.85rem; color:var(--accent-color); font-weight:600; margin-top:5px; transform:translateZ(10px);">${formatPrice(p.price)}</div>
    </div>
  `;
}

// Hero slider animations
function initHeroSlider() {
  const slider = document.getElementById("home-hero-slider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".hero-slide");
  const dots = slider.querySelectorAll(".slider-dot");
  let current = 0;
  
  // Set first 3D item
  updateHero3DGarment(0);
  
  let interval = setInterval(nextSlide, 6000);

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function goToSlide(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    
    // Cycle the 3D garment
    updateHero3DGarment(current);
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      goToSlide(parseInt(dot.getAttribute("data-idx")));
      interval = setInterval(nextSlide, 6000);
    });
  });
}

function initFlashCountdown() {
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');
  const sEl = document.getElementById('cd-seconds');
  if (!hEl) return;

  // Use DB-driven end time
  const endTime = DB.settings.flashSale && DB.settings.flashSale.endTime
    ? new Date(DB.settings.flashSale.endTime).getTime()
    : Date.now() + 3 * 60 * 60 * 1000 + 45 * 60 * 1000;

  const timer = setInterval(() => {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      hEl.innerText = '00'; mEl.innerText = '00'; sEl.innerText = '00';
      clearInterval(timer); return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.innerText = String(h).padStart(2, '0');
    mEl.innerText = String(m).padStart(2, '0');
    sEl.innerText = String(s).padStart(2, '0');
  }, 1000);
}

// Page 2: New In View (Show latest uploaded products first)
function renderNewIn() {
  // Sort products by upload date descending
  const sortedProducts = [...DB.products].sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  
  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">New In</h1>
      <p class="section-subtitle">The Latest Modern Silhouette Drops</p>
      
      <div class="category-page-layout">
        <!-- Sidebar filters -->
        ${renderFiltersSidebarMarkup()}
        
        <div>
          <!-- Sort/Toolbar -->
          <div class="category-toolbar">
            <span class="products-count">${sortedProducts.length} Items Found</span>
            <button class="mobile-filter-trigger" onclick="toggleMobileFilters()"><i class="fa-solid fa-sliders"></i> Filters</button>
            <select class="sorting-select" id="sort-select" onchange="sortCategoryProducts()">
              <option value="newest" selected>Newest First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="bestselling">Best Selling</option>
            </select>
          </div>
          
          <div class="products-grid" id="category-products-grid">
            ${renderProductListMarkup(sortedProducts)}
          </div>
        </div>
      </div>
    </div>
  `;

  bindFilterEvents(sortedProducts, "New In");
}

// Pages 3, 4, 5, 6: Category views (Women, Men, Unisex, Kids)
function renderCategory(categoryName) {
  const capCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const catProducts = DB.products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">${capCategory} Collection</h1>
      <p class="section-subtitle">Luxury basics and premium cuts for ${capCategory}</p>
      
      <div class="category-page-layout">
        ${renderFiltersSidebarMarkup()}
        
        <div>
          <div class="category-toolbar">
            <span class="products-count">${catProducts.length} Items Found</span>
            <button class="mobile-filter-trigger" onclick="toggleMobileFilters()"><i class="fa-solid fa-sliders"></i> Filters</button>
            <select class="sorting-select" id="sort-select" onchange="sortCategoryProducts()">
              <option value="bestselling">Best Selling</option>
              <option value="newest">Newest First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
          
          <div class="products-grid" id="category-products-grid">
            ${renderProductListMarkup(catProducts)}
          </div>
        </div>
      </div>
    </div>
  `;

  bindFilterEvents(catProducts, capCategory);
}

// Sidebar markup generator
function renderFiltersSidebarMarkup() {
  return `
    <aside class="filters-sidebar" id="filters-sidebar-pane">
      <div class="filter-widget">
        <h3 class="filter-title">Product Categories</h3>
        <ul class="filter-list">
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="T-shirts"> T-shirts</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Shirts"> Shirts</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Dresses"> Dresses</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Hoodies"> Hoodies</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Pants"> Pants</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Jeans"> Jeans</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Jackets"> Jackets</label></li>
          <li><label class="filter-item-label"><input type="checkbox" class="cat-filter" value="Kids wear"> Kids Wear</label></li>
        </ul>
      </div>

      <div class="filter-widget">
        <h3 class="filter-title">Filter by Size</h3>
        <div class="filter-size-grid">
          <button class="filter-size-btn" data-size="XS">XS</button>
          <button class="filter-size-btn" data-size="S">S</button>
          <button class="filter-size-btn" data-size="M">M</button>
          <button class="filter-size-btn" data-size="L">L</button>
          <button class="filter-size-btn" data-size="XL">XL</button>
          <button class="filter-size-btn" data-size="XXL">XXL</button>
        </div>
      </div>

      <div class="filter-widget">
        <h3 class="filter-title">Filter by Color</h3>
        <div class="filter-color-dots">
          <button class="filter-color-btn" style="background-color: #fff;" data-color="White" title="White"></button>
          <button class="filter-color-btn" style="background-color: #0d0d0d;" data-color="Black" title="Black"></button>
          <button class="filter-color-btn" style="background-color: #8db9ff;" data-color="Soft Blue" title="Soft Blue"></button>
          <button class="filter-color-btn" style="background-color: #cbd5e1;" data-color="Grey" title="Grey"></button>
          <button class="filter-color-btn" style="background-color: #f5e6d3;" data-color="Cream" title="Cream"></button>
          <button class="filter-color-btn" style="background-color: #1e3a8a;" data-color="Navy" title="Navy"></button>
          <button class="filter-color-btn" style="background-color: #1a2e1a;" data-color="Charcoal" title="Charcoal"></button>
        </div>
      </div>

      <div class="filter-widget">
        <h3 class="filter-title">Price Range</h3>
        <div class="price-range-inputs">
          <input type="number" id="price-min" placeholder="Min" min="0">
          <span style="color:var(--grey-dark)">-</span>
          <input type="number" id="price-max" placeholder="Max" min="0">
        </div>
        <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 15px;" id="apply-price-btn">Apply Price</button>
      </div>
      
      <div class="filter-widget" style="border: none;">
        <label class="filter-item-label">
          <input type="checkbox" id="stock-availability-filter">
          <span>Show In Stock Only</span>
        </label>
      </div>
    </aside>
  `;
}

// Toggle filters on mobile
function toggleMobileFilters() {
  const sidebar = document.getElementById("filters-sidebar-pane");
  if (sidebar) sidebar.classList.toggle("active");
}

// Binds filtering elements to state
function bindFilterEvents(baseList, tagTitle) {
  let filtered = [...baseList];
  
  const catCheckboxes = document.querySelectorAll(".cat-filter");
  const sizeBtns = document.querySelectorAll(".filter-size-btn");
  const colorBtns = document.querySelectorAll(".filter-color-btn");
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");
  const applyPriceBtn = document.getElementById("apply-price-btn");
  const stockCheck = document.getElementById("stock-availability-filter");
  
  let selectedTypes = [];
  let selectedSizes = [];
  let selectedColors = [];

  function applyAllFilters() {
    filtered = [...baseList];

    // Category Type Filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => selectedTypes.includes(p.type));
    }

    // Size Filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Color Filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // Price Filter
    const minVal = parseFloat(priceMin.value) || 0;
    const maxVal = parseFloat(priceMax.value) || Infinity;
    filtered = filtered.filter(p => p.price >= minVal && p.price <= maxVal);

    // Stock Filter
    if (stockCheck && stockCheck.checked) {
      filtered = filtered.filter(p => p.inventory > 0);
    }

    // Sort order application
    const sorting = document.getElementById("sort-select").value;
    if (sorting === "newest") {
      filtered.sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    } else if (sorting === "low-high") {
      filtered.sort((a,b) => a.price - b.price);
    } else if (sorting === "high-low") {
      filtered.sort((a,b) => b.price - a.price);
    } else if (sorting === "bestselling") {
      filtered.sort((a,b) => b.salesCount - a.salesCount);
    }

    // Render result
    const grid = document.getElementById("category-products-grid");
    if (grid) grid.innerHTML = renderProductListMarkup(filtered);
    
    const countDisplay = document.querySelector(".products-count");
    if (countDisplay) countDisplay.innerText = `${filtered.length} Items Found`;
  }

  // Type clicks
  catCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      selectedTypes = Array.from(catCheckboxes).filter(c => c.checked).map(c => c.value);
      applyAllFilters();
    });
  });

  // Size clicks
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const size = btn.getAttribute("data-size");
      btn.classList.toggle("active");
      if (selectedSizes.includes(size)) {
        selectedSizes = selectedSizes.filter(s => s !== size);
      } else {
        selectedSizes.push(size);
      }
      applyAllFilters();
    });
  });

  // Color clicks
  colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      btn.classList.toggle("active");
      if (selectedColors.includes(color)) {
        selectedColors = selectedColors.filter(c => c !== color);
      } else {
        selectedColors.push(color);
      }
      applyAllFilters();
    });
  });

  // Price click
  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", applyAllFilters);
  }

  // Stock click
  if (stockCheck) {
    stockCheck.addEventListener("change", applyAllFilters);
  }

  // Global window sort handler hook
  window.sortCategoryProducts = applyAllFilters;
}

// Page 7: Offers / Sale Page
function renderOffers() {
  // Products with discounted prices or tags
  const promoProducts = DB.products.filter(p => p.oldPrice > p.price || p.offers);
  
  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Special Offers</h1>
      <p class="section-subtitle">Premium style drops with exceptional value</p>
      
      <!-- Coupon codes display -->
      <div class="offers-slider">
        <div class="offer-coupon-card">
          <div class="coupon-info">
            <h3>EXTRA 10% OFF</h3>
            <p>Applies sitewide. No minimum purchase required.</p>
          </div>
          <button class="coupon-code-badge" onclick="copyCouponCode('SAVE10')">SAVE10</button>
        </div>
        <div class="offer-coupon-card" style="border-color: var(--sale-color);">
          <div class="coupon-info">
            <h3>SEASON CLOSING 50%</h3>
            <p>Applicable on select styles only. Limited stock.</p>
          </div>
          <button class="coupon-code-badge" style="border-color: var(--sale-color);" onclick="copyCouponCode('BLUE50')">BLUE50</button>
        </div>
      </div>
      
      <div class="products-grid">
        ${renderProductListMarkup(promoProducts)}
      </div>
    </div>
  `;
}

function copyCouponCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Coupon code ${code} copied to clipboard!`);
  });
}

// Page 8: Contact Page
function renderContact() {
  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Contact Us</h1>
      <p class="section-subtitle">We are here to assist with your shopping journey</p>
      
      <div class="contact-layout">
        <div class="contact-info-block">
          <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">Get In Touch</h2>
          
          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div class="contact-info-text">
              <h4>Flagship Store Location</h4>
              <p>100 Fashion Street, Colombo 03, Sri Lanka</p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fa-solid fa-phone"></i></div>
            <div class="contact-info-text">
              <h4>Direct Support lines</h4>
              <p>+94 11 234 5678 (Hotline)</p>
              <p>+94 77 123 4567 (WhatsApp Chat)</p>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fa-solid fa-envelope"></i></div>
            <div class="contact-info-text">
              <h4>Official Email Contacts</h4>
              <p>care@blue-aura-fashion.com</p>
              <p>inquiries@blue-aura-fashion.com</p>
            </div>
          </div>

          <!-- Quick WhatsApp Link Button -->
          <a href="https://wa.me/94771234567?text=Hello%20Blue%20Aura!%20I'd%20like%20to%20know%20more%20about..." class="btn btn-secondary" style="margin-top: 15px; display: inline-flex; align-items: center; gap:10px;" target="_blank">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; color: #25d366;"></i> Chat on WhatsApp
          </a>
        </div>
        
        <div class="checkout-section-block" style="margin-bottom: 0;">
          <h2 style="font-family: var(--font-heading); margin-bottom: 25px;">Send a Message</h2>
          <form class="form-grid" onsubmit="event.preventDefault(); showToast('Thank you! Your message has been received.'); this.reset();">
            <div class="form-field">
              <label for="c-name">Full Name</label>
              <input type="text" id="c-name" required>
            </div>
            <div class="form-field">
              <label for="c-email">Email Address</label>
              <input type="email" id="c-email" required>
            </div>
            <div class="form-field form-group-full">
              <label for="c-subject">Subject</label>
              <input type="text" id="c-subject" required>
            </div>
            <div class="form-field form-group-full">
              <label for="c-msg">Your Message</label>
              <textarea id="c-msg" rows="5" required></textarea>
            </div>
            <div class="form-group-full" style="text-align: right;">
              <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Message</button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Embedded Google Map -->
      <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.829166922572!2d79.8480371!3d6.9109789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259419b489ad7%3A0xe543c7b3ec551c6b!2sGalle%20Face%20Green!5e0!3m2!1sen!2slk!4v1680000000000!5m2!1sen!2slk" loading="lazy"></iframe>
      </div>
    </div>
  `;
}

// Page 9: About Us Page
function renderAboutUs() {
  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Our Story</h1>
      <p class="section-subtitle">Crafting clean luxury aesthetics since 2026</p>
      
      <div class="contact-layout" style="align-items: center;">
        <div>
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" style="border-radius: 4px; box-shadow: var(--soft-shadow);" alt="Fashion workshop">
        </div>
        <div>
          <h2 style="font-family: var(--font-heading); margin-bottom: 20px; font-size: 2rem;">Aura of Blue</h2>
          <p style="color: var(--grey-dark); margin-bottom: 15px; font-size: 0.95rem;">
            Blue Aura was founded on a singular philosophy: luxury should be clean, modern, and effortless. We noticed the market filled with fast fashion that loses color, style, and structure after a few washes. 
          </p>
          <p style="color: var(--grey-dark); margin-bottom: 15px; font-size: 0.95rem;">
            Our designers focus on architectural cuts, premium soft fabrics, and harmonious tone palettes. The soft blue aura is our signature marker of calmness, premium quality, and subtle confidence.
          </p>
          <p style="color: var(--grey-dark); font-size: 0.95rem;">
            Every single piece is ethically sourced, supporting textile craftsmen. Our garments are engineered to stand the test of time, ensuring they fit seamlessly into your sustainable high-end wardrobe.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Page 10: Login & Register View
function renderAccount() {
  if (STATE.currentUser) {
    renderMyAccount();
    return;
  }

  renderLoginView();
}

function renderLoginView() {
  viewport.innerHTML = `
    <div class="container section-padding">
      <div class="auth-container">
        <h1 class="auth-title">Log In</h1>
        
        <!-- Google Login Integration -->
        <button class="social-login-btn" onclick="triggerGoogleLogin()">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" style="width:16px;" alt="Google">
          <span>Continue with Google</span>
        </button>
        
        <div class="auth-separator">or login with email / username</div>
        
        <form class="form-grid" onsubmit="handleEmailLogin(event)">
          <div class="form-field form-group-full">
            <label for="l-email">Email or Username</label>
            <input type="text" id="l-email" placeholder="Email address or username" required>
          </div>
          <div class="form-field form-group-full">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:10px;">
              <label for="l-pass">Password</label>
              <a href="#" onclick="triggerForgotPassword(event)" style="font-size:0.75rem; text-decoration:underline;">Forgot Password?</a>
            </div>
            <input type="password" id="l-pass" required placeholder="Secure password">
          </div>
          <button type="submit" class="btn btn-primary form-group-full" style="margin-top:10px;">Log In</button>
        </form>
        <p style="margin-top:18px; font-size:0.82rem; color: var(--grey-dark); text-align:center;">Admin access: <strong>blueaura</strong> / <strong>ba123</strong></p>
        <div class="auth-switch">
          Don't have an account? <a href="#" onclick="event.preventDefault(); renderRegisterView();">Create Account</a>
        </div>
      </div>
    </div>
  `;
}

function renderRegisterView() {
  viewport.innerHTML = `
    <div class="container section-padding">
      <div class="auth-container">
        <h1 class="auth-title">Register Account</h1>
        
        <button class="social-login-btn" onclick="triggerGoogleLogin()">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" style="width:16px;" alt="Google">
          <span>Sign up with Google</span>
        </button>
        
        <div class="auth-separator">or create an email account</div>
        
        <form class="form-grid" onsubmit="handleEmailRegister(event)">
          <div class="form-field">
            <label for="r-first">First Name</label>
            <input type="text" id="r-first" required>
          </div>
          <div class="form-field">
            <label for="r-last">Last Name</label>
            <input type="text" id="r-last" required>
          </div>
          <div class="form-field form-group-full">
            <label for="r-email">Email Address</label>
            <input type="email" id="r-email" required>
          </div>
          <div class="form-field form-group-full">
            <label for="r-pass">Password</label>
            <input type="password" id="r-pass" required>
          </div>
          <button type="submit" class="btn btn-primary form-group-full" style="margin-top:10px;">Create Account</button>
        </form>
        
        <div class="auth-switch">
          Already have an account? <a href="#" onclick="event.preventDefault(); renderLoginView();">Log In</a>
        </div>
      </div>
    </div>
  `;
}

// Simulated Auth Handlers
function triggerGoogleLogin() {
  if (firebaseAuthInitialized && window.firebase && window.firebase.auth) {
    const provider = new firebase.auth.GoogleAuthProvider();
    showToast("Signing in with Google...");

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const profile = result.user;
        const mockGoogleUser = {
          email: profile.email,
          firstName: profile.displayName ? profile.displayName.split(' ')[0] : 'Google',
          lastName: profile.displayName ? profile.displayName.split(' ').slice(1).join(' ') : 'User',
          picture: profile.photoURL || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
          provider: "google"
        };

        STATE.currentUser = mockGoogleUser;
        sessionStorage.setItem("blue_aura_user", JSON.stringify(mockGoogleUser));

        const exists = DB.users.find(u => u.email.toLowerCase() === mockGoogleUser.email.toLowerCase());
        if (!exists) {
          DB.users.push({
            email: mockGoogleUser.email,
            firstName: mockGoogleUser.firstName,
            lastName: mockGoogleUser.lastName,
            dateJoined: new Date().toISOString(),
            provider: "google"
          });
          saveUsersToLocalStorage();
        }

        triggerSMTPLoginAlert(mockGoogleUser);
        logToTerminal(`[Firebase Google] Signed in as ${mockGoogleUser.email}`);
        showToast(`Welcome back, ${mockGoogleUser.firstName}!`);
        window.location.hash = "account";
      })
      .catch((err) => {
        logToTerminal(`[Firebase Google] Login failed: ${err.message}`);
        showToast("Google login failed. Please try again.");
      });
  } else {
    logToTerminal("[Google Login] Firebase not ready; falling back to simulated prompt.");
    triggerGoogleLoginSim();
  }
}

function triggerGoogleLoginSim() {
  logToTerminal("[Google OAuth] Launching fallback sign-in prompt...");
  showToast("Opening Google Account selector...");
  
  setTimeout(() => {
    const emailInput = prompt("Enter your Google email to continue:", "jane.doe@gmail.com");
    if (!emailInput) {
      showToast("Google sign-in cancelled.");
      return;
    }

    const email = emailInput.trim().toLowerCase();
    const firstName = email.split('@')[0].split('.')[0].replace(/[^a-zA-Z]/g, '');
    const lastName = email.split('@')[0].split('.')[1] || 'User';

    const mockGoogleUser = {
      email: email,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1) || 'Google',
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1) || 'User',
      picture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      provider: "google"
    };

    STATE.currentUser = mockGoogleUser;
    sessionStorage.setItem("blue_aura_user", JSON.stringify(mockGoogleUser));
    
    const exists = DB.users.find(u => u.email.toLowerCase() === mockGoogleUser.email.toLowerCase());
    if (!exists) {
      DB.users.push({
        email: mockGoogleUser.email,
        firstName: mockGoogleUser.firstName,
        lastName: mockGoogleUser.lastName,
        dateJoined: new Date().toISOString(),
        provider: "google"
      });
      saveUsersToLocalStorage();
    }
    
    triggerSMTPLoginAlert(mockGoogleUser);
    
    logToTerminal(`[Google OAuth] Fallback sign-in successful for ${mockGoogleUser.email}`);
    showToast(`Welcome, ${mockGoogleUser.firstName}! Logged in with Google.`);
    window.location.hash = "account";
  }, 1200);
}

function handleEmailLogin(e) {
  e.preventDefault();
  const loginValue = document.getElementById("l-email").value.trim();
  const pass = document.getElementById("l-pass").value;
  const normalized = loginValue.toLowerCase();

  // Admin credentials route from the same login panel
  if (normalized === "blueaura" && pass === "ba123") {
    sessionStorage.setItem("admin_authenticated", "true");
    logToTerminal("[Admin Security] Admin login successful from main login panel.");
    showToast("Admin access granted. Redirecting to dashboard...");
    window.location.hash = "admin";
    return;
  }

  const mockUser = {
    email: normalized.includes("@") ? normalized : `${normalized}@blueaura.com`,
    firstName: normalized.includes("@") ? normalized.split("@")[0] : normalized,
    lastName: "Member",
    picture: "",
    provider: "email"
  };

  STATE.currentUser = mockUser;
  sessionStorage.setItem("blue_aura_user", JSON.stringify(mockUser));
  
  // Sync user in list
  const exists = DB.users.find(u => u.email.toLowerCase() === mockUser.email.toLowerCase());
  if (!exists) {
    DB.users.push({
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      dateJoined: new Date().toISOString(),
      provider: "email"
    });
    saveUsersToLocalStorage();
  }
  
  // Send email alert
  triggerSMTPLoginAlert(mockUser);
  
  logToTerminal(`[Auth System] User logged in: ${mockUser.email}`);
  showToast(`Welcome back, ${mockUser.firstName}!`);
  window.location.hash = "account";
}

function handleEmailRegister(e) {
  e.preventDefault();
  const first = document.getElementById("r-first").value.trim();
  const last = document.getElementById("r-last").value.trim();
  const email = document.getElementById("r-email").value.trim();

  const mockUser = {
    email: email,
    firstName: first,
    lastName: last,
    picture: "",
    provider: "email"
  };

  STATE.currentUser = mockUser;
  sessionStorage.setItem("blue_aura_user", JSON.stringify(mockUser));
  
  // Save new register to database
  const exists = DB.users.find(u => u.email.toLowerCase() === mockUser.email.toLowerCase());
  if (!exists) {
    DB.users.push({
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      dateJoined: new Date().toISOString(),
      provider: "email"
    });
    saveUsersToLocalStorage();
  }
  
  // Send email alert
  triggerSMTPLoginAlert(mockUser);
  
  logToTerminal(`[Auth System] User registered: ${email}`);
  showToast(`Welcome to Blue Aura, ${mockUser.firstName}! Your account is ready.`);
  window.location.hash = "account";
}

function triggerForgotPassword(e) {
  e.preventDefault();
  const email = prompt("Enter your registered email address:");
  if (email) {
    logToTerminal(`[SMTP Service] Reset password request received for ${email}. Dispatching reset links...`);
    showToast("Password reset link has been sent to your email!");
  }
}

// Page 11: My Account View
function renderMyAccount() {
  const user = STATE.currentUser;
  const userOrders = DB.orders.filter(o => o.email.toLowerCase() === user.email.toLowerCase());
  const userMsgs = STATE.sentEmails.filter(e => e.to.toLowerCase() === user.email.toLowerCase());

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">My Account</h1>
      <p class="section-subtitle">Welcome back, ${user.firstName} ${user.lastName}</p>
      
      <div class="account-layout">
        <aside>
          <ul class="account-sidebar-menu">
            <li class="account-menu-item active" onclick="switchAccountTab('dashboard')"><i class="fa-solid fa-gauge"></i> Dashboard</li>
            <li class="account-menu-item" onclick="switchAccountTab('orders')"><i class="fa-solid fa-box"></i> Orders (${userOrders.length})</li>
            <li class="account-menu-item" onclick="switchAccountTab('messages')"><i class="fa-solid fa-envelope"></i> Messages ${userMsgs.length > 0 ? `<span style="background:var(--accent-color);color:#0d0d0d;font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:20px;margin-left:6px;">${userMsgs.length}</span>` : ''}</li>
            <li class="account-menu-item" onclick="switchAccountTab('addresses')"><i class="fa-solid fa-address-book"></i> Addresses</li>
            <li class="account-menu-item" onclick="logoutUser()" style="color:var(--sale-color); margin-top: 30px;"><i class="fa-solid fa-sign-out-alt"></i> Logout</li>
          </ul>
        </aside>
        
        <div id="account-tab-content">
          <!-- Render dashboard initially -->
          ${renderAccountDashboardTab(user, userOrders)}
        </div>
      </div>
    </div>
  `;
}

function renderAccountDashboardTab(user, orders) {
  return `
    <div class="checkout-section-block" style="margin-bottom: 0;">
      <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">Profile Summary</h2>
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 30px;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background-color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: var(--primary-color);">
          ${user.picture ? `<img src="${user.picture}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` : user.firstName.charAt(0)}
        </div>
        <div>
          <h3>${user.firstName} ${user.lastName}</h3>
          <p style="color: var(--grey-dark); font-size: 0.9rem;">Email: ${user.email}</p>
          <p style="color: var(--grey-dark); font-size: 0.8rem;">Login Provider: ${user.provider.toUpperCase()}</p>
        </div>
      </div>
      
      <h3 style="font-size:1.1rem; margin-bottom:15px; font-weight: 600;">Recent Order</h3>
      ${orders.length === 0 ? `
        <p style="color: var(--grey-dark); font-size: 0.9rem;">You haven't placed any orders yet. <a href="#new-in" style="text-decoration: underline; color: var(--primary-color);">Shop now</a></p>
      ` : `
        <div style="border: 1px solid var(--grey-medium); padding: 20px; border-radius: 4px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <strong>Order ID: ${orders[0].id}</strong>
            <span class="badge-status ${orders[0].status}">${orders[0].status}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--grey-dark); margin-bottom:10px;">Placed on: ${new Date(orders[0].date).toLocaleDateString()}</p>
          <p style="font-size:0.9rem; font-weight:600;">Total: ${formatPrice(orders[0].total)}</p>
        </div>
      `}
    </div>
  `;
}

function switchAccountTab(tabName) {
  const contentDiv = document.getElementById("account-tab-content");
  const menuItems = document.querySelectorAll(".account-menu-item");
  if (!contentDiv) return;

  const user = STATE.currentUser;
  const userOrders = DB.orders.filter(o => o.email.toLowerCase() === user.email.toLowerCase());

  // Active state styling
  menuItems.forEach(item => {
    if (item.innerText.toLowerCase().includes(tabName)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  if (tabName === 'dashboard') {
    contentDiv.innerHTML = renderAccountDashboardTab(user, userOrders);
  } else if (tabName === 'messages') {
    const msgs = STATE.sentEmails.filter(e => e.to.toLowerCase() === user.email.toLowerCase());
    contentDiv.innerHTML = `
      <div class="checkout-section-block" style="margin-bottom:0;">
        <h2 style="font-family:var(--font-heading); margin-bottom:20px;">My Messages</h2>
        ${msgs.length === 0 ? `<p style="color:var(--grey-dark); font-size:0.9rem;">No messages yet. Confirm an order to receive email notifications here.</p>` : `
          <div style="display:flex; gap:16px; height:480px;">
            <div style="width:240px; flex-shrink:0; border:1px solid var(--grey-light); border-radius:8px; overflow-y:auto;">
              ${msgs.map((m, i) => `
                <div onclick="renderAccountMessageBody(${i})" id="acct-msg-item-${i}" style="padding:12px 14px; border-bottom:1px solid var(--grey-light); cursor:pointer; transition:background 0.2s;" onmouseover="this.style.background='var(--bg-light)'" onmouseout="this.style.background=''">
                  <div style="font-size:0.8rem; font-weight:600; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.subject}</div>
                  <div style="font-size:0.72rem; color:var(--grey-dark);">${new Date(m.timestamp).toLocaleDateString()}</div>
                </div>
              `).join('')}
            </div>
            <div id="acct-msg-body" style="flex:1; border:1px solid var(--grey-light); border-radius:8px; padding:20px; overflow-y:auto; font-size:0.88rem;">
              <p style="color:var(--grey-dark); text-align:center; margin-top:60px;"><i class="fa-solid fa-envelope-open" style="font-size:2rem; display:block; margin-bottom:12px;"></i>Select a message to read</p>
            </div>
          </div>
        `}
      </div>
    `;
  } else if (tabName === 'orders') {
    contentDiv.innerHTML = `
      <div class="checkout-section-block" style="margin-bottom: 0;">
        <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">Order History</h2>
        ${userOrders.length === 0 ? `
          <p style="color: var(--grey-dark); font-size:0.9rem;">No orders found.</p>
        ` : `
          <table class="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${userOrders.map(o => `
                <tr>
                  <td>${o.id}</td>
                  <td>${new Date(o.date).toLocaleDateString()}</td>
                  <td><span class="badge-status ${o.status}">${o.status}</span></td>
                  <td>${o.items.reduce((s,i) => s + i.quantity, 0)} items</td>
                  <td>${formatPrice(o.total)}</td>
                  <td><a href="#tracking/${o.id}" style="text-decoration:underline; font-weight:600;">Track</a></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `}
      </div>
    `;
  } else if (tabName === 'addresses') {
    contentDiv.innerHTML = `
      <div class="checkout-section-block" style="margin-bottom: 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2 style="font-family: var(--font-heading); margin-bottom: 0;">Saved Addresses</h2>
          <button class="btn btn-secondary btn-sm" onclick="showToast('Address editing form simulated.')"><i class="fa-solid fa-plus"></i> Add New</button>
        </div>
        
        <div class="addresses-grid">
          <div class="address-card default">
            <span class="address-tag">Default</span>
            <h4>Home Address</h4>
            <p>Jane Doe<br>100 Park Avenue, Floor 4<br>Colombo 07, Sri Lanka<br>Phone: +94 77 123 4567</p>
            <div class="address-actions">
              <a href="#" class="address-action-btn" onclick="event.preventDefault()">Edit</a>
              <a href="#" class="address-action-btn" onclick="event.preventDefault()">Delete</a>
            </div>
          </div>
          <div class="address-card">
            <h4>Office Address</h4>
            <p>Jane Doe<br>Blue Aura HQ Office<br>Colombo 03, Sri Lanka<br>Phone: +94 77 987 6543</p>
            <div class="address-actions">
              <a href="#" class="address-action-btn" onclick="event.preventDefault()">Edit</a>
              <a href="#" class="address-action-btn" onclick="event.preventDefault()">Delete</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Render a message body in the account messages panel
function renderAccountMessageBody(msgIdx) {
  const user = STATE.currentUser;
  if (!user) return;
  const msgs = STATE.sentEmails.filter(e => e.to.toLowerCase() === user.email.toLowerCase());
  const m = msgs[msgIdx];
  if (!m) return;
  const bodyEl = document.getElementById('acct-msg-body');
  if (!bodyEl) return;
  bodyEl.innerHTML = `
    <div style="border-bottom:1px solid var(--grey-light); padding-bottom:12px; margin-bottom:16px; font-size:0.82rem; color:var(--grey-dark);">
      <strong>Subject:</strong> ${m.subject}<br>
      <strong>Date:</strong> ${new Date(m.timestamp).toLocaleString()}<br>
      <strong>From:</strong> care@blue-aura-fashion.com
    </div>
    <div style="font-size:0.88rem; line-height:1.7;">${m.htmlContent}</div>
    ${m.hasInvoiceAttachment ? `
      <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--grey-light);">
        <button class="btn btn-secondary btn-sm" onclick="(function(){const o=DB.orders.find(x=>x.id==='${m.orderId}');if(o)generateInvoicePDF(o,true);})()">
          <i class="fa-solid fa-file-pdf"></i> Download Invoice PDF
        </button>
      </div>` : ''}
  `;
}

function logoutUser() {
  STATE.currentUser = null;
  sessionStorage.removeItem("blue_aura_user");

  logToTerminal("[Auth System] User logged out.");
  showToast("Logged out successfully.");
  window.location.hash = "home";
}

// Page 12: Wishlist Page
function renderWishlist() {
  if (STATE.wishlist.length === 0) {
    viewport.innerHTML = `
      <div class="container section-padding wishlist-empty">
        <i class="fa-regular fa-heart"></i>
        <h1 class="section-title">Your Wishlist is Empty</h1>
        <p class="section-subtitle" style="margin-bottom: 30px;">Add items you like to save them for later</p>
        <a href="#new-in" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }

  // Get matching products
  const products = DB.products.filter(p => STATE.wishlist.includes(p.id));

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">My Wishlist</h1>
      <p class="section-subtitle">Items you have pinned to purchase later</p>
      
      <div class="products-grid">
        ${renderProductListMarkup(products)}
      </div>
    </div>
  `;
}

// Wishlist actions toggle
function toggleWishlist(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!STATE.currentUser) {
    showToast("Please register or login to add items to your wishlist.");
    window.location.hash = "account";
    return;
  }

  const idx = STATE.wishlist.indexOf(productId);
  if (idx > -1) {
    STATE.wishlist.splice(idx, 1);
    showToast("Product removed from wishlist.");
  } else {
    STATE.wishlist.push(productId);
    showToast("Product added to wishlist!");
  }
  saveWishlistToLocalStorage();

  // Re-render current page if it is wishlist or detail
  if (STATE.currentRoute === "wishlist") {
    renderWishlist();
  } else {
    // Dynamically update floating heart classes on page
    const btns = document.querySelectorAll(`.wl-btn-${productId}`);
    btns.forEach(btn => {
      btn.classList.toggle("active");
      const icon = btn.querySelector("i");
      if (icon) {
        if (btn.classList.contains("active")) {
          icon.className = "fa-solid fa-heart";
        } else {
          icon.className = "fa-regular fa-heart";
        }
      }
    });
  }
}

// Page 13: Cart Page (View Bag)
function renderCartPage() {
  if (STATE.cart.length === 0) {
    viewport.innerHTML = `
      <div class="container section-padding wishlist-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h1 class="section-title">Your Bag is Empty</h1>
        <p class="section-subtitle" style="margin-bottom: 30px;">Find your luxury styles in our catalog</p>
        <a href="#new-in" class="btn btn-primary">Shop New Arrivals</a>
      </div>
    `;
    return;
  }

  const subtotal = calculateSubtotal();

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Shopping Bag</h1>
      <p class="section-subtitle">Review your selected pieces</p>
      
      <div class="checkout-layout">
        <!-- Cart Items List -->
        <div>
          <div class="checkout-section-block" style="padding: 20px;">
            ${STATE.cart.map(item => {
              const p = DB.products.find(x => x.id === item.productId);
              if (!p) return "";
              return `
                <div class="cart-drawer-item" style="border-bottom: 1px solid var(--grey-light); padding-bottom: 20px; margin-bottom: 20px;">
                  <img src="${item.image || p.images[0]}" style="width: 100px; height: 130px; object-fit: cover; border-radius: 4px;" alt="${p.title}">
                  <div class="cart-item-details">
                    <h3 class="cart-item-title"><a href="#product/${p.id}">${p.title}</a></h3>
                    <p class="cart-item-meta">Color: ${item.color} | Size: ${item.size}</p>
                    <p style="font-size: 0.8rem; color: var(--grey-dark);">Shipping fee: ${formatPrice(p.shippingFee)}</p>
                    <div class="cart-item-price-qty">
                      <span class="cart-item-price">${formatPrice(p.price)}</span>
                      <div class="cart-item-qty-selector">
                        <button class="cart-qty-btn" onclick="updateCartPageQty(${item.productId}, '${item.size}', '${item.color}', -1)">-</button>
                        <input type="text" class="cart-qty-input" value="${item.quantity}" readonly>
                        <button class="cart-qty-btn" onclick="updateCartPageQty(${item.productId}, '${item.size}', '${item.color}', 1)">+</button>
                      </div>
                    </div>
                  </div>
                  <button class="cart-item-remove" onclick="removeCartPageItem(${item.productId}, '${item.size}', '${item.color}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              `;
            }).join("")}
          </div>
        </div>
        
        <!-- Cart Sidebar Summary -->
        <div>
          <div class="order-summary-sidebar">
            <h2 class="checkout-section-title" style="border-bottom: 1px solid var(--grey-medium); padding-bottom: 15px;">Bag Summary</h2>
            <div class="pricing-totals-block">
              <div class="pricing-total-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div class="pricing-total-row">
                <span>Shipping Estimate</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <a href="#checkout" class="btn btn-primary" style="width: 100%; height: 50px;">Proceed to Checkout</a>
            <a href="#new-in" class="btn btn-secondary" style="width: 100%; height: 50px; margin-top:12px;">Continue Shopping</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateCartPageQty(productId, size, color, val) {
  const item = STATE.cart.find(i => i.productId === productId && i.size === size && i.color === color);
  if (!item) return;

  const prod = DB.products.find(p => p.id === productId);
  if (!prod) return;

  item.quantity += val;
  if (item.quantity <= 0) {
    STATE.cart = STATE.cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
  } else if (item.quantity > prod.inventory) {
    showToast(`Sorry, only ${prod.inventory} items are available in stock.`);
    item.quantity = prod.inventory;
  }

  saveCartToLocalStorage();
  renderCartPage();
  updateDrawerUI();
}

function removeCartPageItem(productId, size, color) {
  STATE.cart = STATE.cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
  saveCartToLocalStorage();
  renderCartPage();
  updateDrawerUI();
}

// Page 14: Checkout View
function renderCheckout() {
  if (STATE.cart.length === 0) {
    window.location.hash = "cart";
    return;
  }

  const subtotal = calculateSubtotal();
  const shippingTotal = calculateShippingTotal();
  let discount = 0;
  
  if (STATE.activePromo) {
    discount = subtotal * STATE.activePromo.discount;
  }
  
  const grandTotal = subtotal + shippingTotal - discount;

  // Set default checkout values based on logged user
  const user = STATE.currentUser || { email: "", firstName: "", lastName: "" };

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Checkout</h1>
      <p class="section-subtitle">Secure luxury order processing</p>
      
      <form id="checkout-form-submit" onsubmit="handlePlaceOrder(event)">
        <div class="checkout-layout">
          <!-- Billing Details -->
          <div>
            <div class="checkout-section-block">
              <h2 class="checkout-section-title">Shipping Information</h2>
              <div class="form-grid">
                <div class="form-field">
                  <label for="ch-first">First Name</label>
                  <input type="text" id="ch-first" value="${user.firstName}" required>
                </div>
                <div class="form-field">
                  <label for="ch-last">Last Name</label>
                  <input type="text" id="ch-last" value="${user.lastName}" required>
                </div>
                <div class="form-field form-group-full">
                  <label for="ch-email">Email Address (Order status updates will go here)</label>
                  <input type="email" id="ch-email" value="${user.email}" required>
                </div>
                <div class="form-field form-group-full">
                  <label for="ch-phone">Phone Number</label>
                  <input type="tel" id="ch-phone" placeholder="+94 77 123 4567" required>
                </div>
                <div class="form-field form-group-full">
                  <label for="ch-addr">Street Address</label>
                  <input type="text" id="ch-addr" placeholder="House number and street name" required>
                </div>
                <div class="form-field">
                  <label for="ch-city">City</label>
                  <input type="text" id="ch-city" required>
                </div>
                <div class="form-field">
                  <label for="ch-postal">Postal Code</label>
                  <input type="text" id="ch-postal" required>
                </div>
              </div>
            </div>
            
            <div class="checkout-section-block">
              <h2 class="checkout-section-title">Payment Method</h2>
              <div style="display:flex; flex-direction:column; gap:15px;">
                <label class="shipping-method-row active">
                  <div class="shipping-method-info">
                    <input type="radio" name="payment_method" value="cod" checked>
                    <div>
                      <strong>Cash on Delivery (COD)</strong>
                      <div style="font-size:0.75rem; color:var(--grey-dark);">Pay in cash when order is delivered locally.</div>
                    </div>
                  </div>
                  <span>Rs. 0.00</span>
                </label>
                
                <label class="shipping-method-row">
                  <div class="shipping-method-info">
                    <input type="radio" name="payment_method" value="card">
                    <div>
                      <strong>Online Card Payment</strong>
                      <div style="font-size:0.75rem; color:var(--grey-dark);">Secure Gateway Simulation (Visa, Mastercard, Amex)</div>
                    </div>
                  </div>
                  <span>No Fee</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Order Summary Sidebar -->
          <div>
            <div class="order-summary-sidebar">
              <h2 class="checkout-section-title">Order Summary</h2>
              
              <div class="summary-items-list">
                ${STATE.cart.map(item => {
                  const p = DB.products.find(x => x.id === item.productId);
                  if (!p) return "";
                  return `
                    <div class="summary-item">
                      <img src="${item.image || p.images[0]}" class="summary-item-img" alt="${p.title}">
                      <div class="summary-item-info">
                        <div class="summary-item-title">${p.title}</div>
                        <div class="summary-item-meta">Color: ${item.color} | Size: ${item.size} (x${item.quantity})</div>
                      </div>
                      <div class="summary-item-price">${formatPrice(p.price * item.quantity)}</div>
                    </div>
                  `;
                }).join("")}
              </div>
              
              <!-- Coupon Box -->
              <div class="promo-code-box">
                <input type="text" id="checkout-promo-input" placeholder="Promo code" value="${STATE.activePromo ? STATE.activePromo.code : ''}">
                <button type="button" class="btn btn-secondary btn-sm" onclick="applyPromoCode()">Apply</button>
              </div>
              
              <div class="pricing-totals-block">
                <div class="pricing-total-row">
                  <span>Subtotal</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="pricing-total-row">
                  <span>Shipping Fee</span>
                  <span>${formatPrice(shippingTotal)}</span>
                </div>
                ${STATE.activePromo ? `
                  <div class="pricing-total-row" style="color:var(--sale-color);">
                    <span>Discount (${STATE.activePromo.code})</span>
                    <span>-${formatPrice(discount)}</span>
                  </div>
                ` : ''}
              </div>
              
              <div class="pricing-total-row grand-total" style="margin-bottom: 25px;">
                <span>Total Amount</span>
                <span>${formatPrice(grandTotal)}</span>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px;">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `;
}

function applyPromoCode() {
  const input = document.getElementById("checkout-promo-input");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    STATE.activePromo = null;
    renderCheckout();
    return;
  }

  const rate = DB.settings.promoCodes[code];
  if (rate !== undefined) {
    STATE.activePromo = { code: code, discount: rate };
    showToast(`Promo code '${code}' applied successfully!`);
    renderCheckout();
  } else {
    showToast("Invalid promo code.");
  }
}

// Place Order logic
async function handlePlaceOrder(e) {
  e.preventDefault();

  const first = document.getElementById("ch-first").value.trim();
  const last = document.getElementById("ch-last").value.trim();
  const email = document.getElementById("ch-email").value.trim();
  const phone = document.getElementById("ch-phone").value.trim();
  const addr = document.getElementById("ch-addr").value.trim();
  const city = document.getElementById("ch-city").value.trim();
  const postal = document.getElementById("ch-postal").value.trim();
  const payment = document.querySelector('input[name="payment_method"]:checked').value;

  const subtotal = calculateSubtotal();
  const shippingTotal = calculateShippingTotal();
  let discount = 0;
  if (STATE.activePromo) {
    discount = subtotal * STATE.activePromo.discount;
  }
  const grandTotal = subtotal + shippingTotal - discount;

  // Construct Order Object
  const orderId = "BA-" + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    customerName: first + " " + last,
    email: email,
    phone: phone,
    address: `${addr}, ${city}, ${postal}`,
    paymentMethod: payment.toUpperCase(),
    items: [...STATE.cart],
    subtotal: subtotal,
    shippingFee: shippingTotal,
    discount: discount,
    promoCodeUsed: STATE.activePromo ? STATE.activePromo.code : null,
    total: grandTotal,
    status: "pending",
    trackingNumber: null,
    date: new Date().toISOString()
  };

  // Subtract inventory levels
  newOrder.items.forEach(item => {
    const prod = DB.products.find(p => p.id === item.productId);
    if (prod) {
      prod.inventory = Math.max(0, prod.inventory - item.quantity);
    }
  });

  // Save to DB
  DB.orders.unshift(newOrder);
  saveOrdersToLocalStorage();
  saveProductsToLocalStorage();

  // Clear cart
  STATE.cart = [];
  STATE.activePromo = null;
  saveCartToLocalStorage();
  updateDrawerUI();

  // If live backend API integration is running, post order to it
  if (STATE.isTestingLiveBackend) {
    try {
      await fetch(`${STATE.liveBackendUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      logToTerminal(`[API System] Order ${orderId} synchronized with live Node.js Express server.`);
    } catch (err) {
      logToTerminal(`[API Warning] Live order synchronization failed: ${err.message}`);
    }
  }

  // Trigger SMTP Order placed Simulation immediately
  triggerSMTPOrederAlert(newOrder, "placed");

  showToast(`Thank you, ${STATE.currentUser ? STATE.currentUser.firstName : 'valued customer'}! Order ${orderId} has been placed successfully.`);
  
  // Navigate to tracking page
  window.location.hash = `tracking/${orderId}`;
}

// Page 15: Order Tracking View
function renderOrderTracking(providedId) {
  const orderId = providedId || STATE.routeParams.id;
  
  let html = `
    <div class="container section-padding">
      <h1 class="section-title">Order Tracking</h1>
      <p class="section-subtitle">Track the status of your premium shipment</p>
      
      <div class="tracking-wrapper">
        <div class="tracking-card">
          <div class="form-field" style="margin-bottom:20px;">
            <label for="track-id-input">Enter Order ID (e.g. BA-123456)</label>
            <div style="display:flex; gap:10px; margin-top:5px;">
              <input type="text" id="track-id-input" value="${orderId || ''}" placeholder="BA-XXXXXX" style="flex-grow:1;">
              <button class="btn btn-primary" onclick="trackOrderQuery()">Search</button>
            </div>
          </div>
          
          <div id="tracking-results-mount">
            ${orderId ? renderTrackedOrderMarkup(orderId) : `
              <p style="color:var(--grey-dark); text-align:center; font-size:0.9rem;">Please enter a valid Order ID to look up shipment data.</p>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  viewport.innerHTML = html;
}

function trackOrderQuery() {
  const val = document.getElementById("track-id-input").value.trim();
  if (val) {
    window.location.hash = `tracking/${val}`;
  }
}

function renderTrackedOrderMarkup(orderId) {
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) {
    return `<div style="color:var(--sale-color); text-align:center; font-size:0.95rem; font-weight:600;"><i class="fa-solid fa-circle-exclamation"></i> Order not found. Ensure ID is spelled correctly.</div>`;
  }

  // Determine active step index based on status
  // Statuses: pending, confirmed, shipped, delivered, cancelled
  const statuses = ["pending", "confirmed", "shipped", "delivered"];
  let currentIdx = statuses.indexOf(order.status);
  
  if (order.status === "cancelled") {
    return `
      <div style="background-color:#fee2e2; border-left:4px solid var(--sale-color); padding:15px; border-radius:4px; margin-bottom:25px;">
        <h4 style="color:#b91c1c; font-weight:600;"><i class="fa-solid fa-ban"></i> Order Cancelled</h4>
        <p style="font-size:0.85rem; color:#7f1d1d;">This order has been cancelled and will not be processed further. If you believe this is an error, please contact care support.</p>
      </div>
    `;
  }

  return `
    <div style="border-top:1px solid var(--grey-medium); padding-top:25px; margin-top:25px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <div>
          <h3 style="font-family:var(--font-heading);">Order ID: ${order.id}</h3>
          <span style="font-size:0.8rem; color:var(--grey-dark);">Courier Partner: City Express Cargo</span>
        </div>
        <div style="text-align:right;">
          <strong>Status: <span class="badge-status ${order.status}">${order.status}</span></strong>
          <div style="font-size:0.8rem; color:var(--grey-dark); margin-top:4px;">Last update: ${new Date(order.date).toLocaleDateString()}</div>
        </div>
      </div>
      
      ${order.trackingNumber ? `
        <div style="background-color:var(--bg-light); border:1px solid var(--grey-medium); padding:12px 20px; border-radius:4px; margin-bottom:30px; font-size:0.9rem;">
          <i class="fa-solid fa-truck-ramp-box" style="color:var(--accent-color);"></i> 
          <strong>Tracking Number:</strong> <span style="font-family:monospace; font-weight:700;">${order.trackingNumber}</span>
        </div>
      ` : ''}

      <div class="tracking-steps">
        <div class="tracking-step ${currentIdx >= 0 ? 'active' : ''}">
          <div class="tracking-step-title">Order Placed</div>
          <div class="tracking-step-desc">Order has been registered in the system. awaiting confirmation.</div>
        </div>
        <div class="tracking-step ${currentIdx >= 1 ? 'active' : ''}">
          <div class="tracking-step-title">Confirmed & Packaged</div>
          <div class="tracking-step-desc">Order verified and invoice generated. Packages prepared at our fulfillment center.</div>
        </div>
        <div class="tracking-step ${currentIdx >= 2 ? 'active' : ''}">
          <div class="tracking-step-title">Shipped (In Transit)</div>
          <div class="tracking-step-desc">Handed over to courier partner. Shipment is on its way.</div>
        </div>
        <div class="tracking-step ${currentIdx >= 3 ? 'active' : ''}">
          <div class="tracking-step-title">Delivered</div>
          <div class="tracking-step-desc">Shipment received and signed off. Thank you for shopping with Blue Aura!</div>
        </div>
      </div>
    </div>
  `;
}

// Page 16: Privacy Policy Page
function renderPrivacyPolicy() {
  viewport.innerHTML = `
    <div class="container section-padding" style="max-width: 800px;">
      <h1 class="section-title" style="text-align:left;">Privacy Policy</h1>
      <p style="font-size: 0.85rem; color: var(--grey-dark); margin-bottom: 30px;">Last Updated: May 23, 2026</p>
      
      <div style="display:flex; flex-direction:column; gap:20px; font-size:0.95rem; color:var(--secondary-color);">
        <p>At Blue Aura, we value and respect your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit or make a purchase from our simulated Shopify storefront.</p>
        
        <h3>1. Information We Collect</h3>
        <p>When you visit the site, we collect device information, including IP address, web browser specs, and cookies. Additionally, when you make a purchase or attempt to register, we collect billing address, shipping details, email, and phone number.</p>
        
        <h3>2. How We Use Your Data</h3>
        <p>We use the order data to fulfill shipments, arrange logistics, and dispatch order confirmations with invoices attached. We also use contact logs to communicate with you and detect potential security risks.</p>
        
        <h3>3. Data Security</h3>
        <p>Your details are safely stored in mock databases. In real deployments, we use secure SSL encryption gateways and never store raw credit card details directly on our servers.</p>
      </div>
    </div>
  `;
}

// Page 17: Terms & Conditions Page
function renderTermsConditions() {
  viewport.innerHTML = `
    <div class="container section-padding" style="max-width: 800px;">
      <h1 class="section-title" style="text-align:left;">Terms & Conditions</h1>
      <p style="font-size: 0.85rem; color: var(--grey-dark); margin-bottom: 30px;">Last Updated: May 23, 2026</p>
      
      <div style="display:flex; flex-direction:column; gap:20px; font-size:0.95rem; color:var(--secondary-color);">
        <p>Welcome to Blue Aura. By accessing our website, you agree to comply with and be bound by the following Terms & Conditions of use.</p>
        
        <h3>1. Agreement to Terms</h3>
        <p>These terms govern your usage of our shopping portal. If you disagree with any part of these terms, please do not use our website services.</p>
        
        <h3>2. Purchases & Payments</h3>
        <p>We reserve the right to cancel or refuse any orders placed in the system due to inventory fluctuations or incorrect pricing values. All prices listed are in Sri Lankan Rupees (Rs.).</p>
        
        <h3>3. Intellectual Property</h3>
        <p>All logos, typography, visual designs, imagery, and product layout codes are the intellectual property of Blue Aura Clothing brand systems.</p>
      </div>
    </div>
  `;
}

// Page 18: Shipping Policy Page
function renderShippingPolicy() {
  viewport.innerHTML = `
    <div class="container section-padding" style="max-width: 800px;">
      <h1 class="section-title" style="text-align:left;">Shipping Policy</h1>
      <p style="font-size: 0.85rem; color: var(--grey-dark); margin-bottom: 30px;">Last Updated: May 23, 2026</p>
      
      <div style="display:flex; flex-direction:column; gap:20px; font-size:0.95rem; color:var(--secondary-color);">
        <p>Thank you for choosing Blue Aura. Below are the terms and conditions that constitute our Shipping Policy.</p>
        
        <h3>1. Shipment Processing Times</h3>
        <p>All orders are processed and packaged within 1-2 business days. Orders are not processed or shipped on major public holidays.</p>
        
        <h3>2. Shipping Rates & Delivery Estimates</h3>
        <p>Shipping fees are calculated per product basis or as a flat rate at checkout. Typical courier deliveries inside Colombo take 1-3 business days. Outstation deliveries take 3-5 business days.</p>
        
        <h3>3. Order Confirmation & Tracking</h3>
        <p>Once your order is confirmed by our admin panel, you will receive an automated email with tracking numbers. You can input this tracking code in our tracking page to inspect transit history.</p>
      </div>
    </div>
  `;
}

// Page 19: Returns & Refunds Page
function renderReturnsRefunds() {
  viewport.innerHTML = `
    <div class="container section-padding" style="max-width: 800px;">
      <h1 class="section-title" style="text-align:left;">Returns & Refunds</h1>
      <p style="font-size: 0.85rem; color: var(--grey-dark); margin-bottom: 30px;">Last Updated: May 23, 2026</p>
      
      <div style="display:flex; flex-direction:column; gap:20px; font-size:0.95rem; color:var(--secondary-color);">
        <p>We want you to be completely satisfied with your purchase. If you are not happy with your garments, we are here to support your return process.</p>
        
        <h3>1. Return Eligibility</h3>
        <p>You have 14 calendar days to return an item from the date you received it. To be eligible for a return, the garment must be unused, in its original packaging, and with all tags intact.</p>
        
        <h3>2. Refund Process</h3>
        <p>Once we receive the returned package, we will inspect the items and notify you. Upon approval, we will process a bank transfer or voucher refund within 5 business days.</p>
        
        <h3>3. Return Shipping</h3>
        <p>For exchanges and returns due to size issues, the customer is responsible for shipping costs. We cover courier fees only if the received item was damaged or wrong.</p>
      </div>
    </div>
  `;
}

// ----------------------------------------
// PRODUCT DETAIL VIEW & GALLERY
// ----------------------------------------
function renderProductDetail(id) {
  const product = DB.products.find(p => p.id == id);
  if (!product) {
    viewport.innerHTML = `<div class="container section-padding text-center"><h1>Product Not Found</h1></div>`;
    return;
  }

  // Update Recently viewed
  if (!STATE.recentlyViewed.includes(product.id)) {
    STATE.recentlyViewed.unshift(product.id);
    if (STATE.recentlyViewed.length > 4) STATE.recentlyViewed.pop();
  }

  // Initialize interactive product detail state
  STATE.selectedProductQty = 1;
  STATE.selectedColor = product.colors[0];
  STATE.selectedSize = product.sizes[0];

  const related = DB.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recViewedProds = DB.products.filter(p => STATE.recentlyViewed.includes(p.id) && p.id !== product.id).slice(0, 4);

  viewport.innerHTML = `
    <div class="container section-padding">
      <div class="product-detail-layout">
        
        <!-- Large Product Gallery (Thumbnails + Main) -->
        <div class="gallery-container">
          <div class="gallery-thumbs">
            ${product.images.map((img, idx) => `
              <img src="${img}" class="thumb-img ${idx === 0 ? 'active' : ''}" onclick="switchDetailImage(this, '${img}')" alt="Thumb">
            `).join("")}
          </div>
          <div class="gallery-main" id="main-image-viewport">
            <img src="${product.images[0]}" class="main-img-show" id="detail-main-img" alt="${product.title}">
          </div>
        </div>
        
        <!-- Purchase Operations -->
        <div class="product-detail-info">
          <span class="detail-category">${product.category} | ${product.type}</span>
          <h1 class="detail-title">${product.title}</h1>
          
          <div class="detail-price-row">
            <span class="detail-price">${formatPrice(product.price)}</span>
            ${product.oldPrice > product.price ? `
              <span class="detail-old-price">${formatPrice(product.oldPrice)}</span>
              <span class="detail-discount-tag">Save ${Math.round(((product.oldPrice - product.price)/product.oldPrice)*100)}%</span>
            ` : ''}
          </div>

          <p class="detail-desc">${product.description}</p>
          
          <!-- Color swatches -->
          <div class="option-group">
            <div class="option-label">Color: <span class="option-selected" id="color-label-val">${product.colors[0]}</span></div>
            <div class="swatches-flex">
              ${product.colors.map(col => `
                <div class="swatch-option ${col === product.colors[0] ? 'active' : ''}" 
                     style="background-color: ${getHexColor(col)};" 
                     onclick="selectDetailColor(this, '${col}')" 
                     title="${col}"></div>
              `).join("")}
            </div>
          </div>
          
          <!-- Sizes swatches -->
          <div class="option-group">
            <div class="option-label">Size: <span class="option-selected" id="size-label-val">${product.sizes[0]}</span></div>
            <div class="sizes-flex">
              ${product.sizes.map(sz => `
                <button class="size-option ${sz === product.sizes[0] ? 'active' : ''}" 
                        onclick="selectDetailSize(this, '${sz}')">${sz}</button>
              `).join("")}
            </div>
          </div>

          <!-- Stock & Shipping Info -->
          <div class="stock-status">
            <span class="status-dot ${product.inventory > 5 ? 'in-stock' : product.inventory > 0 ? 'low-stock' : 'out-stock'}"></span>
            <span style="font-weight: 500;">
              ${product.inventory > 5 ? 'In Stock (Ready to dispatch)' : product.inventory > 0 ? `Low Stock (Only ${product.inventory} left)` : 'Out of Stock'}
            </span>
          </div>

          <!-- Purchase buttons -->
          <div class="purchase-actions">
            <div class="quantity-selector">
              <button class="quantity-btn" onclick="updateDetailQty(-1)">-</button>
              <input type="text" class="quantity-input" id="detail-qty-input" value="1" readonly>
              <button class="quantity-btn" onclick="updateDetailQty(1)">+</button>
            </div>
            
            <button class="btn btn-primary" onclick="addProductToCart(${product.id})" ${product.inventory === 0 ? 'disabled' : ''}>
              ${product.inventory === 0 ? 'Sold Out' : 'Add to Bag'}
            </button>
            <button class="btn btn-accent" onclick="buyNowProduct(${product.id})" ${product.inventory === 0 ? 'disabled' : ''}>Buy It Now</button>
            
            <button class="wishlist-detail-btn wl-btn-${product.id} ${STATE.wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
              <i class="${STATE.wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
          
          <!-- Share links -->
          <div class="share-row">
            <span>Share:</span>
            <div class="share-links">
              <a href="#" class="share-link" onclick="event.preventDefault(); showToast('Shared to Facebook');"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="share-link" onclick="event.preventDefault(); showToast('Shared to Twitter');"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" class="share-link" onclick="event.preventDefault(); showToast('Shared to Pinterest');"><i class="fa-brands fa-pinterest-p"></i></a>
            </div>
          </div>

          <!-- Tab accordions -->
          <div class="product-tabs">
            <div class="tab-item">
              <div class="tab-header active" onclick="toggleDetailTab(this)">
                <span>Material & Fabric Info</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="tab-content" style="display:block;">
                <p>${product.materialInfo}</p>
              </div>
            </div>
            <div class="tab-item">
              <div class="tab-header" onclick="toggleDetailTab(this)">
                <span>Shipping & Returns</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="tab-content">
                <p>${product.shippingInfo}</p>
                <p style="margin-top: 10px;">Individual Shipping Fee for this item: <strong>${formatPrice(product.shippingFee)}</strong></p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Related Products -->
      ${related.length > 0 ? `
        <section class="section-padding" style="border-top:1px solid var(--grey-light); padding-bottom: 0;">
          <h2 class="section-title" style="font-size:1.6rem; text-align:left;">Related Products</h2>
          <div class="products-grid" style="margin-top:30px;">
            ${renderProductListMarkup(related)}
          </div>
        </section>
      ` : ''}

      <!-- Recently Viewed Products -->
      ${recViewedProds.length > 0 ? `
        <section class="section-padding" style="padding-bottom: 0;">
          <h2 class="section-title" style="font-size:1.6rem; text-align:left;">Recently Viewed</h2>
          <div class="products-grid" style="margin-top:30px;">
            ${renderProductListMarkup(recViewedProds)}
          </div>
        </section>
      ` : ''}

    </div>
  `;

  // Bind image zoom-on-hover logic
  initImageZoom();
}

function getHexColor(colorName) {
  const map = {
    "White": "#ffffff",
    "Black": "#0d0d0d",
    "Soft Blue": "#8db9ff",
    "Grey": "#cbd5e1",
    "Cream": "#f5e6d3",
    "Navy": "#1e3a8a",
    "Charcoal": "#2b2b2b",
    "Sage": "#9caf88",
    "Emerald": "#0f5132"
  };
  return map[colorName] || "#cccccc";
}

function switchDetailImage(el, imgUrl) {
  const main = document.getElementById("detail-main-img");
  if (!main) return;
  main.src = imgUrl;

  const thumbs = document.querySelectorAll(".thumb-img");
  thumbs.forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}

function selectDetailColor(el, col) {
  const label = document.getElementById("color-label-val");
  if (label) label.innerText = col;

  const swatches = document.querySelectorAll(".swatch-option");
  swatches.forEach(s => s.classList.remove("active"));
  el.classList.add("active");

  STATE.selectedColor = col;
}

function selectDetailSize(el, sz) {
  const label = document.getElementById("size-label-val");
  if (label) label.innerText = sz;

  const sizes = document.querySelectorAll(".size-option");
  sizes.forEach(s => s.classList.remove("active"));
  el.classList.add("active");

  STATE.selectedSize = sz;
}

function updateDetailQty(val) {
  const input = document.getElementById("detail-qty-input");
  if (!input) return;
  let current = parseInt(input.value) || 1;
  current += val;
  if (current < 1) current = 1;
  input.value = current;
  STATE.selectedProductQty = current;
}

function toggleDetailTab(header) {
  const content = header.nextElementSibling;
  header.classList.toggle("active");
  if (header.classList.contains("active")) {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

// Product zoom-on-hover logic
function initImageZoom() {
  const container = document.getElementById("main-image-viewport");
  const img = document.getElementById("detail-main-img");
  if (!container || !img) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = `scale(${STATE.zoomScale})`;
  });

  container.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  });
}

// ----------------------------------------
// CART drawer OPERATIONS
// ----------------------------------------
function addProductToCart(productId) {
  if (!STATE.currentUser) {
    showToast("Please register or login to add items to your shopping bag.");
    window.location.hash = "account";
    return;
  }

  const p = DB.products.find(x => x.id === productId);
  if (!p) return;

  const qty = STATE.selectedProductQty;
  const col = STATE.selectedColor || p.colors[0];
  const sz = STATE.selectedSize || p.sizes[0];

  // Check existing item
  const existing = STATE.cart.find(i => i.productId === productId && i.size === sz && i.color === col);
  if (existing) {
    existing.quantity += qty;
    if (existing.quantity > p.inventory) {
      showToast(`Stock limit reached. Added ${p.inventory - (existing.quantity - qty)} pieces.`);
      existing.quantity = p.inventory;
    } else {
      showToast(`Added ${qty} more items to bag.`);
    }
  } else {
    STATE.cart.push({
      productId: productId,
      size: sz,
      color: col,
      quantity: qty,
      image: p.images[0]
    });
    showToast("Added item to bag!");
  }

  saveCartToLocalStorage();
  updateDrawerUI();
  openCartDrawer();
}

function buyNowProduct(productId) {
  addProductToCart(productId);
  window.location.hash = "checkout";
}

function calculateSubtotal() {
  return STATE.cart.reduce((sum, item) => {
    const p = DB.products.find(x => x.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
}

function calculateShippingTotal() {
  // sum shipping fees of products
  return STATE.cart.reduce((sum, item) => {
    const p = DB.products.find(x => x.id === item.productId);
    return sum + (p ? p.shippingFee * item.quantity : 0);
  }, 0);
}

// Cart Drawer open/close
const drawerOverlay = document.getElementById("cart-drawer-overlay-wrapper");
const drawerClose = document.getElementById("cart-drawer-close");
const drawerOpenBtn = document.getElementById("cart-drawer-toggle");

if (drawerOpenBtn) drawerOpenBtn.addEventListener("click", openCartDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeCartDrawer);
if (drawerOverlay) {
  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) closeCartDrawer();
  });
}

function openCartDrawer() {
  if (drawerOverlay) {
    updateDrawerUI();
    drawerOverlay.classList.add("active");
  }
}

function closeCartDrawer() {
  if (drawerOverlay) drawerOverlay.classList.remove("active");
}

function updateDrawerUI() {
  const itemsContainer = document.getElementById("cart-drawer-items-list");
  const subtotalDisplay = document.getElementById("cart-subtotal-price");
  if (!itemsContainer) return;

  if (STATE.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--grey-dark);">
        <i class="fa-solid fa-bag-shopping" style="font-size:2rem; margin-bottom:10px;"></i>
        <p>Your bag is empty.</p>
      </div>
    `;
    if (subtotalDisplay) subtotalDisplay.innerText = formatPrice(0);
    return;
  }

  itemsContainer.innerHTML = STATE.cart.map(item => {
    const p = DB.products.find(x => x.id === item.productId);
    if (!p) return "";
    return `
      <div class="cart-drawer-item">
        <img src="${item.image || p.images[0]}" class="cart-item-img" alt="${p.title}">
        <div class="cart-item-details">
          <h3 class="cart-item-title">${p.title}</h3>
          <p class="cart-item-meta">Color: ${item.color} | Size: ${item.size}</p>
          <div class="cart-item-price-qty">
            <span class="cart-item-price">${formatPrice(p.price)}</span>
            <div class="cart-item-qty-selector">
              <button class="cart-qty-btn" onclick="updateDrawerQty(${item.productId}, '${item.size}', '${item.color}', -1)">-</button>
              <input type="text" class="cart-qty-input" value="${item.quantity}" readonly>
              <button class="cart-qty-btn" onclick="updateDrawerQty(${item.productId}, '${item.size}', '${item.color}', 1)">+</button>
            </div>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeDrawerItem(${item.productId}, '${item.size}', '${item.color}')"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
  }).join("");

  if (subtotalDisplay) {
    subtotalDisplay.innerText = formatPrice(calculateSubtotal());
  }
}

function updateDrawerQty(productId, size, color, val) {
  const item = STATE.cart.find(i => i.productId === productId && i.size === size && i.color === color);
  if (!item) return;

  const prod = DB.products.find(p => p.id === productId);
  if (!prod) return;

  item.quantity += val;
  if (item.quantity <= 0) {
    STATE.cart = STATE.cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
  } else if (item.quantity > prod.inventory) {
    showToast(`Sorry, only ${prod.inventory} pieces are in stock.`);
    item.quantity = prod.inventory;
  }

  saveCartToLocalStorage();
  updateDrawerUI();
  
  if (STATE.currentRoute === "cart" || STATE.currentRoute === "checkout") {
    router(); // force refresh main view if user is in cart/checkout
  }
}

function removeDrawerItem(productId, size, color) {
  STATE.cart = STATE.cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
  saveCartToLocalStorage();
  updateDrawerUI();

  if (STATE.currentRoute === "cart" || STATE.currentRoute === "checkout") {
    router();
  }
}

// ----------------------------------------
// ADMIN DASHBOARD & CRUD
// ----------------------------------------
function renderAdminDashboard() {
  // Standard analytics calculation
  const totalSales = DB.orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = DB.orders.length;
  const totalProducts = DB.products.length;
  
  // Unique customer counts
  const customers = Array.from(new Set(DB.orders.map(o => o.email)));

  viewport.innerHTML = `
    <div class="container section-padding">
      <h1 class="section-title">Store Management</h1>
      <p class="section-subtitle">Admin controls and analytics panel</p>
      
      <div class="admin-layout">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
          <div class="admin-menu-link active" onclick="switchAdminTab('dashboard')"><i class="fa-solid fa-chart-line"></i> Dashboard</div>
          <div class="admin-menu-link" onclick="switchAdminTab('products')"><i class="fa-solid fa-shirt"></i> Products</div>
          <div class="admin-menu-link" onclick="switchAdminTab('orders')"><i class="fa-solid fa-list-check"></i> Orders</div>
          <div class="admin-menu-link" onclick="switchAdminTab('users')"><i class="fa-solid fa-users"></i> User Management</div>
          <div class="admin-menu-link" onclick="switchAdminTab('banners')"><i class="fa-solid fa-images"></i> Hero Banners</div>
          <div class="admin-menu-link" onclick="switchAdminTab('flashsale')"><i class="fa-solid fa-bolt"></i> Flash Sale</div>
          <div class="admin-menu-link" onclick="switchAdminTab('offermgr')"><i class="fa-solid fa-percent"></i> Offers Manager</div>
          <div class="admin-menu-link" onclick="switchAdminTab('promos')"><i class="fa-solid fa-tags"></i> Promo Codes</div>
          <div class="admin-menu-link" onclick="switchAdminTab('reports')"><i class="fa-solid fa-chart-bar"></i> Monthly Reports</div>
          <div class="admin-menu-link" onclick="switchAdminTab('maillogs')"><i class="fa-solid fa-envelope-open-text"></i> Mail Logs</div>
          <div class="admin-menu-link" onclick="switchAdminTab('announcement')"><i class="fa-solid fa-bullhorn"></i> Announcement Bar</div>
          <div class="admin-menu-link" onclick="switchAdminTab('settings')"><i class="fa-solid fa-sliders"></i> Store Settings</div>
        </aside>
        
        <!-- Main Panel Content -->
        <div class="admin-main-panel" id="admin-panel-content-mount">
          ${renderAdminDashboardStats(totalSales, totalOrders, totalProducts, customers.length)}
        </div>
      </div>
    </div>
  `;
}

function renderAdminDashboardStats(sales, orders, prods, custs) {
  // Chart rendering logic using dynamic bars
  // Compute monthly summary simulation
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const heights = [40, 65, 80, 50, 95]; // Percent heights
  const values = [120000, 185000, 245000, 160000, 310000];

  return `
    <!-- Stats Cards Grid -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="stat-card-info">
          <h3>Total Sales</h3>
          <div class="stat-card-num">${formatPrice(sales)}</div>
        </div>
        <div class="stat-card-icon"><i class="fa-solid fa-sack-dollar"></i></div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-card-info">
          <h3>Total Orders</h3>
          <div class="stat-card-num">${orders}</div>
        </div>
        <div class="stat-card-icon"><i class="fa-solid fa-dolly"></i></div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-card-info">
          <h3>Garment Catalog</h3>
          <div class="stat-card-num">${prods} items</div>
        </div>
        <div class="stat-card-icon"><i class="fa-solid fa-warehouse"></i></div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-card-info">
          <h3>Unique Clients</h3>
          <div class="stat-card-num">${custs}</div>
        </div>
        <div class="stat-card-icon"><i class="fa-solid fa-user-group"></i></div>
      </div>
    </div>

    <!-- Analytics Chart -->
    <div class="admin-panel-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Monthly Revenue Trend (Rs.)</h3>
        <span style="font-size:0.8rem; color:var(--grey-dark)">Year 2026</span>
      </div>
      <div class="analytics-chart-container">
        ${months.map((m, idx) => `
          <div class="chart-bar-col">
            <div class="chart-bar-visual" style="height: ${heights[idx]}%;">
              <div class="chart-bar-tooltip">${formatPrice(values[idx])}</div>
            </div>
            <span class="chart-bar-label">${m}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Recent Orders summary -->
    <div class="admin-panel-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Recent Orders</h3>
        <button class="btn btn-secondary btn-sm" onclick="switchAdminTab('orders')">Manage Orders</button>
      </div>
      
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${DB.orders.slice(0, 3).map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customerName}</td>
              <td>${formatPrice(o.total)}</td>
              <td><span class="badge-status ${o.status}">${o.status}</span></td>
              <td>${new Date(o.date).toLocaleDateString()}</td>
            </tr>
          `).join("")}
          ${DB.orders.length === 0 ? '<tr><td colspan="5" style="text-align:center;color:var(--grey-dark);">No orders placed yet.</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  `;
}

// Switch administrative tabs
function switchAdminTab(tabName) {
  const links = document.querySelectorAll('.admin-menu-link');
  const contentMount = document.getElementById('admin-panel-content-mount');
  if (!contentMount) return;

  links.forEach(lnk => {
    const text = lnk.innerText.toLowerCase().trim();
    const map = {
      dashboard: 'dashboard', products: 'products', orders: 'orders',
      users: 'user management', banners: 'hero banners', flashsale: 'flash sale',
      offermgr: 'offers manager', promos: 'promo codes', reports: 'monthly reports',
      maillogs: 'mail logs', announcement: 'announcement bar', settings: 'store settings'
    };
    lnk.classList.toggle('active', text === (map[tabName] || tabName));
  });

  if (tabName === 'dashboard') {
    const ts = DB.orders.filter(o => o.status !== 'cancelled').reduce((s,o) => s + o.total, 0);
    contentMount.innerHTML = renderAdminDashboardStats(ts, DB.orders.length, DB.products.length, Array.from(new Set(DB.orders.map(o => o.email))).length);
  } else if (tabName === 'products')     { renderAdminProductsManager(contentMount); }
  else if (tabName === 'orders')         { renderAdminOrdersManager(contentMount); }
  else if (tabName === 'users')          { renderAdminUsers(contentMount); }
  else if (tabName === 'banners')        { renderAdminBanners(contentMount); }
  else if (tabName === 'flashsale')      { renderAdminFlashSale(contentMount); }
  else if (tabName === 'offermgr')       { renderAdminOfferManager(contentMount); }
  else if (tabName === 'promos')         { renderAdminPromos(contentMount); }
  else if (tabName === 'reports')        { renderAdminReports(contentMount); }
  else if (tabName === 'maillogs')       { renderAdminMailLogs(contentMount); }
  else if (tabName === 'announcement')   { renderAdminAnnouncement(contentMount); }
  else if (tabName === 'settings')       { renderAdminSettings(contentMount); }
}

// PRODUCTS MANAGER ADMIN TAB
function renderAdminProductsManager(mount) {
  mount.innerHTML = `
    <div class="admin-panel-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Manage Garments Catalog</h3>
        <button class="btn btn-primary btn-sm" onclick="showProductCrudModal()"><i class="fa-solid fa-plus"></i> Add New Product</button>
      </div>
      
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Shipping Fee</th>
              <th>Offer tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${DB.products.map(p => `
              <tr>
                <td><img src="${p.images[0]}" style="width: 40px; height: 50px; object-fit: cover;" alt="Prod"></td>
                <td><strong>${p.title}</strong><br><span style="font-size:0.75rem; color:var(--grey-dark)">Type: ${p.type}</span></td>
                <td>${p.category}</td>
                <td>${formatPrice(p.price)}</td>
                <td><span style="font-weight:600; color:${p.inventory === 0 ? 'var(--sale-color)' : 'var(--primary-color)'}">${p.inventory} units</span></td>
                <td>${formatPrice(p.shippingFee)}</td>
                <td><span style="font-size:0.75rem; font-weight:600; color:var(--sale-color);">${p.offers || '-'}</span></td>
                <td>
                  <div class="admin-actions-flex">
                    <button class="admin-action-icon-btn edit" onclick="showProductCrudModal(${p.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="admin-action-icon-btn delete" onclick="deleteProductAdmin(${p.id})" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Show Product CRUD Modal
function showProductCrudModal(productId = null) {
  // If product ID is provided, load product for editing
  const p = productId ? DB.products.find(x => x.id === productId) : {
    id: "",
    title: "",
    category: "Unisex",
    type: "T-shirts",
    price: "",
    oldPrice: "",
    description: "",
    materialInfo: "100% Combed Organic Cotton",
    shippingInfo: "Standard shipping times apply.",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    inventory: 20,
    shippingFee: 250.00,
    offers: "",
    images: ["", ""]
  };

  const overlay = document.getElementById("quickview-modal-overlay");
  const modalBody = document.getElementById("quickview-modal-body");
  if (!overlay || !modalBody) return;

  modalBody.innerHTML = `
    <h2 style="font-family:var(--font-heading); margin-bottom: 25px;">${productId ? 'Edit Product' : 'Add New Product'}</h2>
    <form id="admin-product-crud-form" class="form-grid" onsubmit="handleProductSave(event, ${productId})">
      <div class="form-field form-group-full">
        <label for="cr-title">Product Title</label>
        <input type="text" id="cr-title" value="${p.title}" required>
      </div>
      <div class="form-field">
        <label for="cr-category">Category</label>
        <select id="cr-category">
          <option value="Women" ${p.category === 'Women' ? 'selected' : ''}>Women</option>
          <option value="Men" ${p.category === 'Men' ? 'selected' : ''}>Men</option>
          <option value="Unisex" ${p.category === 'Unisex' ? 'selected' : ''}>Unisex</option>
          <option value="Kids" ${p.category === 'Kids' ? 'selected' : ''}>Kids</option>
        </select>
      </div>
      <div class="form-field">
        <label for="cr-type">Product Type</label>
        <select id="cr-type">
          <option value="T-shirts" ${p.type === 'T-shirts' ? 'selected' : ''}>T-shirts</option>
          <option value="Shirts" ${p.type === 'Shirts' ? 'selected' : ''}>Shirts</option>
          <option value="Dresses" ${p.type === 'Dresses' ? 'selected' : ''}>Dresses</option>
          <option value="Hoodies" ${p.type === 'Hoodies' ? 'selected' : ''}>Hoodies</option>
          <option value="Pants" ${p.type === 'Pants' ? 'selected' : ''}>Pants</option>
          <option value="Jeans" ${p.type === 'Jeans' ? 'selected' : ''}>Jeans</option>
          <option value="Jackets" ${p.type === 'Jackets' ? 'selected' : ''}>Jackets</option>
          <option value="Kids wear" ${p.type === 'Kids wear' ? 'selected' : ''}>Kids wear</option>
        </select>
      </div>
      <div class="form-field">
        <label for="cr-price">Price (Rs.)</label>
        <input type="number" id="cr-price" value="${p.price}" min="0" step="10" required>
      </div>
      <div class="form-field">
        <label for="cr-oldPrice">Discount Base Price (Rs. - Leave blank if no discount)</label>
        <input type="number" id="cr-oldPrice" value="${p.oldPrice || ''}" min="0" step="10">
      </div>
      <div class="form-field">
        <label for="cr-shippingFee">Shipping Fee (Per Product - Rs.)</label>
        <input type="number" id="cr-shippingFee" value="${p.shippingFee}" min="0" required>
      </div>
      <div class="form-field">
        <label for="cr-inventory">Initial Inventory Level</label>
        <input type="number" id="cr-inventory" value="${p.inventory}" min="0" required>
      </div>
      <div class="form-field">
        <label for="cr-offers">Offer / Badge Tag (e.g. New In, Flash Sale, 20% OFF)</label>
        <input type="text" id="cr-offers" value="${p.offers || ''}">
      </div>
      <div class="form-field">
        <label for="cr-colors">Available Colors (Comma separated)</label>
        <input type="text" id="cr-colors" value="${p.colors.join(", ")}" required>
      </div>
      <div class="form-field form-group-full">
        <label for="cr-images-0">Primary Image URL</label>
        <input type="url" id="cr-images-0" value="${p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600'}" required>
      </div>
      <div class="form-field form-group-full">
        <label for="cr-images-1">Secondary Hover Image URL</label>
        <input type="url" id="cr-images-1" value="${p.images[1] || ''}">
      </div>
      <div class="form-field form-group-full">
        <label for="cr-description">Description</label>
        <textarea id="cr-description" rows="3" required>${p.description}</textarea>
      </div>
      <div class="form-field">
        <label for="cr-material">Fabric & Material Info</label>
        <input type="text" id="cr-material" value="${p.materialInfo}">
      </div>
      <div class="form-field">
        <label for="cr-shippingInfo">Shipping Information Note</label>
        <input type="text" id="cr-shippingInfo" value="${p.shippingInfo}">
      </div>
      <div class="form-group-full" style="text-align: right; display:flex; gap:10px; justify-content:flex-end;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeCrudModal()">Cancel</button>
        <button type="submit" class="btn btn-primary btn-sm">Save Changes</button>
      </div>
    </form>
  `;

  overlay.classList.add("active");
}

function closeCrudModal() {
  const overlay = document.getElementById("quickview-modal-overlay");
  if (overlay) overlay.classList.remove("active");
}

function handleProductSave(e, productId) {
  e.preventDefault();

  const title = document.getElementById("cr-title").value.trim();
  const category = document.getElementById("cr-category").value;
  const type = document.getElementById("cr-type").value;
  const price = parseFloat(document.getElementById("cr-price").value);
  const oldPriceVal = document.getElementById("cr-oldPrice").value;
  const oldPrice = oldPriceVal ? parseFloat(oldPriceVal) : null;
  const shippingFee = parseFloat(document.getElementById("cr-shippingFee").value);
  const inventory = parseInt(document.getElementById("cr-inventory").value);
  const offers = document.getElementById("cr-offers").value.trim();
  const colors = document.getElementById("cr-colors").value.split(",").map(c => c.trim()).filter(Boolean);
  const img0 = document.getElementById("cr-images-0").value.trim();
  const img1 = document.getElementById("cr-images-1").value.trim();
  const description = document.getElementById("cr-description").value.trim();
  const material = document.getElementById("cr-material").value.trim();
  const shipInfo = document.getElementById("cr-shippingInfo").value.trim();

  const imgs = [img0];
  if (img1) imgs.push(img1);

  if (productId) {
    // Edit Product
    const pIdx = DB.products.findIndex(x => x.id === productId);
    if (pIdx > -1) {
      DB.products[pIdx] = {
        ...DB.products[pIdx],
        title, category, type, price, oldPrice, shippingFee, inventory, offers, colors, images: imgs, description, materialInfo: material, shippingInfo: shipInfo
      };
      showToast("Product updated successfully.");
      logToTerminal(`[Inventory System] Product ${productId} updated by Admin.`);
    }
  } else {
    // Add New
    const newId = DB.products.reduce((max, x) => Math.max(max, x.id), 0) + 1;
    const newP = {
      id: newId,
      title, category, type, price, oldPrice, shippingFee, inventory, offers, colors, images: imgs, description, materialInfo: material, shippingInfo: shipInfo,
      sizes: ["S", "M", "L", "XL"], // Defaults
      salesCount: 0,
      uploadedAt: new Date().toISOString()
    };
    DB.products.unshift(newP);
    showToast("New product added to catalog!");
    logToTerminal(`[Inventory System] Product ${newId} (${title}) created by Admin.`);
  }

  saveProductsToLocalStorage();
  closeCrudModal();
  switchAdminTab('products'); // Refresh view
}

function deleteProductAdmin(productId) {
  if (confirm("Are you sure you want to delete this product from the catalog?")) {
    DB.products = DB.products.filter(x => x.id !== productId);
    saveProductsToLocalStorage();
    showToast("Product deleted from catalog.");
    logToTerminal(`[Inventory System] Product ${productId} deleted from system database.`);
    switchAdminTab('products');
  }
}

// ORDERS MANAGER ADMIN TAB
function renderAdminOrdersManager(mount) {
  mount.innerHTML = `
    <div class="admin-panel-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Manage Customer Orders <span style="font-size:0.85rem; color:var(--grey-dark); font-weight:400;">(${DB.orders.length} total)</span></h3>
      </div>

      <div style="margin-bottom:15px;">
        <input type="text" id="admin-order-search" placeholder="Search by Order ID, customer name, or email..." oninput="adminFilterOrders(this.value)"
          style="width:100%; padding:10px 14px; border:1px solid var(--grey-light); border-radius:8px; font-size:0.9rem; outline:none;">
      </div>
      
      <div id="admin-orders-table-wrapper" style="overflow-x: auto;">
        ${renderAdminOrdersTable(DB.orders)}
      </div>
    </div>
  `;
}

function renderAdminOrdersTable(orders) {
  return `<table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Details</th>
              <th>Purchase Summary</th>
              <th>Pricing Details</th>
              <th>Fulfillment Status</th>
              <th>Action Panel</th>
            </tr>
          </thead>
          <tbody>
            ${DB.orders.map(o => `
              <tr>
                <td>
                  <strong>${o.id}</strong><br>
                  <span style="font-size:0.75rem; color:var(--grey-dark)">${new Date(o.date).toLocaleDateString()}</span>
                </td>
                <td>
                  <strong>${o.customerName}</strong><br>
                  <span style="font-size:0.75rem; color:var(--grey-dark)">${o.email}</span><br>
                  <span style="font-size:0.75rem; color:var(--grey-dark)">Ph: ${o.phone}</span>
                </td>
                <td>
                  ${o.items.map(item => {
                    const p = DB.products.find(x => x.id === item.productId);
                    return `<span style="font-size:0.8rem;">${p ? p.title : 'Item'} (${item.size}/${item.color}) x${item.quantity}</span><br>`;
                  }).join("")}
                </td>
                <td>
                  <strong>${formatPrice(o.total)}</strong><br>
                  <span style="font-size:0.7rem; color:var(--grey-dark)">Items subtotal: ${formatPrice(o.subtotal)}</span><br>
                  <span style="font-size:0.7rem; color:var(--grey-dark)">Shipping charge: ${formatPrice(o.shippingFee)}</span>
                </td>
                <td>
                  <span class="badge-status ${o.status}">${o.status}</span>
                  ${o.trackingNumber ? `<br><span style="font-size:0.7rem; font-family:monospace;">TR: ${o.trackingNumber}</span>` : ''}
                </td>
                <td>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    ${o.status === 'pending' ? `
                      <button class="btn btn-accent btn-sm" onclick="adminConfirmOrder('${o.id}')"><i class="fa-solid fa-circle-check"></i> Confirm</button>
                      <button class="btn btn-secondary btn-sm" style="color:var(--sale-color); border-color:var(--sale-color);" onclick="adminCancelOrder('${o.id}')">Cancel</button>
                    ` : ''}
                    
                    ${o.status === 'confirmed' ? `
                      <button class="btn btn-primary btn-sm" onclick="adminShipOrderPrompt('${o.id}')"><i class="fa-solid fa-truck-fast"></i> Ship</button>
                    ` : ''}

                    ${o.status === 'shipped' ? `
                      <button class="btn btn-primary btn-sm" style="background-color:var(--success-color); border-color:var(--success-color);" onclick="adminDeliverOrder('${o.id}')"><i class="fa-solid fa-house-chimney-check"></i> Deliver</button>
                    ` : ''}

                    <button class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:0.75rem; letter-spacing:0.5px;" onclick="adminDownloadInvoicePDF('${o.id}')"><i class="fa-solid fa-download"></i> PDF Invoice</button>
                    <button class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:0.75rem; color:var(--sale-color); border-color:var(--sale-color); margin-top:4px;" onclick="adminDeleteOrder('${o.id}')" title="Delete Order"><i class="fa-solid fa-trash-can"></i> Delete</button>
                  </div>
                </td>
              </tr>
            `).join("")}
            ${orders.length === 0 ? '<tr><td colspan="6" style="text-align:center;color:var(--grey-dark);">No customer orders recorded yet.</td></tr>' : ''}
          </tbody>
        </table>`;
}

function adminFilterOrders(query) {
  const q = query.toLowerCase();
  const filtered = DB.orders.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.customerName.toLowerCase().includes(q) ||
    o.email.toLowerCase().includes(q)
  );
  const wrapper = document.getElementById('admin-orders-table-wrapper');
  if (wrapper) wrapper.innerHTML = renderAdminOrdersTable(filtered);
}

// Admin Action: Confirm Order
function adminConfirmOrder(orderId) {
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = "confirmed";
  saveOrdersToLocalStorage();
  showToast(`Order ${orderId} confirmed successfully.`);
  
  // Trigger SMTP Confirmation email with invoice PDF attach simulation
  triggerSMTPOrederAlert(order, "confirmed");
  
  switchAdminTab('orders');
}

// Admin Action: Cancel Order
function adminCancelOrder(orderId) {
  if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
    const order = DB.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = "cancelled";
    
    // Return stock
    order.items.forEach(item => {
      const prod = DB.products.find(p => p.id === item.productId);
      if (prod) {
        prod.inventory += item.quantity;
      }
    });

    saveOrdersToLocalStorage();
    saveProductsToLocalStorage();
    showToast(`Order ${orderId} cancelled.`);
    
    // SMTP alert
    triggerSMTPOrederAlert(order, "cancelled");
    switchAdminTab('orders');
  }
}

// Admin Action: Ship Order (Prompt for tracking code)
function adminShipOrderPrompt(orderId) {
  const tracking = prompt("Enter courier tracking number:", "TR-" + Math.floor(10000000 + Math.random() * 90000000));
  if (tracking) {
    const order = DB.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = "shipped";
    order.trackingNumber = tracking;
    saveOrdersToLocalStorage();
    showToast(`Order ${orderId} has been marked as shipped.`);

    // Trigger SMTP Shipping notification
    triggerSMTPOrederAlert(order, "shipped");
    switchAdminTab('orders');
  }
}

// Admin Action: Deliver Order
function adminDeliverOrder(orderId) {
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = "delivered";
  saveOrdersToLocalStorage();
  showToast(`Order ${orderId} marked as delivered.`);

  // Trigger SMTP Delivered notification
  triggerSMTPOrederAlert(order, "delivered");
  switchAdminTab('orders');
}

// Admin Action: Delete Order permanently
function adminDeleteOrder(orderId) {
  if (confirm(`Are you sure you want to permanently delete order ${orderId}? This action is irreversible.`)) {
    DB.orders = DB.orders.filter(o => o.id !== orderId);
    saveOrdersToLocalStorage();
    showToast(`Order ${orderId} has been permanently deleted.`);
    logToTerminal(`[Order System] Order ${orderId} permanently deleted from database.`);
    
    // If live backend API is running, request order deletion
    if (STATE.isTestingLiveBackend) {
      fetch(`${STATE.liveBackendUrl}/api/orders/${orderId}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) logToTerminal(`[API System] Order ${orderId} deleted from live backend server database.`);
      })
      .catch(err => {
        logToTerminal(`[API Error] Could not delete order ${orderId} from live backend: ${err.message}`);
      });
    }

    switchAdminTab('orders');
  }
}

// RENDER ADMIN HERO BANNERS MANAGEMENT
function renderAdminBanners(mount) {
  const slides = DB.settings.homeSlides || [];

  mount.innerHTML = `
    <div class="admin-panel-card">
      <div class="admin-card-header" style="border-bottom: 1px solid var(--grey-medium); padding-bottom: 15px; margin-bottom: 20px;">
        <h3 class="admin-card-title"><i class="fa-solid fa-images" style="color:var(--accent-color);"></i> Manage Hero Slider Banners</h3>
        <button class="btn btn-primary btn-sm" onclick="showBannerCrudModal()"><i class="fa-solid fa-plus"></i> Add New Slide</button>
      </div>
      
      <div class="banners-edit-grid" style="display:flex; flex-direction:column; gap:20px;">
        ${slides.map((s, idx) => `
          <div class="banner-edit-card" style="display:flex; gap:20px; border:1px solid var(--grey-medium); padding:15px; border-radius:4px; background:var(--bg-light); align-items:center;">
            <img src="${s.img}" style="width:120px; height:80px; object-fit:cover; border-radius:4px; border:1px solid var(--grey-medium);" alt="Slide">
            <div style="flex-grow:1; line-height:1.4;">
              <h4 style="margin:0 0 5px 0; font-family:var(--font-heading); font-size:1.1rem; font-weight:600;">Slide #${idx + 1}: ${s.title.replace(/<br>/g, ' ')}</h4>
              <p style="margin:0 0 3px 0; font-size:0.85rem; color:var(--grey-dark);">Subtitle: ${s.subtitle}</p>
              <p style="margin:0; font-size:0.8rem; color:var(--grey-dark);">Destination: <span style="font-family:monospace; background:rgba(0,0,0,0.03); padding:2px 6px; border-radius:2px;">${s.link}</span></p>
            </div>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-secondary btn-sm" style="padding:6px 12px;" onclick="showBannerCrudModal(${idx})"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn btn-secondary btn-sm" style="padding:6px 12px; color:var(--sale-color); border-color:var(--sale-color);" onclick="deleteBannerAdmin(${idx})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
          </div>
        `).join("")}
        ${slides.length === 0 ? '<p style="text-align:center; color:var(--grey-dark);">No home slides configured. Default slides will be shown.</p>' : ''}
      </div>
    </div>
  `;
}

function showBannerCrudModal(slideIdx = null) {
  const slides = DB.settings.homeSlides || [];
  const s = slideIdx !== null ? slides[slideIdx] : {
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400",
    subtitle: "New Collection Drop",
    title: "Luxury Style,<br>Minimalist Lines",
    link: "#new-in"
  };

  const overlay = document.getElementById("quickview-modal-overlay");
  const modalBody = document.getElementById("quickview-modal-body");
  if (!overlay || !modalBody) return;

  modalBody.innerHTML = `
    <h2 style="font-family:var(--font-heading); margin-bottom: 25px;">${slideIdx !== null ? 'Edit Hero Slide' : 'Add New Hero Slide'}</h2>
    <form id="admin-banner-crud-form" class="form-grid" onsubmit="handleBannerSave(event, ${slideIdx})">
      <div class="form-field form-group-full">
        <label for="bn-title">Slide Title (Use &lt;br&gt; for line breaks)</label>
        <input type="text" id="bn-title" value="${s.title}" required>
      </div>
      <div class="form-field form-group-full">
        <label for="bn-subtitle">Slide Subtitle</label>
        <input type="text" id="bn-subtitle" value="${s.subtitle}" required>
      </div>
      <div class="form-field form-group-full">
        <label for="bn-img">Slide Image URL</label>
        <input type="url" id="bn-img" value="${s.img}" required>
      </div>
      <div class="form-field form-group-full">
        <label for="bn-link">Destination Hash Link (e.g. #new-in, #women, #men)</label>
        <input type="text" id="bn-link" value="${s.link}" required>
      </div>
      <div class="form-group-full" style="text-align: right; display:flex; gap:10px; justify-content:flex-end; margin-top:20px;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeCrudModal()">Cancel</button>
        <button type="submit" class="btn btn-primary btn-sm">Save Slide</button>
      </div>
    </form>
  `;

  overlay.classList.add("active");
}

function handleBannerSave(e, slideIdx) {
  e.preventDefault();
  const title = document.getElementById("bn-title").value.trim();
  const subtitle = document.getElementById("bn-subtitle").value.trim();
  const img = document.getElementById("bn-img").value.trim();
  const link = document.getElementById("bn-link").value.trim();

  const slides = DB.settings.homeSlides || [];

  if (slideIdx !== null) {
    slides[slideIdx] = { title, subtitle, img, link };
    showToast("Hero slide updated.");
  } else {
    slides.push({ title, subtitle, img, link });
    showToast("New hero slide added.");
  }

  DB.settings.homeSlides = slides;
  localStorage.setItem("blue_aura_settings", JSON.stringify(DB.settings));
  closeCrudModal();
  switchAdminTab('banners');
}

function deleteBannerAdmin(slideIdx) {
  const slides = DB.settings.homeSlides || [];
  if (confirm("Are you sure you want to delete this hero slide?")) {
    slides.splice(slideIdx, 1);
    DB.settings.homeSlides = slides;
    localStorage.setItem("blue_aura_settings", JSON.stringify(DB.settings));
    showToast("Hero slide deleted.");
    switchAdminTab('banners');
  }
}

// RENDER ADMIN MAIL LOGS & SMTP SIMULATOR
function renderAdminMailLogs(mount) {
  if (!STATE.terminalLogs) {
    STATE.terminalLogs = [
      `[${new Date().toLocaleTimeString()}] [SMTP System] Listening on local client email logs...`
    ];
  }

  mount.innerHTML = `
    <div class="admin-panel-card">
      <div class="admin-card-header" style="border-bottom: 1px solid var(--grey-medium); padding-bottom: 15px; margin-bottom: 20px;">
        <h3 class="admin-card-title"><i class="fa-solid fa-square-envelope" style="color:var(--accent-color);"></i> SMTP Mail Dispatch Simulator</h3>
        <span style="font-size:0.8rem; color:var(--grey-dark);" id="admin-mail-logs-count">${STATE.sentEmails.length} emails dispatched</span>
      </div>
      
      <div class="admin-mail-simulator-layout" style="display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
        <!-- Left Side: Simulator Log Terminal -->
        <div class="admin-mail-logs-panel">
          <h4 style="margin:0 0 10px 0; font-family:var(--font-heading); font-size:1rem;"><i class="fa-solid fa-terminal"></i> SMTP Service Console Outputs</h4>
          <div id="email-sim-terminal-logs" class="console-box" style="background-color:#0f172a; color:#38bdf8; font-family:'Courier New', monospace; font-size:0.8rem; padding:15px; border-radius:4px; height:350px; overflow-y:auto; white-space:pre-wrap; border:1px solid #1e293b;">${STATE.terminalLogs.join("\n")}</div>
          <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:10px;" onclick="clearAdminTerminalLogs()"><i class="fa-solid fa-eraser"></i> Clear Terminal Outputs</button>
        </div>
        
        <!-- Right Side: Email Inbox Viewer -->
        <div class="admin-inbox-panel">
          <h4 style="margin:0 0 10px 0; font-family:var(--font-heading); font-size:1rem;"><i class="fa-solid fa-inbox"></i> Simulated Sent Mailbox</h4>
          <div style="margin-bottom:15px;">
            <select id="admin-mail-selector" class="sorting-select" style="width:100%;" onchange="handleAdminMailSelect(this)">
              <option value="">-- Select an email to inspect --</option>
              ${STATE.sentEmails.map((em, idx) => `
                <option value="${idx}">[${new Date(em.timestamp).toLocaleTimeString()}] To: ${em.to} - ${em.subject}</option>
              `).join("")}
            </select>
          </div>
          
          <div id="admin-mail-viewer-body" style="background-color:#ffffff; border:1px solid var(--grey-medium); border-radius:4px; padding:15px; height:305px; overflow-y:auto;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--grey-dark);">
              <i class="fa-solid fa-envelope-open" style="font-size:2.5rem; margin-bottom:10px;"></i>
              <p style="font-size:0.9rem;">Select an email from the dropdown list to view details.</p>
            </div>
          </div>
          
          <!-- Attachment Download Button -->
          <div id="admin-mail-attachment-row" class="d-none" style="margin-top:12px; display:flex; align-items:center; gap:10px; padding:10px; background-color:var(--bg-light); border:1px solid var(--grey-medium); border-radius:4px;">
            <i class="fa-solid fa-file-pdf" style="font-size:1.5rem; color:#ef4444;"></i>
            <div style="flex-grow:1; line-height:1.3;">
              <span style="font-size:0.85rem; font-weight:600;" id="admin-mail-attachment-name">Invoice.pdf</span><br>
              <span style="font-size:0.75rem; color:var(--grey-dark);">Transactional Receipt Buffer</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="admin-mail-attachment-download-btn"><i class="fa-solid fa-download"></i> Download</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Pre-select the latest email if exists
  if (STATE.sentEmails.length > 0) {
    const selector = document.getElementById("admin-mail-selector");
    if (selector) {
      selector.value = STATE.sentEmails.length - 1;
      handleAdminMailSelect(selector);
    }
  }
}

function clearAdminTerminalLogs() {
  STATE.terminalLogs = [`[${new Date().toLocaleTimeString()}] [SMTP System] Logs cleared.`];
  const terminal = document.getElementById("email-sim-terminal-logs");
  if (terminal) {
    terminal.innerHTML = STATE.terminalLogs.join("\n");
  }
}

function handleAdminMailSelect(selectEl) {
  const idx = parseInt(selectEl.value);
  const body = document.getElementById("admin-mail-viewer-body");
  const attachRow = document.getElementById("admin-mail-attachment-row");
  const attachName = document.getElementById("admin-mail-attachment-name");
  const downloadBtn = document.getElementById("admin-mail-attachment-download-btn");

  if (isNaN(idx) || !STATE.sentEmails[idx]) {
    if (body) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--grey-dark);">
          <i class="fa-solid fa-envelope-open" style="font-size:2.5rem; margin-bottom:10px;"></i>
          <p style="font-size:0.9rem;">Select an email from the dropdown list to view details.</p>
        </div>
      `;
    }
    if (attachRow) attachRow.classList.add("d-none");
    return;
  }

  const em = STATE.sentEmails[idx];
  if (body) {
    body.innerHTML = `
      <div style="border-bottom:1px solid var(--grey-light); padding-bottom:10px; margin-bottom:15px; font-size:0.8rem; color:var(--grey-dark); line-height:1.4;">
        <strong>Subject:</strong> ${em.subject}<br>
        <strong>To:</strong> ${em.to}<br>
        <strong>From:</strong> Blue Aura Care &lt;smtp.blueaura.auth@gmail.com&gt;<br>
        <strong>Timestamp:</strong> ${new Date(em.timestamp).toLocaleString()}
      </div>
      <div style="font-size:0.85rem; zoom: 0.95;">
        ${em.htmlContent}
      </div>
    `;
  }

  if (em.hasInvoiceAttachment && attachRow && downloadBtn) {
    attachRow.classList.remove("d-none");
    if (attachName) attachName.innerText = `Invoice_${em.orderId || 'Order'}.pdf`;
    downloadBtn.onclick = () => {
      const order = DB.orders.find(o => o.id === em.orderId);
      if (order) {
        generateInvoicePDF(order, true);
        showToast("Invoice PDF downloaded successfully!");
      } else {
        showToast("Error: Associated order not found in database.");
      }
    };
  } else {
    if (attachRow) attachRow.classList.add("d-none");
  }
}

// Triggers SMTP security alert layout to customer's email on authentication
async function triggerSMTPLoginAlert(user) {
  const subject = `Security Alert: Successful Account Login`;
  const headline = "New Account Login Detected";
  const bodyText = `We detected a successful login to your Blue Aura account (${user.email}) on ${new Date().toLocaleString()}. If this was you, no action is required. If you do not recognize this activity, please change your password or contact our care team immediately.`;

  // Formatted HTML Email Body Template (Sleek minimalist style)
  const emailHtml = `
    <div style="font-family:'Outfit',sans-serif; max-width:600px; margin:0 auto; border:1px solid #e2e8f0; padding:30px; border-radius:4px; color:#0f172a;">
      <div style="text-align:center; border-bottom:1px solid #f1f5f9; padding-bottom:20px; margin-bottom:25px;">
        <h2 style="font-family:'Playfair Display',serif; text-transform:uppercase; letter-spacing:1px; margin:0; font-size:24px; color:#0d0d0d;">BLUE AURA</h2>
        <span style="font-size:10px; color:#64748b; letter-spacing:1.5px; text-transform:uppercase;">Clean Luxury Clothing</span>
      </div>
      
      <h3 style="font-size:18px; margin-bottom:15px; color:#0d0d0d;">${headline}</h3>
      <p style="font-size:14px; line-height:1.6; color:#475569; margin-bottom:25px;">
        Dear ${user.firstName} ${user.lastName || 'User'},<br><br>
        ${bodyText}
      </p>
      
      <div style="background-color:#f8fafc; padding:20px; border-radius:4px; margin-bottom:25px;">
        <h4 style="margin:0 0 10px 0; font-size:13px; text-transform:uppercase; color:#0f172a;">Session Properties</h4>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Logged Email: <strong>${user.email}</strong></p>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Method: <strong>${user.provider ? user.provider.toUpperCase() : 'EMAIL AUTH'}</strong></p>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Platform: Google Shopify simulated browser handshake</p>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">IP Address: 127.0.0.1 (Local Host)</p>
      </div>
      
      <div style="text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:20px; margin-top:30px;">
        Need support? Contact us at care@blue-aura-fashion.com or chat on WhatsApp +94 77 123 4567.<br>
        Colombo, Sri Lanka.
      </div>
    </div>
  `;

  const newEmail = {
    timestamp: new Date().toISOString(),
    to: user.email,
    subject: subject,
    htmlContent: emailHtml,
    hasInvoiceAttachment: false,
    orderId: null
  };

  STATE.sentEmails.push(newEmail);
  saveEmailsToLocalStorage();

  // Update simulator notifications counts in UI
  const badge = document.getElementById("email-simulator-badge");
  if (badge) {
    badge.innerText = parseInt(badge.innerText || "0") + 1;
    badge.style.display = "flex";
  }

  // Log outputs to developer simulator terminal
  logToTerminal(`[SMTP Service] Connecting to smtp.gmail.com:465...`);
  logToTerminal(`[SMTP Service] Authorization Handshake successful (user: login.blueaura.auth@gmail.com).`);
  logToTerminal(`[SMTP Service] Dispatching Security login alert payload to: <${user.email}>`);
  logToTerminal(`[SMTP Service] Email delivered. SMTP server returned message ID: <login-${Math.floor(100000 + Math.random()*900000)}@gmail.com>`);

  // Live Node.js Email Trigger (If backend is active)
  if (STATE.isTestingLiveBackend) {
    try {
      await fetch(`${STATE.liveBackendUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          subject: subject,
          actionType: 'login',
          order: {
            customerName: `${user.firstName} ${user.lastName || 'User'}`,
            email: user.email,
            date: new Date().toISOString()
          }
        })
      });
      logToTerminal(`[API System] Live Gmail SMTP login alert dispatch successfully executed on backend.`);
    } catch (err) {
      logToTerminal(`[API Error] Could not trigger live login email: ${err.message}`);
    }
  }
}

// USER MANAGEMENT ADMIN TAB
function renderAdminUsers(mount) {
  const allUsers = DB.users || [];

  // Enrich users with order stats
  const enriched = allUsers.map(u => {
    const userOrders = DB.orders.filter(o => o.email === u.email);
    const totalSpend = userOrders.reduce((sum, o) => sum + o.total, 0);
    return { ...u, orderCount: userOrders.length, totalSpend };
  });

  mount.innerHTML = `
    <div class="admin-panel-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Registered Customers <span style="font-size:0.85rem; color:var(--grey-dark); font-weight:400;">(${enriched.length} total)</span></h3>
        <button class="btn btn-secondary btn-sm" onclick="adminExportUsersCSV()"><i class="fa-solid fa-file-csv"></i> Export CSV</button>
      </div>

      <div style="margin-bottom:15px;">
        <input type="text" id="admin-user-search" placeholder="Search by name or email..." oninput="adminFilterUsers(this.value)"
          style="width:100%; padding:10px 14px; border:1px solid var(--grey-light); border-radius:8px; font-size:0.9rem; outline:none;">
      </div>

      <div id="admin-users-table-wrapper">
        ${renderAdminUsersTable(enriched)}
      </div>
    </div>
  `;
}

function renderAdminUsersTable(list) {
  if (list.length === 0) {
    return `<div style="text-align:center; padding:40px; color:var(--grey-dark);"><i class="fa-solid fa-user-slash" style="font-size:2rem; margin-bottom:10px; display:block;"></i>No registered customers yet.</div>`;
  }
  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Registered</th>
          <th>Orders</th>
          <th>Total Spend</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(u => `
          <tr id="user-row-${u.id || u.email}">
            <td><strong>${u.firstName || ''} ${u.lastName || ''}</strong></td>
            <td style="font-size:0.85rem; color:var(--grey-dark);">${u.email}</td>
            <td style="font-size:0.8rem;">${u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : 'N/A'}</td>
            <td>${u.orderCount}</td>
            <td>${formatPrice(u.totalSpend)}</td>
            <td>
              <span class="badge-status ${u.suspended ? 'cancelled' : 'confirmed'}" style="cursor:pointer;" onclick="adminToggleUserSuspend('${u.email}')">
                ${u.suspended ? 'Suspended' : 'Active'}
              </span>
            </td>
            <td>
              <div style="display:flex; gap:6px;">
                <button class="btn btn-secondary btn-sm" onclick="adminViewUserOrders('${u.email}')" title="View Orders"><i class="fa-solid fa-receipt"></i></button>
                <button class="btn btn-secondary btn-sm" onclick="adminToggleUserSuspend('${u.email}')" title="Suspend / Unsuspend"><i class="fa-solid fa-ban"></i></button>
                <button class="btn btn-sm" style="background: var(--danger-color, #ef4444); color:#fff; border:none; border-radius:6px; padding:5px 10px; cursor:pointer;" onclick="adminDeleteUser('${u.email}')" title="Delete User"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function adminFilterUsers(query) {
  const allUsers = (DB.users || []).map(u => {
    const userOrders = DB.orders.filter(o => o.email === u.email);
    return { ...u, orderCount: userOrders.length, totalSpend: userOrders.reduce((s,o) => s+o.total, 0) };
  });
  const q = query.toLowerCase();
  const filtered = allUsers.filter(u =>
    (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  const wrapper = document.getElementById('admin-users-table-wrapper');
  if (wrapper) wrapper.innerHTML = renderAdminUsersTable(filtered);
}

function adminToggleUserSuspend(email) {
  const idx = DB.users.findIndex(u => u.email === email);
  if (idx === -1) return;
  DB.users[idx].suspended = !DB.users[idx].suspended;
  localStorage.setItem('blue_aura_users', JSON.stringify(DB.users));
  showToast(DB.users[idx].suspended ? `User ${email} suspended.` : `User ${email} reinstated.`);
  // If suspended user is currently logged in, force logout
  if (DB.users[idx].suspended && STATE.currentUser && STATE.currentUser.email === email) {
    STATE.currentUser = null;
    localStorage.removeItem('blue_aura_session');
  }
  switchAdminTab('users');
}

function adminDeleteUser(email) {
  if (!confirm(`Are you sure you want to permanently delete the account for ${email}? This cannot be undone.`)) return;
  DB.users = DB.users.filter(u => u.email !== email);
  localStorage.setItem('blue_aura_users', JSON.stringify(DB.users));
  // Force logout if this is current user
  if (STATE.currentUser && STATE.currentUser.email === email) {
    STATE.currentUser = null;
    localStorage.removeItem('blue_aura_session');
  }
  showToast(`User account for ${email} has been deleted.`);
  switchAdminTab('users');
}

function adminViewUserOrders(email) {
  const userOrders = DB.orders.filter(o => o.email === email);
  if (userOrders.length === 0) {
    showToast('This customer has no orders yet.');
    return;
  }
  // Switch to orders tab and pre-filter
  switchAdminTab('orders');
  setTimeout(() => {
    const searchEl = document.getElementById('admin-order-search');
    if (searchEl) { searchEl.value = email; searchEl.dispatchEvent(new Event('input')); }
  }, 100);
}

function adminExportUsersCSV() {
  const headers = ['First Name','Last Name','Email','Registered At','Orders','Total Spend','Status'];
  const rows = (DB.users || []).map(u => {
    const ords = DB.orders.filter(o => o.email === u.email);
    const spend = ords.reduce((s,o) => s+o.total, 0);
    return [
      u.firstName || '', u.lastName || '', u.email,
      u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : 'N/A',
      ords.length, spend.toFixed(2),
      u.suspended ? 'Suspended' : 'Active'
    ];
  });
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'blue_aura_customers.csv';
  a.click();
  showToast('Customer list exported as CSV.');
}

// PROMO CODES ADMIN TAB
function renderAdminPromos(mount) {
  const codes = DB.settings.promoCodes || {};
  const codeEntries = Object.entries(codes);

  mount.innerHTML = `
    <div class="admin-panel-card" style="max-width:700px;">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Promo Code Manager</h3>
      </div>

      <table class="admin-table" style="margin-bottom:25px;">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="promo-codes-list">
          ${renderPromoRows(codeEntries)}
        </tbody>
      </table>

      <div class="admin-card-header" style="border-top: 1px solid var(--grey-light); padding-top:20px; margin-top:0;">
        <h3 class="admin-card-title" style="font-size:1rem;">Add New Promo Code</h3>
      </div>
      <form class="form-grid" onsubmit="adminAddPromoCode(event)">
        <div class="form-field">
          <label for="promo-code-input">Promo Code (uppercase)</label>
          <input type="text" id="promo-code-input" placeholder="e.g. WINTER30" required style="text-transform:uppercase;">
        </div>
        <div class="form-field">
          <label for="promo-discount-input">Discount (0.10 = 10%, 1.00 = Free Shipping)</label>
          <input type="number" id="promo-discount-input" step="0.01" min="0.01" max="1.00" placeholder="0.10" required>
        </div>
        <div class="form-group-full" style="text-align:right; margin-top:10px;">
          <button type="submit" class="btn btn-primary" style="width:100%;"><i class="fa-solid fa-plus"></i> Add Promo Code</button>
        </div>
      </form>
    </div>
  `;
}

function renderPromoRows(entries) {
  if (entries.length === 0) return `<tr><td colspan="4" style="text-align:center; color:var(--grey-dark);">No promo codes defined.</td></tr>`;
  return entries.map(([code, val]) => `
    <tr>
      <td><strong style="font-family:monospace; font-size:1rem; color:var(--primary-color);">${code}</strong></td>
      <td>${val === 1.0 ? '100% (Free Shipping)' : (val * 100).toFixed(0) + '% off'}</td>
      <td><span class="badge-status confirmed">Active</span></td>
      <td>
        <button class="btn btn-sm" style="background:var(--danger-color,#ef4444); color:#fff; border:none; border-radius:6px; padding:5px 12px; cursor:pointer;" onclick="adminDeletePromo('${code}')">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </td>
    </tr>
  `).join('');
}

function adminAddPromoCode(e) {
  e.preventDefault();
  const code = document.getElementById('promo-code-input').value.trim().toUpperCase();
  const discount = parseFloat(document.getElementById('promo-discount-input').value);
  if (!code || isNaN(discount)) return;
  DB.settings.promoCodes[code] = discount;
  localStorage.setItem('blue_aura_settings', JSON.stringify(DB.settings));
  showToast(`Promo code ${code} added successfully!`);
  switchAdminTab('promos');
}

function adminDeletePromo(code) {
  if (!DB.settings.promoCodes[code]) return;
  delete DB.settings.promoCodes[code];
  localStorage.setItem('blue_aura_settings', JSON.stringify(DB.settings));
  showToast(`Promo code ${code} removed.`);
  switchAdminTab('promos');
}

// SETTINGS ADMIN TAB
function renderAdminSettings(mount) {
  mount.innerHTML = `
    <div class="admin-panel-card" style="max-width: 700px;">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Configure Store Settings</h3>
      </div>
      
      <form class="form-grid" onsubmit="saveAdminSettings(event)">
        <div class="form-field">
          <label for="se-storeName">Store Brand Name</label>
          <input type="text" id="se-storeName" value="${DB.settings.storeName}" required>
        </div>
        <div class="form-field">
          <label for="se-shippingBase">Base Courier Shipping Fee (Rs.)</label>
          <input type="number" id="se-shippingBase" value="${DB.settings.shippingBase}" required>
        </div>
        <div class="form-field">
          <label for="se-whatsapp">Customer Support WhatsApp Phone</label>
          <input type="text" id="se-whatsapp" value="${DB.settings.whatsappNumber}" required>
        </div>
        <div class="form-field">
          <label for="se-googleId">Google Authentication Client ID</label>
          <input type="text" id="se-googleId" value="${DB.settings.googleClientId}">
        </div>
        <div class="form-field">
          <label for="se-fbPixel">Facebook Pixel Identifier Code</label>
          <input type="text" id="se-fbPixel" value="${DB.settings.facebookPixel}">
        </div>
        <div class="form-field">
          <label for="se-ga">Google Analytics Measurement ID</label>
          <input type="text" id="se-ga" value="${DB.settings.googleAnalytics}">
        </div>
        
        <div class="form-group-full" style="text-align: right; margin-top:20px;">
          <button type="submit" class="btn btn-primary" style="width: 100%;">Save Store Settings</button>
        </div>
      </form>
    </div>
  `;
}

function saveAdminSettings(e) {
  e.preventDefault();
  DB.settings.storeName = document.getElementById("se-storeName").value.trim();
  DB.settings.shippingBase = parseFloat(document.getElementById("se-shippingBase").value);
  DB.settings.whatsappNumber = document.getElementById("se-whatsapp").value.trim();
  DB.settings.googleClientId = document.getElementById("se-googleId").value.trim();
  DB.settings.facebookPixel = document.getElementById("se-fbPixel").value.trim();
  DB.settings.googleAnalytics = document.getElementById("se-ga").value.trim();

  localStorage.setItem("blue_aura_settings", JSON.stringify(DB.settings));
  showToast("Store settings saved successfully!");
  switchAdminTab('settings');
}

// ----------------------------------------
// PDF INVOICE GENERATOR (Client-Side JS PDF)
// ----------------------------------------
function generateInvoicePDF(order, autoDownload = false) {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    logToTerminal("[PDF Engine] Error: jsPDF library not loaded from CDN.");
    return null;
  }

  const doc = new jsPDF();
  
  // Custom styling details for luxury look
  doc.setFillColor(13, 13, 13); // Midnight Black banner
  doc.rect(0, 0, 210, 40, "F");

  // Title Logo
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(141, 185, 255); // Soft blue aura color
  doc.text("BLUE AURA", 20, 26);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text("PREMIUM CLOTHING SYSTEM", 66, 25);

  // Invoice label
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("OFFICIAL INVOICE", 150, 26);

  // Metadata block
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.text(`Invoice ID: INV-${order.id}`, 20, 55);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 61);
  doc.text(`Payment: ${order.paymentMethod}`, 20, 67);
  
  // Highlight order status
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 197, 94); // success green
  doc.text("ORDER STATUS: CONFIRMED", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);

  doc.text("Billed To:", 130, 55);
  doc.setFont("helvetica", "bold");
  doc.text(order.customerName, 130, 61);
  doc.setFont("helvetica", "normal");
  // Wrapping long addresses
  const addrLines = doc.splitTextToSize(order.address, 70);
  doc.text(addrLines, 130, 67);
  doc.text(`Phone: ${order.phone}`, 130, 67 + (addrLines.length * 5));

  // Table items grid header
  const tableTop = 95;
  doc.setFillColor(248, 250, 252);
  doc.rect(20, tableTop, 170, 8, "F");
  
  doc.setFont("helvetica", "bold");
  doc.text("Description", 22, tableTop + 6);
  doc.text("Qty", 120, tableTop + 6);
  doc.text("Unit Price", 140, tableTop + 6);
  doc.text("Amount", 170, tableTop + 6);
  
  doc.line(20, tableTop + 8, 190, tableTop + 8);
  doc.setFont("helvetica", "normal");

  let y = tableTop + 15;
  order.items.forEach(item => {
    const p = DB.products.find(x => x.id === item.productId);
    const title = p ? p.title : "Garment Product";
    const desc = `${title} (${item.size}/${item.color})`;
    
    // Draw
    doc.text(desc, 22, y);
    doc.text(item.quantity.toString(), 122, y);
    doc.text(formatPrice(p ? p.price : 0), 140, y);
    doc.text(formatPrice((p ? p.price : 0) * item.quantity), 170, y);
    
    y += 10;
  });

  doc.line(20, y - 5, 190, y - 5);

  // Totals layout
  const totX = 130;
  doc.text("Subtotal:", totX, y);
  doc.text(formatPrice(order.subtotal), 170, y);

  doc.text("Courier Shipping:", totX, y + 6);
  doc.text(formatPrice(order.shippingFee), 170, y + 6);

  if (order.discount > 0) {
    doc.setTextColor(239, 68, 68);
    doc.text(`Discount (${order.promoCodeUsed || 'Promo'}):`, totX, y + 12);
    doc.text(`-${formatPrice(order.discount)}`, 170, y + 12);
    doc.setTextColor(60, 60, 60);
  }

  const grandOffset = order.discount > 0 ? 18 : 12;
  doc.setFont("helvetica", "bold");
  doc.text("Grand Total:", totX, y + grandOffset);
  doc.text(formatPrice(order.total), 170, y + grandOffset);

  // Footer note
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for shopping at Blue Aura Clothing. This is a computer-generated transaction record.", 20, 270);

  if (autoDownload) {
    doc.save(`Invoice_${order.id}.pdf`);
  }

  return doc;
}

function adminDownloadInvoicePDF(orderId) {
  const order = DB.orders.find(o => o.id === orderId);
  if (order) {
    generateInvoicePDF(order, true);
    showToast("Invoice PDF downloaded successfully!");
  }
}

// ----------------------------------------
// EMAIL SIMULATOR & LOGGING HOOKS
// ----------------------------------------
const emailTrigger = document.getElementById("email-simulator-toggle");
const emailClose = document.getElementById("email-sim-modal-close");
const emailOverlay = document.getElementById("email-sim-modal-overlay");

if (emailTrigger) emailTrigger.addEventListener("click", () => {
  if (emailOverlay) {
    renderEmailSelectorOptions();
    emailOverlay.classList.add("active");
    // Clear badge
    const badge = document.getElementById("email-simulator-badge");
    if (badge) {
      badge.style.display = "none";
      badge.innerText = "0";
    }
  }
});

if (emailClose) emailClose.addEventListener("click", () => {
  if (emailOverlay) emailOverlay.classList.remove("active");
});

function loadSimulatedEmails() {
  const stored = localStorage.getItem("blue_aura_emails");
  if (stored) {
    STATE.sentEmails = JSON.parse(stored);
  } else {
    STATE.sentEmails = [];
  }
}

function saveEmailsToLocalStorage() {
  localStorage.setItem("blue_aura_emails", JSON.stringify(STATE.sentEmails));
}

// Render selector dropdown in Email simulator widget
function renderEmailSelectorOptions() {
  const sel = document.getElementById("email-sim-selector");
  const countEl = document.getElementById("email-sim-total-sent");
  if (!sel) return;

  if (countEl) countEl.innerText = `${STATE.sentEmails.length} emails`;

  if (STATE.sentEmails.length === 0) {
    sel.innerHTML = `<option value="">No emails sent yet</option>`;
    return;
  }

  sel.innerHTML = STATE.sentEmails.map((em, idx) => `
    <option value="${idx}">[${new Date(em.timestamp).toLocaleTimeString()}] To: ${em.to} - ${em.subject}</option>
  `).join("");

  // Select last sent email and render body
  sel.value = STATE.sentEmails.length - 1;
  renderSimulatedEmailBody(STATE.sentEmails.length - 1);
}

const emailSelector = document.getElementById("email-sim-selector");
if (emailSelector) {
  emailSelector.addEventListener("change", (e) => {
    const idx = parseInt(e.target.value);
    if (!isNaN(idx)) {
      renderSimulatedEmailBody(idx);
    } else {
      clearSimulatedEmailBody();
    }
  });
}

function clearSimulatedEmailBody() {
  const body = document.getElementById("email-sim-body-view");
  const attachRow = document.getElementById("email-sim-invoice-download-row");
  if (body) {
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--grey-dark);">
        <i class="fa-solid fa-envelope-open" style="font-size: 2.5rem; margin-bottom: 15px;"></i>
        <p>No email selected.</p>
      </div>
    `;
  }
  if (attachRow) attachRow.classList.add("d-none");
}

function renderSimulatedEmailBody(idx) {
  const em = STATE.sentEmails[idx];
  const body = document.getElementById("email-sim-body-view");
  const attachRow = document.getElementById("email-sim-invoice-download-row");
  const downloadBtn = document.getElementById("email-sim-invoice-download-btn");

  if (!em || !body) return;

  // Render headers + body
  body.innerHTML = `
    <div style="border-bottom: 1px solid var(--grey-light); padding-bottom: 10px; margin-bottom: 15px; font-size: 0.85rem; color: var(--secondary-color);">
      <strong>Subject:</strong> ${em.subject}<br>
      <strong>To:</strong> ${em.to}<br>
      <strong>From:</strong> Care | Blue Aura &lt;smtp.blueaura.auth@gmail.com&gt;
    </div>
    <div style="font-size: 0.9rem;">
      ${em.htmlContent}
    </div>
  `;

  if (em.hasInvoiceAttachment && attachRow && downloadBtn) {
    attachRow.classList.remove("d-none");
    // Bind click to generate that specific invoice PDF
    downloadBtn.onclick = () => {
      const order = DB.orders.find(o => o.id === em.orderId);
      if (order) {
        generateInvoicePDF(order, true);
      } else {
        showToast("Error: Associated order not found in database.");
      }
    };
  } else if (attachRow) {
    attachRow.classList.add("d-none");
  }
}

// Triggers SMTP mail log updates + saves emails
async function triggerSMTPOrederAlert(order, actionType) {
  let subject = "";
  let headline = "";
  let bodyText = "";
  let isConfirm = false;

  // Status mapping: placed, confirmed, shipped, delivered, cancelled
  if (actionType === "placed") {
    subject = `Order Placed - ${order.id}`;
    headline = "Thank You For Your Order!";
    bodyText = "We have received your order details and are preparing it for verification. Below are your order items. You will receive an invoice as soon as the order is officially confirmed by our admin team.";
  } else if (actionType === "confirmed") {
    subject = `Order Confirmed & Invoice - ${order.id}`;
    headline = "Your Order is Confirmed!";
    bodyText = "We have verified your details and payment. Attached you will find your official transactional PDF Invoice. Our warehouse team is currently packaging your items.";
    isConfirm = true;
  } else if (actionType === "shipped") {
    subject = `Order Shipped - ${order.id}`;
    headline = "Your Order has Shipped!";
    bodyText = `Great news! Your package has been handed over to our courier partner. You can track your shipment using tracking code: <strong>${order.trackingNumber}</strong> on our tracking portal.`;
  } else if (actionType === "delivered") {
    subject = `Order Delivered - ${order.id}`;
    headline = "Order Delivered!";
    bodyText = `Your package for Order ID ${order.id} has been delivered and signed off. We hope you love your new premium garments! Tell us about your experience on Instagram by tagging @BlueAura.`;
  } else if (actionType === "cancelled") {
    subject = `Order Cancelled - ${order.id}`;
    headline = "Order Cancellation Notification";
    bodyText = "This email is to notify you that your order has been cancelled in our system. Any payment holds will be released within 5 business days. Please contact customer support if you need further details.";
  }

  // Formatted HTML Email Body Template (Sleek minimalist style)
  const emailHtml = `
    <div style="font-family:'Outfit',sans-serif; max-width:600px; margin:0 auto; border:1px solid #e2e8f0; padding:30px; border-radius:4px; color:#0f172a;">
      <div style="text-align:center; border-bottom:1px solid #f1f5f9; padding-bottom:20px; margin-bottom:25px;">
        <h2 style="font-family:'Playfair Display',serif; text-transform:uppercase; letter-spacing:1px; margin:0; font-size:24px; color:#0d0d0d;">BLUE AURA</h2>
        <span style="font-size:10px; color:#64748b; letter-spacing:1.5px; text-transform:uppercase;">Clean Luxury Clothing</span>
      </div>
      
      <h3 style="font-size:18px; margin-bottom:15px; color:#0d0d0d;">${headline}</h3>
      <p style="font-size:14px; line-height:1.6; color:#475569; margin-bottom:25px;">
        Dear ${order.customerName},<br><br>
        ${bodyText}
      </p>
      
      <div style="background-color:#f8fafc; padding:20px; border-radius:4px; margin-bottom:25px;">
        <h4 style="margin:0 0 10px 0; font-size:13px; text-transform:uppercase; color:#0f172a;">Order Summary</h4>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Order ID: <strong>${order.id}</strong></p>
        <p style="margin:0 0 15px 0; font-size:12px; color:#64748b;">Date: ${new Date(order.date).toLocaleDateString()}</p>
        
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
          <thead>
            <tr style="border-bottom:1px solid #cbd5e1; text-align:left;">
              <th style="padding:6px 0; color:#0f172a;">Item Description</th>
              <th style="padding:6px 0; color:#0f172a; text-align:center;">Qty</th>
              <th style="padding:6px 0; color:#0f172a; text-align:right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => {
              const p = DB.products.find(x => x.id === item.productId);
              return `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:8px 0;">${p ? p.title : 'Garment'} (${item.size}/${item.color})</td>
                  <td style="padding:8px 0; text-align:center;">${item.quantity}</td>
                  <td style="padding:8px 0; text-align:right;">${formatPrice((p ? p.price : 0) * item.quantity)}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
        
        <div style="border-top:1px solid #cbd5e1; margin-top:10px; padding-top:10px; text-align:right; font-size:12px; color:#475569;">
          Subtotal: ${formatPrice(order.subtotal)}<br>
          Courier shipping: ${formatPrice(order.shippingFee)}<br>
          ${order.discount > 0 ? `Discount: -${formatPrice(order.discount)}<br>` : ''}
          <strong style="font-size:14px; color:#0f172a;">Grand Total: ${formatPrice(order.total)}</strong>
        </div>
      </div>
      
      <div style="text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:20px; margin-top:30px;">
        Need support? Contact us at care@blue-aura-fashion.com or chat on WhatsApp +94 77 123 4567.<br>
        Colombo, Sri Lanka.
      </div>
    </div>
  `;

  const newEmail = {
    timestamp: new Date().toISOString(),
    to: order.email,
    subject: subject,
    htmlContent: emailHtml,
    hasInvoiceAttachment: isConfirm,
    orderId: order.id
  };

  STATE.sentEmails.push(newEmail);
  saveEmailsToLocalStorage();

  // Update simulator notifications counts in UI widget
  const badge = document.getElementById("email-simulator-badge");
  if (badge) {
    badge.innerText = parseInt(badge.innerText || "0") + 1;
    badge.style.display = "flex";
  }

  // Update Logs
  logToTerminal(`[SMTP Service] Connecting to smtp.gmail.com:465...`);
  logToTerminal(`[SMTP Service] Authorization Handshake successful (user: smtp.blueaura.auth@gmail.com).`);
  logToTerminal(`[SMTP Service] Dispatching Email payload to: <${order.email}>`);
  if (isConfirm) {
    logToTerminal(`[Jakarta PDF Library] Assembling Invoice buffer bytes, attaching Invoice_${order.id}.pdf...`);
  }
  logToTerminal(`[SMTP Service] Email delivered. SMTP server returned message ID: <${Math.floor(100000 + Math.random()*900000)}@gmail.com>`);

  // Live Node.js Email Trigger (If backend is active)
  if (STATE.isTestingLiveBackend) {
    try {
      await fetch(`${STATE.liveBackendUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: order.email,
          subject: subject,
          actionType: actionType,
          order: order
        })
      });
      logToTerminal(`[API System] Live Gmail SMTP automation successfully triggered on node backend.`);
    } catch (err) {
      logToTerminal(`[API Error] Could not trigger live email dispatcher: ${err.message}`);
    }
  }
}

// ----------------------------------------
// FRONTEND VIEWPORT RENDER HELPERS
// ----------------------------------------

// Product list grid compiler
function renderProductListMarkup(productsList) {
  if (productsList.length === 0) {
    return `<div style="grid-column: span 4; text-align: center; color: var(--grey-dark); padding: 40px;">No products found in this category.</div>`;
  }

  return productsList.map(p => `
    <div class="product-card" onclick="window.location.hash='product/${p.id}'">
      <div class="product-img-wrapper">
        <img src="${p.images[0]}" class="product-card-img primary" alt="${p.title}" loading="lazy">
        ${p.images[1] ? `<img src="${p.images[1]}" class="product-card-img secondary" alt="${p.title}" loading="lazy">` : ''}
        
        <div class="product-badges">
          ${p.offers ? `<span class="badge-tag badge-sale">${p.offers}</span>` : ''}
          ${p.inventory === 0 ? `<span class="badge-tag badge-out-stock">Out of Stock</span>` : ''}
          ${(new Date() - new Date(p.uploadedAt)) < 3 * 24 * 60 * 60 * 1000 ? `<span class="badge-tag badge-new">New</span>` : ''}
        </div>
        
        <!-- Floating wishlist -->
        <button class="product-wishlist-btn wl-btn-${p.id} ${STATE.wishlist.includes(p.id) ? 'active' : ''}" 
                onclick="toggleWishlist(${p.id}, event)" aria-label="Add to wishlist">
          <i class="${STATE.wishlist.includes(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        
        <span class="product-quick-view" onclick="triggerQuickView(${p.id}, event)">Quick View</span>
      </div>
      
      <div class="product-card-info">
        <span class="product-card-category">${p.category} | ${p.type}</span>
        <h3 class="product-card-title">${p.title}</h3>
        <div class="product-card-price-row">
          <span class="price-regular">${formatPrice(p.price)}</span>
          ${p.oldPrice > p.price ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        
        <div class="product-card-swatches">
          ${p.colors.map(col => `
            <span class="swatch-dot" style="background-color: ${getHexColor(col)};" title="${col}"></span>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// Quick View Modal Dispatch
function triggerQuickView(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const p = DB.products.find(x => x.id === productId);
  if (!p) return;

  const overlay = document.getElementById("quickview-modal-overlay");
  const body = document.getElementById("quickview-modal-body");
  if (!overlay || !body) return;

  STATE.selectedProductQty = 1;
  STATE.selectedColor = p.colors[0];
  STATE.selectedSize = p.sizes[0];

  body.innerHTML = `
    <div class="product-detail-layout" style="margin-bottom:0; gap:30px;">
      <div class="gallery-main" style="padding-top:110%;">
        <img src="${p.images[0]}" class="main-img-show" alt="${p.title}">
      </div>
      
      <div class="product-detail-info">
        <span class="detail-category">${p.category} | ${p.type}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; margin-bottom:10px;">${p.title}</h2>
        
        <div class="detail-price-row" style="margin-bottom:15px; padding-bottom:10px;">
          <span class="detail-price" style="font-size:1.3rem;">${formatPrice(p.price)}</span>
          ${p.oldPrice > p.price ? `<span class="detail-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        
        <p class="detail-desc" style="font-size:0.85rem; margin-bottom:15px;">${p.description.slice(0, 150)}...</p>
        
        <div class="option-group" style="margin-bottom:15px;">
          <div class="option-label" style="font-size:0.75rem;">Color: <span class="option-selected">${p.colors[0]}</span></div>
          <div class="swatches-flex">
            ${p.colors.map(col => `
              <div class="swatch-option active" style="width:24px; height:24px; background-color: ${getHexColor(col)};"></div>
            `).join("")}
          </div>
        </div>

        <div class="purchase-actions" style="margin-bottom:0;">
          <button class="btn btn-primary" onclick="closeQuickView(); addProductToCart(${p.id});" style="height:45px;">Add to Bag</button>
          <a href="#product/${p.id}" class="btn btn-secondary" onclick="closeQuickView()" style="height:45px; font-size:0.8rem;">View Full Details</a>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add("active");
}

function closeQuickView() {
  const overlay = document.getElementById("quickview-modal-overlay");
  if (overlay) overlay.classList.remove("active");
}

const quickCloseBtn = document.getElementById("quickview-modal-close");
if (quickCloseBtn) quickCloseBtn.addEventListener("click", closeQuickView);

// Routing state event listeners
window.addEventListener("hashchange", router);

function hideLoadingOverlay() {
  const loading = document.getElementById("loading-overlay");
  if (!loading) return;
  loading.style.opacity = "0";
  loading.style.visibility = "hidden";
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(hideLoadingOverlay, 600);
  initDB();
  initFirebaseAuth();
  router();
});

window.addEventListener("load", () => {
  setTimeout(hideLoadingOverlay, 300);
});

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(hideLoadingOverlay, 600);
}

// Setup Mobile Menu toggle
const menuTrigger = document.getElementById("mobile-menu-trigger");
const navMenuLinks = document.getElementById("nav-menu-links");
if (menuTrigger && navMenuLinks) {
  menuTrigger.addEventListener("click", () => {
    navMenuLinks.classList.toggle("active");
  });
}

// Close popup modals on backdrop click
const modalOverlays = document.querySelectorAll(".modal-overlay");
modalOverlays.forEach(ol => {
  ol.addEventListener("click", (e) => {
    if (e.target === ol) {
      ol.classList.remove("active");
    }
  });
});
const emailSimClose = document.getElementById("email-sim-modal-close");
if (emailSimClose) {
  emailSimClose.addEventListener("click", () => {
    const ol = document.getElementById("email-sim-modal-overlay");
    if (ol) ol.classList.remove("active");
  });
}

// ----------------------------------------
// ADMIN SECURITY LOGIN
// ----------------------------------------
function renderAdminLogin() {
  viewport.innerHTML = `
    <div class="admin-login-wrapper">
      <div class="admin-login-card">
        <div class="admin-login-logo">
          <div class="logo-icon"></div>
          <div class="logo-text">Blue <span>Aura</span></div>
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--grey-dark); letter-spacing:1px; margin-top:5px;">Admin Security Portal</div>
        </div>
        
        <form onsubmit="handleAdminLoginSubmit(event)">
          <div class="form-field" style="margin-bottom: 15px;">
            <label for="ad-user">Admin Username</label>
            <input type="text" id="ad-user" required autocomplete="username" placeholder="Username">
          </div>
          <div class="form-field" style="margin-bottom: 25px;">
            <label for="ad-pass">Security Password</label>
            <input type="password" id="ad-pass" required autocomplete="current-password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; height: 45px;">Access Dashboard</button>
        </form>
      </div>
    </div>
  `;
}

function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const u = document.getElementById("ad-user").value.trim();
  const p = document.getElementById("ad-pass").value;

  if (u === "blueaura" && p === "ba123") {
    sessionStorage.setItem("admin_authenticated", "true");
    logToTerminal("[Admin Security] Security login validation successful. Session activated.");
    showToast("Access Granted! Welcome to Admin Dashboard.");
    window.location.hash = "admin";
  } else {
    logToTerminal("[Admin Security] Security login validation failed. Incorrect credentials.");
    showToast("Access Denied: Incorrect username or password.");
  }
}

