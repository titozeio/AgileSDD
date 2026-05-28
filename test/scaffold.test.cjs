const assert = require('assert');
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const { scaffold, parseArgs, isDirectoryEmpty } = require('../src/index.cjs');
const ROOT = path.resolve(__dirname, '..');

function runNode(args, options = {}) {
  return childProcess.execFileSync(process.execPath, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options
  });
}

function runNpm(args, options = {}) {
  const npmCli = process.env.npm_execpath;

  if (!npmCli) {
    throw new Error('npm_execpath is not available in this test environment');
  }

  return childProcess.execFileSync(process.execPath, [npmCli, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options
  });
}

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

test('packaged CLI can scaffold a target project', () => {
  const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-pack-'));
  const installDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-install-'));
  const scaffoldDir = path.join(installDir, 'scaffold-target');

  try {
    const packOutput = runNpm(['pack', '--json', '--pack-destination', packDir]);
    const packInfo = JSON.parse(packOutput)[0];
    const tarballPath = path.join(packDir, packInfo.filename);

    runNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], { cwd: installDir });
    runNode([
      path.join(installDir, 'node_modules', 'create-agile-sdd', 'bin', 'create-agile-sdd.cjs'),
      scaffoldDir
    ]);

    for (const relativePath of [
      'AGENTS.md',
      'docs/ARCHITECTURE.md',
      'docs/ROADMAP.md',
      'specs/SPECS.md',
      'specs/EPIC00/EPIC00.md',
      'specs/EPIC00/PLAN.md',
      'specs/EPIC00/TASKS.md'
    ]) {
      assert.ok(fs.existsSync(path.join(scaffoldDir, relativePath)), `${relativePath} should exist in packaged scaffold`);
    }
  } finally {
    fs.rmSync(packDir, { recursive: true, force: true });
    fs.rmSync(installDir, { recursive: true, force: true });
  }
});
