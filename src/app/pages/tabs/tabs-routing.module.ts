import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
          {
            path: 'inicio',
            loadChildren: () => import('./../../pages/inicio/inicio.module').then( m => m.InicioPageModule)
          },
          {
            path: 'informacion',
            loadChildren: () => import('./../../pages/alert/alert.module').then( m => m.AlertPageModule)
          },
          {
            path: 'juegos',
            loadChildren: () => import('./../../pages/juegos/juegos.module').then( m => m.JuegosPageModule)
          },
          {
            path: 'registrate',
            loadChildren: () => import('./../../pages/action-sheet/action-sheet.module').then( m => m.ActionSheetPageModule)
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
