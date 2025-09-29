<?php
	require_once 'DBconect.php';
	$temp = [];
	$mes = $_POST["mes"];
	$ano = $_POST["ano"];
	if (strlen($mes) == 1) {
		$mes = "0".$mes;
	}
	$consulta ="SELECT
			  r.idReserva,
			  r.fecha,
			  r.descripcion,
			  r.horaMin,
			  r.horaMax,
			  r.idUsuario,
			  d.color,
			  u.nombre,
			  u.apellido1,
			  u.apellido2,
			  r.idSala
			FROM
			  reserva AS r,
			  usuarios AS u,
			  departamento AS d
			WHERE
			  r.idUsuario = u.idUsuario 
			  AND u.idDepartamento = d.idDepartamento
			  AND fecha LIKE '".$ano."-".$mes."-__%' ORDER by r.fecha, r.horaMin"; 
			 // var_dump($consulta);
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);