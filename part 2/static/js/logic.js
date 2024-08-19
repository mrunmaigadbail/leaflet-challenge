let myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5

  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  d3.json(url).then(function(response) {

    feature = response.features;

  
    
    let marker_limit = feature.length;
  
    for (let i = 0; i < marker_limit; i++) {
        let magnitude = feature[i].properties.mag;
       
        let latitude = feature[i].geometry.coordinates[1];
        let longitude = feature[i].geometry.coordinates[0];
        let depth = feature[i].geometry.coordinates[2];
        let place = feature[i].properties.place;
        let time = new Date(feature[i].properties.time)
        let popup_text = `<h1>${place}</h1><hr><h5>${time}</h5>`;
         
        
        L.circle([latitude,longitude], {
            fillOpacity: 0.75,
          
            opacity: 1,
            color: "black",
            fillColor: selectColor(depth),
            radius: radiusCal(magnitude)
          }).bindPopup(popup_text).addTo(myMap);
      }
})


let legends = L.control({ position: "bottomright" })
legends.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend'); 

       div.innerHTML += `<i style='background: #98EE00'></i>-10-10<br/>
                         <i style='background: #D4EE00'></i>10-30<br/>
                        <i style='background: #EECC00'></i>30-50<br/>
                        <i style='background: #EE9C00'></i>50-70<br/>
                        <i style='background: #EA822C'></i>70-90<br/>
                        <i style='background: #EA2C2C'></i>90+`;
           
    
    return div;
};

// Add the legend to the map
legends.addTo(myMap);

function selectColor(depth){

    let fillcolor = "black";
    if ( depth >= -10 && depth <= 10 ) {
    fillcolor = "#98EE00";
    }
    else if (depth >= 10 && depth <= 30 ) {
    fillcolor = "#D4EE00";
    }
    else if (depth >= 30 && depth <= 50 ) {
    fillcolor = "#EECC00";
    }

    else if (depth >= 50 && depth <= 70 ) {
        fillcolor = "#EE9C00";
    }
    else if (depth >= 70 && depth <= 90 ) {
        fillcolor = "#EA822C";
    }
    else if (depth >= 90 ){
    fillcolor = "#EA2C2C";
    }
    return fillcolor
}

function radiusCal(magnitude)
{
 
    if(magnitude>0){
        radius = magnitude * 10000
    }
    return radius
}