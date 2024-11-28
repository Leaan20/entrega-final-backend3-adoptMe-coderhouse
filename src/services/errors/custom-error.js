// Custom error, va a contener la clase que va a permitir generar objetos de tipo error, errores personalizados que se produzcan en la app.

class CustomError {
    static createError({name = 'Error', cause = 'Desconocido', message, code = 1 }){

        const error = new Error(message);
        error.name = name;
        error.cause = cause;
        error.code = code;

        throw error;
        // Lanzamos el error, esto detiene la ejecucion de la aplicacion , por eso debemos capturarlo en otro modulo.

    }
}

export default CustomError;