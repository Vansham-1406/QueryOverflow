const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_TOKEN} = require("../config/index")
const UserSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        mobilenumber : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        questions : [{
            type : mongoose.Schema.ObjectId,
            ref : "Question"
        }],
        answers : [{
            type : mongoose.Schema.ObjectId,
            ref : "Answer"
        }],
        avatarImage : {
            type : String,
            default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqAZG7zLGhZIxSUV6EVLfQX3WEUawmvM-eA&usqp=CAU"
        },
        bookmarkedQuestions : [{
            type : mongoose.Schema.ObjectId,
            ref : "Question"
        }],
        bookmarkedAnswers : [{
            type : mongoose.Schema.ObjectId,
            ref : "Answer"
        }],
    },
    {timestamps : true}
)

UserSchema.pre("save",async function(next){
    if(this.isModified("password") || this.isNew)
    {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password = hash;
        next();
    }
    next();
})

UserSchema.methods.comparePassword = async function(password)
{
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.genToken = async function()
{
    return jwt.sign({id : this._id},JWT_TOKEN,{expiresIn : "1d"})
}

module.exports = mongoose.model("User",UserSchema);