import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-playground-result",
  template: `
    <div class="grid h-full row-gap-4 grid-rows-1 lg:grid-rows-12">
      <section class="row-auto lg:row-span-1">
        <input
          class="shadow cursor-default appearance-none rounded h-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-gray-200 bg-gray-700"
          id="regex"
          type="text"
          placeholder="use the editor to write your regular expression"
          [readOnly]="true"
          [value]="output"
        />
      </section>
      <section class="row-auto lg:row-span-11">
        <div class="wrapper h-full w-full relative">
          <div class="h-full w-full absolute top-0 left-0 -z-1">
            <div
              #highlights
              appHighlight
              [testString]="testString$ | async"
              class="highlights m-0 rounded h-full w-full py-2 px-3 whitespace-pre-wrap tracking-widest text-gray-200 bg-gray-700 overflow-auto"
            ></div>
          </div>
          <textarea
            class="resize-none top-0 left-0 m-0 rounded h-full w-full py-2 px-3 focus:outline-none focus:shadow-outline tracking-widest text-gray-200 bg-transparent"
            placeholder="insert your test string here"
            (input)="onInput($any($event.target).value)"
            (scroll)="onScroll($any($event.target).scrollTop)"
          ></textarea>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .highlights {
        word-wrap: break-word;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundResultComponent {
  @ViewChild("highlights", { static: true })
  private highlightsElement: ElementRef<HTMLDivElement>;

  @Input() output: string;

  private readonly $testString = new Subject<string>();
  testString$ = this.$testString.asObservable();

  constructor(private readonly renderer: Renderer2) {}

  onInput(value: string) {
    this.$testString.next(value);
  }

  onScroll(scrollTop: number) {
    this.renderer.setProperty(
      this.highlightsElement.nativeElement,
      "scrollTop",
      scrollTop
    );
  }
}
