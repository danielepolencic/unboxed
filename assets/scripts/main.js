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

  $('form').submit(function (event) {
    event.preventDefault();

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
      $('.results').html('').append(html);
    })
  });

}).call(this);
