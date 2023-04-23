/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");
          assert(res.body.autor === "Francisco Javier Galvez Marin");
          assert(res.body.email === "fjgm0038@red.ujaen.es");
          assert(res.body.fecha === "28-03-2023");
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la lista de nombres
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Arno al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('disqualified'));
          assert(res.body.data[0].data.name === "Arno");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })

    /**
     * Tests para acceso a la lista de los nombres de jugadores
     */
  describe('Acceso a la lista de nombres de los jugadores:', () => {
        it('Devuelve Arno al consultar el primer miembro de la lista de jugadores y tiene tamaño 10 la tabla', (done) => {
            supertest(app)
                .get('/get_lista_jugadores')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    assert(res.body.data[0].data.hasOwnProperty('name'));
                    assert(res.body.data[0].data.name === "Arno");
                    assert(res.body.data[0].data.name != "Juande");
                    assert(res.body.data.length === 10);
                })
                .end((error) => { error ? done.fail(error) : done(); }
                );
        });

    })

    describe('Acceso a la lista de todos los datos de los jugadores:', () => {
        it('Devuelve Arno al consultar el primer miembro de la lista de jugadores', (done) => {
            supertest(app)
                .get('/get_lista_completa')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    assert(res.body.data[0].data.hasOwnProperty('playerId'));
                    assert(res.body.data[0].data.hasOwnProperty('name'));
                    assert(res.body.data[0].data.hasOwnProperty('surname'));
                    assert(res.body.data[0].data.hasOwnProperty('dateBirth'));
                    assert(res.body.data[0].data.hasOwnProperty('seasonsPlayed'));
                    assert(res.body.data[0].data.hasOwnProperty('goalSeason'));
                    assert(res.body.data[0].data.hasOwnProperty('disqualified'));
                    assert(!res.body.data[0].data.hasOwnProperty('trial'));
                    assert(res.body.data[0].data.name === "Arno");
                    assert(res.body.data[0].data.name != "Juande");
                    assert(res.body.data.length === 10);
                })
                .end((error) => { error ? done.fail(error) : done(); }
                );
        });

    })

    describe('Acceso a la lista de todos los elementos ordenados:', () => {
        it('Accede correctamente a la web', (done) => {
            supertest(app)
                .get('/get_lista_ordenada')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error) => { error ? done.fail(error) : done(); }
                );
        });

    })

    describe('Acceso a la busqueda por nombre:', () => {
        it('Se accede a la busqueda', (done) => {
            supertest(app)
                .get('/get_lista_ordenada')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error) => { error ? done.fail(error) : done(); }
                );
        });

    })
});


