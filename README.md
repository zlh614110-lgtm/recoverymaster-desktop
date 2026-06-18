# RecoveryMaster Desktop

AI-Powered Creation & Analysis Engine — Desktop Client

## What You Need to Do

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `recoverymaster-desktop`
3. Keep it **Public** (required for free GitHub Actions)
4. Do NOT initialize with README, .gitignore, or license
5. Click **Create repository**

### Step 2: Push the Code

After creating the empty repo, run these commands in your terminal (inside this project folder):

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: RecoveryMaster Desktop v1.0.0"

# 4. Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/recoverymaster-desktop.git

# 5. Push
git branch -M main
git push -u origin main
```

### Step 3: Update the GitHub Pages Download Link

In your web project (`/mnt/agents/output/app`), update the download URLs to point to your GitHub Releases:

Open `src/sections/HeroSection.tsx` and `src/pages/Downloads.tsx`, replace:
```
YOUR_GITHUB_USERNAME
```
with your actual GitHub username.

### Step 4: Trigger the First Build

1. Go to your GitHub repo page
2. Click **Releases** on the right sidebar
3. Click **Create a new release**
4. Click **Choose a tag**, type `v1.0.0`, click **Create new tag**
5. Release title: `RecoveryMaster v1.0.0`
6. Click **Publish release**

The CI/CD will start automatically. Go to **Actions** tab to watch the build progress. It takes about 10-15 minutes.

### Step 5: Download Your App

After the build completes:
1. Go to **Releases** page
2. You'll see 3 files:
   - `RecoveryMaster-1.0.0.dmg` (macOS)
   - `RecoveryMaster Setup 1.0.0.exe` (Windows)
   - `RecoveryMaster-1.0.0.AppImage` (Linux)

## Project Structure

```
recoverymaster-desktop/
  electron/
    main.ts          # Electron main process
    preload.ts       # Preload script (secure IPC)
  src/
    App.tsx          # React UI
    main.tsx         # React entry
    index.css        # Styles
  .github/
    workflows/
      build.yml      # CI/CD — auto build on 3 platforms
  package.json       # Dependencies & electron-builder config
  vite.config.ts     # Vite + Electron plugin config
  tsconfig.json      # TypeScript config
```

## Local Development

```bash
npm install
npm run dev          # Start dev server with hot reload
npm run dist         # Build for current platform
npm run dist:all     # Build for all platforms (mac, win, linux)
```

## Important Notes

- **macOS code signing**: The GitHub Actions workflow includes Apple code signing placeholders. For production distribution on macOS, you'll need an Apple Developer account and add these secrets to your GitHub repo:
  - `APPLE_ID`
  - `APPLE_APP_SPECIFIC_PASSWORD`
  - `APPLE_TEAM_ID`
  
  Without these, the `.dmg` will still build but users may see a security warning. They can right-click → Open to bypass.

- **Auto updates**: The `publish` config in `package.json` is set up for electron-updater. Once users install the app, it will automatically check for new releases on GitHub.

- **Token sync**: The desktop app reads/writes `rm_auth` from localStorage using the same key as the web app, so Token balances sync seamlessly between web and desktop.
