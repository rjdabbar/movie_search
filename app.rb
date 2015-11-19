require 'sinatra'
require 'json'

get '/' do
  File.read('views/index.html')
end

get '/favorites.json' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

get '/favorites' do
  File.read('views/favorites.html')
end

post '/favorites' do
  return "Invalid Request" unless (params[:title] && params[:oid])
  movie = { title: params[:title], oid: params[:oid], poster: params[:poster]}
  file = JSON.parse(File.read('data.json'))
  file[params[:title]] = { oid: params[:oid], poster: params[:poster] }
  File.write('data.json', JSON.pretty_generate(file))
  movie.to_json
end
