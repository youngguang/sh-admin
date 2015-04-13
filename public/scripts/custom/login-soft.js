var Login = function () {

  var handleLogin = function () {
    $('.login-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        },
        remember: {
          required: false
        }
      },

      messages: {
        username: {
          required: "请输入用户名."
        },
        password: {
          required: "请输入密码."
        }
      },

      invalidHandler: function (event, validator) { //display error alert on form submit
        $('.alert-danger', $('.login-form')).show();
      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        //error.insertAfter(element.closest('.input-icon'));
      },

      submitHandler: function (form, e) {
        // 禁止默认提交
        e.preventDefault();
        $('#login-submit-btn').prop('disabled', true);
        ajax('/login', $(form).serialize()).then(function () {
          $('.alert-danger', $('.login-form')).hide();
          location.href = location.search.substr(10) || "/";
        }, function () {
          $('#login-submit-btn').prop('disabled', false);
          $('.alert-danger', $('.login-form')).show();
        })
      }
    });

    $('.login-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.login-form').validate().form()) {
          $('.login-form').submit();
        }
        return false;
      }
    });
  }

  var handleForgetPassword = function () {
    $('.forget-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: "",
      rules: {
        email: {
          required: true,
          email: true
        }
      },

      messages: {
        email: {
          required: "Email is required."
        }
      },

      invalidHandler: function (event, validator) { //display error alert on form submit

      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },

      submitHandler: function (form, e) {
      }
    });

    $('.forget-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.forget-form').validate().form()) {
          $('.forget-form').submit();
        }
        return false;
      }
    });

    jQuery('#forget-password').click(function () {
      jQuery('.login-form').hide();
      jQuery('.forget-form').show();
    });

    jQuery('#back-btn').click(function () {
      jQuery('.login-form').show();
      jQuery('.forget-form').hide();
    });

  }

  var handleRegister = function () {

    function format(state) {
      if (!state.id) return state.text; // optgroup
      return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
    }


    $("#select2_sample4").select2({
      placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
      allowClear: true,
      formatResult: format,
      formatSelection: format,
      escapeMarkup: function (m) {
        return m;
      }
    });


    $('#select2_sample4').change(function () {
      $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    jQuery.validator.addMethod("validUsername", function(value, element) {
        return /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/g.test(value);
    }, "请输入正确的用户名");

    $('.register-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: "",
      rules: {

        fullname: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        address: {
          required: true
        },
        city: {
          required: true
        },
        country: {
          required: true
        },
        username: {
          required: true,
          rangelength: [3, 20],
          validUsername: true,
          remote: {
            url: "/valid_username",
            type: "post",
            dataType: "json",
            data: {
              username: function() {
                return $("input[name='username']").val();
              }
            },
            dataFilter: function(json) {
               json = JSON.parse(json);
               if (json.status === 'ok') {
                 return true;
               } else {
                 return false;
               }

            }
          }
        },
        password: {
          rangelength: [6, 20],
          required: true
        },
        rpassword: {
          equalTo: "#register_password"
        },

        tnc: {
          required: true
        }
      },

      messages: { // custom messages for radio buttons and checkboxes
        tnc: {
          required: "Please accept TNC first."
        },
        username: {
          required: "请输入用户名",
          rangelength:'4-20位字符，支持汉字、数字及"-"、"_"组合',
          remote: '该用户名已被使用，请重新输入。'
        },
        password: {
          required: "请输入密码",
          rangelength: "建议6-20位字符，建议由字母，数字和符号两种以上组合"
        },
        rpassword: {
          equalTo: "两次输入密码不一致"
        }

      },

      invalidHandler: function (event, validator) { //display error alert on form submit

      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        if (element.attr("name") == "tnc") { // insert checkbox errors after the container
          error.insertAfter($('#register_tnc_error'));
        } else if (element.closest('.input-icon').size() === 1) {
          error.insertAfter(element.closest('.input-icon'));
        } else {
          error.insertAfter(element);
        }
      },

      submitHandler: function (form, e) {
        // 禁止默认提交
        e.preventDefault();
        $('#register-submit-btn').prop('disabled', true);
        ajax('/register', $(form).serialize()).then(function () {
          location.href = '/';
        }, function () {
          $('#register-submit-btn').prop('disabled', false);
        })
      }
    });

    $('.register-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.register-form').validate().form()) {
          $('.register-form').submit();
        }
        return false;
      }
    });

    jQuery('#register-btn').click(function () {
      jQuery('.login-form').hide();
      jQuery('.register-form').show();
    });

    jQuery('#register-back-btn').click(function () {
      jQuery('.login-form').show();
      jQuery('.register-form').hide();
    });
  }

  return {
    //main function to initiate the module
    init: function () {

      handleLogin();
      handleForgetPassword();
      handleRegister();

      $.backstretch([
        "img/bg/1.jpg",
        "img/bg/2.jpg",
        "img/bg/3.jpg",
        "img/bg/4.jpg"
      ], {
        fade: 1000,
        duration: 8000
      });
    }

  };

}();