import { petsService } from "../services/index.js";
import MockingService from "../services/mocking.js";

const getMockingPets = async (req,res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({status: "Success", payload: pets});
}

export default {
    getMockingPets
};