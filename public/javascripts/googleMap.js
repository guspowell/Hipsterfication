var map;
var boroughsJson;
var colors = ["#FF9999", "#FF6666", "#FF3333", "#FF0000", "#CC0000", "#800000"];
// var colors = ["#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF4719", "#FF0000"];

function initialize() {

	var styles = [
		{
			"elementType": "labels",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"elementType": "geometry",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "road.highway",
			"stylers": [
				{ "color": "#dcedf1" },
				{ "weight": 0.6 }
			]
		},{
			"featureType": "road.arterial",
			"stylers": [
				{ "weight": 0.2 },
				{ "color": "#e6e6e7" }
			]
		},{
			"featureType": "water",
			"stylers": [
				{ "color": "#1D283D" }
			]
		},
	];

	map = new google.maps.Map(document.getElementById('map-canvas'), {
	zoom: 10,
	center: {lat: 51.51, lng: - 0.10}

	})

	map.setOptions({styles: styles});

	$.getJSON("/trendingIndex", function(data) {
		console.log(boroughsJson);
		boroughsJson = data;

		map.data.setStyle(function(feature){
			return {fillColor: intensity(boroughsJson[feature.k.name]), fillOpacity: 0.8, strokeColor: 'white',strokeWeight: 0.5};
		});

		map.data.addListener('mouseover', function(event) {
			map.data.revertStyle();
			map.data.overrideStyle(event.feature, {strokeWeight: 3});
		});

		map.data.addListener('click', function(event) {

			map.data.revertStyle();
			map.data.overrideStyle(console.log(event.feature),console.log(event.feature.k.name));
			$.ajax({
				url: 'https://api.instagram.com/v1/tags/' + event.feature.k.name.replace(/\s/g, '') +'/media/recent?client_id=89cc7d4644154c718cc5fb612e5da3cb;count=20',
				method: 'GET',
				dataType: 'jsonp',
				success: getInstagramImages
			})
		});

		map.data.addListener('click', function(event) {
			$('.borough-index').text(boroughsJson[event.feature.k.name]);
				console.log(typeof intensity(boroughsJson[event.feature.k.name]))
			$('.borough-index').css('color', intensity(boroughsJson[event.feature.k.name]))
		});

		map.data.addListener('click', function(event){
			$('.borough-name').text("#" + event.feature.k.name)
		});

		var getInstagramImages = function(data) {
			var imageArray = data.data;
			var urls = [];
			for(i in imageArray) {
				urls.push(imageArray[i].images.thumbnail.url)
			}
			var newImages = Mustache.render($('#instagram-images').html(), urls);
			console.log(urls);
			$(newImages).appendTo('.image-container');
			for(i = 0; i <= 20; i ++) {
				$('#image' + (i+1)).attr('src', urls[i])
			};
		}


	});

	var json = 'https://rawgit.com/jjlakin/compound-cities/master/greater-london/my-api.json'
	map.data.loadGeoJson(json);

};

var intensity = function(data) {
	if (data > 90) {
		return colors[5]
	}
	else if (data > 80 && data < 90) {
		return colors[4]
	}
	else if (data > 70 && data < 80) {
		return colors[3]
	}
	else if (data > 60 && data < 70) {
		return colors[2]
	}
	else if (data > 500 && data < 60) {
		return colors[2]
	}
	else {
		return colors[0]
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
