<?php
	$cadena = $_POST["datos"];
	$cadena = str_replace('+', ' ' , $cadena);
	$cadena = str_replace("'", "" , $cadena);
	$cadena = str_replace('"', '' , $cadena);
	$datos = explode("&", $cadena); 
	$array = [];
	for ($i=0; $i < count($datos) ; $i++) { 
		$id = explode("=", $datos[$i])[0];
		$valor = explode("=", $datos[$i])[1];
		$array[$id] = "'".$valor."'";
	}
	$link = new mysqli("10.1.230.185", "web", "Bezoya2016", "modulocliente");
	//$link = new mysqli("195.55.253.42", "web", "Bezoya2016", "modulocliente");
	$link->set_charset("utf8");
	$indice = 0;
	$campos=null;
	$valores=null;
	while ($indice < count($array)) {
	    $campos .= key($array).',';
	    $valores .= $array[key($array)].",";
		$indice++;
		next($array);
	}
	 $campos = substr($campos, 0, -1);
	 $valores = substr($valores, 0, -1);
	 // var_dump($campos);
	 // var_dump($valores);

	$consulta = "INSERT INTO `horariosCalendario`(".$campos.")VALUES(".$valores.")";
	//var_dump($consulta);
	$result = mysqli_query($link, $consulta);
	echo json_encode($result);
?>