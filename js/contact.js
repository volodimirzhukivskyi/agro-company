$(document).ready(function(){

    (function($) {
        "use strict";

    if (!$.fn.validate || !$('#contactForm').length) {
        return;
    }

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    minlength: 4
                },
                phone: {
                    required: true,
                    minlength: 5
                },
                email: {
                    email: true
                },
                message: {
                    minlength: 10
                }
            },
            messages: {
                name: {
                    required: "Вкажіть ім'я",
                    minlength: "Ім'я має містити щонайменше 2 символи"
                },
                subject: {
                    minlength: "Тема має містити щонайменше 4 символи"
                },
                phone: {
                    required: "Вкажіть номер телефону",
                    minlength: "Номер має містити щонайменше 5 символів"
                },
                email: {
                    email: "Вкажіть коректний email"
                },
                message: {
                    minlength: "Повідомлення має містити щонайменше 10 символів"
                }
            },
            submitHandler: function(form) {
                var $form = $(form);
                var $submit = $form.find('[type="submit"]');
                var $status = $form.find('.form-status');

                if (!$status.length) {
                    $status = $('<div class="form-status" aria-live="polite"></div>').appendTo($form);
                }

                $submit.prop('disabled', true);
                $status.removeClass('is-error is-success').text('Надсилаємо...');

                $.ajax({
                    type: 'POST',
                    data: $form.serialize(),
                    url: $form.attr('action') || 'contact_process.php'
                }).done(function() {
                    $form[0].reset();
                    $status.addClass('is-success').text('Дякуємо. Ми отримали запит і звʼяжемось з вами.');
                }).fail(function() {
                    $status.addClass('is-error').text('Не вдалося відправити форму. Спробуйте ще раз або напишіть нам напряму.');
                }).always(function() {
                    $submit.prop('disabled', false);
                });
            }
        });
    });
        
 })(jQuery);
});
