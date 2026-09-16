// ============================================================
// CLOUDINARY CONFIG — replace these two values with your own
// (Cloudinary dashboard → Settings → Upload → Upload presets,
// create an "Unsigned" preset)
// ============================================================
const CLOUDINARY_CLOUD_NAME = 'uws1nhjc';
const CLOUDINARY_UPLOAD_PRESET = 'LoGitWebCloud';
const CLOUDINARY_FOLDER = 'repo-ec2-website/images'; // matches the diagram's target folder

// ============================================================
// State (persisted to localStorage so it survives a refresh —
// this is a front-end-only demo, there is no real database)
// ============================================================
const PRODUCTS_KEY = 'terraLeaf_products';
const CART_KEY = 'terraLeaf_cart';

const seedProducts = [
  {
    id: 'seed-1',
    name: 'Fiddle Leaf Fig',
    price: 38.00,
    desc: 'Bright, indirect light. Statement piece for a corner.',
    image: 'images/fiddle-leaf-fig.svg'
  },
  {
    id: 'seed-2',
    name: 'Snake Plant',
    price: 22.00,
    desc: 'Nearly impossible to kill. Low light tolerant.',
    image: 'images/snake-plant.svg'
  },
  {
    id: 'seed-3',
    name: 'Monstera Deliciosa',
    price: 45.00,
    desc: 'Iconic split leaves. Loves a humid bathroom.',
    image: 'images/monstera-deliciosa.svg'
  }
];

function loadProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seedProducts));
    return [...seedProducts];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [...seedProducts];
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function loadCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let products = loadProducts();
let cart = loadCart();

// ============================================================
// Rendering
// ============================================================
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');

function renderProducts() {
  productGrid.innerHTML = '';
  emptyState.hidden = products.length > 0;

  products.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-photo" src="${p.image}" alt="${escapeHtml(p.name)}">
      <div class="product-info">
        <h3>${escapeHtml(p.name)}</h3>
        <p class="product-desc">${escapeHtml(p.desc || '')}</p>
        <div class="product-row">
          <span class="price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// Cart
// ============================================================
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }
  saveCart(cart);
  renderCart();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${escapeHtml(item.name)}">
      <div class="cart-item-info">
        <h4>${escapeHtml(item.name)}</h4>
        <div class="cart-item-row">
          <span>Qty ${item.qty} · $${item.price.toFixed(2)}</span>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll('.remove-item').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

function openCart() {
  cartDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
}
function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
}

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCartDrawer);
drawerOverlay.addEventListener('click', () => {
  closeCartDrawer();
  closeModal();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return;
  alert('This is a practice storefront, so checkout is simulated. Total charged: ' + cartTotalEl.textContent);
  cart = [];
  saveCart(cart);
  renderCart();
  closeCartDrawer();
});

// ============================================================
// Add Plant modal + Cloudinary upload
// ============================================================
const modal = document.getElementById('addPlantModal');
const modalOverlay = document.getElementById('modalOverlay');
const addPlantForm = document.getElementById('addPlantForm');
const uploadStatus = document.getElementById('uploadStatus');
const submitBtn = document.getElementById('submitPlantBtn');

function openModal() {
  modal.classList.add('active');
  modalOverlay.classList.add('active');
}
function closeModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
  addPlantForm.reset();
  uploadStatus.textContent = '';
  uploadStatus.className = 'upload-status';
}

document.getElementById('addPlantBtn').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

async function uploadToCloudinary(file) {
  if (CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME') {
    throw new Error('Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in script.js first.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', CLOUDINARY_FOLDER);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || 'Upload failed');
  }

  const data = await response.json();
  return data.secure_url; // the hosted image URL to store with the product
}

addPlantForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('plantName').value.trim();
  const price = parseFloat(document.getElementById('plantPrice').value);
  const desc = document.getElementById('plantDesc').value.trim();
  const fileInput = document.getElementById('plantImage');
  const file = fileInput.files[0];

  if (!name || isNaN(price) || !file) return;

  submitBtn.disabled = true;
  uploadStatus.className = 'upload-status';
  uploadStatus.textContent = 'Uploading image to Cloudinary…';

  try {
    const imageUrl = await uploadToCloudinary(file);

    const newProduct = {
      id: 'p-' + Date.now(),
      name,
      price,
      desc,
      image: imageUrl
    };

    products.push(newProduct);
    saveProducts(products);
    renderProducts();

    uploadStatus.className = 'upload-status success';
    uploadStatus.textContent = 'Added! Closing…';

    setTimeout(closeModal, 700);
  } catch (err) {
    uploadStatus.className = 'upload-status error';
    uploadStatus.textContent = err.message || 'Something went wrong.';
  } finally {
    submitBtn.disabled = false;
  }
});

// ============================================================
// Init
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
renderCart();
