import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[{
      path: 'movies',
      loadChildren: () => import('./../../page/movies/movies.module').then( m => m.MoviesPageModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./../../page/user/user.module').then( m => m.UserPageModule)
    },
    {
      path: 'homepage',
      loadChildren: () => import('./../../page/homepage/homepage.module').then( m => m.HomepagePageModule)
    },
    {
      path: 'search',
      loadChildren: () => import('./../../page/search/search.module').then( m => m.SearchPageModule)
    },
  
  {
    path: 'delete',
    loadChildren: () => import('./../delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./../update/update.module').then( m => m.UpdatePageModule)
  },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
