<?php    
    include 'conn.php'; 
    $APItype=isset($_POST['APItype']) ? $_POST['APItype'] : 'orderCarNum';
    //加入购物车
    if($APItype=='addOrderCar'){
        
        $title=isset($_POST['title']) ? $_POST['title'] : '12';
        $gid=isset($_POST['gid']) ? $_POST['gid'] : '2';
        $uid=isset($_POST['uid']) ? $_POST['uid'] : '12';
        $num=isset($_POST['num']) ? $_POST['num'] : '12';
        $price=isset($_POST['price']) ? $_POST['price'] : '12';
        $img=isset($_POST['img']) ? $_POST['img'] : '12';
        $sql="SELECT * FROM `dingdan` WHERE gid = $gid AND uid = $uid ";
        
       
        $res=$conn->query($sql);      
        if($res->num_rows) {
            $content=$res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($content,JSON_UNESCAPED_UNICODE);
        }else{
            $sql="INSERT INTO `dingdan`(title,num,price,img,uid,gid) VALUES('$title','$num','$price','$img','$uid','$gid')"; 
        }
       
    }  
    //购物车信息输出 
    if($APItype=='orderCar'){
        $page=isset($_POST['page']) ? $_POST['page'] : '1';
        $qty=isset($_POST['qty']) ? $_POST['qty'] : '2';
        $index=($page-1)*$qty;
        
        $sql="SELECT * FROM `dingdan` LIMIT $index,$qty";
    }
    //购物数量变化
    if($APItype=='orderCarNum'){
        $gid=isset($_POST['gid']) ? $_POST['gid'] : '2';
        $uid=isset($_POST['uid']) ? $_POST['uid'] : '12';
        $num=isset($_POST['num']) ? $_POST['num'] : '2';
        $sql="UPDATE `dingdan` SET num=$num where gid='$gid' AND  uid='$uid'";
        $res=$conn->query($sql); 
        // if($res){
        //     echo 1;
        // }else{
        //     echo 0;
        // }
    }
    //购物车删除数据
    if($APItype=='orderCarDelete'){
        $id=isset($_POST['id']) ? $_POST['id'] : '';
        $sql="DELETE FROM `dingdan` WHERE id='$id'"; 
    }
    //购物车删除全部
    if($APItype=='orderCarDeleteAll'){
        $id=isset($_POST['id']) ? $_POST['id'] : '';
        $sql="DELETE FROM `dingdan`";
    }
   
    $res=$conn->query($sql); 
    if($APItype=='orderCar'){
        $row=$res->fetch_all(MYSQLI_ASSOC);//只要内容部分
        $datalist=array(
            'list'=>$row,
            'page'=>$page,
            'qty'=>$qty
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();//关闭结果集
    }
    // }else{
    //     if($res){
    //         echo 1;
    //     }else{
    //         echo 0;
    //     }
    // }
    //关闭数据库
    $conn->close();
?>