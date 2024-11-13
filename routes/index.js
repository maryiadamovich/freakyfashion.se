var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products/svart-tshirt', function(req, res, next) {
  res.render('products/svart-tshirt/product-details', { title: 'Express' });
});

router.get('/admin/products/', function(req, res, next) {
  res.render('admin/products/index', { title: 'Express' });
});

router.get('/admin/products/new', function(req, res, next) {
  res.render('admin/products/new', { title: 'Express' });
});

module.exports = router;
