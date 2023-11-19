const { Schema, Types } = require("mongoose");

const AnalyticsSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
      auto: true,
    },
    day: {
      type: Number,
      required: true,
      index: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
      enum: ["15-25", ">25"],
      index: true,
    },
    gender: {
      type: String,
      required: true,
      uppercase: true,
      enum: ["MALE", "FEMALE"],
      index: true,
    },
    products: {
      type: Map,
      of: Number,
      default: {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
      },
      required: true,
    },
  },
  {
    collection: "user.analytics.data",
    timestamps: {
      createdAt: "cts",
      updatedAt: "mts",
    },
  }
);

module.exports = { AnalyticsSchema };
