import { faker } from "@faker-js/faker";
import { createHash } from '../utils/index.js';
import Pet from "../dao/Pets.dao.js";
import Users from "../dao/Users.dao.js";

const petDB = new Pet();
const usersDB = new Users();


class MockingService {
     static async generateMockingUsers(num) {
        const users =[];
        const userNum = parseInt(num);

        for (let i = 0; i < userNum ; i++){
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(["user", "admin"])
            })
        }
        return users;
    }


    static async generateMockingPets(num) {
        const pets =[];
        const petsNum = parseInt(num);

        for (let i = 0; i < petsNum ; i++){
            pets.push({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                adopted: false,
                birthDate: faker.date.past(),
                Image: "https://via.placeholder.com/150"
            })
        }
        return pets;
    }


    static async generateMockingData(users, pets) {

        const userData = await this.generateMockingUsers(users);
        console.log(userData);
        

        const petData =  await this.generateMockingPets(pets);
        console.log(petData);
        

        const userSaved = await usersDB.saveMany(userData);
        const petSaved = await petDB.saveMany(petData);

        return {
            userSaved,
            petSaved
        }

    }

}


export default MockingService;