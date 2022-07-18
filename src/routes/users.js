import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';


const fileStorageEngine = multer.diskStorage({
    filename:(req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
    destination:(req,file,cb) => {
        cb(null, "./public/avatars");
    }
})
const upload = multer({storage: fileStorageEngine});

const router = Router();

const passportOptions = { badRequestMessage: 'incomplete data' ,failureRedirect:'/api'};

router.post('/login', passport.authenticate('login', passportOptions), function (req, res) { 
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

router.post('/setAvatar',upload.single('avatar'),(req,res) => {
    console.log(req.file)
    res.status(200).redirect('/')
});

export default router;