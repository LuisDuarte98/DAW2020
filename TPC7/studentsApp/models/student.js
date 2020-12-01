// Student model

var mongoose = require('mongoose')

// Default schema
var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
});

module.exports = mongoose.model('student', studentSchema) // Model that links to db_collection