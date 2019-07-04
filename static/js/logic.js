// QUERY URL WITH EARTHQUAKE DATA
// Start with a queryUrl from API and save as a variable
var queryUrl = `https://raw.githubusercontent.com/StanfordGeospatialCenter/MSA/master/Data/Stanford_MSA_Database.geojson`;

// USE RESULTS OF JSON TO MAP OUT ALL THE EARTHQUAKES FETCHED IN THE URL
// use d3.json to pull in the data
d3.json(queryUrl, function(data) {
// create an L.geoJSON() ovelay later, and save the results to a variable (data.features is from our json)
  var shootings = L.geoJSON(data.features, {
    // use onEachFeature function with standard geoJSON feature/layer arguments:
    onEachFeature: function(feature, layer) {
      // select a property from the json we want to display as popup; 
      // here we choose property "place" which is written "feature.properties.place"
      // and then wrapped in layer.bindPopup to make it the popup
      // here we also use a javaScript "new Date" panel to display date info
      layer.bindPopup(`<h3>${feature.properties.Location}</h3>
      <p>${feature.properties.Date}</p>`);
    }
  });

// define two base layers
// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoiZmFlZHJhIiwiYSI6ImNqeDEzM3FiZDA0bDE0YnFsYjF6b3B5ZHIifQ.HHgSswn1iYwrBzk7rY2MxQ");

// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1IjoiZmFlZHJhIiwiYSI6ImNqeDEzM3FiZDA0bDE0YnFsYjF6b3B5ZHIifQ.HHgSswn1iYwrBzk7rY2MxQ");

// define our variable to hold our base layers
// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  // "Dark Map": darkmap
};

// define our variable to hold our overlay layers (the overlay layer we've built is our geojson layer)
var overlayMaps = {
  "Shootings": shootings
}
// Create a new map
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 4,
  // set default base and overlay layers
  layers: [streetmap, shootings]
});

// Create a layer control containing our baseMaps
// Be sure to add an overlay Layer containing the earthquake GeoJSON
L.control.layers(baseMaps, overlayMaps)
  // collapsed: false
.addTo(myMap);
});
