console.log('Key Demographics!');


/*------------------ load the map ---------------*/
		mapboxgl.accessToken = 'pk.eyJ1IjoicGxhY2VybWFwdGVhbSIsImEiOiJja3d6NTh4aGkwa2pwMndvNjRnZDR2Zmc0In0.8J8KJ5IxdOF3gTEs8HVM2Q';
      	const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/placermapteam/ckyabvi3x1guy14jua92q8hui',
        center: [-73.9566, 40.67929], // starting position [lng, lat]
  			zoom: 11.7
      });

    const TJ_location = new mapboxgl.Marker({ color: '#EF5771' })
    .setLngLat([-73.992866, 40.69])
    .addTo(map);


/*--------------------- variable -----------------------*/

//Household income
var NYHHI_url = 'mapbox://placermapteam.63jjqhnj'; //tileset id
var NYHHI_srcLayer = 'US_CBG_HHI2019_v2'; //source-layer
var NYHHI_src = 'NYHHI_src'; //source
//var NYHHI = 'NYHHI'; //id

//population density
var NYpop_url = 'mapbox://placermapteam.an6pi2en'; //tileset id
var NYpop_srcLayer = 'NY_CBG_pop2019-4y2jer'; //source-layer
var NYpop_src = 'NYpop_src'; //source
//var NYpop = 'NYpop'; //id

//Trade area 
var TTA_url = 'mapbox://placermapteam.95c0x9bq'; //tileset id
var TTA_srcLayer = 'Trader_Joes-130_Court_St_Broo-2e3h8j'; //source-layer
var TTA_src = 'TTA_src'; //source
//var NYpop = 'NYpop'; //id



/*-----------------hover state -----------------------------*/
let hoveredStateId = null;



/*--------------------- load layers ----------------*/

map.on('load', function(){

	map.addSource(NYHHI_src,{
		type: 'vector',
		url: NYHHI_url,
    generateID: true,
	});

  map.addSource(NYpop_src,{
    type: 'vector',
    url: NYpop_url
  });

  map.addSource(TTA_src,{
    type: 'vector',
    url: TTA_url
  });

// Create a popup, but don't add it to the map yet.
/*
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});
*/

/*------------------------ household income ----------------*/
	map.addLayer({
	'id': 'Median Household Income',
	'type':'fill',
	'source':NYHHI_src,
	'source-layer':NYHHI_srcLayer,
  	'paint':{
    'fill-color':[
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
	'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    1,
    0.7
    ],
	'fill-outline-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    '#675f5f',
    '#9c9696'
    ]
	},

	'layout': {
		visibility:'visible'
	}
});

  //hover function
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', 'Median Household Income', (e) => {
  if (e.features.length > 0) {
    console.log(e.features)
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: NYHHI_src, sourceLayer: NYHHI_srcLayer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: NYHHI_src, sourceLayer: NYHHI_srcLayer, id: hoveredStateId },
    { hover: true });
    };
console.log(hoveredStateId);
});
 

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'Population Density', (e) => {
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: NYHHI_src, sourceLayer: NYHHI_srcLayer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
  
});


/*------------------------ population density ----------------*/

  map.addLayer({
  'id': 'Population Density',
  'type':'fill',
  'source':NYpop_src,
  'source-layer':NYpop_srcLayer,
    'paint':{
    'fill-color':[
      "case",
      [
        "!=",
        ["get", "popDensity"],
        0
      ],
      [
        "interpolate",
        ["linear"],
        ["get", "popDensity"],
        3278,
        "#ffffb3",
        8539,
        "#fecc5c",
        23541,
        "#fd8d3c",
        56185,
        "#f03b20",
        499356,
        "#bd0026"
      ],
      "hsla(0, 0%, 0%, 0)"
    ],
  'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],1, 0.7],
  'fill-outline-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],'#675f5f','#bdb7b7']
  },
  'layout': {
    visibility:'none'
  }
});

  //hover function
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', 'Population Density', (e) => {
  if (e.features.length > 0) {
    console.log(e.features)
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: NYpop_src, sourceLayer: NYpop_srcLayer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: NYpop_src, sourceLayer: NYpop_srcLayer, id: hoveredStateId },
    { hover: true });
    };
console.log(hoveredStateId);
});
 

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'Population Density', (e) => {
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: NYpop_src, sourceLayer: NYpop_srcLayer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
  
});




/*------------------------ True Trade Area ----------------*/
  map.addLayer({
  'id': 'Trade Area',
  'type':'fill',
  'source':TTA_src,
  'source-layer':TTA_srcLayer,
    'paint':{
    'fill-color': '#f3c9f2',
  'fill-opacity': 0.15,
  'fill-outline-color': '#ffffff'
  },
  'layout': {
    visibility:'visible'
  }
});


  map.addLayer({
  'id': 'Trade Area Outline',
  'type':'line',
  'source':TTA_src,
  'source-layer':TTA_srcLayer,
    'paint':{
    'line-color': '#ffffff',
    'line-opacity': 0.6,
    'line-width': 2
  },
  'layout': {
    visibility:'visible'
  }
});




});


/*------------------- click to popup text boxes ----------------------*/
    map.on('click', function (e) {
    //Household Income feature layers
    var featrues_HHI = map.queryRenderedFeatures(e.point, {
      layers: ['Median Household Income'] // replace this with the name of the layer
    });

    if (featrues_HHI.length >0){
      var features = featrues_HHI[0];
      var description = 
      '<h3>Median Household Income</h3>'+
            `<h4>${Math.round(features.properties.HHI).toLocaleString("en-US", {style:"currency", currency:"USD",
              minimumFractionDigits: 0, maximumFractionDigits: 0,})}</h4>` 
            +'<p> </p>' 

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }

    //population density layer
     var featrues_pop = map.queryRenderedFeatures(e.point, {
      layers: ['Population Density'] // replace this with the name of the layer
    });

    if (featrues_pop.length >0){
      var features = featrues_pop[0];
      var description = 
      '<h3>Population Density</h3>'+ 
      `<h4>${Math.round(features.properties.popDensity).toLocaleString()} (per sq. mi)</h4>`
      +'<p> </p>' 

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }   

  });




/*---------------------- click to show demographic layers and their legends ---------*/
  const HHI_legend = document.getElementById('HHI-legend');
  const popD_legend = document.getElementById('popD-legend');
  popD_legend.style.display = 'none';
  document.getElementById('HHI').addEventListener('click',() => {

    map.setLayoutProperty('Median Household Income','visibility','visible');
    map.setLayoutProperty('Population Density','visibility','none');

    HHI_legend.style.display = 'block';
    popD_legend.style.display = 'none';

  }
);

  document.getElementById('PopD').addEventListener('click',() => {

    map.setLayoutProperty('Population Density','visibility','visible');
    map.setLayoutProperty('Median Household Income','visibility','none');

    HHI_legend.style.display = 'none';
    popD_legend.style.display = 'block';

  }
);





/*---------------------- controls features --------------------------*/


// Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl(),'top-right');


// Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter','Median Household Income', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

//Change it back to a pointer when it leaves.
  map.on('mouseleave','Median Household Income', function () {
    map.getCanvas().style.cursor = '';
});


// Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter','Population Density', function (e) {
    map.getCanvas().style.cursor = 'pointer';
    });
//Change it back to a pointer when it leaves.
  map.on('mouseleave','Population Density', function () {
    map.getCanvas().style.cursor = '';

});

