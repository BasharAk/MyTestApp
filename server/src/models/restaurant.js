const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: true
    },
    delCosts: {
      type: Number,
      required: true
    },
    offer: {
      type: Number,
      required: true
    },
    classN: {
      type: Number,
      required: true
    },
    delTime: {
      type: Number,
      required: true
    },
    payment: {
      type: String,
      required: true
    },
    location: {
      lng: {
        type: Number,
        required: true
      },
      lat: {
        type: Number,
        required: true
      }
    }
  },
  { collection: 'Restaurants' }
);

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
