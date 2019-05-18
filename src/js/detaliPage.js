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
        $('.close').click(function(){
            window.open('shop.html');
        })
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
    });
    $('.footer').load('footer.html');
    
    //回到顶部
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
    //放大镜
    var data = decodeURI(location.search);
    var id = data.slice(1);
    $.ajax({
        type:'get',
        url:'../api/detaliPage.php',
        async: true,
        data:'id='+id,
        success:function(str){
            var arr = JSON.parse(str)[0].smallpic.split('&');
            console.log(arr);
            var res = arr.map(function(item){
                return `<li>
									<div class="small-img">
										<img src="../images/${item}" />
									</div>
								</li>`;
            }).join('');
            $('.animation03').html(res);
            //放大镜插件使用：先渲染再调用插件
					var magnifierConfig = {
						magnifier: "#magnifier1", //最外层的大容器
						width: 310, //承载容器宽
						height: 310, //承载容器高
						moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom: 4, //缩放比例
					};

                    var _magnifier = magnifier(magnifierConfig);
            //页面渲染
            var arr2= JSON.parse(str);
            var res2 = arr2.map(function(item){
                return `<h2>${item.effect}</h2>
                <ul class="explain" ">
                    <li>通用名称：${item.name}</li>
                    <li>商品编号：B01001430xt</li>
                    <li>商品规格：6g*10袋</li>
                    <li>批准文号：国药准字Z11020361</li>
                    <li>生产企业：北京同仁堂科技发展有限公司</li>
                </ul>
                <span>[该商品为特例品，不参加任何活动，不支持使用优惠券    ]</span>
                <div class="price_box" data-id="${item.id}">
                    <ul class="list">
                        <li class="price">
                            <p>优惠价：<i class="active_1">￥${item.yhprice}</i></p>
                            <p>节省：<i class="active_2">￥${item.saveprice}</i></p>
                            <p>市场价：<del>￥${item.scprice}</del></p>
                            <p><a href="">价格投诉</a></p>
                        </li>
                        <li class="discounts">
                            <p>优惠专享：</p>
                            <img src="../images/dazhe.png" alt="">
                        </li>
                        <li class="promotion">
                            <p>促销信息：<i>该商品无促销活动...</i></p>
                        </li>
                        <li class="num">
                            <p>商品数量：</p>
                            <div class="add_num">
                                <div class="reduce">-</div>
                                <input type="text" data-num="${item.num}" value="1" name="" id="tex">
                                <div class="add">+</div>
                            </div>
                            <p>【价格投诉】</p>
                        </li>
                    </ul>   
                </div>
                <div class="shop">
                        <img src="../images/shop_btn.png" alt="">
                    </div>
                    <div class="zhixun">
                        <img src="../images/zhixun.png" alt="">
                    </div>`
            }).join('');
            $('.main2_r_t_r').html(res2);
				}

    });
    // 详情页选项卡
    $('.btn_box').on('click','li',function(){
        $(this).attr('class','active_3')
        .siblings().attr('class', '');
        $('.main2_con_box').find('.main2_con')
        .eq($(this).index()).css('display','block')
        .siblings().css('display','none');
        console.log($(this).index())
    });
    //点击数量加减
    $('.main2_r_t_r').on('click','.add',function(){//加
        var num = $(this).prev().val();
        var sum = $(this).prev().data('num');
        num++;
        if(num>=sum){
            num=sum;
        }
        $(this).prev().val(num);
    })
    $('.main2_r_t_r').on('click','.reduce',function(){//减
        var num = $(this).next().val();
        var sum = $(this).next().data('num');
        num--;
        if(num<=1){
            num=1;
        }
        $(this).next().val(num);
    })
    $('.main2_r_t_r').on('input','#tex',function(){
        var num = $(this).val();
        var sum = $(this).data('num');
        if(num<=1){
            num =1;
        }else if(num>=sum){
            num = sum;
        }
        $(this).val(num);
    })

    //点击按钮的时候加入购物车页
    var uid = getCookie('uid');
    var username = getCookie('username');
    $('.main2_r_t_r').on('click','.shop',function(){
  console.log($("#gwc"));
        var Sname = $(this).prev().prev().prev().children(':first').html().slice(5);
        var uid =$(this).prev().data('id');
        var Uname = getCookie('username');
        var price = $(this).prev().find('.active_1').html().slice(1);
        var num = $(this).prev().find('#tex').val();
       if(uid){
           $.ajax({
               type:'get',
               url:'../api/shop.php',
               async:true,
               data :{
                   
                   uid: uid,
                   Uname:  Uname,
                   Sname: Sname, 
                   price: price,
                   num : num,
               },
               success: function(str){
                
                $.ajax({
                    type:'get',
                    url:'../api/change.php',
                    data:'name='+username,
                    async:true,
                    success:function(str){
                        $('#gwc').html('('+str+')');
                    }
                   })
               }
           })
       }else{
           alert('请先登录');
            window.open('login.html');
       }
    });

})();