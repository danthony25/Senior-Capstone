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
  if (req.query.mode == undefined) {
          res.send(data);
          console.log(data);

}
  
  else if (req.query.mode == "comments"){
          let filename = "charity_" + req.query.id + "_comments.txt";
          let directory = "./public/";

          let file = fs.readFileSync(filename, 'utf8');
          let lines = file.split("\n");
          let comments = [];
          for (var i=0; i < lines.length; i++) {
              let line = lines[i].split(":::");
              if ((line[0] != "") && (line[1] != "")){
                  let comment = {};
                  comment["comName"] = line[0].trim();
                  comment["comment"] = line[1].trim();
                  comments.push(comment);
              }
          }
          let json = {"comments": comments};    
          res.send(JSON.stringify(json));
      }
});


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

app.post('/', data, function(req, res) {
      res.header("Access-Control-Allow-Origin", "*");
      const comName = req.body.comName;
      const comment = req.body.comment;
      const id = req.body.id;

      let filename = "charity_" + id + "_comments.txt";
      let directory = "./public";

      fs.appendFile(filename, comName + ":::" + comment + "\r\n", function(err) {
          if(err) {
              return console.log(err);
          }
          res.send(filename + " updated.");
      });
   
});

app.listen(3000);