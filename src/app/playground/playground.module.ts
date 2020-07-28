import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
} from "ngx-monaco-editor";
import { monacoConfig } from "./monaco-editor.config";
import { PlaygroundComponent } from "./playground.component";
import { playgroundRoutes } from "./playground.routes";

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(playgroundRoutes),
    MonacoEditorModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: monacoConfig,
    },
  ],
})
export class PlaygroundModule {}
