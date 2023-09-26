const thread = require("child_process");
const path = require("path");

const exec = command => {
  return new Promise((resolve, reject) => {
    thread.exec(command, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
};

class FilesPlugin {
  apply(compiler) {
    compiler.hooks.make.tap("FilePlugin", compilation => {
      const manifest = path.join(__dirname, "../src/manifest.json");
      const resources = path.join(__dirname, "../public/static");
      !compilation.fileDependencies.has(manifest) && compilation.fileDependencies.add(manifest);
      !compilation.contextDependencies.has(resources) &&
        compilation.contextDependencies.add(resources);
    });

    compiler.hooks.done.tapPromise("FilePlugin", () => {
      const manifest = path.join(__dirname, "../src/manifest.json");
      const resources = path.join(__dirname, "../public/static/");
      const manifestTarget = path.join(__dirname, "../build/");
      const resourcesTarget = path.join(__dirname, "../build/static/");
      return Promise.all([
        exec(`cp ${manifest} ${manifestTarget}`),
        exec(`cp -r ${resources} ${resourcesTarget}`),
      ]);
    });
  }
}

module.exports = FilesPlugin;
