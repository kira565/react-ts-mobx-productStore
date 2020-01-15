import {Request, Response} from "express";
import {getManager} from "typeorm";
import {ProductEntity} from "../entities/ProductEntity";

export async function postAllProducts(request: Request, response: Response) {
    const productStoreRep = getManager().getRepository(ProductEntity);
    await productStoreRep.save(request.body.data, {chunk: request.body.data.length / 1000});
    response.sendStatus(200)
}