var jQuery = require('jquery');
var $ = jQuery;
var tagreader = require('./tagreader.js')
var terminus = require('./terminus.js')

//################################################################
// User interface
//################################################################

// set what to do when a tag is read
tagreader.setOnTagReadCallback(function(uid) {
    console.log("Tag callback")
    terminus.getUserByUID(uid, function(status, data){
        animateLogo()
        showContentCard(data.fullname)        
    })
    
})

// Make the logo green and gray again
function animateLogo() {
    console.log("animateLogo")
    $("#vspaceone_logo > g > path").css({
        fill: "rgb(8, 160, 89)",
        transition: "400ms"
    })

    setTimeout(function() {
        $("#vspaceone_logo > g > path").css({
            fill: "rgb(111, 121, 144)",
            transition: "400ms"
        })
    }, 2000)
}

function showContentCard(name) {
    // Fill the card with the users infos
    $("#content_card_title-heading")[0].innerText = "Hello " + name + "!"


    console.log("showContentCard")
    $("#content_card").css({
        top: "2%",
        transition: "500ms"
    })
}

function hideContentCard() {
    console.log("hideContentCard")
    $("#content_card").css({
        top: "100%",
        transition: "500ms"
    })
}
exports.hideContentCard = hideContentCard;

//################################################################
// SVG Replacer
//################################################################
jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});