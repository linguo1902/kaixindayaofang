<?php
$uid = isset($_GET['uid'])?$_GET['uid']:'';
include 'conn.php';
$sql="DELETE FROM dingdan WHERE uid=$uid";
$res = $conn->query($sql);
?>