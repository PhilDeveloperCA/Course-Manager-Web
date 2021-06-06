const {Quiz, ShortAnswer, MultipleChoice} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

module.exports.addMCQuestion = async (req,res,next) => {
    const quizid = req.params.quizid;
    const a1 = req.body.a1;
    const question = req.body.question;
    const answer = req.body.answer;

    try {
        if(!quizid || !a1 || !question ||!answer){
            throw BadRequest('Missing Fields');
        }
    
        const a2 = req.body.a2 || null;
        const a3 = req.body.a3 || null;
        const a4 = req.body.a4 || null;
        const a5 = req.body.a5 || null;
    
        const new_question = await MultipleChoice.create({quiz_id:quizid,question,a1,a2,a3,a4,a5,answer});

        res.json(new_question);
    }
    catch(err){
        console.log(err);
        res.json(err);
        //next(err);
    }
}

module.exports.addSAQuestion = async (req,res,next) => {
    const quizid = req.params.quizid;;
    const question = req.body.answer;
    const answer = req.body.answer;

    try {
        if(!quizid || !question ||!answer){
            throw BadRequest('Missing Fields');
        }
    
        const question = await ShortAnswer.create({quiz_id:quizid,answer});

        res.json(question);
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteMCQuestion = async (req,res,next) => {
    const question_id = req.params.questionid;
    
    try {
        if(!question_id){
            throw NotFound('');
        }
        const question = await MultipleChoice.findOne({
            where: {
                'id' : question_id,
            }
        });

        if(question=== null){
            throw NotFound('');
        }

        await question.destroy();

        res.json(question_id);
        //delete Qyestion here 

    }
    catch(err){
        next(err);
    }
}

module.exports.deleteSAQuestion = async(req,res,next) => {
    const question_id = req.params.questionid;

    try {
        const editingAnswer = ShortAnswer.findByPk(question_id);

        console.log(editingAnswer.length);

        editingAnswer.destroy();

    }
    catch(err){
        next(err);
    }
}

module.exports.editMCQuestion = async (req,res,next) => {
    const questionid = req.params.questionid;

    const quizid = req.params.quizid;
    const a1 = req.body.a1;
    const question = req.body.question;
    const answer = req.body.answer;

    try {
        if(!quizid || !a1 || !question ||!answer){
            throw new BadRequest('Missing Fields');
        }
    
        const a2 = req.body.a2 || null;
        const a3 = req.body.a3 || null;
        const a4 = req.body.a4 || null;
        const a5 = req.body.a5 || null;

        const editingQuestion = await MultipleChoice.findByPk(questionid);

        if(editingQuestion === null){
            throw new NotFound(`Question of id ${questionid} can not be found`);
        }

        const editedQuestion = await MultipleChoice.update(
            {quiz_id:quizid,question,a1,a2,a3,a4,a5,answer},
            {where : {id : questionid}, returning:true, plain:true},                                           
        )
            console.log(editedQuestion);
        //const editedQuestion = await MultipleChoice.findByPk(questionid);

        res.json(editedQuestion.dataValues);

    }
    catch(err){
        next(err);
    }
}

module.exports.editSAQuestion = async(req,res,next) => {
    const questionid = req.params.questionid;

    const quizid = req.params.quizid;
    const question = req.body.question;
    const answer = req.body.answer;

    try {
        if(!quizid || !question ||!answer){
            throw new BadRequest('Missing Fields');
        }

        const editingQuestion = await ShortAnswer.findByPk(questionid);

        if(editingQuestion === null){
            throw new NotFound(`Question of id ${questionid} can not be found`);
        }

        const editedQuestion = await ShortAnswer.update(
            {quiz_id:quizid,question, answer},
            {where : {id : questionid}, returning:true, plain:true},                                           
        )

        res.json(editedQuestion.dataValues);

    }
    catch(err){
        next(err);
    }
}

module.exports.getQuestions = async (req,res,next) => {
    const quizid = req.params.quizid;
    try {
        if(!quizid){
            throw new BadRequest('Missing Path Paramaters: quizid');
        } 
        
        const SA = await ShortAnswer.findAll({
            where: {
                quiz_id: quizid,
            }
        });

        const quiz = await Quiz.findOne({
            where:{
                id: quizid,
            }
        })

        if(!quiz) throw new NotFound(`Quiz ${quizid} `);

        const MC = await MultipleChoice.findAll({
            where: {
                quiz_id:quizid,
            }
        });

        res.status(200).json({SA,MC});
    }
    catch(err){
        next(err);
    }
}

