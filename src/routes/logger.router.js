import { Router } from "express";

const router = Router();

// endpoint de logger de prueba

router.get('/loggertest', (req,res) => {
    req.logger.http('Mensaje http');
    req.logger.info('Mensaje de info');
    req.logger.warning('Mensaje de warning');
    req.logger.error('mensaje de error');


    res.send({message: 'Prueba logger'});
} );


export default router;