import supertest from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
const requester = supertest(`http://localhost:8080`);
// vamos a crear user y pets de prueba




// test de adoption

describe(`Router de adopciones`, function()  {
    // Eliminamos antes de comenzar con los test, la collecion y asi podemos repetir los test, sin tener que agregar nueva informacion


    describe(`GET /api/adoptions`, () => {

        before(async function(){
                this.timeout(5000);
        });

        it('Me debe retornar un array de adopciones', async () => {
            const {status} = await requester.get("/api/adoptions");

            expect(status).to.equal(200);
        });

        it("Me retorna 404 si la ruta no existe", async () =>{
            const {status} = await requester.get("/adoptions/noexiste");

            expect(status).to.equal(404);
        });

        it("retorna un codigo 404 en el caso de querer obtener una adopcion inexistente", async () => {
            let inexistingAid = '6756ee2da885b2692c6a6b57';
            const {status} = await requester.get(`/api/adoptions/${inexistingAid}`);

            expect(status).to.equal(404)
        });


        it("Buscamos que me retorne la info de una adopcion existente ", async () => {
            let aid = '676c6cf2a4b35da251e7b43a';

            const {status} = await requester.get(`/api/adoptions/${aid}`);

            expect(status).to.equal(200);
        });

        it('crear una adopcion', async function(){

            let uid = '676c66a1c002cb4779d87106';
            let pid = '674888b2c506629b08482631';

            const { status } = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);
        });

        it('Si el user o el pet no estan ingresados en el sistema , deberia devolver un codigo de estado 404 al intentar crear una adopcion', async ()=>{
            let uid = '676c66a1c002cb4779d87106';
            let pid = '674888b2c506629b08482632'; // _id erroneo

            const { status } = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(404);

        });

        after(async () => {
            const collections = Object.keys(mongoose.connection.collections);
            if (collections.includes('adoptions')) {
                await mongoose.connection.collections.adoptions.drop();
            }
        });

    });

    
});