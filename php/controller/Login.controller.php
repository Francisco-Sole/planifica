<?php

session_start();
//registramos el autoload autoload_classes
spl_autoload_register('autoload_classes');
//variable que contiene la direccion actual
$temp = "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
include_once "../control/index.php";
//actualizamos el sistema de direcciones, para en caso de intentar acceder a algun sitio sin permiso te pueda redirigir. y cargamos dependencias
$security = new Security($temp);

$view = new View_Login();
$model = new Model_Login();

$control = filter_input(INPUT_GET, "param");	

switch ($control) {
	
	case '100':
	//crear cuenta
	$id = filter_input(INPUT_GET, "id");
	if ($id == "user" ) {
		$view->mostrar_formulario("crear_user");
	}else if ($id == "internal") {
		//cuando sea el click del boton, o tambien podemos usar otro numero.
	}else{
		//??? no se cuando se da el caso. Investigar
	}
	break;
	
	case '200':
	//recuperar cuenta
	$view->mostrar_formulario("recupera_pass");
	break;

	case '300':
	//crear departamento
	//TO DO
	$view->mostrar_formulario("crear_departamento");
	break;

	case '400':
	//crear sala
	//TO DO
	$view->mostrar_formulario("crear_sala");	
	break;
	
	case '500':
	//comprueba login
	$user = filter_input(INPUT_POST, "user");
	$pass = filter_input(INPUT_POST, "password");
	$datos = ["user" => $user,
			  "pass" => $pass];
	$model->comprueba_login($datos);	
	break;
	
	case '600':
	//login ok, muestra pantalla calendario.
	if ($_SESSION["found"] == true) {
		$view->mostrar_formulario_externo("../view/calendario.php");
	}else{
		$view->main();
	}
	break;


	default:
		//TO DO logout();
	break;
}

//autoload con namespaces
function autoload_classes($class_name){
	$temp = explode("_", $class_name);
	//subo una rama
	$filename = "../";
	if ($temp[0] == "View") {
		$filename .= "view/".$temp[1].".view.php";

	}else if ($temp[0] == "Model") {
		$filename .= "model/".$temp[1].".model.php";

	}if ($temp[0] == "Controller") {
		$filename .= "controller/".$temp[1].".controller.php";
	}
	
	if(is_file($filename)){
		include_once $filename;
	}
}
?>