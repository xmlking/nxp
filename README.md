# NxPlugins

Plugins for [Nx](https://nx.dev).

**@nx-plugins/ddd** - Nx plugin for structuring a monorepo with domains and layers

## Build Status

![check](https://github.com/xmlking/nx-plugins/workflows/check/badge.svg)

## For Contributors

### Scaffolding

```bash
# scaffolding empty project
yarn create nx-plugin nx-plugins --pluginName ddd
lerna init --independent
# adding new plugin
nx g @nrwl/nx-plugin:plugin [pluginName]
```

### Publishing

To publish your plugin follow these steps:

1. Build your plugin with the command `nx run ddd:build`
2. `npm publish ./dist/libs/ddd` and follow the prompts from npm.
3. That's it!

To add your plugin modify the community/approved-plugins.json file in the [Nrwl/nx](https://github.com/nrwl/nx/blob/master/community/approved-plugins.json) repo and create a pull request with `yarn submit-plugin`.

### Lerna

```bash
lerna info
lerna ls # list all of the public packages in the current Lerna repo.
lerna changed # check which packages have changed since the last release.
lerna diff [package?] # Diff all packages or a single package since the last release.
lerna version
lerna bump from-git
lerna bump from-package
lerna publish # publish packages that have changed since the last release
lerna publish from-git     # explicitly publish packages tagged in the current commit
lerna publish from-package # explicitly publish packages where the latest version is not present in the registry
```

### Reference

- <https://nx.dev/angular/guides/nx-plugin>
- <https://github.com/lerna/lerna>
