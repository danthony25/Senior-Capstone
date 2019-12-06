const csv = require('csv-parser');
const fs = require('fs');
const express = require("express");
const app = express();
var data = []; 
app.use(express.static('public'));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(data)
  console.log(data)

})

fs.createReadStream('charities_updated_2.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    data.push(row)
    
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    // res.send(data[0].Mission)
  });
app.listen(3000);