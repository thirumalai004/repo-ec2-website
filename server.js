const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Store products in memory (or connect a database later)
let products = [];

app.use(express.json());

// API to receive new product with Cloudinary image URL
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);

    // Broadcast the new product to all connected clients in real-time
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'NEW_PRODUCT', data: newProduct }));
        }
    });

    res.status(200).json({ success: true, product: newProduct });
});

// WebSocket connection for real-time updates
wss.on('connection', (ws) => {
    console.log('New client connected to shop');

    // Send existing products to the newly connected client
    ws.send(JSON.stringify({ type: 'INIT_PRODUCTS', data: products }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Main shop server running on port ${PORT}`);
});