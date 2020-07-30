import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-playground-nav",
  template: `
    <nav
      class="flex-none h-12 bg-gray-900 shadow flex items-center px-4 justify-between"
    >
      <div class="flex-1 flex items-center">
        <a
          target="_blank"
          href="https://github.com/francisrstokes/super-expressive"
        >
          <img
            src="assets/images/logo.png"
            alt="logo"
            class="object-contain h-12 inline-block"
          />
        </a>
        <h5 class="mt-2 inline-block">Playground</h5>
      </div>
      <a
        class="flex-none"
        href="https://github.com/nartc/super-expressive-playground"
        target="_blank"
      >
        <img
          src="assets/images/GitHub-Mark-Light-120px-plus.png"
          alt="Github logo"
          title="Github repo"
          class="object-contain h-6"
        />
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundNavComponent {}
