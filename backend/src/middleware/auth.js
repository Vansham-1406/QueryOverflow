const {GraphQLError} = require("graphql")
const jwt = require("jsonwebtoken")
const {JWT_TOKEN} = require("../config/")
const User = require("../models/User")

module.exports = async (req,res,next) => {
    const headerAuth = req.get("Authorization");
    if(!headerAuth)
    {
        req.isAuth = false;
        req.user = null;
        return next();
    }

    const token = headerAuth.split(" ")[1];
    if(!token)
    {
        req.isAuth = false;
        req.user = null;
        return next();
    }

    try 
    {
        const data = await jwt.verify(token,JWT_TOKEN);
        if(!data)
        {
            req.isAuth = false;
            req.user = null;
            return next();
        }
        
        const user = await User.findById(data.id);
        if(!user)
        {
            req.isAuth = false;
            req.user = null;
            return next();
        }

        req.isAuth = true;
        req.user = {
            ...user._doc,
            password : ""
        }
        return next();
    } 
    catch (error) 
    {
        throw new GraphQLError(error.message,{
            extensions : {
                code : "UNAUTHORIZED",
                http : {
                    status : 401
                }
            }
        })
    }
}