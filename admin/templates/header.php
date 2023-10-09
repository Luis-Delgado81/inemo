
<?php
  $url_base="http://localhost:8080/inemo/admin/";
?>
<!doctype html>
<html lang="es">
<head>
  <title>Administrador del sitio web</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

</head>
<body>
  <header>
   <nav class="navbar navbar-expand navbar-light bg-light">
       <div class="nav navbar-nav">
           <a class="nav-item nav-link active" href="<?php echo $url_base;?>" aria-current="page">Administrador <span class="visually-hidden">(current)</span></a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/areas/">Area</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/galerias/">Galeria</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/entradas/">Entrada</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/docentes/">Docentes</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/configuraciones/">Configuracion</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>secciones/usuarios/">Usuarios</a>
           <a class="nav-item nav-link" href="<?php echo $url_base;?>login.php">Cerrar Seccion</a>
       </div>
   </nav>
  </header>
  <main class = "container">