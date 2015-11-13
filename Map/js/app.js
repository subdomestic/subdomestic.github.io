var locations = [{
        name: 'Plaza de Bolívar',
        latitude: 4.5981259,
        longitude: -74.0782322,
        description: 'Presidencia'
    },
    {
        name: 'Museo del 20 de Julio',
        latitude: 4.5982801,
        longitude: -74.0772751,
        description: 'https://www.flickr.com/photos/bigtallguy'
    },
    {
        name: 'Museo Nacional',
        latitude: 4.6154977,
        longitude: -74.0704757,
        description: 'https://www.flickr.com/photos/bigtallguy'
    },
    {
        name: 'Planetario Distrital',
        latitude: 4.6120873,
        longitude: -74.0709737,
        description: 'https://www.flickr.com/photos/bigtallguy'
    },
    {
        name: 'Monserrate',
        latitude: 4.6012648,
        longitude: -74.0671971,
        description: 'https://www.flickr.com/photos/bigtallguy'
    }
];

var place = function(data){

    this.name = ko.observable(data.name);
    this.lat= ko.observable(data.latitude);
    this.long = ko.observable(data.longitude);
    this.description = ko.observable(data.description);

    this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.lat, this.long),
    animation: google.maps.Animation.DROP
  });
}

//global for map
var map;

$(document).ready(function () {
   
   //loadMap();
   //ko.applyBindings(viewModel);
});

function MyViewModel() {
    var self = this;
    
    this.locationsList = ko.observableArray([]);

    locations.forEach(function(Item){
        self.locationsList.push(new place(Item));
    });
}

function loadMap() {
        map = new google.maps.Map(document.getElementById("map-div"), {
        center: new google.maps.LatLng(4.6063134, -74.0753201),
         zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
/*
    locations.forEach(function(Item){
        displayMarker(Item.latitude, Item.longitude);
    });
*/
}

function displayMarker(lat, long){
    var position = new google.maps.LatLng(lat, long);

    var marker = new google.maps.Marker({
        map: map,
        position: position
    });
}

/*
ko.bindingHandlers.map = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {


                //var position = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());

                    locations.forEach(function(Item){
                         displayMarker(Item.latitude, Item.longitude);
                     });

                viewModel._mapMarker = marker;
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var latlng = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());
                viewModel._mapMarker.setPosition(latlng);

            }
        };

*/
ko.applyBindings(new MyViewModel());