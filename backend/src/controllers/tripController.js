const Trip = require("../models/Trip");

const {
  generateTripPlan,
  regenerateDayPlan,
} = require("../services/geminiService");

const { getWeather } = require("../services/weatherService");

// Create Trip
const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    const aiData = await generateTripPlan(
      destination,
      days,
      budgetType,
      interests,
    );

    const weather = await getWeather(destination);

    const trip = await Trip.create({
      userId: req.user._id,

      destination,

      days,

      budgetType,

      interests,

      itinerary: aiData.itinerary || {},

      budgetEstimate: aiData.budgetEstimate || {},

      hotels: aiData.hotels || [],

      packingList: aiData.packingList || [],

      travelTips: aiData.travelTips || [],
      weather,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await trip.deleteOne();

    res.json({
      message: "Trip deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Favorite
const toggleFavorite = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    trip.favorite = !trip.favorite;

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//regenerate Day Plan

const regenerateDay = async (req, res) => {
  try {
    const { dayNumber, customPrompt } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const aiDay = await regenerateDayPlan(
      trip.destination,
      dayNumber,
      trip.interests,
      customPrompt,
    );

    trip.itinerary[`day${dayNumber}`] = aiDay.activities;

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//add activity

const addActivity = async (req, res) => {
  try {
    const { day, activity } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (!trip.itinerary[day]) {
      trip.itinerary[day] = [];
    }

    trip.itinerary[day].push(activity);

    trip.markModified("itinerary");

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//remove activity

const removeActivity = async (req, res) => {
  try {
    const { day, activity } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    trip.itinerary[day] = trip.itinerary[day].filter(
      (item) => item !== activity,
    );

    trip.markModified("itinerary");

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  toggleFavorite,
  regenerateDay,

  addActivity,
  removeActivity,
};
