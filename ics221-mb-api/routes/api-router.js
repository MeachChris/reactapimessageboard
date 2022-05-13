import express from 'express'; 
import { getAllMessages, addNewMessage, updateMessage, deleteMessage } from '../controllers/msg-api-controller.js'; 
import { getAllLabs, getAllCourses,registerANewCourse } from '../controllers/exam-api-controller.js'; 
import { registerNewUser, logInUser } from '../controllers/user-api-controller.js';
import passport from 'passport';
 
const router = express.Router(); 
 
router.route('/messages') 
.get(getAllMessages) 
.post(passport.authenticate('jwt', { session: false }), addNewMessage);

router.route('/messages/:messageId') 
.patch(passport.authenticate('jwt', { session: false }), updateMessage)
.delete(passport.authenticate('jwt', { session: false }), deleteMessage)

router.route('/labs')
.get(getAllLabs);

router.route('/courses')
.get(getAllCourses)
.post(registerANewCourse);

router.route('/users')
.post(registerNewUser);

router.route('/login')
.post(passport.authenticate('local', {session: false}), logInUser);


export default router;