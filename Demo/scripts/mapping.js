//*--------------------- variable -----------------------*/

const mapLayers = [
  {
  id:'hosehold-income',
  name:'Median Household Income',
  url:'mapbox://placermapteam.63jjqhnj',
  layer:'US_CBG_HHI2019_v2',
  src: 'householdIncome_src',
  shape:'fill',
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
  shape:'fill',
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
  },
  //need edits here 
  {
  id:'Trade-Area',
  name:'Trade Area',
  url:'mapbox://placermapteam.95c0x9bq',
  layer:'Trader_Joes-130_Court_St_Broo-2e3h8j',
  src: 'TTA_src',
  shape:'fill',
  fillcolor: "#f3c9f2",
  fillOpacity: 0.15,
  fillOutlineColor: "#ffffff",
  visibility:'visible'
  },
  {
  id:'Trade-Area-outline',
  name:'Trade Area Outline',
  url:'mapbox://placermapteam.95c0x9bq',
  layer:'Trader_Joes-130_Court_St_Broo-2e3h8j',
  src: 'TTA_outline_src',
  shape:'line',
  lineColor: "#ffffff",
  lineOpacity: 0.6,
  lineWidth: 3,
  visibility:'visible'
  }
]



/* trade area should also coming from session storage 
const tradeArea = {
  //data from sessionStorage
}
*/

//mapbox 
const ACCESS_TOKEN = 'pk.eyJ1IjoicGxhY2VybWFwdGVhbSIsImEiOiJja3d6NTh4aGkwa2pwMndvNjRnZDR2Zmc0In0.8J8KJ5IxdOF3gTEs8HVM2Q';
const defaultStyles = "mapbox://styles/placermapteam/ckyabvi3x1guy14jua92q8hui";

const center = [-73.992866, 40.69];

/* not sure if I am writing correctly here
const center = redirectFromSession ({
  if ("demographic_data" in sessionStorage){
    var items = JSON.parse(sessionStorage.getItem("demographic_data");
  }
  return items.position;
}); 
*/

const mapOptions = {
  container: 'map',
  style: defaultStyles,
  center: center,
  zoom: 11.7
};


const getIncome = (number, isLocale = false) => {
     if(isLocale) {
     return Math.round(number).toLocaleString("en-US", {style:"currency", currency:"USD",
     minimumFractionDigits: 0, maximumFractionDigits: 0,})
   } else {
     return Math.round(number).toLocaleString()
   }
   }




/*------------------ load the map ---------------*/
mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map(mapOptions);

const createMarker = new mapboxgl.Marker({color: '#EF5771'})
  .setLngLat(center)
  .addTo(map);


/*--------------------- load layers ----------------*/

map.on("load", function () {
  

  mapLayers.map((type) => {
    return map.addSource(type.src, {
      type:'vector',
      url:type.url
    });
  })


  mapLayers.map((type)=>{
    if (type.shape === 'fill'){
        return map.addLayer({
        'id': type.name,
        'type': type.shape,
        'source': type.src,
        'source-layer': type.layer,
        'paint': {
          'fill-color':type.fillcolor,
          'fill-opacity':type.fillOpacity,
          'fill-outline-color':type.fillOutlineColor
        },
        'layout':{
          'visibility':type.visibility
        }
      })
    }

    if (type.shape === 'line') {
      return map.addLayer({
        'id': type.name,
        'type': type.shape,
        'source': type.src,
        'source-layer': type.layer,
        'paint': {
          'line-color':type.lineColor,
          'line-opacity':type.lineOpacity,
          'line-width':type.lineWidth
        },
        'layout':{
          'visibility':type.visibility
        }
      })
    }

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
     //Household Income feature layers
  var featrues_HHI = map.queryRenderedFeatures(e.point, {
    layers: [mapLayers[0].name] // replace this with the name of the layer
  });

  if (featrues_HHI) {
    var features = featrues_HHI[0];
    var description =
      `<h3>${mapLayers[0].name}</h3>` + // // replace this with the name of the layer {`${houseHoldIncome.name}`}
      `<h4>${getIncome(features.properties.HHI, true)}</h4>` +
      "<p> </p>";

    var popup = new mapboxgl.Popup({ offset: [0, -15], keepInView: true })
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);

    return;
  }

  //population density layer
  var featrues_pop = map.queryRenderedFeatures(e.point, {
    layers: [mapLayers[1].name] // replace this with the name of the layer
  });

  if (featrues_pop.length > 0) {
    var features = featrues_pop[0];
    var description =
      `<h3>${mapLayers[1].name}</h3>` +
      `<h4>${Math.round(
        features.properties.popDensity
      ).toLocaleString()} (per sq. mi)</h4>` +
      "<p> </p>";

    var popup = new mapboxgl.Popup({ offset: [0, -15], keepInView: true })
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);

    return;
  }
});

/*---------------------- click to show demographic layers and their legends ---------*/
const HHI_legend = document.getElementById("HHI-legend");
const popD_legend = document.getElementById("popD-legend");
popD_legend.style.display = "none";
document.getElementById("HHI").addEventListener("click", () => {
  map.setLayoutProperty("Median Household Income", "visibility", "visible");
  map.setLayoutProperty("Population Density", "visibility", "none");

  HHI_legend.style.display = "block";
  popD_legend.style.display = "none";
});

document.getElementById("PopD").addEventListener("click", () => {
  map.setLayoutProperty("Population Density", "visibility", "visible");
  map.setLayoutProperty("Median Household Income", "visibility", "none");

  HHI_legend.style.display = "none";
  popD_legend.style.display = "block";
});

/*---------------------- controls features --------------------------*/

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), "top-right");


