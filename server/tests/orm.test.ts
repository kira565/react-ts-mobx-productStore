import {fillProducts} from "../../client/common/functions_common";
import {Connection, createConnection, QueryFailedError} from "typeorm";
import {ProductEntity} from "../src/entities/ProductEntity";


let products = fillProducts(10);

describe('Testing db connection', () => {
    let connection: Connection;

    beforeAll(async () => {
        connection = await createConnection()
    });


    describe('Testing db', () => {


        test('Db Products table should be defined after filling', async () => {
            const productStoreRep = connection.getRepository(ProductEntity);
            await productStoreRep.save(products);

            const loadedProd = await productStoreRep.find();
            expect(loadedProd).toBeDefined()
        });

        test('ProductEntity Trigger for "type" should work fine', async () => {
            const productStoreRep = connection.getRepository(ProductEntity);
            let error = new Error();

            await productStoreRep.save(
                {
                    id: 1,
                    name: "Soft silk",
                    type: "WRONG_TYPE",
                    color: "#efec2a",
                    size: "M",
                    inStock: 0,
                    dateReceipt: "2020-12-13T14:07:40.296Z"
                }).catch((error: QueryFailedError) => error.message = 'CHECK_TYPE_ERR');

            expect(error.message === 'CHECK_TYPE_ERR')
        });

        test('ProductEntity Trigger for "color" should work fine', async () => {
            const productStoreRep = connection.getRepository(ProductEntity);
            let error = new Error();

            await productStoreRep.save(
                {
                    id: 1,
                    name: "Soft silk",
                    type: "Underwear",
                    color: "WRONG_COLOR",
                    size: "M",
                    inStock: 0,
                    dateReceipt: "2020-12-13T14:07:40.296Z"
                }).catch((error: QueryFailedError) => error.message = 'CHECK_COLOR_ERR');

            expect(error.message === 'CHECK_COLOR_ERR')
        });
        test('ProductEntity Trigger for "size" should work fine', async () => {
            const productStoreRep = connection.getRepository(ProductEntity);
            let error = new Error();

            await productStoreRep.save(
                {
                    id: 1,
                    name: "Soft silk",
                    type: "Underwear",
                    color: "#efec2a",
                    size: "WRONG_SIZE",
                    inStock: 0,
                    dateReceipt: "2020-12-13T14:07:40.296Z"
                }).catch((error: QueryFailedError) => error.message = 'CHECK_SIZE_ERR');

            expect(error.message === 'CHECK_SIZE_ERR')
        });

        test('ProductEntity Trigger for "inStock" should work fine', async () => {
            const productStoreRep = connection.getRepository(ProductEntity);
            let error = new Error();

            await productStoreRep.save(
                {
                    id: 1,
                    name: "Soft silk",
                    type: "Underwear",
                    color: "#efec2a",
                    size: "WRONG_SIZE",
                    inStock: 20,
                    dateReceipt: "2020-12-13T14:07:40.296Z"
                }).catch((error: QueryFailedError) => error.message = 'CHECK_STOCK_ERR');

            expect(error.message === 'CHECK_STOCK_ERR')
        })

    });
});

