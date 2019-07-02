
// QUERY URL WITH EARTHQUAKE DATA
// Start with a queryUrl from API and save as a variable
var queryUrl = `https://raw.githubusercontent.com/StanfordGeospatialCenter/MSA/master/Data/Stanford_MSA_Database.geojson`;

// USE RESULTS OF JSON TO MAP OUT ALL THE EARTHQUAKES FETCHED IN THE URL
// use d3.json to pull in the data
d3.json(queryUrl, function (data) {
    console.log(data);
    // create an L.geoJSON() ovelay later, and save the results to a variable (data.features is from our json)
    // var shootings = L.geoJSON(data.features, {
    //     // use onEachFeature function with standard geoJSON feature/layer arguments:
    //     onEachFeature: function (feature, layer) {
    //         // select a property from the json we want to display as popup; 
    //         // here we choose property "place" which is written "feature.properties.place"
    //         // and then wrapped in layer.bindPopup to make it the popup
    //         // here we also use a javaScript "new Date" panel to display date info
    //         layer.bindPopup(`<h3>${feature.properties.location}</h3>
    //   <p>${feature.properties.date}</p>`);
    //     }
    

    // // OUR STARTING DATA:
    // var locations = [
    //     {
    //         properties: {
    //             Title: "University of Texas at Austin",
    //             Location: "Austin, Texas",
    //             "Possible Motive - General": "Mental illness",
    //             "History of Mental Illness - General": "Yes",
    //             Date: "8/1/1966"
    //         },
    //         geometry: {
    //             type: "Point",
    //             coordinates: [-97.84415949, 30.1988873]
    //         }
    //     }
    // ],

    // var locations = [
    //     {
    //         coordinates: [40.7128, -74.0059],
    //         state: {
    //             name: "New York State",
    //             population: 19795791
    //         },
    //         city: {
    //             name: "New York",
    //             population: 8550405
    //         }
    //     },
    //     {
    //         coordinates: [34.0522, -118.2437],
    //         state: {
    //             name: "California",
    //             population: 39250017
    //         },
    //         city: {
    //             name: "Lost Angeles",
    //             population: 3971883
    //         }
    //     },
    // ];
    features = data.features;//.slice(0,5);
    /*.map(feature=>{
        return {
            coordinates : feature.geometry.coordinates,

        }
    })
    */

    // CREATE TILE LAYERS (SAVE TO VARIABLES):

    var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    //   var contrast = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //     maxZoom: 18,
    //     id: "mapbox.high-contrast",
    //     accessToken: API_KEY
    //   });

    // CREATE VARIABLES WITH ARRAYS WHERE WE'LL STORE OUR MARKERS
    var shootingMarkers = [];
    for (var i = 0; i < features.length; i++) {
        console.log("trigger");
        //console.log(features[i].properties.Location)
        var popLocation = features[i].properties.Location;
        var popDate = features[i].properties.Date;
        lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]
        shootingMarkers.push(
            
            L.circle(lat_long, {
                // stroke: true,
                fillOpacity: 0.70,
                color: "white",
                weight: 1,
                fillColor: "red",
                radius: 80*1000
            }).bindPopup(`<h2>${popLocation}</h2>
            <h3>${popDate}</h3>`)
        )};

    var mentalMarkers = [];
    
    for (var i = 0; i < features.length; i++) {
        // var population = locations[i].city.population;

        lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]
        
        if (features[i].properties['History of Mental Illness - General'] == 'Yes') {
            
            mentalMarkers.push(
                L.circle(lat_long, {
                    fillOpacity: 0.75,
                    color: "white",
                    weight: 1,
                    fillColor: "orange",
                    radius: 70*1000
                })
                );
        };
    };

    // SET OUR BASE AND OVERLAY LAYERS:
    // make layer groups for city layer and state layer
    var shootingLayer = L.layerGroup(shootingMarkers);
    var mentalLayer = L.layerGroup(mentalMarkers);

    
    // Set basemap with streetmap and darkmap map-ids
    var baseMaps = {
        // "Contrast": contrast,
        // "Street": streets
    };
    // Create an overlayMaps object here to contain the "State Population" and "City Population" layers
    var overlayMaps = {
        "Shooting Locations": shootingLayer,
        "Mental Health Motive": mentalLayer
    }

    // CREATE OUR MAP OBJECT "L.MAP" AND DEFAULT LAYERS
    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [streets, shootingLayer]
    });

    // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
    L.control.layers(baseMaps, overlayMaps).addTo(map);
});
