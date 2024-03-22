class UserDto{
  phone;
  id;
  constructor(model){
    this.phone = model.phone;
    this.info = model.info;
    this.type = model.type;
    this.code = model.code;
    this.id = model._id;
  }
}
module.exports = UserDto;
