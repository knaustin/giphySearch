

$(document).ready(function () {

    let topics = ["cats", "dogs", "hamsters", "rabbits", "ferrets", "rats", "gerbils"]
    let createButton = () => {
        
        $(topics).each(function () {
            let topicsBtn = $("<button>");
            topicsBtn.addClass("topics-button");
            topicsBtn.attr("data-type", this);
            topicsBtn.text(this);
            $(".buttons").append(topicsBtn);
        })
    }
    createButton();

    $("#searchGif").click(function (event) {
        event.preventDefault();
        $('.buttons').empty()
        console.log(this + "is clicked")

        let newTopic = $("#searchBar").val().trim();
        topics.push(newTopic);
        console.log(topics)
        createButton()
    });
});
$(document).on("click", ".topics-button", function (index, element) {
    $('.topicsSpace').empty();
    $(".topics-button").removeClass("active");
    $(this).addClass("active");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-type")) + "&api_key=eYZgz2Piv6s1dog1i6tdAvoKr4rtVqzH&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let results = response.data;
        console.log(results);

        $(results).each(function () {
            let rating = this.rating;
            const animated = this.images.fixed_height.url;
            const still = this.images.fixed_height_still.url;

            let gifBox = $('<div>');
            gifBox.addClass('col-4');
            let gifImg = $('<img>');
            gifImg.attr("src", still);
            gifImg.attr("data-still", still);
            gifImg.attr("data-animated", animated);
            gifImg.attr("data-state", "still");
            gifImg.addClass('topicgif');

            let textRating = $("<h2>").text("Rating: " + rating);
            gifBox.append(textRating)
            gifBox.append(gifImg)
            $('.topicsSpace').append(gifBox);
        })
    })
});

$(document).on("click", ".topicgif", function () {
    let state = $(this).attr("data-state");


    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated")
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
})


