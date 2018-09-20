$(function() {

	/*
	 1、用户名验证

	2、注册

	3、登陆

	4、退出

	5、发帖

	6、获取帖子列表

	7、顶贴、彩贴
 
	 * */

	function getcookies(key) {
		//获取cookie的函数
		var cookie = document.cookie; //uid=1; username=malin
				console.log(cookie);
		var arr = cookie.split('; '); //["uid=1", "username=malin"]
		//		console.log(arr);
		for(var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('='); //[uid,1] [username,malin]
			if(arr2[0] == key) {
				return arr2[1];
			}
		}

	}

	function update() {
		//刷新面板的状态，根据用户的登陆状态而定的。
		//如果是登陆的：显示退出面板，隐藏注册和登陆面板
		//如果是退出的：显示注册和登陆面板，隐藏退出面板
		var uid = getcookies('uid');
		var name = getcookies('username');
		//		console.log(uid);
		if(uid) {
			//登陆状态
			$('#user').show();
			$('#reg').hide();
			$('#login').hide();
			$('#userinfo').html(name);
		} else {
			$('#user').hide();
			$('#reg').show();
			$('#login').show();
			$('#userinfo').html('');
		}
	}

	update();

	//用户名验证
	/*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	$('#username1').keyup(function() {
		var usn = $('#username1').val();
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'verifyUserName',
				'username': usn
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					$('#verifyUserNameMsg').html(data.message).css('color', 'green');
				} else {
					$('#verifyUserNameMsg').html(data.message).css('color', 'red');
				}
			}
		});
	});

	//2、注册
	/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#btnReg').click(function() {
		var usn = $('#username1').val();
		var psw = $('#password1').val();
		$.ajax({
			type: "post",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'reg',
				'username': usn,
				'password': psw
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}
				location.href='login.html';
			}
		});
	});

	//3、登陆
	/*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#btnLogin').click(function() {

		var usn = $('#username2').val();
		var psw = $('#password2').val();
		$.ajax({
			type: "post",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'login',
				'username': usn,
				'password': psw
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}

				update();

				location.href='../index.html';
			}
		});
	});

	//退出
	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#logout').click(function() {
		console.log(1233);
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
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

});
	

	


	