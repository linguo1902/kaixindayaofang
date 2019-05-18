<?php
$name = isset($_GET['name'])?$_GET['name']:'';
include 'conn.php';
$sql = "SELECT * FROM dingdan WHERE Uname='$name'";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($content);
?>