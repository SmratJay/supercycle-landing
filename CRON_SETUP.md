# Free Cron Setup for SUPERCYCLE

Since Vercel cron jobs require a paid plan, we'll use **cron-job.org** (free, reliable, no signup required for basic use).

## Setup Instructions

### 1. Go to cron-job.org
Visit: https://cron-job.org/en/

### 2. Create a Free Account
- Click "Sign up" (free forever)
- Verify your email

### 3. Create a New Cron Job

**Job Settings:**
- **Title**: `SUPERCYCLE Snapshot Capture`
- **URL**: `https://your-app.vercel.app/api/cron/capture-snapshot`
  - Replace `your-app.vercel.app` with your actual Vercel deployment URL
- **Schedule**: Every 15 minutes
  - Set to: `*/15 * * * *` (every 15 minutes)
  
**Advanced Settings:**
- **Request Method**: `POST`
- **Request Headers**: Add header
  - Header name: `Authorization`
  - Header value: `Bearer kRknMPtmkqeoiA05lU4MPfFe+zw0Rz3/N8PjNwAN4mg=`
    - (This is your CRON_SECRET from .env.local)

### 4. Save and Enable

Click "Create cronjob" and it will start running automatically.

## Verification

After 15 minutes, you can verify it's working by:
1. Checking the execution history on cron-job.org
2. Visiting `https://your-app.vercel.app/api/snapshots` to see captured data

## Alternative Free Services

If you prefer other services:

### GitHub Actions (Best for developers)
- Free for public repos
- Create `.github/workflows/cron.yml`:

```yaml
name: Capture Snapshot
on:
  schedule:
    - cron: '*/15 * * * *'  # Every 15 minutes
  workflow_dispatch:  # Allow manual trigger

jobs:
  capture:
    runs-on: ubuntu-latest
    steps:
      - name: Call snapshot endpoint
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-app.vercel.app/api/cron/capture-snapshot
```

Add `CRON_SECRET` to your GitHub repository secrets.

### EasyCron (Web-based)
- Visit: https://www.easycron.com/
- Free tier: 1 cron job
- Similar setup to cron-job.org

## Notes

- Your endpoint is already secured with the CRON_SECRET
- The free services are reliable and used by thousands of projects
- You can monitor execution history in the service dashboard
