import { NgxMonacoEditorConfig } from "ngx-monaco-editor";

export const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad() {
    fetch("assets/super-expressive.d.ts.txt")
      .then((res) => res.text())
      .then((res) => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          res,
          "ts:super-expressive.d.ts"
        );
      });
  },
};
