const {CourseTopic, TopicLink, Course} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

module.exports.getTopics = async (req,res,next) => {
    const courseid = req.params.courseid;
    
    const course = await Course.findByPk(courseid);

    if(!course){
        throw new NotFound('Non Existent Courses');
    }

    const topics = await CourseTopic.findAll({
        where: {
            course_id : courseid
        }
    });

    res.json(topics);
}

module.exports.addTopic = async(req,res,next) => {
    const courseid = req.params.courseid;

    const name = req.body.name;
    const description = req.body.description;

    try {
        if(!name || !description || !courseid){
            throw new BadRequest('Missing Fields : ');
        }
        const course = await Course.findByPk(courseid);        
        if(!course){
            throw new NotFound('Non Existent Courses');
        }
        const new_topic = await CourseTopic.create({course_id:courseid,name,description});
        res.json(new_topic);
    }
    catch(err){
        next(err);
    }    
}  

module.exports.deleteTopic = async(req,res,next) => {
    const topicid = req.params.topicid;

    try{
        if(!topicid){
            throw new BadRequest('');
        }
        
        const topic = CourseTopic.findByPk(topicid);
        if(!topic){
            throw new NotFound(`Course with id of ${topicid} not found`);
        }

        await topic.destroy();
        res.json(topicid);
    }
    catch(err){
        next(err);
    }
}

module.exports.editTopic = async(req,res,next) => {
    const topicid = req.params.topicid;
    const name = req.body.name;
    const description = req.body.description;

    try {
        if(!name || !description || !courseid){
            throw new BadRequest('Missing Fields : ');
        }

        const editingTopic = await CourseTopic.findByPk(topicid);

        if(!editingTopic){
            throw new NotFound('');
        }

        const new_topic = await CourseTopic.update({course_id:courseid,name,description},
            {
                where: {id : topicid},
                returning :true, plain:true
            });
        res.json(new_topic.dataValues);
    }
    catch(err){
        next(err);
    }    
}
