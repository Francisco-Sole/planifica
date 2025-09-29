<?php
session_start();

class Security 
{
	function __construct($url, $carga = ""){
		//compruebo si existe la variable de sesion 'address'
		if (isset($_SESSION["address"])) {
			if (!is_null($_SESSION["address"]) && !empty($_SESSION["address"])) {
				$tempArray = json_decode($_SESSION["address"]);
			}else{
				$tempArray = [];
			}
		}else{
			$tempArray = [];
		}

		$temp = $url;
		//cargo la ultima direccion
		$ultimo = $tempArray[count($tempArray)-1];

		//si es la misma no se agrega. Max 10 direcciones
		if (($ultimo !== $temp ) && count($tempArray) < 10) {
			//agregamos la direccion actual al array
			array_push($tempArray, $temp);
		}
		
		//actualizamos la variable de sesion
		$_SESSION["address"] = json_encode($tempArray);

		//comprobamos que existe la variable de sesion creada en inicio (index.php (raiz)) y tambien la cookie
		if (isset($_SESSION["iduser"]) && isset($_COOKIE["direccion"])) {
			//comprobamos que son los mismos valores (sin trampas)
			if ($_SESSION["iduser"] == md5($_COOKIE["direccion"])) {
				$_SESSION["allow"] = true;
			}else{
				$_SESSION["allow"] = false;
			}
		}

		//si no existe la variable de sesion allow la creo como false.
		if (!isset($_SESSION["allow"])) {
			$_SESSION["allow"] = false;
		}

		//comprobamos el valor de la variable de sesion allow
		if ($_SESSION["allow"] == false) {
			//si no tiene permitido entrar lo sacamos.
			header("Location: ./php/log_out.php");	
		}else if($_SESSION["allow"] == true){
			//intetamos cargar las cargar_dependencias
			if ($cargar != "") {
				cargar_dependencias($carga);
			}
		}

		
	}
}

function cargar_dependencias($str){
	$success_load_view = include_once './view/'. $str .'.view.php';
	$success_load_controller = include_once './controller/'. $str .'.controller.php';
	$success_load_model = include_once './model/'. $str .'.model.php';
	$success = $success_load_view && $success_load_controller && $success_load_model;

	//sino podemos cargar las dependencia lo sacamos.
	if (!$success) {
		$_SESSION["no_dep"] = true;
		header("Location: ./view/no_dep_load.php");	
	}
}