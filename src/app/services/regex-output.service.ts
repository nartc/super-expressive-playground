import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RegexOutputService {
  private readonly $output = new BehaviorSubject("");
  output$ = this.$output.asObservable();

  setOutput(output: string): void {
    this.$output.next(output);
  }
}
