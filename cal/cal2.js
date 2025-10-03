/*
	DEFINIMOS CONSTANTES
	*/
//fecha
var __fecha = new Date();
//dias de la semana
var __diasDeLaSemana = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
//meses
var __meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

//datos de hoy
var __diaHoy = __fecha.getDate();
var __mesHoy = __fecha.getMonth()+1;
var __mesDelAnyo = __meses[__fecha.getMonth()]
var __anyoHoy = __fecha.getFullYear();
var __diaSemanaHoy = __diasDeLaSemana[__fecha.getDay()];

//datos del dia 1 de ese mes.
var __datosDia1 = new Date(__fecha.getTime() - ((24 * 60 * 60 * 1000) * (__diaHoy - 1)));
//obtenemos info del dia 1.
var __diaSemanaDia1 = __datosDia1.getDay();

// fin constantes


/*
	VARIABLES GLOBALES
	*/
	var __arrayDiasDelMes = new Array();
	var reservasDelMes = new Array();
	var nombreUser;
	var color;
	var miId;
	var DELAY = 400;
	var clicks = 0; 
	var timer = null;

//fin variables locales.

/*
	DOCUMENTO CARGADO
	*/
	jQuery(document).ready(function($) 
	{
		cargaSalas();
		//ocultamos la sombra
		$("#sombra").hide();
		//ponemos dia en el span
		$("#fechaActual").css({
			"font-size":"24pt"
		}).html(__diaSemanaHoy + ", " + __diaHoy + " de " + __mesDelAnyo + " del " + __anyoHoy);
		
		//asigno valor al select.
		$("#selectMesTexto").val(__mesHoy-1);
		//comprobamos que realmente esta conectado.
		compruebaUser();
		//ponemos el nombre del user
		$("#nombreUserCookie").html("Bienvenido <span style='font-weight: 900'>" + nombreUser + "</span>");
		//cargamos los datos de reservas y los pintamos.
		cargaReservas();
		//pintamos el calendario
		pintaCalendario();
		
		$("#SelectSala").change(function(event) {
			__datosDia1.setMonth($("#selectMesTexto").val());
			__datosDia1.setFullYear($("#anyoVisible").val());
			pintaCalendario('limpia');
			cargaReservas();
		});

		//comportamiento change del select.
		$("#selectMesTexto").change(function(event) {
			var mes = $(this).val();
			__datosDia1.setMonth(mes);
			__datosDia1.setFullYear($("#anyoVisible").val());
			pintaCalendario('limpia');
			cargaReservas();
		});

		//asigno valor al input de fecha.
		$("#anyoVisible").val(__anyoHoy);

		//comportamiento change del input fecha.
		$("#anyoVisible").change(function(event) {
			var anyo = $(this).val();
			__datosDia1.setFullYear(anyo);
			__datosDia1.setMonth($("#selectMesTexto").val());
			pintaCalendario('limpia');
			cargaReservas();
		});

		//ponemos la ventana de horas en medio y la escondemos
		$("#diaHoras").css({
			'top': 'calc( 50% - 282.5px )', //175px
			'left': 'calc( 50% - 200px )'
		}).hide();

		//ponemos el formulario nueva reserva en medio y lo escodemos.
		$("#formularioNuevaReserva").css({
			'top': 'calc( 50% - 141px )',
			'left': 'calc( 50% - 126px )'
		}).hide();
		
		//hover en los TD's de ventana de horas
		$("#tablaHoras >div[hora='hora']").hover(function() {
			//entra
			$(this).css({
				'border-bottom-color': 'black',
				'transition': 'all .4s'
			});
			//sale
		}, function() {
			$(this).css({
				'border-bottom-color': 'silver',
				'transition': 'all .4s'
			});
		});

		//click de los td del calendarios
		$("#tablaCalendario tr td").click(function(event) {
			muestraDia(event, $(this));
		});

		//click en los div de la ventana de horas
		$("#tablaHoras >div[hora='hora']").click(function(event){
			var temp = $(this);
	        clicks++;  //count clicks
	        if(clicks === 1) {
	        	timer = setTimeout(function() {
	                crearNuevaReserva(event, temp);  //perform single-click action    
	                clicks = 0;             //after action performed, reset counter
	            }, DELAY);
	        } else {
	            clearTimeout(timer);    //prevent single-click action
	            verNuevaReserva(event, $(this));  //perform double-click action
	            clicks = 0;             //after action performed, reset counter
	        }
	    });

		$("#droppable").droppable({
			drop: function( event, ui ) {
				console.log(ui.draggable);
				var $item = ui.draggable
				eliminarReserva(event,ui.draggable);
			}, 
			over: function (event , ui){
				$("#droppable").attr("src","img/basuraA.png");
			},
			out: function (event, ui){
				$("#droppable").attr("src","img/basuraC.png");
			},
			activate: function (event, ui){

			},
			deactivate: function (event, ui){
			}
		});

		$("#fecha").datepicker({ minDate: "D", maxDate: "+1M +10D" });
	});

	jQuery(function ($) {
		$.datepicker.regional['es'] = {
			closeText: 'Cerrar',
			prevText: '<Ant',
			nextText: 'Sig>',
			currentText: 'Hoy',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
			'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
			dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
			weekHeader: 'Sm',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
		$.datepicker.setDefaults($.datepicker.regional['es']);

		$(document).tooltip({
			track: false
		});

		$("#filtro").click(function(event) {
			muestraFiltro($(this), event);
		});
	});

	/*
	FUNCIONES
	*/

	/*
	Muestra la ventana del fitro.
	*/
	function muestraFiltro(element, e){
		var departamentos = new Array();
		//muestra  ventana
		$("#boxFiltro").show();
		//recoje todos los departamentos
		$.ajax({
			url: 'carga_departamentos.php',
			type: 'post',
			beforeSend: function () {
			},
			success: function (response) {
				departamentos = new Array();
				for (var i = 0; i < response.length; i++) {
					var temp = {};
					temp.id = response[i][0];
					temp.nombre = response[i][1];
					departamentos.push(temp);
				}
				//recoje la info (marcado o no)
				var parametros = {"id": miId, "departamentos": JSON.stringify(departamentos)};
				$.ajax({
					data: parametros,
					url: 'consulta_estado_departamentos.php',
					type: 'post',
					beforeSend: function () {
					},
					success: function (response) {
						if (response[0] == undefined) {
							//si no hay preferencias las creo.
							$.ajax({
								data: parametros,
								url: 'crea_estado_departamentos.php',
								type: 'post',
								beforeSend: function () {
								},
								success: function (response) {
									
								},dataType: 'JSON'
							});
						}else{

						}
					},dataType: 'JSON'
				});
			},dataType: 'JSON'
		});		
		//construyo la ventana
		//la posiciono
		var altura = $("#mensajeBox").innerHeight();
		$("#boxFiltro").css({
			"top": "calc( 50% - "+altura/2+"px)"
		});

		
		//la muestro
	}
	/*
	Elimina una reserva de la base de datos.
	*/
	function eliminarReserva(e,elemento){
		var autor = $(elemento).attr("nombre") + " " + $(elemento).attr("apellido1") + " " + $(elemento).attr("apellido2"); 
		if (autor == nombreUser) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(elemento).attr("idreserva");
			$(elemento).fadeOut(500).html("");
			var parametros = {"id":id};
			$.ajax({
				data: parametros,
				url: 'delete_reserva.php',
				type: 'post',
				beforeSend: function () {
				},
				success: function (response) {
					if (response == true) {
						__datosDia1.setMonth($("#selectMesTexto").val());
						__datosDia1.setFullYear($("#anyoVisible").val());
						pintaCalendario('limpia');
						cargaReservas();
						muestraMensaje("Borrado con exito!");
					}else{
						muestraMensaje("No se puedo borrar la reserva, comuniquese con su administrador.");
					}
				},dataType: 'JSON'
			});
		}
	}

	/*
	Carga las salas y llena los options del select
	*/
	function cargaSalas(){
		$.ajax({
			url: 'carga_salas.php',
			type: 'post',
			beforeSend: function () {
			},
			success: function (response) {
				for (var i = 0; i < response.length; i++) {
					$("#selectSala").append("<option value='"+response[i][0]+"''>"+response[i][1]+"</option>");
					$("#SelectSala").append("<option value='"+response[i][0]+"''>"+response[i][1]+"</option>");
				}
			},dataType: 'JSON'
		});
	}

	/*
	consulta si el div seleccionado esta ocupado, si esta libre no hace nada, sino muestra la info de la reserva.
	*/
	function verNuevaReserva(e,elemento){
		if ($(elemento).attr("estado")=="ocupado") {
			var id = $(elemento).attr("idReserva");
			verReserva($("div[id='reserva"+id+"']"));
		}
	}

	/*
	Pinta el calendario, puedes pasar parametro para limpiar el calendario.
	*/
	function pintaCalendario(parametro){
		if (parametro == 'limpia') {
			$("#tablaCalendario tr td").each(function(index, el) {
				$(this).empty()
				.removeAttr('dia')
				.removeAttr('mes')
				.removeAttr('anyo')
				.removeAttr('diaTexto')
				.removeAttr('mesTexto')
				.removeAttr('diaTextoNum');
			});
		}

	//printamos las cabezeras del calendario
	$("#tablaCalendario tr th").each(function(index, el) 
	{
		//si el dia es domingo, pintalo el ultimo no el primero
		if (index == 6) 
		{
			$(this).html(__diasDeLaSemana[0]).css({
				"width": 'calc( 97vw / 7 )'
			});	
		}
		else
		{
			$(this).html(__diasDeLaSemana[index+1]).css({
				"width": 'calc( 97vw / 7 )'
			});	
		}
	});

	//hacemos un array con los dias del mes.
	var dia=1;
	var i=0;
	__arrayDiasDelMes = new Array();
	while(dia <= __datosDia1.getDate()){
		__arrayDiasDelMes[i] = {};
		__arrayDiasDelMes[i]['dia'] = __datosDia1.getDate();
		__arrayDiasDelMes[i]['mes'] = __datosDia1.getMonth();
		__arrayDiasDelMes[i]['anyo'] = __datosDia1.getFullYear();
		__arrayDiasDelMes[i]['diaTexto'] = __diasDeLaSemana[__datosDia1.getDay()];
		__arrayDiasDelMes[i]['mesTexto'] = __meses[__datosDia1.getMonth()];
		__arrayDiasDelMes[i]['diaTextoNum'] = __datosDia1.getDay();
		i++;
		dia++;
		__datosDia1.setDate(dia);
	}

	//empezamos en semana 1
	var sem=1;
	var izq;
	//bloque pinto dias del mes.
	//recorro el array, y busco por dia y dia de la semana, si el dia de la semana llega a domingo sumo 1 a la semana actual.
	for (var i = 0; i < __arrayDiasDelMes.length; i++) {
		//si el dia 1 es lunes, emepezamos en semana 2.
		if (i==0 && __arrayDiasDelMes[0]['diaTextoNum'] == 1) {
			sem = 2;
		}
		id = "td-"+sem+"-"+__arrayDiasDelMes[i]['diaTextoNum'];
		//si solo es de un digito lo centro.
		if (__arrayDiasDelMes[i]['dia'].toString().length == 1) {
			izq= "8.5";
		}
		else{
			izq = "3.5";
		}
		var color = "transparent";
		//si el dia del array coincide con hoy lo pinto.
		if (__arrayDiasDelMes[i]['dia'] == __diaHoy && (__arrayDiasDelMes[i]['mes']+1)== __mesHoy && __arrayDiasDelMes[i]['anyo'] == __anyoHoy) {
			color = "#00C0F3";
		}
		else{
			color = "transparent";
		}
		//genero el dia, un circulo y le asigno unos atributos.
		$("#"+id).html("<div id='redondo"+__arrayDiasDelMes[i]['dia']+"' class='redondo' style='height:25px; width:25px; border-radius:50%; background-color: "+color+"'></div><span style='position:relative;top:-24px;left:"+izq+"px'>"+__arrayDiasDelMes[i]['dia']+"</span><hr class='hrWapo' style='width:100%; margin-top:-15px;'>").attr({
			dia: __arrayDiasDelMes[i]['dia'] ,
			mes: __arrayDiasDelMes[i]['mes'] ,
			anyo: __arrayDiasDelMes[i]['anyo'] ,
			diaTexto: __arrayDiasDelMes[i]['diaTexto'] ,
			mesTexto: __arrayDiasDelMes[i]['mesTexto'] , 
			diaTextoNum: __arrayDiasDelMes[i]['diaTextoNum']
		});
		//si llego a domingo , cambio de semana.
		if (__arrayDiasDelMes[i]['diaTextoNum'] == 0){
			sem++;
		}
	}
	//fin bloque pinto dias del mes.
	
	//bloque pinto dias antes de mes
	/*
		TO DO 
		*/
	//fin bloque pinto dias antes de mes

	//bloque pinto dias despues de mes
	/*
		TO DO 
		*/
	//fin bloque pinto dias despues de mes
	
};

	/*
	Muestra el pop up de las horas, pone el dia del click y le asigna unos attr., si hay reservas las pinta en el dia correpondiente.
	*/
	function muestraDia (e, elemento){

		//recogemos las variables
		var a = $(elemento).attr("diatexto");
		var b = $(elemento).attr("dia");
		var c = $(elemento).attr("mestexto");
		var d = $(elemento).attr("anyo");
		var e = $(elemento).attr("mes");
		if (a!=undefined) {
			$("#diaSeleccionado").html(a + ", " + b + " de " + c + " del "+d);
			var index = 9;
			//limpiamos las horas por si hay algo pintado.
			while(index <= 19){	
				$("div[hora='hora']").attr("estado","libre").css({
					"background-color": "#DEECF9"
				}).html("");
				index++;	
			}
			$(elemento).children("div[id^='reserva']").each(function(index, el) {
				var HHini = $(this).attr("horaMin");
				var HHmax = $(this).attr("horaMax");
				var currentHoraMin = $(this).attr("horaMin").split(":")[0];
				//currentHoraMin += ":00";
				var currentMinMin = $(this).attr("horaMin").split(":")[1];
				var currentHoraMax = $(this).attr("horaMax").split(":")[0];
				//currentHoraMax += ":00";
				var currentMinMax = $(this).attr("horaMax").split(":")[1];
				var currentDescripcion = $(this).attr("descripcion");
				var currentColor = $(this).attr("userColor");
				var hora = parseInt(currentHoraMin);
				var idd = $(this).attr("idReserva");

				//pintamos la primera franja, para poner la descripcion.
				$("div[HH='" + HHini + "']").attr("estado","ocupado").attr("idReserva",idd).attr("color", currentColor).css({
					"background-color": currentColor
				}).html("<span style='color: white'>"+currentDescripcion+"</span>").css({
					"font-weight": "bold"
				});
				var h = new Date('1/1/1990 '+HHini)
				var z = HHini;

				//pintamos el cuerpo
				while(h < new Date('1/1/1990 '+HHmax)){
					$("div[HH='" + z + "']").attr("estado","ocupado").attr("idReserva",idd).attr("color", currentColor).css({
						"background-color": currentColor
					});
					var d = new Date();
					h.setMinutes(h.getMinutes() + 15);
					//console.log(h);
					z=h.getHours();
					if(z.toString().length == 1){
						z = "0"+z; 
					}
					if (h.getMinutes() == 0) {
						z+=":00"
					}
					else{
						z+=":"+h.getMinutes()
					}
					z+=":00";
					//console.log(z);
				}
			});
			$("#diaHoras").attr({
				'dia': b,
				'mes': e,
				'anyo': d
			}).fadeIn(400);
		}
	};

/*
	Cierra la ventana de de los horarios
	*/
	function cerrarVentanaDiaHoras(){
		$("#diaHoras").fadeOut(400);
	}

/*
	Muestra el formulario de reserva, pone datos.
	*/
	function crearNuevaReserva(e, elemento){
		console.log(elemento)
		if (elemento.attr("estado") == "libre") {
		//cojo los attr para rellenar el form.
		var a = $(elemento).attr("HH");
		var hhInicio = a.split(":")[0];
		var mmInicio = a.split(":")[1];
		var b = $("#diaHoras").attr("dia");
		var c = $("#diaHoras").attr("mes");
		var d = $("#diaHoras").attr("anyo");
		$("#nombreUsuario").val(nombreUser);
		$("#horaInicio").val(parseInt(hhInicio));
		$("#horaFinal").val(parseInt(hhInicio)+1);
		$("#minutosInicio").val(parseInt(mmInicio));
		$("#minutosFinal").val(parseInt(mmInicio));
		$("#fecha").val(b+"/"+(parseInt(c)+1)+"/"+d).attr("readOnly", true);
		$("#tituloVentanaNuevaReserva").html("Nueva reserva");
		$("#btnGrabar").removeAttr("disabled").html("Grabar").removeAttr('idMod');
		$("#nombreUsuario").removeAttr("disabled");
		$("#fecha").removeAttr("disabled");
		$("#descripcion").removeAttr("disabled").val("");
		$("#horaInicio").removeAttr("disabled");
		$("#minutosInicio").removeAttr("disabled");
		$("#horaFinal").removeAttr("disabled");
		$("#minutosFinal").removeAttr("disabled");
		$("#selectSala").val($("#SelectSala").val()).attr("disabled", true);
		muestraFormularioNuevaReserva();
	}else{
		muestraMensaje("La hora seleccionada no esta libre, pruebe con otra hora.");
	}	
}

	/*
	Hace aparecer el formulario, pudes pasarle parametros.
	*/
	function muestraFormularioNuevaReserva(parametro){
		$("#sombra").show();
		$("#formularioNuevaReserva").fadeIn(400);
	}

	/*
	Cierra el formulario de reserva.
	*/
	function cerrarFormularioNuevaReserva(){
		$("#sombra").fadeOut(400);
		$("#formularioNuevaReserva").fadeOut(400);
	}

	/*
	graba la solicitud de reserva
	*/
	function grabarNuevaReserva(){
	//cogemos las variables
	var horaInicio = $("#horaInicio").val();
	var minutosInicio = $("#minutosInicio").val();
	var horaFinal = $("#horaFinal").val();
	var minutosFinal = $("#minutosFinal").val();
	var descripcion = $("#descripcion").val();
	var idSala = $("#selectSala").val();
	var fecha = $("#fecha").val();
	//si es 0 le ponemos otro para comparar horas.
	if (minutosInicio == 0) {
		minutosInicio = "00";
	}
	if (minutosFinal == 0) {
		minutosFinal = "00";
	}
	var horaI = horaInicio+":"+minutosInicio;
	var horaF = horaFinal+":"+minutosFinal;
	//construimos las horas para comparar.
	var tiempoInicio = horaInicio + minutosInicio;
	var tiempoFinal = horaFinal + minutosFinal;
	//si inicio es mayor que final con diferencia de 30 min.
	if ((parseInt(tiempoInicio)+30) <= parseInt(tiempoFinal)) {
		// si rellenó la descripcion
		if (descripcion.length > 0) {
			//comprobamos que las horas seleccionadas no esten pilladas realmente.
			var parametros = {"fecha":fecha, "horaI":horaI, "horaF":horaF, "idSala": idSala};
			$.ajax({
				data: parametros,
				url: 'comprueba_horas.php',
				type: 'post',
				beforeSend: function () {
				},
				success: function (response) {
					if (response[0] == true && response[1] == true) {
		        				//el texto del boton es para grabar
		        				if ($("#btnGrabar").html() == "Grabar") 
		        				{
		        					var parametros = {"user": miId, "fecha": fecha, "descripcion": descripcion, "horaInicio": horaI, "horaFinal":horaF, "idSala": idSala};
		        					$.ajax({
		        						data: parametros,
		        						url: 'guardar_reservas.php',
		        						type: 'post',
		        						beforeSend: function () {
		        						},
		        						success: function (response) {
		        							if (response == true) {
						        		//la llamada devuelve true o false.
						        		__datosDia1.setMonth($("#selectMesTexto").val());
						        		__datosDia1.setFullYear($("#anyoVisible").val());
						        		pintaCalendario('limpia');
						        		cargaReservas();
						        		cerrarVentanaDiaHoras();
						        		cerrarFormularioNuevaReserva();
						        		muestraMensaje("Grabado correctamente!");
						        	}else{
						        		muestraMensaje("Error al intentar grabar, comuniquese con el administrador.");
						        	}
						        },dataType: 'JSON'
						    });
						// o si el texto es para updatear
					}else if($("#btnGrabar").html() == "Guardar cambios")
					{
						var parametros = {"user": $("#btnGrabar").attr("idMod"), "fecha": fecha, "descripcion": descripcion, "horaInicio": horaI, "horaFinal":horaF, "idSala": idSala};
						$.ajax({
							data: parametros,
							url: 'update_reservas.php',
							type: 'post',
							beforeSend: function () {
							},
							success: function (response) {
								if (response == true) {
						        		//la llamada devuelve true o false.
						        		__datosDia1.setMonth($("#selectMesTexto").val());
						        		__datosDia1.setFullYear($("#anyoVisible").val());
						        		pintaCalendario('limpia');
						        		cargaReservas();
						        		cerrarVentanaDiaHoras();
						        		cerrarFormularioNuevaReserva();
						        		muestraMensaje("Grabado correctamente!");
						        	}else{
						        		muestraMensaje("Error al intentar modificar, comuniquese con el administrador.");
						        	}
						        },dataType: 'JSON'
						    });
					}else
					{
						muestraMensaje("Error 0x00100A, contacte su administrador.");		
					}
				}else
				{
					muestraMensaje("Hora de inicio u hora final no son correctas.");
				}
			},dataType: 'JSON'
		});				
		}else
		{
			muestraMensaje("Debe inidicar una descripcion en la reserva.");
		}
	}
	else{
		muestraMensaje("La diferencia minima es de 30 minutos.");
	}
	//solo para info.
	var datos = {};
	datos.nombre = $("#nombreUsuario").val();
	datos.fecha = $("#fecha").val();
	datos.descripcion = $("#descripcion").val();
	datos.horaInicio = $("#horaInicio").val()+":"+$("#minutosInicio").val();
	datos.horaFinal = $("#horaFinal").val()+":"+$("#minutosFinal").val();
	console.log(datos);

}

function compruebaUser(){
	nombreUser = $.cookie('user');
	miId = $.cookie('id');
	if (nombreUser == null ) {
		//no existen las cookies, entrada forzada. lo echamos.
		window.location.href = 'index.php'; 
	}
}

	/*
	Descarga las reserva de la base de datos y las guarda en un array.
	*/
	function cargaReservas(){
		reservasDelMes = new Array();
		var temp = {}
		var parametros = {"mes": parseInt($("#selectMesTexto").val())+1};
		$.ajax({
			data: parametros,
			url: 'carga_reservas.php',
			type: 'post',
			beforeSend: function () {
			},
			success: function (response) {
				for (var i = 0; i < response.length; i++) {
					temp = {};
					temp.idReserva = response[i][0];
					temp.fecha = response[i][1];
					temp.descripcion = response[i][2];
					temp.horaMin = response[i][3];
					temp.horaMax = response[i][4];
					temp.idUsuario = response[i][5];
					temp.color = response[i][6];
					temp.nombre = response[i][7];
					temp.apellido1 = response[i][8];
					temp.apellido2 = response[i][9];
					temp.idSala = response[i][10];
					reservasDelMes.push(temp);
				}
				pintaReservas();
			},dataType: 'JSON'
		});
		console.info(reservasDelMes); 
	}


	/*
	Pinta las reservas que se han descargado en el array.
	*/
	function pintaReservas(){
		var letras;
		$("#tablaCalendario tr td").each(function(index, el) {
		//si el td no tiene los atributos paso de consutar el dia, por que no tiene pintado nada.
		if ($(this).attr("dia")!= undefined && $(this).attr("mes")!= undefined && $(this).attr("anyo")!= undefined) {
			//recorremos mientras tengamos elementos y no se encuentre un elemento querido.
			for(var i=0; i<reservasDelMes.length ;i++){
				//comprobamos que el dia x (this) tiene o no reservas.
				var dia = reservasDelMes[i].fecha.split("-")[2];
				var mes = reservasDelMes[i].fecha.split("-")[1];
				var ano = reservasDelMes[i].fecha.split("-")[0];
				var color = reservasDelMes[i].color;
				var idReserva = reservasDelMes[i].idReserva;
				var horaMin = reservasDelMes[i].horaMin;
				var horaMax = reservasDelMes[i].horaMax;
				var descripcion = reservasDelMes[i].descripcion;
				var nombre = reservasDelMes[i].nombre;
				var apellido1 = reservasDelMes[i].apellido1;
				var apellido2 = reservasDelMes[i].apellido2;
				var idSala = reservasDelMes[i].idSala;
				if (parseInt($(this).attr("dia")) == parseInt(dia) && parseInt($(this).attr("mes"))+1 == parseInt(mes) && parseInt($(this).attr("anyo")) == parseInt(ano) && parseInt($("#SelectSala").val()) == parseInt(idSala)) {
					var that = $(this);
					letras = "";
					//por si en el nombre tienen mas de uno
					var temp = nombre.split(" ");
					for (var j = 0; j < temp.length; j++) {
						letras+= temp[j].substr(0,1).toUpperCase();
					}
					//por si en el apellido1 tienen mas de uno
					var temp = apellido1.split(" ");
					for (var k = 0; k < temp.length; k++) {
						letras+= temp[k].substr(0,1).toUpperCase();
					}
					//por si en el apellido2 tienen mas de uno
					var temp = apellido2.split(" ");
					for (var l = 0; l < temp.length; l++) {
						letras+= temp[l].substr(0,1).toUpperCase();
					}
					var izq
					if (letras.length == 2) 
					{
						izq = 7;
					}else if (letras.length == 3) {
						izq = 3;
					}
					else if (letras.length == 4) {
						izq = 0;
					}
		        	//si es esl dia, mes y año pinta las bolitas.
		        	$(that).append("<div id='reserva"+idReserva+"' idReserva='"+idReserva+"' dia='"+dia+"' mes='"+mes+"' ano='"+ano+"' horaMin='"+horaMin+"' horaMax='"+horaMax+"' descripcion='"+descripcion+"' userColor='"+color+"' nombre='"+nombre+"' apellido1='"+apellido1+"' apellido2='"+apellido2+"' sala='"+idSala+"' class='reserva draggable' style='float:left; height:30px; width:30px; border-radius:50%; cursor:pointer; font-size: 8pt;background-color: "+color+"; color:white'><span style='position:relative; top:8px; left:"+izq+"px'>"+ letras +"</span></div>");
		        	$("#reserva"+idReserva).bind('click', function(event) {
		        		event.stopPropagation();
		        		verReserva($(this));
		        	}).draggable({ revert: true, scroll: false });   
		        }
		    }
		};		
	});	
	}

	/*
	Muestra los datos de una reserva, y si el usuario es el correcto, permite su edicion o eliminacion.
	*/
	function verReserva(elemento){
		var a = $(elemento).attr("dia");
		var b = $(elemento).attr("mes");
		var c = $(elemento).attr("ano");
		var d = $(elemento).attr("horaMin");
		var e = $(elemento).attr("horaMax");
		var dd = $(elemento).attr("horaMin").split(":")[1];
		var ee = $(elemento).attr("horaMax").split(":")[1];
		var f = $(elemento).attr("descripcion");
		var g = $(elemento).attr("idReserva");
		var h = $(elemento).attr("nombre");
		var i = $(elemento).attr("apellido1");
		var j = $(elemento).attr("apellido2");
		var k = $(elemento).attr("sala"); 
		
		$("#nombreUsuario").val(h+" "+i+" "+j);
		$("#horaInicio").val(parseInt(d));
		$("#minutosInicio").val(parseInt(dd));
		$("#horaFinal").val(parseInt(e));
		$("#minutosFinal").val(parseInt(ee));
		$("#descripcion").val(f);
		$("#fecha").val(a+"/"+b+"/"+c);
		$("#selectSala").val(k);
		$("#tituloVentanaNuevaReserva").html("Ver/Modificar reserva");
		if (nombreUser == (h+" "+i+" "+j)) {
			//si el user es el mismo, puede modificar
			$("#btnGrabar").removeAttr( "disabled").html("Guardar cambios").attr("idMod", g);
			$("#nombreUsuario").removeAttr( "disabled");
			$("#fecha").removeAttr( "disabled").removeAttr("readOnly");
			$("#descripcion").removeAttr( "disabled");
			$("#horaInicio").removeAttr( "disabled");
			$("#minutosInicio").removeAttr( "disabled");
			$("#horaFinal").removeAttr( "disabled");
			$("#minutosFinal").removeAttr( "disabled");
			$("#selectSala").removeAttr("disabled");
		}
		else
		{
			//sino no.
			$("#btnGrabar").attr( "disabled", true ).removeAttr("idMod");
			$("#nombreUsuario").attr( "disabled", true );
			$("#fecha").attr( "disabled", true ).attr("readOnly", true);
			$("#descripcion").attr( "disabled", true );
			$("#horaInicio").attr( "disabled", true );
			$("#minutosInicio").attr( "disabled", true );
			$("#horaFinal").attr( "disabled", true );
			$("#minutosFinal").attr( "disabled", true );
			$("#selectSala").attr("disabled", true);
		}
		muestraFormularioNuevaReserva();	
	}

	function muestraMensaje(texto){
		var altura = $("#mensajeBox").innerHeight();
		$("#mensajeBox").css({
			"top": "calc( 50% - "+altura/2+"px)"
		}).html(texto)
		.fadeIn(400)
		.delay(800)
		.fadeOut(400);
	}

	function boteCerrado(){
		$("#droppable").attr("src","img/basuraC.png");
	}

	function logOut(){
		$.removeCookie('user');
		$.removeCookie('id');
		window.location.href = 'index.php'; 
	}