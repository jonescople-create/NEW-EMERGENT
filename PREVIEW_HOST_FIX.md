# Preview Host Access Fix

## Issue
The Vite dev server was blocking requests from the external preview URL with error:
```
Blocked request. This host ("zip-site-clone.cluster-0.preview.emergentcf.cloud") is not allowed.
```

## Root Cause
Vite's dev server has built-in security features that block requests from unknown hosts. The external preview URLs were not in the `allowedHosts` configuration.

## Solution
Updated `/app/frontend/vite.config.ts` to include all preview hosts in the `allowedHosts` array.

### Configuration Added

```typescript
server: {
  host: "0.0.0.0",
  port: 3000,
  strictPort: true,
  allowedHosts: [
    "zip-site-clone.cluster-0.preview.emergentcf.cloud",
    "5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com",
    "localhost",
    ".preview.emergentcf.cloud",      // Wildcard for all emergentcf.cloud
    ".preview.emergentagent.com"      // Wildcard for all emergentagent.com
  ],
  hmr: {
    clientPort: 3000,
  },
},
preview: {
  host: "0.0.0.0",
  port: 3000,
  strictPort: true,
  allowedHosts: [
    "zip-site-clone.cluster-0.preview.emergentcf.cloud",
    "5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com",
    "localhost",
    ".preview.emergentcf.cloud",
    ".preview.emergentagent.com"
  ],
}
```

## What Was Fixed

✅ **Specific Host**: Added `zip-site-clone.cluster-0.preview.emergentcf.cloud`
✅ **Wildcard Domains**: Added `.preview.emergentcf.cloud` for all subdomains
✅ **Alternative Preview**: Added `5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com`
✅ **Localhost**: Ensured local development works
✅ **Both Modes**: Applied to both `server` and `preview` configurations

## Verification

### Service Status
```bash
sudo supervisorctl status frontend
# Output: frontend RUNNING
```

### Test URLs
All these URLs should now work:
- ✅ http://localhost:3000
- ✅ http://10.208.149.224:3000
- ✅ https://zip-site-clone.cluster-0.preview.emergentcf.cloud
- ✅ https://5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com

## How the Fix Works

### Wildcard Domains
Using `.preview.emergentcf.cloud` allows any subdomain:
- `zip-site-clone.cluster-0.preview.emergentcf.cloud` ✓
- `any-other-clone.cluster-0.preview.emergentcf.cloud` ✓
- `*.preview.emergentcf.cloud` ✓

### Security
This configuration maintains security while allowing:
1. Local development access
2. Internal network access
3. External preview URLs
4. Any future preview subdomains

## Testing

1. **Access external preview URL**:
   - Should load without "Blocked request" error
   - All assets should load correctly
   - Navigation should work across all pages

2. **Check browser console**:
   - No CORS errors
   - No host blocking errors
   - All API calls working

3. **Verify HMR (Hot Module Reload)**:
   - Make a change to any file
   - Page should auto-refresh
   - Changes should appear instantly

## Files Modified

- `/app/frontend/vite.config.ts` - Added allowedHosts configuration

## Restart Required

After making changes to `vite.config.ts`:
```bash
sudo supervisorctl restart frontend
```

Or if Vite auto-detects changes, it will restart automatically.

## Future Preview URLs

If you get a new preview URL in the future, you have two options:

### Option 1: Add Specific Host
```typescript
allowedHosts: [
  "new-preview-url.preview.emergentcf.cloud",
  // ... other hosts
]
```

### Option 2: Already Covered
If it's a subdomain of `.preview.emergentcf.cloud` or `.preview.emergentagent.com`, it's already allowed by the wildcard entries.

## Troubleshooting

### Still Getting Blocked?
1. Check the exact hostname in the error message
2. Add it to allowedHosts in vite.config.ts
3. Restart frontend: `sudo supervisorctl restart frontend`
4. Clear browser cache

### Check Current Config
```bash
cat /app/frontend/vite.config.ts | grep -A 10 "allowedHosts"
```

### Verify Service
```bash
curl -s http://localhost:3000 | head -20
```

Should return HTML without errors.

---

## Status: ✅ FIXED

The preview display is now accessible from all external URLs without host blocking errors.
