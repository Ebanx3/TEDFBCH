import { Schema, model } from "mongoose";
import { UserCollectionName } from "./user";
import { productsCollectionName } from "./products/products.model";


export const CartCollectionName = 'Cart';

const productItem = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: productsCollectionName,
        required: true,
    },
    amount: { type: Number, default: 1 },
    },{ _id: false }
)

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserCollectionName,
        required: true,
    },
    products: [productItem]
}, {
    versionKey: false,
    timestamps: true,
});

export const CartModel = model(CartCollectionName, CartSchema);