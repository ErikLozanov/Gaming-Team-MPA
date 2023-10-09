const router = require('express').Router();

const gameManager = require('../managers/gameManager');
const { getErrorMessage } = require('../utils/errorHelpers');


router.get('/', async (req, res) => {

    const games = await gameManager.getAll().lean();

    res.render('games', {games});
})

router.get('/create', (req, res) => {
    res.render('games/create');
});

router.post('/create', async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await gameManager.create(gameData);

        res.redirect('/');
    } catch (err) {
        res.render('games/create', {error: getErrorMessage(err), gameData});
    }
});

module.exports = router;
