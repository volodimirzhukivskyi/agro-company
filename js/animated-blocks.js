// Animated Blocks - Scroll Animation System
(function($) {
    'use strict';

    // Функція для перевірки видимості елемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
        
        return (vertInView && horInView);
    }

    // Ініціалізація анімацій при завантаженні
    $(document).ready(function() {
        
        // Додаємо клас для елементів, які потрібно анімувати
        $('.single_service_text').addClass('animate-fade-up');
        $('.portfolio_box').addClass('animate-fade-up');
        $('.single_counter').addClass('animate-scale');
        $('.about_text h2, .about_text p').addClass('animate-fade-left');
        $('.section_tittle').addClass('animate-fade-down');
        $('.single_blog').addClass('animate-fade-up');
        
        // Анімація лічильників
        let counterAnimated = false;
        
        // Функція для запуску анімацій
        function checkAnimations() {
            // Анімація fade-up
            $('.animate-fade-up:not(.animated)').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animated');
                }
            });
            
            // Анімація fade-left
            $('.animate-fade-left:not(.animated)').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animated');
                }
            });
            
            // Анімація fade-down
            $('.animate-fade-down:not(.animated)').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animated');
                }
            });
            
            // Анімація scale
            $('.animate-scale:not(.animated)').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animated');
                }
            });
            
            // Анімація pulse з затримкою
            $('.animate-pulse-delay:not(.animated)').each(function(index) {
                if (isElementInViewport(this)) {
                    const delay = index * 100;
                    $(this).css('animation-delay', delay + 'ms');
                    $(this).addClass('animated');
                }
            });
            
            // Лічильники
            // if (!counterAnimated && $('.single_counter').length) {
            //     if (isElementInViewport($('.single_counter')[0])) {
            //         counterAnimated = true;
            //         $('.counter').each(function() {
            //             const $this = $(this);
            //             const countTo = $this.text();
                        
            //             $({countNum: 0}).animate({
            //                 countNum: countTo
            //             }, {
            //                 duration: 2000,
            //                 easing: 'swing',
            //                 step: function() {
            //                     $this.text(Math.floor(this.countNum));
            //                 },
            //                 complete: function() {
            //                     $this.text(this.countNum);
            //                 }
            //             });
            //         });
            //     }
            // }
        }
        
        // Перевірка при завантаженні
        checkAnimations();
        
        // Перевірка при прокручуванні
        let scrollTimeout;
        $(window).on('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkAnimations, 50);
        });
        
        // Анімація для слайдера банера
        $('.banner_slider').on('changed.owl.carousel', function(event) {
            const $currentSlide = $('.owl-item.active .banner_text_iner');
            $currentSlide.css('opacity', '0');
            setTimeout(function() {
                $currentSlide.css('opacity', '1');
            }, 100);
        });
        
        // Анімація для hotspot при наведенні
        $('.hotspot').on('mouseenter', function() {
            $(this).find('.hotspot__popup').addClass('show-popup');
        }).on('mouseleave', function() {
            $(this).find('.hotspot__popup').removeClass('show-popup');
        });
        
        // Анімація для карток сервісів при наведенні
        $('.single_service_text').hover(
            function() {
                $(this).addClass('hover-effect');
            },
            function() {
                $(this).removeClass('hover-effect');
            }
        );
        
        // Анімація для portfolio при наведенні
        $('.portfolio_box').hover(
            function() {
                $(this).find('.single_portfolio img').addClass('zoom-effect');
            },
            function() {
                $(this).find('.single_portfolio img').removeClass('zoom-effect');
            }
        );
        
        // Паралакс ефект для банера
        $(window).on('scroll', function() {
            const scrolled = $(window).scrollTop();
            $('.banner_slide img').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        });
        
        // Анімація для bullet cards
        $('.bullet_card').on('click', function(e) {
            e.preventDefault();
            $('.bullet_card').removeClass('active');
            $(this).addClass('active');
            
            const slideIndex = $(this).data('slide');
            $('.banner_slider').trigger('to.owl.carousel', [slideIndex, 300]);
        });
        
    });

})(jQuery);