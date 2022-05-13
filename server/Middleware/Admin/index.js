let admin = ( req, res, next ) => {
    if(req.user.role === 0){
        return res.send("Only amdin access.. You are not allowed,get out now");
    }
    next();
}

module.exports = { admin };