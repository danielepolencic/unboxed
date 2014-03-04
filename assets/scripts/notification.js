(function () {

  this.Unboxed = this.Unboxed || {};

  this.Unboxed.Notification = function () {
    return new Notification();
  }

  function Notification () {
    this.$element = $('.message').hide();
  }

  Notification.prototype.show = function (message) {
    this.$element.text(message).fadeIn();
  };

  Notification.prototype.hide = function () {
    this.$element.fadeOut();
  };

  Notification.prototype.blink = function (message, delay) {
    this.show(message);
    setTimeout(this.hide.bind(this), delay || 3000);
  }

}).call(this);
