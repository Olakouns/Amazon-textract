import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadCardPageComponent} from "./pages/load-card-page/load-card-page.component";
import {ExtractListComponent} from "./pages/extract-list/extract-list.component";

const routes: Routes = [
  {path: '', component: LoadCardPageComponent},
  {path: 'all', component: ExtractListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
