﻿(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gestire gli eventi di sospensione e ripresa di Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        document.addEventListener("backbutton", function (e) {
            goToHome(true);  
        }, false);
    };




    function onPause() {
        // TODO: questa applicazione è stata sospesa. Salvarne lo stato qui.
    };

    function onResume() {
        // TODO: questa applicazione è stata riattivata. Ripristinarne lo stato qui.
    };
})();

function openVideo(url) {
    $('#loading').removeClass('hidden');
    console.log(url);
    if (url.length < 6)
        extractLinkCineblog("http://swzz.xyz/link/" + url+"/");
    else
        nowvideo.extract(url, success, error);
}

var success = function (url) {
    $('#loading').addClass('hidden');
    console.log(url);
    VideoPlayer.play(url);
}

var error = function (ex) {
    $('#loading').addClass('hidden');
    console.log(ex);
    alert("Il link è offline");
}
