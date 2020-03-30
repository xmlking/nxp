import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { EntityOptions } from './schema';

function addTsExport(filePath: string, filesToExport: string[]): Rule {
  return (host: Tree) => {
    let content = host.read(filePath) + '\n';

    for (const file of filesToExport) {
      content += `export * from '${file}';\n`;
    }

    host.overwrite(filePath, content);
  };
}

function readWorkspaceName(host: Tree): string {
  const content = host.read('nx.json').toString();
  const config = JSON.parse(content);
  return '@' + config['npmScope'];
}

export default function(options: EntityOptions): Rule {
  return (host: Tree) => {
    const workspaceName = readWorkspaceName(host);

    const domainName = strings.dasherize(options.domain);
    const domainFolderName = domainName;
    const domainPath = `libs/${domainFolderName}/domain/src/lib`;
    const domainIndexPath = `libs/${domainFolderName}/domain/src/index.ts`;

    const templateSource = apply(url('./files'), [
      template({ ...strings, ...options, workspaceName }),
      move(domainPath)
    ]);

    return chain([
      mergeWith(templateSource),
      addTsExport(domainIndexPath, [
        `./lib/entities/${strings.dasherize(options.name)}.interface`,
        `./lib/services/${strings.dasherize(options.name)}.service`,
        `./lib/state/${strings.dasherize(options.name)}.state`
      ])
    ]);
  };
}
