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
      <svg
        *ngIf="!editorInit"
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
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
    fontSize: 16,
  };
}
