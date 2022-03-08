//*--------------------- variable -----------------------*/
/*
const url = "https://peterchan032.github.io/placerxtra.github.io/Data/Untitled.txt";

function getLatLng(){
   let value= JSON.parse($.getJSON({ 
      url: url, 
      async: false
   }).responseText);

   let lat = value.position.lat;
   let lng = value.position.lng;
   return [lng,lat];
}

function getTTA(){
  let value = JSON.parse($.getJSON({
      url:url,
      async: false}).responseText);
  let geometry = value.geometry;

  return geometry;
}
*/

/* put it in html in front of 

const getIncome = (number, isLocale = false) => {
     if(isLocale) {
     return Math.round(number).toLocaleString("en-US", {style:"currency", currency:"USD",
     minimumFractionDigits: 0, maximumFractionDigits: 0,})
   } else {
     return Math.round(number).toLocaleString()
   }
};

const getFromSession = () => {
  if (sessionStorage.getItem('demographic_data')){
    let items = JSON.parse(sessionStorage.getItem('demographic_data'));
    console.log(items);
    return items;
  }
};

*/


const center = [getFromSession()?.position.lng, getFromSession()?.position.lat];

const tradeArea = getFromSession()?.geometry;

const trafficVol = document.getElementById('trafficVol').innerHTML = getFromSession()?.traffic_volume ?? "NA";


const date = document.getElementById('date').innerHTML = getFromSession()?.date ?? "test";

const miles = document.getElementById('miles').innerHTML = getFromSession()?.max_distance ?? "NA";

const address = document.getElementById('address').innerHTML = getFromSession()?.adderss ?? "NA";

const propertyName = document.getElementById('propertyName').innerHTML = getFromSession()?.property_name ?? "NA";
const propertyNameFnote = document.getElementById('propertyName-fn').innerHTML = getFromSession()?.property_name ?? "NA";


//layers from Mapbox studio
const mapLayers = [
  {
  id:'hosehold-income',
  name:'Median Household Income',
  url:'mapbox://placermapteam.63jjqhnj',
  layer:'US_CBG_HHI2019_v2',
  src: 'householdIncome_src',
  type:'fill',
  fillcolor: [
        "case",
        ["has", "HHI"],
        [
          "step",
          ["get", "HHI"],
          "#b2d8d8",
          51563,
          "#b2d8d8",
          73633,
          "#66b2b2",
          96322,
          "#007f80",
          128676,
          "#006666",
          250001,
          "#004c4c"
        ],
        "hsla(0, 0%, 0%, 0)"
      ],
  fillOpacity: [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.7
      ],
  fillOutlineColor: [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#675f5f",
        "#222020"
      ],
  visibility: 'visible'
  },
  {
  id:'population-density',
  name:'Population Density',
  url:'mapbox://placermapteam.aq4a50kh',
  layer:'US_CBG_pop2019',
  src: 'population_src',
  type:'fill',
  fillcolor: 
  [
  "case",
  ["!=", ["get", "popDensity"], 0],
  [
    "step",
    ["get", "popDensity"],
    "#f0f4ff",
    3278,
    "#f0f4ff",
    8539,
    "#bcd6e7",
    23541,
    "#6bafd6",
    56185,
    "#3184bf",
    499356,
    "#08529b"
  ],
  "hsla(0, 0%, 0%, 0)"
  ],
   fillOpacity: [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.7
      ],
  fillOutlineColor: [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#675f5f",
        "#222020"
      ],
  visibility: 'none'
  }
];

const tradeAreaGroups = (tradeArea ?? []).map((item,index) => {
  return [{
    id:`TradeArea-${index}`,
    type:'fill',
    src:`TradeArea_${index}`,
    fillcolor:item.color,
    fillOpacity:0.5,
    visibility:'visible',
    data:{
    "type": "Feature",
      "properties": {"trafficVol": "40%"},
      "geometry": {
          "type": "MultiPolygon",
          "coordinates": item.geoJson.coordinates
      }
    }
  },
  {
    id:`Trade-Area-outline-${index}`,
    src: `Trade-Area-outline-${index}`,
    type:'line',
    lineColor: item.color,
    lineOpacity: 0.6,
    lineWidth: 3,
    visibility:'visible',
    data:{
    "type": "Feature",
      "properties": {"trafficVol": "40%"},
      "geometry": {
          "type": "MultiPolygon",
          "coordinates": item.geoJson.coordinates
      }
    }
}]

});


console.log(tradeAreaGroups);

//current state
let currentLayer = mapLayers[0].name;


//mapbox 
const ACCESS_TOKEN = 'pk.eyJ1IjoicGxhY2VybWFwdGVhbSIsImEiOiJja3d6NTh4aGkwa2pwMndvNjRnZDR2Zmc0In0.8J8KJ5IxdOF3gTEs8HVM2Q';
const defaultStyles = "mapbox://styles/placermapteam/ckyabvi3x1guy14jua92q8hui";



const mapOptions = {
  container: 'map',
  style: defaultStyles,
  center: center,
  zoom: 11.7
};






/*------------------ load the map ---------------*/
mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map(mapOptions);

const createMarker = new mapboxgl.Marker({color: '#EF5771'})
  .setLngLat(center)
  .addTo(map);


/*--------------------- load layers ----------------*/

map.on("load", function () {
  

mapLayers.map((layer) => {
  return map.addSource(layer.src, {
      'type':'vector',
      'url':layer.url
  })
});

mapLayers.map((layer)=>{
    if (layer.type === 'fill'){
        return map.addLayer({
        'id': layer.name,
        'type': layer.type,
        'source': layer.src,
        'source-layer': layer.layer,
        'paint': {
          'fill-color':layer.fillcolor,
          'fill-opacity':layer.fillOpacity,
          'fill-outline-color':layer.fillOutlineColor
        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    }

    if (layer.type === 'line') {
      return map.addLayer({
        'id': layer.name,
        'type': layer.type,
        'source': layer.src,
        'source-layer': layer.layer,
        'paint': {
          'line-color':layer.lineColor,
          'line-opacity':layer.lineOpacity,
          'line-width':layer.lineWidth
        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    }

  });

tradeAreaGroups.map((layer)=>{
    return map.addSource(layer.src,{
      'type':'geojson',
      'data':layer.data
    })
});


tradeAreaGroups.map((group)=>{
  return group.map((layer)=>{
    if (layer.type === 'fill'){
      return map.addLayer({
        'id':layer.id,
        'type':layer.type,
        'source':layer.src,
        'paint': {
          'fill-color':layer.fillcolor,
          'fill-opacity':layer.fillOpacity
        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    };

    if (layer.type === 'line'){
      return map.addLayer({
        'id': layer.id,
        'type': layer.type,
        'source': layer.src,
        'paint': {
          'line-color':layer.lineColor,
          'line-opacity':layer.lineOpacity,
          'line-width':layer.lineWidth
        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    }
  })
    
});



});


/*-----------------hover state -----------------------------*/
let hoveredStateId = null;

map.on('mousemove', mapLayers[0].name, (e) => {
    map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: mapLayers[0].src, sourceLayer: mapLayers[0].layer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: mapLayers[0].src, sourceLayer: mapLayers[0].layer, id: hoveredStateId },
    { hover: true });
    }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', mapLayers[0].name, (e) => {
    map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: mapLayers[0].src, sourceLayer: mapLayers[0].layer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
});

  
map.on('mousemove', mapLayers[1].name, (e) => {
    map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: mapLayers[1].src, sourceLayer: mapLayers[1].layer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: mapLayers[1].src, sourceLayer: mapLayers[1].layer, id: hoveredStateId },
    { hover: true });
    }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', mapLayers[1].name, (e) => {
    map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: mapLayers[1].src, sourceLayer: mapLayers[1].layer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
});




/*------------------- click to popup text boxes ----------------------*/
map.on("click", function (e) {

  let listsOfFeatures = map.queryRenderedFeatures(e.point, {
    layers: [currentLayer] // replace this with the name of the layer
  });

  if (listsOfFeatures) {
    var description =
      `<h3>${currentLayer}</h3>` + // // replace this with the name of the layer {`${houseHoldIncome.name}`}
     `<h4>${currentLayer === mapLayers[0].name ? getIncome(listsOfFeatures[0].properties.HHI, true) : 
        currentLayer === mapLayers[1].name ? 
        Math.round(
        listsOfFeatures[0].properties.popDensity
      ).toLocaleString() : null}</h4>` +
      "<p> </p>";

    let popup = new mapboxgl.Popup({ offset: [0, -15], keepInView: true })
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  };
});

/*---------------------- click to show demographic layers and their legends ---------*/
const HHI_legend = document.getElementById("HHI-legend");
const popD_legend = document.getElementById("popD-legend");

popD_legend.style.display = "none";
document.getElementById("HHI").addEventListener("click", () => {
  map.setLayoutProperty(mapLayers[0].name, "visibility", "visible");
  currentLayer = mapLayers[0].name;
  map.setLayoutProperty(mapLayers[1].name, "visibility", "none");

  HHI_legend.style.display = "block";
  popD_legend.style.display = "none";
});

document.getElementById("PopD").addEventListener("click", () => {
  map.setLayoutProperty(mapLayers[1].name, "visibility", "visible");
  map.setLayoutProperty(mapLayers[0].name, "visibility", "none");
  currentLayer = mapLayers[1].name;
  HHI_legend.style.display = "none";
  popD_legend.style.display = "block";
});

/*---------------------- controls features --------------------------*/

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), "top-right");


