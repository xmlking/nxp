# @xmlking/nxp-modular

Nx plugin for structuring a monorepo with domains and layers following **Domain Driven Development**

![modular](https://github.com/xmlking/nxp/raw/master/libs/modular/modular.png 'domain driven development')

This plugin adds some enhancements to @manfredsteyer [DDD](https://github.com/angular-architects/nx-ddd-plugin) Nx plugin

- State Management with [ngxs](https://www.ngxs.io/)
- [Shell Library patterns](https://indepth.dev/the-shell-library-patterns-with-nx-and-monorepo-architectures/)
- Ability to add `entities` independently as well as along with adding `feature` modules

This library was generated with [Nx](https://nx.dev).

## Install

This npm package is available on [GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) at [nxp-modular](https://github.com/xmlking/nxp/packages/165973)

Please add following to `~/.npmrc`

```
@xmlking:registry=<https://npm.pkg.github.com/>
//npm.pkg.github.com/:_authToken=TOKEN
```

```bash
ng add @xmlking/nxp-modular
```

## Usage

```bash
# scaffold workspace
ng new yeti -c=@nrwl/workspace --preset=empty --style=scss --npm-scope=yeti --app-name=yeti -v

cd yeti
# update deps
ng update --all  --allow-dirty --force

# add nx plugins (schematics)
ng add @nrwl/angular --defaults
ng add @xmlking/nxp-modular

# (Optional) In development, here is what I do to use without publishing to NPM:
yarn build:modular # in nxp project
ng add ~/Developer/Work/SPA/nxp/dist/libs/modular # in target project

# add web-app. optional flags: --platform <web/mobile/desktop/node>
ng g @xmlking/nxp-modular:app yeti
# ng g @xmlking/nxp-modular:app yeti --platform web

# generate domain. optional flags: --platform <web/mobile/desktop/node>  --app <appName> --lazy <true/false>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-modular:domain booking
nx g @xmlking/nxp-modular:domain boarding  --platform web  --app yeti-web-app
# generate feature module. optional flags: --platform <web/mobile/desktop/node> --lazy  --entity <entity>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-modular:feature search --domain booking
nx g @xmlking/nxp-modular:feature search --domain booking --entity flight
nx g @xmlking/nxp-modular:feature search --domain booking --platform web --lazy
nx g @xmlking/nxp-modular:feature search --domain booking --platform web --lazy=false
nx g @xmlking/nxp-modular:feature manage --domain boarding --entity user

# generate entity.
nx g @xmlking/nxp-modular:entity user --domain booking
nx g @xmlking/nxp-modular:entity seat --domain boarding
```

### Post-Setup Actions

After generation all modules, you might have to remove `pathMatch: 'full'` and adjust your routes in some module's Router config .<br/>
Optionally add `<router-outlet></router-outlet>` in shell component's HTML

## Running unit tests

Run `nx test modular` to execute the unit tests via [Jest](https://jestjs.io).
