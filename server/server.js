const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const route = require('./routes/index');
const PORT = 3001;

const config = require('./config.json');
const mongoUri = `mongodb+srv://${config.id}:${config.password}@mycluster.xcgrs.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
function connect() {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("[MONGO DB CONNECT SUCCESS]");
  })
  .catch((e) => {
    console.log("[MONGO DB CONNECT ERROR]");
  });
}

// FIX FOR
// (node:12100) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
connect();
mongoose.connection.on('disconnected', connect);


const app = express();
app.use(bodyParser.json());

app.use('/api', route);

app.listen(PORT, ()=>{
  console.log(`express is running on ${PORT}`);
})


/*
* TEST API ZONE START
*/
app.use('/hello', (req, res)=> {
  console.log(config.id);
  res.send("HELLO, SERVER");
});
/*
* TEST API ZONE END
*/