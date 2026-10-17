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
  document.getElementById("clientes").classList.remove("activa");
}

function mostrarSeccion(id){

  //Ocultar todas las secciones
  ocultarSecciones();

  //Mostrar únicamente la seccion seleccionada
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){

  // Obtener el valor ingresado y convertirlo a número decimal
  let nuevaTasa = recuperarFloat("tasaInteres");

  //Verificar que sea un numero entre 10 y 20
  if(nuevaTasa>=10 && nuevaTasa<=20){
    tasaInteres = nuevaTasa;

    //Mostrar mensaje de confirmacion
    mostrarTexto(
      "mensajeTasa", 
      `Tasa configurada correctamente: ${nuevaTasa}%`
    );
  }else{

    //Mostrar mensaje de tasa incorrecta
    mostrarTexto(
        "mensajeTasa",
        "La tasa debe estar entre 10% y 20%"
    );
  }
}

function guardarCliente(){
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  // Validar campos de texto obligatorios
  if (
    cedula.trim() === "" ||
    nombre.trim() === "" ||
    apellido.trim() === ""
  ) {
    alert("Por favor, complete los datos del cliente.");
    return;
  }

  // Validar ingresos y egresos
  if (
    !Number.isFinite(ingresos) ||
    !Number.isFinite(egresos) ||
    ingresos < 0 ||
    egresos < 0
  ) {
    alert("Ingrese valores numéricos válidos para ingresos y egresos.");
    return;
  }

  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  }

  clientes.push(cliente);

  // Actualizar la tabla de clientes
  pintarClientes();
}

function pintarClientes() {

    // Obtener el cuerpo de la tabla
    let tabla = document.getElementById("tablaClientes");

    // Limpiar la tabla
    tabla.innerHTML = "";

    // Recorrer el arreglo de clientes
    for (let i = 0; i < clientes.length; i++) {

        // Obtener el cliente actual
        let cliente = clientes[i];

        // Crear una nueva fila
        let fila = document.createElement("tr");

        // Generar las celdas
        fila.innerHTML = `
            <td>${cliente.cedula}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.ingresos}</td>
            <td>${cliente.egresos}</td>
            <td>
                <button>
                    Actualizar
                </button>
            </td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    }
}