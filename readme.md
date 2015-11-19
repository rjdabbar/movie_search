# Movie Search

Live link : htt://rj-movie-search.herokuapp.com

This app uses a small Sinatra backend with JavaScript/jQuery on the front to search OMDBapi for movie information. Favorited movies are stored in JSON file.


## File Setup

```
   |-- app
   |    |-- public
   |    |-- views
   |    app.rb
   |    configu.ru
   |    data.json
   |    Gemfile
```
#### Data.json
This file will be written to and read from to keep track of favorited movies.

#### Public
This folder houses CSS/JS files.

#### Views
This folder houses HTML view files.

## Sinatra

Only a few routes are set with the backend in place. Namely: `/, /favorites, /favorites.json`

### `/`
This route render the index view. Here you can search for movies by title.

### `/favorites`
This route takes both `GET` and `POST` requests.

#### `GET`
This route renders the favorites view. Here you can see all the favorited movies stored in data.json

#### `POST`
This route writes to the data.json file. It gets the movie information as an object in the form of
```
{
  movieTitle: {
    poster: "www.example.com",
    oid: "tt00000"
  },
  ...
}
```
### `/favorites.json`
This route serves up the information stored in data.json as JSON to be rendered in favorites.html

## Javascript

#### `search.js`
This file handles the AJAX requests to the omdbAPI and rendering the search results. It uses jQuery to dynamically create the DOM elements as the results come in. It also handles the logic for displaying the correct details for the selected movie.

#### `favorites.js`
This file sends an AJAX request to our own server at `favorites.json` to collect the stored data. It then renders each entry from the data.json file.
