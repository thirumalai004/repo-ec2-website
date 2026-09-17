# Thirumalai Selladurai — Portfolio (React)

A single-page React portfolio built with Vite, styled as a technical "blueprint"
inspired by cloud infrastructure diagrams.

## Edit your content

All resume content lives in one file: `src/data.js`.
Open it and edit the text directly — no need to touch any component or CSS file.

## Run it locally (optional, to preview before deploying)

```
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Build for deployment

React needs to be "compiled" into plain HTML/CSS/JS before IIS can serve it,
since IIS only serves static files, not React source code directly.

```
npm install
npm run build
```

This creates a `dist/` folder containing the finished static site
(`index.html`, `assets/*.css`, `assets/*.js`).

## Deploy to your IIS server

1. RDP into your EC2 instance.
2. Open File Explorer → go to `C:\inetpub\wwwroot` (the IIS site's root folder).
3. Delete the old contents of that folder (or back them up elsewhere).
4. Copy the **entire contents of the `dist` folder** (not the folder itself —
   its contents: `index.html` and the `assets` folder) into `C:\inetpub\wwwroot`.
5. Visit `https://thiruprojects.online` — the site should load with the padlock
   already active, since the SSL certificate is bound at the IIS site level.

## Making future edits

Whenever you want to change any content:
1. Edit `src/data.js` on your own PC.
2. Run `npm run build` again.
3. Copy the new `dist` contents to `C:\inetpub\wwwroot` on the server, overwriting
   the old files.
