import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-playground-nav",
  template: `
    <nav class="flex-none h-12 bg-gray-900 shadow flex items-center px-4">
      <a
        target="_blank"
        href="https://github.com/francisrstokes/super-expressive"
      >
        <img
          src="assets/images/logo.png"
          alt="logo"
          class="object-contain h-12"
        />
      </a>
      <h5 class="mt-2">Playground</h5>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundNavComponent {}
