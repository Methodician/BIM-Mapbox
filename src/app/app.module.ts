import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { MapService } from './services/map.service';
import { MapBoxComponent } from './map-box/map-box.component';
import { environment } from '../environments/environment';
import { MboxComponent } from './mbox/mbox.component';


@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    MboxComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'bim-earth'),
    AngularFirestoreModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
