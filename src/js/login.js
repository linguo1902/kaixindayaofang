
(function(){
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
})();

//登录
(function(){
    $('.btn').click(function(){
            $.ajax({
                type: 'post',
                url: '../guestbook/index.php',
                async: true,
                data: 'm=index&a=login&username=' + $('#username').val() + '&password=' + $('#psw').val(),
                success: function (str) {
                    var arr = JSON.parse(str);
                    alert(arr.message);
                    panduan();
                    location.href= '../aabb.html';
                }
            })
        })
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
        // 退出
        $('.header').on('click','.zhuce',function(){
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
})();
