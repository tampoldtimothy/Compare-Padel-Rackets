const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const racketSchema = new mongoose.Schema({
  name: String,
  year: String,
  weight: String,
  width: String,
  age: String,
  balance: String,
  color: String,
  core: String,
  face: String,
  frame: String,
  gender: String,
  gameLevel: String,
  shape: String,
  gameType: String,
  imgUrl: String
});

racketSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Racket', racketSchema);