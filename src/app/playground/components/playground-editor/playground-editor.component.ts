import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-playground-editor",
  template: `
    <div class="relative h-full w-full">
      <ngx-monaco-editor
        [class.super-expressive-editor]="true"
        [options]="editorOptions"
        (onInit)="init.emit($event)"
      ></ngx-monaco-editor>
    </div>
  `,
  styleUrls: ["./playground-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundEditorComponent {
  @Input() editorInit: boolean;
  @Output() init = new EventEmitter<monaco.editor.IStandaloneCodeEditor>();

  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: "vs-dark",
    language: "typescript",
  };
}
