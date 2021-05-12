const {Course} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

const AddCourse = async (req,res,next) => {
    const user_id = 1;
    const name = req.body.name;
    const description = req.body.description;
    const start_date = req.body.start_date||null;
    const end_date = req.body.end_date||null;
    const completed = req.body.completed || false;
    try{
        if(!name || !description){
            throw BadRequest('Missing Fields : Course Name or Course Description');
        }
        const course = await Course.build({user_id,name, description,start_date,end_date,completed});
        course.save();
        res.status(200).json(course);
    }
    catch(err){
        console.log(err);
        next(err);
    }

}   

const DeleteCourse = async (req,res,next) => {
    const courseid = req.params.courseid;
    try{
        if(!courseid){
            const course = await Course.findByPk(courseid);
            if(course.length == 0){
                throw NotFound();
            }
            await Course.destroy({
                where: {
                    'id' : courseid,
                }
            })
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

const GetCourses = async (req,res,next) => {
    const user_id = 1;
    try{
        const courses = await Course.findAll({
            where:{
                user_id: user_id,
            }
        })
        res.status(200).json(courses);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

const EditCourse = async (req,res,next) => {
    const user_id = 1;
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const start_date = req.body.start_date||null;
    const end_date = req.body.end_date||null;
    const completed = req.body.completed || false;
    try{
        if(!name || !description){
            throw BadRequest('Missing Fields : Course Name or Course Description');
        }
        const course = await Course.create({id,user_id,name, description,start_date,end_date,completed});
        res.status(200).json(course);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}


module.exports = {
    AddCourse,
    DeleteCourse,
    GetCourses,
    EditCourse
}