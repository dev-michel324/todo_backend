class ErrorHandler {
    private obj;
    private errors;
    
    constructor(obj: object, errors: Array<string>){
        this.obj = obj;
        this.errors = errors
    }

    handle(): object {
        return {
            error: true,
            fields: this.obj,
            messages: this.errors
        };
    }
}

export {ErrorHandler};