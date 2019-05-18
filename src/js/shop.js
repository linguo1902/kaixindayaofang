(function(){
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
    var username = getCookie('username');
    $.ajax({
        type:'get',
        url:'../api/close.php',
        async: false,
        data : 'name='+username,
        success:function(str){
            var arr = JSON.parse(str);
            var res =arr.map(function(item){
                return `
                <li data-id="${item.uid}" class="lis">
                    <div class="sp-id">${item.uid}</div>
                    <div class="sp-name">${item.name}</div>
                    <div class="sp-price">￥${item.price}</div>
                    <div class="sp-num">
                        <span class="reduce">-</span>
                        <input type="text" value="${item.num}" name="" id="tex">
                        <span class="add">+</span>
                    </div>
                    <div class="sp-xj">￥${(item.price*item.num).toFixed(2)}</div>
                    <div class="sp-caozuo">
                        <a href="###">删除</a>
                    </div>
                </li>
            `
            }).join('');
            $('.sp-list').html(res);
        }
    
    })
    // 点击加量添加数量
   $('.sp-list').on('click','.add',function(){
       var num = $(this).prev().val();
       var uid =$(this).parent().parent().data('id');
       console.log(uid);
       num++;
       if(num>=30){
           num=30;
       }
       $(this).prev().val(num);
       subtotal($(this));
       $.ajax({
        type:'get',
        url : '../api/alter.php',
        async:true,
        data : 'num='+num+'&uid='+uid,
        success:function(str){
            console.log(str);
        }
       })
       AABB();
   })
   $('.sp-list').on('click','.reduce',function(){
    var num = $(this).next().val();
    var uid =$(this).parent().parent().data('id');
    num--;
    if(num<=1){
        num =1;
    }
    $(this).next().val(num);
    subtotal($(this));
    $.ajax({
        type:'get',
        url : '../api/alter.php',
        async:true,
        data : 'num='+num+'&uid='+uid,
        success:function(str){
            console.log(str);
        }
       })
       AABB();
})
$('.sp-list').on('input','#tex',function(){
    var num = $(this).val();
    if(num<=1){
        num =1;
    }
    if(num>=30){
        num=30;
    }
    $(this).val(num);
    subtotal($(this));
}) 
//小计计算
function subtotal(now){
    //找到数量
    var num = $(now).parent().find('#tex').val();
    
    //找到价格
    var price =$(now).parent().prev().text().slice(1);
    console.log(price);
    var total =(num*price).toFixed(2);
    $(now).parent().next().html('￥'+total);
}
$('.sp-list').on('click','.sp-caozuo',function(){
    var res = confirm('你确定要删除吗？');
    var uid =$(this).parent().data('id');
   
    console.log(uid);
    if(res){
        $(this).parent().remove();
    }
    updata();
    $.ajax({
        type:'get',
        url : '../api/del.php',
        async:true,
        data : 'uid='+uid,
        success:function(str){
            console.log(str);
        }
    })
})
//判断商品为0的时候更换面板
 function updata(){
    var len = $('.add').size();
    if(len==0){
        $('.total-box').hide();
        $('.no-shop').show();
    }else{
        $('.total-box').show();
        $('.no-shop').hide();
    }
 }
 //计算总数量总价格
 function AABB(){
    var Znum =0;
    var Zprice=0; 
    console.log($('.lis').size());
    console.log($('.lis').find('#tex').val());
    for(let i=0;i<$('.lis').size();i++){
        Znum+=$('.lis').find('#tex').eq(i).val()*1;
        Zprice+=$('.lis').find('.sp-xj').eq(i).html().slice(1)*1;
    }
    Zprice=Zprice.toFixed(2);
    console.log(Znum,Zprice);
     //渲染节点
     function create(num,price){
        $('.letter').find('i').html(num);
        $('.column-totals').find('i').html('￥'+price);
        $('.excludeFreight').find('i').html('￥'+price);
     }
     create(Znum,Zprice);
 }
 AABB();
//点击删除全部商品
$('.empty-btn').click(function(){
    var res =confirm('你确定要删除全部吗');
    if(res){
        for(var i=$('.lis').size();i>=0;i--){
            console.log($('.lis'))
            $('.lis').eq(i).remove()
        }
        $.ajax({
            type:'get',
            url:'../api/leaveOut.php',
            data: 'name='+username,
            success:function(str){
                console.log(str);
            }

        })
        AABB();
        updata();
    }
});
$('.empty-r-shop').click(function(){
    location.href='../html/list.html'
})
})();