import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addDepsToPackageJson } from '@nrwl/workspace/src/utils/ast-utils';
import { initLintingRules } from '../rules';

const ngxsVersion = '^3.6.2';
const modularVersion = '^0.1.0';
export function addPackageJsonDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ngxs/devtools-plugin': ngxsVersion,
      '@ngxs/form-plugin': ngxsVersion,
      '@ngxs/logger-plugin': ngxsVersion,
      '@ngxs/router-plugin': ngxsVersion,
      '@ngxs/storage-plugin': ngxsVersion,
      '@ngxs/store': ngxsVersion,
    },
    // always add the package under dev dependencies
    { '@xmlking/nxp-modular': modularVersion }
  );
}

export function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

export default function (): Rule {
  return chain([initLintingRules(), addPackageJsonDependencies(), installPackageJsonDependencies()]);
}
