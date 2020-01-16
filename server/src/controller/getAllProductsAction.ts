import {Request, Response} from "express";
import {getManager} from "typeorm";
import {ProductEntity} from "../entities/ProductEntity";

export async function getAllProducts(request: Request, response: Response) {

    const productStoreRep = getManager().getRepository(ProductEntity);

    const productStore = await productStoreRep.find().catch((err) => response.sendStatus(404));
    console.log(productStore);

    response.send(productStore)
}