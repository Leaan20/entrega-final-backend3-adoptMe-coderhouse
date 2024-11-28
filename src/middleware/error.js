// middleware de manejador de errores

import { Eerrors } from "../services/errors/enum.js";


const errorHandler = (error, req, res, next) => {
    console.log(error.cause);
    switch(error.code){
        case Eerrors.INVALID_TYPE :
            res.send({status: 'error', error: error.name});
            break;
        case Eerrors.PATH_ERROR :
            res.send({status : 'error', error: error.name });
            break;
        case Eerrors.DB_ERROR :
            res.send({status: 'error', error: error.name});
            break;
        default:
            res.send({status : 'error', error: 'Error desconocido.' })
    }
}

export default errorHandler;