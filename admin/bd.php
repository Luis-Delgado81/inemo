<?php
$servidor = "localhost";
$bd = "inemo";
$usuario = "root";
$contrasenia = "";

try {
   $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $contrasenia); 
     echo "Conexión realizada..!";
} 
catch (Exception $error) {
    echo $error->getMessage();
}
?>

