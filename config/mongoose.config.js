const mongoose = require("mongoose");

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost:27017/example_bd")
        console.log(mongoose.connection.readyState);
    }
}