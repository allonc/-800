jQuery(function($){
			/*
				$box.load(url,callback)：把url文件内容写入$box
					* ajax请求
					* 异步请求
					* 加载部分内容
					* 回掉函数：加载完成后执行
			 */

			 // 加载头部
			 $('header').load('header.html');
			 $('.footer').load('footer.html');
			 var $details = $('.list');

			 var id = getUrlParam('id');
			 var gbtn = document.getElementById('gbtn');
			 
			 var suc = document.getElementById('suc');
			 var opa = document.getElementById('opa');
			 var $btnClose = $('.btn-close');
			 var $inteclose = $('.inteclose');
			 var $turn = $('#turn');
			 console.log($turn);
			 function getDetails(){
			 	$.ajax({
					type:"get",
					url:"../api/details.php",
					async: true,
					data:{
						'id':id
					},
					
					success: function(str) {
					var dataList = JSON.parse(str);
					
					var $ul = $('<ul>');
						var res = dataList.map(function(item){
							return `<li data-id=${item.id}>
								<h1>${item.title}</h1>
								<h3>${item.title}</h3>
								<p><span>￥：${(item.price*item.off).toFixed(2)}</span>&nbsp;元&nbsp;&nbsp;￥:<del>${item.price}</del></p>
								<img src="../css/img/88.png">

							</li>`
						});
						$ul.html(res);
						$details.html('');
						$details.append($ul);
					}

				});
			 };
			 getDetails();

			

			$(gbtn).on('click',function(){
			 	console.log(gbtn);
			 	suc.style.display='block';
				suc.style.left=(window.innerWidth-suc.offsetWidth)/2+'px';
				suc.style.top=(window.innerHeight-suc.offsetHeight)/2+'px';
				opa.style.display='block';

			 });
			$btnClose.on('click',function(){
				$(suc).hide();
				$(opa).hide();
			});
			$inteclose.on('click',function(){
				$(suc).hide();
				$(opa).hide();
			});
			$turn.on('click',function(){
				location.href='../html/buycar.html?id='+id;
			});

			
});