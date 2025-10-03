<?php
	require_once 'DBconect.php';
	$temp = [];
	$user = $_POST["user"];
	$consulta = "SELECT
		  `idUsuario`
		FROM
		  `usuarios`
		WHERE
		  `user` ='".$user."';";
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);