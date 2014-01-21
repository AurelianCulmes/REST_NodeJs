var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({        
  host     : 'localhost',        
  user     : 'dbuser',        
  password : 'password',
  database : 'soap_db'    
});
connection.connect();


function getResult(query, params, callback) {

connection.query(query + params, function(err, result) {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
            }
});
 
}



app.use(express.bodyParser());

app.get('/', function(req, res) {

getResult('SELECT * FROM Categories LIMIT 20', '', function(err,rows) {
        if (err) {            
            console.log("ERROR : ",err);            
        } else {        
          var arr = new Array();
          for(i=0; i < rows.length; i++) {
               var categ_obj = {};
               categ_obj.id = rows[i].ID;
               categ_obj.name = rows[i].NAME;
               arr.push(categ_obj);
          }                     
          res.jsonp(arr); 
        }

});
});


app.get('/categories', function(req, res) {
getResult('SELECT * FROM Categories LIMIT 20', '', function(err,rows) {
        if (err) {            
            console.log("ERROR : ",err);            
        } else {        
          var arr = new Array();
          for(i=0; i < rows.length; i++) {
               var categ_obj = {};
               categ_obj.id = rows[i].ID;
               categ_obj.name = rows[i].NAME;
               arr.push(categ_obj);
          }                     
          res.jsonp(arr); 
        }

});
});


app.get('/products/:id', function(req, res) {

getResult('SELECT id, name FROM Products where categ_id = ', req.params.id, function(err,rows) {
        if (err) {            
            console.log("ERROR : ",err);            
        } else {        
          var arr = new Array();
          for(i=0; i < rows.length; i++) {
               var prod_obj = {};
               prod_obj.id = rows[i].id;
               prod_obj.name = rows[i].name;
               arr.push(prod_obj);
          }                     
          res.jsonp(arr); 
        }

});

});

app.get('/product_details/:id', function(req, res) {

getResult('SELECT * FROM Products where id = ', req.params.id, function(err,rows) {
        if (err) {            
             console.log("ERROR : ",err);            
        } else {        
             var prod_obj = {};
             prod_obj.id = rows[0].id;
             prod_obj.categ_id = rows[0].categ_id;
             prod_obj.name = rows[0].name;
             prod_obj.description = rows[0].description;
             prod_obj.image_name = rows[0].image_name;
             prod_obj.quantity = rows[0].quantity.toString();
             prod_obj.price = rows[0].price.toString();
             res.jsonp(prod_obj);                    
        }
});

});



app.listen(process.env.PORT || 3412);