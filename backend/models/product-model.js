const { Schema, model } = require('mongoose');
const ProductSchema = new Schema({
  title: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: {type: String, required: true, default: ""},
  images: [{ src: {type: String}, isMain: {type: Boolean, default: false} }],
  info: {
    weight: { type: String, required: true },
    setting: { type: String, required: true },
    metal: { type: String, required: true },
    content: { type: Number, required: true },
    collection: { type: String, required: true },
    warranty: { type: String, required: true },
  },
});

const abc = {
  product: {
    title: 'Ring',
    sku: 'TA-432',
    price: 400000,
    category: 'Кольцо',
    subcategory: 'Свадебное',
    img: {
      small: '',
      full: '',
    },
    info: {
      weight: 5.5,
      setting: 'Бриллиант',
      metal: 'Золото',
      content: 585,
      collection: 'Лимитированное',
      warranty: '1 год.',
    },
  },
};
module.exports = model('Product', ProductSchema);
