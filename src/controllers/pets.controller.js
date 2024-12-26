import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import mongoose from "mongoose";
// Importamos las herramientas para gestionar errores.
// import {infoErrorGeneratePet} from '../services/errors/info.js';
// import {Eerrors} from '../services/errors/enum.js';
// import CustomError from '../services/errors/custom-error.js';


const getAllPets = async(req,res)=>{
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
}

// se creo una funcion para buscar pets por su _id de MongoDB.
const getPetById = async (req, res) => {
    const { pid } = req.params;

    // Verficamos si el pid es un ObjectId de MDB valido
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).send({ status: 'error', message: 'Invalid ID format' });
    }

    try {
        // si es correcto el formato, lo enviamos como objeto.
        const petFound = await petsService.getBy({ _id: pid });
        if (!petFound) {
            return res.status(404).send({ status: 'error', message: 'Pet not found' });
        }

        res.send({ status: 'success', payload: petFound });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};
// TODO : modificar los custom errors
// prueba de custom error
// const createPet = async(req,res,next)=> {
//     try {
//         const {name,specie,birthDate} = req.body;
    

//         if(!name||!specie||!birthDate) {
//         // throw CustomError.createError({
//         //     name : 'nueva mascota, faltan datos',
//         //     cause: infoErrorGeneratePet({name, specie, birthDate}),
//         //     message: 'Error al intentar crear una nueva mascota',
//         //     code: Eerrors.INVALID_TYPE
//         //     });

//         return res.status(400).send({status:"error",error:"Incomplete values"});

//         }

//         const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
//         const result = await petsService.create(pet);

//         res.send({status:"success",payload:result})

//     } catch (error) {
//         next(error);
//     }
// }
const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}
export default {
    createPet,
    createPetWithImage,
    deletePet,
    getAllPets,
    getPetById,
    updatePet,
}