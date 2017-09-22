
$(function () {
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);
    //置灰注册按钮
    $(".btn-register").addClass("disabled");
    $(".btn-register").attr("disabled","disabled");
    var isAjax = true;
    var isValid = false;
    //对名称的校验
    $("#accountId").blur(function () {
        if($("#accountId").val().trim().length ==0){
            $('.error').addClass('alert alert-danger').html("account can not be empty");
            $("#accountId").focus();
            isAjax = false;
        }else if($("#accountId").val().length < 6 || $("#accountId").val().length > 12){
            $('.error').addClass('alert alert-danger').html('account length should between six and twelve');
            $("#accountId").focus();
            isAjax = false;
        }else{
            $('.error').removeClass('alert alert-danger').html('');
            isAjax = true;
        }
        //查询数据库是否已经存在此名称
        if(isAjax){
            var account = $("#accountId").val();
            $.ajax({
                type: "GET",
                url: "/login/checkUserAccount",
                data: {"userAccount":account},
                dataType: "json",
                success: function(data){
                    if(data){
                        //如果账号已经存在
                        $("#accountId").focus();
                        $('.error').addClass('alert alert-danger').html('account has existed,please change another one');
                    }else{
                        isValid = true;
                    }
                }
            });
        }
    });

    $("#passwordId").blur(function () {
        if($("#passwordId").val().trim().length ==0){
            $('.error').addClass('alert alert-danger').html("password can not be empty");
        }else if($("#passwordId").val().length < 6 || $("#passwordId").val().length > 12){
            $('.error').addClass('alert alert-danger').html("password length should between six and twelve");
        }else{
            $('.error').removeClass('alert alert-danger').html('');
        }
    });
    $("#password_confirmId").blur(function () {
        if($("#password_confirmId").val().trim().length ==0){
            $('.error').addClass('alert alert-danger').html("repeat password can not be empty");
        }else if($("#password_confirmId").val().length < 6 || $("#password_confirmId").val().length > 12){
            $('.error').addClass('alert alert-danger').html("repeat password length should between six and twelve");
        }else{
            $('.error').removeClass('alert alert-danger').html('');
        }
    });
    setInterval(function(){
        if(isValid && ($("#passwordId").val().length >= 6 && $("#passwordId").val().length <= 12)
            && ($("#password_confirmId").val().length >= 6 || $("#password_confirmId").val().length <= 12)
            && $("#passwordId").val().length == $("#password_confirmId").val().length){
            //解除置灰注册按钮
            $(".btn-register").removeClass("disabled");
            $(".btn-register").removeAttr("disabled");
        }
    }, 200);
})
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function registerAjax() {
    //注册逻辑,校验数据库是否已经存在此名称,校验密码长度
    var account = $("#accountId").val().trim();
    var password = $("#passwordId").val().trim();
    var repeat_password = $("#password_confirmId").val().trim();
    if(password != repeat_password){
        shakeModal("password is not same with repeat password");
    }else if(account.length == 0 || password.length == 0 || repeat_password.length == 0
        || account.length < 6 || account.length > 12 || password.length < 6 || password.length > 12
        || repeat_password.length < 6 || repeat_password.length > 12){
        shakeModal("invalid account or password");
    }else{
        //发送账号密码注册
        $.ajax({
            type: "POST",
            url: "/login/registerUserAccount",
            data: {"userAccount":account,"userPassword":password, "repeat_password" : repeat_password},
            dataType: "json",
            success: function(data){
                if(data){
                    //注册成功,跳转到登录页面.
                    showLoginForm();
                    setTimeout(function(){
                        $('#loginModal').modal('show');
                    }, 230);
                }else{
                    shakeModal("register fail");
                }
            }
        });
    }
}
function loginAjax(){
    //登录功能
    var account = $("#loginAccountId").val().trim();
    var password = $("#loginPasswordId").val().trim();
    if(account.length > 0 && password.length > 0){
        //发送账号密码进行登录
        $.ajax({
            type: "POST",
            url: "/login/userLogin",
            data: {"userAccount":account,"userPassword":password},
            dataType: "json",
            success: function(data){
                if(data){
                    //登录成功,关闭模态,对限制取消
                    $('#loginModal').modal('hide');
                    $("#navContentId").find("ul").removeClass("hideNavCss");
                    $(".unloadCss").text("欢迎您, " + account);
                    $(".unloadCss").removeClass('unloadCss');
                    $(".loadCss").find("button").text("注销");
                    debugger
                    page.lockPage = true;
                }else{
                    shakeModal("login fail");
                }
            }
        });
    }else{
        shakeModal();
    }
}

function shakeModal(massage){
    var msg = "ivalid account/password combination";
    if(massage){
        msg = massage;
    }
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html(msg);
    // $('input[type="password"]').val('');
    setTimeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );
}

