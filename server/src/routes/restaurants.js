const { Router } = require('express');
const getRestaurants = require('../controllers/restaurant');

const router = new Router();

router.get('/api/restaurants', async (req, res) => {
  try {
    const rest = await getRestaurants();
    await res.status(200).send(rest);
    console.log('Restaurant List Requested...');
  } catch (error) {
    await res.status(404).send(error);
    console.log('Failed To Fetch restaurants');
  }
});

router.post('/api/restaurants', async (req, res) => {
  const rest = new RestaurantModel(req.body);
  try {
    console.log(req.body);
    await rest.save();
    await res.status(200).send();
    console.log('Restaurant Added');
  } catch (error) {
    await res.status(404).send('cant add user');
    console.log('Restaurant Failed To Add');
  }
});

module.exports = router;
