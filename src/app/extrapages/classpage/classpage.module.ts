import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasspagePageRoutingModule } from './classpage-routing.module';

import { ClasspagePage } from './classpage.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasspagePageRoutingModule,
    SharedModule
  ],
  declarations: [ClasspagePage]
})
export class ClasspagePageModule {}
