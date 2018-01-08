import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MapService } from '../services/map.service';
import { FeatureCollection, GeoJson, LayerClass } from '../models/map';
import { Layer } from 'mapbox-gl/dist/mapbox-gl';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {
  myLayer: Layer
  map: mapboxgl.Map;
  draw: any;
  lat = 37.75
  lng = -122.41;
  // style = 'mapbox://styles/mapbox/streets-v10';
  style = 'mapbox://styles/mapbox/outdoors-v9';

  constructor(private mapSvc: MapService) { }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      })
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.map.addControl(this.draw);
    this.map.addControl(new mapboxgl.NavigationControl());


    this.map.on('load', event => {
      console.log('map load:', event);

      // 0: [-122.69357765012305, 45.50164949515249]
      // 1: [-122.69769752316546, 45.49545290467245]
      // 2: [-122.6873978405493, 45.48733012723227]
      // 3: [-122.69357765012305, 45.50164949515249]
      // new GeoJson([
      //   [-122.69357765012305, 45.50164949515249],
      //   [-122.69769752316546, 45.49545290467245],
      //   [-122.6873978405493, 45.48733012723227],
      //   [-122.69357765012305, 45.50164949515249]
      // ])
      let newGeoJSON = new GeoJson('Polygon', [[
        [-122.69357765012305, 45.50164949515249],
        [-122.69769752316546, 45.49545290467245],
        [-122.6873978405493, 45.48733012723227],
        [-122.69357765012305, 45.50164949515249]
      ]]
      );
      let newLayer = new LayerClass(
        'newId',
        'fill',
        {
          type: 'geojson',
          data: {
            ...newGeoJSON
          }
        },
        {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }

      );
      console.log('new layer:', newLayer);
      this.map.addLayer(
        { ...newLayer }
        // {
        //   id: 'newid',
        //   type: 'fill',
        //   source: {
        //     type: 'geojson',
        //     data: {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Polygon',
        //         coordinates: [[
        //           [-122.69357765012305, 45.50164949515249],
        //           [-122.69769752316546, 45.49545290467245],
        //           [-122.6873978405493, 45.48733012723227],
        //           [-122.69357765012305, 45.50164949515249]
        //         ]]
        //       }
        //     }
        //   }
        // } as any
        // {
        //   'id': 'maine',
        //   'type': 'fill',
        //   'source': {
        //     'type': 'geojson',
        //     'data': {
        //       'type': 'Feature',
        //       'geometry': {
        //         'type': 'Polygon',
        //         'coordinates': [[[-67.13734351262877, 45.137451890638886],
        //         [-66.96466, 44.8097],
        //         [-68.03252, 44.3252],
        //         [-69.06, 43.98],
        //         [-70.11617, 43.68405],
        //         [-70.64573401557249, 43.090083319667144],
        //         [-70.75102474636725, 43.08003225358635],
        //         [-70.79761105007827, 43.21973948828747],
        //         [-70.98176001655037, 43.36789581966826],
        //         [-70.94416541205806, 43.46633942318431],
        //         [-71.08482, 45.3052400000002],
        //         [-70.6600225491012, 45.46022288673396],
        //         [-70.30495378282376, 45.914794623389355],
        //         [-70.00014034695016, 46.69317088478567],
        //         [-69.23708614772835, 47.44777598732787],
        //         [-68.90478084987546, 47.184794623394396],
        //         [-68.23430497910454, 47.35462921812177],
        //         [-67.79035274928509, 47.066248887716995],
        //         [-67.79141211614706, 45.702585354182816],
        //         [-67.13734351262877, 45.137451890638886]]]
        //       }
        //     }
        //   },
        //   'layout': {},
        //   'paint': {
        //     'fill-color': '#088',
        //     'fill-opacity': 0.8
        //   }
        // } as any
        // {
        //   id: 'tester',
        //   type: 'fill',
        //   source: {
        //     type: 'geojson',
        //     data: {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Polygon',
        //         coordinates: [
        //           [-122.69357765012305, 45.50164949515249],
        //           [-122.69769752316546, 45.49545290467245],
        //           [-122.6873978405493, 45.48733012723227],
        //           [-122.69357765012305, 45.50164949515249]
        //         ]
        //       }
        //     }
        //   },
        //   layout: {},
        //   paint: {
        //     "fill-color": '#088',
        //     'fill-opacity': 0.8
        //   }
        // } as any


      );
    });

    this.map.on('draw.create', e => {
      console.log('draw create:', e);
    });
    this.map.on('draw.delete', e => {
      console.log('draw delete:', e);
    });
    this.map.on('draw.update', e => {
      console.log('draw update:', e);
    });

  }
}
