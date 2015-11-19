$.FavoriteMovies = function (el) {
  this.$el = $(el);
  this.$favorites = $(el).find("ul#favorites")
  this.getMovies();
};

// Fetches all favorited movies from data.json
$.FavoriteMovies.prototype.getMovies = function (e) {
  $.ajax({
    method: "GET",
    url: "/favorites.json",
    data: {},
    dataType: "json",
    success: this.renderFavorites.bind(this)
  });
};

// Renders favorite movies based on the search results
$.FavoriteMovies.prototype.renderFavorites = function (favorites) {
  for (var movie in favorites) {
    if (favorites.hasOwnProperty(movie)) {
      this.generateFavorite(movie, favorites[movie]["poster"]);
    }
  }
};

// Generates the HTML and adds it to the view
$.FavoriteMovies.prototype.generateFavorite = function (title, poster) {
  var $content = $("<div>").addClass("content")
  var $title = $("<h4>").html(title)
  var $li = $("<li>").addClass("favorite");
  var $img = $("<img>").attr("src", poster);
  $content.append($title).append($img)
  $li.data("title", title).html($content);
  this.$favorites.append($li);
};

// Defines a function on the $ namespace that returns a new FavoriteMovies object
$.fn.favoriteMovies = function () {
  return this.each(function () {
    new $.FavoriteMovies(this)
  });
};

// This function runs on page load and sets up the FavoriteMovies object for use. 
$(function () {
  $("main").favoriteMovies();
});
