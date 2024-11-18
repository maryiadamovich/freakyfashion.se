var express = require('express');
var router = express.Router();

router.get('/svart-tshirt', function(req, res, next) {
    res.render('products/svart-tshirt/product-details', { title: 'Express' });
  });

module.exports = router;