import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {type: String, required: true},
  categories: [{type: String, default: [] }],
  availableSizes: [{type: String, default: []}],
  availableQuantity: {type: String, default: ''},
  images: [{
    type: String,
    default: "",
  }],
  price: {
    type: String,
    default: '',
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  activeStatus: {
    type: Boolean,
    default: false,
  },
  id: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);