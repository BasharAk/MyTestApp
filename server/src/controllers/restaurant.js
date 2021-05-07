const Restaurant = require('../models/restaurant');

const getRestaurants = async () => {
  return await Restaurant.find({}).select(
    'restaurantName img tags delCosts offer classN delTime payment location'
  );
};

module.exports = getRestaurants;
