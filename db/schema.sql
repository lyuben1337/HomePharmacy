-- Drop existing tables (in correct dependency order)
DROP TABLE IF EXISTS intake_history;
DROP TABLE IF EXISTS reminder;
DROP TABLE IF EXISTS medication_unit;
DROP TABLE IF EXISTS medication;

-- Recreate tables

CREATE TABLE IF NOT EXISTS medication (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dosage TEXT,
    image_uri TEXT,
    recipe_uri TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medication_unit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL,
    expiration_date TEXT NOT NULL,
    dose_count INTEGER NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medication(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reminder (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL,
    times TEXT NOT NULL,
    days TEXT NOT NULL,
    dose_should_be_taken INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    is_active BOOLEAN DEFAULT 1,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medication(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS intake_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL,
    scheduled_at TEXT NOT NULL,
    taken_at TEXT,
    source TEXT CHECK(source IN ('manual', 'reminder')),
    dose_taken INTEGER,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medication(id) ON DELETE CASCADE
);
