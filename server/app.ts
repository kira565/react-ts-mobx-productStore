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
        console.log(req.body.data);

        await productStoreRep.save(req.body.data, {chunk: req.body.data.length / 1000});
        res.sendStatus(200);
    });


    app.get('/products', async (req: Request, res: Response) => {
        const products = await productStoreRep.find();
        res.send(products);
    });

    app.listen(port, () => console.log(`server up on port ${port}`));

}).catch((error: ErrorEvent) => console.log(error));
