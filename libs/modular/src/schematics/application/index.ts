import { chain, externalSchematic, Rule, Tree } from '@angular-devkit/schematics';
import { initLintingRules } from '../rules';
import { ApplicationOptions } from './schema';
export default function (options: ApplicationOptions): Rule {
  return (host: Tree) => {
    const suffix = options.platform ? `-${options.platform}` : '';
    const platform = options.platform ?? 'web';

    const backendProject = options.backendProject
      ? {
          backendProject: options.backendProject,
        }
      : {};

    return chain([
      externalSchematic('@nrwl/angular', 'app', {
        name: `${options.name}${suffix}-app`,
        tags: `domain:${options.name},type:app,platform:${platform}`,
        style: 'scss',
        routing: true,
        prefix: options.name,
        ...backendProject,
      }),
      initLintingRules(),
    ]);
  };
}
