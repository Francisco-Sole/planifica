<?php
session_start();
include_once "../control/index.php";

//variable que contiene la direccion actual
$temp = "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

$security = new Security($temp);

class Model_Login {
	function __construct(){
				
	}

	function comprueba_login ($array){
		require_once "../BD/index.php";
		$temp1 = [];
		
		$consulta = "SELECT
		`idUsuario`,
		`nombre`,
		`apellido1`,
		`apellido2`,
		`email`,
		`password`,
		`idDepartamento`
		FROM
		`usuarios`
		WHERE `user` = '".$array["user"]."' AND `password` = MD5('".$array["pass"]."');";
		
		$result = mysqli_query($link, $consulta);
		
		while (($res= mysqli_fetch_row($result)) != null) {
			array_push($temp1, $res);
			$_SESSION["found"] = true;
		}
		
		$outputData = $temp1;

		mysqli_close($link);

		echo json_encode($outputData);
	}
}