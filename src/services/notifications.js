import Config from '../config';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const twilioAPI = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);

const owner = {
  name: Config.GMAIL_NAME,
  address: Config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Config.GMAIL_EMAIL,
    pass: Config.GMAIL_PASSWORD,
  },
});

export const notifyNewUserByEmail = async (userData) => {
  const mailOptions = {
    from: owner,
    to: Config.GMAIL_EMAIL,
    subject: 'Nuevo Registro',
    html: `<h1>Bienvenido ${userData.name}</h1>
    <p>Te acabas de registrar en el proyecto e-commerce del curso de backend de CoderHouse</p>`,
  };
  const response = await gmailTransporter.sendMail(mailOptions);
  return response;
};

export const notifyNewOrderUsingWhatsApp = async (orderData) => {
  const params = {
    body: `A New Order was created. See info below\n\n\n ${orderData}`,
    from: `whatsapp:${Config.TWILIO_WSP_CELLPHONE}`,
    to: `whatsapp:${Config.ADMIN_PHONE}`,
  };

  const response = await twilioAPI.messages.create(params);
  return response;
};


