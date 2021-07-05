import debug from "debug";

export function createLogger(moduleName: string) {
  return debug('domainKnowledge:' + moduleName);
}
