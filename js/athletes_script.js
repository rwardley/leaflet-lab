/* Map of GeoJSON data from Atheletes.geojson */

function createMap(){
    var map = L.map('map', {
        center: [41, -96],
        zoom: 4
    });

    //add OSM base tilelayer
    //L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(map);
    /*, {
        maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;
        <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);*/

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
    createPopup(feature.properties, attribute, layer, options.radius);

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
    var scaleFactor = .007;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    
    //return Math.sqrt(area/Math.PI);
    return radius;
};

//Create Attribute Legend////WHY WON'T THIS WORK???
function createLegend(map, attributes){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');
            
            $(container).append('<div id="temporal-legend">')

            //Step 1: start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="180px" height="180px">';
            
            //array of circle names to base loop on
            var circles = ["max", "mean", "min"];
            /*var circles = {
                max: 20,
                mean: 40,
                min: 60
            };*/
            
            /*for (var circle in circles) {
                console.log(circle);
                svg += '<circle class="legend-circle" id="' + circle + 
                '" fill="#ff7800" fill-opacity="0.8" stroke="#000000" cx="32"/>';
                svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
            };*/

            //Step 2: loop to add each circle and text to svg string
            for (var i=0; i<circles.length; i++){
                //circle string
                svg += '<circle class="legend-circle" id="' + circles[i] + 
                '" fill="#f62e9c" fill-opacity="0.8" stroke="#000000" cx="90"/>';
            };

            //close svg string
            svg += "</svg>";

            //add attribute legend svg to container
            $(container).append(svg);

            return container;
        }
    });

    map.addControl(new LegendControl());
    updateLegend(map, attributes[0]);
};

//
function getCircleValues(map, attribute){
    var min = Infinity,
        max = -Infinity;

    map.eachLayer(function(layer){
        //get the attribute value
        if (layer.feature){
            var attributeValue = Number(layer.feature.properties[attribute]);

            //test for min
            if (attributeValue < min){
                min = attributeValue;
            };

            //test for max
            if (attributeValue > max){
                max = attributeValue;
            };
        };
    });

    //set mean
    var mean = (max + min) / 2;

    //return values as an object
    return {
        max: max,
        mean: mean,
        min: min
    };
};

//Update the legend with new attribute
function updateLegend(map, attribute){
    //create content for legend
    var year = attribute.split("_")[1];
    //var content = "Student Athletes in 20" + year;
    var content = "Student Athletes";

    //replace legend content
    $('#temporal-legend').html(content);
    
    //Example 3.8 line 43...get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);

    for (var key in circleValues){
        //get the radius
        var radius = calcPropRadius(circleValues[key]);

        //Step 3: assign the cy and r attributes
        $('#'+key).attr({
            cy: 119 - radius,
            r: radius
        });
        
         $('#'+ key + '-text').text(Math.round(circleValues[key]*100)/100 + " feet");
    };
};

//Create new sequence controls
/*function createSequenceControls(map, attributes){
    var SequenceControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        
        onAdd: function (map) {
            //create the control container div wiht a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');
            
            //create range input element (slider)
            $(container).append('<input class="range-slider" type="range">');
            $(container).append('<button class="skip" id="reverse">Previous Year</button>');
            $(container).append('<button class="skip" id="forward">Next Year</button>');
            $('#reverse').html('<img src="img/noun_560187_25.png"/>');
            $('#forward').html('<img src="img/noun_560188_25.png"/>');
            
            //kill any mouse event listeners on the map
            $(container).on('mousedown dblclick', function(e){
                console.log(e)
                //L.DomEvent.stopPropagation(e);
                e.stopImmediatePropagation();
            });
            
            return container;
        }
    });
    map.addControl(new SequenceControl());
};*/

function createSequenceControls(map, attributes){
        //create range input element (slider)
        $('#slider').append('<div class="yeartitle"> </div>');
        $('#slider').append('<input class="range-slider" type="range">');
        $('#slider').append('<button class="skip" id="reverse">Prev Year</button>');
        $('#slider').append('<button class="skip" id="forward">Next Year</button>');
        $('#reverse').html('<img src="img/noun_560187_25.png"/>');
        $('#forward').html('<img src="img/noun_560188_25.png"/>');

        //set slider attributes
        $('.range-slider').attr({
            max: 6,
            min:0,
            value:0,
            step:1
        });
    
        var year = "20" + attributes[0].split("_")[1]; 
            $('.yeartitle').html(year);
    
    //combine all these in a function

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
            
            var year = "20" + attributes[index].split("_")[1]; 
            $('.yeartitle').html(year);

            updatedPropSymbols(map, attributes[index]);
        });

    $('.range-slider').on('input', function(){
        var index = $(this).val();
        
    var year = attributes[index].split("_")[1]; 
    $('.yeartitle').html(year);

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
            createLegend(map, attributes);
        }
    });
};

$(document).ready(createMap);