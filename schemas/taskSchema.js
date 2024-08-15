const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    _id: false,
    taskId: {type: String, require: true},
    userId: {type: String, require: true},
    taskName: {type: String, require: true},
    frequencyRequired: {type: Number, require: true},
    startDate: {type: Date, require: true},
    completedToday: {type: Boolean, require: true},
    completedByDay: [{type: Boolean, require: true}]
})

module.exports = mongoose.model('Task', taskSchema)