// instalamos supertest: npm install supertest -D
// Es necesario una doble terminal, una para levantar el Server y otra para revisar el resultado del testeo

//importamos supertest
import supertest from 'supertest';
// importamos expect de chai
import {expect} from 'chai';

// supertest nos permite utilizar una constante 'requester', quien se encarga de hacer las peticiones al servidor.

const requester = supertest("http://localhost:8080");

// Ahora vamos a trabajr con dos "describe", uno hace referencia a la aplicacion "adoptme" y otro para cada entidad interna

describe("testing de la app web adoptme", () => {

    describe("Testing de mascotas", () =>{
        it("El endpoint POST /api/pets , al recibir los datos,  debe crear una mascota correctamente ", async () => {
            // creamos un mock de mascota
            const pichichoMock = {
                name: "Firulais",
                specie: "Pichicho",
                birthDate: "2021-03-10"
            }
            // extraemos el statusCode, ok (si la peticion tuvo un resultado exitoso), _body (el cuerpo de la peticion junto con su payload y status)
            const {statusCode, ok, _body} = await requester.post("/api/pets").send(pichichoMock);

            console.log({statusCode, ok, _body});

            // y ahora evaluamos , si el payload tiene el _id: usando expect de chai

            expect(_body.payload).to.have.property("_id");

        })

        // Nuevo testo
        console.log("-----------------------------------");

        it("Al crear una mascota solo con los datos elementales, debe tener la propiedad'adopted' con el valor en false ", async () => {
            const newPet = {
                name: "Rex",
                specie: "Perro alfa de los de Antes",
                birthDate: "1990-01-01"
            }

            const {statusCode,ok ,_body} = await requester.post("/api/pets").send(newPet);

            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property("adopted").that.equals(false);
        })
        
        it("Si se desea crear una mascota sin el campo nombre, el modulo debe responder con un status 400 ", async () =>{
            const petWihoutName = {
                specie: "gato",
                birthDate:"2020-05-15"
            }

            const {statusCode} = await requester.post("/api/pets").send(petWihoutName);
            // verficamos que sucede si se envia una mascota sin el nombre.
            expect(statusCode).to.equal(400)
        });


        console.log("-----------------------------------");

        it("Al obtener las mascotas con el metodo GET, la respuesta debe tener los campos status y payload. ademas, payload debe ser de tipo arreglo", async function(){
            const {statusCode, _body } = await requester.get("/api/pets");


            expect(statusCode).to.be.equal(200);
            expect(_body).to.have.property('status').that.equals("success");
            expect(_body).to.have.property("payload").that.is.an("array");
        })


    });

    it("El metodo PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos", async function(){
        const idExistingPet = "674888b2c506629b08482631";


        // Obtener la mascota original
        const oldResponse = await requester.get(`/api/pets/${idExistingPet}`);
        expect(oldResponse.statusCode).to.equal(200);
        const oldPet = oldResponse.body.payload;

        // Datos actualizados
        const dataUpdated = {
            name: "Sub zero",
            specie: "Perrito tira hielo"
        };

        // Actualizar la mascota
        const updateResponse = await requester.put(`/api/pets/${idExistingPet}`).send(dataUpdated);
        expect(updateResponse.statusCode).to.equal(200);

        // Obtener la mascota actualizada
        const updatedResponse = await requester.get(`/api/pets/${idExistingPet}`);
        expect(updatedResponse.statusCode).to.equal(200);
        const petUpdate = updatedResponse.body.payload;

        // Verificaciones en los datos
        expect(petUpdate).to.not.deep.equal(oldPet); 
        expect(petUpdate.name).to.equal(dataUpdated.name); 
        expect(petUpdate.specie).to.equal(dataUpdated.specie); 

    });

    it("el metodo DELETE debe poder borrar la ultima mascota agregada, esto se puede alcanzar agregando la mascota con un post, y utilizar el id para luego eliminar con el delete.", async function(){
        // 1  agregar la mascota

        const newPet = {
            name: "Mascota a borrar",
            specie: "Perro",
            birthDate: "2023-02-20"
        };

        // 2  lo enviamos con un post:
        const {_body:{ payload: {_id}}} = await requester.post(`/api/pets`).send(newPet);

        // 3  borramos la mascota agregada
        const {statusCode} = await requester.delete(`/api/pets/${_id}`);

        expect(statusCode).to.equal(200);

    });



    describe("testing de carga de imagenes", () => {

        it("tenemos que crear una mascota con una imagen", async ()=>{

            const mockPet = {
                name: "gatitoM",
                specie: "gato",
                birthDate : "2021-06-01"
            }

            const result = await requester.post("/api/pets/withimage")
                .field("name", mockPet.name)
                .field("specie", mockPet.specie)
                .field("birthDate", mockPet.birthDate)
                .attach("image", "./test/gatito.jpg")




            // verificamos que la peticion resulto ok:
            expect(result.status).to.be.equal(200);

            // verificamos que la mascota tenga un campo id:
            expect(result._body.payload).to.have.property("_id");

            // verfiicamos que la mascota tenga un campo "image"

            expect(result._body.payload.image).to.be.ok;
        })


    })


});

// Crear datos de prueba
/** 
before(async function () {
    // Crear mascota de prueba
    await requester.post('/api/pets').send({
        name: "Test Pet",
        specie: "Testing Specie"
    });
});

after(async function () {
    // Limpiar datos de prueba
    await requester.delete(`/api/pets/${idExistingPet}`);
});
 */