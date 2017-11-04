var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});
var studentController = require('../controller/studentController');

/* GET home page. */
router.get('/', studentController.homepage);
router.post('/student/add',upload.single('profileimage') , studentController.createStudent);
router.get('/student/show/:id', studentController.studentDetail);
router.post('/student/edit/:id',upload.single('profileimage') , studentController.editStudent);
router.get('/student/delete/:id', studentController.deleteStudent);


module.exports = router;