var locations = [{
        name: 'Plaza de Bolívar',
        latitude: 4.5981259,
        longitude: -74.0782322,
        description: 'Presidencia',
        marker:  1
    },
    {
        name: 'Museo del 20 de Julio',
        latitude: 4.5982801,
        longitude: -74.0772751,
        description: 'https://www.flickr.com/photos/bigtallguy',
        marker: 1
    },
    {
        name: 'Museo Nacional',
        latitude: 4.6154977,
        longitude: -74.0704757,
        description: 'https://www.flickr.com/photos/bigtallguy',
        marker: 1
    },
    {
        name: 'Planetario Distrital',
        latitude: 4.6120873,
        longitude: -74.0709737,
        description: 'https://www.flickr.com/photos/bigtallguy',
        marker: 1
    },
    {
        name: 'Monserrate',
        latitude: 4.6012648,
        longitude: -74.0671971,
        description: 'https://www.flickr.com/photos/bigtallguy',
        marker: 1
    }
];

var place = function(data){

    this.name = ko.observable(data.name);
    this.lat= ko.observable(data.latitude);
    this.long = ko.observable(data.longitude);
    this.description = ko.observable(data.description);
    this.marker = ko.observable(data.marker);

}

//global for map and markers
var map, markers;

var MyViewModel = function() {
    var self = this;
    var locationsList = ko.observableArray([]);
    filter = ko.observable("");

     map = new google.maps.Map(document.getElementById("map-div"), {
        center: new google.maps.LatLng(4.6063134, -74.0753201),
         zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    locations.forEach(function(Item){
        locationsList.push(new place(Item));
        Item.marker = displayMarker(Item.latitude, Item.longitude);
    });

    console.log("mark" + locationsList());

    filteredItems = ko.dependentObservable(function() {

        var filter = parent.filter().toLowerCase();
        var filteredList = ko.observableArray([]);
        console.log("a" + filter);
        if (!filter) {
            return locationsList();
        } else {
            return ko.utils.arrayFilter(locationsList(), function(item) {
                return ko.utils.stringStartsWith(item.name().toLowerCase(), filter)
            });
        }
}, self);
    
    filteredItems.subscribe(function(){
        console.log("Filtered Items!");
        console.log(filteredItems().length);
        //Comparar los arreglos, mostrar los que están ocultar los que no.
    ko.utils.arrayForEach(this, function(){
        this.marker = displayMarker(this.latitude, this.longitude); 
        console.log("m" + this.marker);
    })
    })
    
};


function loadMap() {
       /* map = new google.maps.Map(document.getElementById("map-div"), {
        center: new google.maps.LatLng(4.6063134, -74.0753201),
         zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    locations.forEach(function(Item){
        Item.marker = displayMarker(Item.latitude, Item.longitude);   
    });*/

}

function displayMarker(lat, long){
    var position = new google.maps.LatLng(lat, long);

    var marker = new google.maps.Marker({
        map: map,
        position: position
    });

    return marker
/*
    this.isVisible = ko.observable(false);

  this.isVisible.subscribe(function(currentState) {
    if (currentState) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });

  this.isVisible(true);*/
}

//I had the error message: utils.stringStartsWith is not a function and found the solution here https://groups.google.com/forum/#!topic/knockoutjs/y-oow7ZzLjo
  ko.utils.stringStartsWith = function (string, startsWith) {           
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        }

ko.applyBindings(new MyViewModel);