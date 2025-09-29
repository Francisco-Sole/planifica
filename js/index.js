function login(){
	var parametros = { "user" : $("#user").val(), "password" : $("#password").val() };
	$.ajax({
		data: parametros,
		url: '../php/controller/login.controller.php?param=500',
		type: 'post',
		beforeSend: function () {
		},
		success: function (response) {
			if (response.length != 1) {
				alert("Usuario y/o contraseña incorrectos.")
			}else{
				$.cookie('user', response[0][1]+" "+response[0][2]+" "+response[0][3]);
				$.cookie('id', response[0][0]);
				window.location.href = '../php/controller/Login.controller.php?param=600';
			}
		},dataType: 'JSON'
	}); 
}

jQuery(document).ready(function($) {
	$("#user").keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			$("#password").focus();
			return false;  
		}
	});

	$("#password").keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			$("#btnLogin").click();
			return false;  
		}
	});
});