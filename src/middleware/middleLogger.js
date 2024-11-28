import  logger  from '../utils/logger.js';


//middleware logger

export const addLogger = (req,res,next) => {
    // en la propiedad request logger , podemos pasar la configuracion de logger.
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} `);
    next();
}