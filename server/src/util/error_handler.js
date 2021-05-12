const GeneralError = require('./error_types');

module.exports = function(err,req,res,next){
    if(err instanceof GeneralError){
        return res.status(err.getStatus()).json({
            status: 'error',
            message : err.message,
        })
    }
}