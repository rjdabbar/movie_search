$.MovieSearch = function (el) {
  this.$el = $(el);
  this.$form = this.$el.find("form");
  this.$results = this.$el.find("ul#results")
  this.$details = this.$el.find("div#details")
  this.bindEvents();
}

// Binds all the events that we expect to happen
$.MovieSearch.prototype.bindEvents = function () {
  this.$form.on("submit", this.search.bind(this));
  this.$el.on("click", "a.showDetails", this.detailSearch.bind(this));
  this.$el.on("click", "a.showDetails", this.toggleActive.bind(this));
  this.$el.on("click", "a.addFavorite", this.favorite.bind(this));
};

// Toggles the "active" class on the given list item that is being displayed
$.MovieSearch.prototype.toggleActive = function (e) {
  e.preventDefault();
  this.$results.children().removeClass("active");
  $(e.currentTarget).parent().addClass("active");
};

// Handles the AJAX request to search the omdbAPI
$.MovieSearch.prototype.search = function (e) {
  e.preventDefault();

  var title = $(e.currentTarget).find("input").val();
  var data = { s: title }
  $.ajax({
    method: "GET",
    url: "http://omdbapi.com/?",
    data: data,
    dataType: "json",
    success: this.renderResults.bind(this)
  });
};

// Renders the results of the search
$.MovieSearch.prototype.renderResults = function (data) {
  this.$results.empty();
  var results = data["Search"];
  results.forEach(this.generateResult.bind(this));
};

// Generates the HTML and adds to the view for each search result
$.MovieSearch.prototype.generateResult = function (movie) {
  var title, year;
  title = movie["Title"];
  year = movie["Year"];
  var $content = $("<div>")
                  .addClass("info")
                  .html("<h3>" + title + "</h3><h4>Released in: " + year + "</h4>");
  var $detailLink = $("<a>").addClass("showDetails link").html("Details");
  var $favoriteLink = $("<a>").addClass("addFavorite link").html("Favorite");
  var $li = $("<li>")
              .data("id", movie["imdbID"])
              .data("title", movie["Title"])
              .data("poster", movie["Poster"])
              .addClass("movie group")
              .append($content);
  $li.append($detailLink);
  $li.append($favoriteLink);
  this.$results.append($li);
}

// Renders the details of a selected movie
$.MovieSearch.prototype.renderDetails = function (movie) {
  this.$details.empty();
  var $ul = $("<ul>").addClass("details");

  for (var property in movie) {
    if ((movie.hasOwnProperty(property)) && (property !== "Response")) {
      var $li = $("<li>").addClass("detail")
      if (property === "Poster") {
        var $img = $("<img>")
                    .addClass("poster")
                    .attr("src", movie[property])
                    .attr("alt", "movie-poster");
        $li.html($img);
        $ul.prepend($li);
      } else {
        $li.html("<strong>" + property + "</strong>" + ": " + movie[property]);
        $ul.append($li);
      }
    }
  }
  this.$details.append($ul);
};

// Searches omdbAPI for a specific film by title
$.MovieSearch.prototype.detailSearch = function (e) {
  e.preventDefault();
  var data = { i: $(e.currentTarget).parent().data("id") }
  $.ajax({
    method: "GET",
    url: "http://omdbapi.com/?",
    data: data,
    dataType: "json",
    success: this.renderDetails.bind(this)
  });
};

// POSTs to our data.json file with the movie's information to save
$.MovieSearch.prototype.favorite = function (e) {
  e.preventDefault();
  var title, oid, poster;
  oid = $(e.currentTarget).parent().data("id");
  title = $(e.currentTarget).parent().data("title");
  poster = $(e.currentTarget).parent().data("poster")
  var data = { title: title,
               oid: oid,
               poster: poster
              }
  $.ajax({
    method: "POST",
    url: "/favorites",
    data: data,
    dataType: "json",
    success: console.log("faved")
  })
};

// Defines a function on the $ namespace that returns a new MovieSearch object
$.fn.movieSearch = function () {
  return this.each(function () {
    new $.MovieSearch(this)
  });
};

// Calls the above method on page load
$(function () {
  $("main").movieSearch();
});
