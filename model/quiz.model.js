const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    quiz: {
        creator: String,
        title: String,
        description: String,
        questions: Array,
        leaderboard: Array
    }
}, {
    versionKey: false,
    timestamps: true
})

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = {
    QuizModel
}