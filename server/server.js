const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes/index');

const PORT = 3001;

const app = express();
app.use(bodyParser.json());

app.use('/hello', (req, res)=> res.send("HELLO, SERVER"));
app.use('/api', route);

app.listen(PORT, ()=>{
  console.log(`express is running on ${PORT}`);
})