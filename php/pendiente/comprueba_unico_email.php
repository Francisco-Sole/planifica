<?php
	require_once 'DBconect.php';
	$temp = [];
	$email = $_POST["email"];
	$consulta = "SELECT
		  `idUsuario`
		FROM
		  `usuarios`
		WHERE
		  `email` ='".$email."';";
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);