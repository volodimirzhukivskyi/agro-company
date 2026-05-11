(function ($) {
  "use strict";

  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed');
    } else {
      $('.main_menu').removeClass('menu_fixed');
    }
  });

  // page-scroll
  $('.page-scroll').on('click', function (event) {
    var $anchor = $(this);
    var headerH = '80';
    var $target = $($anchor.attr('href'));
    if (!$target.length) return;
    $('html, body').stop().animate({
      scrollTop: $target.offset().top - headerH + "px"
    }, 700);
    event.preventDefault();
  });

  //counter up
  if ($.fn.counterUp && $('.counter').length) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  }

  //masonry js
  if ($.fn.masonry && $('.grid').length) {
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  }
  if ($.fn.magnificPopup && $('.img-gal').length > 0) {
    $('.img-gal').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

  if ($.fn.magnificPopup && $('.img-pop-up').length > 0) {
    $('.img-pop-up').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

 function clampHotspotPopup(hotspot, container) {
  const popup = hotspot.querySelector('.hotspot__popup');
  if (!popup) return;

  popup.style.left = '';
  popup.style.right = '';

  const popupRect = popup.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  let offsetX = 0;

  // вихід вправо
  if (popupRect.right > containerRect.right) {
    offsetX = containerRect.right - popupRect.right - 8;
  }

  // вихід вліво
  if (popupRect.left < containerRect.left) {
    offsetX = containerRect.left - popupRect.left + 8;
  }

  if (offsetX !== 0) {
    popup.style.transform = `translate(${offsetX}px, 0)`;
  }
}
document.querySelectorAll('.hotspot').forEach(hotspot => {
  const container = hotspot.closest('.machine-image');
  if (!container) return;

  hotspot.addEventListener('mouseenter', () => {
    clampHotspotPopup(hotspot, container);
  });
  hotspot.addEventListener('focus', () => {
    clampHotspotPopup(hotspot, container);
  });
});

// Robust Owl Carousel banner slider and bullet handler
$(document).ready(function () {

  var $bannerOwl = $('.banner_slider');

  if ($.fn.owlCarousel && $bannerOwl.length) {

    $bannerOwl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 900,
      nav: false,
      dots: false
    });

    // CLICK ON BULLET CARD -> CHANGE PRODUCT SLIDE
    $('.banner_bullets').on('click', '.bullet_card', function (e) {
      e.preventDefault();

      var index = parseInt($(this).data('slide'), 10);

      $('.bullet_card').removeClass('active');
      $(this).addClass('active');

      $bannerOwl.trigger('to.owl.carousel', [index, 600]);
    });

    // SYNC ACTIVE BULLET ON SLIDE CHANGE (AUTOPLAY / SWIPE)
    $bannerOwl.on('changed.owl.carousel', function (event) {
      var count = event.item.count;
      var index = event.item.index - event.relatedTarget._clones.length / 2;

      index = ((index % count) + count) % count;

      $('.bullet_card').removeClass('active');
      $('.bullet_card[data-slide="' + index + '"]').addClass('active');
    });

  }

});
}(jQuery));
