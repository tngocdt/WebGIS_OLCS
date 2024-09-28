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

async function add_Customized_Building_Promise(){    
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

    
    add_Customized_Building_Promise().then(geojsonds => {
        // console.log("ds: " + "\n" + JSON.stringify(ds));
        Cesium.Math.setRandomNumberSeed(0);
        
        // Will give the error of "Unknown crs name: urn:ogc:def:crs:EPSG::3857" if there is no following function
        // Convert The [X, Y] in "EPSG::3857" coordinate in meters >> WGS84 [LONGITUDE, LATITUDE [, ALTITUDE]] >> Cesium.Cartesian3.fromDegrees([LONGITUDE, LATITUDE [, ALTITUDE]])
        // https://github.com/CesiumGS/cesium/pull/9845
        Cesium.GeoJsonDataSource.crsNames["urn:ogc:def:crs:EPSG::3857"] = function(coordinates) {
            let x = coordinates[0]; // Example X coordinate in meters
            let y =  coordinates[1];  // Example Y coordinate in meters

            // Convert EPSG:3857 to WGS84
            let lon = x / 20037508.34 * 180;
            let lat = y / 20037508.34 * 180;
            lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);

            // Now use Cesium.Cartesian3.fromDegrees
            let cartesian = Cesium.Cartesian3.fromDegrees(lon, lat);
            
            // Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude);
            // return Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], coordinates[2]);
            return cartesian;
        }


        // https://github.com/CesiumGS/cesium/issues/12216
        const dataSource = Cesium.GeoJsonDataSource.load(geojsonds);
        // console.log("GeoJsonDataSource - geojsonds: " + "\n" + JSON.stringify(geojsonds));
        // console.log(dataSource);
        dataSource.then((render) => {
            console.log("render");
            console.log(render);
            // https://cesium.com/learn/ion-sdk/ref-doc/Entity.html#.ConstructorOptions
            
            const last_entity = render.entities.values[render.entities.values.length - 1];
            console.log("last_entity");
            console.log(last_entity);
            
            // console.log(last_entity.entityCollection);
            // console.log(last_entity.definitionChanged);
            // console.log(last_entity.description);
            // console.log(last_entity.id);
            // console.log(last_entity.isShowing);

            // console.log("last_entity.polygon");
            // console.log(last_entity.polygon);
            // console.log(last_entity.polygon.arcType);
            // console.log(last_entity.polygon.material);
            // console.log(last_entity.polygon.outline);
            // console.log(last_entity.polygon.extrudedHeight);        // undefine

            // console.log("last_entity.properties");
            // console.log(last_entity.properties);
            // console.log(last_entity.properties.chieucao);

            // console.log(last_entity.propertyNames);
            // console.log(last_entity.show);
            

            // https://cesium.com/learn/ion-sdk/ref-doc/PolygonGraphics.html#.ConstructorOptions
            console.log("BEFORE last_entity.extrudedHeight");
            // console.log(last_entity.polygon);
            // // console.log(last_entity.properties);
            // console.log(last_entity.polygon.arcType);
            // console.log(last_entity.polygon.height);
            // console.log(last_entity.polygon.heightReference);
            // console.log(last_entity.polygon.extrudedHeight);
            // console.log(last_entity.polygon.extrudedHeightReference);

            last_entity.polygon.height = last_entity.properties.chieucao;
            last_entity.polygon.extrudedHeight = last_entity.properties.chieucao;
            console.log("AFTER last_entity.polygon");
            console.log(last_entity.polygon);
            // console.log(last_entity.polygon.height);
            // console.log(last_entity.polygon.heightReference);
            // console.log(last_entity.polygon.extrudedHeight);
            // console.log(last_entity.polygon.extrudedHeightReference);

            var colorHash = {};
            for (let i = 0; i < render.entities.values.length; i++) {
                const entity = render.entities.values[i];

                //For each entity, create a random color based on the state name.
                //Some states have multiple entities, so we store the color in a
                //hash so that we use the same color for the entire state.
                var name = entity.id;
                var color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0,
                    });
                    colorHash[name] = color;
                }

                if (entity.polygon) {
                    //Set the polygon material to our random color.
                    entity.polygon.material = color;
                    //Remove the outlines.
                    entity.polygon.outline = false;

                    entity.polygon.arcType = Cesium.ArcType.GEODESIC;

                    // Extrude the polygon based on the state's population.  Each entity
                    // Stores the properties for the GeoJSON feature it was created from
                    // If the value is a huge number, we divide by a specific value.
                    // entity.polygon.height = entity.properties.chieucao;
                    entity.polygon.extrudedHeight = entity.properties.chieucao;

                    entity.polygon.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
                }
                else{
                    console.log("There is no polygon attribute at entity id: #" + entity.id);
                }
            };
              
            viewer.dataSources.add(dataSource);
        });        
    });

    // Exmaple For 3D Objects;
    // const longitude = 106.837915989890521;
    // const latitude = 10.85546589994886;
    // const delta = 0.001;
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         const west = longitude + delta * i;
    //         const north = latitude + delta * j + delta;

    //         const type = Math.floor(Math.random() * 3);
    //         if (type === 0) {
    //             viewer.entities.add({
    //                 position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
    //                 box: {
    //                     dimensions: new Cesium.Cartesian3(40.0, 30.0, 50.0),
    //                     material: Cesium.Color.fromRandom({ alpha: 1.0 }),
    //                     // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //                 },
    //             });
    //         } else if (type === 1) {
    //             viewer.entities.add({
    //                 position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
    //                 cylinder: {
    //                     length: 50.0,
    //                     topRadius: 20.0,
    //                     bottomRadius: 20.0,
    //                     material: Cesium.Color.fromRandom({ alpha: 1.0 }),
    //                     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //                 },
    //             });
    //         } else {
    //             viewer.entities.add({
    //                 position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
    //                 ellipsoid: {
    //                     radii: new Cesium.Cartesian3(20.0, 15.0, 25.0),
    //                     material: Cesium.Color.fromRandom({ alpha: 1.0 }),
    //                     // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //                 },
    //             });
    //         }
    //     }
    // }


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
    
    // Update the HomeButton view model
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(106.8339, 10.8459, 350),
            
            orientation: {
                heading: Cesium.Math.toRadians(45),
                pitch: Cesium.Math.toRadians(-35.264),
                roll: 0.0
            },
            complete: function () {
                setTimeout(function () {                    
                    viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(106.8319, 10.8439, 590),
                        orientation: {
                            heading: Cesium.Math.toRadians(45),
                            pitch: Cesium.Math.toRadians(-35.264),
                            roll: 0.0
                        },
                        complete: function () {
                            setTimeout(function () {                    
                                viewer.camera.flyTo({
                                    destination: Cesium.Cartesian3.fromDegrees(106.829, 10.841, 950),
                                    orientation: {
                                        heading: Cesium.Math.toRadians(45),
                                        pitch: Cesium.Math.toRadians(-35.264),
                                        roll: 0.0
                                    },
                                    complete: function () {
                                        setTimeout(function () {                    
                                            viewer.camera.flyTo({
                                                destination: Cesium.Cartesian3.fromDegrees(106.8479, 10.8399, 1000),
                                                orientation: {
                                                    heading: Cesium.Math.toRadians(-45),
                                                    pitch: Cesium.Math.toRadians(-35.264),
                                                    roll: 0
                                                },
                                                duration: 9,
                                            });
                                        }, 500);
                                    },
                                    duration: 7,
                                });
                            }, 300);
                        },
                        duration: 5,
                    });
                }, 100);
            },
            duration: 3,
        });

        // // Set the camera to look at a specific point or object
        // // for keeping the camera focused on a moving object or a specific location in the scene.
        // const center = Cesium.Cartesian3.fromDegrees(106.8399, 10.84799);
        // const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

        // // View in east-north-up frame
        // const camera = viewer.camera;
        // camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
        // camera.lookAtTransform(
        //     transform,
        //     new Cesium.Cartesian3(190.0, -190.0, 190.0)
        // );
        
        commandInfo.cancel = true; // Prevent default home action
    });
    
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