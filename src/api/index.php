<?php


	include 'connect.php';

	$sql = "select * from goods";
	// 读取数据
    // 获取查询结果集（集合）
    $result = $conn->query($sql);

    // 从集合中取出所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

   
   	//释放查询结果集，避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();

   	echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>