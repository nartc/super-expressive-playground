import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RegexOutputService } from "../services/regex-output.service";

@Component({
  selector: "app-playground",
  template: `
    <div class="flex flex-col h-full">
      <nav class="flex-none h-8">
        nav goes here
      </nav>
      <div class="flex-auto grid h-full col-gap-4 grid-cols-1 lg:grid-cols-5">
        <aside class="col-auto lg:col-span-1">
          usage goes here
        </aside>
        <section class="col-auto lg:col-span-2">
          <ngx-monaco-editor
            [class.super-expressive-editor]="true"
            [options]="editorOptions"
            [(ngModel)]="code"
            (keydown.control.enter)="onExecute()"
            (keydown.meta.enter)="onExecute()"
            (onInit)="onEditorInit($event)"
          ></ngx-monaco-editor>
        </section>
        <section class="col-auto lg:col-span-2">
          <span *ngIf="output$ | async as output; else noOutput">
            {{ output }}
          </span>
          <ng-template #noOutput>
            Write a regex
          </ng-template>
        </section>
      </div>
      <footer class="flex-none h-8">
        Footer
      </footer>
    </div>
  `,
  styleUrls: ["./playground.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  code = "SuperExpressive()";
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: "vs-dark",
    language: "typescript",
  };
  editor: monaco.editor.IStandaloneCodeEditor;
  output$ = this.regexOutputService.output$;

  constructor(private readonly regexOutputService: RegexOutputService) {}

  ngOnInit(): void {}

  onExecute() {
    const trimmedValue = PlaygroundComponent.trimComments(
      this.editor.getValue()
    );

    if (!trimmedValue.startsWith("SuperExpressive()")) {
      alert("Snippet must start with SuperExpressive()");
      return;
    }

    const regexFn = new Function(
      `return ${PlaygroundComponent.trimComments(this.editor.getValue())}`
    );
    try {
      this.regexOutputService.setOutput(regexFn());
    } catch (e) {
      console.log("there is an error", e);
    }
  }

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.editor.focus();
  }

  private static trimComments(raw: string): string {
    return raw
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")
      .replace(/\n/, "")
      .replace(/\s/, "");
  }
}
