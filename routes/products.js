const Database = require('better-sqlite3');
var express = require('express');
var router = express.Router();
const db = new Database('./db/freakyfashion.db', { verbose: console.log });


router.get('/:name_product', function (req, res, next) {

  let productName = capitalizeAndFormat(req.params.name_product);

  const sql = db.prepare(`
    SELECT name_product,
           description,
           lable,
           price
    FROM products
    WHERE name_product = '${productName}'
  `).get();

  const newImg = db.prepare(`
    SELECT name_product,
           photo,
           lable,
           price
    FROM products
  `).all();

  const rows = uniqueArray(newImg).filter(elem => elem.name_product !== sql.name_product);


  res.render('products/svart-t-shirt', {
    products: sql,
    variant: rows
  });

});

const uniqueArray = (array) => {
  const uniqueNumber = [];
  while (uniqueNumber.length < array.length) {
    let x = Math.floor(Math.random() * array.length);
    if (!uniqueNumber.includes(array[x])) {
      uniqueNumber.push(array[x]);
    }
  }
  return uniqueNumber;
}

const capitalizeAndFormat = (params) => {
  return params.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}

module.exports = router;