const {User} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');
const {genSalt, hash, compare} = require('bcrypt');
const {OAuth2Client} = require('google-auth-library');

//email, username, password
const client = new OAuth2Client(process.env.OAuth2Client);

module.exports.checkAuth = async(req,res,next) => {
    if(req.session || req.session.clientId){
        throw new UnAuthorized('Invalid Login Credentials');
        
    }
}

//unprotected -> when to use middleware;
module.exports.localSignup = async(req,res,next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    req.session.clientId = '1';
    req.session.myNum = 5;

    const verifyEmail = () => {

    }

    const veryifyPassword = () => {

    }

    try {
        if(!email || !password){
            throw new BadRequest('Need to Provider Email and Password');
        }

        const existing_user = await User.findAll({
            where: {
                'email' : email,
            }
        })

        //if(existing_user) throw ....

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const new_user = await User.create({email, username, password:hashedPassword});

        res.json(new_user);

    }
    catch(err){
        next(err);
    }
}

module.exports.localSignin = async(req,res,next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findAll({
            where: {
                'email' : email,
            }
        })
        if(!user){
            throw new BadRequest('');
        }
        // -> TRUE OR FALSE
        const match = await compare(password, user[0].password);
        if(!match){
            throw new Forbidden('');
        }
        req.session.userid = user[0].id;
        res.json({username: user[0].username});
    }
    catch(err){
        next(err);
    }
}
//google signin
module.exports.googleSignin = async(req,res,next) => { 
    const {tokenId} = req.body;
    //client verifyIdToken({tokenId}, audience:"google client id");
    //const {email_verified, name, email} = response.payload;
    try {
        if(!tokenId){
            throw new BadRequest('');
        }
        client.verifyIdToken({idToken:tokenId, audience:process.env.OAuth2Client},)
        .then(async(response) => {
            const {email_verified, email} = response.payload;
            if(!email_verified){
                throw new BadRequest('Invalidated Email');
            }            
            var user = await User.findAll({
                where: {
                    email: email,
                }
            });
            user = user[0];
            if(!user){
                user = await User.create({email:email, username:email.split('@')[0], password:'12314'});
            }
            //req.session.gmail = true;
            req.session.userid = user.id;
            res.json({status:'success', username:user.username});
        })
        .catch(err => {
            next(err);
            
        })
    }
    catch(err){
        next(err);
    }
}

//etc signin 

//change password, etc...
const oAuth = (req,res,next) => {
    const code = req.query.code;

    if(!code){
        throw new BadRequest('Missing Authorization Code');
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id",) //enter it here
    params.append("client_secret",); //enter here
    params.append("redirect_uri","http://localhost:3000");

    axios.post(tokenEndpoint, params)
    .then(response => {
        req.oauth = response.data;
        next();
    })
    .catch(err => {

    })
}