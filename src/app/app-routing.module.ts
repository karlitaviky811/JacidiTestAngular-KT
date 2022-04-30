import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
}, {
  path: 'movies',
  loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesModule)
},
{
  path: 'cast/:id',
  loadChildren: () => import('./pages/cast/cast.module').then(m => m.CastModule)
}
, {
  path: 'series',
  loadChildren: () => import('./pages/series/series.module').then(m => m.SeriesModule)
},
{
  path: 'review/:id',
  loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewModule)
}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
