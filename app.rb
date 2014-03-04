require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'

class App < Sinatra::Base

  set :root, File.dirname(__FILE__)
  register Sinatra::AssetPack

  assets {
    serve '/scripts', from: 'assets/scripts'
    serve '/stylesheets', from: 'assets/stylesheets'
    serve '/bower_components', from: 'assets/bower_components'

    js :application, '/scripts/application.js', [
      '/bower_components/jquery/dist/jquery.js',
      '/scripts/request.js',
      '/scripts/main.js'
    ]

    css :application, '/stylesheets/application.css', [
      '/bower_components/normalize-css/normalize.css',
      '/stylesheets/style.css',
    ]

    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :simple   # :simple | :sass | :yui | :sqwish
  }

  get '/' do
    erb :index
  end

end
