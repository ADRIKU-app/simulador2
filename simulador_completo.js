  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){

  //Ocultar la seccion parametros
  document.getElementById("parametros").classList.remove("activa");

  //Ocultar la seccion clientes
  document.getElementById("clientes").classList.remove("activas");
}