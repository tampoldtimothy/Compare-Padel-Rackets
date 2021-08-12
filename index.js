require('dotenv').config()
const express = require('express');

const app = express();
const cors = require('cors');
const Racket = require('./models/racket');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.get('/api/rackets', (request, response, next) => {
  Racket.find({})
    .then((rackets) => {
      response.json(rackets);
    })
    .catch((error) => next(error));
});

app.get('/api/rackets/:id', (request, response, next) => {
  Racket.findById(request.params.id)
    .then((racket) => {
      if (racket) {
        response.json(racket);
      } else {
        response.status(404).send({ error: 'No rackets found with given ID' });
      }
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});