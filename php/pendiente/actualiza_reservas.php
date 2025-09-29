<?php
	$mesActual = $_POST["mes"];
	$anoActual = $_POST["ano"];
	$temp = [];
	$fecha = "-".$mesActual."-".$anoActual;
	$link = new mysqli("10.2.232.24", "web", "Bezoya2016", "modulocliente");
	//$link = new mysqli("195.55.253.42", "web", "Bezoya2016", "modulocliente");

	$link->set_charset("utf8");
	$consulta="SELECT * FROM `horariosCalendario` WHERE `fecha` like '__".$fecha."'";
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);
?>