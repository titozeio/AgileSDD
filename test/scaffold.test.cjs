const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const { scaffold, parseArgs, isDirectoryEmpty } = require('../src/index.cjs');

test('parseArgs reads flags and target dir', () => {
  const parsed = parseArgs(['my-project', '--force', '--yes']);
  assert.strictEqual(parsed.targetDir, 'my-project');
  assert.strictEqual(parsed.force, true);
  assert.strictEqual(parsed.yes, true);
  assert.strictEqual(parsed.sawTarget, true);
});

test('scaffold writes the expected base files', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-'));

  try {
    const result = await scaffold(tempDir);
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

test('isDirectoryEmpty detects empty and populated directories', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-empty-'));

  try {
    assert.strictEqual(isDirectoryEmpty(tempDir), true);
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'x', 'utf8');
    assert.strictEqual(isDirectoryEmpty(tempDir), false);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
