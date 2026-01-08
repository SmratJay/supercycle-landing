-- Snapshots table: stores periodic observations of USD1 ecosystem
CREATE TABLE IF NOT EXISTS snapshots (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  usd1_total_liquidity DECIMAL NOT NULL,
  usd1_net_flow DECIMAL DEFAULT 0,
  liquidity_trend VARCHAR(10) NOT NULL,
  meme_volume VARCHAR(10) NOT NULL,
  volatility VARCHAR(20) NOT NULL,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_snapshots_timestamp ON snapshots(timestamp DESC);

-- State history table: tracks cycle state transitions
CREATE TABLE IF NOT EXISTS state_history (
  id SERIAL PRIMARY KEY,
  cycle_state VARCHAR(20) NOT NULL,
  confidence DECIMAL NOT NULL,
  signals JSONB NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_state_history_started ON state_history(started_at DESC);
CREATE INDEX idx_state_history_state ON state_history(cycle_state);

-- Directory entries table: USD1 meme token directory
CREATE TABLE IF NOT EXISTS directory_entries (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  mint VARCHAR UNIQUE NOT NULL,
  launch_origin VARCHAR(20) NOT NULL,
  usd1_relationship VARCHAR(20) NOT NULL,
  cycle_role VARCHAR(20) NOT NULL,
  observation_note TEXT,
  verified BOOLEAN DEFAULT false,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_directory_verified ON directory_entries(verified);
CREATE INDEX idx_directory_cycle_role ON directory_entries(cycle_role);
CREATE INDEX idx_directory_mint ON directory_entries(mint);

-- Liquidity pools table: track USD1 pair liquidity over time
CREATE TABLE IF NOT EXISTS liquidity_pools (
  id SERIAL PRIMARY KEY,
  meme_name VARCHAR NOT NULL,
  meme_mint VARCHAR NOT NULL,
  pair_address VARCHAR NOT NULL,
  liquidity_usd1 DECIMAL NOT NULL,
  volume_24h DECIMAL DEFAULT 0,
  snapshot_timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pools_timestamp ON liquidity_pools(snapshot_timestamp DESC);
CREATE INDEX idx_pools_meme_mint ON liquidity_pools(meme_mint);

-- Cron job logs table: track snapshot capture success/failure
CREATE TABLE IF NOT EXISTS cron_logs (
  id SERIAL PRIMARY KEY,
  job_name VARCHAR NOT NULL,
  status VARCHAR(20) NOT NULL,
  message TEXT,
  execution_time_ms INTEGER,
  executed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cron_logs_job ON cron_logs(job_name, executed_at DESC);
