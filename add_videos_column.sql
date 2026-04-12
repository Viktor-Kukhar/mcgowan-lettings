-- Run this once in Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run: errors harmlessly if the column already exists.
-- Delete this file after it's been applied.

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS videos text[] NOT NULL DEFAULT '{}';
