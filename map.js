lati = 43.46;
longi = -80.52;

function updatePos(){
	lati +=0.001;
	longi +=0.001;
}

function changePos(marker){
	updatePos();
	marker.setLatLng(new L.LatLng(lati, longi)); 
}

function init(){
	// initialize the map
	var map = L.map('map').setView([lati, longi], 13);
	// load a tile layer
	//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	L.tileLayer('Tiles/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	var marker = L.marker([lati, longi + 0.01]).addTo(map);
	var intervalID = setInterval(function(){changePos(marker);}, 100);
	return map;
}