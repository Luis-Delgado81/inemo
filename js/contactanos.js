"use strict"

const nombre = document.getElementById('name')
/*const correo = document.getElementById('emailAddress')*/


function validarformulario(nombre){
    
    if( nombre.value == "") {
       window.alert("campo nombre esta vacio");

    }else{
        window.alert(nombre.value)
        }
}

validarformulario(nombre);




