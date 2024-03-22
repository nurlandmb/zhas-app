class ReportDto {
    date;
    status;
    author;
    content;
    id;
    adminComnnent;
    type;
    constructor(model) {
        this.date = model.date;
        this.status = model.status;
        this.author = model.author;
        this.authorCode = model.authorCode;
        this.content = model.content;
        this.adminComment = model.adminComment;
        this.type = model.type;
        this.id = model._id;
    }
}

module.exports = ReportDto