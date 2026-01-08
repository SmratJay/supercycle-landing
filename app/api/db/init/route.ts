import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

/**
 * Database initialization endpoint
 * Run once to create all tables
 */
export async function POST(request: Request) {
  try {
    // Create snapshots table
    await sql`
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
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_snapshots_timestamp ON snapshots(timestamp DESC)`

    // Create state_history table
    await sql`
      CREATE TABLE IF NOT EXISTS state_history (
        id SERIAL PRIMARY KEY,
        cycle_state VARCHAR(20) NOT NULL,
        confidence DECIMAL NOT NULL,
        signals JSONB NOT NULL,
        started_at TIMESTAMPTZ NOT NULL,
        ended_at TIMESTAMPTZ,
        duration_seconds INTEGER,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_state_history_started ON state_history(started_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_state_history_state ON state_history(cycle_state)`

    // Create directory_entries table
    await sql`
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
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_directory_verified ON directory_entries(verified)`
    await sql`CREATE INDEX IF NOT EXISTS idx_directory_cycle_role ON directory_entries(cycle_role)`
    await sql`CREATE INDEX IF NOT EXISTS idx_directory_mint ON directory_entries(mint)`

    // Create liquidity_pools table
    await sql`
      CREATE TABLE IF NOT EXISTS liquidity_pools (
        id SERIAL PRIMARY KEY,
        meme_name VARCHAR NOT NULL,
        meme_mint VARCHAR NOT NULL,
        pair_address VARCHAR NOT NULL,
        liquidity_usd1 DECIMAL NOT NULL,
        volume_24h DECIMAL DEFAULT 0,
        snapshot_timestamp TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_pools_timestamp ON liquidity_pools(snapshot_timestamp DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_pools_meme_mint ON liquidity_pools(meme_mint)`

    // Create cron_logs table
    await sql`
      CREATE TABLE IF NOT EXISTS cron_logs (
        id SERIAL PRIMARY KEY,
        job_name VARCHAR NOT NULL,
        status VARCHAR(20) NOT NULL,
        message TEXT,
        execution_time_ms INTEGER,
        executed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_cron_logs_job ON cron_logs(job_name, executed_at DESC)`

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      tables: [
        "snapshots",
        "state_history", 
        "directory_entries",
        "liquidity_pools",
        "cron_logs"
      ]
    })
  } catch (error) {
    console.error("Database initialization failed:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
