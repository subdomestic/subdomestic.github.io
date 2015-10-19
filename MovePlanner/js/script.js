
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();

    $greeting.text('So, you want to live at '+ street + ', ' + city + '?');
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ', ' + city + '">');

    //NYTimes AJAX Request
    var URL = 'http://api.nytimes.com/svc/search/v2/articlesearch.response-format?[fq=source: ("The New York Times") AND glocations:("' + city +'")]&api-key=e0dc8045735f44290d7d0aef6cd0343c:1:73254831';
    $.getJSON( URL, function( data ) {
     var items = [];
     /*$.each( data, function( key, val ) {
       items.push( "<li id='" + key + "'>" + val + "</li>" );
     });
 
      $( "<ul/>", {
       "class": "my-new-list",
       html: items.join( "" )
     }).appendTo( "body" );*/
    console.log(data);
    });


    return false;
};

$('#form-container').submit(loadData);
