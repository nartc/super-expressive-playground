import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
} from "ngx-monaco-editor";
import { PlaygroundEditorComponent } from "./components/playground-editor/playground-editor.component";
import { PlaygroundFooterComponent } from "./components/playground-footer/playground-footer.component";
import { PlaygroundNavComponent } from "./components/playground-nav/playground-nav.component";
import { HighlightDirective } from "./components/playground-result/highlight.directive";
import { PlaygroundResultComponent } from "./components/playground-result/playground-result.component";
import { PlaygroundUsageComponent } from "./components/playground-usage/playground-usage.component";
import { monacoConfig } from "./monaco-editor.config";
import { PlaygroundComponent } from "./playground.component";
import { playgroundRoutes } from "./playground.routes";

@NgModule({
  declarations: [
    PlaygroundComponent,
    PlaygroundNavComponent,
    PlaygroundUsageComponent,
    PlaygroundEditorComponent,
    PlaygroundResultComponent,
    PlaygroundFooterComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playgroundRoutes),
    MonacoEditorModule.forRoot(),
  ],
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: monacoConfig,
    },
  ],
})
export class PlaygroundModule {}
