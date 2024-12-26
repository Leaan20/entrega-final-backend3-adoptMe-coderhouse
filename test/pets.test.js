// archivo de testeo de pets

import mongoose from "mongoose";
import Pet from '../src/dao/Pets.dao.js';
import assert from 'assert';

mongoose.connect(`mongodb+srv://LeandroA20:Sonic12345@cluster0.lxqoi.mongodb.net/PetsAdopt?retryWrites=true&w=majority&appName=Cluster0`);
// Iniciamos nuestro contexto de test
// el describe determina nuestro modulo a testear
describe('Testing de Pets Dao', function()  {
    this.timeout(5000);

    // inicializamos petsDao
    // si utilizamos function tradicionales podemos usar this
    before(function() {
        this.petsDao = new Pet();
    });

    //limpiamos nuestra DB para comenzar el test
    this.beforeEach( async function() {
        try {
            await mongoose.connection.collections.pets.drop();
        } catch (err) {
            console.log("No se pudo eliminar la colección 'pets', puede que no exista aún.");
        }
    })

    //////////////////////////////////////

    // se define con it un entorno propio para un test en particular
    // va a ser asincrono , porque trabajamos con la DB
    it('El get debe devolver un array de pets', async function() {
        const result = await this.petsDao.get();
        
        // utilizamos assert para hacer comparaciones

        assert.strictEqual(Array.isArray(result), true);
    });

    it("El save  debe poder agregar un pet correctamente",async  function() {
        const petMock = {
            name: "Firulais",
            specie: "Pichicho",
            birthDate: "2021-03-10"
        }

        const result = await this.petsDao.save(petMock);

        assert.ok(result._id);
    });

    it("el getBy deberia obtener el pet por su name", async function(){
        const petMock = {
            name: "Fidodido",
            specie: "Huron",
            birthDate: "2023-02-15"
        }

        await this.petsDao.save(petMock);

        const petFound = await this.petsDao.getBy({name: petMock.name});

        assert.strictEqual(typeof petFound, "object");

    })




    after(async function () {
        await mongoose.disconnect();
    })





})