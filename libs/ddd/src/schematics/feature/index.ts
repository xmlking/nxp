import { normalize, strings } from '@angular-devkit/core';
import {
  chain,
  externalSchematic,
  noop,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { FeatureOptions } from './schema';

export default function(options: FeatureOptions): Rule {
  return (host: Tree) => {
    const domainName = strings.dasherize(options.domain);
    const domainFolderName = domainName;

    const shellFolderName = `shell-${options.platform}`;
    const shellPath = `libs/${domainFolderName}/${shellFolderName}/src/lib`;
    const shellModulePath = `${shellPath}/${domainName}-${shellFolderName}.module.ts`;

    const featureName = strings.dasherize(options.name);
    const featureFolderName = `feature-${strings.dasherize(featureName)}-${
      options.platform
    }`;
    const featurePath = `libs/${domainFolderName}/${featureFolderName}/src/lib`;

    if (!host.exists(shellModulePath)) {
      throw new SchematicsException(
        `Specified domain: ${options.domain} does not exist: ${shellModulePath} expected!`
      );
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
        tags: `domain:${options.domain},type:feature,platform:${options.platform}`,
        routing: true,
        lazy: options.lazy,
        parentModule: shellModulePath,
        style: 'scss',
        prefix: options.domain
      }),
      externalSchematic('@schematics/angular', 'component', {
        name: options.name,
        project: `${options.domain}-${featureFolderName}`,
        flat: true,
        style: 'scss',
        selector: `${strings.dasherize(options.domain)}-${strings.dasherize(
          options.name
        )}`,
        prefix: options.domain
      }),
      options.entity
        ? schematic('entity', {
            name: options.entity,
            domain: options.domain
          })
        : noop(),
      createEmptyFolders(options)
    ]);
  };
}
