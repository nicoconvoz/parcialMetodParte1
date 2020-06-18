import { DomtableComponent } from './components/domtable/domtable.component';
import { personTable } from './components/persontable/persontable.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: personTable },
  { path: 'domicilios/', component: DomtableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
