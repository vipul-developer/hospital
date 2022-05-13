const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    location:{
        type: Schema.Types.ObjectId,
        ref: "m_location",
        required: true,
        unique: 1
    },
    agencyName: {
        type: String,
        required: true,
        unique: 1,
        maxlength: 300
    },
    taxDetails:{
        type: Array,
        default: []
    },
    employeeDetails:{
        type: Array,
        default: []
    },
    departmentDetails:{
        type: Array,
        default: []
    },
    bankDetails:{
        type: Array,
        default: []
    },
    walletDetails:{
        type: Array,
        default: []
    },
    image:{
        type: String,
        required: false
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
},{timestamps:true,});


const Agency = mongoose.model("m_agency",AgencySchema);
module.exports = { Agency };