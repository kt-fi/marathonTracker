const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskId: {type: String, require: true},
    userId: {type: String, require: true},
    taskName: {type: String, require: true},
    frequencyRequired: {type: Number, require: true},
    startDate: {type: Date, require: true},
    completedToday: {type: Boolean, require: true},
    completedByDay: [{type: Boolean, require: true}]
})

const userSchema = new Schema({
    userId: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: false },
    tasksToTrack: [taskSchema]
})

module.exports = mongoose.model('User', userSchema)