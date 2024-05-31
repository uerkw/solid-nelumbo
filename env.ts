import assert from 'assert';
// env.ts
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
assert(R2_ACCESS_KEY_ID, 'Missing R2_ACCESS_KEY_ID environment variable');

export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
assert(R2_SECRET_ACCESS_KEY, 'Missing R2_SECRET_ACCESS_KEY environment variable');

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
assert(R2_BUCKET_NAME, 'Missing R2_BUCKET_NAME environment variable');

export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
assert(R2_ACCOUNT_ID, 'Missing R2_ACCOUNT_ID environment variable');
