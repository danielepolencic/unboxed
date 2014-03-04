(function () {

  this.Unboxed = this.Unboxed || {};

  Unboxed.request = function (options) {
    return new Request(options);
  };

  function Request (options) {
    this.settings = {base: options.base};
  }

  ['get', 'post'].forEach(function (verb) {
    Request.prototype[verb] = function (url, payload) {
      return $.ajax({
        url: this.settings.base + url,
        method: verb.toUpperCase(),
        data: payload || null,
        dataType: 'json'
      });
    };
  });

}).call(this);
