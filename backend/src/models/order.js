const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },

      name: String,

      price: Number,

      quantity: Number,

      image: String
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  deliveryAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
  },

  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  },

  paymentStatus: {
    type: String,
    default: 'Pending'
  },

  orderStatus: {
    type: String,
    default: 'Pending'
  }

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)