const express = require('express');
const {User, Course, Quiz, ShortAnswer, MultipleChoice, Task, TaskTopic, CourseTopic,TopicLink} = require('../db/models/index');
const morgan = require('morgan');
const ErrorHandler = require('./util/error_handler.js');
const AppRoutes = require('./routes/app');
const AuthRoutes = require('./routes/auth');

const cors = require('cors');

const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);

//if you run on a proxy (kubernetes, nginx, etc...)
//app.set('trust proxy', 1);

const redisClient = redis.createClient({
    port : 6379,
    host : 'localhost',   
})

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials:true,
}));

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: 'abc',
    saveUninitialized: false,
    resave:false,
    cookie: {
        secure : false, //http
        httpOnly: true, //can't be modified on the client side ...
        maxAge : 1000*60*60*50,
        path : '/'
    }
}))

app.use((req,res,next) => {
    console.log(req.session);
    next();
})
//configure redis port -> Run THrough Docker

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/app', AppRoutes);
//only in development
app.use(morgan('tiny'));

app.use(ErrorHandler);

app.listen(5000,async (err,res) => {
    if(err){
        console.log(err);
    }
    //await Course.create({user_id:1, name:'Introduction to Dart & Flutter', description: 'Learn About the Basics of Widget Building and State Management', start_date:Date.now(), end_date:Date.now()});
})
