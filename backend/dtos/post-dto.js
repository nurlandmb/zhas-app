class UserDto{
    constructor(model){
        this.date = model.date;
        this.title = model.title;
        this.content = model.content;
        this.author = model.author;
        this.for = model.for;
        this.id = model._id;
    }
}
module.exports = UserDto;
