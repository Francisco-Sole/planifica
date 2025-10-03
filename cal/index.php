<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="jquery.cookie.js"></script>
    <link href="general.css" rel="stylesheet" type="text/css"/>	
	<title>Login</title>
	<meta charset="UTF-8">
</head>
<body>
	<header style="height: 75px; background-color: #00C0F3;">
		<img src="img/logo.png" style="position: relative;top: 25px;left: 25px;">
		<h1 style="position: relative;top: -75px;left: 29%;color: white;font-size: 4em;letter-spacing: 12px;">Reserva de sala</h1>
	</header>
	<div id="general" style="height: 80%; width: 100%;margin-top: 30px;">
		<div id="formularioLogin" style="width: 30%;padding: 15px;float: left;text-align: center;margin-top: 55px;">
			<input type="text" id="user" placeholder="usuario" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb"><br/>
			<input type="password" id="password" placeholder="password" style="padding: 10px; margin-bottom: 10px; border: none" class="tb"><br/>
			<button id="btnLogin" onclick="login()" style="border:none; background-color: #0089AE; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 3px;cursor:pointer;">Login</button>
		</div>
		<div class="top-to-bottom" style="width: 68%; float: right; text-align: center;padding-bottom: 55px;">
			<p style="padding: 25px;">
				Sin cuenta? <a href="crearCuenta.php">create</a> una!
			</p>
			<p style="padding: 25px">
				Olvidaste la contraseña? recuperala <a href="recuperaContrasena.php">aqui!</a>
			</p>
			<p style="padding: 25px">
				Nuevo departamento? <a href="crearDepartamento.php">Crealo!</a>
			</p>
			<p style="padding: 25px">
				Nueva sala de reuniones? <a href="crearSala.php">Abre</a> sus puertas!
			</p>

		</div>
	</div>

	
</body>
</html>

<script>
	function login(){
		var parametros = { "user" : $("#user").val(), "password" : $("#password").val() };
		$.ajax({
	        data: parametros,
	        url: 'login.php',
	        type: 'post',
	        beforeSend: function () {
	        },
	        success: function (response) {
	        	if (response.length != 1) {
	        		alert("Usuario y/o contraseña incorrectos.")
	        	}else{
	        		$.cookie('user', response[0][1]+" "+response[0][2]+" "+response[0][3]);
	        		$.cookie('id', response[0][0]);
	        		window.location.href = 'cal.html';
	        	}
	        },dataType: 'JSON'
	    }); 
	}

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

</script>