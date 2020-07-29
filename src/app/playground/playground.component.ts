import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { RegexOutputService } from "../services/regex-output.service";

@Component({
  selector: "app-playground",
  template: `
    <div class="flex flex-col h-full">
      <nav
        class="flex-none h-10 bg-gray-900 shadow flex items-center justify-end px-4"
      >
        <h6>SuperExpressive Playground</h6>
      </nav>
      <div
        class="flex-auto grid h-full col-gap-4 grid-cols-1 lg:grid-cols-5 p-4"
      >
        <aside class="col-auto lg:col-span-1 pl-4">
          <ul class="list-disc">
            <li>
              Use
              <a
                class="text-primary hover:underline"
                href="https://github.com/francisrstokes/super-expressive"
                target="_blank"
              >
                SuperExpressive API
              </a>
              to write your
              <strong>Regular Expression</strong>
            </li>
          </ul>
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
          <div class="grid h-full row-gap-4 grid-rows-1 lg:grid-rows-12">
            <section class="row-auto lg:row-span-1">
              <input
                class="shadow cursor-default appearance-none rounded h-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-gray-200 bg-gray-700"
                id="regex"
                type="text"
                placeholder="use the editor to write your regular expression"
                [readOnly]="true"
                [value]="output$ | async"
              />
            </section>
            <section class="row-auto lg:row-span-11">
              <div class="wrapper h-full w-full relative">
                <div class="h-full w-full absolute top-0 left-0 -z-1">
                  <div
                    #highlights
                    class="highlights m-0 rounded h-full w-full py-2 px-3 whitespace-pre-wrap tracking-widest text-gray-200 bg-gray-700"
                  ></div>
                </div>
                <textarea
                  #testString
                  class="resize-none top-0 left-0 m-0 rounded h-full w-full py-2 px-3 focus:outline-none focus:shadow-outline tracking-widest text-gray-200 bg-transparent"
                  placeholder="insert your test string here"
                  (scroll)="onTextareaScroll()"
                  (input)="onTextareaInput()"
                ></textarea>
              </div>
            </section>
          </div>
        </section>
      </div>
      <footer
        class="flex-none h-8 bg-gray-900 shadow flex items-center justify-end px-4"
      >
        <small>Built with Angular and Scully ❤️</small>
      </footer>
    </div>
  `,
  styleUrls: ["./playground.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  @ViewChild("testString", { static: true }) testStringElement: ElementRef<
    HTMLTextAreaElement
  >;
  @ViewChild("highlights", { static: true }) highlightsElement: ElementRef<
    HTMLDivElement
  >;
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

    if (
      !trimmedValue.includes("toRegex()") &&
      !trimmedValue.includes("toRegexString()")
    ) {
      alert("Please call toRegex() or toRegexString()");
      return;
    }

    const regexFn = new Function(
      `return ${PlaygroundComponent.trimComments(this.editor.getValue())}`
    );
    try {
      const output = regexFn();
      this.regexOutputService.setOutput(output);
      if (!!this.testStringElement.nativeElement.value) {
        this.highlightsElement.nativeElement.innerHTML = this.applyHighlights(
          this.testStringElement.nativeElement.value
        );
      }
    } catch (e) {
      console.log("there is an error", e);
    }
  }

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.editor.focus();
  }

  onTextareaScroll() {}

  onTextareaInput() {
    const value = this.testStringElement.nativeElement.value;
    this.highlightsElement.nativeElement.innerHTML = this.applyHighlights(
      value
    );
  }

  private applyHighlights(raw: string) {
    let _temp = raw.replace(/\n$/g, "\n\n");
    this.output$.subscribe((output) => {
      let regex: any = output;
      if (typeof output === "string") {
        regex = new RegExp(output);
      }
      _temp = _temp.replace(regex, "<mark>$&</mark>");
    });
    return _temp;
  }

  private static trimComments(raw: string): string {
    return raw
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")
      .replace(/\n/g, "")
      .replace(/\s/g, "");
  }
}
