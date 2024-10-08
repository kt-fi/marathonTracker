const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    userId: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: false },
    tasksToTrack: [{ type: mongoose.Types.ObjectId, require: false, ref: 'Task'}]
})

module.exports = mongoose.model('User', userSchema)