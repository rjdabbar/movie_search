$.MovieSearch = function (el) {
  this.$el = $(el);
  this.$form = this.$el.find("form");
  this.$ul = this.$el.find("ul")
  this.bindEvents();
}

$.MovieSearch.prototype.bindEvents = function () {
  this.$form.on("submit", this.search.bind(this));
  this.$el.on("click", "li.movie", this.detailSearch.bind(this))
};

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

$.MovieSearch.prototype.renderResults = function (data) {
  this.$ul.empty();
  var results = data["Search"];
  results.forEach(this.generateResult.bind(this));
};

$.MovieSearch.prototype.generateResult = function (movie) {
  var $content = $("<div>").html(movie["Title"]);
  var $li = $("<li>").data("id", movie["imdbID"]).addClass("movie").append($content)
  this.$ul.append($li);
}

$.MovieSearch.prototype.renderDetails = function (data) {


}

$.MovieSearch.prototype.detailSearch = function (e) {
  e.preventDefault();
  var data = { i: $(e.currentTarget).data("id") }

  $.ajax({
    method: "GET",
    url: "http://omdbapi.com/?",
    data: data,
    dataType: "json",
    success: this.renderDetails.bind(this)
  });


}

$.fn.movieSearch = function () {
  return this.each(function () {
    new $.MovieSearch(this)
  });
};

$(function () {
  $("main").movieSearch();
});
