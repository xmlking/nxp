import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing';
describe('modular e2e', () => {
  it('should create modular', async (done) => {
    const plugin = uniq('modular');
    ensureNxProject('@xmlking/nxp-modular', 'dist/libs/modular');
    await runNxCommandAsync(`generate @xmlking/nxp-modular:domain ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('modular');
      ensureNxProject('@xmlking/nxp-modular', 'dist/libs/modular');
      await runNxCommandAsync(`generate @xmlking/nxp-modular:domain ${plugin} --platform web`);
      expect(() => checkFilesExist(`libs/${plugin}/domain/src/index.ts`)).not.toThrow();
      done();
    });
  });

  describe('--lazy', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('modular');
      ensureNxProject('@xmlking/nxp-modular', 'dist/libs/modular');
      await runNxCommandAsync(`generate @xmlking/nxp-modular:domain ${plugin} --lazy`);
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
