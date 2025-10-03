<?php
$cadena = $_POST["datos"];
$numId = $_POST["id"];
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
$campos=null;
$valores=null;
$consulta = "UPDATE `horariosCalendario` SET ";
$j=0;
while ($j < count($array)) {
	$consulta .= key($array)." = ".$array[key($array)].",";
	$j++;
	next($array);
}
$consulta = substr($consulta, 0, -1);
$consulta.= " WHERE idHorariosCalendario = ".$numId;
//var_dump($consulta);
$result = mysqli_query($link, $consulta);
echo json_encode($result);
?>