import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace/src/utils/ast-utils';

const ngxsVersion = '3.6.2';
export function addNgxsToPackageJson(): Rule {
  return addDepsToPackageJson(
    {
      '@ngxs/devtools-plugin': ngxsVersion,
      '@ngxs/form-plugin': ngxsVersion,
      '@ngxs/logger-plugin': ngxsVersion,
      '@ngxs/router-plugin': ngxsVersion,
      '@ngxs/storage-plugin': ngxsVersion,
      '@ngxs/store': ngxsVersion
    },
    {}
  );
}
