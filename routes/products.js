const Database = require('better-sqlite3');
var express = require('express');
var router = express.Router();
const db = new Database('./db/freakyfashion.db', { verbose: console.log });


router.get('/:name_product', function (req, res, next) {
  let productName;
  let sql;


  const getSql = (elem) => {
    return db.prepare(`
   SELECT name_product,
          description,
          photo,
          lable,
          price
   FROM products
   WHERE name_product = '${elem}'
 `).get();
  };

  try {
    productName = capitalizeAndFormat(req.params.name_product);
    sql = sqlObject(getSql(productName));
  }
  catch (err) {
    console.log(err.message);
  }

  if (!sql) {
    productName = req.params.name_product;
    sql = sqlObject(getSql(productName));
  }

  const allSqlObjects = db.prepare(`
    SELECT name_product,
           photo,
           lable,
           price
    FROM products
  `).all();

  console.log(allSqlObjects);
  const newImg = sqlObjects(allSqlObjects);

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

const sqlObject = (elem) => {

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

  return elem;
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