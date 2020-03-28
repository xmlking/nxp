import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { DddSchematicSchema } from './schema';

describe('ddd schematic', () => {
  let appTree: Tree;
  const options: DddSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nx-plugins/ddd',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('ddd', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
