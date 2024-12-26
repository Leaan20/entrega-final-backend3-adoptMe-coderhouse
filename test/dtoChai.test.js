import UserDTO from "../src/dto/User.dto.js";
import { expect } from "chai";

describe('Test de DTO de user', function(){

    it("El DTO de user, debe unificar nombre y apellido", async function(){
        const userMock = {
            first_name: "Pocho",
            last_name: "La Pantera",
            email: "pocho_laPantera@mail.com",
            role: "user"
        }

        const userModified = UserDTO.getUserTokenFrom(userMock);

        expect(userModified).to.have.property("name", "Pocho La Pantera");


    });

    it("el UserDTO debe eliminar las propiedades password,first_name, last_name", async function(){
        const userMock = {
            first_name: "Pocho",
            last_name: "La Pantera",
            email: "pocho_laPantera@mail.com",
            role: "user"
        }

        const userModified = UserDTO.getUserTokenFrom(userMock);

        expect(userModified).to.not.have.property("first_name");
        expect(userModified).to.not.have.property("last_name");
        expect(userModified).to.not.have.property("password");
    })

});
