class ApiError extends Error {
    constructor(statusCode, message="Something went wrong", error = [], stack =""){
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON(){
        return{
            success:this.success,
            statusCode: this.statusCode,
            message: this.message,
            error:this.error,
            stack:this.stack
        }
    }
}

export default ApiError;