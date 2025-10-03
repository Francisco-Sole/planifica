<?php
	require_once 'DBconect.php';
	$temp = [];
	$id = $_POST["id"];
	$consulta ="SELECT
            `nombre`,
            `apellido1`,
            `apellido2`
          FROM
            `usuarios`
          WHERE
            `idUsuario` = '".$id."'"; 
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
    array_push($temp, $res);
  }
  $outputData = $temp;
  echo json_encode($outputData);