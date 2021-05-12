const router = require('express').Router();
//import CourseController from '../controllers/course';
const {GetCourses, AddCourse, EditCourse, DeleteCourse }= require('../controllers/course');
const {getQuizzes,addQuiz, deleteQuiz, editQuiz} = require('../controllers/quiz');

router.get('/course',GetCourses)

router.post('/course',AddCourse);

router.delete('/course/:courseid', DeleteCourse)

router.put('/course/:courseid', EditCourse)

router.get('/course/:courseid/quiz', getQuizzes);

router.post('/course/:courseid/quiz',addQuiz);

router.delete('/course/:courseid/quiz/:quizid',deleteQuiz);

router.put('/course/:courseid/quiz/:quizid',editQuiz);

router.get('/:quizid/questions');

router.post('/:quizid/question/mc');

router.post('/:quizid/questions/sa');

module.exports = router;