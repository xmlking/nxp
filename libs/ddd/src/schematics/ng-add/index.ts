import { chain, Rule } from '@angular-devkit/schematics';
import { addNgRxToPackageJson } from '../utils/add-ngxs-to-package-json';
import { initLintingRules } from '../utils/update-linting-rules';

export default function(): Rule {
  return chain([initLintingRules(), addNgRxToPackageJson()]);
}
