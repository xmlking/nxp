const toTypeScript = require('json-schema-to-typescript');
const fs = require('fs');

toTypeScript
  .compileFromFile('libs/modular/src/schematics/domain/schema.json')
  .then((ts) => fs.writeFileSync('libs/modular/src/schematics/domain/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/modular/src/schematics/feature/schema.json')
  .then((ts) => fs.writeFileSync('libs/modular/src/schematics/feature/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/modular/src/schematics/entity/schema.json')
  .then((ts) => fs.writeFileSync('libs/modular/src/schematics/entity/schema.d.ts', ts));

toTypeScript
  .compileFromFile('libs/modular/src/schematics/application/schema.json')
  .then((ts) => fs.writeFileSync('libs/modular/src/schematics/application/schema.d.ts', ts));
