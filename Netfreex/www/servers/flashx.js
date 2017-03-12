﻿function flashxExtract(id, success, error) {

    var page_url = "https://www.flashx.to/" + id + ".html";
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");

    cordovaHTTP.get(page_url, {}, {}, function(response) {
        console.log(response);

        var content = response.data;

        var fname = content.split("fname\" value=\"")[1].split("\"")[0];
        var hash = content.split("hash\" value=\"")[1].split("\"")[0];
        var file_id = content.match("'file_id', '([^']+)'")[1];

        var coding_url = 'https://files.fx.fastcontentdelivery.com/jquery2.js?fx=' + window.btoa(file_id);
        cordovaHTTP.setHeader("Host", "files.fx.fastcontentdelivery.com");
        cordovaHTTP.setHeader("Referer", "https://www.flashx.tv/");
        cordovaHTTP.setHeader("Accept", "*/*");
        cordovaHTTP.get(coding_url, {}, {}, function(response) {}, function(response) {});
        coding_url = 'https://www.flashx.tv/counter.cgi?fx=' + window.btoa(file_id);
        cordovaHTTP.setHeader("Host", "www.flashx.tv");
        cordovaHTTP.get(coding_url, {}, {}, function(response) {}, function(response) {});
        coding_url = 'https://www.flashx.tv/flashx.php?fxfx=3';
        cordovaHTTP.setHeader("X-Requested-With", "XMLHttpRequest");
        cordovaHTTP.get(coding_url, {}, {}, function(response) {}, function(response) {});

        //try {
        //    var wait_time = content.match(/<span id='xxc2'>(\d+)/g)[0].split("<span id='xxc2'>")[1];
        //    setTimeout(function() {
        //        doPostRequest(id, fname, hash);
        //    }, parseInt(wait_time) + 1);
        //} catch (e) {
            setTimeout(function() {
                doPostRequest(id, fname, hash);
            }, 6000);
        //}

    }, function(response) {
        error(response);
    });
    
    function doPostRequest(id, fname, hash) {
        cordovaHTTP.setHeader("Content-Type", "application/x-www-form-urlencoded");
        cordovaHTTP.post("https://www.flashx.tv/dl?playthis", {
            op: "download1",
            usr_login: "",
            id: id,
            fname: fname,
            referer: "",
            hash: hash,
            imhuman: "Proceed+to+video"
        }, {}, function (response) {

            var content = response.data.split("download_div2")[1];

            content = content.split("eval(function")[1].split("</script>")[0];
            content = "eval(function" + content;

            //UNPACK
            var url = unpack(content);

            success(url);

        }, function (response) {
            error(response);
        });
    }


}
