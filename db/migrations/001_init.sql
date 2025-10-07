PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS robots (
    id TEXT PRIMARY KEY, -- uuid
    name TEXT NOT NULL UNIQUE, -- unique
    label TEXT NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1950),
    type TEXT NOT NULL CHECK (
        type IN (
            'industrial',
            'service',
            'medical',
            'educational',
            'other'
        )
    ),
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);