var express = require('express');
var router = express.Router();

var c_student = require('../controllers/student');

// Auxiliary functions 

// Tranform body in an object Student
function body_to_student(b){
  return {
    "numero" : b['number'],
    "nome"   : b['name'],
    "git"    : b['git'],
    "tpc"    : [
        (b['1'] == "on") ? 1 : 0,
        (b['2'] == "on") ? 1 : 0,
        (b['3'] == "on") ? 1 : 0,
        (b['4'] == "on") ? 1 : 0,
        (b['5'] == "on") ? 1 : 0,
        (b['6'] == "on") ? 1 : 0,
        (b['7'] == "on") ? 1 : 0,
        (b['8'] == "on") ? 1 : 0
    ]}
};

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

// GET students collection
router.get('/students', function(req, res) {
  c_student.list()
    .then(data => res.render('students', {list: data}))
    .catch(err => res.render('error', {error: err}))
});

// GET HTML Form
router.get('/students/register', function(req, res) {
  res.render('register')
});

// GET student with id = x
router.get('/students/:id', function(req, res) {
  var id = req.params['id']
  c_student.lookUp(id)
    .then(data => res.render('student', {student: data, error: id}))
    .catch(err => res.render('error', {error: err}))
});


// POST new student
router.post('/students/', function(req, res) {
  var student = body_to_student(req.body)
  c_student.insert(student)
    .then(data => {
      c_student.list()
        .then(new_data => res.render('students', {list: new_data}))
        .catch(err => res.render('error', {error: err}))
    })
    .catch(err => res.render('error', {error: err}))
});

// Get student with id = x to edit
router.get('/students/edit/:id', function(req, res){
  var id = req.params['id']
  c_student.lookUp(id)
    .then(data => res.render('edit', {student: data, error: id}))
    .catch(err => res.render('error', {error: err}))
});


// PUT student
router.post('/students/edit/:id', function(req, res) {
  var student = body_to_student(req.body)
  console.log(`
    ${student.numero}
    ${student.nome}
  `)
  c_student.edit(student)
    .then(data => {
      c_student.list()
        .then(new_data => res.render('students', {list: new_data}))
        .catch(err => res.render('error', {error: err}))
    })
    .catch(err => res.render('error', {error: err}))
});


// Delete a student
router.get('/students/delete/:id', function(req, res) {
  var id = req.params['id']
  c_student.delete(id)
    .then(data => {
      c_student.list()
        .then(new_data => res.render('students', {list: new_data}))
        .catch(err => res.render('error', {error: err}))
    })
    .catch(err => res.render('error', {error: err}))
});

module.exports = router;
