/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

/*var runner = new L.icon({
    iconUrl: 'images/noun_539377_cc.png'});*/

function stylize (feature, 
    layer) {
    layer.bindPopup("<h1> Hi I'm an info window</h1><p>" + feature.properties.State + "</p>");
    //layer.setIcon(runner);
};

//L.geoJson(athletes,{
  //  onEachFeature: stylize
//}).addTo(map);

function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            L.geoJson(response).addTo(map);
        }
    });
};

$(document).ready(createMap);

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

//function stylize (feature, 
  //  layer) {
    //layer.bindPopup("<h1> Hi I'm an info window</h1><p>" + feature.properties.State + "</p>");
    //layer.setIcon(runner);
//};

//simple way to load data
//L.geoJson(athletes,{
  //  onEachFeature: stylize
//}).addTo(map);

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
            
            //create marker options
           /* var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#f62e9c",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            
            L.geoJson(response, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(map); */
        }
    });
};

$(document).ready(createMap);

////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

function createPropSymbols(data, map){
   //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
}

/*function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
}; */

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            createPropSymbols(response, map);
        }
    });
};

$(document).ready(createMap);

//////////////////////////////////////////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

function createPropSymbols(data, map){
    var attribute = "Total_09";
   //create marker options
   var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }; 
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng){
            var attValue = Number(feature.properties[attribute]);
            
            console.log(feature.properties, attValue);
            
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

/*function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
}; */

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            createPropSymbols(response, map);
        }
    });
};

$(document).ready(createMap);

////////////////////////////////////////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

function createPropSymbols(data, map){
    var attribute = "Total_09";
   //create marker options
   var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }; 
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng){
            var attValue = Number(feature.properties[attribute]);
            
            geojsonMarkerOptions.radius = calcPropRadius(attValue);
            
            //console.log(feature.properties, attValue);
            
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .015;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

/*function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
}; */

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            createPropSymbols(response, map);
        }
    });
};

$(document).ready(createMap);

//////////////////////////////////////////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .015;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

function pointToLayer(feature, latlng){
    var attribute = "Total_09";
    //create marker options
    var options = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    //build popup content string
    var popupContent = "<p><b>State:</b> " + feature.properties.State + "</p><p><b>Total HS Athletes 2009:</b> " + feature.properties[attribute] + "</p>";
    //bind the popup to the circle marker
    layer.bindPopup(popupContent);
    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

function createPropSymbols(data, map){
    L.geoJson(data, {
        pointToLayer: pointToLayer
    }).addTo(map);
};

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            createPropSymbols(response, map);
        }
    });
};

$(document).ready(createMap);

///////////////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .015;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

function pointToLayer(feature, latlng, attributes){
    var attribute = attributes[0];
    //create marker options
    var options = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    var panelContent = "<p><b>State:</b> " + 
                        feature.properties.State + 
                        "</p><p><b>Total HS Athletes 2009:</b> " +
                        feature.properties[attribute] + "</p>";
    //build popup content string
    var popupContent = feature.properties.State;
    //bind the popup to the circle marker
    layer.bindPopup(popupContent, {
        offset: new L.Point(0, -options.radius),
        closeButton: false
    });
    
    //return the circle marker to the L.geoJson pointToLayer option
    layer.on({
        mouseover: function() {
            this.openPopup();
        },
        mouseout: function() {
            this.closePopup();
        },
        click: function() {
            $("#panel").html(panelContent);
        }
    });
    return layer;
};

function createPropSymbols(data, map){
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

function createSequenceControls(map){
    //create range input element (slider)
    $('#panel').append('<input class="range-slider" type="range">');
    $('panel').append('<button class="skip" id="reverse">Reverse</button>');
    $('panel').append('<button class="skip" id="forward">Skip</button>');
    $('#reverse').html('<img src="img/noun_539377_cc.png"/>');
    $('#forward').html('<img src="img/forward.png"/>');
    
    //set slider attributes
    $('.range-slider').attr({
        max: 6,
        min:0,
        value:0,
        step:1
    });
};

function processData(data){
    //emtpy array to hold attributes
    var attributes = [];
    var properties = data.features[0].properties;
    
    for (var attribute in properties){
        if (attribute.includes("_")){
            attributes.push(attribute);
        };
    };
    console.log(attributes);
    
    return attributes;
};

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            
            createPropSymbols(response, map);
            createSequenceControls(map);
        }
    });
};

$(document).ready(createMap);

////////////////////////////////////////////////////////////////////////
/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

    getData(map);
};

//Add some GeoJSON
function createPropSymbols(data, map, attributes) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

function pointToLayer(feature, latlng, attributes){
    var attribute = attributes[0];
    //check
    console.log(attribute);
    
    //create marker options
    var options = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    if (attValue == 0) {
        attValue = 1;
    }
    //Give each feature's circle marker a radius based on its attribute value
    //options.radius = attValue;
    options.radius = calcPropRadius(attValue);
    
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    var panelContent = "<p><b>State:</b> " + 
                        feature.properties.State + 
                        "</p><p><b>Total HS Athletes 2009:</b> " +
                        feature.properties[attribute] + "</p>";
    //build popup content string
    var popupContent = feature.properties.State;
    //bind the popup to the circle marker
    layer.bindPopup(popupContent, {
        offset: new L.Point(0, -options.radius),
        closeButton: false
    });
    
    //return the circle marker to the L.geoJson pointToLayer option
    layer.on({
        mouseover: function() {
            this.openPopup();
        },
        mouseout: function() {
            this.closePopup();
        },
        click: function() {
            $("#panel").html(panelContent);
        }
    });
    return layer;
};

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .015;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    
    //return Math.sqrt(area/Math.PI);
    return radius;
};

function createSequenceControls(map, attributes){
    //create range input element (slider)
    $('#slider').append('<input class="range-slider" type="range">');
    $('#slider').append('<button class="skip" id="reverse">Reverse</button>');
    $('#slider').append('<button class="skip" id="forward">Skip</button>');
    //$('#reverse').html('<img src="img/noun_539377_cc.png"/>');
    //$('#forward').html('<img src="img/forward.png"/>');
    
    //set slider attributes
    $('.range-slider').attr({
        max: 6,
        min:0,
        value:0,
        step:1
    });
    
    $('.skip').click(function(){
        var index = $('.range-slider').val();
        //var max_index = $('.range-slider').attr('max');

        // increment by 1 or -1
        if ($(this).attr('id') == 'forward') {
            index++;
            index = index > 6 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse') {
            index--;
            index = index <0 ? 6 : index;
        };
        // update slider with index
        console.log(index);
        $('.range-slider').val(index);

        updatedPropSymbols(map, attributes[index]);
    });

    $('.range-slider').on('input', function(){
        var index = $(this).val();

        updatedPropSymbols(map, attributes[index]);
    });
};

function updatedPropSymbols(map, attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            var props = layer.feature.properties;
            
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
            
            var popupContent = "<p><b>State:</b> " + props.State + "</p>";
            
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Athletes in " + year + ":</b> " + props[attribute];
            
            //replace original popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0, -radius)
            });
            
            //layer.on({
              //  click: function() {
                //    $("#panel").html(panelContent);
                //}
            //});
        };
    });
}

function processData(data) {
    //emtpy array to hold attributes
    var attributes = [];
    var properties = data.features[0].properties;
    
    for (var attribute in properties) {
        if (attribute.includes("Total")) {
            attributes.push(attribute);
        };
    };
    //console.log(attributes);
    
    return attributes;
};

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            
            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);
        }
    });
};

$(document).ready(createMap);

/////////////////////////////////////////////////////////////////

/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);
    /*L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;
        <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(mymap);*/

    getData(map);
};

//Add some GeoJSON

function createPopup(props, attribute, layer, radius){
    var popupContent = "<p><b>State:</b> " + props.State + "</p>";
            
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Total High School Athletes in 20" + year + ":</b> " + props[attribute];

    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-radius)
    });
};

function createPropSymbols(data, map, attributes) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

function pointToLayer(feature, latlng, attributes){
    var attribute = attributes[0];
    //check
    console.log(attribute);
    
    //create marker options
    var options = {
        radius: 8,
        fillColor: "#f62e9c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    if (attValue == 0) {
        attValue = 1;
    }
    //Give each feature's circle marker a radius based on its attribute value
    //options.radius = attValue;
    options.radius = calcPropRadius(attValue);
    
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    //var panelContent = "<p><b>State:</b> " + 
      //                  feature.properties.State + 
        //                "</p><p><b>Total HS Athletes 2009:</b> " +
          //              feature.properties[attribute] + "</p>";
    
    createPopup(feature.properties, attribute, layer, options.radius);
    
    //build popup content string
    //var popupContent = "<p><b>State:</b> " + 
      //                  feature.properties.State + 
        //                "</p><p><b>What is this? 2009:</b> " +
          //              feature.properties[attribute] + "</p>";
    //var popupContent = feature.properties.State;
    //bind the popup to the circle marker
    //layer.bindPopup(popupContent, {
      //  offset: new L.Point(0, -options.radius),
        //closeButton: false
    //});
    
    //return the circle marker to the L.geoJson pointToLayer option
    layer.on({
        mouseover: function() {
            this.openPopup();
        },
        mouseout: function() {
            this.closePopup();
        },
        //click: function() {
          //  $("#panel").html(panelContent);
        //}
    });
    
    return layer;
};

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .015;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    
    //return Math.sqrt(area/Math.PI);
    return radius;
};

function createSequenceControls(map, attributes){
    //create range input element (slider)
    $('#slider').append('<input class="range-slider" type="range">');
    $('#slider').append('<button class="skip" id="reverse">Reverse</button>');
    $('#slider').append('<button class="skip" id="forward">Skip</button>');
    //$('#reverse').html('<img src="img/noun_539377_cc.png"/>');
    //$('#forward').html('<img src="img/forward.png"/>');
    
    //set slider attributes
    $('.range-slider').attr({
        max: 6,
        min:0,
        value:0,
        step:1
    });
    
    $('.skip').click(function(){
        var index = $('.range-slider').val();
        //var max_index = $('.range-slider').attr('max');

        // increment by 1 or -1
        if ($(this).attr('id') == 'forward') {
            index++;
            index = index > 6 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse') {
            index--;
            index = index <0 ? 6 : index;
        };
        // update slider with index
        console.log(index);
        $('.range-slider').val(index);

        updatedPropSymbols(map, attributes[index]);
    });

    $('.range-slider').on('input', function(){
        var index = $(this).val();

        updatedPropSymbols(map, attributes[index]);
    });
};

function updatedPropSymbols(map, attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            var props = layer.feature.properties;
            
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
            
            createPopup(props, attribute, layer, radius);
            
            //var popupContent = "<p><b>State:</b> " + props.State + "</p>";
            
            //var year = attribute.split("_")[1];
            //popupContent += "<p><b>Total High School Athletes in 20" + year + ":</b> " + props[attribute];
            
            //replace original popup
            //layer.bindPopup(popupContent, {
              //  offset: new L.Point(0, -radius)
            //});
            
            //layer.on({
              //  click: function() {
                //    $("#panel").html(panelContent);
                //}
            //});
        };
    });
}


function processData(data) {
    //emtpy array to hold attributes
    var attributes = [];
    var properties = data.features[0].properties;
    
    for (var attribute in properties) {
        if (attribute.includes("Total")) {
            attributes.push(attribute);
        };
    };
    console.log(attributes);
    
    return attributes;
};

//complex way to load via ajax
function getData(map){
    $.ajax("data/athletes.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            
            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);
        }
    });
};

$(document).ready(createMap);

//////////////////////////////////////////////////////////////////////////////
/* Stylesheet by Rosemary P. Wardley, 2017 */

#map {
    height: 600px;
    width: 80%;
    display: inline-block;}
    /*position: relative;*/ 

/*#panel {
    height: 600px;
    width: 16%;
    display: inline-block;
    vertical-align: top;
}*/

.leaflet-popup-content p {
    margin: 0.2em 0;
}

/*#slider {
    width: 35%;
    padding: 5px;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    line-height: 20px;
}
 .range-slider {
    width: 50%;
    padding: 20px;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    line-height: 20px;
}*/

#slider {
    width: 350px;
    height: 30px;
    background-color: rgba(255,255,255,0.8);
    padding: 10px;
    line-height: 45px;
    text-align: center;
    border: solid gray 1px;
}

.range-slider {
    width: 200px;
}

#forward {
    float: right;
}

#reverse {
    float: left;
}