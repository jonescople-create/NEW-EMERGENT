# Hostinger + GitHub Actions Setup — IslandFruitGuide

This guide enables continuous deployment from GitHub to Hostinger using FTP.

## 1) Create FTP credentials (Hostinger)

1. Login to Hostinger hPanel
2. Go to **Files → FTP Accounts**
3. Create a new FTP account for your domain
4. Note these:
   - FTP Server (host)
   - FTP Username
   - FTP Password
   - FTP Port (default 21)
   - Target directory (usually `/public_html/`)

## 2) Add GitHub Secrets

In your GitHub repo:
- Go to **Settings → Secrets and Variables → Actions**
- Add these secrets:

```
HOSTINGER_FTP_SERVER=ftp.yourdomain.com
HOSTINGER_FTP_USERNAME=your-ftp-username
HOSTINGER_FTP_PASSWORD=your-ftp-password
HOSTINGER_FTP_SERVER_DIR=/public_html/
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3) Push to Main

Any push to the `main` branch will:
- Install dependencies
- Build the Vite app
- Upload the `dist` folder to Hostinger via FTP

## 4) Verify Deployment

Open your domain after the action completes.

## 5) SPA Routing Fix

Ensure your Hostinger root has this `.htaccess` (already included in this project):

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

---

✅ Your IslandFruitGuide will now auto-deploy on every push to main.
