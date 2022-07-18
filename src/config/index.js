import dotenv from 'dotenv';

dotenv.config();

export default {
    URL_MONGOATLAS: process.env.MONGO_ATLAS_URL,
    SECRET_STORAGE_STRING: process.env.STORAGE_SECRET,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_NAME: process.env.GMAIL_NAME,
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_WSP_CELLPHONE: process.env.TWILIO_WSP_NUMBER,
    ADMIN_PHONE: process.env.ADMIN_PHONE,
};