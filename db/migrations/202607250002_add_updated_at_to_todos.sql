-- migrate:up

ALTER TABLE todos
ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- migrate:down

ALTER TABLE todos
DROP COLUMN updated_at;