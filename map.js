var roverIcon = L.icon({
    iconUrl: 'roverIcon.png',
    iconSize:     [100, 100],
    iconAnchor:   [50, 93],
	popupAnchor:   [0, -82]
});

var ColorIcon = L.Icon.extend({
    options: {
		shadowUrl: 'Markers/shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
    }
});

var markerNum = 0;
var iconArr = [new ColorIcon({iconUrl: 'Markers/1.png'}),
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
	map = L.map('map').setView([lati, longi], 13);
	//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?').addTo(map);
	L.tileLayer('../../Tiles/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	var marker = L.marker([lati, longi], {icon: roverIcon}).addTo(map);
	var intervalID = setInterval(function(){changePos(marker);}, 100);
}

function addMarker(){
	var lat = document.getElementById("LatF").value;
	var long = document.getElementById("LongF").value;
	var description = prompt("Marker Description");
	if(description == null || description == ""){
		description = "Marker " + (markerNum + 1);
	}
	
	var geojsonFeature = {
        "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [lat,long]
        }
    }

    var marker;
    L.geoJson(geojsonFeature, {
        pointToLayer: function(feature, latlng){
            marker = L.marker([lat,long],{
				icon: iconArr[markerNum % 8],
                riseOnHover: true,
                draggable: true,
            }).bindPopup("<b><center>" + description + "</b></center>Lat: " + lat + ", Long:" + long +
			"<br><center><input type='button' value='Delete' class='marker-delete-button'/></center>");
            marker.on("popupopen", onPopupOpen);
            return marker;
        }
    }).addTo(map);
	marker.on('dragend', function (e){
		marker.bindPopup("<b><center>" + description + "</b></center>Lat: " + marker.getLatLng().lat + ", Long:" + marker.getLatLng().lng +
			"<br><center><input type='button' value='Delete' class='marker-delete-button'/></center>");
	});
	markers.push(marker);
	markerNum ++;
}

function onPopupOpen(){
    var tempMarker = this;
    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
}
