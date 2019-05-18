(function(){
    $('.header').load('head.html',function(){
        var username = getCookie('username');
        $.ajax({
            type:'get',
            url:'../api/change.php',
            async:true,
            data:'name='+username,
            success:function(str){
                $('#gwc').html('('+str+')');
            }
           })
           var username = getCookie('username');
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
    });
    $('.footer').load('footer.html');
     
    //发送请求做数据渲染
    let ipage = 1;//当前页
    let num = 15;//每页多少条
    let pages = '';//生成多少页
    let order = '';//升序降序
    let type = '';//根据什么来排序
    var ipage1 = 1;
    function init(ipage){
        $.ajax({
            type :'get',
            url :'../api/list_1.php',
            async: true,
            data : 'page='+ipage +'&num='+num+'&order='+order+'&type='+type,
            success :function(str){
                create(str);
            }
        })
    }
    init(1);
    // 渲染数据
    function create(str){
        let arr = JSON.parse(str);
        // 获取总条数和当前页多天条
        let sum ='';
            sum ='<h2 class="sum">'+'共计找到商品'+'<i>'+arr.total+'</i>'+'件,每页只显示'+'<i>'+arr.num+'</i>'+'件'+'</h2>';
            $('.top_sum').html(sum);
        let res = arr.data.map(function(item){
            return `<li data-id="${item.id}">
            <img src="${item.imgur}" alt="" class="img2">
            <p>${item.name}</p>
            <i>${item.effect}</i>
            <p>开心价：￥<i>${item.yhprice}</i></p>
            <span style="border: none;">
                <img src="../images/goumai.png" alt="" class="img_btn">
            </span>
            <span>查看详细</span>
            </li>`
        }).join('');
        $('.productList').html(res);
        //生成页数
        pages = Math.ceil(arr.total/arr.num);
        let html='';
        for(let i=0;i<pages;i++){
            html+='<a href="###" id="lis">'+(i + 1)+'</a>';
        }
        html = `<a href="###" id="first">首页</a>
                <a href="###" id="top">上页</a>
                ${html}
                <a href="###" id="bottom">下页</a>
                <a href="###" id="trailer">尾页</a>`;
                $('.page').html(html);
                console.log( $('.page').html(html))
                $('.page').children('a').eq(arr.page*1+1).attr('class','active');
    }
    // 点击切换上下页
    $('.page').on('click','#lis',function(){
        ipage1 = $(this).html();
        init(ipage1);
    });
    $('.page').on('click','#first',function(){//首页
        init(1);
    });
    $('.page').on('click','#top',function(){//上一页
        if(ipage1!=1){
            init(--ipage1);
        }   
    });
    $('.page').on('click','#bottom',function(){//下一页
        if(ipage1!=pages){
            init(++ipage1);
        }     
    });
    $('.page').on('click','#trailer',function(){//尾页
            init(pages);
            ipage1=pages;
    });
    // 根据价格升序降序
    var isok =true//设置开关
    $('.price_btn').click(function(){
        type='yhprice';
        console.log(type);
        if(isok){
            order = 'ASC';
        }else{
            order = 'DESC';
        }
        isok =!isok;
        init(1);
    })
    // 点击购买的时候传id带到详情页额
    $('.productList').on('click','.img_btn',function(){
        var id =$(this).parent().parent().data("id");
        console.log(id);
        window.open('detailPage.html?'+id);
    })
})();