// ==========================
// CONFIGURACIÓN
// ==========================

let objetivoMinimo = Number(localStorage.getItem("objetivoMinimo")) || 1000;
let objetivoIdeal = Number(localStorage.getItem("objetivoIdeal")) || 1500;

// ==========================
// VARIABLES
// ==========================

let dinero = Number(localStorage.getItem("dinero")) || 0;

// ==========================
// ELEMENTOS HTML
// ==========================

const dineroTexto = document.getElementById("dinero");
const barra = document.getElementById("progreso");
const porcentajeTexto = document.getElementById("porcentaje");
const progresoTexto = document.getElementById("progresoTexto");
const mensaje = document.getElementById("mensaje");
const popup = document.getElementById("popupAjustes");
const abrirAjustes = document.getElementById("abrirAjustes");
const cerrarAjustes = document.getElementById("cerrarAjustes");
const guardarAjustes = document.getElementById("guardarAjustes");

const nombreProyectoInput = document.getElementById("nombreProyecto");
const objetivoMinimoInput = document.getElementById("objetivoMinimo");
const objetivoIdealInput = document.getElementById("objetivoIdeal");

const tituloProyecto = document.getElementById("tituloProyecto");
const emojiPrincipal = document.querySelector(".emojiPrincipal");
const marcaMinima = document.getElementById("marcaMinima");
const marcaIdeal = document.getElementById("marcaIdeal");
let emojiSeleccionado = "";

// ==========================
// FUNCIONES
// ==========================

function actualizar() {

    // Dinero
    dineroTexto.textContent = dinero + " €";
    marcaMinima.textContent = objetivoMinimo + " €";
    marcaIdeal.textContent = objetivoIdeal + " €";

    // Barra
    let porcentaje = (dinero / objetivoIdeal) * 100;

    if (porcentaje > 100) {
        porcentaje = 100;
    }

    barra.style.width = porcentaje + "%";

    // Porcentaje
    porcentajeTexto.textContent = Math.round(porcentaje) + "%";

    // Texto de progreso
    if (dinero < objetivoMinimo) {

        progresoTexto.innerHTML =
            "⏳ Te faltan <b>" + (objetivoMinimo - dinero) + " €</b> para el objetivo mínimo.";

        mensaje.textContent = "🚀 Sigue ahorrando.";

    } else if (dinero < objetivoIdeal) {

        progresoTexto.innerHTML =
            "🎯 Objetivo mínimo conseguido. Te faltan <b>" + (objetivoIdeal - dinero) + " €</b> para el objetivo ideal.";

        mensaje.textContent = "👏 ¡Buen trabajo!";

    } else {

        progresoTexto.innerHTML =
            "🏆 ¡Has alcanzado el objetivo ideal!";

        mensaje.textContent = "🎉 ¡Felicidades!";

    }
    
    localStorage.setItem("dinero", dinero);

}

// ==========================
// BOTONES
// ==========================

function sumar(cantidad) {

    dinero += cantidad;
    actualizar();

}

function restar(cantidad) {

    dinero -= cantidad;

    if (dinero < 0) {
        dinero = 0;
    }

    actualizar();

}

// ==========================
// CARGAR AJUSTES
// ==========================

const nombreGuardado = localStorage.getItem("nombreProyecto");
const emojiGuardado = localStorage.getItem("emojiProyecto");

if(nombreGuardado){

    tituloProyecto.textContent = nombreGuardado;
    nombreProyectoInput.value = nombreGuardado;

}

if(emojiGuardado){

    emojiPrincipal.textContent = emojiGuardado;
    emojiSeleccionado = emojiGuardado;

}

objetivoMinimoInput.value = objetivoMinimo;
objetivoIdealInput.value = objetivoIdeal;

// ==========================
// INICIO
// ==========================

actualizar();

// ==========================
// POPUP AJUSTES
// ==========================

abrirAjustes.onclick = function() {

    popup.style.display = "flex";

}

cerrarAjustes.onclick = function() {

    popup.style.display = "none";

}

// ==========================
// SELECCIÓN DE EMOJIS
// ==========================

const emojis = document.querySelectorAll(".emoji");

emojis.forEach(function(boton){

    if(boton.textContent == emojiGuardado){

        boton.classList.add("seleccionado");

    }

});

emojis.forEach(function(boton){

    boton.onclick = function(){

        emojis.forEach(function(e){

            e.classList.remove("seleccionado");

        });

        boton.classList.add("seleccionado");

        emojiSeleccionado = boton.textContent;

    };

});

// ==========================
// GUARDAR AJUSTES
// ==========================

guardarAjustes.onclick = function(){

    // Cambiar el nombre
    if(nombreProyectoInput.value != ""){

        tituloProyecto.textContent = nombreProyectoInput.value;

    }

    // Cambiar el emoji
    if(emojiSeleccionado != ""){

        emojiPrincipal.textContent = emojiSeleccionado;

    }

    // Cerrar el popup
    popup.style.display = "none";

    localStorage.setItem("nombreProyecto", tituloProyecto.textContent);
    localStorage.setItem("emojiProyecto", emojiPrincipal.textContent);
    if(objetivoMinimoInput.value != ""){

    objetivoMinimo = Number(objetivoMinimoInput.value);
    localStorage.setItem("objetivoMinimo", objetivoMinimo);

}

    if(objetivoIdealInput.value != ""){

    objetivoIdeal = Number(objetivoIdealInput.value);
    localStorage.setItem("objetivoIdeal", objetivoIdeal);

}

actualizar();

}



