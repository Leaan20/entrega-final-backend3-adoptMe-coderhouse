// Importaciones necesarias.
import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import {createHash, passwordValidation} from "../src/utils/index.js";
import { expect } from "chai";
import connectDB from "../src/db.js";
// conectamos a la DB


connectDB();

describe("Test de hasheo de password", function(){
    this.timeout(5000);

    before(function(){
        this.userDao = new User();
    });

    this.beforeEach(async function () {
        const collection = mongoose.connection.collections.users;
        if (collection) {
            await collection.drop();
        }
    });

    it("El createHash deberia poder generar un hasheo de la password", function(){
        const passMock = "pass1234";

        const result = createHash(passMock);

        expect(result).to.be.not.equal(passMock);
    });


    it("El passValidator, deberia poder comparar el pass hasheado con el original", async function(){

        const passHashed = await createHash("pass1234");

        const user = {
            first_name: "usuario",
            last_name: "Falso",
            email: "emailFalso@gmail.com",
            password: passHashed
        };

        await this.userDao.save(user);

        const userFound = await this.userDao.getBy({email: user.email});

        const validate = await passwordValidation( userFound, "pass1234");


        expect(validate).to.be.equal(true);
    });

    it("El passValidator, deberia devolver false , si la pass es incorrecta", async function(){
        const passHashed = await createHash("pass1234");

        const user = {
            first_name: "user",
            last_name: "False",
            email: "correoFalso@gmail.com",
            password: passHashed
        }


        await this.userDao.save(user);

        const userFound = await this.userDao.getBy({email: user.email});

        const validate = await passwordValidation( userFound, "passFalse");


        expect(validate).to.be.equal(false);
        

    })

    // desconectar al final de los test
    after(async function () {
        await mongoose.connection.close();
    });
})