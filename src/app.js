import "jquery";
import "./style.scss";
import "bootstrap-loader";

$(document).ready(function() {
  //create a function to fetch movies
  function fetchMovies() {
    $.ajax({
      url:
        "https://api.themoviedb.org/3/search/movie?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&query=princess&include_adult=false&sort_by=created_at&page=1",
      success: function(payload) {
        console.log(payload);
        createPosters(payload.results);
        //call a function that passes an array to it
        //that function will iterate over the array, creating a div with it
        //child img tag, the src of which will be the poster_path
      }
    });
  }

  //create a function to fetch movies
  function fetchMovieDetails(movie, movieId) {
    console.log(movieId);
    let httpRequestUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=2434d246ec60c162a86db597467ef4ed";
    console.log(httpRequestUrl);
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=2434d246ec60c162a86db597467ef4ed`,
      success: movieDetails => {
        console.log(movieDetails);

        presentMovieDetailsModal(movie);
        //call a function that passes an array to it
        //that function will iterate over the array, creating a div with it
        //child img tag, the src of which will be the poster_path
      }
    });
  }

  //Present Modal for Movie!!!
  const presentMovieDetailsModal = movie => {
    $(".modal-title:first").text(movie.title);
    $(".movieDetails-overview:first").text(movie.overview);
    $(".movieDetails-img:first").attr(
      "src",
      "https://image.tmdb.org/t/p/w500/" + movie.poster_path
    );
    $(".movieDetails-tagline:first").text(movie.tagline);
    $("#movieDetails-modal").modal("show");
  };

  let containerDiv = $("<div>").attr("class", "container");
  let rowDiv = $("<div>").attr("class", "row");

  //Create our function to build and display the posters
  function createPosters(moviesList) {
    moviesList.forEach(function(movie) {
      let movieColDiv = $("<div>").attr("class", "card col-md-3 m-3");
      let movieImage = $("<img>")
        .attr("src", "https://image.tmdb.org/t/p/w500/" + movie.poster_path)
        .attr("class", "card-img-top");

      let posterBody = $("<div>")
        .attr("class", "card-body")
        .append($("<h5>").html(movie.title))
        .append(
          $("<button>")
            .html("Details")
            .attr("class", "btn btn-info")
            .click(() => fetchMovieDetails(movie, movie.id))
        );

      movieColDiv.append(movieImage).append(posterBody);
      rowDiv.append(movieColDiv);
    });
  }
  rowDiv.appendTo(containerDiv);
  containerDiv.appendTo("body");
  fetchMovies();
});
