const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const productSchema = new Schema({
  ProductId: Number,
  model: { type: String, required: true },
  storage_capacity: { type: String, required: true },
  release_date: { type: String, required: true },
  Price: { type: Number, required: true },
  ratings: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  metadata: {
    ram: { type: String, required: true, enums: ["4GB", "8GB", "14GB"] },
    storage: { type: String, required: true, enums: ["32GB", "64GB", "128GB", "256GB"] },
    screensize: { type: String, required: true },
    brightness: { type: String, required: true },
  }
});

const ProductModel = model('product', productSchema);

module.exports = ProductModel;

/**
 {
  "model": "Motorola Moto G72",
  "storage_capacity": "128GB",
  "release_date": "2023-01-01",
  "price": 20599,
  ratings: 4.3,
  reviews: 8600,
  returns: 3%,
  "metadata":{
    "ram":"6GB",
    "storage":"128GB" ,
    "screensize":"6.6-inches",
  "brightness":"1300nits",
}
};
 
*/