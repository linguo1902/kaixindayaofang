(function(){
    var data = decodeURI(location.search);
    var id =data.slice(1);
    $.ajax({
        type:'get',
        url:'../api/shop.php',
        async: true,
        data:'id='+id,
        success:function(str){
            console.log(str);
        }
    })
})();