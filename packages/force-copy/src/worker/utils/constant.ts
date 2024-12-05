export const CODE_PREFIX = [
  `if (window["${process.env.INJECT_FILE}"] && document instanceof XMLDocument === false) {`,
  `  const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");`,
  `  script.setAttribute("type", "text/javascript");`,
  `  const code = \`;(\${window["${process.env.INJECT_FILE}"].toString()})();\`;`,
].join("\n");

export const CODE_SUFFIX = [
  `  document.documentElement.appendChild(script);`,
  `  script.remove();`,
  `}`,
].join("\n");

export const NOOP = () => null;
