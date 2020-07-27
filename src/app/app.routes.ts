import { Routes } from "@angular/router";
import { NotFoundComponent } from "./common/components/not-found/not-found.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "playground", pathMatch: "full" },
  {
    path: "playground",
    loadChildren: async () =>
      (await import("./playground/playground.module")).PlaygroundModule,
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];
