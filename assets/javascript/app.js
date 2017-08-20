alert("connected");
//selects anything with a tag of button
    $("button").on("click", function() {
      //assigning button attribute to the button set to data-person
      var person = $(this).attr("data-person");
      
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=4f140638c6744217b071e2e6b0d01ab8&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
      //got results back
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });