/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Listado de nombres de jugadores
 */
router.get("/get_lista_jugadores", async (req, res) => {
    try {
        await callbacks.get_lista_jugadores(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Listado completo de jugadores
 */
router.get("/get_lista_completa", async (req, res) => {
    try {
        await callbacks.get_lista_completa(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Listado ordenado de jugadores
 */
router.get("/get_lista_ordenada", async (req, res) => {
    try {
        await callbacks.get_lista_ordenada(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Busqueda de nombre de jugador
 */
router.get("/get_busqueda_nombre", async (req, res) => {
    try {
        await callbacks.get_lista_ordenada(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Busqueda por criterios de jugador
 */
router.get("/get_busqueda_criterios", async (req, res) => {
    try {
        await callbacks.get_lista_ordenada(req, res)
    } catch (error) {
        console.log(error);
    }
});
// Exporto el módulo para poder usarlo en server
module.exports = router;
