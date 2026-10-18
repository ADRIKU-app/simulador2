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

  //Ocultar la seccion creditos
  document.getElementById("credito").classList.remove("activa");
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
  let cedula = recuperaraTexto("txtCedula").trim();
  let nombre = recuperaraTexto("txtNombre").trim();
  let apellido = recuperaraTexto("txtApellido").trim();
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

  // Variable para almacenar el cliente
let cliente;

// Comprobar si estamos registrando o actualizando
if (clienteSeleccionado === null) {

    // Buscar si la cédula ya está registrada
    cliente = buscarCliente(cedula);

    // Si la cédula ya existe, impedir el registro
    if (cliente !== null) {

        alert("Ya existe un cliente registrado con esta cédula.");

        return;
    }

    // Crear un cliente nuevo
    cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
    };

    // Agregar el cliente nuevo al arreglo
    clientes.push(cliente);

} else {

    // Obtener el cliente seleccionado para actualizar
    cliente = clienteSeleccionado;

    // Actualizar sus propiedades
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.ingresos = ingresos;
    cliente.egresos = egresos;
}

// Actualizar la tabla
pintarClientes();

// Limpiar el formulario
limpiar();
}

// Actualizar la tabla de clientes
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
                <button onclick="seleccionarCliente('${cliente.cedula}')">
                    Actualizar
                </button>
            </td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    }
}

function buscarCliente(cedula){

  //Recorrer el arreglo de clientes
  for(let i=0; i<clientes.length; i++){

    //Comparar la cedula del cliente actual
    if(clientes[i].cedula === cedula){
      return clientes[i];
    }
  }

  //Si no encuentra al cliente retorna null
  return null;
}

function seleccionarCliente(cedula) {

    // Buscar el cliente mediante su cédula
    let cliente = buscarCliente(cedula);

    // Verificar que el cliente exista
    if (cliente == null) {
        alert("No se encontró el cliente.");
        return;
    }

    // Guardar el cliente seleccionado
    clienteSeleccionado = cliente;

    // Mostrar los datos en los inputs
    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("ingresos", cliente.ingresos);
    mostrarTextoEnCaja("egresos", cliente.egresos);

    // Evitar modificar la cédula durante la actualización
    document.getElementById("txtCedula").readOnly = true;
}

function limpiar() {

    // Limpiar los campos de texto
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");

    // Limpiar los campos numéricos
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");

    // Restablecer el cliente seleccionado
    clienteSeleccionado = null;

    // Permitir nuevamente la edición de la cédula
    document.getElementById("txtCedula").readOnly = false;
}

function buscarClienteCredito(){

  // Recuperar la cédula ingresada
  let cedula = recuperaraTexto("buscarCedulaCredito").trim();

  //Obtener el contenedor de datos del cliente
  let datosClienteCredito = document.getElementById("datosClienteCredito");

  //Limpiar información anterior
  datosClienteCredito.innerHTML = "";

  // Limpiar información y resultados anteriores
  //mostrarTexto("datosClienteCredito", "");

  //Limpiar resultados de creditos anteriores
  document.getElementById("resultadoCredito").innerHTML = "";
  document.getElementById("resultadoCredito").className = "";

  // Mantener deshabilitado el botón Solicitar crédito
  document.getElementById("btnSolicitarCredito").disabled = true;

  //Comprobar que la cedula no esté vacía
  if(cedula === ""){
    mostrarTexto(
      "datosClienteCredito", 
      "Por favor ingrese una cedula para realizar la busqueda"
    );
    return;
  }

  //Buscar cliente en el arreglo
  let cliente = buscarCliente(cedula);

  //Comprobar si el cliente existe
  if(cliente === null){
    mostrarTexto(
      "datosClienteCredito", 
      "No se encontró ningún cliente con la cédula ingresada"
    );
    return; 
  }
  // Mostrar todos los datos del cliente encontrado
    datosClienteCredito.innerHTML = `
        <h3>Datos del Cliente</h3>

        <p><strong>Cédula:</strong> ${cliente.cedula}</p>

        <p><strong>Nombre:</strong> ${cliente.nombre}</p>

        <p><strong>Apellido:</strong> ${cliente.apellido}</p>

        <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>

        <p><strong>Egresos:</strong> ${cliente.egresos}</p>
    `;
}

