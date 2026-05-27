const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const { scaffold } = require('../src/index.cjs');

test('scaffold writes the expected base files', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-'));

  try {
    const result = scaffold(tempDir);
    assert.strictEqual(result.results.length, 7);

    for (const relativePath of [
      'AGENTS.md',
      'docs/ARCHITECTURE.md',
      'docs/ROADMAP.md',
      'specs/SPECS.md',
      'specs/EPIC00/EPIC00.md',
      'specs/EPIC00/PLAN.md',
      'specs/EPIC00/TASKS.md'
    ]) {
      assert.ok(fs.existsSync(path.join(tempDir, relativePath)), `${relativePath} should exist`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

