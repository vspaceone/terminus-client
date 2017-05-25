var jQuery = require('jquery');
var $ = jQuery;

//################################################################
// Connector to a terminus server
//################################################################

var serverAddress = "http://localhost:8000"

function getUserByUID(uid, func){
    $.get(serverAddress + "/get/user?uid=" + encodeURI(uid),
    function(data, status){
        var ret = JSON.parse(data)
        func(ret.status, ret.data)
    })
}
exports.getUserByUID = getUserByUID