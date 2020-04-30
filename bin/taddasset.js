#!/usr/bin/env node

const Path = require('path');
const FS = require('fs');

const file = process.argv[2];
const url = process.argv[3];
const output = process.argv[4];
const path = Path.join(process.cwd(), 'static/data', file + '.json');

if (!FS.existsSync(path)) {
  FS.writeFileSync(path, '[]');
}

const data = require(path);

data.push({ url, output });

FS.writeFileSync(path, JSON.stringify(data, null, 2));
