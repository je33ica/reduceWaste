const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required",
    unique: true,
  },

  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."],
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },

  products: [
    {
      EAN: {
        type: String,
      },

      productName: {
        type: String,
        required: "Product Name Required",
      },

      quantity: {
        type: Number,
      },

      weight: {
        type: Number,
      },

      dateAdded: {
        type: Date,
        default: Date.now,
      },

      expiry: {
        type: Date,
        required: "Product expiry date required",
        min: Date.now,
      },
    },
  ],

  userCreated: {
    type: Date,
    default: Date.now,
  },

  lastUpdated: Date,
});

UserSchema.methods.lastUpdatedDate = function () {
  this.lastUpdated = Date.now();

  return this.lastUpdated;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
