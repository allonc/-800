<?php


	include 'connect.php';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : null;
    $desc = isset($_GET['desc']) ? $_GET['desc'] : null;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 16;
	$sql = "select * from goods";
	// 读取数据
    // 获取查询结果集（集合）
   if($desc == 'true'){
      $sql .= " order by $sort*1";

      // 降序
    }
      if($desc == 'false'){
        $sql .= " order by $sort*1 desc";
      }
    $result = $conn->query($sql);

    // 从集合中取出所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $res = array(
    'total' => count($row),
    'pageNo' => $page*1,
    'qty' => $qty*1,
    'data' => array_slice($row,($page-1)*$qty,$qty)
  );

   
   	//释放查询结果集，避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();

   	echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>