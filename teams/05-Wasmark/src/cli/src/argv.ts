export interface Argv {
  contractPaths?: string[];
  contractsDir?: string;
  endpoint: string;
  mnemonics?: string[];
  port: number;
  _: (string | number)[];
  $0: string;
}

let argv: Argv;

export function getArgv() {
  return argv;
}

export function storeArgv(_arv: Argv) {
  argv = _arv;
}