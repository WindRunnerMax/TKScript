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
    compiler.hooks.make.tap("FilesPlugin", compilation => {
      const resources = path.join(__dirname, "../public/static");
      !compilation.contextDependencies.has(resources) &&
        compilation.contextDependencies.add(resources);
    });

    compiler.hooks.done.tapPromise("FilesPlugin", () => {
      const locales = path.join(__dirname, "../public/locales/");
      const resources = path.join(__dirname, "../public/static/");

      const localesTarget = path.join(__dirname, "../build/_locales/");
      const resourcesTarget = path.join(__dirname, "../build/static/");

      return Promise.all([
        exec(`cp -r ${locales} ${localesTarget}`),
        exec(`cp -r ${resources} ${resourcesTarget}`),
      ]);
    });
  }
}

module.exports = FilesPlugin;
