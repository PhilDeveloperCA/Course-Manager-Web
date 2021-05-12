const {Quiz} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

module.exports.getQuizzes = async (req,res,next) => {
    const courseid = req.params.courseid;
    try {
        if(!courseid){
            throw BadRequest('Missing Path Parameter : courseid')
        }
        const quizzes = await Quiz.findAll({
            where: {
                'course_id': courseid,
            }
        })

        res.status(200).json(quizzes);
    } 
    catch(err){
        next(err);
    }
}

module.exports.addQuiz = async(req,res,next) => {
    const courseid = req.params.courseid;
    const title = req.body.title;

    try{
        if(!courseid){
            throw BadRequest('Missing Path Parameter : courseid')
        } if(!title){
            throw BadRequest('Missing Fields : Quiz Title')
        }

        const new_quiz = await Quiz.create({course_id:courseid, title});

        res.status(200).json(new_quiz);
    }
    catch(err){
        next(err);
    }
}

module.exports.editQuiz = async(req,res,next) => {
    const title = req.body.title;
    const quizid = req.params.quizid;

    try {

    }
    catch (err) {
        next(err);
    }
}

module.exports.deleteQuiz = async(req,res,next) => {
    const quizid = req.params.quizid;

    try {
        const quiz = await Quiz.findByPk(quizid);
        

        await Quiz.destroy({
            where: {
                'id' : quizid,
            }
        })
    }
    catch(err){

    }
}