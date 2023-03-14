import axios from 'axios';
import { SERVER_HOST } from '../../config/global_constants';

export const AddToCart = (productId, quantity)=>{




    var result = axios.post(`${SERVER_HOST}/cart`, {productId, quantity},
        { headers: { "authorization": localStorage.token }})
        .then(res => {
            console.log('it was added!');
            return res.data;
        })
        .catch(err => {
            console.log("it wasn't added !");
            return null;
        });
    console.log(`adding [${quantity}] of product [${productId}] to cart`);
    return result;
};







export const DeleteFromCart=(productId)=>{
    var result = axios.delete(`${SERVER_HOST}/cart/${productId}`, { headers: { "authorization": localStorage.token }})
        .then(res => {
            console.log('it was deleted!');
            return res.data;
        })
        .catch(err => {
            console.log("it wasn't deleted!");
            return null;
        });
    return result;
};