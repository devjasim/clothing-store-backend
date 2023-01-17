import Product from "../models/product.model.js";
import mongoose from "mongoose";

// CREATE PRODUCT
export const createProduct = async(req, res) => {
    const { productName  } = req.body;
    try {
      const existingProduct = await Product.findOne({ productName });
  
      if(existingProduct && existingProduct?.productName === productName) return res.status(400).json({message: "Product already exists."})
  
      const result = await Product.create(req.body)
  
      return res.status(200).json({ result, message: "Product Created Successfully!" });
  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
}

// GET PRODUCTS
export const getProducts = async(req, res) => {
  try {
    const productLists = await Product.find();

    res.status(200).json({ data: productLists, message: "Product Lists" });
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// GET PRODUCT BY ID
export const getProductById = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No product found with this ID");
  
  if(id) {
    const getProduct = await Product.findById(id);

    if(!getProduct) {
      return res.status(404).json({message: "Product doesn't exists!"});
    };

    res.status(200).json({result: getProduct});
  } else {
    return res.status(500).json({message: "Product ID not provided or something went wrong!"});
  }
}

// Update product
export const updateProduct = async(req, res) => {
  const {id: _id} = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No product found with this ID");

  const productExists = await Product.findById(_id);

  if(!productExists) return res.status(404).send("No product found with this ID");

  const updateProduct = await Product.findByIdAndUpdate(_id, { ...product }, {new: true}).catch(err => res.status(500).json({message: err}))

  return res.status(200).json({
    message: "Product is updated.",
    result: updateProduct
  });

}

// DELETE PRODUCT
export const deleteProduct = async(req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product found this is ID');

  await Product.findByIdAndDelete(id);

  res.status(200).json({ message: "User deleted successfully!" })
}