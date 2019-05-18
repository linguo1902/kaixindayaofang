$(function () {
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
            url: './guestbook/index.php',
            async: true,
            data: 'm=index&a=logout',
            success: function (str) {
                var arr = JSON.parse(str);
                alert(arr.message);
                panduan();
            }
        })
    })
    console.log(panduan())
    //划过购物车显示购物车导航
    $('.shopping-trolley').hover(function () {
        $('.zero').show();
        // 
    }, function () {
        $('.zero').hide();
        // 
    });
    //划过导航显示二级导航
    $('.nav-content').on('mouseenter', '.item', function () {
        $(this).find('.tow_nav').css({
            'display': 'block',
            'zIndex': '10',
        });
        $(this).find('i').css('display', 'none');
        $(this).find('.same').css({
            'borderColor': '#d91519',
            'zIndex': '100',
        })
        $(this).find('.gross').css({
            'borderRight': '1px #e5e5e5 solid',
            'display': 'block',
            'height': '108px',
        })
    })
    $('.nav-content').on('mouseleave', '.item', function () {
        $(this).find('.tow_nav').css({
            'display': 'none',
            'zIndex': '9999',
        });
        $(this).find('i').css('display', 'block');
        $(this).find('.same').css({
            'borderColor': '',
            'zIndex': '0',
        })
        $(this).find('.gross').css({
            'borderRight': 'none',
        })
    })
    // 点击搜索框跳到列表页
    $('.ss-btn').click(function(){
        window.open('html/list.html');
    })
    // 回到顶部
    $(window).scroll(function () {
        var ih = window.scrollY;//滚动距离
        console.log(ih);
        if (ih >= 300) {
            $('.go_To_Top').fadeIn();
        } else {
            $('.go_To_Top').fadeOut();
        }
    })
    $('.go_To_Top').click(function () {
        var ih = window.scrollY;//滚动距离
        var timer = setInterval(function () {
            ih -= 30;//速度
            if (ih <= 0) {
                clearInterval(timer);
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, ih);
            }
        }, 30)
    })
    //导航旁边轮播图
    var s1 = new Swiper('#swiper-container', {
        autoplay: {//自动轮播
            delay: 3000,//间隔时间
            disableOnInteraction: false //拖拽完后还能继续自动轮播
        },
        loop: true,//无缝
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
        },
        effect: 'fade'//选用:效果
    });

    var oBox = document.getElementById('swiper-container');

    oBox.onmouseover = function () {//鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () {//鼠标离开就运动
        s1.autoplay.start();
    }
    var s2 = new Swiper('#swiper-container1', {
        autoplay: {//自动轮播
            delay: 3000,//间隔时间
            disableOnInteraction: false //拖拽完后还能继续自动轮播
        },
        loop: true,//无缝
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
        },
        effect: 'fade'//选用:效果
    });

    var oBox1 = document.getElementById('swiper-container1');

    oBox1.onmouseover = function () {//鼠标经过停止
        s2.autoplay.stop();
    }

    oBox1.onmouseout = function () {//鼠标离开就运动
        s2.autoplay.start();
    }
    var s3 = new Swiper('#swiper-container2', {
        autoplay: {//自动轮播
            delay: 3000,//间隔时间
            disableOnInteraction: false //拖拽完后还能继续自动轮播
        },
        loop: true,//无缝
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
        },
        effect: 'fade'//选用:效果
    });

    var oBox2 = document.getElementById('swiper-container2');

    oBox2.onmouseover = function () {//鼠标经过停止
        s3.autoplay.stop();
    }

    oBox2.onmouseout = function () {//鼠标离开就运动
        s3.autoplay.start();
    }
   
    // 定时器旁边小特效
    $('.next').mouseover(function () {
        $(this).css('color', 'red').html('返回');
        $(this).parent()
            .prev().find('.title_limit')
            .css('display', 'none');
    })
    $('.next').mouseout(function () {
        $(this).css('color', 'black').html('下期预告');
        $(this).parent()
            .prev().find('.title_limit')
            .css('display', 'block');
    })
    // 侧边栏的图片滑动效果
    $('.banner_right').on('mouseover', '.move', function () {
        $(this).animate({
            'left': '-10px',
        })
    })
    $('.banner_right').on('mouseout', '.move', function () {
        $(this).animate({
            'left': '0',
        });
    })
    // 选项卡
    $('.tabs').on('mouseover', 'li', function () {
        $(this).attr('class', 'thistab')
            .siblings().attr('class', '');
        $('.conbox_tabs').find('.con_tabs')
            .eq($(this)
                .index())
            .css('display', 'block')
            .siblings()
            .css('display', 'none');
    })
    // $('.tabs').on('mouseout', 'li', function () {
    //     $(this).attr('class', 'thistab')
    //         .siblings().attr('class', '');
    //     // $('.conbox_tabs').find('.con_tabs')
    //     // .siblings().css('display','none');
    // })
    // 内容三部分的选项卡
    $('.tabs_con').on('mouseover', 'li', function(){
        $(this).attr('class','tabs_con_same')
        .siblings().attr('class','');
        $('.tab_conbox').find('.tabs_con_r')
        .eq($(this).index())
        .css('display','block')
        .siblings().css('display','none')
    })
    //渲染section_floor_box_product下的内容
    $.ajax({
        type: 'get',
        url: 'api/list.php',
        async: true,
        success: function (str) {
            console.log(str);
            var arr = JSON.parse(str);
            console.log(arr);
            var res =arr.map(function(item){
                return `<div class="pro_con" data-id="${item.id}">
                <div class="list_pic">
                    <img src="${item.imgur}" alt="">  
                </div>
                <div class="list_text">
                    <p class="ls_tx_name">${item.name}</p>
                    <p class="ls_tx_effect">${item.effect}</p>
                    <p class="ls_tx_price">￥${item.yhprice}</p>
                </div>
            </div>`
            }).join('');
            $('.section_floor_box_product').html(res);
        }
  
    })
    
});