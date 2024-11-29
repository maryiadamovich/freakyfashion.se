const Database = require('better-sqlite3');
var express = require('express');
var router = express.Router();
const db = new Database('./db/freakyfashion.db', { verbose: console.log });

router.get('/api/products', function (req, res, next) {

  const products = db.prepare(`
    SELECT name_product,
           sku,
           price
    FROM products
    `).all();

  res.json(products);
});

router.post('/api/products', function (req, res, next) {
  try {
    const product = {
      name: req.body.name.toLowerCase(),
      description: req.body.description,
      photo: req.body.photo,
      lable: req.body.lable,
      sku: req.body.sku,
      price: req.body.price
    }

    db.prepare(`
    INSERT INTO products (name_product, description, photo, lable, sku, price)
    VALUES (@name, @description, @photo, @lable, @sku, @price)
    `).run(product);

    res.status("201").end();
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/new', function (req, res, next) {
  res.render('admin/products/new');
});

router.get('/', function (req, res, next) {
  res.render('admin/products/index');
});

module.exports = router;