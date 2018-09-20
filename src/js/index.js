jQuery(function($){
			var $datalist = $('.list');
			var $li = $('li');
			console.log($li);
			function getlist(){
				$.ajax({
					type:"get",
					url:"../api/index.php",
					async: true,
					
					success: function(str) {
					var dataList = JSON.parse(str);
					console.log(dataList);
					var $ul = $('<ul>');
						var res = dataList.map(function(item){
							return `<li>
								<img src="../css/${item.imgurl}">
								<h3>${item.title}</h3>
								<p>${item.category}</p>

							</li>`
						});
						$ul.html(res);
						$datalist.append($ul);
					}

				});
				
			};
			getlist();
			function getcookies(key) {
			//获取cookie的函数
			var cookie = document.cookie; //uid=1; username=malin
					console.log(cookie);
			var arr = cookie.split('; '); //["uid=1", "username=malin"]
					console.log(arr);
			for(var i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split('='); //[uid,1] [username,malin]
				if(arr2[0] == key) {
					return arr2[1];
				}
			}

		};
			function update() {
			//刷新面板的状态，根据用户的登陆状态而定的。
			//如果是登陆的：显示退出面板，隐藏注册和登陆面板
			//如果是退出的：显示注册和登陆面板，隐藏退出面板
			var uid = getcookies('uid');
			var name = getcookies('username');
			
					console.log(name);
				
			if(uid) {
				//登陆状态
				$('.log').show();
				$('.login').hide();
				$('.out').show();
				// $('.log').html(JSON.parse(name));

				$('.log').html(name);
				
			} else {
				$('.log').hide();
				$('.login').show();
				$('.reg').show();
				$('.out').hide();
				
				
			}
		};

		update();
		$('#logout').click(function() {
		console.log(1233);
		$.ajax({
			type: "get",
			url: "html/guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'logout'
			},
			success: function(str) {
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}

				update();
			}
		});
	});

			$('.datalist').on('click',function(){
				location.href='html/list.html';
			});
		});