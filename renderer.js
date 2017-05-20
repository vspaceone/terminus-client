//################################################################
// All requires
//################################################################
var jQuery = require('jquery');
var $ = jQuery;
var SerialPort = require("serialport")

//################################################################
// tag reader part
//################################################################
var onTagRead = function(uid) {}
var port = new SerialPort("/dev/ttyUSB0", {
    baudRate: 115200,
    parser: SerialPort.parsers.readline('\r')
})

port.on('open', function() {
    console.log("Initializing")
    port.write("SRI SS 100\r")
    port.write("CNR INV ONT\r")
});

port.on('data', function(data) {
    if (data.toString().length == 16) {
        console.log("TAG! " + data)
        onTagRead(data)
    }
});

// open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message);
})

window.onbeforeunload = function() {
    //close tag, end readings etc
    console.log("onbeforeunload")
    port.write("BRK\r")
}

//################################################################
// User interface
//################################################################
onTagRead = function(uid) {
    console.log("Tag callback")
    showContentCard()
    animateLogo()
    setTimeout(function() { hideContentCard() }, 1500)
}

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

function showContentCard() {
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