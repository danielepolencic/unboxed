(function () {

  this.Unboxed = this.Unboxed || {};

  var request = this.Unboxed.request({base: 'https://api.github.com'});

  var getTopLanguages = function (username) {
    return request.get('/users/danielepolencic/repos')
    .then(function (repos) {
      var languages_in_repos = repos.map(function (repo) {
        return request.get('/repos/danielepolencic/' + repo.name + '/languages')
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

}).call(this);
