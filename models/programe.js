const mongoose = require('mongoose');
const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true }
});
module.exports = mongoose.model('Program', ProgramSchema);
