import {Request, Response} from "express";
import {getManager} from "typeorm";
import {ProductEntity} from "../entities/ProductEntity";

export async function getAllProducts(request: Request, response: Response) {

    const productStoreRep = getManager().getRepository(ProductEntity);

    const productStore = await productStoreRep.find();

    response.send(productStore)
}