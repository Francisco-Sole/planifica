<?php
session_start();
//variable que contiene la direccion actual
$temp = "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
include_once "../control/index.php";
$security = new Security($temp);

class View_Login {

	function __construct(){
		
	}

	function mostrar_formulario($archivo){
		include_once '../templates/'.$archivo.'.php';
	}

	//TO DO
	function mostrar_feedback($mensaje){

	}

	function main(){
		header("Location: ../index.php");	
	}


	function mostrar_formulario_externo($ruta){
		include_once $ruta;
	}
}