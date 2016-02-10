// Comprobamos que las contraseñas coincidad
$("#password2").keyup(function(e){
	// Checamos las contraseñas
	var pass1 = $("#password1").val()
	var pass2 = $(this).val()
	if (pass1 != pass2) {
		if ($("#password1").val() == "")
			$("#errorcontrasena").attr("data-error","Ingrese primero su contraseña")
		else
			$("#errorcontrasena").attr("data-error","Las contraseñas no coinciden")
		$(this).removeClass('valid');
        $(this).addClass('invalid');
	}else{
		$(this).removeClass('invalid');
        $(this).addClass('valid');
	}
})
