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

			 var $goodslist = $('.goodslist');
			 var $def = $('.def');
			 var $sales = $('.sales');
			 var $price = $('.price');
			 var $page = $('#page');
			 function getlist(){
				$.ajax({
					type:"get",
					url:"../api/list.php",
					data:{
						'page':'1',
						'qty':'16'
					},
					async: true,
					
					success: function(str) {
					var dataList = JSON.parse(str);
					console.log(dataList);
					let len = Math.ceil(dataList.total/dataList.qty);
					$page.html('');
					for(let i=0;i<len;i++){
						let span = document.createElement('span');
						span.innerText = i+1;
						if(i===dataList.pageNo-1){
							span.className='active';
						}
						$page.append(span);
					}
					var $ul = $('<ul>');
						var res = dataList.data.map(function(item){
							return `<li data-id=${item.id}>
								<img src="../css/${item.imgurl}">
								<h3>${item.title}</h3>
								<p>原价：<del>${item.price}</del>&nbsp;&nbsp;元</p>
								<p>现价：<span>${(item.price*item.off).toFixed(2)}</span>&nbsp;&nbsp;元</p>
								<p>已售：${item.sales}</p>
								<p>${item.category}</p>

							</li>`
						});
						$ul.html(res);
						$goodslist.html('');
						$goodslist.append($ul);
					}

				});
				
			};
			getlist();

			// 排序
			let desc = false;
			function sales(){
				$.ajax({
					type:"get",
					url:"../api/list.php",
					async: true,
					data:{
						'sort':'sales',
						'desc':desc
					},
					
					success: function(str) {
					var dataList = JSON.parse(str);
					var $ul = $('<ul>');
						var res = dataList.data.map(function(item){
							return `<li data-id=${item.id}>
								<img src="../css/${item.imgurl}">
								<h3>${item.title}</h3>
								<p>原价：<del>${item.price}</del>&nbsp;&nbsp;元</p>
								<p>现价：<span>${(item.price*item.off).toFixed(2)}</span>&nbsp;&nbsp;元</p>
								<p>已售：${item.sales}</p>
								<p>${item.category}</p>

							</li>`
						});
						$ul.html(res);
						$goodslist.html('');
						$goodslist.append($ul);
					}

				});
				
			};
			$sales.on('click',function(){
				desc = !desc;

				sales();
			});
			function prices(){
				$.ajax({
					type:"get",
					url:"../api/list.php",
					async: true,
					data:{
						'sort':'price',
						'desc':desc
					},
					
					success: function(str) {
					var dataList = JSON.parse(str);
					var $ul = $('<ul>');
						var res = dataList.data.map(function(item){
							return `<li data-id=${item.id}>
								<img src="../css/${item.imgurl}">
								<h3>${item.title}</h3>
								<p>原价：<del>${item.price}</del>&nbsp;&nbsp;元</p>
								<p>现价：<span>${(item.price*item.off).toFixed(2)}</span>&nbsp;&nbsp;元</p>
								<p>已售：${item.sales}</p>
								<p>${item.category}</p>

							</li>`
						});
						$ul.html(res);
						$goodslist.html('');
						$goodslist.append($ul);
					}

				});
				
			};
			$price.on('click',function(){
				desc = !desc;

				prices();
			});
			$def.on('click',function(){
				getlist();
			});

			var $sort = $('.sort');
			var $sortItem = $sort.find('span');

			$sortItem.first().addClass('active');

			$sort.on('click','span',function(){
				var idx = $(this).index();
				$sortItem.eq(idx).addClass('active').siblings().removeClass('active');
			});

			
			$page.on('click','span',function(){
				var idx = $(this).index();
				var pageNo = $(this).index();
				var $pageItem = $page.find('span');
				console.log($pageItem);
				// console.log(idx,pageNo);
				pageNo++;
				$pageItem.eq(idx).addClass('active').siblings().removeClass('active');
				getPage(pageNo);
			});
			function getPage(pageNo){
				$.ajax({
					type:"get",
					url:"../api/list.php",
					data:{
						'page':pageNo,
						'qty':'8'
					},
					async: true,
					
					success: function(str) {
					var dataList = JSON.parse(str);
					console.log(dataList);
					
					var $ul = $('<ul>');
						var res = dataList.data.map(function(item){
							return `<li data-id=${item.id}>
								<img src="../css/${item.imgurl}">
								<h3>${item.title}</h3>
								<p>原价：<del>${item.price}</del>&nbsp;&nbsp;元</p>
								<p>现价：<span>${(item.price*item.off).toFixed(2)}</span>&nbsp;&nbsp;元</p>
								<p>已售：${item.sales}</p>
								<p>${item.category}</p>

							</li>`
						});
						$ul.html(res);
						$goodslist.html('');
						$goodslist.append($ul);
					}

				});

			};
			$goodslist.on('click',function(e){
				if(e.target.parentNode.tagName.toLowerCase() == 'li'){
					var id = e.target.parentNode.getAttribute('data-id');
					console.log(id);
				}
				location.href='../html/details.html?id='+id;
			});



			
		});