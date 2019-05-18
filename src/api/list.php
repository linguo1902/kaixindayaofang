<?php
    //连接数据库
    include 'conn.php';
    //查询数据库
    $sql ="SELECT * FROM shangping LIMIT 0,4;";
    //运行
    $res = $conn->query($sql);
    // var_dump($res);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content);
?>