<?php

session_start();
//variable que contiene la direccion actual
$temp = "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
include_once "../control/index.php";
$security = new Security($temp);
?>
<!DOCTYPE html> 
<html>
<head>
	<title>Crear nuevo usuario</title>
	<link href="../../css/general.css" rel="stylesheet" type="text/css"/>	
	<script src="../../js/framework/jquery-3.3.1.min.js"></script>
	<script src="../../js/crear_user.js"></script> 
	<meta charset="UTF-8">
</head>
<body>
	<?php
		include_once("header.html");
	?>
	<div style="float: left">
		<div style="margin-top: 25px;margin-left: 100px; float: left; width: 30vw"> 
			<input type="text" placeholder="User *" name="boxUser" id="boxUser" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb" required="required" onblur="compruebaUserUnico()">
			<img id="carga" src="../../media/img/carga.gif" style="height: 35px; margin-bottom: -12px; position: relative;left: 7px; display: none;"/>
			<img id="checkOk" src="../../media/img/ok.png" style="height: 35px; margin-bottom: -12px; position: relative;left: 7px;display: none;"/>
			<img id="checkError" src="../../media/img/error.png" style="height: 35px; margin-bottom: -12px; position: relative;left: 7px;display: none;"/><br/>
			<input type="text" placeholder="Nombre de usuario *" name="boxNombre" id="boxNombre" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb" required="required">
			<input type="text" placeholder="Primer apellido *" name="boxApellido1" id="boxApellido1" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb" required="required">
			<input type="text" placeholder="Segundo apellido" name="boxApellido2" id="boxApellido2" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb"><br/>
			<input type="text" placeholder="Email *" name="boxEmail" id="boxEmail" style="padding: 10px; margin-bottom: 10px; border: none; width: 443px;" class="tb" required="required"><br/>
			<select  id="departamentos" placeholder="Departamento *" style="padding: 10px; margin-bottom: 10px; border: none; width: 460px" class="tb">
				<option value="null" >Seleccione departamento *</option>
			</select><br/>

			<input type="password" placeholder="Password *" name="boxPass" id="boxPass" style="padding: 10px; margin-bottom: 10px; border: none;" required="required" class="tb">
			<input type="password" placeholder="Repita password *" name="boxPass2" id="boxPass2" style="padding: 10px; margin-bottom: 10px; border: none;" required="required" class="tb"><br/>
			<button style="border:none; background-color: #0089AE; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 3px;cursor: pointer;" id="btnCrea">Crear</button><br/>
			<span style="font-size: 8pt;">* campos obligatorios.</span>

		</div>
		<div class="top-to-bottom" style="float: left; margin-top: 30px; text-align: center;width: 62vw; padding-bottom: 80px;">
			<p style="padding: 25px;">Recuerda, el user no podra repetirse, es decir es unico.</p>
			<p style="padding: 25px;">El segundo apellido es opcional, pero es recomendable para distincion de las iniciales.</p>
			<p style="padding: 25px;">La cuenta de correo tambien es unica, y sirve para recuperar la contraseña y tener al tanto al departamento de tus actividades.</p>
			<p style="padding: 25px;">El password puede tener cualquier tamaño, sera codificado para seguridad.</p>
		</div>
	</div>

	<div style="float: left;"><button id="btnVolver" style="border:none; background-color: red; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 5px;cursor: pointer">&#8617;Volver</button></div>

</body>
</html>