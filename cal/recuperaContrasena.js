$(document).ready(function() {
	$("#btnVolver").click(function(event) {
		window.location.href = 'index.php';
	});
	$("#btnCrea").click(function(event) {
		var full = true;
		//si esta lleno.
		$("input[required]").each(function(index, el) {
			//compruebo que exista el nombre.
			if ($(this).val() == "" || $(this).val() == undefined) {
				full = false;
			}
		});
		if (full) {
			var parametros = {"nombre":$("#boxNombre").val(), "ape1":$("#boxApellido1").val(), "ape2":$("#boxApellido2").val()};
			$.ajax({
				data: parametros,
				url: 'comprueba_nombre.php',
				type: 'post',
				beforeSend: function () {
				},
				success: function (response) {
					//si me devuelve algo , me devuelve el codigo de user.
					if (response[0] != false) {
						//mando el mail con el link.
						var param = {"id": response[0]}
						$.ajax({
							data: param,
							url: 'envia_mail.php',
							type: 'post',
							beforeSend: function () {
							},
							success: function (response) {
								console.log(response);
							},dataType: 'JSON'
						});
					}
				},dataType: 'JSON'
			});
		}else{
			alert("Rellene los campos obligatorios para continuar.")
		}
	});
});