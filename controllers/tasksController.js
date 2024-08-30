const Task = require("../schemas/taskSchema");
const User = require("../schemas/userSchema");
const { uuid } = require("uuidv4");
const HttpError = require("../httpError");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");




const createTask = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({ msg: "Something Not Filled In Correctly" }).status(422);
    }

    let { userId, taskName, frequencyRequired } = req.body;

    let newTask;
    let user;

    try {
        newTask = await new Task({
            taskId: uuid(),
            userId,
            taskName,
            frequencyRequired,
            startDate: new Date(),
            lastCompleted: null,
            completedToday: false,
            completedByDay: [],
        });

        try {
            user = await User.findOne({ userId });

            if (!user) {
                res.json({ msg: "User Not Found" });
            } else {
                let sess = await mongoose.startSession();
                await sess.startTransaction();
                await newTask.save({ session: sess });
                await user.tasksToTrack.push(newTask);
                await user.save();
                await sess.commitTransaction();
            }
        } catch (err) {
            const error = new HttpError("Error adding task to user", 500);
            res.json({ msg: error.message });
            return next(error);
        }
    } catch (err) {
        const error = new HttpError("Unexpected Error", 500);
        res.json({ msg: error.message });
        return next(error);
    }
    res.json(newTask);
};



const getTasksByUserId = async (req, res, next) => { 

    const userId = req.params.userId;
    let user;
    let tasks;

    try {
        tasks = await User.findOne({userId}).populate('tasksToTrack');
        res.json(tasks)

    }catch(err) {
        const error = new HttpError('Unable to find user', 500)
        res.json({msg: error.message});
        return next(error)
    }
};

const getTaskById = async ( req, res, next ) => { 

    const taskId = req.params.taskId;
    let userId;
    let task;

    try {
        
        task = await Task.findOne({taskId});
        res.json(task)

    }catch(err) {
        const error = new HttpError('Unable to find user', 500)
        res.json({msg: error.message});
        return next(error)
    }
}

const editTaskById = async (req, res, next) => { };

const deleteTaskById = async (req, res, next) => { };



// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*- NOT COMPLETE *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const deleteAllTasks = async (req, res, next) => {
    console.log('running delete')
    try {
        await Task.deleteMany({})
        res.send('deleted succesfully')
    }catch(err) {
        res.send(err)
    }
}


exports.createTask = createTask;
exports.getTasksByUserId = getTasksByUserId;
exports.getTaskById = getTaskById;
exports.editTaskById = editTaskById;
exports.deleteTaskById = deleteTaskById;


exports.deleteAllTasks = deleteAllTasks;
