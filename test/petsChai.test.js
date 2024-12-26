// Test con Chai - enfoque de comportamiento - encadenamiento en ingles

// en lugar de assert - utilizamos chai

// Importaciones necesarias.
import mongoose from "mongoose";
import Pet from '../src/dao/Pets.dao.js';
//nueva actualizacion de chai
import { expect } from "chai";

mongoose.connect(`mongodb+srv://LeandroA20:Sonic12345@cluster0.lxqoi.mongodb.net/PetsAdopt?retryWrites=true&w=majority&appName=Cluster0`);

describe("test de pets con chai", function(){
    this.timeout(5000);
    // este before se inicia antes de la totalidad de los test
    before(function(){
        this.petsDao = new Pet();
    });

    // este beforeEach se inicia antes de cada test indiividualmente
    this.beforeEach(function(){
        mongoose.connection.collections.pets.drop();
    });

    it('El Dao de pets debe poder obtener la lista de pets en formato de array',async function(){
        const result = await this.petsDao.get();
        // encadenamos metodos a expect de chai, palabras e ingles hasta llegar al resultado esperado a comparar.
        // expect lleva como parametro la variable a testear
        expect(result).to.be.a("array");
        //hay mas formas de llegar al mismo fin de testeo
        //expect(Array.isArray(result)).to.be.ok;
        //expect(Array.isArray(result)).to.be.equals(true)
    } );

    it("El save  debe poder agregar un pet correctamente", async function(){
        const petMock = {
            name: "Firulais",
            specie: "Pichicho",
            birthDate: "2021-03-10"
        }

        const result = await this.petsDao.save(petMock);

        // comprobamos que se haya guardado y devuelva un objeto
        expect(result._id).to.be.a('object');
    });

    it("el getBy deberia obtener el pet por su name", async function(){
        const petMock = {
            name: "Fidodido",
            specie: "Huron",
            birthDate: "2023-02-15"
        }

        await this.petsDao.save(petMock);

        const petFound = await this.petsDao.getBy({name: petMock.name});

        expect(typeof petFound).to.be.equal('object');
    })





})