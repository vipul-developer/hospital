const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const mongoose = require("mongoose");
var MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config();
const url = 'mongodb+srv://josh:*******@cluster0.cwv6f.mongodb.net/Unionise?retryWrites=true&w=majority';

//==========================================
//========== EXPRESS INIT START ============
//==========================================
const app = express();
const router = express.Router();
    mongoose.Promise = global.Promise;
    // mongoose.set('useNewUrlParser', true);
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.DATABASE_DEV,{
        useNewUrlParser: true,
        useUnifiedTopology: true
});
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());
app.use(cookieParser());
router.use(express.static(__dirname + "uploads/"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,Origin, X-Requested-With, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Cache", "no-cache");
    return next();
});
var store = new MongoDBStore({
    uri: process.env.DATABASE_DEV,
    collection: 'm_sessions'
});
// Catch errors
store.on('error', function(error) {
    console.log(error);
});
app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        expires: new Date(Date.now() + 3600000),
        // maxAge: 1000 * 60 * 60 * 24 * 2 // 1 day
        // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        // maxAge:36000
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));
//==========================================
//========== EXPRESS INIT END ============
//==========================================


//==========================================
//========== MULTER INIT START ============
//==========================================

const Storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}_${file.originalname}`)
    }
});
const uploads = multer({storage:Storage}).single("image");


//==========================================
//========== MULTER INIT END ============
//==========================================

//==========================================
//========= MIDDLEWARES INIT START =========
//==========================================
    const { auth } = require("./Middleware/Auth");
    const { admin } = require("./Middleware/Admin");
//==========================================
//========= MIDDLEWARES INIT END ===========
//==========================================

//==========================================
//========= ROUTER INIT START ==============
//==========================================
    const location = require("./Routers/Location");
    const agency = require("./Routers/Agency");
    const user = require("./Routers/User");
//==========================================
//=========== ROUTER INIT END ==============
//==========================================



//==========================================
//============ API INIT START ==============
//==========================================
    app.get("/api/netdott_hospital/user_auth",auth,user.auth);
    app.post("/api/netdott_hospital/register_location",auth,admin,location.registerLoction);
    app.get("/api/netdott_hospital/fatch_location",auth,admin,location.fatchLocation);
    app.post("/api/netdott_hospital/update_location",auth,admin,location.updateLocation);
    app.post("/api/netdott_hospital/deleted_location",auth,admin,location.deletedLocation);
    app.post("/api/netdott_hospital/register_agency",auth,admin,uploads,agency.registerAgency);
    app.get("/api/netdott_hospital/fatch_agency",auth,admin,agency.fatchAgency);
    app.post("/api/netdott_hospital/update_agency",auth,admin,agency.updateAgency);
    app.post("/api/netdott_hospital/deleted_agency",auth,admin,agency.deletedAgency);
    app.post("/api/netdott_hospital/register_location_agency_user",auth,admin,uploads,user.registerLocationAndAgencyAndUser);
    app.post("/api/netdott_hospital/register_user",auth,admin,uploads,user.registerUser);
    app.post("/api/netdott_hospital/login_user",user.loginUser);
    app.get("/api/netdott_hospital/logout_user",auth,user.logoutUser);
//==========================================
//============ API INIT END ================
//==========================================


//==========================================
//========== SERVER INIT START ============
//==========================================
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server Runing at ${port}`);
})
//==========================================
//========== SERVER INIT END ============
//==========================================