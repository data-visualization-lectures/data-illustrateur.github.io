#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs');
const outputDir = path.join(os.tmpdir(), `data-illustrator-generated-${process.pid}`);
const hugoBin = path.join(
  repoRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'hugo.cmd' : 'hugo'
);

const ignoredNames = new Set(['.DS_Store']);
const maxPrintedDiffs = 120;

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function runHugo() {
  if (!fs.existsSync(hugoBin)) {
    fail('Local Hugo binary was not found. Run npm install first.');
    return false;
  }

  fs.rmSync(outputDir, { recursive: true, force: true });

  const result = spawnSync(
    hugoBin,
    [
      '--gc',
      '--minify',
      '--cleanDestinationDir',
      '--config',
      'config/_default/config.toml,config/gh-pages/config.toml',
      '-d',
      outputDir
    ],
    { cwd: repoRoot, stdio: 'inherit' }
  );

  if (result.status !== 0) {
    fail(`Hugo build failed with exit code ${result.status}.`);
    return false;
  }

  return true;
}

function listFiles(rootDir, prefix = '') {
  if (!fs.existsSync(rootDir)) return [];

  const entries = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => !ignoredNames.has(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  const files = [];

  for (const entry of entries) {
    const relativePath = prefix ? path.join(prefix, entry.name) : entry.name;
    const absolutePath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

function compareFiles(relativePath) {
  const expected = fs.readFileSync(path.join(outputDir, relativePath));
  const actual = fs.readFileSync(path.join(docsDir, relativePath));
  return expected.equals(actual);
}

function printGroup(title, items) {
  if (items.length === 0) return;

  console.error(`\n${title}:`);
  for (const item of items.slice(0, maxPrintedDiffs)) {
    console.error(`  ${item}`);
  }

  if (items.length > maxPrintedDiffs) {
    console.error(`  ...and ${items.length - maxPrintedDiffs} more`);
  }
}

function compareGeneratedOutput() {
  const expectedFiles = listFiles(outputDir);
  const actualFiles = listFiles(docsDir);
  const expectedSet = new Set(expectedFiles);
  const actualSet = new Set(actualFiles);

  const missing = expectedFiles.filter((file) => !actualSet.has(file));
  const extra = actualFiles.filter((file) => !expectedSet.has(file));
  const changed = expectedFiles
    .filter((file) => actualSet.has(file))
    .filter((file) => !compareFiles(file));

  if (missing.length || extra.length || changed.length) {
    console.error('docs/ is not in sync with the current generated output.');
    console.error('Run npm run build:gh-pages and commit the generated changes.');
    printGroup('Missing from docs', missing);
    printGroup('Extra in docs', extra);
    printGroup('Changed files', changed);
    process.exitCode = 1;
    return;
  }

  console.log('docs/ is in sync with the current generated output.');
}

try {
  if (runHugo()) {
    compareGeneratedOutput();
  }
} finally {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
