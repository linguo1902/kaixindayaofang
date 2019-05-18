<?php
$name= isset($_GET['name'])?$_GET['name']:'';
include 'conn.php';
$sql="DELETE FROM dingdan WHERE Uname='$name'";
$res= $conn->query($sql);
?>