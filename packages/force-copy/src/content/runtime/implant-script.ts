export const implantScript = () => {
  const fn = window[process.env.INJECT_FILE as unknown as number] as unknown as () => void;
  // #IFDEF GECKO
  if (fn) {
    const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.setAttribute("type", "text/javascript");
    script.innerText = `;(${fn.toString()})();`;
    document.documentElement.appendChild(script);
    script.onload = () => script.remove();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window[process.env.INJECT_FILE];
  }
  // #ENDIF
};
