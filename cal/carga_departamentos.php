<?php
	require_once 'DBconect.php';
	$temp = [];
	$consulta ="SELECT
			  `idDepartamento`,
			  `nombre`
			FROM
			  `departamento`"; 
			  //var_dump($consulta);
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);