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
# scaffold angular project monorepo
yarn create nx-workspace yeti --preset=angular-nest --app-name=yeti-web-app \
--style=scss --cli=angular --npm-scope=yeti --interactive   --verbose
# update deps
ng update --all  --allow-dirty --force
# add plugin
ng add @xmlking/nxp-ddd
# for local development
ng add ~/Developer/Work/SPA/nxp/dist/libs/ddd
nx g @xmlking/nxp-ddd:ng-add

# generate domain. optional flags: --platform <web/mobile/desktop/node>  --app <appName> --lazy <true/false>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-ddd:domain booking
nx g @xmlking/nxp-ddd:domain boarding  --platform web  --app yeti-web-app
# generate feature module. optional flags: --platform <web/mobile/desktop/node> --lazy  --entity <entity>
# defaults platform=web, app=defaultProject, lazy=true
nx g @xmlking/nxp-ddd:feature search --domain booking
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy=false
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --entity flight
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --entity flight
nx g @xmlking/nxp-ddd:feature manage --domain boarding --entity user

# generate entity.
nx g @xmlking/nxp-ddd:entity user --domain booking
nx g @xmlking/nxp-ddd:entity seat --domain boarding
```

## Running unit tests

Run `nx test ddd` to execute the unit tests via [Jest](https://jestjs.io).
