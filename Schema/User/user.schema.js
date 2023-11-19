const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: "Email id already exists",
      required: "Email id is required",
      index: true,
      validate: {
        validator: (value) => {
          return /^.+@.+\.com$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email Id`,
      },
    },
  },
  {
    collection: "user.data",
    timestamps: {
      createdAt: "cts",
      updatedAt: "mts",
    },
  }
);

module.exports = { userSchema };
