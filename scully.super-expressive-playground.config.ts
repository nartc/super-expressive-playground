import { registerPlugin, ScullyConfig } from "@scullyio/scully";

function removeMonacoScriptPluginHandler(html: string) {
  return Promise.resolve(
    html.replace(/<script.+(?:tsMode\.js|typescript\.js)"><\/script>/g, "")
  );
}

registerPlugin("render", "RemoveMonacoScript", removeMonacoScriptPluginHandler);

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "super-expressive-playground",
  outDir: "./dist/static",
  routes: {},
  defaultPostRenderers: ["RemoveMonacoScript"],
};
