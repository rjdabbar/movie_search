$.FavoriteMovies = function (el) {
  this.$el = $(el);
  this.$favorites = $(el).find("ul#favorites")
  this.getMovies();
};


$.FavoriteMovies.prototype.getMovies = function (e) {
  $.ajax({
    method: "GET",
    url: "/favorites.json",
    data: {},
    dataType: "json",
    success: this.renderFavorites.bind(this)
  });
};

$.FavoriteMovies.prototype.renderFavorites = function (favorites) {
  for (var movie in favorites) {
    if (favorites.hasOwnProperty(movie)) {
      this.generateFavorite(movie, favorites[movie]["poster"]);
    }
  }
};

$.FavoriteMovies.prototype.generateFavorite = function (title, poster) {
  var $content = $("<div>").addClass("content")
  var $title = $("<h4>").html(title)
  var $li = $("<li>").addClass("favorite");
  var $img = $("<img>").attr("src", poster);
  $content.append($title).append($img)
  $li.data("title", title).html($content);
  this.$favorites.append($li);
};

$.fn.favoriteMovies = function () {
  return this.each(function () {
    new $.FavoriteMovies(this)
  });
};

$(function () {
  $("main").favoriteMovies();
});
