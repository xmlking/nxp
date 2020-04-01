import { Rule, Tree } from '@angular-devkit/schematics';

/**
 * Add exports to the public barrel in the feature library
 */
export function addExportsToBarrel(
  indexFilePath: string,
  filesToExport: string[]
): Rule {
  return (host: Tree) => {
    let content = host.read(indexFilePath) + '\n';

    for (const file of filesToExport) {
      content += `export * from '${file}';\n`;
    }

    host.overwrite(indexFilePath, content);
  };
}
