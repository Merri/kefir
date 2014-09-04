;(function(global){
  "use strict";

  function init(Kefir, $) {




    $.fn.asKefirStream = function(eventName, selector, transformer) {
      var $el = this;
      if (transformer == null && selector != null && 'string' !== typeof selector) {
        transformer = selector;
        selector = null;
      }
      transformer = transformer && Kefir.Fn(transformer);
      return Kefir.fromBinder(function(emitter) {
        var onEvent;
        if (transformer) {
          onEvent = function() {
            emitter.emit(transformer.applyWithContext(this, arguments));
          };
        } else {
          onEvent = emitter.emit;
        }
        $el.on(eventName, selector, onEvent);
        return ['off', $el, eventName, selector, onEvent];
      }).setName('jQuery:asKefirStream');
    }




    // $.fn.asKefirProperty = function(event, selector, getter) { ... }




  }

  if (typeof define === 'function' && define.amd) {
    define(['kefir', 'jquery'], init);
  } else if (typeof module === "object" && typeof exports === "object") {
    var kefir = require('kefir');
    var jQuery = require('jquery');
    init(kefir, jQuery);
  } else {
    init(global.Kefir, global.jQuery);
  }

}(this));
