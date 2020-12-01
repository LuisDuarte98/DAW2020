// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

// Returns student with id = x
module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

// Insert a new student
module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

// Edit a student
module.exports.edit = student => {
    return Student
        .update({"numero":student['numero']},{$set : student})
        .exec();
}

// Delete a student
module.exports.delete = id => {
    return Student.deleteOne({numero: id})
}