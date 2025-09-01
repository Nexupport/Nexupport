BEGIN;
SELECT plan(1);

SELECT has_column('auth', 'users', 'uuid', 'uuid should exist');

SELECT * FROM finish();
ROLLBACK;