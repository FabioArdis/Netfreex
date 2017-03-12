function parsePage(html, url, isSerieTv, section, nextPage, callback) {
    arrayFilm = [];
    var articoli = html.split('article')
    for (var i = 1; i < articoli.length; i = i + 2) {
        var movie = {
            title: articoli[i].split('title="')[1].split('"')[0],
            img: articoli[i].split("echo=\"")[1].split('"')[0],
            url: articoli[i].split('href="')[1].split('"')[0]
        };
        arrayFilm.push(movie);
    }

    //Prossima pagina
    var patt = new RegExp('<a class="next page-numbers" href="(.*)">', 'gi');
    while (res = patt.exec(html)) {
        console.log(res[1])
        arrayFilm.push(res[1])
    }

    console.log(arrayFilm)
    printPage(isSerieTv, section, nextPage, callback);
}

function parseMostPopular(html, url, isSerieTv, section, callback)
{
    arrayFilm = [];
    var articoli = html.split('thumb_series');

    var start;
    if (isSerieTv)
        start = 1;
    else
        start = 10;
    for (var i = start; i < articoli.length; i++) {
        var movie = {
            title: articoli[i].split('title="')[1].split('"')[0],
            img: "http:" + articoli[i].split("pagespeed-lazy-src=\"")[1].split('"')[0].replace('http:', ''),
            url: articoli[i].split('href="')[1].split('"')[0]
        };

        arrayFilm.push(movie);

        if (i == 9)
            break;
    }
    console.log(arrayFilm)
    printPage(isSerieTv, section,null, callback)
}

function parseMoviePage(html, url, isSerieTv) {
    if (!isSerieTv) {
        manageMovieLinks(html);

        $('.guarda').removeClass('hidden');
        $('#playButton').removeClass('hidden');
        $('#loadingLink').addClass('hidden');

    } else {
        //Levo la roba che non serve
        html = html.split('entry-content')[1].split('disqus_thread')[0];

        var regexStagione = '(STAGIONE.*ITA)(?:<?|\W*\n)';

        manageSerieTvLinks(html, regexStagione);
    }
}

function search() {
    var input = encodeURI($('#search').val());

    var url = "http://www.italia-film.co/?s=" + input;

    openPage(url, $('#serieTv').prop('checked'), 'searchResultContainer', false, true);
}

var sections = [
    "movieMostPopularSliderContainer",
    "serieTvMostPopularSliderContainer",
    "movieSliderContainer",
    "serieTvSliderContainer"
];


    //ITALIAFILM
    //Most popular
    openPage("http://www.italia-film.gratis/category/film-streaming-2017/", false, 'movieMostPopularSliderContainer', true, null, function() {     
    });
    openPage("http://www.italia-film.gratis/category/film-streaming-2017/", true, 'serieTvMostPopularSliderContainer', true, null, function () {
    });

    //Ultime uscite
    openPage("http://www.italia-film.gratis/category/film-streaming-2017/", false, 'movieSliderContainer', false);
    openPage("http://www.italia-film.gratis/category/serie-tv/", true, 'serieTvSliderContainer', false);


