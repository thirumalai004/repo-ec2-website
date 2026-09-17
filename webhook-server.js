const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('GitHub webhook received on port 9000...');
    
    // Automatically pull latest code into your IIS web root / project folder
    exec('cd C:\\inetpub\\wwwroot\\mysite && git pull origin main', (error, stdout, stderr) => {
        if (error) {
            console.error(`Git pull error: ${error.message}`);
            return res.status(500).send('Server Error during git pull');
        }
        console.log(`Git pull output: ${stdout}`);
        res.status(200).send('Updated repository successfully');
    });
});

const WEBHOOK_PORT = 9000;
app.listen(WEBHOOK_PORT, () => {
    console.log(`Webhook listener running on port ${WEBHOOK_PORT}`);
});