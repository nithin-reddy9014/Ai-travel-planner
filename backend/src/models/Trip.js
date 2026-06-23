const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: [
      {
        type: String,
      },
    ],

    itinerary: {
      type: Object,
      default: {},
    },

    budgetEstimate: {
      type: Object,
      default: {},
    },

    hotels: {
      type: Array,
      default: [],
    },

    weather: {
      type: Object,
      default: {},
    },

    packingList: {
      type: Array,
      default: [],
    },
    travelTips: {
      type: Array,
      default: [],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Trip", tripSchema);
