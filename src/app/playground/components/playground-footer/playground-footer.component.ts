import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-playground-footer",
  template: `
    <footer
      class="flex-none h-8 bg-gray-900 shadow flex items-center px-4"
    >
      <small>
        Logo by
        <a
          class="text-primary hover:underline"
          target="_blank"
          rel="noopener"
          href="https://github.com/francisrstokes/super-expressive"
        >
          SuperExpressive
        </a>
        .
      </small>
      <small class="ml-2">
        Built with
        <a
          class="text-primary hover:underline"
          target="_blank"
          rel="noopener"
          href="https://angular.io"
        >
          Angular
        </a>
        and
        <a
          class="text-primary hover:underline"
          target="_blank"
          rel="noopener"
          href="https://scully.io"
        >
          Scully
        </a>
        ❤️
      </small>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundFooterComponent {}
