import { Router } from "express";
const router = Router();
import mocksController from "../controllers/mocks.controller.js";

// endpoint para obtener mascotas simuladas.
router.get("/mockingpets", mocksController.getMockingPets );


// endpoint para usuarios simulados
router.get("/mockingusers", mocksController.getMockingUsers );


//Desarrollar un endpoint post generateData , que reciba los parametros "users" y "pets"
router.post('/generatedata', mocksController.generateData  );

export default router;