$(function() {
	var $login = $("#login"),
		$chat = $("#chat"),
		$messages = $("#messages");
	var socket = io.connect('/');
	
	socket.on('connect', function() {
		console.log('Connected with socket');
		
		init();
	});
	
	var init = function() {
		$("#nickname").keyup(function(e) {
			var code = e.which || e.keyCode;

			if (code == 13) {
				setNickname($(this).val());
			}
		});
		
		$chat.hide();
	};
	
	var setNickname = function(nickname) {
		socket.emit('set_nickname', nickname, function(is_available) {
			if (is_available) {
				console.log('Nickname ' + nickname + " is available");
				
				setUpChat(nickname);
			} else {
				console.log('Nickname ' + nickname + " is not available");
			}
		});
	};
	
	var setUpChat = function(nickname) {
		$login.hide();
		$chat.show();
		
		$("#submit-message").click(function() {
			sendMessage($("#message").val());
		});
		
		socket.on('message', function(nickname, message) {
			addMessage(nickname, message);
		});
	};
	
	var sendMessage = function(msg) {
		socket.emit('message', msg);
	};
	
	var addMessage = function(nickname, message) {
		$messages.append($("<li>@" + nickname +": " + message + "</li>"));
	};
});