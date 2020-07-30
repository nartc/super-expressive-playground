import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { RegexOutputService } from "../services/regex-output.service";

@Component({
  selector: "app-playground",
  template: `
    <div class="flex flex-col h-full">
      <app-playground-nav></app-playground-nav>
      <div
        class="flex-auto grid h-full col-gap-4 grid-cols-1 lg:grid-cols-5 p-4"
      >
        <aside class="col-auto lg:col-span-1 pl-4">
          <app-playground-usage></app-playground-usage>
        </aside>
        <section class="col-auto lg:col-span-2">
          <app-playground-editor
            [editorInit]="editor != null"
            (init)="onEditorInit($event)"
          ></app-playground-editor>
        </section>
        <section class="col-auto lg:col-span-2">
          <app-playground-result
            [output]="output$ | async"
          ></app-playground-result>
        </section>
      </div>
      <app-playground-footer></app-playground-footer>
    </div>
  `,
  styleUrls: ["./playground.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  editor: monaco.editor.IStandaloneCodeEditor;
  output$ = this.regexOutputService.output$;
  private executeAction: monaco.IDisposable;

  constructor(
    private readonly regexOutputService: RegexOutputService,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  onExecute() {
    const trimmedValue = PlaygroundComponent.trimComments(
      this.editor.getValue()
    );

    if (!trimmedValue.startsWith("SuperExpressive()")) {
      alert("Snippet must start with SuperExpressive()");
      return;
    }

    if (
      !trimmedValue.includes("toRegex()") &&
      !trimmedValue.includes("toRegexString()")
    ) {
      alert("Please call toRegex() or toRegexString()");
      return;
    }

    const regexFn = new Function(`return ${trimmedValue}`);
    try {
      const output = regexFn();
      console.log("[Debug Editor Value] -->", trimmedValue, output);
      this.regexOutputService.setOutput(output);
    } catch (e) {
      console.log("there is an error", e);
    }
  }

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    editor.focus();
    this.ngZone.run(() => {
      this.editor = editor;
      this.editor.setValue("SuperExpressive()");
      this.executeAction = this.editor.addAction({
        id: "execute",
        label: "Execute",
        keybindings: [
          monaco.KeyMod.WinCtrl | monaco.KeyCode.Enter,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        ],
        contextMenuGroupId: "1_modification",
        contextMenuOrder: 1,
        run: () => {
          this.ngZone.run(this.onExecute.bind(this));
        },
      });
    });
  }

  private static trimComments(raw: string): string {
    return raw
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")
      .replace(/\n/g, "")
      .trim();
  }

  ngOnDestroy(): void {
    this.executeAction?.dispose();
  }
}
