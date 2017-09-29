window.onload = function() {
    var Wiki = {
        searcherField: document.querySelector(".searchText"),
        blinker: document.querySelector("span"),
        searchForm: document.querySelector("#searchForm"),
        results: document.getElementById("results"),
        urlAdress: "https://en.wikipedia.org/w/api.php",
        nothingFound: '<div class="box"><h2>Nothing found...</h2></div>',
        writeSomething: '<div class="box"><h2>Write something in the search field...</h2></div>',
        clearBody: function() {
            this.results.innerHTML = "";
        }
    }




    function focusBlink() {
        Wiki.searcherField.addEventListener("focus", function() {
            Wiki.clearBody();
            Wiki.searcherField.classList.toggle("searchActive");
            Wiki.blinker.classList = "blink";
        });

    };

    function submitForm(e) {
        e.preventDefault();
        Wiki.clearBody();
        Wiki.searcherField.blur();
        if (Wiki.searcherField.value === "") {
            Wiki.results.innerHTML = Wiki.writeSomething;
        } else {
            $.ajax({
                url: Wiki.urlAdress,
                data: { action: 'query', list: 'search', srsearch: Wiki.searcherField.value, format: 'json' },
                dataType: "jsonp",
                success: function(response) {
                    var resLen = response.query.search.length;
                    if (resLen === 0) {
                        Wiki.results.innerHTML = Wiki.nothingFound;
                        console.log(response.query.search.length);
                    };
                    for (var i = 0; i < resLen; i++) {
                        Wiki.results.innerHTML += '<div class="box"><h2>' + response.query.search[i].title + '</h2><p>' + response.query.search[i].snippet + ' ' + '<a target="_blank" href=https://en.wikipedia.org/?curid=' + response.query.search[i].pageid + ' >Read in Wikipedia</a>' + '</p></div>';
                    }
                }
            })
        }

        Wiki.blinker.classList.remove("blink");
        Wiki.searcherField.classList.add("searchText");
        Wiki.searcherField.classList.remove("searchActive");
    }

    function getData() {
        Wiki.searchForm.addEventListener("submit", submitForm);
        window.addEventListener("keyup", function(e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                submitForm(e);
                Wiki.searcherField.blur();
                console.log("pressed enter");
            }
        })

    };
    focusBlink();
    getData();


};