<?php
	require_once 'DBconect.php';
	$nombre = $_POST["nombre"];
	$ape1 = $_POST["ape1"];
	$ape2 = $_POST["ape2"];
	$email = $_POST["email"];
	$departamento = $_POST["departamento"];
	$password = $_POST["password"];
  $user = $_POST["user"];
	$consulta ="INSERT
INTO
  `usuarios`(
    `nombre`,
    `apellido1`,
    `apellido2`,
    `email`,
    `password`,
    `idDepartamento`,
    `user`
  )
VALUES(
  '".$nombre."',
  '".$ape1."',
  '".$ape2."',
  '".$email."',
  MD5('".$password."'),
  '".$departamento."',
  '".$user."'
)"; 
	$result = mysqli_query($link, $consulta);
    echo json_encode($result);