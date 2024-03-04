#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import commands from '../lib/commands';
import { CONTEXT } from '../lib/context';
import { fetchConfig } from '../lib/utils';

/** The package directory */
const packageDir = path.dirname(__dirname);

CONTEXT.packageDir = packageDir;

const p = process;
const pkgRaw = fs.readFileSync(path.join(packageDir, 'package.json'), {
  encoding: 'utf-8',
});
const pkg = JSON.parse(pkgRaw);
const args = p.argv.slice(2);
const command = args[0];

async function main() {
  if (command && (command === '-v' || command === '--version')) {
    console.log(`${pkg.name}@${pkg.version}`);
    return;
  }

  if (['clean', 'clear'].includes(command)) {
    commands.init(packageDir, true);
  } else {
    commands.init(packageDir);
  }

  const data = fetchConfig();

  if (data) {
    CONTEXT.config = data;
  }

  let subcommand = args[1];

  switch (command) {
    case undefined:
    case 'serve':
    case 'start':
      const port = args[1];
      commands.serve(validatePort(port));
      break;
    case 'a':
    case 'add':
      commands.add(subcommand);
      break;
    case 'rm':
    case 'remove':
      commands.remove(subcommand);
      break;
    case 'list':
    case 'config':
      commands.config();
      break;
    case '-e':
    case 'e':
    case '--btoa':
    case 'btoa':
      console.log(Buffer.from(args[1] || '').toString('base64').cyan);
      break;
    case 'd':
    case '-d':
    case '--atob':
    case 'atob':
      console.log(Buffer.from(args[1] || '', 'base64').toString().yellow);
      break;
    case 'help':
    default:
      if (command && command !== 'help') {
        console.log(`Unknown command: "${command}"`);
      }
      commands.help(pkg.name, pkg.version);
      break;
  }
}

function validatePort(port: any): number | undefined {
  if (isNaN(+port)) {
    return;
  }

  return +port;
}

main();
