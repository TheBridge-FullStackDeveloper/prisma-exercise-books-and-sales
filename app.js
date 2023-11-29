const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");

app.use(morgan('dev'));
app.use(express.json());

const router = require('./routes');

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

  
});
