import { Router } from 'express';
import passport from 'passport';

const router = Router();

const passportOptions = { badRequestMessage: 'incomplete data' ,failureRedirect:'/api'};

router.post('/login', passport.authenticate('login', passportOptions), function (req, res) { 
    req.session.info = {
        loggedIn: true,
    }
    res.status(200).json({
        msg: 'ok'
    });
});

router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            if (info.message == 'Email already registered') {
                return res.status(400).json({
                    msg:'error, email already used'
                });
            }
            return res.status(401).json(info)
        };
        res.status(201).json({
            msg:'signup successful'
        });
    })(req, res, next);

});

export default router;