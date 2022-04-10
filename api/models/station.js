const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dateUpdated: {type: Date, require: false, default: Date.now()}
});

const Station = mongoose.model("Station", schema);

module.exports = Station;
