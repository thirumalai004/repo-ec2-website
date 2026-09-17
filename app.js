let uploadedImageUrl = '';

// Initialize Cloudinary Widget
const myWidget = cloudinary.createUploadWidget({
    cloudName: 'uws1nhjc', // Replace with your Cloudinary Cloud Name
    uploadPreset: 'LoGitWebCloud'      // Replace with your Cloudinary Unsigned Upload Preset
}, (error, result) => {
    if (!error && result && result.event === "success") {
        uploadedImageUrl = result.info.secure_url;
        document.getElementById('imageStatus').textContent = 'Image Uploaded Successfully!';
        document.getElementById('submitBtn').disabled = false;
    }
});

document.getElementById("upload_widget").addEventListener("click", function(e) {
    e.preventDefault();
    myWidget.open();
}, false);

// Connect to WebSocket server for real-time updates
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'INIT_PRODUCTS' || message.type === 'NEW_PRODUCT') {
        renderProducts(message.data);
    }
};

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    if (!name || !price || !uploadedImageUrl) {
        alert('Please fill out all fields and upload an image.');
        return;
    }

    const product = { name, price, imageUrl: uploadedImageUrl };

    fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('imageStatus').textContent = 'No image uploaded yet.';
            document.getElementById('submitBtn').disabled = true;
            uploadedImageUrl = '';
        }
    });
}

function renderProducts(data) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    // Handle both single item arrays or full list
    const items = Array.isArray(data) ? data : [data];

    // If it's an init event, overwrite list; if new product, append
    items.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.imageUrl}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>$${p.price}</p>
        `;
        productList.appendChild(card);
    });
}