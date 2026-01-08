# SUPERCYCLE Real-Time Data Setup

## Prerequisites

1. **Helius API Key**
   - Sign up at https://helius.dev
   - Get your API key from dashboard
   - Free tier provides 100k requests/day

2. **Vercel Postgres Database**
   - Deploy to Vercel or use Vercel CLI locally
   - Database will be auto-provisioned
   - Alternatively: Use Supabase/Railway for local dev

## Setup Steps

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
# Required
HELIUS_API_KEY=your_helius_api_key_here
CRON_SECRET=generate_random_string_here

# Vercel will auto-populate these on deploy
POSTGRES_URL=
POSTGRES_PRISMA_URL=
# ... etc
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Initialize Database

**Option A: Via API Endpoint (after deploy)**

```bash
curl -X POST https://your-domain.vercel.app/api/db/init
```

**Option B: Manually via Vercel Dashboard**

1. Go to Vercel Dashboard → Storage → Postgres
2. Click "Query" tab
3. Run the SQL from `lib/db/schema.sql`

### 4. Test Helius Connection

```bash
# Start dev server
pnpm dev

# Test health endpoint
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "checks": {
    "helius": true,
    "database": true,
    "latestSnapshot": null
  }
}
```

### 5. Manual Snapshot Capture (Testing)

Before cron is set up, test snapshot capture manually:

```bash
# Call cron endpoint with your CRON_SECRET
curl -X GET \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/capture-snapshot
```

### 6. Deploy to Vercel

```bash
# Push to GitHub (if not already)
git add .
git commit -m "Add real-time data pipeline"
git push

# Deploy via Vercel
vercel --prod
```

### 7. Configure Cron on Vercel

The `vercel.json` file automatically sets up cron:

```json
{
  "crons": [{
    "path": "/api/cron/capture-snapshot",
    "schedule": "*/15 * * * *"
  }]
}
```

Vercel will run this every 15 minutes in production.

## Monitoring

### Check Latest Snapshot

```bash
curl https://your-domain.vercel.app/api/cycle/status
```

### View Cron Logs

Query via Vercel Dashboard → Storage → Postgres:

```sql
SELECT * FROM cron_logs 
ORDER BY executed_at DESC 
LIMIT 10;
```

### Health Monitoring

```bash
curl https://your-domain.vercel.app/api/health
```

## Architecture

```
Helius API (on-chain data)
    ↓
HeliusDataFetcher (raw queries)
    ↓
SignalDeriver (directional signals)
    ↓
SnapshotStore (persistence)
    ↓
CycleClassifier (state logic)
    ↓
API Routes (cached state)
    ↓
UI Components (display)
```

## Data Flow

1. **Every 15 minutes**: Cron hits `/api/cron/capture-snapshot`
2. **Snapshot capture**: Fetches USD1 liquidity, volume, flows
3. **Signal derivation**: Converts raw → UP/DOWN/FLAT
4. **Classification**: Determines cycle state (HEATING/ACCELERATING/SETTLING/RESETTING)
5. **Caching**: API routes serve cached state
6. **UI updates**: Frontend polls every 30s

## Fallback Strategy

If Helius is down or rate-limited:

1. Last snapshot remains cached (15-30 min stale data)
2. UI shows "Last updated: X minutes ago"
3. System gracefully degrades to most recent state
4. No errors shown to users

This is **by design** - observational tools should never feel broken.

## Local Development

For local dev without Vercel Postgres:

1. Use Supabase free tier
2. Or use `pg` with local Postgres
3. Or continue using mock services (already implemented)

## Phase Rollout

**Current (Phase 1)**: Mock data, full UI ✅

**Next (Phase 2)**: 
- ✅ Helius integration
- ✅ Database setup
- ✅ Snapshot capture
- ✅ Cron automation
- 🔄 Testing & validation

**Phase 3**: 
- Enhanced signal derivation
- Directory auto-detection
- Historical charts
- Confidence metrics

## Troubleshooting

**"Unauthorized" on cron endpoint**
- Check `CRON_SECRET` in environment variables
- Ensure Authorization header is correct

**"Database connection failed"**
- Verify Vercel Postgres is provisioned
- Check `POSTGRES_URL` is set
- Run `/api/db/init` to create tables

**"Helius API error"**
- Verify `HELIUS_API_KEY` is valid
- Check rate limits (100k/day on free tier)
- Test at https://mainnet.helius-rpc.com

**Snapshots not updating**
- Check cron logs in database
- Verify Vercel cron is configured
- Test manual trigger with cron endpoint

## Next Steps

1. Deploy to Vercel
2. Set environment variables
3. Initialize database
4. Monitor first few snapshots
5. Verify utilities show real data
6. Iterate on signal derivation logic
