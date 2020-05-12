import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace';

export function checkRuleExists(json: object, context: SchematicContext) {
  if (!json['rules']) {
    context.logger.info('tslint.json: rules expected');
    return false;
  }

  if (!json['rules']['nx-enforce-module-boundaries']) {
    context.logger.info('tslint.json: nx-enforce-module-boundaries expected');
    return false;
  }

  if (json['rules']['nx-enforce-module-boundaries']['length'] < 2) {
    context.logger.info('nx-enforce-module-boundaries.1 unexpected');
    return false;
  }

  if (!json['rules']['nx-enforce-module-boundaries'][1]['depConstraints']) {
    context.logger.info('tslint.json: nx-enforce-module-boundaries.1.depConstraints expected.');
    return false;
  }

  if (!Array.isArray(json['rules']['nx-enforce-module-boundaries'][1]['depConstraints'])) {
    context.logger.info('tslint.json: nx-enforce-module-boundaries.1.depConstraints expected to be an array.');
    return false;
  }

  return true;
}

export function addDomainToLintingRules(domainName: string): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!host.exists('tslint.json')) {
      context.logger.info('tslint.json: not found. doing nothing');
      return host;
    }

    return chain([
      updateJsonInTree('tslint.json', (json) => {
        if (checkRuleExists(json, context)) {
          const depConst = json?.rules?.['nx-enforce-module-boundaries']?.[1]?.depConstraints as Array<any>;

          depConst.push({
            sourceTag: `domain:${domainName}`,
            onlyDependOnLibsWithTags: [`domain:${domainName}`, 'domain:shared'],
          });
        }
        return json;
      }),
    ])(host, context);
  };
}

export function initLintingRules(): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!host.exists('tslint.json')) {
      context.logger.info('tslint.json: not found. doing nothing');
      return host;
    }

    return chain([
      updateJsonInTree('tslint.json', (json) => {
        if (checkRuleExists(json, context)) {
          const depConst = json?.rules?.['nx-enforce-module-boundaries']?.[1]?.depConstraints as Array<any>;

          if (depConst.some((dep) => dep.sourceTag === 'platform:web')) {
            context.logger.info('tslint.json: domain linting rules already exist. doing nothing');
            return json;
          }

          const jokerIndex = depConst.findIndex(
            (entry) =>
              entry['sourceTag'] &&
              entry['sourceTag'] === '*' &&
              entry['onlyDependOnLibsWithTags'] &&
              Array.isArray(entry['onlyDependOnLibsWithTags']) &&
              entry['onlyDependOnLibsWithTags'].length > 0 &&
              entry['onlyDependOnLibsWithTags'][0] === '*'
          );

          if (jokerIndex !== -1) {
            depConst.splice(jokerIndex, 1);
          }

          depConst.push(
            {
              sourceTag: 'platform:web',
              onlyDependOnLibsWithTags: ['platform:web', 'platform:universal'],
            },
            {
              sourceTag: 'platform:mobile',
              onlyDependOnLibsWithTags: ['platform:mobile', 'platform:universal'],
            },
            {
              sourceTag: 'platform:desktop',
              onlyDependOnLibsWithTags: ['platform:desktop', 'platform:universal'],
            },
            {
              sourceTag: 'platform:node',
              onlyDependOnLibsWithTags: ['platform:node', 'platform:universal'],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:ui', 'type:domain-logic', 'type:util'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:ui', 'type:domain-logic', 'type:util'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:domain-logic', 'type:util'],
            },
            {
              sourceTag: 'domain-logic',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            }
          );
        }
        return json;
      }),
    ])(host, context);
  };
}
