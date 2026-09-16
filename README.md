# Terra & Leaf — practice storefront

A plain HTML/CSS/JS shop (no build step) — drop it straight into
`C:\inetpub\wwwroot` and IIS serves it as-is, matching your deploy pipeline.

## What's in here

- `index.html` — page structure
- `style.css` — all styling
- `script.js` — product rendering, cart, and the Cloudinary upload

Products and cart contents are stored in the browser's `localStorage`, so
this runs entirely client-side — no backend or database needed to practice
the deploy flow.

## Images

The three seed products (`Fiddle Leaf Fig`, `Snake Plant`, `Monstera
Deliciosa`) use original flat-illustration SVGs in the `images/` folder,
styled to match the site's palette — no external image hosting or licensing
to worry about. Keep this folder alongside `index.html` when you deploy.
Any product added later through the "+ Add Image" button uploads a real
photo to Cloudinary instead.

## Set up Cloudinary (for the "+ Add Image" button)

1. Create a free account at https://cloudinary.com if you don't have one.
2. From the dashboard, copy your **Cloud name**.
3. Go to **Settings → Upload → Upload presets → Add upload preset**.
4. Set **Signing Mode** to **Unsigned** (required — this demo uploads
   directly from the browser with no server-side secret).
5. Optionally set the preset's folder to `my-website/images` to match the
   architecture diagram, or leave the folder override in `script.js` as is.
6. Save the preset and copy its name.
7. Open `script.js` and set:
   ```js
   const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
   const CLOUDINARY_UPLOAD_PRESET = 'your-preset-name';
   ```

Without this, the "+ Add Image" button will show an error telling you to
configure it — everything else (browsing, cart, checkout simulation) works
immediately with the seeded sample plants.

## Deploy it through your pipeline

1. Commit these three files (plus this README) to your GitHub repo.
2. Push — your webhook listener on EC2 picks it up, runs `git pull` in
   `C:\inetpub\wwwroot`, and recycles the IIS app pool.
3. Visit the site's URL — new products you add will upload their photo to
   Cloudinary and store the returned URL, so `wwwroot` itself never has to
   hold the image files.

## Notes for practice/demo use only

- Cart and product data live in the browser, so they're per-device and not
  shared between visitors — fine for testing the pipeline, not for a real
  store.
- Checkout is simulated (just an alert) — there's no payment processing.
- An unsigned upload preset means anyone with the preset name can upload to
  that Cloudinary folder. Fine for practice; for production you'd sign
  uploads server-side instead.
