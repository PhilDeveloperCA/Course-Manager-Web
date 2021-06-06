const router = require('express').Router();
//import CourseController from '../controllers/course';
const {GetCourses, AddCourse, EditCourse, DeleteCourse }= require('../controllers/course');
const {getQuizzes,addQuiz, deleteQuiz, editQuiz} = require('../controllers/quiz');
const {getTasks,addTask, editTask, deleteTask, tasks} = require('../controllers/task');
const {getQuestions, addMCQuestion, addSAQuestion, deleteSAQuestion, deleteMCQuestion, editMCQuestion, editSAQuestion} = require('../controllers/question');
const {getTopics, addTopic, deleteTopic, editTopic} = require('../controllers/coursetopic');
const {addLink, deleteLink, editLink, getLinks} = require('../controllers/links');

//1.Interact with Courses 
router.get('/course',GetCourses)

router.post('/course',AddCourse);

router.delete('/course/:courseid', DeleteCourse)

router.put('/course/:courseid', EditCourse)

//2.Interact with Quizzes 
router.get('/course/:courseid/quiz', getQuizzes);

router.post('/course/:courseid/quiz', addQuiz);

router.delete('/quiz/:quizid',deleteQuiz);

router.put('/quiz/:quizid',editQuiz);

//3.Interact with Tasks 
router.get('/course/:courseid/task', getTasks);

router.post('/course/:courseid/task', addTask);

router.put('/course/:courseid/task/:taskid');

router.delete('/course/:courseid/task/:taskid');

//4.Task Topics
router.get('/task/:taskid/topic', tasks.getTopics);

router.post('/task/:taskid/topic', tasks.addTopic);

router.delete('/task/:taskid/topic/:topicid', tasks.deleteTopic);

router.put('/task/:taskid/topic/:topicid', tasks.editTopic);

//5.Course Topics 
router.get('/course/:courseid/topic', getTopics);

router.post('/course/:courseid/topic', addTopic);

router.delete('/course/:courseid/topic/:topicid', deleteTopic);

router.put('/course/:courseid/topic/:topicid', editTopic);

//6/7 .Interact with Questions 
router.get('/quiz/:quizid/question', getQuestions);

router.post('/quiz/:quizid/mc',addMCQuestion);

router.post('/quiz/:quizid/sa',addSAQuestion);

router.put('/quiz/:quizid/mc/:questionid',editMCQuestion);

router.put('/quiz/:quizid/sa/:questionid',editSAQuestion);

router.delete('/quiz/:quizid/sa/:questionid', deleteSAQuestion);

router.delete('/quiz/:quizid/mc/:questionid', deleteMCQuestion);

//8 Interact with TopicLinks
/*router.get('/topic/:topicid/link', (req,res,next) => {
    console.log('here');
    res.json(req.params.topicid);
})*/

router.get('/topic/:topicid/link', getLinks);

router.post('/topic/:topicid/link',addLink);

router.delete('/topic/:topicid/link/:linkid',deleteLink);

router.put('/topic/:topicid/link', editLink);

module.exports = router;