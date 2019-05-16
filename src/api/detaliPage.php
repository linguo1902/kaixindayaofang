<?php
    //接收前端的id
    $id = isset($_GET['id'])?$_GET['id']:'';
    //连接数据库
    include 'conn.php';
    $sql="SELECT * FROM list WHERE id='$id'";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content);
?>