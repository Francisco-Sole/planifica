<?php
	require_once 'DBconect.php';
	$temp = [];
	$nombre = $_POST["nombre"];
	$ape1 = $_POST["ape1"];
	$ape2 = $_POST["ape2"];
	$consulta = "SELECT
		  `idUsuario`
		FROM
		  `usuarios`
		WHERE
		  `nombre` ='".$nombre."' 
		  AND `apellido1` ='".$ape1."' 
		  AND `apellido2` ='".$ape2."';";
	$result = mysqli_query($link, $consulta);
	$temp = [false];
	while (($res= mysqli_fetch_row($result)) != null) {
		$temp = [];
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);