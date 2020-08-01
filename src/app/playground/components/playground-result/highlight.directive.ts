import { Directive, ElementRef, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
import { RegexOutputService } from "../../../services/regex-output.service";

/**
 * From https://github.com/IonicaBizau/regex-parser.js/blob/master/lib/index.js
 * @param regexOutput {string}
 */
function parseRegex(regexOutput: string): RegExp {
  if (typeof regexOutput !== "string") {
    throw new Error("Invalid input. Input must be a string");
  }

  // Parse input
  const m = regexOutput.match(/(\/?)(.+)\1([a-z]*)/i);

  // Invalid flags
  if (m[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])) {
    return RegExp(regexOutput);
  }

  // Create the regular expression
  return new RegExp(m[2], m[3]);
}

@Directive({
  selector: "div[appHighlight]",
})
export class HighlightDirective implements OnDestroy {
  @Input() set testString(val: string) {
    this.currentTestString = val;
    this.regexOutputService.output$
      .pipe(filter(Boolean), take(1))
      .subscribe(this.applyHighlights.bind(this));
  }

  private subscription: Subscription;
  private currentTestString: string;

  constructor(
    private readonly el: ElementRef<HTMLDivElement>,
    private readonly regexOutputService: RegexOutputService
  ) {
    this.subscription = regexOutputService.output$
      .pipe(filter(Boolean))
      .subscribe(this.applyHighlights.bind(this));
  }

  private applyHighlights(regexOutput: RegExp | string) {
    if (!!this.currentTestString) {
      let _temp = this.currentTestString.replace(/\n$/g, "\n\n");
      if (typeof regexOutput === "string") {
        regexOutput = parseRegex(regexOutput);
      }
      this.el.nativeElement.innerHTML = _temp.replace(
        regexOutput,
        "<mark>$&</mark>"
      );
    } else {
      this.el.nativeElement.innerHTML = null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
