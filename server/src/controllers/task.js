const {Task, TaskTopic} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

module.exports.getTasks = async(req,res,next) => {
    const courseid = req.params.courseid;

    const tasks = await Task.findAll({
        where: {
            course_id : courseid,
        }
    });

    res.json(tasks);
}

module.exports.addTask = async (req,res,next) => {
    const courseid = req.params.courseid;
    const name = req.body.name;
    const description = req.body.description;

    const task = await Task.create({course_id:courseid, name, description});

    res.json(task);
}

module.exports.deleteTask = async(req,res,next) => {
    const taskid = req.params.taskid;

    //const task = await Task.
}

module.exports.editTask = async(req,res,next) => {
    const taskid = req.params.taskid;
    
}


const addTopic = async(req,res,next) => {
    const taskid = req.params.taskid;
    const name = req.body.name;
    const description = req.body.description;

    const new_topic = await TaskTopic.create({task_id:taskid, name, description});

    res.json(new_topic);
}

const deleteTopic = async(req,res,next) => {
    const topicid = req.params.topicid;

    res.json();
}

const editTopic = async(req,res,next) => {}

const getTopics = async(req,res,next) => {}

module.exports.tasks = {
    addTopic,
    deleteTopic,
    editTopic,
    getTopics,
}   