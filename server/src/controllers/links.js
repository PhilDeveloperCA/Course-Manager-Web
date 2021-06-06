const {CourseTopic, TopicLink, Course} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

module.exports.getLinks = async(req,res,next) => {
    const topicid = req.params.topicid;
    console.log(topicid);

    try {        
        const current_topic = await CourseTopic.findByPk(topicid);
        if(!current_topic){
            throw new NotFound('');
        }

        const links = await TopicLink.findAll({
            where: {
                topic_id:topicid,
            }
        })

        res.json(links);
    }
    catch(err){
        next(err);
    }
}

module.exports.addLink = async(req,res,next) => {
    const topicid = req.params.topicid;
    const name = req.body.name;
    const url = req.body.url;
    

    try {
        if(!topicid | !name | !url){
            throw new BadRequest('');
        }
        
        const topic = await CourseTopic.findByPk(topicid);
        if(!topic){
            throw new NotFound('');
        }

        const newLink = await TopicLink.create({topic_id:topicid, name, url});
        res.json(newLink);
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteLink = async(req,res,next) => {
    const linkid = req.params.linkid;
    try {
        existing_link = await TopicLink.findByPk(linkid);
        if(!existing_link){
            throw new NotFound('')
        }
        await existing_link.destroy();
        res.json({id:linkid});
    }
    catch(err){
        next(err);
    }
}

module.exports.editLink = async(req,res,next) => {
    const linkid = req.params.topicid;
    const name = req.body.name;
    const url = req.body.description;

    try {
        if(!linkid | !name | !url){
            throw new BadRequest('');
        }
        const link = await TopicLink.findByPk(linkid);
        if(!link){
            throw new NotFound('');
        }

        const newLink = await TopicLink.update({topic_id:topicid, name, url}, {
            where: {
                id: linkid,
            },
            returning: true, plain:true,
        });
        res.json(newLink);
    }
    catch(err){
        next(err);
    }
}