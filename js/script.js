
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
    var streetStr=$('#street').val();
    var cityStr=$('#city').val();
    var address = streetStr + ',  '+cityStr;

$greeting.text('So, you want to live at ' + address + '?') ;
var backgroundimage_url = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+address;
    console.log(backgroundimage_url);
$body.append('<img class="bgimg" src="' +backgroundimage_url+ '"/>');
 var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+cityStr+"&format=json";

    var wikiresp = $.ajax(wikiurl,
        {"dataType":"jsonp",
         "success":function(data){
            var header = $("#wikipedia-header");
            header.text("Articles From" + data[0]);
            for (each in data[1]){
                $("#wikipedia-links").append("<li><a href="+data[3][each]+">"+data[1][each]+"</a></li>");
            }
            
         }}).error(function(e){
            $wikiElem.text('wiki element does not show');
         }
         );
return false;
};

$('#form-container').submit(loadData);
