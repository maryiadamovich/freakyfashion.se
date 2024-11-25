const Database = require('better-sqlite3');
var express = require('express');
var router = express.Router();
const db = new Database('./db/freakyfashion.db', { verbose: console.log });

/* GET home page. */
router.get('/', function (req, res, next) {

  const sql = db.prepare(`
    SELECT name_product,
           photo,
           lable,
           price
    FROM products
  `).all();

  const rows = uniqueArray(sql);

  res.render('index', {
    products: rows
  });
});

const uniqueArray = (array) => {
  const uniqueNumber = [];
  while (uniqueNumber.length < array.length){
    let x = Math.floor(Math.random() * array.length);
    if (!uniqueNumber.includes(array[x])) {
      uniqueNumber.push(array[x]);
    }
  }
  return uniqueNumber;
}

module.exports = router;
