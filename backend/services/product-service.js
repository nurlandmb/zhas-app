const ProductModel = require('../models/product-model');
const ProductDto = require('../dtos/product-dto');
const { v2 } = require('cloudinary');
const streamifier = require('streamifier');
const ApiError = require('../exceptions/api-error');

class ProductService {
  async getCategories(){
    const categories = await ProductModel.distinct('category');
    return categories;
  }
  async getSubcategories(){
    const subCategories = await ProductModel.distinct('subcategory');
    return subCategories;
  }

  async getAll() {
    const products = await ProductModel.find();
    const productDtos = products.map((product) => new ProductDto(product));
    return productDtos;
  }
  async getByCategories() {
    const products = await ProductModel.find();
    const productDtos = products.map((product) => new ProductDto(product));
    const categories = await ProductModel.distinct('category');
    const subCategories = await ProductModel.distinct('subcategory');
    const readyProducts = categories.reduce((accumulator, category, i) => {
      return [
        ...accumulator,
        {
          category,
          products: this.filterByCategories(
            category,
            subCategories,
            productDtos
          ),
        },
      ];
    }, []);
    return readyProducts;
  }
  filterByCategories(category, subCategories, products) {
    const readyProducts = {};
    for (let i = 0; i < subCategories.length; i++) {
      const catProducts = products.filter(
        (product) =>
          product.category === category &&
          product.subcategory === subCategories[i]
      );
      if (catProducts.length) {
        readyProducts[subCategories[i]] = catProducts;
      }
    }
    return readyProducts;
  }
  async create(product, authorId) {
    const newProduct = await ProductModel.create({
      ...product,
      author: authorId,
    });
    const productDto = new ProductDto(newProduct);
    return productDto;
  }
  async edit(product) {
    const newProduct = await ProductModel.findById(product.id);
    if (!newProduct) {
      throw ApiError.BadRequest('Товар не найден');
    }
    newProduct.title = product.title;
    newProduct.sku = product.sku;
    newProduct.price = product.price;
    newProduct.category = product.category;
    newProduct.subcategory = product.subcategory;
    newProduct.images = product.images;
    newProduct.info = product.info;
    newProduct.description = product.description;
    const updatedProduct = await newProduct.save();
    const productDto = new ProductDto(updatedProduct);
    return productDto;
  }
  async getProduct(id){
    const product = await ProductModel.findOne({_id: id});
    if(!product) return null;
    return new ProductDto(product)
  }
  async delete(id) {
    const product = await ProductModel.deleteOne({ _id: id });
    if (!product) {
      throw ApiError.BadRequest('Товар не найден');
    } else {
      return product;
    }
  }
}

module.exports = new ProductService();
