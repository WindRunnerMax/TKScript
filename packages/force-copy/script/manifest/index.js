const path = require("path");
const tsNode = require("ts-node");
const fs = require("fs");
const { promisify, IS_GECKO } = require("../utils/node");

const writeFile = promisify(fs.writeFile);

exports.ManifestPlugin = class ManifestPlugin {
  constructor() {
    tsNode.register();
    this.manifest = path.resolve(`src/manifest/index.ts`);
  }

  apply(compiler) {
    compiler.hooks.make.tap("ManifestPlugin", compilation => {
      const manifest = this.manifest;
      !compilation.fileDependencies.has(manifest) && compilation.fileDependencies.add(manifest);
    });

    compiler.hooks.done.tapPromise("ManifestPlugin", () => {
      delete require.cache[require.resolve(this.manifest)];
      const manifest = require(this.manifest);
      const version = require(path.resolve("package.json")).version;
      manifest.version = version;
      const folder = IS_GECKO ? "build-gecko" : "build";
      return writeFile(path.resolve(`${folder}/manifest.json`), JSON.stringify(manifest, null, 2));
    });
  }
};
