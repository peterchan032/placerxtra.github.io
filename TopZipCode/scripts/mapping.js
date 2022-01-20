/*------------------ load the map ---------------*/
		mapboxgl.accessToken = 'pk.eyJ1IjoicGxhY2VybWFwdGVhbSIsImEiOiJja3d6NTh4aGkwa2pwMndvNjRnZDR2Zmc0In0.8J8KJ5IxdOF3gTEs8HVM2Q';
      	const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/placermapteam/ckyabvi3x1guy14jua92q8hui',
        center: [-121.4974947, 38.532661], // starting position [lng, lat]
  			zoom: 10
      });

    const Raley_location = new mapboxgl.Marker({ color: '#EF5771' })
    .setLngLat([-121.4974947, 38.532661])
    .addTo(map);
/*--------------------- variable -----------------------*/

//topzipcode shapefile
var topzipcode_url = 'mapbox://placermapteam.97j0g4nb'; //tileset id
var topzipcode_srcLayer = 'Raleys_topzipcode_HHI-05vphu'; //source-layer
var topzipcode_src = 'topzipcode_src'; //source
//var topzipcode = 'topzipcode'; //id

//household income for CA
var HHI_url = 'mapbox://placermapteam.b0sup0q8'; //tileset id
var HHI_srcLayer = 'HHI_zip_CA-2gxepv'; //source-layer
var HHI_src = 'HHI_src'; //source

//zipcode point data
var point_url = 'mapbox://placermapteam.1xk2m97v'; //tileset id
var point_srcLayer = 'Raleys_SAC-1vgvgg'; //source-layer
var point_src = 'point_src'; //source

//radius ring
//1mi
var sRad_url = 'mapbox://placermapteam.abu6rjsr';
var sRad_srcLayer = 'Ring_1mi-3tdoyc'
var sRad_src = 'sRad_src';

//3mi
var mRad_url = 'mapbox://placermapteam.0vhxmk5x';
var mRad_srcLayer = 'Ring_3mi-5pnfie';
var mRad_src ='mRad_src';

//5mi 
var lRad_url = 'mapbox://placermapteam.0572ahom';
var lRad_srcLayer = 'Ring_5mi-0s3ma4'
var lRad_src ='lRad_src';


/*-----------------hover state -----------------------------*/
var hoveredStateId = null;


/*--------------------- load layers ----------------*/

map.on('load', function(){
    map.addSource(topzipcode_src,{
        type: 'vector',
        url: topzipcode_url
    });


    map.addSource(HHI_src,{
        type: 'vector',
        url: HHI_url
    });

    map.addSource(point_src,{
        type: 'vector',
        url: point_url
    });

    map.addSource(sRad_src,{
        type: 'vector',
        url: sRad_url
    });

    map.addSource(mRad_src,{
        type: 'vector',
        url: mRad_url
    });

    map.addSource(lRad_src,{
        type: 'vector',
        url: lRad_url
    });

/*------------------------ household income for the area ----------------*/
    map.addLayer({
    'id': 'Median Household Income',
    'type':'fill',
    'source':HHI_src,
    'source-layer':HHI_srcLayer,
    'paint':{
    'fill-color':
        [
          "step",
          ["get", "HHI"],
          "#b2d8d8",
          42051,
          "#b2d8d8",
          56107,
          "#66b2b2",
          72812,
          "#007f80",
          97079,
          "#006666",
          250000,
          "#004c4c"
        ],
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    1,
    0.5
    ],
    'fill-outline-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    '#675f5f',
    '#e0dcdc'
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
  map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: HHI_src, sourceLayer: HHI_srcLayer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: HHI_src, sourceLayer: HHI_srcLayer, id: hoveredStateId },
    { hover: true });
    }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'Median Household Income', (e) => {
  map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: HHI_src, sourceLayer: HHI_srcLayer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
});


/*------------------------ visits numbers ----------------*/

  map.addLayer({
  'id': 'visits',
  'type':'fill',
  'source':topzipcode_src,
  'source-layer':topzipcode_srcLayer,
    'paint':{
    'fill-color':"hsla(0, 0%, 0%, 0)",
/*
    [
          "step",
          ["get", "p_visits"],
   
          "#EFE0F9",
          0.8,
          "#f0e1f9",
          2.64,
          "#bfbbf7",
          5.73,
          "#9099ea",
          10.54,
          "#5f76d3",
          15.95,
          "#3158b2"



        ],
*/
  'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],1, 0.7],
  'fill-outline-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],'#bdb7b7','#5d696f']
  },
  'layout': {
    visibility:'visible'
  }
});

/*
  //hover function
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', 'visits', (e) => {
    map.getCanvas().style.cursor = 'pointer';
  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: topzipcode_src, sourceLayer: topzipcode_srcLayer, id: hoveredStateId },
        { hover: false}
        );
  }
hoveredStateId = e.features[0].id;
  map.setFeatureState(
    { source: topzipcode_src, sourceLayer: topzipcode_srcLayer, id: hoveredStateId },
    { hover: true });
    };

});
 

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'visits', (e) => {
    map.getCanvas().style.cursor = '';
  if (hoveredStateId !== null) {
    map.setFeatureState(
      { source: topzipcode_src, sourceLayer: topzipcode_srcLayer, id: hoveredStateId },
      { hover: false }
    );
}
  hoveredStateId = null;
  
});

*/

/*------------------------ visits numbers 3D----------------*/

  map.addLayer({
  'id': 'visits3D',
  'type':'fill-extrusion',
  'source':topzipcode_src,
  'source-layer':topzipcode_srcLayer,
    'paint':{
    'fill-extrusion-height':
        [
          "interpolate",
          ["linear"],
          ["get", "p_visits"],
          0.17,
          500,
          15.95,
          4000
        ],           
    'fill-extrusion-color':[
          "step",
          ["get", "p_visits"],
          "#EFE0F9",
          0.8,
          "#f0e1f9",
          2.64,
          "#bfbbf7",
          5.73,
          "#9099ea",
          10.54,
          "#5f76d3",
          15.95,
          "#3158b2"
        ],
  'fill-extrusion-opacity': 0.9,
  },
  'layout': {
    visibility:'none'
  }
});


/*------------------ highlight of top zip code polygons ----------------*/

map.addLayer({
    'id': 'boundary',
    'type':'line',
    'source':topzipcode_src,
    'source-layer':topzipcode_srcLayer,
    'paint':{
                'line-width': 3,
                'line-color':  '#ffffff'
            },
    'layout': {
                'visibility': 'visible'
            }
});


/* --------------- point of top zip code -------------------*/

map.addLayer({
    'id':'zipcode_pt',
    'type':'circle',
    'source': point_src,
    'source-layer':point_srcLayer,
    'paint':{
        'circle-radius': [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              4.199999999999999,
              5,
              4.62,
              10,
              5.879999999999999,
              22,
              8.399999999999999
            ],
        'circle-color': 
            [
              "interpolate",
              ["exponential", 1],
              ["get", "p_visits"],
              0,
            '#EFE0F9',
            0.8,
            '#f0e1f9',
            2.64,
            '#bfbbf7',
            5.73,
            '#9099ea',
            10.54,
            '#5f76d3',
            15.95,
            '#3158b2'
        ],
        'circle-stroke-width': 0.75,
        'circle-stroke-color': [
              "interpolate",
              ["exponential", 1],
              ["get", "p_visits"],
                 0,
                '#EFE0F9',
                0.8,
                '#f0e1f9',
                2.64,
                '#bfbbf7',
                5.73,
                '#9099ea',
                10.54,
                '#5f76d3',
                15.95,
                '#3158b2'
           
           /*
              "#ffba7a",
              0.8,
              "#ffba7a",
              2.64,
              "#fe662f",
              5.73,
              "#ef350b",
              10.54,
              "#cc0e00",
              15.95,
              "#7a0000"
              */
            ],
    },
    'layout': {
        'visibility': 'visible'
            }
});



/*-------------------- Radius Ring ---------------------------------*/
        map.addLayer({
            'id': 'sRad',
            'type':'line',
            'source': sRad_src,
            'source-layer': sRad_srcLayer,
            'paint':{
                'line-width': 4,
                'line-color': "#f15574",
                'line-dasharray': [1,1],
            },
          'layout': {
            'visibility': 'visible'
            }
        });

        map.addLayer({
            'id': 'mRad',
            'type':'line',
            'source': mRad_src,
            'source-layer': mRad_srcLayer,
            'paint':{
                'line-width': 4,
                'line-color': "#f15574",
                'line-dasharray': [1,1],
            },
          'layout': {
            'visibility': 'visible'
            }
        });

        map.addLayer({
            'id': 'lRad',
            'type':'line',
            'source': lRad_src,
            'source-layer': lRad_srcLayer,
            'paint':{
                'line-width': 4,
                'line-color': "#f15574",
                'line-dasharray': [1,1],
            },
          'layout': {
            'visibility': 'visible'
            }
        });


});

/*------------------- click to popup text boxes ----------------------*/
    map.on('click', function (e) {
    
    //visits
     var featrues_visits = map.queryRenderedFeatures(e.point, {
      layers: ['visits'] // replace this with the name of the layer
    });

    if (featrues_visits.length >0){
      var features = featrues_visits[0];
      var description = '<h4>Zip code</h4>' + `<h4>${features.properties.Zip_code}</h4>` + '<p> </p>' +
            '<h4>Median Household Income</h4>'+
            `<h4>${Math.round(features.properties.HHI).toLocaleString("en-US", {style:"currency", currency:"USD",
              minimumFractionDigits: 0, maximumFractionDigits: 0,})}</h4>` 
            +'<p> </p>' +
            '<h4>% of Visits</h4>' + `<h4>${features.properties.p_visits}%</h4>`

    var popup = new mapboxgl.Popup({offset: [0, -15],keepInView:true})
    .setLngLat(e.lngLat)
    .setHTML(description)
    .addTo(map);

    return;
    }   




    //Household Income feature layers
    var featrues_HHI = map.queryRenderedFeatures(e.point, {
      layers: ['Median Household Income'] // replace this with the name of the layer
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
 /*

  const HHI_legend = document.getElementById('HHI-legend');
  const visits_legend = document.getElementById('visits-legend');
  HHI_legend.style.display = 'none';
  document.getElementById('HHI').addEventListener('click',() => {

    map.setLayoutProperty('Median Household Income','visibility','visible');
    map.setLayoutProperty('visits','visibility','none');

    HHI_legend.style.display = 'block';
    visits_legend.style.display = 'none';

  }
);

  document.getElementById('visits').addEventListener('click',() => {

    map.setLayoutProperty('visits','visibility','visible');
    map.setLayoutProperty('Median Household Income','visibility','none');

    HHI_legend.style.display = 'none';
    visits_legend.style.display = 'block';

  }
);

*/




/*---------------------- controls features --------------------------*/


// Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl(),'top-right');