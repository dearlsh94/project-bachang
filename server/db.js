const mongoose = require('mongoose');
const config = require('./config.json');
const mongoUri = `mongodb+srv://${config.id}:${config.password}@mycluster.xcgrs.mongodb.net/${config.dbName}?retryWrites=true&w=majority`

/* FIX FOR
* (node:12100) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
*/
mongoose.set('useCreateIndex', true)

module.exports = () => {
  const conn = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (e) => {
      if (e) {
        console.log("[MONGO DB CONNECT SUCCESS]");
      }
      else {
        console.log("[MONGO DB CONNECT ERROR]");
      }
    });
  }
  conn();
}

