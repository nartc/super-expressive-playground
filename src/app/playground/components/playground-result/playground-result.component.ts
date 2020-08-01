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
  styleUrls: ['playground-result.component.scss'],
  templateUrl: "playground-result.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundResultComponent {
  @ViewChild("highlights", { static: true })
  private highlightsElement: ElementRef<HTMLDivElement>;

  @Input() output: string;

  private readonly $testString = new Subject<string>();
  testString$ = this.$testString.asObservable();

  constructor(private readonly renderer: Renderer2) { }

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
