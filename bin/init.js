#!/usr/bin/env node

const Path = require('path');
const FS = require('fs');
const Glob = require('glob');

const files = Glob.sync('**/*.default.json', {
  cwd: Path.join(process.cwd(), 'static'),
  absolute: true,
});

for (const file of files) {
  const base = Path.basename(file);
  const name = base.substring(0, base.length - 13);
  const settings = Path.join(Path.dirname(file), name + '.config.json');

  if (!FS.existsSync(settings)) {
    console.log('Install "' + name + '" config');
    FS.writeFileSync(settings, FS.readFileSync(file));
  }
}