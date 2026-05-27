const fs = require('fs');
const path = require('path');

const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates', 'base');
const TEMPLATE_FILES = [
  'AGENTS.md',
  'docs/ARCHITECTURE.md',
  'docs/ROADMAP.md',
  'specs/SPECS.md',
  'specs/EPIC00/EPIC00.md',
  'specs/EPIC00/PLAN.md',
  'specs/EPIC00/TASKS.md'
];

function getProjectName(targetDir) {
  const resolved = path.resolve(targetDir);
  const base = path.basename(resolved);
  return base || 'agile-sdd-project';
}

function render(content, variables) {
  return content.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : `{{${key}}}`;
  });
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeIfMissing(sourcePath, targetPath, variables, force) {
  if (fs.existsSync(targetPath) && !force) {
    return { status: 'skipped' };
  }

  ensureDir(targetPath);
  const template = fs.readFileSync(sourcePath, 'utf8');
  const output = render(template, variables);
  fs.writeFileSync(targetPath, output, 'utf8');
  return { status: 'written' };
}

function scaffold(targetDir, options = {}) {
  const force = Boolean(options.force);
  const resolvedTarget = path.resolve(targetDir);
  const variables = {
    projectName: getProjectName(resolvedTarget)
  };

  const results = [];
  for (const relativePath of TEMPLATE_FILES) {
    const sourcePath = path.join(TEMPLATE_ROOT, relativePath);
    const targetPath = path.join(resolvedTarget, relativePath);
    const result = writeIfMissing(sourcePath, targetPath, variables, force);
    results.push({ file: relativePath, ...result });
  }

  return { targetDir: resolvedTarget, projectName: variables.projectName, results };
}

function printHelp() {
  process.stdout.write([
    'Usage: create-agile-sdd [target-dir] [--force]',
    '',
    'Scaffolds the lean SDD Agile starter into the target directory.',
    '',
    'Examples:',
    '  create-agile-sdd',
    '  create-agile-sdd my-project',
    '  create-agile-sdd . --force'
  ].join('\n') + '\n');
}

function main(argv) {
  const args = [...argv];
  let targetDir = '.';
  let force = false;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      printHelp();
      return;
    }

    if (arg === '--force' || arg === '-f') {
      force = true;
      continue;
    }

    targetDir = arg;
  }

  const result = scaffold(targetDir, { force });
  const written = result.results.filter((item) => item.status === 'written').length;
  const skipped = result.results.filter((item) => item.status === 'skipped').length;

  process.stdout.write(`Created Agile SDD scaffold in ${result.targetDir}\n`);
  process.stdout.write(`Project name: ${result.projectName}\n`);
  process.stdout.write(`Written: ${written}, skipped: ${skipped}\n`);
}

module.exports = {
  main,
  scaffold,
  getProjectName,
  render
};

