import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapService } from './services/map.service';
import { MapBoxComponent } from './map-box/map-box.component';


@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
