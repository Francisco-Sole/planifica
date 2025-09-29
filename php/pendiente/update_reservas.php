<?php
	require_once 'DBconect.php';
	$id = $_POST["user"];
	$fecha = $_POST["fecha"];
	$idSala = $_POST["idSala"];
	$descripcion = $_POST["descripcion"];
	$horaMin = $_POST["horaInicio"];
	$horaMax = $_POST["horaFinal"];
	$temp = split("/",$fecha);
	
	$consulta ="UPDATE
			  `reserva`
			SET
			  `fecha` = '".$temp[2]."-".$temp[1]."-".$temp[0]."',
			  `descripcion` = '".$descripcion."',
			  `horaMin` = '".$horaMin."',
			  `horaMax` = '".$horaMax."',
			  `idSala` = '".$idSala."'
			WHERE
			  `idReserva` = '".$id."'"; 
			  //var_dump($consulta);
	$result = mysqli_query($link, $consulta);
    echo json_encode($result);