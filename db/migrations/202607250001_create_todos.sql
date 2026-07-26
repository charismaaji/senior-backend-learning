-- migrate:up

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	description TEXT NOT NULL DEFAULT '',
	completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- migrate:down

DROP TABLE todos;