(function ($) {

    // initial stuff: create map and add base layer
    // Add base map
    var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });
    // Create map and set center and zoom.
    var map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: false,
        center: [42.06, -71.715],
        zoom: 9
    });
    // Add basemap to map.
    map.addLayer(baseLayer);

    // images for pins
    L.Icon.Default.imagePath = '/themes/custom/lightup/images/leaflet/';

    // need this for clustering
    var markerClusters = L.markerClusterGroup();

    // Add points
    function addDataToMap(data, map) {
        var dataLayer = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                var popupText = feature.properties.name;
                layer.bindPopup(popupText);
            }
        });
        // this is for no clustering
        // dataLayer.addTo(map);
        // this is for clustering
        markerClusters.addLayer( dataLayer );
    }
    // add districts
    function addDistrictsToMap(data, map) {
        var dataLayer = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                var popupText = feature.properties.REP_DIST;
                layer.bindPopup(popupText);
                // set style
                layer.setStyle({fillColor :'green', fillOpacity: 0.1, color : 'green', weight : 1});
                // this is just a test of if
                //if(feature.properties.REP_DIST == '1st Barnstable') {
                 //   layer.setStyle({fillColor :'red', fillOpacity: 1})
                //}
            }
        });
        dataLayer.addTo(map);
    }
    // get the lights data
    $.getJSON('/json-districts', function(data) {
        addDataToMap(data, map);
    });
    // get the districts data
    $.getJSON("/themes/custom/lightup/js/from_pat.geojson",function(data){
        //L.geoJson( data ).addTo(map);
        addDistrictsToMap(data, map);

    });

    map.addLayer( markerClusters );

})(jQuery);



