var roverIcon = L.icon({
    iconUrl: 'roverIcon.png',
    iconSize:     [100, 100],
    iconAnchor:   [50, 93],
	popupAnchor:   [0, -82]
});

var ColorIcon = L.Icon.extend({
    options: {
        shadowUrl: 'leaflet/images/marker-shadow.png',
        iconSize:     [80, 80],
        shadowSize:   [41, 41],
        iconAnchor:   [40, 72],
        shadowAnchor: [13, 40],
        popupAnchor:  [0, -60]
    }
});

var iconNum = 1
var iconArr = [new ColorIcon({iconUrl: 'Markers/.png'}),
	new ColorIcon({iconUrl: 'Markers/2.png'}),
	new ColorIcon({iconUrl: 'Markers/3.png'}),
	new ColorIcon({iconUrl: 'Markers/4.png'}),
	new ColorIcon({iconUrl: 'Markers/5.png'}),
	new ColorIcon({iconUrl: 'Markers/6.png'}),
	new ColorIcon({iconUrl: 'Markers/7.png'}),
	new ColorIcon({iconUrl: 'Markers/8.png'})];

var markers = [];
var lati = 43.46;
var longi = -80.52;
var map;

function updatePos(){
	lati +=0.0001;
	longi +=0.0001;
	if(document.getElementById("followBox").checked){
		map.setView([lati, longi], 16);
	}
}

function changePos(marker){
	updatePos();
	marker.setLatLng(new L.LatLng(lati, longi)); 
}

function init(){
	// initialize the map
	map = L.map('map').setView([lati, longi], 13);
	// load a tile layer
	//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?').addTo(map);
	L.tileLayer('../../Tiles/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	var marker = L.marker([lati, longi], {icon: roverIcon}).addTo(map);
	var intervalID = setInterval(function(){changePos(marker);}, 100);
	return map;
}

function addMarker(){
	iconNum %= 8;
	iconNum ++;
	var lat = document.getElementById("LatF").value;
	var long = document.getElementById("LongF").value;
	var description = prompt("Marker Description");
	var marker = L.marker([lat,long], {icon: iconArr[iconNum], draggable: true, riseOnHover: true}).addTo(map).bindPopup("<b><center>"+description+"</b></center>Lat: " + lat + ", Long:" + long).openPopup();
	markers.push(marker);
	marker.dragging.enable();
	marker.on('dragend', function (e){
		marker.bindPopup("<b><center>" + description + "</b></center>Lat: " + marker.getLatLng().lat + ", Long:" + marker.getLatLng().lng);
	});
}