<?php
session_start();

if ($_SESSION["no_dep"] == true) {

	session_destroy();
	setcookie("direccion", $ip, -1); //la cookie se borra.
	echo "<h1>No se encuentra alguna dependencia del sitio web.</h1>";
	echo "<h2>Estamos trabajando para solucionar este incoveniente.</h2>";
	echo "<h3>Se ha notificado a los administradores del sitio este error.</h3>";

}else{

	if (isset($_SESSION["address"])) {
		if (!is_null($_SESSION["address"]) && !empty($_SESSION["address"])) {
			$tempArray = json_decode($_SESSION["address"]);
		}
	}
	header("Location: ".$tempArray[count($tempArray)-1] );	
}
?>