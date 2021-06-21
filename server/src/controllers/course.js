const {Course} = require('../../db/models');
const {Forbidden, UnAuthorized, NotFound, BadRequest} = require('../util/error_types');

const AddCourse = async (req,res,next) => {
    
    const user_id = req.session.userid;
    const name = req.body.name;
    const description = req.body.description;
    const start_date = req.body.start_date||null;
    const end_date = req.body.end_date||null;
    const completed = req.body.completed || false;


    try{
        if(!name || !description){
            throw BadRequest('Missing Fields : Course Name or Course Description');
        }
        const course = await Course.create({user_id,name, description,start_date,end_date,completed});
        res.status(200).json(course);
    }
    catch(err){
        next(err);
    }

}   

const DeleteCourse = async (req,res,next) => {
    const courseid = req.params.courseid;
    try{
        if(!courseid){
            throw new BadRequest('');
        }

        const course = await Course.findByPk(courseid);
        if(!course){
            throw new NotFound('');
        }
        await Course.destroy({
            where: {
                'id' : courseid,
            }
        })
        res.json({
            'id' : courseid,
        })
    }
    catch(err){
        next(err);
    }
}

const GetCourses = async (req,res,next) => {
    console.log(req.session.userid);
    const user_id = req.session.userid;

    if(!user_id){
        res.status(400).json({'poop':'johnson'});
    }
    try{
        const courses = await Course.findAll({
            where:{
                user_id: user_id,
            }
        })
        res.status(200).json(courses);
    }
    catch(err){
        next(err);
    }
}

const EditCourse = async (req,res,next) => {
    const user_id = req.session.userid;
    
    const id = req.body.course.id;
    const name = req.body.course.name;
    const description = req.body.course.description;
    const start_date = req.body.course.start_date||null;
    const end_date = req.body.course.end_date||null;
    const completed = req.body.course.completed || false;
    
    try{
        if(!name || !description){
            throw new BadRequest('Missing Fields : Course Name or Course Description');
        }
        const course = await Course.update(
            {user_id,name, description,start_date,end_date,completed},
            {
                where: {
                    'id' : id,
                }
            });
        res.status(200).json(course);
    }
    catch(err){
        next(err);
    }
}


module.exports = {
    AddCourse,
    DeleteCourse,
    GetCourses,
    EditCourse
}