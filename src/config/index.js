import dotenv from 'dotenv';

dotenv.config();

export default {
    URL_MONGOATLAS: process.env.MONGO_ATLAS_URL,
    SECRET_STORAGE_STRING: process.env.STORAGE_SECRET
};