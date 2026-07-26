// ==========================
// CONFIGURACIÓN
// ==========================

const OBJETIVO_MINIMO = 1000;
const OBJETIVO_IDEAL = 1500;

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

// ==========================
// FUNCIONES
// ==========================

function actualizar() {

    // Dinero
    dineroTexto.textContent = dinero + " €";

    // Barra
    let porcentaje = (dinero / OBJETIVO_IDEAL) * 100;

    if (porcentaje > 100) {
        porcentaje = 100;
    }

    barra.style.width = porcentaje + "%";

    // Porcentaje
    porcentajeTexto.textContent = Math.round(porcentaje) + "%";

    // Texto de progreso
    if (dinero < OBJETIVO_MINIMO) {

        progresoTexto.innerHTML =
            "⏳ Te faltan <b>" + (OBJETIVO_MINIMO - dinero) + " €</b> para el objetivo mínimo.";

        mensaje.textContent = "🚀 Sigue ahorrando.";

    } else if (dinero < OBJETIVO_IDEAL) {

        progresoTexto.innerHTML =
            "🎯 Objetivo mínimo conseguido. Te faltan <b>" + (OBJETIVO_IDEAL - dinero) + " €</b> para el objetivo ideal.";

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
// INICIO
// ==========================

actualizar();