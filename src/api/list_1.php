<?php
 header("content-type:text/html;charset=utf-8");
//接收数据
$page = isset($_GET['page'])?$_GET['page']:'1';
$num = isset($_GET['num'])?$_GET['num']:'10';
$order = isset($_GET['order'])? $_GET['order']:'';
$type = isset($_GET['type'])? $_GET['type']:'';
 //连接数据库
 include 'conn.php';
//查询数据库
$index = ($page-1)*$num;//一个多少条数据
if($type){
    $sql = "SELECT * FROM list ORDER BY $type $order  LIMIT $index,$num;";
}else{
    $sql = "SELECT * FROM list LIMIT $index,$num";
}
// 执行语句
$res = $conn->query($sql);
// 获取数据
$content =  $res->fetch_all(MYSQLI_ASSOC);
// echo json_encode($content);
//查寻总条数
$sql2 ="SELECT * FROM list";
$res2 = $conn->query($sql2);
// 传多个数据给前端
$datalist = array(
    'data'=>$content,
    'page'=>$page,
    'num'=>$num,
    'total'=> $res2->num_rows,
);
echo json_encode($datalist);
?>