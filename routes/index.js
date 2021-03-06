const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const { catchErrors } =  require('../handlers/errorHandlers')
/**
 * ? Request: aka req is an object full of information that's coming in
 * ? Response aka res is an object full of methods for sending data back to the user
 * ? Next: 
 */
// Do work here
router.get('/', catchErrors(storeController.getStore));
router.get('/stores', catchErrors(storeController.getStore));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
