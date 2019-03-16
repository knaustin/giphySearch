

$(document).ready(function () {

    var topics = ["cats", "dogs", "hamsters", "rabbits", "ferrets", "rats", "gerbils"]
    for (var i = 0; i < topics.length; i++) {
        var topicsBtn = $("<button>");
        topicsBtn.addClass("topics-button");
        topicsBtn.attr("data-type", topics[i]);
        topicsBtn.text(topics[i]);
        $(".buttons").append(topicsBtn);

        


    }
    $(document).on("click", ".topics-button", function (index, element) {
        $(".topics-button").removeClass("active");
        $(this).addClass("active");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-type")) + "&api_key=eYZgz2Piv6s1dog1i6tdAvoKr4rtVqzH&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data);
        var gifBox = $("<div>");
        gifBox.addClass("gif-box");
        var gifImg = $("<img>");
        gifImg.addClass("gif-img");
        gifImg.attr("src", response.data[index].embed_url);
        gifBox.append(gifImg);
        $(".gifs").append(gifBox);
    })
    });
});
