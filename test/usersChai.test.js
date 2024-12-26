// chai es una libreria de assertions, la cual nos permitira hacer comparaciones de test amas claras.
// instalamos : npm install -D chai

// Importaciones necesarias.
import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
//nueva actualizacion de chai
import { expect } from "chai";

// const expect = chai.expect;

// conectamos a la DB

mongoose.connect(`mongodb+srv://LeandroA20:Sonic12345@cluster0.lxqoi.mongodb.net/PetsAdopt?retryWrites=true&w=majority&appName=Cluster0`)

// Describe , permite agrupar un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo.

describe("Testeamos el DAO de usuarios", function(){
    // Le asignamos un titulo
    // Pasamos una funcion callback que contiene las pruebas indidviduales

    // Funcion que nos permite inicializar elementos antes de comenzar con el contexto de testeo. se ejecuta una vez , antes de las pruebas
    before(function(){
        this.userDao = new User();
    });


    // limpiamos la base de datos cada vez que testeamos

    this.beforeEach( async function(){
        await mongoose.connection.collections.users.drop();
    })

    //////////////////////////////////////////////////////

    // Desarrollamos cada prueba individual
    // en el it describimos el resultado esperado del test
    it("el get de usuarios deber retornar un array", async function(){
        const resultado = await this.userDao.get();
        //let falso = 0;
        // una vez que obtengo los resultados del get a usuarios , tengo que validar si es un array o no.

        // usamos assert con su metodo strictEqual para comparar valores. el primer parametro es la comparacion y el valor esperado ?
        
        expect(Array.isArray(resultado)).to.be.true;
    })

    it("El DAO debe poder agregar un usuario nuevo a la DB", async function(){
        const user = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "lachiqui@legrand.com",
            password: "1234"
        }

        const resultado = await this.userDao.save(user);
        // el metodo de assert ok, verifica que el valor recibido es verdadero.
        
        expect(resultado).to.have.property("_id");
    })

    it("validamos que el usuario tenga un array de mascotas vacio", async function(){
        let user = {
            first_name: "Lia",
            last_name: "Crucet",
            email: "lia@Crucet.com",
            password: "1234"
        }

        const resultado = await this.userDao.save(user);
        //utilizar deepStrictEqual para objetos o propiedades anidadas.
        expect(resultado.pets).to.deep.equal([]);


    })

    it("El DAO puede obtener un usuario por email", async function(){
        let user = {
            first_name: "Lia",
            last_name: "Crucet",
            email: "lia@Crucet.com",
            password: "1234"
        }

        await this.userDao.save(user);

        const userFound = await this.userDao.getBy({email: user.email});

        expect(userFound).to.be.an("object");
    })

    after(async function () {
        await mongoose.disconnect();
    })

})

// utilizamos el comando npm run test con el path configurado.