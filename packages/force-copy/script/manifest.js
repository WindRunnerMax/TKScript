const path = require("path");
const tsNode = require("ts-node");
const fs = require("fs");
const { promisify, isGecko } = require("./utils");

const writeFile = promisify(fs.writeFile);

exports.ManifestPlugin = class ManifestPlugin {
  constructor() {
    tsNode.register();
    this.manifest = path.join(__dirname, `../src/manifest/index.ts`);
  }

  apply(compiler) {
    compiler.hooks.make.tap("ManifestPlugin", compilation => {
      const manifest = this.manifest;
      !compilation.fileDependencies.has(manifest) && compilation.fileDependencies.add(manifest);
    });

    compiler.hooks.done.tapPromise("ManifestPlugin", () => {
      delete require.cache[require.resolve(this.manifest)];
      const manifest = require(this.manifest);
      const version = require("../package.json").version;
      manifest.version = version;
      const folder = isGecko ? "build-gecko" : "build";
      return writeFile(
        path.join(__dirname, `../${folder}/manifest.json`),
        JSON.stringify(manifest, null, 2)
      );
    });
  }
};
