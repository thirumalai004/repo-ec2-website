// ============================================================
// Same Cloudinary config as script.js — keep these two in sync,
// or better, replace both with your real values.
// ============================================================
const CLOUDINARY_CLOUD_NAME = 'uws1nhjc';
const CLOUDINARY_UPLOAD_PRESET = 'LoGitWebCloud';
const CLOUDINARY_FOLDER = 'repo-ec2-website/images';

const PRODUCTS_KEY = 'terraLeaf_products';

function loadProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

let products = loadProducts();
let pendingDeleteId = null;

// ============================================================
// Table rendering
// ============================================================
const tableBody = document.getElementById('adminTableBody');
const emptyState = document.getElementById('adminEmptyState');
const statsEl = document.getElementById('adminStats');

function renderStats() {
  const count = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  statsEl.innerHTML = `
    <div class="stat-card">
      <span class="stat-value">${count}</span>
      <span class="stat-label">Products listed</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">$${totalValue.toFixed(2)}</span>
      <span class="stat-label">Combined listed value</span>
    </div>
  `;
}

function renderTable() {
  tableBody.innerHTML = '';
  emptyState.hidden = products.length > 0;

  products.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.image}" alt="${escapeHtml(p.name)}"></td>
      <td>${escapeHtml(p.name)}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td class="desc-cell">${escapeHtml(p.desc || '—')}</td>
      <td>
        <div class="row-actions">
          <button class="edit-action" data-id="${p.id}">Edit</button>
          <button class="delete-action" data-id="${p.id}">Remove</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  document.querySelectorAll('.edit-action').forEach((btn) => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });
  document.querySelectorAll('.delete-action').forEach((btn) => {
    btn.addEventListener('click', () => openConfirmDelete(btn.dataset.id));
  });

  renderStats();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// Add / Edit modal
// ============================================================
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const form = document.getElementById('productForm');
const uploadStatus = document.getElementById('uploadStatus');
const submitBtn = document.getElementById('submitBtn');
const photoOptionalHint = document.getElementById('photoOptionalHint');
const currentImagePreview = document.getElementById('currentImagePreview');
const currentImageImg = document.getElementById('currentImageImg');

const idField = document.getElementById('productId');
const nameField = document.getElementById('productName');
const priceField = document.getElementById('productPrice');
const descField = document.getElementById('productDesc');
const imageField = document.getElementById('productImage');

function openAddModal() {
  modalTitle.textContent = 'Add product';
  idField.value = '';
  form.reset();
  imageField.required = true;
  photoOptionalHint.hidden = true;
  currentImagePreview.hidden = true;
  uploadStatus.textContent = '';
  uploadStatus.className = 'upload-status';
  openModal();
}

function openEditModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  modalTitle.textContent = 'Edit product';
  idField.value = product.id;
  nameField.value = product.name;
  priceField.value = product.price;
  descField.value = product.desc || '';
  imageField.value = '';
  imageField.required = false;
  photoOptionalHint.hidden = false;
  currentImagePreview.hidden = false;
  currentImageImg.src = product.image;
  uploadStatus.textContent = '';
  uploadStatus.className = 'upload-status';
  openModal();
}

function openModal() {
  modal.classList.add('active');
  modalOverlay.classList.add('active');
}
function closeModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

document.getElementById('openAddBtn').addEventListener('click', openAddModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

async function uploadToCloudinary(file) {
  if (CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME') {
    throw new Error('Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in admin.js first.');
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
  return data.secure_url;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = idField.value;
  const name = nameField.value.trim();
  const price = parseFloat(priceField.value);
  const desc = descField.value.trim();
  const file = imageField.files[0];

  if (!name || isNaN(price)) return;
  if (!id && !file) return; // new products require a photo

  submitBtn.disabled = true;
  uploadStatus.className = 'upload-status';

  try {
    let imageUrl = null;

    if (file) {
      uploadStatus.textContent = 'Uploading image to Cloudinary…';
      imageUrl = await uploadToCloudinary(file);
    }

    if (id) {
      // Editing an existing product
      const product = products.find((p) => p.id === id);
      product.name = name;
      product.price = price;
      product.desc = desc;
      if (imageUrl) product.image = imageUrl;
    } else {
      // Adding a new product
      products.push({
        id: 'p-' + Date.now(),
        name,
        price,
        desc,
        image: imageUrl,
      });
    }

    saveProducts(products);
    renderTable();

    uploadStatus.className = 'upload-status success';
    uploadStatus.textContent = 'Saved! Closing…';
    setTimeout(closeModal, 600);
  } catch (err) {
    uploadStatus.className = 'upload-status error';
    uploadStatus.textContent = err.message || 'Something went wrong.';
  } finally {
    submitBtn.disabled = false;
  }
});

// ============================================================
// Delete confirmation
// ============================================================
const confirmModal = document.getElementById('confirmModal');
const confirmOverlay = document.getElementById('confirmOverlay');

function openConfirmDelete(productId) {
  pendingDeleteId = productId;
  confirmModal.classList.add('active');
  confirmOverlay.classList.add('active');
}
function closeConfirmModal() {
  pendingDeleteId = null;
  confirmModal.classList.remove('active');
  confirmOverlay.classList.remove('active');
}

document.getElementById('closeConfirm').addEventListener('click', closeConfirmModal);
document.getElementById('cancelDelete').addEventListener('click', closeConfirmModal);
confirmOverlay.addEventListener('click', closeConfirmModal);

document.getElementById('confirmDelete').addEventListener('click', () => {
  if (!pendingDeleteId) return;
  products = products.filter((p) => p.id !== pendingDeleteId);
  saveProducts(products);
  renderTable();
  closeConfirmModal();
});

// ============================================================
// Init
// ============================================================
renderTable();
