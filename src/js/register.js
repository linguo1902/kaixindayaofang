$(function () {
    // 连接头部和尾部
    $('.header').load('head.html',function(){
        $.ajax({
            type:'get',
            url:'../api/change.php',
            async:true,
            data:'name='+username,
            success:function(str){
                $('#gwc').html('('+str+')');
            }
           })
    });
    $('.footer').load('footer.html');
      // 判断面板
      function panduan(){
        var uid = getCookie('uid');
        var username = getCookie('username');
        if(uid){
            console.log(uid);
            $('.header').find('.dengl').css('display','none');
            $('.header').find('.zhuce').css('display','none');
            $('.header').find('.info').html(username);
            $('.header').find('.tuichu').css('display','block');
           
        }else{
            $('.header').find('.dengl').css('display','block')
            $('.header').find('.zhuce').css('display','block')
            $('.header').find('.info').html('');
            $('.header').find('.tuichu').css('display','none');
        }
    }
    panduan();
    $('.tuichu').click(function(){
        $.ajax({
            type: 'post',
            url: '../guestbook/index.php',
            async: true,
            data: 'm=index&a=logout',
            success: function (str) {
                var arr = JSON.parse(str);
                alert(arr.message);
                panduan();
            }
        })
    })
    
    // 验证用户名:
    var inputs =document.getElementsByClassName('inputs');
    $('#username').on('blur', function () {
        var datas = $('#username').val();
        var name = checkReg.name(datas);
        var user = new Promise(function (user_n) {
            $.ajax({
                type: 'get',
                url: '../guestbook/index.php',
                async: true,
                data: 'm=index&a=verifyUserName&username=' + $('#username').val(),
                success: function (str) {
                  user_n(str);
                }
            });
        })
        user.then(function(data){
            var arr = JSON.parse(data);
            // 非空判断
            if(datas){
                if(!arr.code &&name){
                    $('.active:eq(0)').css('color','#58bc58')
                    .html(arr.message);
                    inputs[0].isok = true;
                    console.log(inputs[0].isok);
                    
                }else{
                    $('.active:eq(0)').css('color','red')
                    .html('该用户名不能注册');
                    inputs[0].isok =false;
                    console.log(inputs[0].isok);
                }
               
            }else{
                $('.active:eq(0)').html('账号不能为空')
                .css('color','red');
            }
            
        })

    });
    //正则判断表单
    $('#psw').on('blur',function(){//密码判断
        var tex = $('#psw').val();//获取值
        var psw =checkReg.psweasy(tex);
        if(tex){//非空判断
            if(psw){
                $('.active:eq(1)').css('color','#58bc58')
                .html('验证成功');
                inputs[1].isok = true;
               
            }else{
                $('.active:eq(1)').css('color','red')
                .html('密码验证失败');
                inputs[1].isok = false;
            }
        }else{
            $('.active:eq(1)').html('密码不能为空')
            .css('color','red');
        }
    });
    $('#psw_qr').on('blur',function(){//确认密码
        var tex = $('#psw_qr').val();//获取值
        var psw_qr =checkReg.pwwagain(tex,$('#psw').val());
        if(tex){//非空判断
            if(psw_qr){
                $('.active:eq(2)').css('color','#58bc58')
                .html('验证成功');
                inputs[2].isok = true;
               
            }else{
                $('.active:eq(2)').css('color','red')
                .html('密码验证失败');
                inputs[2].isok = false;
            }
        }else{
            $('.active:eq(2)').html('密码不能为空')
            .css('color','red');
        }
    });
    $('#email').on('blur',function(){//邮箱验证
        var tex = $('#email').val();//获取值
        var email =checkReg.email(tex,$('#email').val());
        if(tex){//非空判断
            if(email){
                $('.active:eq(3)').css('color','#58bc58')
                .html('验证成功');
                inputs[3].isok = true;
               
            }else{
                $('.active:eq(3)').css('color','red')
                .html('密码验证失败');
                inputs[3].isok = false;
            }
        }else{
            $('.active:eq(3)').html('邮箱不能为空')
            .css('color','red');
        }
    });
    // 随机验证码
    $('.btn').click(function () {
        var html = randomCode();
        console.log(html);
        $('.random').html(html);
    })
    // 验证骂验证
    $('#authCode').on('blur',function(){//邮箱验证
        var tex1 = $('#authCode').val();//获取值
        var tex2 = $('.random').html();
        if(tex1){//非空判断
           if(tex1==tex2){
            $('.active:eq(4)').html('验证成功')
            .css('color','#58bc58')
            inputs[4].isok = true;
           }else{
            $('.active:eq(4)').html('验证失败')
            .css('color','red')
            inputs[4].isok =false;
           }
        }else{
            $('.active:eq(4)').html('验证码不能为空')
            .css('color','red');
        }
    });
    // 封装个函数判断值是否相等
    function same(){
        var isture =true;
        for(var i=0;i<inputs.length;i++){
            if(!inputs[i].isok){
                isture = false;
                // console.log(!$('.inputs').isok);
            }
        }
        return isture;
    }
    same();
    console.log(same());
    // 注册
    $('.sumbit').click(function(){
        if(same()){
            $.ajax({
                type: 'post',
                url: '../guestbook/index.php',
                async: true,
                data: 'm=index&a=reg&username=' + $('#username').val()+'&password=' + $('#psw').val(),
                success: function (str) {
                  var arr = JSON.parse(str);
                }
            });
            alert('注册成功');
            location.href= 'login.html';
        }else{
            alert('注册失败');
        }
         
    })
    });