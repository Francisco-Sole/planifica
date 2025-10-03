<?php
	require_once 'mailer/class.phpmailer.php';
	require_once 'DBconect.php';
	$id = $_POST["id"];
	$correo = "";
	//recuperamos el email	
	$temp = [];
	$consulta ="SELECT
				  `email`
				FROM
				  `usuarios`
				WHERE
				  `idUsuario` = '".$id[0]."'"; 
	$result = mysqli_query($link, $consulta);
	while (($res= mysqli_fetch_row($result)) != null) {
		$correo = $res;
	}
	$emailTo = $correo[0];
	$mail = new PHPMailer();
                //indicate to use SMTP
	$mail->isSMTP();
                //not show nothing
	$mail->SMTPDebug = 2;
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = "ssl";
                //start server SMTP gmail
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 465;
                //user/password for gmail account
	$mail->Username = "fallenofmen@gmail.com";
	$mail->Password = "Franc9983212";
	$mail->isHTML(true);
	$mail->setFrom('calendario.admin@impackta.com', 'Administration');
	$mail->addReplyTo("calendario.admin@impackta.com", "Administrator");
	$cript1 = "";
	$cript2 = "";
    //codificamos...
    //primero el id.
    for ($j = 0; $j < strlen($id[0]); $j++)
	{
        $cript1 .= ord($id[0]{$j}) + 5; //5  es random.
        $cript1 .= "$";
    }
	
	for ($i = 0; $i < strlen($correo[0]); $i++)
	{
        $cript2 .= ord($correo[0]{$i}) + 5; //5 is a random number.
        $cript2 .= "$";
    }
    //final encrypt.
    $cript1 = bin2hex($cript1);
    $cript2 = bin2hex($cript2);
    $content = "<b>Click <a href='localhost/proyecto/TheFallOfMen/index.php?id=" . $cript1 . "&ssh=" .$cript2. "&token=" . md5("Franky") . "'>aqui</a> para reiniciar tu cuenta de calendario.</b>";
    $mail->Subject = "Reset password";
    $mail->msgHTML($content);
    //indicate the receiver
    $address = $emailTo;
    var_dump($emailTo);
    $mail->addAddress($address, "Usuario, bienvenido");
    if (!$mail->send())
    {
       echo false;
    }
    else
    {
      echo true;
    }

    ya me envia los email.
    cambiat el false y el true por texto.