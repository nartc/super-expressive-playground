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
        (keydown.control.enter)="execute.emit()"
        (keydown.meta.enter)="execute.emit()"
        (onInit)="init.emit($event)"
      ></ngx-monaco-editor>
      <button
        *ngIf="editorInit"
        class="absolute bottom-0 left-0 py-2 px-3 rounded bg-primary text-white mb-4 ml-4 text-xl opacity-50 hover:opacity-100"
        (click)="execute.emit()"
      >
        ▶️
      </button>
    </div>
  `,
  styleUrls: ["./playground-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundEditorComponent {
  @Input() editorInit: boolean;
  @Output() execute = new EventEmitter();
  @Output() init = new EventEmitter<monaco.editor.IStandaloneCodeEditor>();

  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: "vs-dark",
    language: "typescript"
  };
}
