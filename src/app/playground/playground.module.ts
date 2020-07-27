import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { PlaygroundComponent } from "./playground.component";
import { playgroundRoutes } from "./playground.routes";

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(playgroundRoutes),
    MonacoEditorModule.forRoot(),
  ],
})
export class PlaygroundModule {}
