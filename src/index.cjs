const fs = require('fs');
const path = require('path');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates', 'base');

function collectTemplateFiles(rootDir) {
  const files = [];

  function walk(currentDir, relativeDir = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath = path.join(relativeDir, entry.name);
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(absolutePath, relativePath);
        continue;
      }

      files.push(relativePath);
    }
  }

  walk(rootDir);
  return files.sort((left, right) => left.localeCompare(right));
}

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

function isDirectoryEmpty(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return true;
  }

  const entries = fs.readdirSync(targetDir);
  return entries.length === 0;
}

async function prompt(question, defaultValue) {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const suffix = defaultValue ? ` (${defaultValue})` : '';
    const answer = await rl.question(`${question}${suffix}: `);
    const trimmed = answer.trim();
    return trimmed || defaultValue;
  } finally {
    rl.close();
  }
}

async function confirm(question, defaultValue = false) {
  const hint = defaultValue ? 'Y/n' : 'y/N';
  const answer = await prompt(`${question} [${hint}]`, '');
  const normalized = answer.trim().toLowerCase();

  if (!normalized) {
    return defaultValue;
  }

  return normalized === 'y' || normalized === 'yes';
}

async function scaffold(targetDir, options = {}) {
  const force = Boolean(options.force);
  const resolvedTarget = path.resolve(targetDir);
  const variables = {
    projectName: getProjectName(resolvedTarget)
  };
  const templateFiles = collectTemplateFiles(TEMPLATE_ROOT);

  const results = [];
  for (const relativePath of templateFiles) {
    const sourcePath = path.join(TEMPLATE_ROOT, relativePath);
    const targetPath = path.join(resolvedTarget, relativePath);
    const result = writeIfMissing(sourcePath, targetPath, variables, force);
    results.push({ file: relativePath, ...result });
  }

  return { targetDir: resolvedTarget, projectName: variables.projectName, results };
}

function printHelp() {
  process.stdout.write([
    'Usage: create-agile-sdd [target-dir] [--force] [--yes]',
    '',
    'Scaffolds the lean SDD Agile starter into the target directory.',
    '',
    'Examples:',
    '  create-agile-sdd',
    '  create-agile-sdd my-project',
    '  create-agile-sdd . --force',
    '  create-agile-sdd --yes'
  ].join('\n') + '\n');
}

function parseArgs(argv) {
  const args = [...argv];
  let targetDir = null;
  let sawTarget = false;
  let force = false;
  let yes = false;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      return { help: true };
    }

    if (arg === '--force' || arg === '-f') {
      force = true;
      continue;
    }

    if (arg === '--yes' || arg === '-y') {
      yes = true;
      continue;
    }

    targetDir = arg;
    sawTarget = true;
  }

  return {
    help: false,
    targetDir,
    sawTarget,
    force,
    yes
  };
}

async function main(argv) {
  const parsed = parseArgs(argv);

  if (parsed.help) {
    printHelp();
    return;
  }

  let targetDir = parsed.targetDir;
  if (!parsed.sawTarget && stdin.isTTY) {
    targetDir = await prompt('Target directory', '.');
  }

  if (!targetDir) {
    targetDir = '.';
  }

  const resolvedTarget = path.resolve(targetDir || '.');
  const targetExists = fs.existsSync(resolvedTarget);
  const targetNotEmpty = targetExists && !isDirectoryEmpty(resolvedTarget);
  const useForce = parsed.force;

  if (targetNotEmpty && !useForce && !parsed.yes && stdin.isTTY) {
    const proceed = await confirm(`The target directory already contains files. Continue in ${resolvedTarget}?`, false);
    if (!proceed) {
      process.stdout.write('Aborted.\n');
      return;
    }
  }

  const result = await scaffold(resolvedTarget, { force: useForce });
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
  render,
  parseArgs,
  collectTemplateFiles,
  isDirectoryEmpty,
  prompt,
  confirm
};
