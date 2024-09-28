import OLCesium from 'olcs/OLCesium.js';
import {OLCS_ION_TOKEN} from './cesiumiontoken.js';

import olStyleStroke from 'ol/style/Stroke.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import olView from 'ol/View.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olSourceVector from 'ol/source/Vector.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olLayerTile from 'ol/layer/Tile.js';
import olMap from 'ol/Map.js';

import {
    Projection, 
    fromLonLat
} from 'ol/proj.js';

const raster = new olLayerTile({
  source: new olSourceOSM(),
});

const vector = new olLayerVector({
  style(feature, resolution) {
    const fillColor = feature.get('fillColor') || 'white';
    const strokeColor = feature.get('strokeColor') || 'grey';
    return new olStyleStyle({
      fill: new olStyleFill({
        color: fillColor,
      }),
      stroke: new olStyleStroke({
        color: strokeColor,
        width: 1,
      }),
    });
  },
  source: new olSourceVector({
    format: new olFormatGeoJSON(),
    url: '/js/data/geojson/buildings.geojson',
  }),
});

var projection = new Projection({
    // code: 'EPSG:3405',
    code: 'EPSG:3857',
    units: 'm',
    axisOrientation: 'enu',
    // global: false,
});

const map = new olMap({
  layers: [raster, vector],
  target: 'id2DMap',
  view: new olView({
    projection: projection,
    center: fromLonLat([106.8379, 10.85]),
    zoom: 16,
  }),
});
// Enable the property 'olcs_shadows' for the entire set of features
// Alternatively, you can enable 'olcs_shadows' for each feature individually
vector.set('olcs_shadows', true);


const ol3d = new OLCesium({map, target: 'id3DMap'});
ol3d.setEnabled(true);

// Be aware that enabling the following properties can impact performance
// Enable shadow map to allow Cesium to cast scene's shadows
const scene = ol3d.getCesiumScene();
scene.shadowMap.enabled = true;
// Enable lighting the globe with the sun as a light source to have dynamic lighting conditions according to the position of the sun
scene.globe.enableLighting = true;


const vectorSource = vector.getSource();
vectorSource.once('featuresloadend', () => {
  if (vectorSource.getState() === 'ready') {
    map.getView().fit(vector.getSource().getExtent());
  }
});


const selectionStyle = new olStyleStyle({
  fill: new olStyleFill({
    color: [0, 255, 0, 1],
  }),
  stroke: new olStyleStroke({
    color: [0, 153, 255, 1],
    width: 3,
  }),
});

let selectedFeature;
map.on('click', (e) => {
  if (selectedFeature) {
    selectedFeature.setStyle(null);
  }
  selectedFeature = map.forEachFeatureAtPixel(
      e.pixel,
      (feature, layer) => feature
  );
  if (selectedFeature) {
    selectedFeature.setStyle(selectionStyle);
  }
});

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
}

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