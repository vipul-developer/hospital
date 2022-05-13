const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { Agency } = require("../../Schema/Agency");

const linkId = RandomNumber.generate({
    length: 8,
    charset: "alphanumeric",
    capitalization: "uppercase"
});

const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "numeric"
});

exports.registerAgency = ( req, res, next ) => {
    const agency = new Agency(req.body);
    agency.linkId = linkId;
    agency.uniqueId = uniqueId;
    
    Agency.findOne({agencyName: req.body.agencyName,location: req.body.location}).populate("location").exec((err,age) => {
        if(err) return res.status(400).send(err);
        if(age) return res.json({success:false,message:`${req.body.agencyName} agency is already registered in our database`});
        agency.save((err,doc) => {
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({
                success: true,
                agency: doc
            })
        }); //New Agency Store On Database End Here
    });// Agency Is Already Register Find Query End Here
};

exports.fatchAgency = ( req,res,next ) => {
    Agency.findOne({_id: req.session.agency,location: req.session.location,isActive:true}).populate("location").exec((err,doc) => {
        if(err) return res.status(400).send(err);
        if(!doc.location.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        if(!doc.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        res.status(200).json({
            success: true,
            message: "Agency Fatch Success......... !",
            agency: doc
        })
    })
};

exports.updateAgency = ( req,res,next ) => {
    Agency.findOneAndUpdate({_id: req.session.agency,location: req.session.location,isActive:true},{agencyName:req.body.agencyName,image: req.body.image,$set:{taxDetails:req.body.taxDetails,employeeDetails: req.body.employeeDetails,departmentDetails: req.body.departmentDetails,bankDetails:req.body.bankDetails,walletDetails:req.body.walletDetails}},{new:true,upsert:true,rawResult:true}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        // if(!doc.location.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        // if(!doc.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        res.status(200).json({
            success: true,
            message: "Agency Update Success......... !",
            agency: doc
        })
    })
};

exports.deletedAgency = ( req,res,next ) => {
    Agency.findOneAndUpdate({_id: req.session.agency,location: req.session.location,isActive:true},{isActive: req.body.isActive},{new:true,upsert:true,rawResult:true}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        // if(!doc.location.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        // if(!doc.isActive) return res.status(200).send({ success: false, message: "failed, account not active !" });
        res.status(200).json({
            success: true,
            message: "Agency Replace Success......... !",
            agency: doc
        })
    })
}