const { body } = require('express-validator');
const Character = require('../../../app/models/Character');
const { resError } = require('../../../utils/apiResponse');
const knex = require('../../../db/knex');

exports.updateTutorialProgress = [
    body("step").notEmpty().withMessage('step must be present.').toInt()
        .custom( (step, { req, location, path } )=> {
            try {
                let player = req.player;
                let currentStep = player.tutorial_step_passed ?? 0;
                if ( step !== currentStep + 1 || step  > 5) {
                    throw new Error(`step ${step} is not valid. Current step is ${currentStep}`);
                }
                return true;
            } catch (error) {
                throw error;
            }
        })
        ,

    (req, res, next) => {
        let rs = req.validateRequest();
        if (rs === true) next();
    },
]