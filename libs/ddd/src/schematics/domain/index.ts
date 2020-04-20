import { normalize } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addDomainToLintingRules } from '../rules';
import { DomainOptions } from './schema';

export default function (options: DomainOptions): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    // getting project name
    if (!options.app) {
      if (workspace.defaultProject) {
        options.app = workspace.defaultProject;
      } else {
        throw new SchematicsException('No Angular project selected and no default project in the workspace');
      }
    }

    // Validating project name
    const project = workspace.projects[options.app];
    if (!project) {
      throw new SchematicsException('The specified Angular project is not defined in this workspace');
    }

    // Checking if it is application
    if (project.projectType !== 'application') {
      throw new SchematicsException(`Domain requires an Angular project type of "application" in angular.json`);
    }

    const appName = options.app;
    const appFolderName = dasherize(appName);
    const appModulePath = `apps/${appFolderName}/src/app/app.module.ts`;

    // Checking if appModulePath exists
    if (!host.exists(appModulePath)) {
      throw new SchematicsException(`Specified app ${options.app} does not exist: ${appModulePath} expected!`);
    }

    const domainName = dasherize(options.name);
    const domainFolderName = domainName;
    const domainPath = `libs/${domainFolderName}/domain/src/lib`;

    const suffix = options.platform ? `-${options.platform}` : '';
    const platform = options.platform ?? 'web';

    function createEmptyFolders(options: DomainOptions): Rule {
      return (tree: Tree, _: SchematicContext) => {
        tree.create(normalize(`${domainPath}/entities/.gitkeep`), '');
        tree.create(normalize(`${domainPath}/services/.gitkeep`), '');
        tree.create(normalize(`${domainPath}/state/.gitkeep`), '');

        return tree;
      };
    }

    return chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name: `shell${suffix}`,
        directory: options.name,
        tags: `domain:${options.name},type:shell,platform:${platform}`,
        style: 'scss',
        routing: true,
        lazy: options.lazy,
        parentModule: appModulePath,
        prefix: options.name,
      }),
      externalSchematic('@schematics/angular', 'component', {
        name: options.name,
        project: `${options.name}-shell${suffix}`,
        flat: true,
        style: 'scss',
        selector: `${dasherize(options.name)}-shell`,
      }),
      externalSchematic('@nrwl/angular', 'lib', {
        name: 'domain',
        directory: options.name,
        tags: `domain:${options.name},type:domain-logic`,
        style: 'scss',
        prefix: options.name,
      }),
      addDomainToLintingRules(options.name),
      createEmptyFolders(options),
    ]);
  };
}
