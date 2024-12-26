//importamos supertest
import supertest from 'supertest';
// importamos expect de chai
import {expect} from 'chai';

// supertest nos permite utilizar una constante 'requester', quien se encarga de hacer las peticiones al servidor.

const requester = supertest("http://localhost:8080");

describe("testing de la app web adoptme", () => {
    // Registro de usuarios:
    describe("test Avanzado de usuarios", () => {
        // declaramos de forma global , una variable "cookie", que van a utilizarse en las pruebas.
        let cookie;

        it("Debe registrar correctamente un usuario", async () =>{
            // Usuario para pruebas
            const mockUser = {
                first_name: "Pepe",
                last_name: "Argento",
                email: "pepe@zapateriaGarmendia.com",
                password: "1234"
            }

            // registramos un usuario utilizando los datos del _body
            const {_body} = await requester.post("/api/sessions/register").send(mockUser);

            // validamos que tengamos un payload

            expect(_body.payload).to.be.ok;

        });

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            // enviamos al login los mismos datos que registramos en la prueba anterior
            const mockUser = {
                email: "pepe@zapateriaGarmendia.com",
                password: "1234"
            }

            const result = await requester.post("/api/sessions/login").send(mockUser);

            // guardo los headers de la peticion.

            const cookieResult = result.headers['set-cookie']['0'];

            // se obtiene la cookie de session de la repsuesta y se guarda en una variable.

            // Verificamos que la cookie recuperada exista.

            expect(cookieResult).to.be.ok;

            // Se separa el nombre y el valor de la cookie recuperada y se guardan en un objeto
            
            cookie = {
                name: cookieResult.split("=")['0'],
                value: cookieResult.split("=")['1']
            }

            // recuerden que el metodo split separa un string en cadenas mas pequenas.

            // verficamos que el nombre de la cookie sea igual a 'coderCookie'

            expect(cookie.name).to.be.ok.and.equal('coderCookie');
            expect(cookie.value).to.be.ok;


        });
        
        // Probamos la ruta current
        // revisar en el controller de sessions que hay un current duplicado exportado.

        it("debe enviar la cookie que contiene el usuario", async ()=>{
            // Enviamos la cookie que guardamos:
            const { _body } = await requester
            .get("/api/sessions/current")
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

            // verificamos que nos retorne el email
            expect(_body.payload.email).to.be.equal("pepe@zapateriaGarmendia.com")
        })



    });
})
