import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasspagePage } from './classpage.page';

const routes: Routes = [
  {
    path: '',
    component: ClasspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasspagePageRoutingModule {}
