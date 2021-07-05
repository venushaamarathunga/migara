const express = require('express');
const app = express();
const http = require('http').createServer(app);


// middleware
app.use(express.json());

const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');
const fastcsv = require('fast-csv');

app.get('/tshirt', (request, response) => {
    response.status(200).send({
        tshirt: 'hello mcn',
        size: 'large'
    })
})

app.post('/tshirt/:id', (req, res) => {
    const id = req.params.id;
    const logo = req.body.logo;
    if (!logo) {
        res.status(418).send({ message: 'we need a logo' })
    }
    res.send({ tshirt: `with your logo ${logo} and id is ${id}` })

})


const readPdf = async (uri) => {
    const buffer = fs.readFileSync(uri);
    try {
        const data = await pdfParse(buffer);

        // The content
        console.log('Content: ', data.text);

        // Total page
        console.log('Total pages: ', data.numpages);

        // File information
        console.log('Info: ', data.info);
    } catch (err) {
        throw new Error(err);
    }
}


// Testing
const DUMMY_PDF = './dummy.pdf';
readPdf(DUMMY_PDF);

/*
// This function reads data from a given CSV file
const readCSV = (filePath) => {
  const readStream = fs.createReadStream(filePath);
  const data = [];
  readStream
    .pipe(csv.parse())
    .on('data', (row) => {
      data.push(row);
      console.log('Id:', row[0]);
      console.log('Name:', row[1]);
      console.log('Age:', row[2]);
      console.log('\n');
    })
    .on('end', (rowCount) => {
      console.log(`${rowCount} rows has been parsed!`);

      // Do something with the data you get
      console.log(data);
    })
    .on('error', (error) => console.error(error));
};

// Try it
const myFile = path.resolve(__dirname, 'paragraph.csv');
readCSV(myFile);
*/

const port = 8080;

app.listen(port, () => {
    console.log(`it is a lives on ${port}`);
})
