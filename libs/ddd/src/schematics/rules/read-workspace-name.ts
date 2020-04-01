import { Tree } from '@angular-devkit/schematics';

export function readWorkspaceName(host: Tree): string {
  const content = host.read('nx.json').toString();
  const config = JSON.parse(content);
  return '@' + config['npmScope'];
}
