const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  model: {
    type: String,
    required: true
  },
  trim: String,
  year: String,
  make: String,
  vin: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
