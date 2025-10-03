<?php
	require_once 'DBconect.php';
	$temp = [];
	$user = $_POST["user"];
	$consulta = "SELECT
	  	d.idDepartamento,
	  	d.nombre,
	  	ud.estado
	FROM
		departamento AS d,
	 	usuario_departamento AS ud
	WHERE
	 	d.idDepartamento = ud.idDepartamento AND ud.idUser = '".."'";
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
        array_push($temp, $res);
    }
    $outputData = $temp;
    echo json_encode($outputData);