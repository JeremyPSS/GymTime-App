import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    // children: [
    //   {
    //     path: 'tab1',
    //     loadChildren: () => import('../../tab1/tab1.module').then(m => m.Tab1PageModule)
    //   },
    //   {
    //     path: 'tab2',
    //     loadChildren: () => import('../../tab2/tab2.module').then(m => m.Tab2PageModule)
    //   },
    //   {
    //     path: 'tab3',
    //     loadChildren: () => import('../../tab3/tab3.module').then(m => m.Tab3PageModule)
    //   },
    //   {
    //     path: '',
    //     redirectTo: '/tabs/tab1',
    //     pathMatch: 'full'
    //   }
    // ]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
