const mongoose = require('mongoose');
module.exports = function Mongo(url) {
  mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  console.log("[INFO] > ✅ Base de datos conectado")
  if(err) console.log(err)
});

}

