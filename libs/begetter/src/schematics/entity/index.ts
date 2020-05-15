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
import {
  addExportsToBarrel,
  addNgxsImportsToModule,
  readWorkspaceName
} from '../rules';
import { EntityOptions } from './schema';

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
      addExportsToBarrel(domainIndexPath, [
        `./lib/entities/${strings.dasherize(options.name)}.interface`,
        `./lib/services/${strings.dasherize(options.name)}.service`,
        `./lib/state/${strings.dasherize(options.name)}.state`
      ]),
      addNgxsImportsToModule(options)
    ]);
  };
}
