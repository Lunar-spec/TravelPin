const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required: true,
  };

const userPin = new Schema({
    username: {
        type: String,
        require: true,
    },
    title: {
      type: String,
      require: true,
    },
    desc: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    lat: {
        type: Number,
      require: true,
      min: -90,
      max: 90,
    },
    long: {
        type: Number,
      require: true,
      min: -180,
      max: 180,
    },
  }, {
    timestamps: true,
  });

  module.exports = mongoose.model('Pin',userPin);