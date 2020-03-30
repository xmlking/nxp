# @xmlking/nxp-ddd

This library was generated with [Nx](https://nx.dev).

## Usage

```bash
# scaffold angular project monorepo
yarn create nx-workspace yeti --preset=angular-nest --app-name=yeti-web-app \
--style=scss --cli=angular --npm-scope=yeti --interactive   --verbose
# update deps
ng update --all  --allow-dirty --force
# add plugin
ng add /Users/schintha/Developer/Work/SPA/nxp/dist/libs/ddd
# generate domain. options: --platform <web/mobile/desktop/node>  --app <appName> --lazy <default=true>
nx g @xmlking/nxp-ddd:domain booking
nx g @xmlking/nxp-ddd:domain booking  --platform web  --app yeti-web-app
# generate feature module. options: --platform <web/mobile/desktop/node> --lazy <default=true>
nx g @xmlking/nxp-ddd:feature search --domain booking
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy=false
nx g @xmlking/nxp-ddd:feature search --domain booking --platform web --lazy

# generate entity.
nx g @xmlking/nxp-ddd:entity flight --domain booking
nx g @xmlking/nxp-ddd:entity user   --domain booking
```

## Running unit tests

Run `nx test ddd` to execute the unit tests via [Jest](https://jestjs.io).
