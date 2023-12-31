const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: { type: String, required: true},
},{
    versionKey: false,
    timestamps: true
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}