<?php
	include 'connect.php';
	$id = isset($_GET['id']) ? $_GET['id'] : null;

	$sql = "select * from goods where id='$id'";
	$result = $conn->query($sql);

	 $row = $result->fetch_all(MYSQLI_ASSOC);

	 //释放查询结果集，避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();

   	echo json_encode($row,JSON_UNESCAPED_UNICODE);



?>