
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSChema = new mongoose.Schema({
    username: {
        type: String,
        required: true, //? Field Is Mandatory  
    },
    phone: {
        type: String,
        unique: true,
        required: true, //? Field Is Mandatory
    },
    email: {
        type: String,
        required: true, //? Field Is Mandatory
        unique: true,
        lowercase: true,//? Email Should be In Lower Case Only
    },
    password: {
        type: String,
        required: true, //? Field Is Mandatory
    },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "address" ,
        default : null
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


//!===================================================
//? Hash The password Before Saving New user In DB 
//!===================================================

userSChema.pre("save", async function (next) {

    try {
        //? This Will Give The user/Records Which Come To Submit Data In DB
        const user = this;

        if (!user.isModified("password")) {
            next()
        }


        const saltRound = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_Password;

    } catch (error) {
        next(error)
    }

});

//!===================================================
//? Hash The password Before Saving Updated user In DB 
//!===================================================


userSChema.pre("findOneAndUpdate", async function (next) {

    try {
        //? This Will Give The user/Records Which Come To Submit Data In DB
        const user = this._update;


        const saltRound = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_Password;

    } catch (error) {
        next(error)
    }

});


//!===================================================
//? Generate The JWT Token For Authorization
//!===================================================
userSChema.methods.generateToken = async function () {
    return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
    },
        process.env.SECRETE_KEY,
        {
            expiresIn: "5d"
        }
    )
}

//!===================================================
//? Creating user Model To Export
//!===================================================
const userModel = mongoose.model("user", userSChema)


module.exports = userModel;