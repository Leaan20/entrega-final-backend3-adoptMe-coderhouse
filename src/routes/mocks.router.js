import { Router } from "express";
const router = Router();
import mocksController from "../controllers/mocks.controller.js";
// endpoint para obtener mascotas simuladas.

router.get("/mockingpets", mocksController.getMockingPets);

export default router;