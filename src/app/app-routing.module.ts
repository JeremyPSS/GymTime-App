import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { share } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'classpage/:category',
    loadChildren: () => import('./extrapages/classpage/classpage.module').then( m => m.ClasspagePageModule)
  }
];

// const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
//   },
//   {
//     path: 'sign-up',
//     loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
//   },
//   {
//     path: 'classpage/:category',
//     loadChildren: () => import('./extrapages/classpage/classpage.module').then( m => m.ClasspagePageModule)
//   },
//   {
//     path: '',
//     redirectTo: 'auth',
//     pathMatch: 'full'
//   }
// ];


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/auth', // Redirigir a la ruta de inicio de sesión por defecto
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
//   },
//   {
//     path: 'sign-up',
//     loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
//   },
//   {
//     path: 'classpage/:category',
//     loadChildren: () => import('./extrapages/classpage/classpage.module').then( m => m.ClasspagePageModule)
//   },
//   {
//     path: 'tabs',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   },
//   {
//     path: '**',
//     redirectTo: '/auth' // Redirigir a la ruta de inicio de sesión si la ruta no se encuentra
//   }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
