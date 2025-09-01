BEGIN;
SELECT plan(1);

SELECT has_column('auth', 'users', 'id', 'id should exist');

SELECT * FROM finish();
ROLLBACK;