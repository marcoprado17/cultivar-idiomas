function main(){
	$(".escolas-e-localizacao-nav-btn").addClass("active")
}

function initMap() {
	var mapDiv = document.getElementById('map');
	var myLatLng = {lat: -22.80990, lng: -45.19558};
	var map = new google.maps.Map(mapDiv, {
		center: myLatLng,
		zoom: 17
	});
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Cultivar Idiomas - Guarantinguetá'
	});

	var mapDiv2 = document.getElementById('map2');
	var myLatLng2 = {lat: -23.191471206803506, lng: -45.89032469999995};
	var map2 = new google.maps.Map(mapDiv2, {
		center: myLatLng2,
		zoom: 17
	});
	var marker2 = new google.maps.Marker({
		position: myLatLng2,
		map: map2,
		title: 'Cultivar Idiomas - São José dos Campos'
	});
}

main()