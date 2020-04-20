# @xmlking/nxp-ddd

Nx plugin for structuring a monorepo with domains and layers following **Domain Driven Development**

![DDD](https://github.com/xmlking/nxp/raw/master/libs/ddd/ddd.png 'domain driven development')

This library was generated with [Nx](https://nx.dev).

## Install

This npm package is available on [GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) at [nxp-ddd](https://github.com/xmlking/nxp/packages/165973)

Please add following to `~/.npmrc`

```
@xmlking:registry=<https://npm.pkg.github.com/>
//npm.pkg.github.com/:_authToken=TOKEN
```

```bash
ng add @xmlking/nxp-ddd
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
ng add @xmlking/nxp-ddd
# (or) for local plugin development
yarn build:ddd # in nxp project
ng add ~/Developer/Work/SPA/nxp/dist/libs/ddd

# add web-app. optional flags: --platform <web/mobile/desktop/node>
ng g @xmlking/nxp-ddd:app yeti
# ng g @xmlking/nxp-ddd:app yeti --platform web

# generate domain. optional flags: --platform <web/mobile/desktop/node>  --app <appName> --lazy <true/false>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-ddd:domain booking
nx g @xmlking/nxp-ddd:domain boarding  --platform web  --app yeti-web-app
# generate feature module. optional flags: --platform <web/mobile/desktop/node> --lazy  --entity <entity>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-ddd:feature search --domain booking
nx g @xmlking/nxp-ddd:feature search --domain booking --entity flight
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy=false
nx g @xmlking/nxp-ddd:feature manage --domain boarding --entity user

# generate entity.
nx g @xmlking/nxp-ddd:entity user --domain booking
nx g @xmlking/nxp-ddd:entity seat --domain boarding
```

### Post action

After generation all modules, you might have to remove `pathMatch: 'full'` and adjust your routes in some module's Router config .<br/>
Optionally add `<router-outlet></router-outlet>` in shell component's HTML

## Running unit tests

Run `nx test ddd` to execute the unit tests via [Jest](https://jestjs.io).
