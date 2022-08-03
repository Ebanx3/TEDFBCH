import { Schema, model } from "mongoose";
import { categoryCollectionName } from "../categories";

export const productsCollectionName = 'product';

export const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: categoryCollectionName,
        required:true,
    }
},
{
    versionKey:false,
    timestamps:true
});

export const ProductModel = model(productsCollectionName, productSchema);