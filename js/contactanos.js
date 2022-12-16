
function validarFormulario() {
  // Obtenemos los valores de los campos del formulario
  const nombre = document.getElementById("name").value;
  const correo = document.getElementById("emailAddress").value;
  const mensaje = document.getElementById("message").value;

  // Realizamos las validaciones correspondientes
  if (nombre === "") {
    alert("Por favor, ingresa tu nombre");
    return false;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
    alert("Por favor, ingresa un correo electrónico válido");
    return false;
  }
  if (mensaje.length > 100) {
    alert("El mensaje no puede exceder los 100 caracteres");
    return false;
  }

  // Si todas las validaciones fueron exitosas, retornamos true
  return true;
}


/*const nombre = document.getElementById("name")
const correo = document.getElementById("emailAddress")
const mensaje = document.getElementById("message")

    document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contactForm").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('usuario').value;
    if(usuario.length == 0) {
      alert('No has escrito nada en el usuario');
      return;
    }
    var clave = document.getElementById('clave').value;
    if (clave.length < 6) {
      alert('La clave no es válida');
      return;
    }
    this.submit();
  }*/
/*mailformulario.addEventListener()

function validarcampo(campo){
    
    if( campo.value == "") {
       window.alert("campo nombre esta vacio");

    }else{
        window.alert(campo.value)
        }
}

validarcampo(nombre);*/

//Convertir litros
function convertirMedidas(litros) {
  // Convertir litros a centilitros
  let centilitros = litros * 100;

  // Convertir litros a decilitros
  let decilitros = litros * 10;

  // Convertir litros a galones
  let galones = litros * 0.264172;

  // Convertir litros a onzas
  let onzas = litros * 33.814;

  console.log(litros + " litros son " + centilitros + " centilitros");
  console.log(litros + " litros son " + decilitros + " decilitros");
  console.log(litros + " litros son " + galones + " galones");
  console.log(litros + " litros son " + onzas + " onzas");
}


convertirMedidas(1);

//Operaciones basicas
function operacionesBasicas(num1, num2) {
  // Realizar operación de suma
  let suma = num1 + num2;

  // Realizar operación de resta
  let resta = num1 - num2;

  // Realizar operación de multiplicación
  let multiplicacion = num1 * num2;

  // Realizar operación de división
  let division = num1 / num2;

  console.log(num1 + " + " + num2 + " = " + suma);
  console.log(num1 + " - " + num2 + " = " + resta);
  console.log(num1 + " * " + num2 + " = " + multiplicacion);
  console.log(num1 + " / " + num2 + " = " + division);
}


operacionesBasicas(2, 3);

function convertirGrados(temperatura, tipo) {
  if (tipo === "C") {
    // Convertir de grados centígrados a Fahrenheit
    let fahrenheit = temperatura * 9/5 + 32;
    return fahrenheit + "°F";
  } else if (tipo === "F") {
    // Convertir de Fahrenheit a grados centígrados
    let centigrados = (temperatura - 32) * 5/9;
    return centigrados + "°C";
  }
}

console.log(convertirGrados(0, "C"));
console.log(convertirGrados(32, "F")); 


// Solicitamos la cantidad de gasolina despachada en centilitros
const cantidad = prompt("¿Cuántos centilitros de gasolina desea?");

// Convertimos la cantidad a litros y calculamos el costo total
const cantidadLitros = cantidad / 100;
const costoTotal = cantidadLitros * 25;

// Mostramos el costo total y la cantidad de gasolina despachada
console.log("El costo total es de " + costoTotal + " pesos");
console.log("Se han despachado " + cantidadLitros + " litros de gasolina");


// Solicitamos el salario del empleado
const salario = prompt("¿Cuál es el salario del empleado?");

// Verificamos en qué rango se encuentra el salario y aplicamos los cambios correspondientes
let salarioFinal = salario;
if (salario < 699999) {
  salarioFinal -= salario * 0.02;
  salarioFinal *= 1.06;
} else if (salario >= 700000 && salario <= 999999) {
  salarioFinal -= salario * 0.04;
  salarioFinal += 12000;
} else if (salario > 1000000) {
  salarioFinal -= salario * 0.06;
}

// Mostramos el salario final
console.log("El salario final es de " + salarioFinal + " pesos");
