<?php
$link = new mysqli("127.0.0.1", "root", "", "calendario");
//$link = new mysqli("195.55.253.42", "web", "Bezoya2016", "modulocliente");
//$link = new mysqli("localhost", "root", "masterkey", "calendario");

$link->set_charset("utf8");

return $link
?>