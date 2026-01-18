(function ($) {
  "use strict";

  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });
  if (document.getElementById('default-select')) {
    $('select').niceSelect();
  }

  // page-scroll
  $('.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    var headerH = '80';
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  //counter up
  $('.counter').counterUp({
    delay: 10,
    time: 2000
  });

  //masonry js
  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
  //gallery js
  // $('.gallery').each(function () {
  //   $(this).magnificPopup({
  //     delegate: 'a',
  //     type: 'image',
  //     gallery: {
  //       enabled: true
  //     }
  //   });
  // });

  if ($('.img-gal').length > 0) {
    $('.img-gal').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

  // $('.slider').slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   speed: 500,
  //   infinite: true,
  //   asNavFor: '.slider-nav-thumbnails',
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   touchThreshold: 1000,
  //   pauseOnFocus: true,
  //   dots: false,
  // });

  // $('.slider-nav-thumbnails').slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   asNavFor: '.slider',
  //   focusOnSelect: true,
  //   infinite: true,
  //   prevArrow: false,
  //   nextArrow: false,
  //   centerMode: true,
  //   autoplaySpeed: 3000,
  //   touchThreshold: 1000,
  //   speed: 500,

  //   // responsive: [
  //   //   {
  //   //     breakpoint: 480,
  //   //     settings: {
  //   //       centerMode: false,
  //   //     }
  //   //   }
  //   // ]
  // });

  //UPDATED 
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

  hotspot.addEventListener('mouseenter', () => {
    clampHotspotPopup(hotspot, container);
  });
});
  if (document.getElementById('default-select, .nice-select')) {
    $('select').niceSelect();
  }
  $(document).ready(function () {
    $('select').niceSelect();
  });
  //------- Mailchimp js --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();
// Robust Owl Carousel banner slider and bullet handler
$(document).ready(function () {

  var $bannerOwl = $('.banner_slider');

  if ($bannerOwl.length) {

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

