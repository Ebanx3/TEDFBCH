import { CartModel } from '../models/cart';
import { categoryCollectionName } from '../models/categories';
import { notifyNewOrderUsingWhatsApp } from '../services/notifications';
import { UserModel } from '../models/user';
import { ProductModel } from '../models/products/products.model';

export const getCart = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    const cart = await CartModel.find({userId:req.user._id});
    res.status(200).json({
        data: cart[0]
    });
};

export const addProduct = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    const cart = await CartModel.find({userId:req.user._id});
    const productsUpdated = cart[0].products.slice();

    const index = productsUpdated.findIndex(prod => prod.productId == req.body.productId);

    if(index < 0){
        productsUpdated.push(req.body)
    }
    else{
        productsUpdated[index].amount += req.body.amount;
    }

    const cartUpdated = await CartModel.findByIdAndUpdate(cart[0]._id.toString(), {products: productsUpdated}, {new:true});
    res.status(200).json({
        msg:'Products added',
        cart: cartUpdated,
    })
};

export const deleteProduct = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    const cart = await CartModel.find({userId:req.user._id});
    const productsUpdated = cart[0].products.slice();

     const index = productsUpdated.findIndex(prod => prod.productId == req.body.productId);
    if(index >= 0){
        if(productsUpdated[index].amount <= req.body.amount){
            productsUpdated.splice(index, 1);
        }
        else{
            productsUpdated[index].amount -= req.body.amount;
        }
    }
    const cartUpdated = await CartModel.findByIdAndUpdate(cart[0]._id.toString(), {products: productsUpdated}, {new:true});
    res.status(200).json({
        msg: 'Products deleted',
        cart:cartUpdated
    })
};

export const createOrder = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    const cart = await CartModel.find({userId:req.user._id});
    console.log(cart[0])
    const user = await UserModel.findById(cart[0].userId.toString());
    const data = {
        nombre: user.name,
        email: user.email,
        productos : []
    }
    cart[0].products.map(async (prod) => {
        const product = await ProductModel.findById(prod.productId.toString());
        data.productos.push(`Producto: ${product.name} - Precio:${product.price} * Cantidad: ${prod.amount}`)
    })
    console.log(data)

    notifyNewOrderUsingWhatsApp(data);
    await CartModel.findByIdAndUpdate(cart[0]._id.toString(), {products: []}, {new:true});
    res.status(200).json({
        msg:'Order created',
        Products: cart[0].products
    })
};

