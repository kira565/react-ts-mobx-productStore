import axios from "axios"
import {TProduct} from "../types/types";

const instance = axios.create({
    baseURL: `http://localhost:5000/`
});

export const productsAPI =  {
    getProducts(){
        return instance.get(`products`)
            .then(response => {
                return response
            })
    },

    loadProducts(products: TProduct){
        return instance.post(`products`, { "data": products } )
            .then(response => {
                return response
            })
    }
};