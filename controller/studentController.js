var mongoose = require('mongoose');
var Student = require('../model/Student');


exports.homepage = function(req, res, next) {
    var students = Student.find({}, function (err, student) {
        res.json(student);
    });  
}

exports.createStudent = function (req, res, next) {
    // Form Validation
    req.checkBody('name', 'Name must be specified.').notEmpty();
    req.checkBody('email', 'Invalid email address.').isEmail();
    req.checkBody('mobile', 'Mobile must be specified.').notEmpty();
    req.checkBody('date_of_birth', 'Invalid date').notEmpty();

    req.sanitize('name').trim();     
    req.sanitize('email').trim();
    req.sanitize('mobile').trim();
    req.sanitize('date_of_birth').toDate();
    req.sanitize('school').trim();
    req.sanitize('department').trim();
    req.sanitize('course').trim();
    req.sanitize('nationality').trim();
    req.sanitize('state').trim();
    
    // Get Validation Errors
    var errors = req.validationErrors();

    // Create new student object from form Inputs
    var student = new Student(req.body);
    console.log(req.body);

    // Check for validation error
    // If any redirect student to fill form again 
    if(errors){
        console.log(errors)
        res.json(errors);
        return;
    } else {
        //if no error save student to database and redirect to homepage
        student.save(function (err, student) {
            if(err){
                res.send(err); 
            } 
            res.redirect('/');
        });
    }
    
};

exports.studentDetail = function (req, res, next) {
    Student.findById(req.params.id, function (err, student) {
        if(err){
            res.send(err);
        }
        res.json(student);
    });
}

exports.editStudent = function (req, res, next) {
    
    req.checkBody('name', 'Name must be specified.').notEmpty();
    req.checkBody('email', 'Invalid email address.').isEmail();
    req.checkBody('mobile', 'Mobile must be specified.').notEmpty();
    req.checkBody('date_of_birth', 'Invalid date').notEmpty();

    req.sanitize('name').trim();     
    req.sanitize('email').trim();
    req.sanitize('mobile').trim();
    req.sanitize('date_of_birth').toDate();
    req.sanitize('school').trim();
    req.sanitize('department').trim();
    req.sanitize('course').trim();
    req.sanitize('nationality').trim();
    req.sanitize('state').trim();
    
    // Get Validation Errors
    var errors = req.validationErrors();
    if (errors){
        console.log(errors)
        res.json(errors);
        return;
    } else {
        Student.findOneAndUpdate({_id: req.params.id}, req.body, 
            {
                new: true,
                runValidators: true
            }).exec();
            console.log(req.body);
            res.redirect('/'); 
        }  
}

exports.deleteStudent = function (req, res, next) {
    Student.findByIdAndRemove(req.params.id, function (err, student) {
        if(err) res.send('error');
        res.redirect('/')
    });
}