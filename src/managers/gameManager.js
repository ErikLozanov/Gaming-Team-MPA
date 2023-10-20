const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find().populate('owner');

exports.getOne = (gameId) => Game.findById(gameId).populate('owner');

exports.boughtGame = (gameId, updatedGame) => Game.findByIdAndUpdate(gameId, updatedGame);

exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);