import { strings } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { addImportToModule } from '@nrwl/angular/src/utils/ast-utils';
import { insert, toClassName } from '@nrwl/workspace';
import { insertImport } from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';
import { EntityOptions } from '../schema';

export function addImportsToModule(options: EntityOptions): Rule {
  return (host: Tree) => {
    const stateName = `${toClassName(options.name)}State`;
    const storeForFeature = `NgxsModule.forFeature([${stateName}])`;

    const domainName = strings.dasherize(options.domain);
    const domainModulePath = `libs/${domainName}/domain/src/lib/${domainName}-domain.module.ts`;

    const modulePath = domainModulePath;
    const sourceText = host.read(modulePath)!.toString('utf-8');
    const source = ts.createSourceFile(
      modulePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true
    );

    insert(host, modulePath, [
      insertImport(source, modulePath, 'NgxsModule', '@ngxs/store'),
      insertImport(
        source,
        modulePath,
        stateName,
        `./state/${strings.dasherize(options.name)}.state`
      ),
      ...addImportToModule(source, modulePath, storeForFeature)
    ]);

    return host;
  };
}
