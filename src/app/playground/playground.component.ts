import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-playground",
  template: `
    <ngx-monaco-editor
      class="super-expressive-editor"
      [options]="editorOptions"
    ></ngx-monaco-editor>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
      }

      :host ::ng-deep .super-expressive-editor {
        height: 100%;
      }

      :host ::ng-deep .super-expressive-editor .editor-container {
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: "vs-dark",
    language: "typescript",
  };

  constructor() {}

  ngOnInit(): void {}
}
