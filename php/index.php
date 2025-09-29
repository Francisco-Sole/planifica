<?php
error_reporting(0);

//doble comprobacion
//abrimos sesion
session_start();
//variable que contiene la direccion actual
$temp = "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
include_once "./control/index.php";
//actualizamos el sistema de direcciones, para en caso de intentar acceder a algun sitio sin permiso te pueda redirigir. y cargamos dependencias
$security = new Security($temp, 'login');

?>
<!DOCTYPE html>
<html>
<head>
	<script src="../js/framework/jquery-3.3.1.min.js"></script>
	<script src="../js/framework/jquery-ui.min.js"></script>
	<script src="../js/framework/jquery.cookie.js"></script>
	<script src="../js/index.js"></script>

	<link href="../css/general.css" rel="stylesheet" type="text/css"/>	
	<title>Login</title>
	<meta charset="UTF-8">
</head>
<body>
	<header style="height: 75px; background-color: #00C0F3;text-align: center;width: 100%;">
		<img src="../media/img/logo.png" style="position: absolute;margin-top: 20px;left: 25px;">
		<h1 style="color: white;font-size: 60px;letter-spacing: 12px;">Reserva de sala</h1>
	</header>
	<div id="general" style="height: 80%; width: 100%;margin-top: 30px;">
		<div id="formularioLogin" style="width: 28%;padding: 15px;float: left;text-align: center;margin-top: 55px;">
			<input type="text" id="user" placeholder="usuario" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb"><br/>
			<input type="password" id="password" placeholder="password" style="padding: 10px; margin-bottom: 10px; border: none" class="tb"><br/>
			<button id="btnLogin" onclick="login()" style="border:none; background-color: #0089AE; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 3px;cursor:pointer;">Login</button>
		</div>
		<div class="top-to-bottom" style="width: 68%; float: right; text-align: center;padding-bottom: 55px;">
			<p style="padding: 25px;">
				Sin cuenta? <a href="controller/Login.controller.php?param=100&id=user">create</a> una!
			</p>
			<p style="padding: 25px">
				Olvidaste la contraseña? recuperala <a href="controller/Login.controller.php?param=200">aqui!</a>
			</p>
			<p style="padding: 25px">
				Nuevo departamento? <a href="controller/Login.controller.php?param=300">Crealo!</a>
			</p>
			<p style="padding: 25px">
				Nueva sala de reuniones? <a href="controller/Login.controller.php?param=400">Abre</a> sus puertas!
			</p>
		</div>
	</div>
</body>
</html>