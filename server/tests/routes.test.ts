import app from './client'
import {fillProducts} from "../../client/common/functions_common";

const request = require('supertest');

let products = fillProducts(10);


describe('Test the root path', () => {
    test('It should response the POST method', async () => {
        const response = await request(app).post('/products' , {products:  products});
        expect(response.statusCode).toBe(200);
    });
    test('It should response the GET method', async () => {
        const response = await request(app).get('/products');
        expect(response.body.length).toBe(10);
    });

});
