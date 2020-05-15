import { normalize } from '@angular-devkit/core';
import { capitalize, dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  chain,
  externalSchematic,
  noop,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { FeatureOptions } from './schema';

export default function (options: FeatureOptions): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const domainProjectName = dasherize(
      `${options.domain}Shell${options.platform ? capitalize(options.platform) : ''}`
    );
    const domainShellProjectName = dasherize(
      `${options.domain}Domain${options.platform ? capitalize(options.platform) : ''}`
    );

    // Validating domain name
    const domainProject = workspace.projects[domainProjectName];
    if (!domainProject) {
      throw new SchematicsException('The specified domain is not defined in this workspace');
    } else if (domainProject.projectType !== 'library') {
      throw new SchematicsException(`${domainProjectName} should be Angular project type of "library" in angular.json`);
    }

    const domainShellProject = workspace.projects[domainShellProjectName];
    if (!domainShellProject) {
      throw new SchematicsException('The specified domain shell is not defined in this workspace');
    } else if (domainShellProject.projectType !== 'library') {
      `${domainShellProjectName} should be Angular project type of "library" in angular.json`;
    }

    const domainName = dasherize(options.domain);
    const domainFolderName = domainName;

    const suffix = options.platform ? `-${options.platform}` : '';
    const platform = options.platform ?? 'web';

    const shellFolderName = `shell${suffix}`;
    const shellPath = `libs/${domainFolderName}/${shellFolderName}/src/lib`;
    const shellModulePath = `${shellPath}/${domainName}-${shellFolderName}.module.ts`;

    const featureName = dasherize(options.name);
    const featureFolderName = `feature-${dasherize(featureName)}${suffix}`;
    const featurePath = `libs/${domainFolderName}/${featureFolderName}/src/lib`;

    if (!host.exists(shellModulePath)) {
      throw new SchematicsException(`Specified domain: ${options.domain} does not exist: ${shellModulePath} expected!`);
    }

    function createEmptyFolders(options: FeatureOptions): Rule {
      return (tree: Tree, _: SchematicContext) => {
        tree.create(normalize(`${featurePath}/components/.gitkeep`), '');
        tree.create(normalize(`${featurePath}/containers/.gitkeep`), '');

        return tree;
      };
    }

    return chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name: featureFolderName,
        directory: options.domain,
        tags: `domain:${options.domain},type:feature,platform:${platform}`,
        routing: true,
        lazy: options.lazy,
        parentModule: shellModulePath,
        style: 'scss',
        prefix: options.domain,
      }),
      externalSchematic('@schematics/angular', 'component', {
        name: options.name,
        project: `${options.domain}-${featureFolderName}`,
        flat: true,
        style: 'scss',
        selector: `${dasherize(options.domain)}-${dasherize(options.name)}`,
        prefix: options.domain,
      }),
      options.entity
        ? schematic('entity', {
            name: options.entity,
            domain: options.domain,
          })
        : noop(),
      createEmptyFolders(options),
    ]);
  };
}
