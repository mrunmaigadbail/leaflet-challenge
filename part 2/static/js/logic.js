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
  
    //console.log(response);
    feature = response.features;
  
    //console.log(features);
  
    
    let marker_limit = feature.length;
  
    for (let i = 0; i < marker_limit; i++) {
        let magnitude = feature[i].properties.mag;
       
        let latitude = feature[i].geometry.coordinates[1];
        let longitude = feature[i].geometry.coordinates[0];
        let depth = feature[i].geometry.coordinates[2];
        let place = feature[i].properties.place;
        let time = new Date(feature[i].properties.time)
        let popup_text = `<h1>${place}</h1><hr><h5>${time}</h5>`;
     
        let fillcolor = "";
        if ( depth >= -10 && depth <= 10 ) {
          fillcolor = "#66bd63";
        }
        else if (depth >= 10 && depth <= 30 ) {
          fillcolor = "#d9ef8b";
        }
        else if (depth >= 30 && depth <= 50 ) {
          fillcolor = "#fee08b";
        }

        else if (depth >= 50 && depth <= 70 ) {
            fillcolor = "#ff922c";
          }
          else if (depth >= 70 && depth <= 90 ) {
            fillcolor = "#fd673a";
          }
        else if (depth >= 90 ){
          fillcolor = "ec204f";
        }
        console.log(magnitude)
        
        L.circle([latitude,longitude], {
            fillOpacity: 1,
            weight: 2,
            //opacity: 1,
            color:"black",
            fillColor: fillcolor,
            radius: magnitude * 10000
          }).bindPopup(popup_text).addTo(myMap);
      }
})

let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'legend'); 
       div.innerHTML += '<span>-10-10</span><br>';
       div.innerHTML += '<span>10 - 30</span><br>';
       div.innerHTML += '<span>30- 50</span><br>';
       div.innerHTML += '<span>50-70</span><br>';
       div.innerHTML += '<span>70 - 90</span><br>';
       div.innerHTML += '<span>90+</span><br>';
           
    
    return div;
};

// Add the legend to the map
legend.addTo(myMap);
