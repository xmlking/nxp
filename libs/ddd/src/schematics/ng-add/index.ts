import { chain, Rule } from '@angular-devkit/schematics';
import { addNgxsToPackageJson, initLintingRules } from '../rules';

export default function(): Rule {
  return chain([initLintingRules(), addNgxsToPackageJson()]);
}
