const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create colloction and add schema
const Id = mongoose.model('Id', IdSchema);

module.exports = Id;
