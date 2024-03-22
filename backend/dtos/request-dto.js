class RequestDto{
    constructor(model){
        this.date = model.date;
        this.status = model.status;
        this.content = model.content;
        this.code = model.code;
        this.adminComment = model.adminComment;
        this.id = model._id;
    }
}
module.exports = RequestDto;
