const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
const RandomNumber = require("randomstring");
require("dotenv").config();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "m_location",
        required: true,
    },
    agency: {
        type: Schema.Types.ObjectId,
        ref: "m_agency",
        required: true
    },
    title:{
        type: String,
        required: true,
        maxlength: 5
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    middleName: {
        type: String,
        required: false,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    gender: {
        type: String,
        required: true,
        maxlength: 50
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        unique: 1
    },
    comfPassword: {
        type: String,
        required: true
    },
    profile: {
        fullName: {
            type: String,
            required: true,
            maxlength: 300,
        },
        email1: {
            type: String,
            required: true,
            unique: 1
        },
        email2: {
            type: String,
            required: false,
            unique: 1
        },
        mobile1: {
            type: String,
            required: true,
            unique: 1,
            maxlength: 13
        },
        mobile2: {
            type: String,
            required: false,
            maxlength: 13
        },
        address: {
            type: Array,
            default: []
        },
        governmentId:{
            panCard: {
                type: String,
                required: false,
                maxlength: 16
            },
            aadhaarCard: {
                type: String,
                required: false,
                maxlength: 16
            }
        },
        personalDetails: {
            image: {
                type: String,
                required: false
            },
            maritalStatus: {
                type: String,
                required: true,
                maxlength: 20
            },
            bankDetails: {
                type: Array,
                default: []
            },
            spousesName: {
                type: String,
                required: false
            },
            dateOfBirth: {
                type: String,
                required: true,
                trim: true
            },
            jobInformation: {
                type: Array,
                default: []  
            },
            emergencyContactInformation: {
                type: Array,
                default: []
            }
        },
    },
    token: {
        type: String,
        default: ""
    },
    resetToken:{
        type: String
    },
    resetTokenExp:{
        type: Number
    },
    access: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    isActive:{
        type: Boolean,
        default: true,
        required: true
    },
    linkId:{
        type: String,
        required: true,
        maxlength: 8,
        unique: 1,
        uppercase: true
    },
    uniqueId:{
        type: String,
        required: true,
        unique: 1,
        maxlength: 16,
        uppercase: true
    },
    createdAt:{
        type: Date
    },
    updateAt:{
        type: Date
    }
},{timestamps: true});

UserSchema.pre("save",function(next){
    var user = this;

    if(user.isModified("password")){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
};



UserSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
};

UserSchema.static.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

const User = mongoose.model("m_user",UserSchema);
module.exports = { User };