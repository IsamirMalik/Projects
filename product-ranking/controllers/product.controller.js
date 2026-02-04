const { default: axios } = require("axios");
const { get } = require("http");
const ProductModel = require("../models/product.model");


const addProduct = async (req, res) => {

  try {
    const productDetails = req.body;
    const product = new ProductModel(productDetails);
    await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

const updateMetaData = async (req, res) => {

  try {
    res
      .status(201)
      .json({ message: "Meta data updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

const getProduct = async (req, res) => {


  try {
    const brand = req.query.brand;
    const storage = req.query.storage;
    const price = req.query.price;
    const ratings = req.query.ratings;
    const reviews = req.query.reviews;
    const ram = req.query.ram;


    if (brand) {
      if (brand.includes("sasta")) {
        const data = await ProductModel.find({ Price: { $lte: 50000 } });
        // console.log(data);
        res
          .status(200)
          .json({ message: "Product fetched successfully", data });
      } else if (brand.includes("iphone")) {
        const data = await ProductModel.find({ model: { $regex: "iphone", $options: "i" } });
        res
          .status(200)
          .json({ message: "Product fetched successfully", data });
      } else if (brand.includes("samsung")) {
        const data = await ProductModel.find({ model: { $regex: "galaxy", $options: "i" } });
        res
          .status(200)
          .json({ message: "Product fetched successfully", data });

      } else if (brand.includes("google")) {
        const data = await ProductModel.find({ model: { $regex: "pixel", $options: "i" } });
        res
          .status(200)
          .json({ message: "Product fetched successfully", data });

      } else if (brand.includes("oneplus")) {
        const data = await ProductModel.find({ model: { $regex: "oneplus", $options: "i" } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data });
      }
    }

    if (storage) {
      if (storage == "64GB") {
        const data = await ProductModel.find({ storage_capacity: "64GB" });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      }
    }

    if (price) {
      if (price == "50000") {
        const data = await ProductModel.find({ Price: { $gte: 50000 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (price == "60000") {
        const data = await ProductModel.find({ Price: { $gte: 60000 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      }
    }

    if (ratings) {
      if (ratings == "4") {
        const data = await ProductModel.find({ ratings: { $gte: 4 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (ratings == "3") {
        const data = await ProductModel.find({ ratings: { $gte: 3 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      }
    }

    if (reviews) {
      if (reviews == "1000") {
        const data = await ProductModel.find({ reviews: { $gte: 1000 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (reviews == "2000") {
        const data = await ProductModel.find({ reviews: { $gte: 2000 } });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      }
    }

    if (ram) {
      if (ram == "4gb") {
        const data = await ProductModel.find({ ram: "4gb" });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (ram == "8gb") {
        const data = await ProductModel.find({ ram: "8gb" });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (ram == "14gb") {
        const data = await ProductModel.find({ ram: "14gb" });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      } else if (ram == "16gb") {
        const data = await ProductModel.find({ ram: "16gb" });
        res
          .status(200)
          .json({ message: "Products fetched successfully", data })
      }
    }



  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });

  };
}

const getProductById = async (req, res) => {

  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);

    if (product) {
      res
        .status(200)
        .json({ message: "Product fetched successfully", product });
    } else {
      res
        .status(404)
        .json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

const getProductsByRating = async (req, res) => {

  try {
    const data = await ProductModel.find({}).sort({ ratings: -1 }).limit(10);
    res
      .status(200)
      .json({ message: "Products fetched successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

const getProductsByReview = async (req, res) => {

  try {
    const data = await ProductModel.find({}).sort({ reviews: -1 }).limit(10);
    res
      .status(200)
      .json({ message: "Products fetched successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

const getProductsByReturn = async (req, res) => {

  try {
    const data = await ProductModel.find({}).sort({ returns: 1 }).limit(10);
    res
      .status(200)
      .json({ message: "Products fetched successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong , try again ." });
  }
};

module.exports = { addProduct, updateMetaData, getProduct, getProductById, getProductsByRating, getProductsByReview, getProductsByReturn };