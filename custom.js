(function ($) {
  "use strict";

  var shuttle = {};

  shuttle.submit_signup_form = function(event) {
    event.preventDefault();

    const form_id = $(this).attr('id');

    $(this).find('button[type=submit]').html('Sending...').attr('disabled', 'disabled');

    //validation
    var error = 0;

    //get the values
    const fullname = $(this).find('input[name=fullname]').val();
    if(fullname.length < 2) {
      $(this).find('input[name=fullname]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Fullname is required</span>');
      error += 1;
    }

    const email = $(this).find('input[name=email]').val();
    if(email.length < 2) {
      $(this).find('input[name=email]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Email is required</span>');
      error += 1;
    }

    if(!shuttle.validateEmail(email)) {
      $(this).find('input[name=email]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Enter a valid email address</span>');
      error += 1;
    }

    const phonenumber = $(this).find('input[name=phonenumber]').val();
    if(phonenumber.length != 11) {
      $(this).find('input[name=phonenumber]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Phone number digit must be 11.</span>');
      error += 1;
    }

    const home_address = $(this).find('input[name=home-address]').val();
    if(home_address.length <= 5) {
      $(this).find('input[name=home-address]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Enter your valid home address.</span>');
      error += 1;
    }

    const office_address = $(this).find('input[name=office-address]').val();
    if(office_address.length <= 5) {
      $(this).find('input[name=office-address]').addClass('invalid').parents('.tab').append('<span class="text-danger error">Enter your valid office address.</span>');
      error += 1;
    }

    if(error > 0) {
      $(this).find('button[type=submit]').html('Send again').removeAttr('disabled');
      return;
    }

    const data = {
      fullname,
      email,
      phonenumber,
      home_address,
      office_address
    };

    $.ajax({
      dataType: 'json',
      type: 'post',
      data: {
        data,
        action: 'send_form_message'
      },
      url: 'action.php',
      success: function (response) {
        if(response.status === true) {
          $('#' + form_id).find('input').val();
          $('#success-message').show();
          $('#' + form_id).slideToggle();
        } else {
          $('#' + form_id).find('.error_message').html(response.message);
        }
        $('#' + form_id).find('button[type=submit]').html('Send again').removeAttr('disabled');
        shuttle.scroll_to_top(form_id);
      },
      error: function (qXhr, textStatus, errorMessage) {
        shuttle.scroll_to_top(form_id);
        $('#' + form_id).find('button[type=submit]').html('Send again').removeAttr('disabled');
        $('#' + form_id).find('.success_message').html(errorMessage);
      }
    });
  }

  shuttle.scroll_to_top = function (id) {
    $('#regForm').animate({
      scrollTop: $("#"+ id).offset().top
    }, 1000);
  }

  shuttle.validateEmail = function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  shuttle.remove_errors = function(event) {
    $(this).siblings('.error').remove();
  }

  shuttle.check_email_validation = function (event) {
    $(this).siblings('.error').remove();
    const email = $(this).val();

    if(!shuttle.validateEmail(email)) {
      $(this).addClass('invalid').parents('.tab').append('<span class="text-danger error">Invalid email address</span>');
    } else {
      $(this).removeClass('invalid').parents('.tab').append('<span class="text-success error">Email address is valid.</span>');
    }
    return;
  }

  shuttle.init = function() {
    $(".js__p_start").simplePopup();
    $(document).on('submit', '#regForm', shuttle.submit_signup_form)
    $(document).on('click', 'input', shuttle.remove_errors);
    $(document).on('keyup', 'input[type=email]', shuttle.check_email_validation);
  }
  $(window).on('load', shuttle.init);


})($);