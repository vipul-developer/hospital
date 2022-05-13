const { User } = require("../../Schema/Users");

let auth = ( req, res, next ) => {
    let token = req.session.w_auth;
    let uniqueId = req.session.uniqueId;
    let loggedIn = req.session.loggedIn;

    User.findOne({token:token,isActive:1}).populate("location").populate("agency").exec((err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };