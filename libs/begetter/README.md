# @xmlking/nxp-begetter

Nx plugin for refactoring default nx monorepo into Domain, Shell, Data-Access and Feature modules.<br/>
Also makes **Apps** tiny by moving assets, styles, and environments into shared libraries.

![begetter](https://github.com/xmlking/nxp/raw/master/libs/begetter/begetter.png 'domain driven development')

This plugin adds some enhancements to @manfredsteyer [DDD](https://github.com/angular-architects/nx-ddd-plugin) Nx plugin

- State Management with [ngxs](https://www.ngxs.io/)
- [Shell Library patterns](https://indepth.dev/the-shell-library-patterns-with-nx-and-monorepo-architectures/)
- Ability to add `entities` independently as well as along with adding `feature` modules

This library was generated with [Nx](https://nx.dev).

## Install

This npm package is available on [GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) at [nxp-begetter](https://github.com/xmlking/nxp/packages/165973)

Please add following to `~/.npmrc`

```
@xmlking:registry=<https://npm.pkg.github.com/>
//npm.pkg.github.com/:_authToken=TOKEN
```

```bash
ng add @xmlking/nxp-begetter
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
ng add @xmlking/nxp-begetter

# (Optional) In development, here is what I do to use without publishing to NPM:
yarn build:begetter # in nxp project
ng add ~/Developer/Work/SPA/nxp/dist/libs/begetter # in target project

# add web-app. optional flags: --platform <web/mobile/desktop/nest>
ng g @xmlking/nxp-begetter:app yeti
# ng g @xmlking/nxp-begetter:app yeti --platform web

# generate domain. optional flags: --platform <web/mobile/desktop/nest>  --app <appName> --lazy <true/false>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-begetter:domain booking
nx g @xmlking/nxp-begetter:domain boarding  --platform web  --app yeti-web-app
# generate feature module. optional flags: --platform <web/mobile/desktop/nestjs> --lazy  --entity <entity>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-begetter:feature search --domain booking
nx g @xmlking/nxp-begetter:feature search --domain booking --entity flight
nx g @xmlking/nxp-begetter:feature search --domain booking --platform web --lazy
nx g @xmlking/nxp-begetter:feature search --domain booking --platform web --lazy=false
nx g @xmlking/nxp-begetter:feature manage --domain boarding --entity user

# generate entity.
nx g @xmlking/nxp-begetter:entity user --domain booking
nx g @xmlking/nxp-begetter:entity seat --domain boarding
```

### Post-Setup Actions

After generation all modules, you might have to remove `pathMatch: 'full'` and adjust your routes in some module's Router config .<br/>
Optionally add `<router-outlet></router-outlet>` in shell component's HTML

## Running unit tests

Run `nx test begetter` to execute the unit tests via [Jest](https://jestjs.io).
