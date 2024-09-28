import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';
import ImageWMS from 'ol/source/ImageWMS.js';

import VectorLayer from 'ol/layer/Vector.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';

import View from 'ol/View.js';
import {defaults as olControlDefaults} from 'ol/control.js';

import {
    get as getProjection,
    Projection,
    transform,
    fromLonLat
} from 'ol/proj.js';

import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';

import Overlay from 'ol/Overlay.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import olStyleFill from 'ol/style/Fill.js';
import {defaults as interactionDefaults} from 'ol/interaction.js';


import OLCesium from 'olcs/OLCesium.js';

import {OLCS_ION_TOKEN} from './cesiumiontoken.js';
// import {geojondata} from '..data/geojson/data.';

Cesium.Ion.defaultAccessToken = OLCS_ION_TOKEN;
// const map = new Map({
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//   ],
//   target: 'map',
//   view: new View({
//     center: [0, 0],
//     zoom: 2,
//   }),
// });

var format = 'image/png';

// Determine the Native Bounding Box of Map
var bounds = [700484.625, 1199871.875, 701015.25, 1200364.25];

// Define the Layers: A layer is a visual representation of data from a source. OpenLayers has four basic types of layers
//  1. ol.layer.Tile: Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
//  tiled images being shown as base map, determine the zoom levels depending the map scale.
//  2. ImageLayer: Renders sources that provide map images at arbitrary extents and resolution.
//  3. ol.layer.Vector: Renders vector data client-side.
//  4. ol.layer.VectorTile: Renders data that is provided as vector tiles.

// // Create your layers
// const map2DLayers = [
//     new TileLayer({
//         source: new OSM({
//             crossOrigin: 'anonymous'
//         })
//     }),
//     // Add more layers as needed
//     new ImageLayer({
//         source: new ImageWMS({
//             ratio: 1,
//             url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//             params: {
//                 "LAYERS": 'WebGISDBdev:house',
//                 'TILED': true,
//                 'TRANSPARENT':true,
//             }
//         })
//     }),
//     new ImageLayer({
//         source: new ImageWMS({
//             ratio: 1,
//             url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//             params: {
//                 "LAYERS": 'WebGISDBdev:parcel'
//             }
//         })
//     }),
//     new ImageLayer({
//         source: new ImageWMS({
//             ratio: 1,
//             url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//             params: {
//                 "LAYERS": 'WebGISDBdev:street'
//             }
//         })
//     }),
//     new ImageLayer({
//         source: new ImageWMS({
//             ratio: 1,
//             url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//             params: {
//                 "LAYERS": 'WebGISDBdev:streetline'
//             }
//         })
//     }),
//     new ImageLayer({
//         source: new ImageWMS({
//             ratio: 1,
//             url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//             params: {
//                 "LAYERS": 'WebGISDBdev:tree_vn2000'
//             }
//         })
//     }),
//     // new ImageLayer({
//     //     source: new ImageWMS({
//     //         ratio: 1,
//     //         url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
//     //         params: {
//     //             "LAYERS": 'WebGISDBdev:WebGISDBdev_LayerGroup'
//     //         }
//     //     })
//     // }),
// ];

// // Set crossOrigin for all layers
// map2DLayers.forEach(layer => {
//     const source = layer.getSource();
//     if (source && source.set('crossOrigin', 'anonymous')) {
//         source.crossOrigin = 'anonymous';
//     }
// });

// Create the base map with tile geo object
var tiled_osm_layer = new TileLayer({
    source: new OSM()
});

// Create the required maps with image geo object
const house_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:house',
            'TILED': true,
            'TRANSPARENT':true,
        }
    }),
    crossOrigin: 'anonymous',
});

var parcel_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:parcel'
        }
    }),
    crossOrigin: 'anonymous',
});

var street_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:street'
        }
    }),
    crossOrigin: 'anonymous',
});

var streetline_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:streetline'
        }
    }),
    crossOrigin: 'anonymous',
});

var tree_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:tree_vn2000'
        }
    }),
    crossOrigin: 'anonymous',
});



const group_layer = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',
        params: {
            "LAYERS": 'WebGISDBdev:WebGISDBdev_LayerGroup'
        }
    }),
    crossOrigin: 'anonymous',
});

var projection = new Projection({
    // code: 'EPSG:3405',
    code: 'EPSG:3857',
    units: 'm',
    axisOrientation: 'enu',
    // global: false,
});

// Create base view
const view = new View({
    projection: projection,
    // center: fromLonLat([X, Y]),  // Reduce X to move to left
    center: fromLonLat([106.8379, 10.85]),   // Right Center For 2D Map
    // center: fromLonLat([106.9, 10.85]),
    zoom: 16,       // 16 is the best value, 12.9 is used for all
});

var controls = olControlDefaults({
    rotate: true,
    rotateOptions: {
        tipLabel: "Reset rotation. \nUse Alt+Shift+Drag to rotate the map."
    }
});

// Create a style
var styles = {
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 3
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};
        
var vectorLayer = new VectorLayer({
    style: styleFunction
});

function Make_Get_Request(url) {
        
    return new Promise((resolve, reject) => {
        fetch(url, {
            // mode: 'no-cors',

            method: 'GET',
            
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:1024',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
            }
        })
        .then(res => {
            console.log("url: " + url);
            console.log(res);
            alert(res.ok);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
};

function Access_Geo_Attribute(url) {     
    console.log("Access_Geo_Attribute - url: " + url);   
    if (url.length == 0) {
        return;
    }
    var findQuestionLoc = url.indexOf("?");
    // console.log("findQuestionLoc: " + findQuestionLoc);
    // console.log("url.length: " + url.length);
    var paras = url.substring(findQuestionLoc + 1);
    // console.log("paras: " + paras);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            var njsdata = xmlhttp.responseText;
            
            // console.log(njsdata);
            // document.getElementById("idInfor").innerHTML = njsdata;

            njsdata = JSON.parse(xmlhttp.responseText);
            // console.log(njsdata);
            
            var content = "<table>";
            for (var i = 0; i < njsdata.features.length; i++) {
                var feature = njsdata.features[i];
                var featureAttr = feature.properties;
                content += "<tr><td>Chủ SDD: " + featureAttr["chusdd"]
                        + "</td><td>Địa Chỉ: " + featureAttr["diachi_1"]
                        + "</td><td>Hoàn Công: " + featureAttr["hoancong"]
                        + "</td><td>Loại Hình: " + featureAttr["loaihinh"]
                        +"</td></tr>"
            }
            content += "</table>";

            $("#idPopupContent").html(content);			

            var vectorSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(njsdata)
            });
                
            vectorLayer.setSource(vectorSource);
            
            document.getElementById("idInfor").innerHTML = content;
        }
    }

    xmlhttp.open("GET", "api/geoserver/WebGISDBdev/wms?" + paras);
    xmlhttp.send(null);
};

async function addBuildingGeoJSON() {
    // Load the GeoJSON file from Cesium ion.
    const geoJSONURL = "http://localhost:9999/geoserver/WebGISDBdev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WebGISDBdev%3Ahouse&maxFeatures=50&outputFormat=application%2Fjson&srsName=EPSG:3857";
    // Create the geometry from the GeoJSON, and clamp it to the ground.
    const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
    // Add it to the scene.
    const ds = await viewer.dataSources.add(geoJSON);
    // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
    // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
    for (const entity of ds.entities.values) {
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
    }
    // // Move the camera so that the polygon is in view.
    // viewer.flyTo(ds);
    return geoJSON;
};

function addPhuocThienBuildingV01() {
    Cesium.Math.setRandomNumberSeed(0);
    var promise = Cesium.GeoJsonDataSource.load(
        "http://localhost:9999/geoserver/WebGISDBdev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WebGISDBdev%3Ahouse&maxFeatures=50&outputFormat=application%2Fjson&srsName=EPSG:3857"
    );
    promise
        .then(function(ds) {
            ds.crs.properties.name = 'EPSG:3857';
            viewer.dataSources.add(ds);

            //Get the array of entities
            var entities = ds.entities.values;

            var colorHash = {};
            for (var i = 0; i < entities.length; i++) {
                //For each entity, create a random color based on the state name.
                //Some states have multiple entities, so we store the color in a
                //hash so that we use the same color for the entire state.
                var entity = entities[i];
                var name = entity.name;
                var color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0,
                    });
                    colorHash[name] = color;
                }

                //Set the polygon material to our random color.
                entity.polygon.material = color;
                //Remove the outlines.
                entity.polygon.outline = false;

                //Extrude the polygon based on the state's population.  Each entity
                //stores the properties for the GeoJSON feature it was created from
                //Since the population is a huge number, we divide by 50.
                entity.polygon.extrudedHeight = entity.properties.chieucao * 5000;
            }
        })
        .catch(function(error) {
            //Display any errors encountered while loading.
            // window.alert(error);
            console.log(error);
        });
};

function addPhuocThienBuildingV02(ds) {
    console.log("ds: " + "\n" + JSON.stringify(ds));
    Cesium.Math.setRandomNumberSeed(0);
    ds.crs.properties.name = 'EPSG:3857';
    viewer.dataSources.add(ds);

    //Get the array of entities
    var entities = ds.entities.values;

    var colorHash = {};
    for (var i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        var entity = entities[i];
        var name = entity.name;
        var color = colorHash[name];
        if (!color) {
            color = Cesium.Color.fromRandom({
                alpha: 1.0,
            });
            colorHash[name] = color;
        }

        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = false;

        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.
        entity.polygon.extrudedHeight = entity.properties.chieucao * 5000;
    }
};

async function addPhuocThienBuildingPromise(){    
    var url = "http://localhost:9999/geoserver/WebGISDBdev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WebGISDBdev%3Ahouse&outputFormat=application%2Fjson&srsName=EPSG:3857";
    return new Promise((resolve, reject) => {
        fetch(url, {

        })
        .then(res => {
            // console.log("url: " + url);
            // console.log(res);
            // alert(res.ok);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            return res.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
};


$(function(){
    var container = document.getElementById('idPopup');
    var content = document.getElementById('idPopupContent');
    var closer = document.getElementById('idPopupCloser');
        
    // Create an overlay to anchor the popup to the map.
    var overlay = new Overlay(/** @type {olx.OverlayOptions} */({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));
    
    // Add a click handler to hide the popup.
    // return {boolean} Don't follow the href.
    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    // Make up a map
    const map2Djs = new Map ({
        interactions: interactionDefaults(),
        target: 'id2DMap',
                
        view: view,

        layers:[
            tiled_osm_layer,
            house_layer,
            // parcel_layer,
            // street_layer,
            // streetline_layer,
            // tree_layer,
            // group_layer,
        ],

        controls: controls,
          
        // layers: map2DLayers,

        overlays: [overlay],
    });

    map2Djs.addOverlay(overlay);

    map2Djs.addLayer(vectorLayer);        

    // Map events handlers
    $("#idHouseLayer").change(function () {
        if($("#idHouseLayer").is(":checked")) {
            house_layer.setVisible(true);
        } else
        {
            house_layer.setVisible(false);
        }
    });

    $("#idParcelLayer").change(function () {
        if($("#idParcelLayer").is(":checked")) {
            parcel_layer.setVisible(true);
        } else
        {
            parcel_layer.setVisible(false);
        }
    });

    $("#idStreetLayer").change(function () {
        if($("#idStreetLayer").is(":checked")) {
            street_layer.setVisible(true);
        } else
        {
            street_layer.setVisible(false);
        }
    });

    $("#idStreetlineLayer").change(function () {
        if($("#idStreetlineLayer").is(":checked")) {
            streetline_layer.setVisible(true);
        } else
        {
            streetline_layer.setVisible(false);
        }
    });

    $("#idTreeLayer").change(function () {
        if($("#idTreeLayer").is(":checked")) {
            tree_layer.setVisible(true);
        } else
        {
            tree_layer.setVisible(false);
        }
    });
    
    document.getElementById('idSelectAll').addEventListener('change', function () {
        let checkboxes = document.querySelectorAll('.checkboxes');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = this.checked;
            if(this.checked == true){
                house_layer.setVisible(true);
                parcel_layer.setVisible(true);
                street_layer.setVisible(true);
                streetline_layer.setVisible(true);
                tree_layer.setVisible(true);
            }
            else{
                house_layer.setVisible(false);
                parcel_layer.setVisible(false);
                street_layer.setVisible(false);
                streetline_layer.setVisible(false);
                tree_layer.setVisible(false);
            };
        }, this);
    });
      
    map2Djs.on('singleclick', function(evt) {
        console.log("map2Djs singleclick: " + evt.coordinate);
        // console.log(evt);
        // https://openlayers.org/en/latest/examples/getfeatureinfo-tile.html
        document.getElementById('idInfor').innerHTML = "Loading... please wait...";

        var view = map2Djs.getView();
        
        var viewResolution = view.getResolution();
        // console.log("viewResolution: " + viewResolution);
        var source = house_layer.getSource();
        // console.log("source: " + JSON.stringify(source));
        // console.log("view.getProjection(): " + JSON.stringify(view.getProjection()));
        console.log(evt.coordinate);
        var url = source.getFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            {
                //// return full htlm page
                // 'INFO_FORMAT': 'text/html',
                
                //// return in json format
                'INFO_FORMAT': 'application/json',
                'FEATURE_COUNT': 50,
            }
        );
        // console.log(url);
        // url = "http://localhost:9999/geoserver/WebGISDBdev/wms?QUERY_LAYERS=WebGISDBdev%3Ahouse&INFO_FORMAT=text%2Fhtml&REQUEST=GetFeatureInfo&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=WebGISDBdev%3Ahouse&TILED=true&I=50&J=50&WIDTH=101&HEIGHT=101&CRS=EPSG%3A3857&BBOX=11893070.16003723%2C1215162.9100195046%2C11893311.414407756%2C1215404.1643900296";
        
        // Make_Get_Request(url)
        // .then(data => {
        //     console.log('Response data: ' + data);
        // })
        // .catch(error => {
        //     console.log('Error: ' + error.message);
        // });

        Access_Geo_Attribute(url);
        overlay.setPosition(evt.coordinate);
    });

    // map2Djs.on('moveend', updatePermalink);





    // *************************************************************************************
    // *************************************************************************************
    // Initialize the Cesium Viewer in the HTML element with the `idCesiumContainer` ID.
    const viewer = new Cesium.Viewer('idCesiumContainer', {
        // terrain: Cesium.Terrain.fromWorldTerrain(),
        Geocoder: false,
        Animation: true,
        CreditsDisplay: false,
        Timeline: false,
        FullscreenButton: false,
        // globe: false,
    });
  
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    Cesium.createOsmBuildingsAsync().then(bld => viewer.scene.primitives.add(bld));

    var imageryLayers = viewer.imageryLayers;
    imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
            url: 'http://localhost:9999/geoserver/WebGISDBdev/wms',            
            layers: "WebGISDBdev:house",
            parameters: {
                transparent: true,
                format: "image/png",
            },
        })
    );

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    // center: fromLonLat([106.8379, 10.85]),   // Right Center For 2D Map
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(106.8379, 10.8439, 350),
        orientation: {
            heading: Cesium.Math.toRadians(1.0),
            pitch: Cesium.Math.toRadians(-29.0),
            roll: 0.0,
        }
    });

    
    addPhuocThienBuildingPromise().then(ds => {
        // console.log("ds: " + "\n" + JSON.stringify(ds));
        Cesium.Math.setRandomNumberSeed(0);
        
        Cesium.GeoJsonDataSource.crsNames["urn:ogc:def:crs:EPSG::3857"] = function(coordinates) {
            return Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], coordinates[2]);
        }
        Cesium.GeoJsonDataSource.load(ds).then(function() {
            console.log("GeoJsonDataSource - ds: " + "\n" + JSON.stringify(ds));
            viewer.dataSources.add(ds);

            // //Get the array of entities
            // var entities = ds.entities.values;

            // var colorHash = {};
            // for (var i = 0; i < entities.length; i++) {
            //     //For each entity, create a random color based on the state name.
            //     //Some states have multiple entities, so we store the color in a
            //     //hash so that we use the same color for the entire state.
            //     var entity = entities[i];
            //     var name = entity.name;
            //     var color = colorHash[name];
            //     if (!color) {
            //         color = Cesium.Color.fromRandom({
            //             alpha: 1.0,
            //         });
            //         colorHash[name] = color;
            //     }

            //     //Set the polygon material to our random color.
            //     entity.polygon.material = color;
            //     //Remove the outlines.
            //     entity.polygon.outline = false;

            //     //Extrude the polygon based on the state's population.  Each entity
            //     //stores the properties for the GeoJSON feature it was created from
            //     //Since the population is a huge number, we divide by 50.
            //     entity.polygon.extrudedHeight = entity.properties.chieucao * 5000;
            // }
        })
        .catch(function(error) {
            //Display any errors encountered while loading.
            console.log(error);
        });
        
    });


    // // https://community.cesium.com/t/geojsondatasource-message-unknown-crs-name-urndefepsg-4326/3503/2
    // Cesium.Math.setRandomNumberSeed(0);
    // var promise = Cesium.GeoJsonDataSource.load(
    //     "http://localhost:9999/geoserver/WebGISDBdev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WebGISDBdev%3Ahouse&maxFeatures=50&outputFormat=application%2Fjson&srsName=EPSG:3857"
    // );
    // promise.then(function(ds) {
    //     viewer.dataSources.add(ds);

    //     //Get the array of entities
    //     var entities = ds.entities.values;

    //     var colorHash = {};
    //     for (var i = 0; i < entities.length; i++) {
    //         //For each entity, create a random color based on the state name.
    //         //Some states have multiple entities, so we store the color in a
    //         //hash so that we use the same color for the entire state.
    //         var entity = entities[i];
    //         var name = entity.id;
    //         var color = colorHash[name];
    //         if (!color) {
    //             color = Cesium.Color.fromRandom({
    //                 alpha: 1.0,
    //             });
    //             colorHash[name] = color;
    //         }

    //         //Set the polygon material to our random color.
    //         entity.polygon.material = color;
    //         //Remove the outlines.
    //         entity.polygon.outline = false;

    //         //Extrude the polygon based on the state's population.  Each entity
    //         //stores the properties for the GeoJSON feature it was created from
    //         //Since the population is a huge number, we divide by 50.
    //         entity.polygon.extrudedHeight = entity.properties.chieucao * 5000;
    //     }
    // })
    // .catch(function(error) {
    //     //Display any errors encountered while loading.
    //     console.log(error);
    // });















    // // End Converting To 3D Map Using OLCS
    // // *************************************************************************************

    // // *************************************************************************************
    // // Start Converting To 3D Map Using OLCS

    // const mapOL3Djs = new OLCesium ({

    //     map: map2Djs,

    //     // sceneOptions: {
    //     //     mapProjection: new Cesium.WebMercatorProjection()
    //     // },

    //     target: 'id3DMap',
    // });
    
    // const mapOL3DjsScene = mapOL3Djs.getCesiumScene();
    // Cesium.createWorldTerrainAsync().then(tp => mapOL3DjsScene.terrainProvider = tp);
    // mapOL3DjsScene.shadowMap.enabled = true;
    // // Enable lighting the globe with the sun as a light source to have dynamic lighting conditions according to the position of the sun
    // mapOL3DjsScene.globe.enableLighting = true;
    // mapOL3DjsScene.globe.depthTestAgainstTerrain = true;
    // mapOL3Djs.setEnabled(true); // switch to 3D - show the globe
    
    // // mapOL3DjsScene.camera.flyTo({
    // //     destination: Cesium.Cartesian3.fromDegrees(6.54254, 46.50802, 1000.0)
    // // });
    // // End Of Converting To 3D Map

    // // window['ol3d'] = mapOL3Djs;
    // // window['scene'] = mapOL3DjsScene;
    // document.getElementById('idCesiumEnable').addEventListener('click', () => mapOL3Djs.setEnabled(!mapOL3Djs.getEnabled()));

    // // mapOL3Djs.enableAutoRenderLoop();


    // // End Converting To 3D Map Using OLCS
    // // *************************************************************************************
    
});

//code tim kiem doi tuong
if(window.location.hash !== '') {
    var hash = window.location.hash.replace('#idmap=', '');
    var parts = hash.split('/');

    if(parts.length === 4) {
        zoom = parseInt(parts[0], 10);
        center = [
            parseFloat(parts[1]),
            parseFloat(parts[2])
        ];
        rotation = parseFloat(parts[3]);
    }
}

var shouldUpdate = true;
var updatePermalink = function() {
    console.log("Call updatePermalink module");
    if(!shouldUpdate) {
        // do not update the url when the view was changed 
        shouldUpdate = true;
        return;
    }

    var center = view.getCenter();
    var hash = '#idmap=' +
        view.getZoom() + '/' +
        Math.round(center[0] * 100) / 100 + '/' +
        Math.round(center[1] * 100) / 100 + '/' +
        view.getRotation();
    var state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation()
    };

    window.history.pushState(state, 'map2Djs', hash);
};

// window.addEventListener('popstate', function(event) {
//     if(event.state === null) {
//         return;
//     }

//     map2Djs.getView().setCenter(event.state.center);
//     map2Djs.getView().setZoom(event.state.zoom);
//     map2Djs.getView().setRotation(event.state.rotation);
//     shouldUpdate = false;
// });

export function FindLocation(x, y, longitude, latitude){
    console.log("Move to location [x, y]: [" + x + ", " + y + "] or [long,lat]: [" + longitude + ", " + latitude + "] With Projection: " + JSON.stringify(projection));
    // console.log("FindLocation: [" + longitude + ", " + latitude + "]");

    // var scrCoord = new ol.proj.Projection('EPSG:3405');
    // var destCoord = new ol.proj.Projection('EPSG:3857');
    // var vi_tri_1 = ol.geom.Point[x, y];
    // console.log(vi_tri_1);

    // var vi_tri_2 = ol.proj.fromLonLat([x, y],
    //     new ol.proj.Projection({
    //         code: 'EPSG:3857',
    //         units: 'm',
    //         axisOrientation: 'enu',
    //     })
    // );
    // console.log(vi_tri_2);
    // var transformed_xy = ol.proj.transform(vi_tri_2, scrCoord, destCoord);
    // console.log("Transformed [x, y]: " + transformed_xy);    
    
    // This one is successful
    view.animate({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 20,
    })
    
    var viewResolution = view.getResolution();
    // console.log("viewResolution: " + viewResolution);
    var source = house_layer.getSource();
    // console.log("source: " + JSON.stringify(source));
    // console.log("view.getProjection(): " + JSON.stringify(view.getProjection()));
    // console.log("coordGeo: " + coordGeo);
    var url = source.getFeatureInfoUrl(
        [longitude, latitude], viewResolution, view.getProjection(),
        {
            'INFO_FORMAT': 'application/json',
            'FEATURE_COUNT': 50,
        }
    );

    Access_Geo_Attribute(url);

};

// window.FindLocation = FindLocation;