(function () {

  this.Unboxed = this.Unboxed || {};

  this.Unboxed.Loader = function () {
    return new Loader();
  }

  function Loader () {
    this.$element = $('<div id="loader">').text('∅');
  }

  Loader.prototype.show = function () {
    $('body').append(this.$element);
  };

  Loader.prototype.hide = function () {
    $('#loader').detach();
  };

}).call(this);
