<?php
	require_once 'DBconect.php';
	$id = $_POST["id"];
  $departamentos = json_decode($_POST["departamentos"], true);
  //var_dump($departamentos);
  for ($i=0; $i < count($departamentos); $i++) { 
    $consulta ="INSERT
              INTO
                `usuario_departamento`(
                  `estado`,
                  `idUser`,
                  `idDepartamento`
                )
              VALUES(
                false,
                ".$id.",
                ".$departamentos[$i]["id"]."
              );"; 
    $result = mysqli_query($link, $consulta);
  }
  echo json_encode($result);