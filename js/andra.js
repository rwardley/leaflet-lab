//This creates the temporal slider
    function createSliderUI(timestamps){
        //puts the slider in the bottom left corner
        var sliderControl = L.control({ position: 'bottomleft'} );
        
        //creates a range slider 
        sliderControl.onAdd = function(map) {
            var slider = L.DomUtil.create("input", "range-slider");
            //stops click behavior from being propagated by leaflet map
            L.DomEvent.addListener(slider, 'mousedown', function(e) {
                L.DomEvent.stopPropagation(e);
            });

            //defines the slider and its functionalities
            $(slider)
                .attr({'type':'range',
                    'max': timestamps.length-2,
                    'min': 0,
                    'step': 1,
                    'value': 0
                 //when on the prop symbols update and the year is changed on the slider
                 }).on('input', function() {
                   updatePropSymbols($(this).val());
                   $('.temporal-legend').text(timestamps[this.value]);
                    //calls minmax function
                    createMinMax(citiesMin, citiesMax);
            });
            //returns the slider
            return slider;
        }
        //adds slider to map and creates a temporal legend
        sliderControl.addTo(map);
        createTemporalLegend(timestamps[0]);  
    } //end sliderUI

    //updates and makes the legend temporal
    function createTemporalLegend(startTimestamp) {
        
        //adds legend to bottom left 
        var temporalLegend = L.control({ position: 'bottomleft'});
        
        //creates the output and returns the output 
        temporalLegend.onAdd = function(map) {
            var output = L.DomUtil.create("output", "temporal-legend");
            $(output).text(startTimestamp);
            return output;
        }

        //returns temporal legend to map
        
        temporalLegend.addTo(map);
    } //end createTemporalLegend
    
      //this function creates the legend for the map
    function createLegend(min, max){
        
        //resize symbols for visibility
        if (min < 5){
            min=5;
        }
        
        //rounds the numbers for the legend
        function roundNumber(inNumber){
            return (Math.round(inNumber/1) * 1); 
        }
        
        //creates and puts the legend in the top right
        var legend = L.control({position: "topleft"});

        //when the legend is created, the different parts of the legend are created
        legend.onAdd = function(map) {
            var legendContainer = L.DomUtil.create("div", "legend");
            var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
            var classes = [roundNumber(min)];
            var legendCircle;
            var lastRadius = 0;
            var currentRadius;
            var margin;           

            //stops clicks from editing the map in this section
            L.DomEvent.addListener(legendContainer, 'mousedown', function(e){
                L.DomEvent.stopPropagation(e);
            });

            //adds a legend label
            $(legendContainer).append("<h4 id='legendTitle'>Funded Projects</h4><center><i>per year</center></i><br>");
            
            //creates the legend circles for the classes that we created above 
            
            for (var i = 0;i <= classes.length-1; i++){
                //creates the legend circle
                legendCircle = L.DomUtil.create("div", "legendCircle");
                //calculates the radius for each of the legend circles
                currentRadius = calcPropRadius(classes[i]);
                //creates a margin for each legend class
                margin = -currentRadius - lastRadius - 2;

                //creates the sizes
                $(legendCircle).attr("style", "width: " + currentRadius*2 + "px; height: " + currentRadius*2 + "px; margin-left: " + margin + "px");
                
                //adds the description to the legend
                $(legendCircle).append("<span class='legendValue'>" + classes[i] + "</span>");
                
                //the legend circle is appended to the symbols container
                $(symbolsContainer).append(legendCircle);
                
                //sets the radius used to be the old radius for next class circle
                lastRadius = currentRadius;
            }
            
            //the symbol container is appended to the  legend container 
            $(legendContainer).append(symbolsContainer);
            
            //returns the legend container
            return legendContainer;

        };
        
        //adds legend to map
        legend.addTo(map);
        
    }; 
    
    //end createLegend

//Stephen's code
// create legend
function createLegend(my_map, attributes) {
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function(my_map) {
            var container = L.DomUtil.create('div', 'legend-control-container');
            $(container).append('<div id="temporal-legend">')

            var svg = '<svg id="attribute-legend" width="190px" height="90px">';
            // var circles = ['max', 'mean', 'min'];
            var circles = {
                max: 20,
                mean: 40,
                min: 60
            };

            for (var circle in circles) {
                console.log(circle);
                svg += '<circle class="legend-circle" id="' + circle + 
                '" fill="#ff7800" fill-opacity="0.8" stroke="#000000" cx="32"/>';
                svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
            };
            svg += "</svg>";

            $(container).append(svg);

            return container;
        }
    });

    my_map.addControl(new LegendControl());
    getLegendInput(my_map, attributes[0]);
};
