class GeneralError extends Error {
    constructor(message){
        super();
        this.message = message;
    }
    getStatus(){
        if(this instanceof Forbidden){
            return 403;
        } if(this instanceof NotFound){
            return 404;
        } if (this instanceof BadRequest){
            return 400;
        } if(this instanceof Unauthorized){
            return 404; 
        } return 500;
    }
}

//static class Forbidden = NetworkError(404);

class Forbidden extends GeneralError {}
class BadRequest extends GeneralError{}
class Unauthorized extends GeneralError {}
class NotFound extends GeneralError{}

module.exports = {
    GeneralError,
    Forbidden,
    NotFound, 
    BadRequest,
    Unauthorized
}