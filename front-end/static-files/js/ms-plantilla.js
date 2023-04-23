/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}



/* Plantilla de datosJugadoresvacíos */
Plantilla.datosJugadoresNulos = {
    playerId: "undefined",
    name: "undefined",
    surname: "undefined",
    dateBirth: "undefined",
    seasonsPlayed: "undefined",
    goalSeason: "undefined",
    disqualified: "undefined"
}



// Plantilla de tags
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "PLAYERID": "### PLAYERID ###",
    "NAME": "### NAME ###",
    "SURNAME": "### SURNAME ###",
    "DATE_BIRTH": "### DATE_BIRTH ###",
    "SEASONS_PLAYED": "### SEASONS_PLAYED ###",
    "GOAL_SEASON": "### GOAL_SEASON ###",
    "DISQUALIFIED": "### DISQUALIFIED ###"
}



/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 *
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/balonmano/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/balonmano/acercade", this.mostrarAcercaDe);
}

//Tabla donde irán los jugadores
Plantilla.plantillaTablaJugadores = {}

// Cabecera de la tabla para solo los nombres
Plantilla.plantillaTablaJugadores.headerNombres = `<table width="100%" class="listado_jugadores">
<thead>
    <th width="5%">ID</th>
    <th width="15%">Nombre</th>
    <th width="15%">Apellidos</th>
</thead>
<tbody>`;

// Cabecera de la tabla para solo los nombres
Plantilla.plantillaTablaJugadores.headerTodosDatos = `<table width="100%" class="listado_jugadores_completo">
<thead>
    <th width="5%">ID</th>
    <th width="10%">Nombre</th>
    <th width="10%">Apellidos</th>
    <th width="10%">Fecha de Nacimiento</th>
    <th width="20%">Temporadas Jugadas</th>
    <th width="20%">Goles por Temporada</th>
    <th width="10%">Descalificado</th>
</thead>
<tbody>`;


//Elementos RT que muestra los datos de un jugador de balonmano
Plantilla.plantillaTablaJugadores.cuerpoNombres = `
<tr title="${Plantilla.plantillaTags.NAME}">
    <td>${Plantilla.plantillaTags.PLAYERID}</td>
    <td>${Plantilla.plantillaTags.NAME}</td>
    <td>${Plantilla.plantillaTags.SURNAME}</td>
    <td>
    <div></div>
</td>
</tr>`;



//Elementos RT que muestra los datos de un jugador de balonmano
Plantilla.plantillaTablaJugadores.cuerpoCompleto = `
<tr title="${Plantilla.plantillaTags.NAME}">
    <td>${Plantilla.plantillaTags.PLAYERID}</td>
    <td>${Plantilla.plantillaTags.NAME}</td>
    <td>${Plantilla.plantillaTags.SURNAME}</td>
    <td>${Plantilla.plantillaTags.DATE_BIRTH}</td>
    <td>${Plantilla.plantillaTags["SEASONS_PLAYED"]}</td>
    <td>${Plantilla.plantillaTags["GOAL_SEASON"]}</td>
    <td>${Plantilla.plantillaTags.DISQUALIFIED}</td>
    <td>
    <div></div>
</td>
</tr>`;


//pie de la tabla
Plantilla.plantillaTablaJugadores.footer = `</tbody>
</table>
`;



/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de los jugadores de balonmano que se le pasa
 * @param {String} plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Plantilla} player Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
Plantilla.sustituyeTags = function (plantilla, player) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), player.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.PLAYERID, 'g'), player.data.playerId)
        .replace(new RegExp(Plantilla.plantillaTags.NAME, 'g'), player.data.name)
        .replace(new RegExp(Plantilla.plantillaTags.SURNAME, 'g'), player.data.surname)
        .replace(new RegExp(Plantilla.plantillaTags.DATE_BIRTH, 'g'), player.data.dateBirth.day + "/" + player.data.dateBirth.month +
        "/" + player.data.dateBirth.year)
        .replace(new RegExp(Plantilla.plantillaTags["SEASONS_PLAYED"], 'g'), player.data.seasonsPlayed)
        .replace(new RegExp(Plantilla.plantillaTags["GOAL_SEASON"], 'g'), player.data.goalSeason)
        .replace(new RegExp(Plantilla.plantillaTags.DISQUALIFIED, 'g'), player.data.disqualified)
}



/**
 * Actualiza el cuerpo de la tabla con los datos del jugador de balonmano que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
Plantilla.plantillaTablaJugadores.actualizaNombres = function (player) {
    return Plantilla.sustituyeTags(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del jugador de balonmano que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
Plantilla.plantillaTablaJugadores.actualizaTodo = function (player) {
    return Plantilla.sustituyeTags(this.cuerpoCompleto, player)
}


/**
 * Función que recuperar todos los jugadores llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 *
 */

Plantilla.recupera = async function (callBackFn, direccion) {
    let response = null

    // Intento conectar con el microservicio
    try {
        const url = Frontend.API_GATEWAY + direccion
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        callBackFn(vectorPlayers.data)
    }
}



/**
 * Función para mostrar el id, nombre y apellido de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
Plantilla.muestraSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaJugadores.headerNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualizaNombres(e));
    }
    msj += Plantilla.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los nombres de todos los jugadores de balonmano", msj)
}



/**
 * Función principal para recuperar solo los nombres de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
Plantilla.procesarListaNombres = function () {
    Plantilla.recupera(Plantilla.muestraSoloNombres, "/balonmano/get_lista_jugadores");
}

/**
 * Función principal para recuperar todos los datos de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
Plantilla.procesarListaCompleta = function () {
    Plantilla.recupera(Plantilla.muestraTodo, "/balonmano/get_lista_completa");
}

/**
 * Función para mostrar todos los datos de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
Plantilla.muestraTodo = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaJugadores.headerTodosDatos
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualizaTodo(e));
    }
    msj += Plantilla.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de todos los datos de los jugadores de balonmano", msj)
}


/**
 * Función principal para mostrar ordenados por nombretodos los datos de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
Plantilla.procesarListaOrdenada = function () {
    Plantilla.recupera(Plantilla.muestraOrdenado, "/balonmano/get_lista_ordenada");
}



/**
 * Función para mostrar todos los datos de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
Plantilla.muestraOrdenado = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaJugadores.headerTodosDatos
    if (vector && Array.isArray(vector)) {
        Plantilla.ordena(vector)
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualizaTodo(e));
    }
    msj += Plantilla.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente", msj)
}


/**
 * Función que ordena un vector según el nombre
 * TODO TDD
 * */
Plantilla.ordena = function(vector){
    vector.sort(function (min, max) {
        let nameMin = min.data.name.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
        let nameMax = max.data.name.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
        if (nameMin < nameMax) {
            return -1;
        }
        if (nameMin > nameMax) {
            return 1;
        }
        return 0;
    });
}

/** Funcion para buscar jugadores con un cierto nombre
 *
 * */
Plantilla.busquedaNombre = function(nombre){
    Plantilla.recuperaDato(Plantilla.muestraTodo, nombre, "/balonmano/get_busqueda_nombre");
}

/**Función que recuperar todos los jugadores con cierto nombre
 @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.*/
Plantilla.recuperaDato = async function (callBackFn, nombre, direccion) {
    let response = null

    // Intento conectar con el microservicio
    try {
        const url = Frontend.API_GATEWAY + direccion
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        const filtro = vectorPlayers.data.filter(player => player.data.name === nombre)
        callBackFn(filtro)
    }
}

Plantilla.BuscaCriterios = function(criterio1, criterio2, criterio3, modo){
    Plantilla.recuperaDatoCriterios(Plantilla.muestraTodo, criterio1, criterio2, criterio3, modo, "/balonmano/get_busqueda_criterios");
}

Plantilla.recuperaDatoCriterios = async function(callBackFn, criterio1, criterio2, criterio3, modo, direccion){
    let response = null

    // Intento conectar con el microservicio
    try {
        const url = Frontend.API_GATEWAY + direccion
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        if(criterio3 == "true"){
            criterio3 = true
        }else{
            criterio3 = false
        }
        if(modo){
            const filtro = vectorPlayers.data.filter(player => player.data.surname === criterio1 || player.data.dateBirth.day + "/" + player.data.dateBirth.month +
                "/" + player.data.dateBirth.year === criterio2 || player.data.disqualified === criterio3)
            callBackFn(filtro)
        }else{
            const filtro = vectorPlayers.data.filter(player => player.data.surname === criterio1 && player.data.dateBirth.day + "/" + player.data.dateBirth.month +
                "/" + player.data.dateBirth.year === criterio2 && player.data.disqualified === criterio3)
            callBackFn(filtro)
        }
    }

}
