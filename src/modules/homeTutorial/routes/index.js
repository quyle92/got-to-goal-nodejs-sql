const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { selectCharacterValidation } = require('../validations/selectCharacter.validation');
const { updateTutorialProgress } = require('../validations/updateTutorialProgress.validation');
const { authorize } = require('../../../app/middlewares/auth');
const { use } = require('../../../app/middlewares/error');

//authorize is HOF
router.all('/*', authorize());

//(1)
let foo = () => (req, res, next) => {
    console.log('foo');
    next()
}

router.get('/players',
    foo(),//(1)
    use(controller.getPlayerList)
);
router.get('/characters', use(controller.getCharacterList));
router.post('/players/select-character', selectCharacterValidation, use(controller.selectCharacter));
router.put('/tutorials',
    updateTutorialProgress,
    use(controller.updateTutorialProgress)
);

module.exports = router;

/**
 * Note
 */
//(1) just an example of using HOF in middlware.
