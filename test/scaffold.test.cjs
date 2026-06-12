const assert = require('assert');
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const { scaffold, parseArgs, isDirectoryEmpty, collectTemplateFiles } = require('../src/index.cjs');
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
  const npmExecPath = process.env.npm_execpath;

  const cacheDir = path.join(os.tmpdir(), 'agile-sdd-npm-cache');
  fs.mkdirSync(cacheDir, { recursive: true });

  if (npmExecPath) {
    return childProcess.execFileSync(process.execPath, [npmExecPath, ...args], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
      env: {
        ...process.env,
        npm_config_cache: cacheDir,
        npm_config_tmp: path.join(os.tmpdir(), 'agile-sdd-npm-tmp'),
        ...(options.env || {})
      }
    });
  }

  const fallbackCommand = process.platform === 'win32' ? 'cmd.exe' : 'npm';
  const fallbackArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm', ...args] : args;

  return childProcess.execFileSync(fallbackCommand, fallbackArgs, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
    env: {
      ...process.env,
      npm_config_cache: cacheDir,
      npm_config_tmp: path.join(os.tmpdir(), 'agile-sdd-npm-tmp'),
      ...(options.env || {})
    }
  });
}

test('parseArgs reads flags and target dir', () => {
  const parsed = parseArgs(['my-project', '--force', '--yes', '--no-skills', '--skills', 'none']);
  assert.strictEqual(parsed.targetDir, 'my-project');
  assert.strictEqual(parsed.force, true);
  assert.strictEqual(parsed.yes, true);
  assert.strictEqual(parsed.noSkills, true);
  assert.strictEqual(parsed.skillsOption, 'none');
  assert.strictEqual(parsed.sawTarget, true);
});

test('scaffold writes the expected base files', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-'));

  try {
    const result = await scaffold(tempDir);
    const templateFiles = collectTemplateFiles(path.join(ROOT, 'templates', 'base'));
    assert.strictEqual(result.results.length, templateFiles.length);
    assert.deepStrictEqual(result.skillModes, {
      'grill-me': 'auto',
      'zoom-out': 'manual',
      tdd: 'manual'
    });

    for (const relativePath of [
      'AGENTS.md',
      'docs/ARCHITECTURE.md',
      'docs/ROADMAP.md',
      'specs/SPECS.md',
      'specs/EPIC00/EPIC0.md',
      'specs/EPIC00/PLAN.md',
      'specs/EPIC00/TASKS.md',
      'skills/README.md',
      'skills/grill-me/SKILL.md',
      'skills/tdd/SKILL.md',
      'skills/zoom-out/SKILL.md'
    ]) {
      assert.ok(fs.existsSync(path.join(tempDir, relativePath)), `${relativePath} should exist`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('scaffold keeps grill-me when optional skills are disabled', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-sdd-no-skills-'));

  try {
    const result = await scaffold(tempDir, { skillModes: { 'grill-me': 'none', 'zoom-out': 'none', tdd: 'none' } });

    assert.ok(fs.existsSync(path.join(tempDir, 'skills/README.md')), 'skills/README.md should exist');
    assert.ok(fs.existsSync(path.join(tempDir, 'skills/grill-me/SKILL.md')), 'grill-me should exist');
    assert.ok(!fs.existsSync(path.join(tempDir, 'skills/tdd/SKILL.md')), 'tdd should not exist');
    assert.ok(!fs.existsSync(path.join(tempDir, 'skills/zoom-out/SKILL.md')), 'zoom-out should not exist');

    assert.deepStrictEqual(result.skillModes, {
      'grill-me': 'auto',
      'zoom-out': 'none',
      tdd: 'none'
    });

    const skippedSkills = result.results.filter((item) => item.status === 'skipped' && item.file.startsWith('skills'));
    assert.strictEqual(skippedSkills.length, 2);
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
      'specs/EPIC0/EPIC0.md',
      'specs/EPIC0/PLAN.md',
      'specs/EPIC0/TASKS.md',
      'skills/README.md',
      'skills/grill-me/SKILL.md',
      'skills/tdd/SKILL.md',
      'skills/zoom-out/SKILL.md'
    ]) {
      assert.ok(fs.existsSync(path.join(scaffoldDir, relativePath)), `${relativePath} should exist in packaged scaffold`);
    }
  } finally {
    fs.rmSync(packDir, { recursive: true, force: true });
    fs.rmSync(installDir, { recursive: true, force: true });
  }
});
