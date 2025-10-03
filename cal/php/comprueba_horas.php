<?php
	require_once 'DBconect.php';
	$fecha = $_POST["fecha"];
	$tempFecha = split("/", $fecha);
	$horaI = $_POST["horaI"];
	$horaF = $_POST["horaF"];
	$idSala = $_POST["idSala"];
	$temp = [];
	$temp2 = [];
	$outputData = [];
	//compruebo hora incio
	$consulta ="SELECT
				  `idReserva`
				FROM
				  reserva
				WHERE
				  '".$horaI."' > `horaMax` AND '".$horaF."' < `horaMin` AND `fecha` = '".$tempFecha[2]."-".$tempFecha[1]."-".$tempFecha[0]."' AND `idSala` = '".$idSala."'"; 
			  //var_dump($consulta);
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    
    //si no esta vacio aviso de que la hora I esta pillada
    if (!empty($temp)) {
    	array_push($outputData, "La hora no esta libre.");
    }else{
    	array_push($outputData, true); 	
    }

    echo json_encode($outputData);
    