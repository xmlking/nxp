import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { FeatureOptions } from './schema';

function readWorkspaceName(host: Tree): string {
  const content = host.read('nx.json').toString();
  const config = JSON.parse(content);
  return '@' + config['npmScope'];
}

export default function(options: FeatureOptions): Rule {
  return (host: Tree) => {
    const workspaceName = readWorkspaceName(host);

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
      throw new Error(
        `Specified domain: ${options.domain} does not exist: ${shellModulePath} expected!`
      );
    }

    const templateSource = apply(url('./files'), [
      template({ ...strings, ...options, workspaceName }),
      move(featurePath)
    ]);

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
      mergeWith(templateSource)
    ]);
  };
}
