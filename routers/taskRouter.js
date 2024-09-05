const express = require('express');
const tasksController = require('../controllers/tasksController')
const { check } = require('express-validator')
const router = express.Router();


router.post('/createTask', 
    check('taskName').notEmpty(),
    check('userId').notEmpty(),
    check('frequencyRequired').notEmpty().isNumeric(), 
    tasksController.createTask);

router.get('/getTasksByUserId/:userId', tasksController.getTasksByUserId);

router.get('/getTaskById/:taskId', tasksController.getTaskById);


//------WARNING-------//
router.delete('/deleteAllDB', tasksController.deleteAllTasks);

module.exports = router;