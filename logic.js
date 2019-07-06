
// Start with a queryUrl from API and save as a variable
var queryUrl = `https://raw.githubusercontent.com/StanfordGeospatialCenter/MSA/master/Data/Stanford_MSA_Database.geojson`;

// use d3.json to pull in the data
d3.json(queryUrl, function (err, data) {
    // console.log(data);

    features = data.features;

    // create tile layers
    var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var contrast = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.high-contrast",
        accessToken: API_KEY
    });

    // create variables with arrays where we'll store our markers

    var shootingMarkers = [];
    for (var i = 0; i < features.length; i++) {

        var popLocation = features[i].properties.Location;
        var popDate = features[i].properties.Date;
        var popTitle = features[i].properties.Title;
        lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]
        
        shootingMarkers.push(

            L.circle(lat_long, {
                // stroke: true,
                fillOpacity: 0.80,
                color: "white",
                weight: .8,
                fillColor: "red",
                radius: 80 * 1000
            }).bindPopup(`
            <h3>Shooting Location: ${popLocation}</h3>
            <h3>Date: ${popDate}</h3>
            <p><b>Description: </b>${popTitle}</h3>`)
            )
    };

    var mentalMarkers = [];
    for (var i = 0; i < features.length; i++) {

        var popLocation = features[i].properties.Location;
        var popDate = features[i].properties.Date;
        var popMotive = features[i].properties["Possible Motive - General"];
        var popHistory = features[i].properties["History of Mental Illness - Detailed"];
        lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]

        if (features[i].properties['History of Mental Illness - General'] == 'Yes') {

            mentalMarkers.push(
                L.circle(lat_long, {
                    fillOpacity: 0.9,
                    color: "white",
                    weight: .8,
                    fillColor: "rgb(66, 185, 245)",
                    radius: 80 * 1000
                }).bindPopup(`
                <h2 class="mental">History of Mental Illness: Yes</h2>
                <h3>Location: ${popLocation}</h3>
                <h3>Date: ${popDate}</h3>
                <p><b>Mental Illness - General Motive:</b> ${popMotive}</p>
                <p><b>History of Mental Illness:</b> ${popHistory}</p>`)
            );
        };
    };

    var schoolMarkers = [];
    for (var i = 0; i < features.length; i++) {

        var popLocation = features[i].properties.Location;
        var popDate = features[i].properties.Date;
        var popType = features[i].properties["Place Type"];
        var popRelationship = features[i].properties["Relationship to Incident Location"];
        var popTarget = features[i].properties["Targeted Victim/s - Detailed"];

        lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]

        if (features[i].properties['School Related'] == 'Yes') {

            schoolMarkers.push(
                L.circle(lat_long, {
                    fillOpacity: 0.9,
                    color: "white",
                    weight: .8,
                    fillColor: "rgb(56, 207, 106)",
                    radius: 80 * 1000
                }).bindPopup(`
                <h2 class="school">School-Related: Yes</h2>
                <h3>Location: ${popLocation}</h3>
                <h3>Date: ${popDate}</h3>
                <p><b>Type of School:</b> ${popType}</p>
                <p><b>Shooter Relationship to Location:</b> ${popRelationship}</p>
                <p><b>Targeted Victims:</b> ${popTarget}</p>`)
            );
        };
    };

    // var combinedMarkers = [];

    // for (var i = 0; i < features.length; i++) {
    //     // var population = locations[i].city.population;
    //     var popLocation = features[i].properties.Location;
    //     var popDate = features[i].properties.Date;
    //     var popType = features[i].properties["Place Type"];
    //     var popRelationship = features[i].properties["Relationship to Incident Location"];
    //     var popTarget = features[i].properties["Targeted Victim/s - Detailed"];

    //     lat_long = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]

    //     if (features[i].properties[
    //         ['School Related'] == 'Yes'
    //         ['History of Mental Illness - General'] == 'Yes'
    //     ]) {

    //         combinedMarkers.push(
    //             L.circle(lat_long, {
    //                 fillOpacity: 0.8,
    //                 color: "white",
    //                 weight: .8,
    //                 fillColor: "orange",
    //                 radius: 80 * 1000
    //             }).bindPopup(`<h3>Location: ${popLocation}</h3>
    //             <h3>Date: ${popDate}</h3><h3>Type of School: ${popType}</h3>
    //             <p>Shooter Relationship to Location: ${popRelationship}</p><p>Targeted Victims: ${popTarget}</p>`)
    //         );
    //     };
    // };

    // SET OUR BASE AND OVERLAY LAYERS:
    // make layer groups for city layer and state layer
    var shootingLayer = L.layerGroup(shootingMarkers);
    var mentalLayer = L.layerGroup(mentalMarkers);
    var schoolLayer = L.layerGroup(schoolMarkers);
    // var combinedLayer = L.layerGroup(combinedMarkers);


    // Set basemap with streetmap and contrast map-ids
    var baseMaps = {
        "Contrast": contrast,
        "Street": streets
    };
    // Create an overlayMaps object here to contain the various layers
    var overlayMaps = {
        "Shootings: 335 Locations": shootingLayer,
        "History of Mental Illness: 96 Locations": mentalLayer,
        "School Related: 74 Locations": schoolLayer,
        // "Mental-School Combined": combinedLayer,
    }

    // create our map object and default layers
    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [streets, shootingLayer]
    });

    // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
    L.control
    .layers(baseMaps, overlayMaps, { collapsed:false })
    .addTo(map);
});
