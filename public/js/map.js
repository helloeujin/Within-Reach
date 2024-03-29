// lab
L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

// color: examples.map-i86nkdio
// grey: examples.map-20v6611k
// satellite: examples.map-2k9d7u0c
// white: examples.map-8ced9urs'

var map = L.map('map', {
	minZoom: 11,
	maxZoom: 16
	// zoomControl: false
}).setView([42.3133735 + 0.0, -71.0571571 - 0.04], 12);

var baseLayer = L.mapbox.tileLayer('senseable.kakb3n74');
baseLayer.setOpacity(0.9);
baseLayer.addTo(map);

var blockLayer = L.mapbox.featureLayer();
var firstLayer = L.mapbox.featureLayer();
var secondLayer = L.mapbox.featureLayer();

var busRouteLayer = L.mapbox.tileLayer('senseable.bf7jh5mi');
busRouteLayer.setOpacity(0.5);

var bikeStationLayer = L.mapbox.tileLayer('senseable.r98gp66r');
bikeStationLayer.setOpacity(0.9);

var markerLayer = L.mapbox.featureLayer();

var tempMarker = L.circle([ 0, 0 ], 140, { // 60
    color: '#fff',
    opacity: 1,
    weight: 0,
    fillOpacity: 0.85
}).addTo(markerLayer);

var tempLayer = L.mapbox.featureLayer();

var firstLayerStyle = { // blue: bus + walking

	fillColor: '#0361FB', // blue
	// fillOpacity: 0.8,
	fillOpacity: 0.46,
	color: '#0361FB',
	opacity: 1,
	weight: 1
};

var secondLayerStyle = { // light blue: bus + walking + "bike"

	fillColor: '#6DF7F2', // light blue
	fillOpacity: 0.2,
	color: '#6DF7F2',
	opacity: 1,
	weight: 0.3
};

var tempLayerStyle = { // light blue: bus + walking + "bike"

	fillColor: '#6DF7F2', // light blue
	fillOpacity: 0,
	color: '#6DF7F2',
	opacity: 0,
	weight: 1
};

queue()
	// .defer(d3.json, "bostonBlocks.geojson") // 7412
	.defer(d3.json, "bostonFinal.geojson") // 7412
	.defer(d3.csv, "bus_5_table.csv")
	.defer(d3.csv, "bike_5_table.csv")
	// .defer(d3.json, "hubwayStation.geojson") // 142 -> available for loading
 	// .defer(d3.json, "busRoutes.geojson") // 765
	// .defer(d3.json, "busStops.geojson") // 7678
	// .defer(d3.json, "CDD_ZoningDistricts.geojson")
	.await(ready);


function ready(error, boston, bus_area, bike_area) {

	busArea = bus_area;
	bikeArea = bike_area;

	L.geoJson(boston, {

		onEachFeature: onEachFeature
	}).addTo(blockLayer); 

	blockLayer.addTo(map);
	markerLayer.addTo(map);

	initialSelect();
}

