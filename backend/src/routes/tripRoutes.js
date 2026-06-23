// const express = require("express");

// const {
//   createTrip,
//   getTrips,
//   getTripById,
//   deleteTrip,
//   toggleFavorite,
//   regenerateDay,
//   weather,
//   addActivity,
//   removeActivity,
// } = require("../controllers/tripController");

// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/", protect, createTrip);

// router.get("/", protect, getTrips);

// router.get("/:id", protect, getTripById);

// router.delete("/:id", protect, deleteTrip);

// router.put("/favorite/:id", protect, toggleFavorite);

// router.put("/regenerate/:id", protect, regenerateDay);

// router.put("/weather/:id", protect, weather);

// router.put("/add-activity/:id", protect, addActivity);

// router.put("/remove-activity/:id", protect, removeActivity);

// module.exports = router;

const express = require("express");

const {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  toggleFavorite,
  regenerateDay,
  addActivity,
  removeActivity,
} = require("../controllers/tripController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getTrips);

router.get("/:id", protect, getTripById);

router.delete("/:id", protect, deleteTrip);

router.put("/favorite/:id", protect, toggleFavorite);

router.put("/regenerate/:id", protect, regenerateDay);

router.put("/add-activity/:id", protect, addActivity);

router.put("/remove-activity/:id", protect, removeActivity);

module.exports = router;
