window.onload = function() {
    var Wiki = {
        searcherField: document.querySelector(".searchText"),
        blinker: document.querySelector("span"),
        searchButton: document.querySelector(".buttonSearch"),
        results: document.getElementById("results"),
        urlAdress: "https://en.wikipedia.org/w/api.php",
        nothingFound: '<div class="box"><h2>Nothing found...</h2></div>',
        clearBody: function() {
            this.results.innerHTML = "";
        }
    }




    function focusBlink() {
        Wiki.searcherField.addEventListener("focus", function(e) {
            e.preventDefault();
            Wiki.clearBody();
            Wiki.searcherField.classList.toggle("searchActive");
            Wiki.blinker.classList = "blink";
        });

    };

    function getData() {
        Wiki.searchButton.addEventListener("click", function(e) {
            e.preventDefault();
            Wiki.clearBody();
            $.ajax({
                url: Wiki.urlAdress,
                data: { action: 'query', list: 'search', srsearch: Wiki.searcherField.value, format: 'json' },
                dataType: "jsonp",
                success: function(response) {
                    var resLen = response.query.search.length;
                    if (resLen === 0) {
                        Wiki.results.innerHTML = nothingFound;
                        console.log(response.query.search.length);
                    };
                    for (var i = 0; i < resLen; i++) {
                        Wiki.results.innerHTML += '<div class="box"><h2>' + response.query.search[i].title + '</h2><p>' + response.query.search[i].snippet + ' ' + '<a target="_blank" href=https://en.wikipedia.org/?curid=' + response.query.search[i].pageid + ' >Read in Wikipedia</a>' + '</p></div>';
                    }
                }
            })
            Wiki.blinker.classList.remove("blink");
            Wiki.searcherField.classList.add("searchText");
            Wiki.searcherField.classList.remove("searchActive");
        });

    };

    getData();
    focusBlink();

};