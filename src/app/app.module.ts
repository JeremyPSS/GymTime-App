import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot({mode: 'md'}), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    // provideFirebaseApp(() => getApp()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyA6Djepw5NPTZofgjLz_kbZ79_hdgoeBD8",
      authDomain: "gymtime-46e56.firebaseapp.com",
      projectId: "gymtime-46e56",
      storageBucket: "gymtime-46e56.appspot.com",
      messagingSenderId: "114017716910",
      appId: "1:114017716910:web:020a08ca0f070303febb3f"})),
    provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
