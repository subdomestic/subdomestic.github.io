var googleSuccess = function(){
//List of locations
var LOCATIONS = [{
        name: 'Bolívar Square',
        latitude: 4.5981259,
        longitude: -74.0782322,
        description: 'Main square in downtown. Here you can find the mayor, capitol and the main Cathedral',
        marker: ''
    },
    {
        name: 'Gold Museum',
        latitude: 4.5982801,
        longitude: -74.0772751,
        description: 'Museum that displays the gold used by aborigins in Colombia',
        marker: ''
    },
    {
        name: 'Colombian National Museum',
        latitude: 4.6154977,
        longitude: -74.0704757,
        description: 'Museum that displays the history of the country',
        marker: ''
    },
    {
        name: 'Planetarium of Bogota',
        latitude: 4.6120873,
        longitude: -74.0709737,
        description: 'Astrology musem',
        marker: ''
    },
    {
        name: 'Monserrate Sanctuary',
        latitude: 4.6012648,
        longitude: -74.0671971,
        description: 'One of the main atractions of the city where you can find a church at the top of a mountain',
        marker: ''
    }
];

var MyViewModel = function() {
    //Scope for View Model
    var self = this;
    //Create map
    self.map = new google.maps.Map(document.getElementById("map-div"), {
        center: new google.maps.LatLng(4.6063134, -74.0753201),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //Create an empty array to manipulate places
    self.allLocations = [];
    LOCATIONS.forEach(function(Item){
        self.allLocations.push(new Place(Item));
    });
    //Create a single infoWindow Object to avoid multiple infowindows open at the same time
    self.infoWindow = new google.maps.InfoWindow();
    //Add a map marker for every location
    self.allLocations.forEach(function(Item){
    //Actions when an element is clicked
        Item.marker.addListener('click', function toggleBounce() {
                    //Create a computed observable to display infoWindow Content. It will update according to list/marker item that is clicked.
                   var infoContent = ko.computed(function(){
                        return "<div class='infoBox text-center row'>" + "<h1>" + Item.name + "</h1>" + "<h4>" + Item.description + "</h4>" + "<div><h3>Wikipedia Articles:</h3></div><div id='content'></div>" + Item.wikiContent() + "</div>";
                   }, self);
                   self.infoWindow.setContent(infoContent());
                   //Call wikipedia API
                   Item.wikiApi();
                   //Update wikipedia articles
                   infoContent.subscribe(function() {
                        self.infoWindow.setContent(infoContent());
                    });

                   self.infoWindow.open(self.map, Item.marker);
                   closeMenu();
                    //Markers animations
                    if (Item.marker.getAnimation() !== null) {
                        Item.marker.setAnimation(null);
                    } else {
                        Item.marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    setTimeout(function() {
                        Item.marker.setAnimation(null);
                    }, 1400);
        });

    });
    //Create an observable array for visible Items on the map
    self.visibleItems = ko.observableArray();
    //All locations are visible in the begining
    self.allLocations.forEach(function(Item){
        self.visibleItems.push(Item);
    });
    //User input
    self.query = ko.observable('');
    //Look for the name of the location in the stored locations. If found the location will remain visible, otherwise it will be hidden
    self.filterLocations = function(){
            var userInput = self.query().toLowerCase();
            self.visibleItems.removeAll();
            // Look for the location name through the stored locations. If found, it remains visible
            self.allLocations.forEach(function(Item) {
                Item.marker.setMap(null);
                if (Item.name.toLowerCase().indexOf(userInput) !== -1) {
                    self.visibleItems.push(Item);
                }
            });
            self.visibleItems().forEach(function(Item) {
                Item.marker.setMap(self.map);
            });
    };

    //Place object to store and manipulare all the locations
    function Place(data){
        var selfp = this; // scope for Place
        this.name = data.name;
        this.lat= data.latitude;
        this.long = data.longitude;
        this.description = data.description;
        this.wikiContent = ko.observable("searching...");
        //Marker options
        var content = '<div class="infoBox text-center row">' + '<h1>' + this.name + '</h1>' + '<h4>' + this.description + '</h4>' + "<div><h3>Wikipedia Articles:</h3></div><div data-bind='text: wikiContent' id='content'></div>" + '</div>';
        var latLng = new google.maps.LatLng(this.lat, this.long);
        var markerOptions = {
            map: self.map,
            position: latLng,
            draggable: false,
            animation: google.maps.Animation.DROP,
            content: content
        };
        this.marker = new google.maps.Marker(markerOptions);
        this.openWindow = function() {

              var infoContent = ko.computed(function(){
                    return "<div class='infoBox text-center row'>" + "<h1>" + selfp.name + "</h1>" + "<h4>" + selfp.description + "</h4>" + "<div><h3>Wikipedia Articles:</h3></div><div id='content'></div>" + selfp.wikiContent() + "</div>";
               }, selfp);
               self.infoWindow.setContent(infoContent());
                    infoContent.subscribe(function() {
                    self.infoWindow.setContent(infoContent());
                });

               self.infoWindow.open(self.map, selfp.marker);
                this.wikiApi();
                if (selfp.marker.getAnimation() !== null) {
                    selfp.marker.setAnimation(null);
                } else {
                    selfp.marker.setAnimation(google.maps.Animation.DROP);
                }
        closeMenu();
    };

    }
    //Wikipedia API using AJAX
    Place.prototype.wikiApi = function() {
                var self = this;
                var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.name + '&format=json&callback=wikiCallback';
                $.ajax({
                    url: wikiUrl,
                    dataType: "jsonp",
                    //jsonp: "callback",
                    success: function(response) {
                        var articleList = response[1];
                        var i;
                        var articleStr;
                        var url;
                        var list = "";

                        for (i = 0; i < articleList.length; i += 1) {
                            articleStr = articleList[i];
                            url = 'http://en.wikipedia.org/wiki/' + articleStr;
                            list = list + "<li class='text-center'><a href='"+ url + "'>" + articleStr + "</a></li>"
                            self.wikiContent(list);
                        }
                    }
                }).fail(function(){
                           self.wikiContent("<p>Failed to get Wikipedia resources.</p>");
                });
        }

};
ko.applyBindings(new MyViewModel());
};

