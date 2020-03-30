import { normalize, strings } from '@angular-devkit/core';
import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addDomainToLintingRules } from '../utils/update-linting-rules';
import { DomainOptions } from './schema';

export default function(options: DomainOptions): Rule {
  return (host: Tree) => {
    const domainName = strings.dasherize(options.name);
    const domainFolderName = domainName;
    const domainPath = `libs/${domainFolderName}/domain/src/lib`;

    function createEmptyFolders(options: DomainOptions): Rule {
      return (tree: Tree, _: SchematicContext) => {
        tree.create(normalize(`${domainPath}/entities/.gitkeep`), '');
        tree.create(normalize(`${domainPath}/services/.gitkeep`), '');
        tree.create(normalize(`${domainPath}/state/.gitkeep`), '');

        return tree;
      };
    }

    const appName = options.app ?? getWorkspace(host)?.defaultProject;
    const appFolderName = strings.dasherize(appName);
    const appModulePath = `apps/${appFolderName}/src/app/app.module.ts`;

    if (!host.exists(appModulePath)) {
      throw new SchematicsException(
        `Specified app ${options.app} does not exist: ${appModulePath} expected!`
      );
    }

    return chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name: `shell-${options.platform}`,
        directory: options.name,
        tags: `domain:${options.name},type:shell,platform:${options.platform}`,
        style: 'scss',
        routing: true,
        lazy: options.lazy,
        parentModule: appModulePath,
        prefix: options.name
      }),
      externalSchematic('@nrwl/angular', 'lib', {
        name: 'domain',
        directory: options.name,
        tags: `domain:${options.name},type:domain-logic`,
        style: 'scss',
        prefix: options.name
      }),
      addDomainToLintingRules(options.name),
      createEmptyFolders(options)
    ]);
  };
}
