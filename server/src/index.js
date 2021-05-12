const express = require('express');
const {User, Course, Quiz, ShortAnswer, MultipleChoice, Task, TaskTopic, CourseTopic,TopicLink} = require('../db/models/index');
const morgan = require('morgan');
const ErrorHandler = require('./util/error_handler.js');
const AppRoutes = require('./routes/app');
const cors = require('cors');

const app = express();

app.use(cors({
    credentials:true,
}));

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
