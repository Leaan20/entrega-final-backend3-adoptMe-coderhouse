import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest("http://localhost:8080");

describe('Testeo del router de mocks', () => {

    describe('generacion de mocking users y pets', () => {


        it('al realizar el llamado a la ruta de /mockingusers, me duevuelve 50 users', async function()  {

            this.timeout(5000);

            const {statusCode, _body} = await requester.get(`/api/mocks/mockingusers`);
            // console.log(statusCode, _body.payload);

            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.lengthOf(50);
        });

        it('al realizar el llamado a la ruta de /mockingpets, me duevuelve 100 pets', async function()  {

            this.timeout(5000);

            const {statusCode, _body} = await requester.get(`/api/mocks/mockingpets`);
            console.log(statusCode, _body.payload);
            
            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.lengthOf(100);
        });


    });

});