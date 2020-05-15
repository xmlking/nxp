import { strings } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import {
  addImportToModule,
  getDecoratorMetadata
} from '@nrwl/angular/src/utils/ast-utils';
import { insert, toClassName } from '@nrwl/workspace';
import {
  Change,
  findNodes,
  InsertChange,
  insertImport
} from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';
import { EntityOptions } from '../entity/schema';

export function addNgxsImportsToModule(options: EntityOptions): Rule {
  return (host: Tree) => {
    const stateName = `${toClassName(options.name)}State`;

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
      ...addStore(modulePath, source, stateName)
    ]);

    return host;
  };
}

export function addStore(
  ngModulePath: string,
  source: ts.SourceFile,
  store: string
): Change[] {
  const stores = getListOfStores(source);

  if (!stores) {
    return addImportToModule(
      source,
      ngModulePath,
      `NgxsModule.forFeature([${store}])`
    );
  }

  if (stores.hasTrailingComma || stores.length === 0) {
    return [new InsertChange(ngModulePath, stores.end, store)];
  } else {
    return [new InsertChange(ngModulePath, stores.end, `, ${store}`)];
  }
}

function getListOfStores(
  source: ts.SourceFile
): ts.NodeArray<ts.Expression> | null {
  const imports: any = getMatchingProperty(
    source,
    'imports',
    'NgModule',
    '@angular/core'
  );

  if (imports.initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
    const a = imports.initializer as ts.ArrayLiteralExpression;

    for (const e of a.elements) {
      if (e.kind === ts.SyntaxKind.CallExpression) {
        const ee = e as ts.CallExpression;
        const text = ee.expression.getText(source);
        if (
          (text === 'NgxsModule.forRoot' || text === 'NgxsModule.forFeature') &&
          ee.arguments.length > 0
        ) {
          const routes = ee.arguments[0];
          if (routes.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            return (routes as ts.ArrayLiteralExpression).elements;
          } else if (routes.kind === ts.SyntaxKind.Identifier) {
            // find the array expression
            const variableDeclarations = findNodes(
              source,
              ts.SyntaxKind.VariableDeclaration
            ) as ts.VariableDeclaration[];

            const routesDeclaration = variableDeclarations.find(x => {
              return x.name.getText() === routes.getText();
            });

            if (routesDeclaration) {
              return (routesDeclaration.initializer as ts.ArrayLiteralExpression)
                .elements;
            }
          }
        }
      }
    }
  }
  return null;
}
function getMatchingProperty(
  source: ts.SourceFile,
  property: string,
  identifier: string,
  module: string
): ts.ObjectLiteralElement {
  const nodes = getDecoratorMetadata(source, identifier, module);
  let node: any = nodes[0]; // tslint:disable-line:no-any

  if (!node) return null;

  // Get all the children property assignment of object literals.
  return getMatchingObjectLiteralElement(node, source, property);
}
function getMatchingObjectLiteralElement(
  node: any,
  source: ts.SourceFile,
  property: string
) {
  return (
    (node as ts.ObjectLiteralExpression).properties
      .filter(prop => prop.kind == ts.SyntaxKind.PropertyAssignment)
      // Filter out every fields that's not "metadataField". Also handles string literals
      // (but not expressions).
      .filter((prop: ts.PropertyAssignment) => {
        const name = prop.name;
        switch (name.kind) {
          case ts.SyntaxKind.Identifier:
            return (name as ts.Identifier).getText(source) === property;
          case ts.SyntaxKind.StringLiteral:
            return (name as ts.StringLiteral).text === property;
        }
        return false;
      })[0]
  );
}
