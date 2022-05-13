const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();
const { Location } = require("../../Schema/Location");
const { Agency } = require("../../Schema/Agency");
const { User } = require("../../Schema/Users");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const linkId = RandomNumber.generate({
    length: 8,
    charset: "alphanumeric",
    capitalization: "uppercase"
});

const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "numeric"
});

const userName = RandomNumber.generate({
    length: 8,
    charset: "alphabetic"
});

const password = RandomNumber.generate({
    length: 12,
    charset: "hex",
    capitalization: "uppercase"
})
exports.auth = ( req,res,next ) => {
    res.status(200).json({
        user: req.user,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true
    });
}

exports.registerLocationAndAgencyAndUser = ( req,res,next ) => {
    const location = new Location(req.body);
    const agency = new Agency(req.body);
    const user = new User(req.body);

    location.uniqueId = uniqueId;
    location.linkId = linkId;
    location.validDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    agency.uniqueId = uniqueId;
    agency.linkId = linkId;
    user.uniqueId = uniqueId;
    user.linkId = linkId;
    user.profile.fullName = req.body.title + "." + req.body.firstName + " " + req.body.middleName + " " + req.body.lastName;
    user.userName = userName;
    user.password = password;
    user.comfPassword = password;
    user.personalDetails.image = req.body.image.filename;

    location.save().then((location) => {
        agency.location = location._id;
        agency.save().then((agency) => {
            user.location = agency.location;
            user.agency = agency._id;
            user.save().then((doc) => {
                res.status(200).json({
                    success: true,
                    user: doc,
                });
                transporter.sendMail({
                    to: doc.profile.email1,
                    cc: process.env.EMAIL_USER,
                    from: process.env.EMAIL_USER,
                    subject: "Successfully registered & login details",
                    html: `<h1 style="text-align:center;color:black">Welcome !</h1><h5 style="text-align:center;color:black">Congrats on becoming a member of the family!"</h5><div style="text-align:center"><p style="color:black"><b>An a Subscriber user, you'll have access to account:</b></p><ul><ol>Login User Name:- ${userName}</ol><ol>Login Password:- ${password}</ol></ul></div>`
                },(err) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Mail Send Successfully")
                    }
                })
            }).catch((err) => {
                if(err) return res.status(400).json({success:false,message:`${user.profile.fullName} user is already registered in our database`,err});
            }); // User Is Already Register Find Query End Here
        }).catch((err) => {
            if(err) return res.status(400).json({success:false,message:`${req.body.agencyName} agency is already registered in our database`,err});
        });// Agency Is Already Register Find Query End Here
    }).catch((err) => {
        if(err) return res.status(400).json({success:false,message:`${req.body.locationName} location is already registered in our database`,err});
    });// Location Is Already Register Find Query End Here

};

exports.registerUser = ( req,res,next ) => {
    const user = new User(req.body);
    user.uniqueId = uniqueId;
    user.linkId = linkId;
    user.profile.fullName = req.body.title + "." + req.body.firstName + " " + req.body.middleName + " " + req.body.lastName;
    user.userName = userName;
    user.password = password;
    user.comfPassword = password;
    user.location = req.session.location._id;
    user.agency = req.session.agency._id;
    User.findOne({location: req.session.location,agency: req.session.agency,"profile.email1": req.body.profile.email1}).populate("location").populate("agency").exec((err,doc) => {
        if(err) return res.status(400).send(err);
        if(doc) return res.json({success:false,message:`${user.profile.fullName} user is already registered in our database`});
        user.save().then((age) => {
            res.status(200).json({
                success: true,
                user: age
            })
            transporter.sendMail({
                to: age.profile.email1,
                cc: process.env.EMAIL_USER,
                from: process.env.EMAIL_USER,
                subject: "Successfully registered & login details",
                html: `<h1 style="text-align:center;color:black">Welcome !</h1><h5 style="text-align:center;color:black">Congrats on becoming a member of the family!"</h5><div style="text-align:center"></h1><h5 style="text-align:center;color:black">${age.profile.fullName}</h5><p style="color:black"><b>An a Subscriber user, you'll have access to account:</b></p><ul><ol>Login User Name:- ${userName}</ol><ol>Login Password:- ${password}</ol></ul></div>`
            },(err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Mail Send Successfully")
                }
            })
        }).catch((err) => {
            if(err) return res.status(400).send(err);
        }); //New User Store On Database End Here
    }); // User Is Already Register Find Query End Here
};

exports.loginUser = ( req,res,next ) => {
    User.findOne({ $or: [{firstName: req.body.userName},{userName: req.body.userName},{'profile.email1': req.body.userName},{'profile.mobile1': req.body.userName}],isActive: true}).populate("location").populate("agency").exec((err,user) => {
        if(!user) return res.json({ loginSuccess: false,message: "login failed: Sorry, something went wrong there,Please check username or password and Try again. !"});
        if(!user.location.isActive) return res.json({ loginSuccess: false, message: "Auth failed, account not active !"});
        if(!user.agency.isActive) return res.json({ loginSuccess: false, message: "Auth failed, account not active !"});
        if(!user.isActive) return res.json({ loginSuccess: false, message: "Auth failed, account not active !"});
        user.comparePassword(req.body.password,(err,isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "login failed: Sorry, something went wrong there,Please check username or password and Try again. !" });
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                req.session.w_auth = user.token;
                req.session.uniqueId = user.uniqueId;
                req.session.loggedIn = true;
                req.session.location = user.location._id;
                req.session.agency = user.agency._id;
                req.session.user = user;
                res.cookie("w_auth",user.token).status(200).json({
                    loginSuccess: true,
                    message: "Login Success Welcome !........",
                    user: user
                });
            })
        })
    });
};

exports. logoutUser = ( req, res, next ) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: " " },
        (err,doc) => {
            if(err) return res.json({ success: false });
            return res.status(200).send({ success: true,message:"You are logged in !" });
        }
    )
    req.session.destroy();
};

