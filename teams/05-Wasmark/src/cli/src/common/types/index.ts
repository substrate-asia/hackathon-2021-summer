export interface TestParams {
  endpoint: string;
  contracts: RetrivedContract[];
  mnemonics: string[];
}

export interface RetrivedContract {
  name: string;
  path: string;
  artifact: Uint8Array;
}