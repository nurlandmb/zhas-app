const{Schema, model} = require('mongoose');
const UserSchema = new Schema({
  phone: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  code: {type: String, required: true},
  info: {type: Object, required: false,
    default: {
      fio: "",
      avatar: "",
      iin: "",
      region: "",
    }
  }
})
// types : user, admin, mentor
module.exports = model('User-1', UserSchema);