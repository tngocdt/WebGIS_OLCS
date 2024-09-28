// import OLCesium from 'olcs/OLCesium.js';

// import {OLCS_ION_TOKEN} from './cesiumiontoken.js';

// Cesium.Ion.defaultAccessToken = OLCS_ION_TOKEN;

var view = new ol.View({
  center: ol.proj.transform([7.455, 46.93], 'EPSG:4326', 'EPSG:3857'),
  zoom: 13
});

var buildings = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: '/js/data/geojson/buildings.geojson',
    attributions: [new ol.Attribution({
      html: '<a href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/landscape/swissBUILDINGS3D/swissBUILDINGS3D.html">Swiss Federal Office of Topography</a>'
    })],
    format: new ol.format.GeoJSON()
  }),
  style: [ new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'grey',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }) ]
});

var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var ol2d = new ol.Map({
  layers: [layer, buildings],
  target: 'map2d',
  view: view
});


var ol3d = new olcs.OLCesium({map: ol2d});
var scene = ol3d.getCesiumScene();

// var terrainProvider = new Cesium.CesiumTerrainProvider({
//     url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
// });

// var terrainProvider = new Cesium.createWorldTerrain();

// scene.terrainProvider = terrainProvider;

// var ol3d = new OLCesium({map: ol2d});
// var scene = ol3d.getCesiumScene();
Cesium.createWorldTerrainAsync().then(tp => scene.terrainProvider = tp);

scene.globe.depthTestAgainstTerrain = true;

ol3d.setEnabled(true); // switch to 3D - show the globe

$(function(){

  document.getElementById('idCesiumEnable').addEventListener('click', () => ol3d.setEnabled(!ol3d.getEnabled()));
});