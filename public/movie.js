

  $.MovieDetail = function (data) {
    this.title = data.title;
    this.year = data.year;
    this.rated = data.rated;
    this.released = data.released;
    this.runtime = data.runtime;
    this.genre = data.genre;
    this.director = data.director;
    this.writer = data.writer;
    this.actors = data.actors;
    this.plot = data.plot;
    this.language = data.language;
    this.country = data.country;
    this.awards = data.awards
    this.poster = data.poster
    this.metascore = data.metascore
    this.imdbRating = data.imdbRating
    this.imdbVotes = data.imdbVotes
    this.imdbID = data.imdbID
    this.type = data.type
  }


  $.fn.movieDetail = function () {
    return this.each(function () {
      new $.movieDetail(this)
    });
  };

  $(function () {
    $("div#detail").movieDetail();
  });
