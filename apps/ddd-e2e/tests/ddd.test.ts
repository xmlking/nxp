import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq
} from '@nrwl/nx-plugin/testing';
describe('ddd e2e', () => {
  it('should create ddd', async done => {
    const plugin = uniq('ddd');
    ensureNxProject('@xmlking/nxp-ddd', 'dist/libs/ddd');
    await runNxCommandAsync(`generate @xmlking/nxp-ddd:domain ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async done => {
      const plugin = uniq('ddd');
      ensureNxProject('@xmlking/nxp-ddd', 'dist/libs/ddd');
      await runNxCommandAsync(
        `generate @xmlking/nxp-ddd:domain ${plugin} --platform web`
      );
      expect(() =>
        checkFilesExist(`libs/${plugin}/domain/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--lazy', () => {
    it('should add tags to nx.json', async done => {
      const plugin = uniq('ddd');
      ensureNxProject('@xmlking/nxp-ddd', 'dist/libs/ddd');
      await runNxCommandAsync(
        `generate @xmlking/nxp-ddd:domain ${plugin} --lazy`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
