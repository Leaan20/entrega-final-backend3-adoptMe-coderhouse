//importamos el modulo de Winston
import winston from 'winston';

// definimos un sistema de niveles y los colores asociados para poder diferenciarlos.
const levelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal:'red',
        error: 'yellow' ,
        warning: 'blue',
        info: 'green',
        http: 'magenta' ,
        debug: 'white'
    }
}

// logger de winston

// const logger = winston.createLogger({
//     // objeto de configuracion , consola y archivo(file), como son varios se agrupan en un array, con el nivel
//     transports: [
//         new winston.transports.Console({level:'http'}),
//         new winston.transports.File({
//             filename: './errors.log',
//             level: 'warn'
//         })
//     ]
// })

let logger = null;

//variable de prueba
let entorno = 'desarrollo';
//process.env.MONGO_URL

if(entorno === 'desarrollo'){
    logger = winston.createLogger({
        // objeto de configuracion , consola y archivo(file), como son varios se agrupan en un array, con el nivel
        levels: levelOptions.levels,
        transports: [
            new winston.transports.Console({
                level:'http',
                format: winston.format.combine(
                    winston.format.colorize({colors: levelOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errors.log',
                level: 'warning',
                format: winston.format.simple()
            })
        ]
    })
} else {
     logger = winston.createLogger({
        // objeto de configuracion , consola y archivo(file), como son varios se agrupan en un array, con el nivel
        levels: levelOptions.levels,
        transports: [
            new winston.transports.Console({
                level:'http',
                format: winston.format.combine(
                    winston.format.colorize({colors: levelOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errors.log',
                level: 'warning',
                format: winston.format.simple()
            })
        ]
    })
}

export default logger;





