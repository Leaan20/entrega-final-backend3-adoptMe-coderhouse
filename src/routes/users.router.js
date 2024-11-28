import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

// // Importamos las herramientas para gestionar errores.
// import {infoErrorGenerate} from '../services/errors/info.js';
// import {Eerrors} from '../services/errors/enum.js';
// import CustomError from '../services/errors/custom-error.js';


const router = Router();




router.get('/',usersController.getAllUsers);

router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);


export default router;