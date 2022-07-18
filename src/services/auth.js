import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/user';
import { CartModel } from '../models/cart';
import { notifyNewUserByEmail } from '../services/notifications';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const login = async (req, username, password, done) => {
    const user = await UserModel.findOne({ email: username });
    if (!user){
        return done(null, false, { message: 'Invalid email or password' });
    }
    const samePass = await user.isValidPassword(password);
    if(!samePass){
        req.session.info = {
            errLogginIn: true
        }
        return done(null, false, { message: 'Invalid email or password' });
    }
    return done(null, user);
};

const signup = async (req, username, password, done) => {
    try {
        const { email, password, name, adress, age, phone } = req.body;
        const newUser = await UserModel.create({ email :email, password:password, name:name, adress:adress, age:age , phone:phone });

        await CartModel.create({userId: newUser._id.toString(), })
        notifyNewUserByEmail(newUser);
        return done(null, newUser);
    }
    catch (err) {
        if (err.code == 11000) {
            return done(null, false, { message: 'Email already registered' });
        }
        return done(null, false, { message: 'Unexpected error' })
    }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
    console.log('Ejecutando serializeUser');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('Ejecutando DEserializeUser');
    return done(null, user);
}); 