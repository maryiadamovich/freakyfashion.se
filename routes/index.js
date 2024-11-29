const Database = require('better-sqlite3');
var express = require('express');
var router = express.Router();
const db = new Database('./db/freakyfashion.db', { verbose: console.log });

/* GET home page. */
router.get('/', function (req, res, next) {

  const allSqlObjects = db.prepare(`
    SELECT name_product,
           photo,
           lable,
           price
    FROM products
  `).all();

  const sql = sqlObjects(allSqlObjects);

  const rows = uniqueArray(sql);

  res.render('index', {
    products: rows
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

const sqlObjects = (array) => {

  array.forEach((elem) => {

    if (elem.name_product == "") {
      elem.name_product = "Unknown product";
    };
    if (elem.description == "") {
      elem.description = "Beskrivning kommer snart";
    }
    if (elem.photo == "") {
      elem.photo = "https://placehold.co/300x400.png";
    }
    if (elem.lable == "") {
      elem.lable = "Mark";
    }
    if (elem.sku == "") {
      elem.sku = "NULL";
    }
    if (elem.price == "") {
      elem.price = "200";
    }
  });

  return array;
}

module.exports = router;
