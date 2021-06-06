const router = require('express').Router();
const {localSignin , localSignup, googleSignin} = require('../controllers/auth');

router.post('/signin', localSignin);

router.post('/signup', localSignup);

router.post('/check', (req,res,next) => {
    res.json(req.session.user[1]);
})

router.post('/signin/google', googleSignin);

module.exports = router;
