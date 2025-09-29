<?php
session_start();
$ip = $_SERVER["REMOTE_ADDR"];
setcookie("direccion", $ip, time()+3600*24*365); //un año de vida
$_SESSION["iduser"] = md5($ip);

header("Location: ./php/index.php");
?>