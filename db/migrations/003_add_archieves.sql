ALTER TABLE robots ADD COLUMN archived INTEGER NOT NULL DEFAULT 0; -- 0=false, 1=true
CREATE INDEX IF NOT EXISTS idx_robots_archived ON robots(archived);
