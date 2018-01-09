import { Component, OnInit } from '@angular/core';
import * as mbox from 'mapbox-gl';
import * as mboxDraw from '@mapbox/mapbox-gl-draw';
import { MapService } from '../services/map.service';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { FeatureCollection } from '../models/map';

@Component({
  selector: 'app-mbox',
  templateUrl: './mbox.component.html',
  styleUrls: ['./mbox.component.css']
})
export class MboxComponent implements OnInit {
  map: mbox.Map;
  draw: mboxDraw;
  lat = 37.75
  lng = -122.41;
  // style = 'mapbox://styles/mapbox/streets-v10';
  style = 'mapbox://styles/mapbox/outdoors-v9';

  // source: any;

  polyCollection: AngularFirestoreCollection<any>;

  constructor(private mapSvc: MapService) {
  }

  ngOnInit() {
    this.initializeMap();
    this.polyCollection = this.mapSvc.getPolygons();
  }

  saveGeoPoly(features) {
    console.log(features[0]);
    this.mapSvc.addPolygon(features[0]);
  }

  updateGeoPoly(features) {
    console.log(features[0]);
    this.mapSvc.updatePolygon(features[0]);
  }

  private initializeMap() {

    this.buildMap();
  }

  buildMap() {

    this.map = new mbox.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.draw = new mboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.map.addControl(this.draw);
    this.map.addControl(new mbox.NavigationControl());

    this.map.on('load', e => {
      console.log('map load:', e);

      this.polyCollection.valueChanges().subscribe(encodedPolygons => {
        let polygons = encodedPolygons.map(poly => {
          let geometry = JSON.parse(poly.geometry);
          return geometry;
        })
        let features = new FeatureCollection(polygons);
        console.log(features);
        let featureIds = this.draw.add(features);
        console.log(featureIds);
      })

    });

    this.map.on('draw.create', e => {
      this.saveGeoPoly(e.features);
    });
    this.map.on('draw.delete', e => {
      console.log('draw delete:', e);
    });
    this.map.on('draw.update', e => {
      console.log('draw update:', e);
      this.updateGeoPoly(e.features);
    });

    this.map.on('click', e => {
      console.log('clicked:', e);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      })
    }
  }
}
