// Slide to WhatsApp (safe init)
(function initSlideToWhatsapp() {
  function setup() {
    if (!window.jQuery) return false;

    // draggable comes from jQuery UI
    if (!$.fn || !$.fn.draggable) return false;

    var $btn = $(".slide-submit button");
    if (!$btn.length) return true; // nothing to bind

    // Prevent double-binding
    if ($btn.data("draggable-bound")) return true;
    $btn.data("draggable-bound", true);

    $btn.draggable({
      cancel: false,
      containment: "parent",
      axis: "x",
      stop: function () {
        var $this = $(this);
        var parentW = $this.parent().width();
        var left = $this.position().left;

        if (parentW / 2 < left + 100) {
          location.href =
            "https://api.whatsapp.com/send?phone=+91-7899200300&text=Hi%2C%20I%20am%20Interested%20for%20Godrej%20ISP%20IN%20Yelahanka.%20Please%20send%20Offer%20%26%20Price%20Information.";

          $this.next().css({ "margin-left": 0 }).text("Launching WhatsApp");
          try {
            $this.draggable("disable");
          } catch (e) {}
          $this.css("left", "0px");
        } else {
          $this.css({ left: 0 });
        }
      },
    });

    $btn.on("click", function (e) {
      e.preventDefault();
      return false;
    });

    return true;
  }

  // Try immediately, else retry a few times (handles async loading)
  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    if (setup() || tries > 50) clearInterval(timer); // ~5s max
  }, 100);
})();
