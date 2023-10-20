const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    image: {
        type: String,
        required: [true, "image is required."],
    },
    price: {
        type: Number,
        required: [true, "price is required."],
    },
    description: {
        type: String,
        required: [true, "description is required."],
    },
    genre: {
        type: String,
        required: [true, "genre is required."],
    },
    platform: {
        type: String,
        required: [true, "platform is required."],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    boughtBy: {
        type: Array,
    },
});


const Game = mongoose.model("Game", gameSchema);

module.exports = Game;