console.log('Top Zip Codes!');
/*------------------- function ---------------------*/
const getIncome = (number, isLocale = false) => {
     if(isLocale) {
     return Math.round(number).toLocaleString("en-US", {style:"currency", currency:"USD",
     minimumFractionDigits: 0, maximumFractionDigits: 0,})
   } else {
     return Math.round(number).toLocaleString()
   }
};
/*--------------------- variable -----------------------*/

const mapLayersSource = [
{
    url:'mapbox://placermapteam.5q3cryqb',
    layer:'HHI_zip',
    src:'HHI_src'
},
{
    url:'mapbox://placermapteam.97j0g4nb',
    layer:'Raleys_topzipcode_HHI-05vphu',
    src:'topZipCode_src'
},
{
    url:'mapbox://placermapteam.6aadanh1',
    layer:'Raleys-4690_Freeport_Blvd-41dgdt',
    src:'TTA_src'
},
{
    url:'mapbox://placermapteam.4p06rr9s',
    src:'sRad_src',
    layer:'Ring_1mi-69i3nk'
},
{
    url:'mapbox://placermapteam.0hudy1xw',
    src:'mRad_src',
    layer:'Ring_3mi-bgdctc'
},
{
    url:'mapbox://placermapteam.3y3rsqql',
    src:'lRad_src',
    layer:'Rings_5mi-7c5e9r'
}
];

const mapLayers = [
{
    id:'household_income',
    dataSource:mapLayersSource[0],
    type:'fill',
    fillColor:[
      "step",
      ["get", "HHI"],
      "#ACCAC9",
      42051,
      "#72AEB6",
      56107,
      "#4692B1",
      72812,
      "#2A70A1",
      97079,
      "#094973",
      250000,
      "#003150"  
    ],
    fillOpacity:[
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    0.8,
    0.6 
    ],
    fillOutlineColor:'#b0abab',
    visibility: 'visible'
},
{
    id:'household_income_topVisits', //demo layer info when top visits layer is on
    dataSource:mapLayersSource[0],
    type:'fill',
    fillColor: '#e2e2e4',
    fillOpacity:0.20,
    fillOutlineColor:'#b0abab',
    visibility: 'none'
},
{
    id:'household-income-outline',
    dataSource:mapLayersSource[0],
    type:'line',
    lineWidth: 0.75,
    lineOpacity: 0.9,
    lineColor: '#1d1d20',
    visibility:'visible'
},
{
    id:'topZipCode',
    dataSource:mapLayersSource[1],
    type:'fill',
    fillColor: [
          "step",
          ["get", "p_visits"],
              "#EED1E2",
              0.24,
              "#EED1E2",
              0.46,
              "#CBA9ED",
              1.04,
              "#A283EA",
              5.73,
              "#7861D9",
              15.95,
              "#4D43BB"
    ],
    fillOpacity:[
    'case',
    ['boolean', ['feature-state', 'hover'], false],0.8, 0.6
    ],
    fillOutlineColor:'#333333',
    visibility:'none'
},
{
    id:'topZipCode_outline',
    dataSource:mapLayersSource[1],
    type:'line',
    lineColor:'#333333',
    lineWidth:
    ["interpolate",
      ["linear"],
      ["zoom"],
      7,
      0,
      8,
      2,
      10,
      3,
      22,
      3
    ],
    lineOpacity:0.75,
    visibility:'visible'
},
{
    id:'visits_transparent',
    dataSource:mapLayersSource[1],
    type:'fill',
    fillColor: "hsla(0, 0%, 0%, 0)",
    fillOpacity: [
    'case',
    ['boolean', ['feature-state', 'hover'], false],0.8, 0.6
    ],
    fillOutlineColor: [
    'case',
    ['boolean', ['feature-state', 'hover'], false],'#bdb7b7','#333333'],
    visibility:'visible'
},

{
    id:'TTA',
    dataSource:mapLayersSource[2],
    type:'fill',
    fillColor: '#FFBE5E',
    fillOutlineColor:'#FFBE5E',
    fillOpacity: 0.15,
    visibility:'visible'

},
{
    id:'TTA-outline',
    dataSource:mapLayersSource[2],
    type:'line',
    lineColor:"#FFBE5E",
    lineWidth:["interpolate",
      ["linear"],
      ["zoom"],
      7,
      0,
      8,
      0,
      9,
      1,
      10,
      2.5,
      22,
      3
    ],
    lineOpacity:0.6,
    visibility:'visible'
}
];

const mileRadiusLayers = [
{
    id:'sRadius',
    dataSource:mapLayersSource[3],
    type:'line',
    lineWidth: ["interpolate",
      ["linear"],
      ["zoom"],
      7,
      0,
      8,
      0,
      9,
      1,
      10,
      2.5,
      22,
      3
    ],
    lineColor: "#f2eeef",
    lineDashArray: [1,1],
    visibility:'visible'
},
{
    id:'sRadius_text',
    dataSource:mapLayersSource[3],
    type:'symbol',
    textColor:'#ffffff',
    textHaloWidth: 1,
    textHaloColor: "#333333",
    textSize: 16,
    textField: ["to-string", ["get", "name"]],
    textOffset: [0, 0],
    textAnchor:'center',
    symbolPlacement:'line-center',
    visibility:'visible'
},
{
    id:'mRadius',
    dataSource:mapLayersSource[4],
    type:'line',
    lineWidth: ["interpolate",
      ["linear"],
      ["zoom"],
      7,
      0,
      8,
      0,
      9,
      1,
      10,
      2.5,
      22,
      3
    ],
    lineColor: "#f2eeef",
    lineDashArray: [1,1],
    visibility:'visible'
},
{
    id:'mRadius_text',
    dataSource:mapLayersSource[4],
    type:'symbol',
    textColor:'#ffffff',
    textHaloWidth: 1,
    textHaloColor: "#333333",
    textSize: [
      "step",
      ["zoom"],
      0,
      9.8,
      16,
      22,
      16
    ],
    textField: ["to-string", ["get", "name"]],
    textOffset: [0, 0],
    textAnchor:'center',
    symbolPlacement:'line-center',
    visibility:'visible'
},
{
    id:'lRadius',
    dataSource:mapLayersSource[5],
    type:'line',
    lineWidth: ["interpolate",
      ["linear"],
      ["zoom"],
      7,
      0,
      8,
      0,
      9,
      1,
      10,
      2.5,
      22,
      3
    ],
    lineColor: "#f2eeef",
    lineDashArray: [1,1],
    visibility:'visible'
},
{
    id:'lRadius_text',
    dataSource:mapLayersSource[5],
    type:'symbol',
    textColor:'#ffffff',
    textHaloWidth: 1,
    textHaloColor: "#333333",
    textSize: [
      "step",
      ["zoom"],
      0,
      9.8,
      16,
      22,
      16
    ],
    textField: ["to-string", ["get", "name"]],
    textOffset: [0, 0],
    textAnchor:'center',
    symbolPlacement:'line-center',
    visibility:'visible'
},
]


const center = [-121.4974947, 38.532661]


//current state
//let currentLayer = mapLayers[2].id;



//mapbox 
const ACCESS_TOKEN = 'pk.eyJ1IjoicGxhY2VybWFwdGVhbSIsImEiOiJja3d6NTh4aGkwa2pwMndvNjRnZDR2Zmc0In0.8J8KJ5IxdOF3gTEs8HVM2Q';
const defaultStyles = "mapbox://styles/placermapteam/ckyabvi3x1guy14jua92q8hui";



const mapOptions = {
  container: 'map',
  style: defaultStyles,
  center: center,
  zoom: 10
};



/*------------------ load the map ---------------*/

mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map(mapOptions);

const createMarker = new mapboxgl.Marker({color: '#EF5771'})
  .setLngLat(center)
  .addTo(map);



/*-----------------hover state -----------------------------*/
var hoveredStateId = null;


/*--------------------- load layers ----------------*/

map.on('load', function(){

 mapLayersSource.map((layer) => {
    console.log(layer.src);
    return map.addSource(layer.src, {
      'type':'vector',
      'url':layer.url
  })
});


 mapLayers.map((layer)=>{
    if (layer.type === 'fill'){
        return map.addLayer({
        'id': layer.id,
        'source': layer.dataSource.src,
        'source-layer': layer.dataSource.layer,
        'type': layer.type,
        'paint': {
          'fill-color':layer.fillColor,
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
        'id': layer.id,
        'source': layer.dataSource.src,
        'source-layer': layer.dataSource.layer,
        'type': layer.type,
        'paint': {
          'line-color':layer.lineColor,
          'line-opacity':layer.lineOpacity,
          'line-width':layer.lineWidth,

        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    }

  });

 mileRadiusLayers.map((layer)=>{
    if (layer.type === 'line'){
        return map.addLayer({
        'id': layer.id,
        'type': layer.type,
        'source': layer.dataSource.src,
        'source-layer': layer.dataSource.layer,
        'paint': {
          'line-color':layer.lineColor,
          'line-width':layer.lineWidth,
          'line-dasharray': layer.lineDashArray,
        },
        'layout':{
          'visibility':layer.visibility
        }
      })
    }

    if (layer.type === 'symbol') {
      return map.addLayer({
        'id': layer.id,
        'type': layer.type,
        'source': layer.dataSource.src,
        'source-layer': layer.dataSource.layer,
        'paint':{
                'text-color':layer.textColor,
                'text-halo-width': layer.textHaloWidth,
                'text-halo-color': layer.textHaloColor,
            },
        'layout': {
            'visibility': layer.visibility,
            'text-size': layer.textSize,
            'text-field': layer.textField,
            'text-offset': layer.textOffset,
            'text-anchor':layer.textAnchor,
            'symbol-placement':layer.symbolPlacement
            }
      })
    }

  });



/*------------------------ household income for the area ----------------*/


//hover function
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', mapLayers[0].id, (e) => {
    map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: mapLayersSource[0].src, sourceLayer: mapLayersSource[0].layer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: mapLayersSource[0].src, sourceLayer: mapLayersSource[0].layer, id: hoveredStateId },
    { hover: true });
    }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', mapLayers[0].id, (e) => {
    map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: mapLayersSource[0].src, sourceLayer: mapLayersSource[0].layer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
});


/*------------------------ visits numbers ----------------*/


//hover function
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', mapLayers[3].id, (e) => {
    map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: mapLayersSource[1].src, sourceLayer: mapLayersSource[1].layer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: mapLayersSource[1].src, sourceLayer: mapLayersSource[1].layer, id: hoveredStateId },
    { hover: true });
    }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', mapLayers[3].id, (e) => {
    map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: mapLayersSource[1].src, sourceLayer: mapLayersSource[1].layer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
});


});

/*------------------- click to popup text boxes ----------------------*/
    map.on('click', function (e) {
    

    //visits when visits layers on
     var featrues_visits = map.queryRenderedFeatures(e.point, {
      layers: [mapLayers[3].id] // replace this with the name of the layer
    });

    if (featrues_visits.length >0){
      var features = featrues_visits[0];
      var description = '<h4>Zip code</h4>' + `<h4>${features.properties.Zip_code}</h4>` + '<p> </p>' +
            '<h4>% of Visits</h4>' + `<h4>${features.properties.p_visits}%</h4>` + '<p> </p>'+
            '<h4>Median Household Income</h4>'+
            `<h4>${Math.round(features.properties.HHI).toLocaleString("en-US", {style:"currency", currency:"USD",
              minimumFractionDigits: 0, maximumFractionDigits: 0,})}</h4>`
          
            

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }      

    //visits when visits layer turned off
     var featrues_visits = map.queryRenderedFeatures(e.point, {
      layers: [mapLayers[5].id] // replace this with the name of the layer
    });

    if (featrues_visits.length >0){
      var features = featrues_visits[0];
      var description = '<h4>Zip code</h4>' + `<h4>${features.properties.Zip_code}</h4>` + '<p> </p>' +
            '<h4>Median Household Income</h4>'+
            `<h4>${Math.round(features.properties.HHI).toLocaleString("en-US", {style:"currency", currency:"USD",
              minimumFractionDigits: 0, maximumFractionDigits: 0,})}</h4>` + '<p> </p>' +
            '<h4>% of Visits</h4>' + `<h4>${features.properties.p_visits}%</h4>`
          
            

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }   




    //Household Income feature layers
    var featrues_HHI = map.queryRenderedFeatures(e.point, {
      layers: [mapLayers[0].id,mapLayers[1].id] // replace this with the name of the layer
    });

    if (featrues_HHI.length >0){
      var features = featrues_HHI[0];
      var description = '<h4>Zip code</h4>' + `<h4>${features.properties.Zip_code}</h4>` + '<p> </p>' +
            '<h4>Median Household Income</h4>'+
            `<h4>${Math.round(features.properties.HHI).toLocaleString("en-US", {style:"currency", currency:"USD",
              minimumFractionDigits: 0, maximumFractionDigits: 0,})}</h4>` 

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }



  });


/*---------------------- click to show demographic layers and their legends ---------*/
 

  const HHI_legend = document.getElementById('HHI-legend');
  const visits_legend = document.getElementById('visits-legend');

  HHI_legend.style.display = 'block';
  visits_legend.style.display ='none';

  //when HHI button clicked
  document.getElementById('HHI').addEventListener('click',() => {

    map.setLayoutProperty(mapLayers[0].id,'visibility','visible');
    map.setLayoutProperty(mapLayers[5].id,'visibility','visible');
    map.setLayoutProperty(mapLayers[3].id,'visibility','none');
    map.setLayoutProperty(mapLayers[1].id,'visibility','none');

    HHI_legend.style.display = 'block';
    visits_legend.style.display = 'none';

  }
);

//when visits button clicked
  document.getElementById('visits').addEventListener('click',() => {

    map.setLayoutProperty(mapLayers[3].id,'visibility','visible');
    map.setLayoutProperty(mapLayers[2].id,'visibility','visible');
    map.setLayoutProperty(mapLayers[1].id,'visibility','visible');
    map.setLayoutProperty(mapLayers[0].id,'visibility','none');

    HHI_legend.style.display = 'none';
    visits_legend.style.display = 'block';

  }
);





/*---------------------- controls features --------------------------*/


// Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl(),'top-right');

  document.getElementById("dismiss").onclick = function() {
    document.getElementById("footer").style.display = "none";
}
  


