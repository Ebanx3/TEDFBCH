import express from 'express';
import mainRouter from '../routes';
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './auth';
import compression from 'compression';
import config from '../config';
import cors from 'cors';
import helmet from 'helmet'

const app = express();

const ttlSeconds = 60 * 10;

const StoreOptions = {
    secret: config.SECRET_STORAGE_STRING,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000.
    },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(express.static('public'));

app.use('/api',compression(),mainRouter);

app.use((req,res)=>{
    res.status(404).json({
        MSG: 'Undefined Path'
    })
});
export default app;