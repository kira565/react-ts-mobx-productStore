import "reflect-metadata"
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import express from "express";
import {ProductEntity} from "./src/entities/ProductEntity";
import bodyParser from "body-parser";
import {TProduct} from "../client/types/types";
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(":memory:");

export const port = process.env.PORT || 5000;

createConnection().then(async (connection: any) => {
    const productStoreRep = connection.getRepository(ProductEntity);

    const app = express();
    app.use(bodyParser.json({limit: '1mb'}));



    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });



    app.post('/products', async (req: Request, res: Response) => {

        const start = async () => {
            await asyncForEach(req.body.data, async (dataItem: TProduct) => {
                const newPostStore = productStoreRep.create(dataItem);
                productStoreRep.save(newPostStore).catch((err: any) => console.error("QueryError"))
            });
            res.sendStatus(200);
        };
        start();
    });


    app.get('/products', async (req: Request, res: Response) => {
        const products = await productStoreRep.find();
        res.send(products);
    });

    app.listen(port, () => console.log(`server up on port ${port}`));

}).catch((error: ErrorEvent) => console.log(error));



const asyncForEach = async (array: Array<TProduct>, callback: any) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
};