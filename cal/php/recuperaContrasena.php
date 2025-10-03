<!DOCTYPE html> 
<html>
<head>
	<title>Recuperar cuenta</title>
	<link href="general.css" rel="stylesheet" type="text/css"/>	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="recuperaContrasena.js"></script> 
</head>
<body>
	<header style="height: 75px; background-color: #00C0F3;">
		<img src="img/logo.png" style="position: relative;top: 25px;left: 25px;">
	</header>
	<div style="float: left">
		<div style="margin-top: 25px;margin-left: 100px; float: left; width: 30vw"> 
			<input type="text" placeholder="Nombre de usuario *" name="boxNombre" id="boxNombre" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb" required="required"><br/>
			<input type="text" placeholder="Primer apellido *" name="boxApellido1" id="boxApellido1" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb" required="required"><br/>
			<input type="text" placeholder="Segundo apellido" name="boxApellido2" id="boxApellido2" style="padding: 10px; margin-bottom: 10px; border: none;" class="tb"><br/>
			<button style="border:none; background-color: #0089AE; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 3px;cursor: pointer;" id="btnCrea">Enviar</button><br/>
			<span style="font-size: 8pt;">* campos obligatorios.</span>

		</div>
		<div class="top-to-bottom" style="float: left; margin-top: 30px; text-align: center;width: 62vw; padding-bottom: 80px;">
			<p style="padding: 25px;">Al poner tu nombre de usario se te enviara por email un link de recuperación.</p>
			<p style="padding: 25px;">La cuenta de correo donde se enviara el link sera la que tienes en tu perfil.</p>
			<p style="padding: 25px;">Si la recuperacion no funciona por cualquier motivo manda un email a <a href="#">calendario.admin@impackta.com</a>.</p>
			<p style="padding: 25px;">O puedes ponerte en contacto con tu administrador.</p>
		</div>
	</div>

	<div style="float: left;"><button id="btnVolver" style="border:none; background-color: red; color: white; font-weight: 900; padding: 10px;width: 150px;letter-spacing: 5px;cursor: pointer">&#8617;Volver</button></div>

</body>
</html>