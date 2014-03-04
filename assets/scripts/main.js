(function () {

  this.Unboxed = this.Unboxed || {};

  var request = this.Unboxed.request({base: 'https://api.github.com'});

  var getTopLanguages = function (username) {
    return request.get('/users/' + username + '/repos')
    .then(function (repos) {
      var languages_in_repos = repos.map(function (repo) {
        return request.get('/repos/' + username + '/' + repo.name + '/languages')
        .then(function (languages) {
          return languages;
        });
      });
      return $.when.apply($, languages_in_repos);
    })
    .then(function () {
      var repos = [].slice.call(arguments);
      return repos.reduce(function (accumulator, repo) {

        Object.keys(repo).forEach(function (language) {
          if (!(language in accumulator)) accumulator[language] = 0;
          accumulator[language] += parseInt(repo[language], 10);
        });

        return accumulator;
      }, {});
    });
  };

  var loader = this.Unboxed.Loader();
  var notification = this.Unboxed.Notification();

  $('form').submit(function (event) {
    event.preventDefault();

    if (!$(this).find('.username').val()) {
      return notification.blink('Ehm, perhaps you could enter a Github username.');
    }

    notification.hide();
    loader.show();

    getTopLanguages($(this).find('.username').val())
    .then(function (languages) {
      return Object.keys(languages).reduce(function (accumulator, language) {
        accumulator.push({language: language, loc: languages[language]});
        return accumulator;
      }, []);
    })
    .then(function (languages) {
      return languages.sort(function (a, b) { return b.loc - a.loc; })
    })
    .then(function (languages) {
      return languages.map(function (program) {

        return $('<li class="result">').append(
          $('<div>').text(program.language),
          $('<div>').text(program.loc)
        );

      });
    })
    .then(function (html) {
      loader.hide();

      if (!html.length) {
        notification.show('Oops, there are no repositories for this username.');
      }

      $('.results').html('').append(html);
    })
    .fail(function (error) {
      loader.hide();
      notification.show("Oops, something unexpected happened. \
                        Are you using a valid Github username?");
    });

  });

}).call(this);
