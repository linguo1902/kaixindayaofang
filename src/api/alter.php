<?php
$uid = isset($_GET['uid'])?$_GET['uid']:'';
$num = isset($_GET['num'])?$_GET['num']:'';
include 'conn.php';
$sql="UPDATE dingdan set num ='$num' WHERE uid='$uid'";
$res = $conn->query($sql);
?>