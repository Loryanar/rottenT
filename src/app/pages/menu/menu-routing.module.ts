import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('../main/main.module').then((m) => m.MainPageModule),
      },
      {
        path: 'user-top',
        loadChildren: () =>
          import('../favorites/favorites.module').then(
            (m) => m.UserTopPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/menu/main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
