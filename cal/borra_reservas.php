<?php
	$numId = $_POST["id"];
	$link = new mysqli("10.1.230.185", "web", "Bezoya2016", "modulocliente");
	//$link = new mysqli("195.55.253.42", "web", "Bezoya2016", "modulocliente");
	$link->set_charset("utf8");
	$consulta = "DELETE FROM `horariosCalendario` WHERE idHorariosCalendario = ".$numId;
	$result = mysqli_query($link, $consulta);
	echo json_encode($result);
?>