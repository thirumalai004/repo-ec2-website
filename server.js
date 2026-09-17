// server.js
// GitHub webhook listener for auto-deploying to C:\inetpub\wwwroot on Windows EC2
//
// Flow:
//   GitHub push -> POST /webhook -> verify signature -> git pull in wwwroot -> recycle IIS app pool
//
// Setup instructions are in DEPLOY_STEPS.md

const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');
const path = require('path');

const app = express();

// ---- Configuration (edit these or set as environment variables) ----
const PORT = process.env.WEBHOOK_PORT || 9000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET';
const REPO_PATH = process.env.REPO_PATH || 'C:\\inetpub\\wwwroot';
const APP_POOL_NAME = process.env.APP_POOL_NAME || 'DefaultAppPool';
const BRANCH = process.env.DEPLOY_BRANCH || 'main'; // only deploy pushes to this branch
// ----------------------------------------------------------------

// We need the raw body to verify the GitHub HMAC signature, so capture it manually.
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

function verifySignature(req) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature || !req.rawBody) return false;

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');

  // timingSafeEqual requires equal-length buffers
  const sigBuffer = Buffer.from(signature);
  const digestBuffer = Buffer.from(digest);
  if (sigBuffer.length !== digestBuffer.length) return false;

  return crypto.timingSafeEqual(sigBuffer, digestBuffer);
}

function runDeploy(res) {
  console.log(`[${new Date().toISOString()}] Deploy triggered. Pulling latest code...`);

  const pullCmd = `git -C "${REPO_PATH}" pull`;

  exec(pullCmd, (pullErr, pullStdout, pullStderr) => {
    if (pullErr) {
      console.error('git pull failed:', pullStderr || pullErr.message);
      return res.status(500).send('git pull failed: ' + (pullStderr || pullErr.message));
    }

    console.log('git pull output:', pullStdout);

    // Recycle the IIS app pool so changes take effect immediately.
    const recycleCmd = `%windir%\\system32\\inetsrv\\appcmd.exe recycle apppool /apppool.name:"${APP_POOL_NAME}"`;

    exec(recycleCmd, (recErr, recStdout, recStderr) => {
      if (recErr) {
        console.error('App pool recycle failed:', recStderr || recErr.message);
        // Still report success for the pull, but flag the recycle issue.
        return res.status(200).send('Pulled latest code, but app pool recycle failed: ' + (recStderr || recErr.message));
      }

      console.log('App pool recycled:', recStdout);
      return res.status(200).send('Deploy successful: pulled latest code and recycled app pool.');
    });
  });
}

app.post('/webhook', (req, res) => {
  if (!verifySignature(req)) {
    console.warn('Rejected webhook: invalid signature');
    return res.status(401).send('Invalid signature');
  }

  const event = req.headers['x-github-event'];

  if (event === 'ping') {
    console.log('Received ping event from GitHub');
    return res.status(200).send('pong');
  }

  if (event !== 'push') {
    console.log(`Ignoring event type: ${event}`);
    return res.status(200).send('Event ignored (not a push)');
  }

  const ref = req.body.ref; // e.g. "refs/heads/main"
  if (ref !== `refs/heads/${BRANCH}`) {
    console.log(`Ignoring push to ${ref} (only deploying ${BRANCH})`);
    return res.status(200).send(`Push to ${ref} ignored`);
  }

  runDeploy(res);
});

app.get('/health', (req, res) => {
  res.status(200).send('Webhook listener is running');
});

app.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
  console.log(`Watching branch: ${BRANCH}`);
  console.log(`Repo path: ${REPO_PATH}`);
});
