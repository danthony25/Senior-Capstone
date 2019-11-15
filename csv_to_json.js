const csv = require('csv-parser');
const fs = require('fs');
var data = []; 
fs.createReadStream('charities_updated_2.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    data.push(row)
    
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(data)
  });
