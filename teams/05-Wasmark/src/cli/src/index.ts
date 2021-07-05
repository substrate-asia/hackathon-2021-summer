#!/usr/bin/env node  
import yargs from 'yargs/yargs';
import { createApp } from './create-app';
import { Argv, storeArgv } from './argv';
import { checkContractExist } from './contract';

const argv = yargs(process.argv.slice(2)).options({
  c: { type: 'array', aliias: 'contract' },
  d: { type: 'string', aliias: 'dir' },
  e: { type: 'string', aliias: 'endpoint', demandOption: true },
  m: { type: 'array', aliias: 'mnemonic' },
  p: { type: 'number', default: 4000, aliias: 'port' },
}).parseSync();

function checkArgv(argv: Argv): boolean {
  return true
}

storeArgv({
  contractPaths: argv.c === undefined ? undefined : argv.c.map(c => `${c}`),
  contractsDir: argv.d,
  endpoint: argv.e,
  mnemonics: argv.m === undefined ? undefined : argv.m.map(m => `${m}`),
  port: argv.p,
  _: argv._,
  $0: argv.$0,
});

checkContractExist().then(exist => {
  if (!exist) {
    console.error('can\'t find contracts by specific path')
    return process.exit();
  }
  
  createApp(argv.p);
}, err => console.error(err));