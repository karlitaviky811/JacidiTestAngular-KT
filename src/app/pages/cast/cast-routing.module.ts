import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastComponent } from './cast.component'


const routes: Routes = [{
  path: '',
  component: CastComponent,
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CastRoutingModule { }
