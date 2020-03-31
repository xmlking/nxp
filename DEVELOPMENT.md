# Development

Doc for `Contributors`

## Scaffolding

```bash
# scaffolding empty project
yarn create nx-plugin nxp --pluginName ddd
lerna init --independent
yarn config set workspaces-experimental true
# adding new plugin
nx g @nrwl/nx-plugin:plugin [pluginName]
```

why you change any schematics's `schema.json`, run the following command to generate `schema.d.ts`

```bash
yarn build:schema
```

## Testing

```bash
# build this schematic
nx run ddd:build
# cd to your demo nx project
cd my-demo-nx-project
# link the library
npm link ../nxp/dist/libs/ddd
# run the schematic
nx g @xmlking/nxp-ddd:domain booking
```

## Publishing

To publish your plugin follow these steps:

> via standard npm

1. Build your plugin with the command `nx run ddd:build`
2. `npm publish ./dist/libs/ddd` and follow the prompts from npm.
3. That's it!

> via learn

1. lerna version
2. lerna publish from-package (this will run prepublish life cycle script first)

To add your plugin modify the community/approved-plugins.json file in the [Nrwl/nx](https://github.com/nrwl/nx/blob/master/community/approved-plugins.json) repo and create a pull request with `yarn submit-plugin`.

### Lerna

```bash
lerna info
lerna ls # list all of the public packages in the current Lerna repo.
lerna changed # check which packages have changed since the last release.
lerna diff [package?] # Diff all packages or a single package since the last release.
lerna version 1.0.1 # explicit
lerna version patch # semver keyword
lerna version # select from prompt(s)
lerna publish # publish packages that have changed since the last release
lerna publish from-git     # explicitly publish packages tagged in the current commit
lerna publish from-package # explicitly publish packages where the latest version is not present in the registry
```

### Reference

- <https://nx.dev/angular/guides/nx-plugin>
- <https://github.com/lerna/lerna>
- <https://github.com/bernardocorbella/myweb>
