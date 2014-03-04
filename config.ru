require './app'
run Sinatra::Application
use Rack::Deflater
run App
