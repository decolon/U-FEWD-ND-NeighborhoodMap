var locations = [
	{title: 'Golden Gate Bridge', location: {lat: 37.8199 , lng: -122.4783}},
	{title: 'Golden Gate Park', location: {lat: 37.7694, lng: -122.4862}},
	{title: 'Lands End', location: {lat: 37.7797, lng: -122.5116}},
	{title: 'Legion Of Honor', location: {lat: 37.7845, lng: -122.5008}},
	{title: 'Palace of Fine Arts', location: {lat: 37.8021, lng: -122.4488}},
	{title: 'Japantown', location: {lat: 37.7854, lng: -122.4294}},
	{title: 'Ferry Building', location: {lat: 37.7956, lng: -122.3933}},
	{title: 'Fisherman\'s Wharf', location: {lat: 37.8080, lng: -122.4177}},
	{title: 'AT&T Park', location: {lat: 37.7786, lng: -122.3893}},
	{title: 'Castro Theater', location: {lat: 37.7621, lng: -122.4350}}
];

var ViewModel= function() {
	var self = this;
	self.textField = ko.observable("");
	self.textField.subscribe( function(newVal) {
		var toClear = markers.filter( function(marker) {
			return !marker.title.toUpperCase().startsWith(newVal.toUpperCase());
		});
		var toReveal = markers.filter( function(marker) {
			return marker.title.toUpperCase().startsWith(newVal.toUpperCase());
		});	

		toClear.forEach(function (marker) {
			if (marker.map !== null)
				marker.setMap(null);
		});
		toReveal.forEach(function(marker) {
			if (marker.map === null)
				marker.setMap(map);
		});
	});

	self.filteredList = ko.computed( function() {
		return locations.filter( function(location) {
			return location.title.toUpperCase().startsWith(self.textField().toUpperCase());
		});
	});

	self.onClick = function(clickedLocation) {
		var toSelect = markers.find( function(marker) {
			return marker.title === clickedLocation.title;
		});
	    toSelect.defaultIcon = makeMarkerIcon('ffffff');
        toSelect.setIcon(makeMarkerIcon('ffffff'));
		populateInfoWindow(toSelect, toSelect.infoWindow);
	}
}

ko.applyBindings( new ViewModel() );
