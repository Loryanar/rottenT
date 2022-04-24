import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileMoviePage } from './movie.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMoviePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMoviePageRoutingModule {}
