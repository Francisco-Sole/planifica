<?php
	require_once 'DBconect.php';
	$id = $_POST["id"];
	$temp = [];
	$consulta ="SELECT
			  `idUsuario_departamento`,
			  `estado`,
			  `idUser`,
			  `idDepartamento`
			FROM
			  `usuario_departamento`
			WHERE
			  idUser = ". $id; 
			  //var_dump($consulta);
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);