
(function(){
    $('.header').load('head.html');
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
                $('.header').find('.dengl').html(username);
                $('.header').find('.zhuce').html('退出')
               
            }else{
                $('.header').find('.dengl').html('请登录');
                $('.header').find('.zhuce').html('免费注册')
               ;
            }
        }
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
