var mongoose = require('mongoose');
var Student = require('../model/Student');


exports.homepage = function(req, res, next) {
    var students = Student.find({}, function (err, student) {
        res.json(student);
    });  
}

exports.createStudent = function (req, res, next) {
   
    // Check File Upload
    if (req.file){
        console.log('Uploading Image...');
        var profileimage = req.file.filename;
    } else {
        console.log('NO image Upload!');
        var profileimage = '';
    }

    // Form Validation
    req.checkBody('name', 'Name must be specified.').notEmpty();
    req.checkBody('email', 'Invalid email address.').isEmail();
    req.checkBody('school', 'School must be specified.').notEmpty();
    req.checkBody('department', 'Department must be specified.').notEmpty();
    req.checkBody('course', 'Course must be specified.').notEmpty();

    req.sanitize('name').trim();     
    req.sanitize('email').trim();
    req.sanitize('mobile').trim();
    req.sanitize('school').trim();
    req.sanitize('department').trim();
    req.sanitize('course').trim();
    req.sanitize('nationality').trim();
    req.sanitize('state').trim();
    
    // Get Validation Errors
    var errors = req.validationErrors();

    // Create new student object from form Inputs
    var student = new Student({
        name: req.body.name, 
        email: req.body.email, 
        mobile: req.body.mobile, 
        school: req.body.school, 
        department: req.body.department, 
        course: req.body.course, 
        nationality: req.body.nationality, 
        state: req.body.state, 
        dob: req.body.dob, 
        profileimage: profileimage
    });
    console.log(student);

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
                console.log(err);
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
    // Check File Upload
    if (req.file){
       console.log('Uploading Image...');
       var profileimage = req.file.filename;
   } else {
       console.log('NO image Upload!');
       var profileimage = '';
   }

   // Form Validation
   req.checkBody('name', 'Name must be specified.').notEmpty();
   req.checkBody('email', 'Invalid email address.').isEmail();
   req.checkBody('school', 'School must be specified.').notEmpty();
   req.checkBody('department', 'Department must be specified.').notEmpty();
   req.checkBody('course', 'Course must be specified.').notEmpty();

   req.sanitize('name').trim();     
   req.sanitize('email').trim();
   req.sanitize('mobile').trim();
   req.sanitize('school').trim();
   req.sanitize('department').trim();
   req.sanitize('course').trim();
   req.sanitize('nationality').trim();
   req.sanitize('state').trim();
   
   // Get Validation Errors
   var errors = req.validationErrors();

   // Create new student object from form Inputs

   var name = req.body.name;
   var email = req.body.email; 
   var mobile = req.body.mobile;
   var school = req.body.school;
   var department = req.body.department;
   var course = req.body.course;
   var nationality = req.body.nationality;
   var state = req.body.state;
   var dob = req.body.dob;
   var profileimage = profileimage;
   
   //console.log(student);

   // Check for validation error
   // If any redirect student to fill form again 
   if(errors){
       console.log(errors)
       res.json(errors);
       return;
   } else {
       Student.findOneAndUpdate({_id: req.params.id}, { "$set": {
               "name": name, 
               "email": email, 
               "mobile": mobile,
               "school": school,
               "department": department,
               "course": course,
               "nationality": nationality,
               "state": state,
               "dob": dob,
               "profileimage": profileimage

           }}, 
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