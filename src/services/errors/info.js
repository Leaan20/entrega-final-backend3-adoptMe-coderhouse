// info , funcion que va a dar un mensaje pro consola sobre el error y de que se trata el error , dando mejor informacion y ayudando al debuggeo.

export const infoErrorGenerateUser = (user) => {
    return `Los datos estan imcompletos o no son validos.
    Necesitamos recbir los siguientes datos:
    - Nombre: String, se recibio : ${user.first_name}
    - Apellido: String, se recibio : ${user.last_name}
    - Email: String, se recibio ${user.email}
    - Contraseña: String, se recibio ${user.password}`
}
export const infoErrorGeneratePet = (pet) => {
    return `Los datos estan imcompletos o no son validos.
    Necesitamos recbir los siguientes datos:
    - Nombre: String, se recibio : ${pet.name}
    - Especie: String, se recibio : ${pet.specie}
    - BirthDate: Date, se recibio ${pet.birthDate}`
}

