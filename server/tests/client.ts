import express from 'express'
import {fillProducts} from "../../client/common/functions_common";
const app = express();
let resProducts = fillProducts(10);

app.post('/products', (req, res) => {
    res.status(200).send('OK')
});
app.get('/products', (req, res) => {
   res.send(resProducts)
});




export default app
