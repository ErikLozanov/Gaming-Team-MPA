const router = require("express").Router();

const gameManager = require("../managers/gameManager");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/", async (req, res) => {
    const games = await gameManager.getAll().lean();

    res.render("games", { games });
});

router.get('/search', async (req, res) => {
    const games = await gameManager.getAll().lean();

    res.render("search", { games });
});

router.post('/search', async (req, res) => {
    const {name, platform} = req.body;

    const games = await gameManager.searchGame(name,platform).lean();
    console.log('hi!');
    console.log(games);
    res.render("search", {games});
})

router.get("/create", (req, res) => {
    res.render("games/create");
});

router.post("/create", async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await gameManager.create(gameData);

        res.redirect("/games");
    } catch (err) {
        res.render("games/create", { error: getErrorMessage(err), ...gameData });
    }
});

router.get("/:gameId/details", async (req, res) => {
    const gameId = req.params.gameId;
    const isLogged = req.user?._id;
    async function buyGame() {
        const gameId = req.params.gameId;
        const buyerId = req.user?._id;

        const game = await gameManager.getOne(gameId).lean();
        game.boughtBy.push(buyerId);
        await gameManager.boughtGame(gameId, game);
    }


    const game = await gameManager.getOne(gameId).lean();
    const isOwner = req.user?._id == game.owner._id;
    const isBought = game.boughtBy.some((gameId) => gameId === req.user?._id);
    res.render("games/details", { game, isOwner, isBought, buyGame, isLogged });
});

router.get("/:gameId/delete", async (req,res) => {
    const gameId = req.params.gameId;

    try {
        await gameManager.deleteGame(gameId);
    } catch (err) {
        res.render("games/details", { error: getErrorMessage(err), gameData });
    }
    res.redirect("/games");
});

router.get("/:gameId/edit", async (req, res) => {
    const gameId = req.params.gameId;

    const game = await gameManager.getOne(gameId).lean();
    res.render('games/edit', {game});
})

router.post("/:gameId/edit", async (req,res) => {
    const gameId = req.params.gameId;

    const editedGame = req.body;
    console.log(editedGame);
    try {
        await gameManager.editGame(gameId,editedGame);
        res.redirect(`/games/${gameId}/details`);
        console.log('hi!');
    } catch (err) {
        console.log('error');
    }
});

module.exports = router;
