const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    locationName:{
        type: String,
        required: true,
        unique: 1,
        maxlength: 200
    },
    addressDetails:{
        type: Array,
        default: [],
        required: true
    },
    validDate:{
        type: Date,
        required: true
    },
    authorisedPerson:{
        type: Array,
        default: [],
        required: true,
        unique:1
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

},{timestamps:true});

const Location = mongoose.model("m_location",LocationSchema);
module.exports = { Location };