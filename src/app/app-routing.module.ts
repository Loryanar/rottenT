import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedinGuard } from './guards/loggedin.guard';
import { NotLoggedinGuard } from './guards/not-loggedin.guard';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [NotLoggedinGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [NotLoggedinGuard],
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
    canActivate: [LoggedinGuard],
  },
  {
    path: 'profile-movie/:id',
    loadChildren: () =>
      import('./pages/movie/movie.module').then(
        (m) => m.ProfileMoviePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
