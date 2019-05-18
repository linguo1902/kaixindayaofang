<?php
    $uid = isset($_GET['uid'])? $_GET['uid']:'';
    $Uname = isset($_GET['Uname'])?$_GET['Uname']:'';
    $Sname = isset($_GET['Sname'])?$_GET['Sname']:'';
    $price = isset($_GET['price'])?$_GET['price']:'';
    $num = isset($_GET['num'])?$_GET['num']:'';

    include 'conn.php';
    // echo $price;
    $sql ="SELECT * FROM dingdan WHERE uid='$uid' AND Uname='$Uname'";
    $res=$conn->query($sql);
    // var_dump($res)      
        if($res->num_rows) {
            $content=$res->fetch_all(MYSQLI_ASSOC);
            // echo json_encode($content,JSON_UNESCAPED_UNICODE);
        }else{
            $sql = "INSERT INTO dingdan (uid,Uname,name,price,num) VALUES('$uid','$Uname','$Sname','$price','$num')";
            
        }
    $res= $conn->query($sql);
?>