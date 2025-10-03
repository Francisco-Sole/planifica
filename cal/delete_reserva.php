<?php
	require_once 'DBconect.php';
	$id = $_POST["id"];
	$consulta ="DELETE
				FROM
				  `reserva`
				WHERE
				  `idReserva` = ".$id; 
	$result = mysqli_query($link, $consulta);
    echo json_encode($result);