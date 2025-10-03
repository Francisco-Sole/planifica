<?php
	require_once 'DBconect.php';
	$temp = [];
	$user = $_POST["user"];
	$password = $_POST["password"];
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
	WHERE `user` = '".$user."' AND `password` = MD5('".$password."');";
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);