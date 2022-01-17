const mongoose = require('mongoose');

// Schema - collection
let JokeSchema = new mongoose.Schema(
    {
        name: String, 
        age: Number, 
        joke: String,
        date: String
    },
    {
        strict: false
    }
)

// Use model to export the Schema:
const JokeModel = mongoose.model("JokeSchema", JokeSchema);

// Export the model outside the file:
module.exports = JokeModel;