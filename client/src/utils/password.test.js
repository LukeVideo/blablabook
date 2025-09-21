import assert from 'node:assert/strict';
import blablapass from './password.js'; // Adjust path to your blablapass module
import argon2 from 'argon2';

// Simple test runner
let testCount = 0;
let passed = 0;
let failed = 0;

async function runTest(name, testFn) {
  testCount++;
  try {
    await testFn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(err);
    failed++;
  }
}

function summarize() {
  console.log(`\nTest Summary: ${passed}/${testCount} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

// Tests
async function runTests() {
  // hashPassword tests
  await runTest('hashPassword should hash a password successfully', async () => {
    const password = 'mySecurePassword';
    const result = await blablapass.hashPassword(password);
    // Verify the hash is valid by using argon2.verify
    const isValid = await argon2.verify(result, password);
    assert.strictEqual(isValid, true, 'Hashed password is not valid');
    assert.ok(typeof result === 'string' && result.startsWith('$argon2id'), 'Hash is not a valid argon2 string');
  });

  

  // verifyPassword tests
  await runTest('verifyPassword should return true for correct password', async () => {
    const password = 'mySecurePassword';
    const hashedPassword = await argon2.hash(password); // Generate a real hash
    const result = await blablapass.verifyPassword(hashedPassword, password);
    assert.strictEqual(result, true, 'Expected true for correct password');
  });

  await runTest('verifyPassword should return false for incorrect password', async () => {
    const password = 'mySecurePassword';
    const wrongPassword = 'wrongPassword';
    const hashedPassword = await argon2.hash(password); // Generate a real hash
    const result = await blablapass.verifyPassword(hashedPassword, wrongPassword);
    assert.strictEqual(result, false, 'Expected false for incorrect password');
  });



  // checkConfirmPassword tests
  await runTest('checkConfirmPassword should hash if passwords match', async () => {
    const password = 'mySecurePassword';
    const confirmPassword = 'mySecurePassword';
    const result = await blablapass.checkConfirmPassword(password, confirmPassword);
    // Verify the hash is valid
    const isValid = await argon2.verify(result, password);
    assert.strictEqual(isValid, true, 'Hashed password is not valid');
    assert.ok(typeof result === 'string' && result.startsWith('$argon2id'), 'Hash is not a valid argon2 string');
  });

  await runTest('checkConfirmPassword should return false if passwords do not match', async () => {
    const password = 'mySecurePassword';
    const confirmPassword = 'differentPassword';
    const result = await blablapass.checkConfirmPassword(password, confirmPassword);
    assert.strictEqual(result, false, 'Expected false when passwords do not match');
  });

  // Summarize results
  summarize();
}

// Run the tests
runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});