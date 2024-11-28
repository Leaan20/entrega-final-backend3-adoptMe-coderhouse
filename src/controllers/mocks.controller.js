import MockingService from "../services/mocking.js";



const getMockingPets = async (req,res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({status: "Success", payload: pets});
}

const getMockingUsers = async (req,res) =>{
    const users = await MockingService.generateMockingUsers(50);
    res.send({status: "Success", payload: users});
}

const generateData = async (req,res) => {

    // recibimos los datos del body
    const { users, pets } = req.body;

    console.log({users,pets});
    
    try {

        const data = await MockingService.generateMockingData(users, pets);

        if(!data) return "faltan ingresar datos.";

        const userGenerated = data.userSaved;
        const petGenerated = data.petSaved;

        return res.json(`Generados ${userGenerated.length} usuarios y ${petGenerated.length} Mascotas`);

    } catch (error) {
        res.json("Error al generar usuarios y mascotas");
        console.log('hubo un error: ', error);
        return;
    }
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};