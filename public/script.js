$.MovieSearch = function (el) {
  this.$el = $(el);
  this.$form = this.$el.find("form");
  this.$ul = this.$el.find("ul")
  this.bindEvents();
}

$.MovieSearch.prototype.bindEvents = function () {
  this.$form.on("submit", this.search.bind(this));
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
  var content = $("<div>").html(movie["Title"]);
  var $li = $("<li>").addClass("movie").append(content)
  this.$ul.prepend($li);
}






$.fn.movieSearch = function () {
  return this.each(function () {
    new $.MovieSearch(this)
  });
};

$(function () {
  $("main").movieSearch();
});
