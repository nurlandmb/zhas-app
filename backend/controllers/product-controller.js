const productService = require('../services/product-service');

class ProductController {
  async getCategories(req, res, next) {
    try {
      const categories = await productService.getCategories();
      res.send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getSubcategories(req, res, next) {
    try {
      const subCategories = await productService.getSubcategories();
      res.send(subCategories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await productService.getAll();
      return res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getByCategories(req, res, next) {
    try {
      const products = await productService.getByCategories();
      return res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const product = await productService.create(req.body.product);
      res.send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      const product = await productService.edit(req.body.product);
      res.send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const result = await productService.delete(req.body.id);
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getProduct(req, res, next){
    try{
      const result = await productService.getProduct(req.params.id);
      res.send(result)
    }catch(error){
      console.log(error);
      next(error);
    }
  }
}

module.exports = new ProductController();
