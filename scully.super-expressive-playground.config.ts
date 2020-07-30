import { registerPlugin, ScullyConfig } from "@scullyio/scully";
import { getHttp404Plugin } from "@gammastream/scully-plugin-http404";
import { MinifyHtml } from "scully-plugin-minify-html";

function removeMonacoScriptPluginHandler(html: string) {
  return Promise.resolve(
    html
      .replace(/<script.+(?:editor\.main(?:\.nls)\.js)"><\/script>/g, "")
      .replace(/<script.+(?:tsMode\.js|typescript\.js)"><\/script>/g, "")
      .replace(/<ngx-monaco-editor.+><\/ngx-monaco-editor>/g, "")
  );
}

registerPlugin("render", "RemoveMonacoScript", removeMonacoScriptPluginHandler);

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "super-expressive-playground",
  outDir: "./dist/static",
  routes: {},
  defaultPostRenderers: ["RemoveMonacoScript", MinifyHtml, getHttp404Plugin()],
};
