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
    $('#slider').append('<button class="skip" id="reverse">Previous Year</button>');
    $('#slider').append('<button class="skip" id="forward">Next Year</button>');
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