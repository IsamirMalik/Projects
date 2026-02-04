const express = require('express');
const connectToDB = require('./configs/mongodb.configs');
const productRouter = require('./routes/product.routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());

connectToDB();
app.use('/test', (req, res) => {

  try {
    res
      .status(200)
      .json({ message: "This is test route ." })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." })
  }
});

app.use('/api/v1/product', productRouter);

app.use((req, res) => {
  res
    .status(200)
    .json({ message: "This route is not defined ." })
})

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})