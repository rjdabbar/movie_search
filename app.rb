require 'sinatra'
require 'json'

get '/' do
  File.read('views/index.html')
end

get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

post '/favorites' do
  return "Invalid Request" unless (params[:title] && params[:oid])
  movie = { title: params[:title], oid: params[:oid]}
  file = JSON.parse(File.read('data.json'))
  file[params[:title]] = params[:oid]
  File.write('data.json', JSON.pretty_generate(file))
  movie.to_json
end
