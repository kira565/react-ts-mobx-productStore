import "reflect-metadata"
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import {getAllProducts} from "./src/controller/getAllProductsAction";
import {postAllProducts} from "./src/controller/postAllProducts";

export const port = process.env.PORT || 5000;

createConnection().then(async (connection: any) => {

    const app = express();
    app.use(bodyParser.json({limit: '1mb'}));

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });



    app.post('/products', postAllProducts);
    app.get('/products', getAllProducts);



    app.listen(port, () => console.log(`server up on port ${port}`));
}).catch((error: ErrorEvent) => console.log(error));
