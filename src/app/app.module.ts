import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ScullyLibModule } from "@scullyio/ng-lib";

import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { NotFoundComponent } from "./common/components/not-found/not-found.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, ScullyLibModule, RouterModule.forRoot(appRoutes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
