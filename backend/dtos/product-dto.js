class ProductDto {
  title;
  sku;
  price;
  category;
  subcategory;
  img;
  info;
  id;
  constructor(model) {
    this.title = model.title;
    this.sku = model.sku;
    this.price = model.price;
    this.category = model.category;
    this.subcategory = model.subcategory;
    this.images = model.images;
    this.info = model.info;
    this.description = model.description;
    this.id = model._id;
  }
}
module.exports = ProductDto;
