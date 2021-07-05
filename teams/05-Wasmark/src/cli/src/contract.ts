import { getArgv } from './argv';
import * as path from 'path';
import * as fs from 'fs';
import { RetrivedContract } from './common';

async function retiveContractPaths(withDir = true): Promise<string[]> {
  const cwd = process.cwd();
  let { contractPaths, contractsDir } = getArgv();
  let filePaths: string[] = [];

  if (withDir && contractsDir) {
    filePaths = await new Promise(resolve => {
      const dir = path.resolve(cwd, contractsDir!);

      fs.readdir(dir, (err, files) => {
        if (err) {
          return resolve([]);
        }

        resolve(files
          .filter(fileName => fileName.endsWith('.contract'))
          .map(fileName => path.resolve(dir, fileName))
        );
      });
    });
  }

  if (contractPaths) {
    filePaths = filePaths.concat(
      contractPaths.map(contractPath => path.resolve(cwd, contractPath))
    );
  }

  return filePaths;
}

async function readFiles(paths: string[]): Promise<RetrivedContract[]> {
  const promises = paths.map(filePath =>
    new Promise<RetrivedContract | undefined>(resolve =>
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return resolve(undefined);
        }

        const file: RetrivedContract = {
          path: filePath,
          artifact: data,
          name: path.basename(filePath),
        };

        resolve(file);
      })
    )
  );
  const results = await Promise.all(promises);

  return results.filter(Boolean) as RetrivedContract[];
}

export async function checkContractExist(): Promise<boolean> {
  const filePaths = await retiveContractPaths(false);
  const promises = filePaths.map(path =>
    new Promise<boolean>(
      resolve => fs.access(path, err =>
        err ? resolve(false) : resolve(true)
      )
    )
  );
  const results = await Promise.all(promises);

  return results.every(Boolean);
}

export async function retiveContracts (): Promise<RetrivedContract[]> {
  const filePaths = await retiveContractPaths();

  return readFiles(filePaths)
}