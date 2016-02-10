var app = angular.module('versiones', [])
var url_server = 'http://127.0.0.1:8080/';
/* Controlador de login */
app.controller('proyectoController', function($scope, $http){
    var idf =  $("#idarchivo").val()
    $http.get(url_server+"contenido/"+idf).success(function(response) {
            editor.setValue(response.contenido.contenido)
    });
	$("textarea").keyup(function(e){
        //alert(editor.getValue())
        //showCode()
        var datos = {
            contenido: editor.getValue(),
            idf: $("#idarchivo").val()
        }
        $http.post(url_server+"guardar", datos).success(function(response) {
            
        });
    })
});