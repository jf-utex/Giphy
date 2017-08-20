
//Global Variables//
var userClassic,
classic,
queryURL,
fixedHeightAnimate,
fixedHeightStill;


// ARRAY FOR BUTTONS

var classics = ["MASH 4077", "I Dream of Jeannie", "Gilligan's Island", "The Jetsons", "Mary Tyler Moore", "The Dukes of Hazard", "Growing Pains", "Facts of Life", "Alf", "Teenage Mutant Ninja Turtles"];


// FUNCTIONS


// RENDER BUTTONS FUNCTION
function renderButtons() {
    $(".buttons").empty();

    for (var i = 0; i < classics.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary classics");
        b.attr("data-name", classics[i]); // Adds a data-attribute
        b.text(classics[i]);
        $(".buttons").append(b);
    }
}

// ADD NEW USER-GENERATED BUTTON
function addNewButton() {
    userButtonVal = $("#new-show").val();
    classics.push(userButtonVal);  //add to end of array?
    // renderButtons();
    var nb = $("<button>");
    nb.addClass("btn btn-primary new-show");
    nb.attr("data-name", userButtonVal);
    nb.text(userButtonVal);
    $(".buttons").append(nb);
}

function getGifs() {
    $.ajax({ url: queryURL, method: 'GET' })
    .done(function(response) {
        for (var i = 0; i < response.data.length; i++) 
        {
            $(".gifs-display").append("<div class='img-div text-center'><img src='" + response.data[i].images.fixed_height_still.url + "'class='returnedGif' alt='Classic TV Gif' data-still=" + response.data[i].images.fixed_height_still.url + " data-animate=" + response.data[i].images.fixed_height.url + "><p>Rating: " + response.data[i].rating + "</p></div>");
            $(".returnedGif").attr("data-state", "still");
        }
        console.log(response);
    });
}


// CLICK LISTENER FOR ADD NEW USER BUTTON

$(".buttons").on("click", ".classics", function() {
    classics = $(this).attr("data-name");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + classics + "&limit=10&rating=pg&api_key=4f140638c6744217b071e2e6b0d01ab8";
    $(".gifs-display").empty();
    getGifs();
});

// CLICK LISTENER FOR ADD NEW USER BUTTON

$(".add-classic-btn").on("click", function(e) {
    e.preventDefault();
    addNewButton();
    $("#classics").val("");
});

// CLICK LISTENER FOR FETCHED GIFS TO PAUSE AND PLAY

$(".gifs-display").on("click", ".returnedGif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


//Run Program


renderButtons();