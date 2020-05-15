const toTypeScript = require('json-schema-to-typescript');
const fs = require('fs');

toTypeScript
  .compileFromFile('libs/begetter/src/schematics/domain/schema.json')
  .then((ts) => fs.writeFileSync('libs/begetter/src/schematics/domain/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/begetter/src/schematics/feature/schema.json')
  .then((ts) => fs.writeFileSync('libs/begetter/src/schematics/feature/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/begetter/src/schematics/entity/schema.json')
  .then((ts) => fs.writeFileSync('libs/begetter/src/schematics/entity/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/begetter/src/schematics/application/schema.json')
  .then((ts) => fs.writeFileSync('libs/begetter/src/schematics/application/schema.d.ts', ts));
