const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { Location } = require("../../Schema/Location");

const linkId = RandomNumber.generate({
    length: 8,
    charset: "alphanumeric",
    capitalization: "uppercase"
});
const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "numeric"
});


exports.registerLoction = ( req, res, next ) => {
    const location = new Location(req.body);
    location.linkId = linkId;
    location.uniqueId = uniqueId;
    location.validDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    Location.findOne({locationName: req.body.locationName}).exec((err,loc) => {
        if(err) return res.status(400).send(err);
        if(loc) return res.json({success:false,message:`${req.body.locationName} location is already registered in our database`});
        location.save((err,doc) => {
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({
                success: true,
                location: doc
            })
        });//New Location Store On Database End Here
    });// Location Is Already Register Find Query End Here
};

exports.fatchLocation = ( req,res,next ) => {
    Location.findOne({_id: req.session.location,isActive:true}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(200).send({ success: false, message: "failed, account not active !"});
        res.status(200).json({
            success: true,
            message: "Location Fatch Success......... !",
            location: doc
        })

    })
};

exports.updateLocation = ( req,res,next ) => {
    Location.findOneAndUpdate({_id: req.session.location,isActive:true},{locationName:req.body.locationName,validDate: req.body.validDate,$set:{addressDetails:req.body.addressDetails,authorisedPerson:req.body.authorisedPerson}},{new:true,upsert:true,rawResult:true}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            message: "Location Update Success......... !",
            location: doc
        })
    })
};

exports.deletedLocation = ( req,res,next ) => {
    Location.findOneAndUpdate({_id: req.session.location,isActive:true},{isActive: req.body.isActive},{new:true,upsert:true,rawResult:true}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            message: "Location Replace Success......... !",
            location: doc
        })
    })
}