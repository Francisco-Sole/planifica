$(document).ready(function() {
	cargaDepartamentos();
	$("#btnVolver").click(function(event) {
		window.location.href = 'index.php';
	});
	$("#btnCrea").click(function(event) {
		if(!compruebaTodoRelleno(event)){
			if (compruebaPassYPass2(event)) {
				if (compruebaREGEXPEmail(event)) {
					var parametros = {"email": $("#boxEmail").val()};
					$.ajax({
						data: parametros,
						url: 'comprueba_unico_email.php',
						type: 'post',
						beforeSend: function () {
						},
						success: function (response) {
							if(response[0] == undefined){
								var parametros = {"user":$("#boxUser").val()}
								$.ajax({
									data: parametros,
									url: 'comprueba_nombre_unico.php',
									type: 'post',
									beforeSend: function () {
									},
									success: function (response) {
										if(response[0] == undefined){
											var parametros = {"user":$("#boxUser").val(),"nombre":$("#boxNombre").val(), "ape1":$("#boxApellido1").val(), "ape2":$("#boxApellido2").val(),"email":$("#boxEmail").val(),"departamento":$("#departamentos").val(),"password":$("#boxPass").val()}
											$.ajax({
												data: parametros,
												url: 'guarda_nuevo_usuario.php',
												type: 'post',
												beforeSend: function () {
												},
												success: function (response) {
													alert("Guardado con exito.");
													window.location.href = 'index.php';
												},dataType: 'JSON'
											});
										}else{
											alert("El USER proporcionado ya existe en la BD. Si no recuerda su cuenta, puede recuperarla.")
										}
									},dataType: 'JSON'
								});
							}else{
								alert("El email proporcionado ya existe en la BD. Si no recuerda su cuenta, puede recuperarla.")
							}
						},dataType: 'JSON'
					});
				}else{
					alert("Inserte un email valido para continuar.")
				}
			}else{
				alert("Password debe coincidir con confirmacion de password.")
			}
		}else{
			alert("Debe rellenar todos los campos para poder continuar.")
		}
	});
});

function compruebaTodoRelleno(e){
	var err = false;
	//compruebo todos los input
	$("input[required]").each(function(index, el) {
		if ($(this).val() == undefined || $(this).val() == "" ) {
			err = true;
		}
	});
	//si todo ok, comprueb o que el departamento eeste lleno.
	if (err == false) {
		if ( $("#departamentos").val() == "null" ) {
			err = true;
		}
	}
	return err;
}

function compruebaPassYPass2(e){
	var ok = false;
	var pass1 = $("#boxPass").val();
	var pass2 = $("#boxPass2").val();
	if (pass1 == pass2) {
		ok = true;
	}
	return ok;
}

function compruebaREGEXPEmail(e){
	//regular expresion validacion del mail.
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test($("#boxEmail").val());
}

function cargaDepartamentos(){
	$.ajax({
		url: 'carga_departamentos.php',
		type: 'post',
		beforeSend: function () {
		},
		success: function (response) {
			for (var i = 0; i < response.length; i++) {
				$("#departamentos").append("<option value='"+response[i][0]+"''>"+response[i][1]+"</option>");
			}
		},dataType: 'JSON'
	});
}

function compruebaUserUnico(){
	var parametros = {"user":$("#boxUser").val()}
	$.ajax({
		data: parametros,
		url: 'comprueba_nombre_unico.php',
		type: 'post',
		beforeSend: function () {
			$("#carga").show();
		},
		success: function (response) {
			//console.log(response);
			if(response[0] == undefined) {
				$("#carga").hide();
				$("#checkOk").show();
				$("#checkError").hide();
			}else{
				$("#carga").hide();
				$("#checkOk").hide();
				$("#checkError").show();
			}
		},dataType: 'JSON'
	});
}